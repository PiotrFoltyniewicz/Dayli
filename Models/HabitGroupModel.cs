using BetterDay.Errors;
using MySqlConnector;
using System.Linq;
using System.Reflection;

namespace BetterDay.Models
{
    public class HabitGroupModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public List<HabitModel> Habits { get; set; }

        public HabitGroupModel(int id, DateTime date, IEnumerable<HabitModel> habits) 
        {
            Id = id;
            Date = date;
            this.Habits = habits.ToList();
        }

        public HabitModel this[int i]
        {
            get { return Habits[i]; }
            set { Habits[i] = value; }
        }

        public async static Task<IEnumerable<HabitGroupModel>> GetAllUserHabitGroups(string username)
        {
            var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            var query = new MySqlCommand(@$"SELECT h.GroupId, hg.Date, h.ID, hl.Title, h.Status
                                            FROM `habits` h
                                            INNER JOIN habitslist hl
                                            ON hl.ID = h.HabitID
                                            INNER JOIN habitgroups hg
                                            ON hg.ID = h.GroupId
                                            INNER JOIN users u
                                            ON u.ID = h.UserID
                                            WHERE u.Username = '{username}';", connection);
            var reader = await query.ExecuteReaderAsync();

            List<HabitGroupModel> groups = new List<HabitGroupModel>();
            List<(int, DateTime, int, string, bool)> data = new List<(int, DateTime, int, string, bool)>();
            while (await reader.ReadAsync())
            {
                data.Add(((int)reader[0], (DateTime)reader[1], (int)reader[2], (string)reader[3], (bool)reader[4]));
            }

            var groupByDateQuery =
                from habit in data
                group habit by habit.Item2 into habitGroup
                orderby habitGroup.Key
                select habitGroup;
            foreach(var group in groupByDateQuery)
            {
                List<HabitModel> habits = new List<HabitModel>();
                int? groupId = null;
                foreach(var habit in group)
                {
                    groupId ??= habit.Item1;
                    habits.Add(new HabitModel(habit.Item3, habit.Item4, habit.Item5));
                }
                groups.Add(new HabitGroupModel((int)groupId, group.Key, habits));
            }

            await reader.CloseAsync();
            await connection.CloseAsync();
            return groups;
        }

        public async static Task<HabitGroupModel> GetTodaysHabitGroup(string username)
        {
            return null;
        }

        public async static Task<HabitGroupModel> GetHabitGroupByDate(string username, DateTime date)
        {
            return null;
        }

        public async static Task<ApiError> CreateHabitGroupForDate(string username, DateTime date)
        {
            return null;
        }

    }
}
