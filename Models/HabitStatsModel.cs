namespace BetterDay.Models
{
    public struct HabitStats
    {
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }

        public SingleHabitStat[] habits { get; set; }
    }

    public struct SingleHabitStat
    {
        public string habitName { get; set; }
        public int daysDone { get; set; }
        public float percentage { get; set; }
    }
    public class HabitStatsModel
    {
        public async static Task<HabitStats> GetStats(string username, DateTime startDate, DateTime endDate)
        {
            IEnumerable<HabitGroupModel> habits = HabitGroupModel.GetHabitGroupByDates(username, startDate, endDate).Result;

            HabitStats stats = new HabitStats();
            stats.startDate = startDate;
            stats.endDate = endDate;
            return stats;
        }
    }
}
