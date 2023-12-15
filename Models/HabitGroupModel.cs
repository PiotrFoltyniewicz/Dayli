using BetterDay.Errors;
using MySqlConnector;
using System.Linq;
using System.Reflection;

namespace BetterDay.Models
{
    public class HabitGroupModel
    {
        public int? Id { get; set; }
        public DateTime? Date { get; set; }
        public List<HabitModel> Habits { get; set; }

        public HabitGroupModel(int? id, DateTime? date, IEnumerable<HabitModel> habits) 
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
                                            WHERE u.Username = '{username}' AND DATE(hg.Date) = DATE(NOW());", connection);
            var reader = await query.ExecuteReaderAsync();

            List<HabitModel> habits = new List<HabitModel>();
            int? groupId = null;
            DateTime? date = null;

            while (await reader.ReadAsync())
            {
                groupId ??= (int?)reader[0];
                date ??= (DateTime?)reader[1];
                habits.Add(new HabitModel((int)reader[2], (string)reader[3], (bool)reader[4]));
            }

            await reader.CloseAsync();
            await connection.CloseAsync();

            return new HabitGroupModel((int?)groupId, (DateTime?)date, habits);
        }

        public async static Task<IEnumerable<HabitGroupModel>> GetHabitGroupByDates(string username, DateTime startDate, DateTime endDate)
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
                                            WHERE u.Username = '{username}' AND DATE(hg.Date) BETWEEN '{startDate.ToString("yyyy-MM-dd")}' AND '{endDate.ToString("yyyy-MM-dd")}';", connection);
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
            foreach (var group in groupByDateQuery)
            {
                List<HabitModel> habits = new List<HabitModel>();
                int? groupId = null;
                foreach (var habit in group)
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

        public async static Task<ApiError> CreateHabitGroupsBetweenDates(string username, DateTime startDate, DateTime endDate, HabitListArray habits)
        {
            ApiError response = new ApiError(69, "probably worked");

            var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();
            
            while(startDate <= endDate)
            {
                int userId = TokenHandler.GetUserId(username).Result;
                var query = new MySqlCommand(@$"INSERT INTO habitgroups (Date, UserId) 
                                                VALUES ('{startDate.ToString("yyyy-MM-dd")}', {userId});", connection);
                var reader = await query.ExecuteReaderAsync();
                await reader.CloseAsync();   

                query = new MySqlCommand($@"SELECT ID FROM habitgroups WHERE ID= LAST_INSERT_ID()", connection);
                reader = await query.ExecuteReaderAsync();
                await reader.ReadAsync();
                int groupId = (int)reader[0];
                await reader.CloseAsync();

                foreach(HabitListModel habit in habits.Array)
                {
                    query = new MySqlCommand(@$"INSERT INTO habits (UserId, HabitId, GroupId, Status) 
                                            VALUES ({userId}, {habit.Id}, {groupId}, false);", connection);
                    reader = await query.ExecuteReaderAsync();
                    await reader.CloseAsync();
                }
                
                startDate = startDate.AddDays(1);
                await reader.CloseAsync();
            }
            await connection.CloseAsync();

            return response;
        }

    }
}
