using System.Linq;

namespace BetterDay.Models
{
    public struct Percentage
    {
        public DateTime startDate;
        public DateTime endDate;
        public int totalTasks;
        public int tasksDone;
        public float percentage;
    }
    public class TaskStatsModel
    {
        public async static Task<Percentage> GetPercentage(string username, DateTime startDate, DateTime endDate)
        {
            IEnumerable<TaskModel> tasks = TaskModel.GetTasksBetweenDates(username, startDate, endDate).Result;

            Percentage stats = new Percentage();
            stats.startDate = startDate;
            stats.endDate = endDate;
            stats.totalTasks = tasks.Count();
            stats.tasksDone = tasks.Count(task => task.Status == true);
            stats.percentage = stats.tasksDone / stats.totalTasks;

            return stats;
        }

        public async static Task<IEnumerable<Percentage>> GetPercentagesByInterval(string username, DateTime startDate, DateTime endDate, int interval)
        {
            List<Percentage> statsList = new List<Percentage>();

            while(startDate <  endDate)
            {
                DateTime intervalEnd = startDate.AddDays(interval);
                statsList.Add(await GetPercentage(username, startDate, intervalEnd));
                startDate = startDate.AddDays(interval);
            }

            return statsList;
        }
    }
}
