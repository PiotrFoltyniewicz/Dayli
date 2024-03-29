﻿using System.Linq;

namespace BetterDay.Models
{
    public struct Percentage
    {
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public int totalTasks { get; set; }
        public int tasksDone { get; set; }
        public float percentage { get; set; }
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
            if (stats.totalTasks == 0)
            {
                stats.percentage = 0;
            }
            else
            {
                stats.percentage = (float)Math.Round(((double)stats.tasksDone / (double)stats.totalTasks),2);
            }
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

        public async static Task<IEnumerable<DateTime>> GetDaysWithUnfinishedTasks(string username, DateTime startDate, DateTime endDate)
        {
            IEnumerable<TaskModel> tasks = TaskModel.GetTasksBetweenDates(username, startDate, endDate).Result;
            return tasks.Where(task => task.Status == false).Select(task => (DateTime)task.Date).Distinct();
        }
    }
}
