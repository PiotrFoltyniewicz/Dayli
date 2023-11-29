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

        public async static Task<ApiError> UpdateHabit(string username, int id, bool status)
        {
            ApiError response;
            var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            var query = new MySqlCommand(@$"UPDATE habits
                                            SET Status = {status}
                                            WHERE ID = {id} AND UserId = {TokenHandler.GetUserId(username).Result};", connection);
            var reader = await query.ExecuteReaderAsync();
            if (reader.RecordsAffected == 0)
            {
                response = new ApiError(444, "Habit not updated");
            }
            else
            {
                response = new ApiError(200, "Habit successfully updated");
            }
            await reader.CloseAsync();
            await connection.CloseAsync();
            return response;
        }
    }
}
