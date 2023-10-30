using MySqlConnector;
using BetterDay.Errors;

namespace BetterDay.Models
{
    public class HabitModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool Status { get; set; }

        public HabitModel(int id, string title, bool status)
        {
            Id = id;
            Title = title;
            Status = status;
        }

        public async Task<ApiError> UpdateHabit(string username, HabitModel habit)
        {
            return null;
        }
    }
}
