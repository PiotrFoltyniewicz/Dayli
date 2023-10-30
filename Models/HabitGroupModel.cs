using BetterDay.Errors;

namespace BetterDay.Models
{
    public class HabitGroupModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        private List<HabitModel> habits;

        public HabitGroupModel(int id, DateTime date, IEnumerable<HabitModel> habits) 
        {
            Id = id;
            Date = date;
            this.habits = habits.ToList();
        }

        public HabitModel this[int i]
        {
            get { return habits[i]; }
            set { habits[i] = value; }
        }

        public async static Task<IEnumerable<HabitGroupModel>> GetAllUserHabitGroups(string username)
        {
            return null;
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
