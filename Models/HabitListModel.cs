using MySqlConnector;
using BetterDay.Errors;

namespace BetterDay.Models
{
    public class HabitListModel
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public HabitListModel(int id, string title)
        {
            Id = id;
            Title = title;
        }
        public async static Task<IEnumerable<HabitListModel>> GetHabitList(string username)
        {
            var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            var query = new MySqlCommand(@$"SELECT h.Id, h.Title
                                            FROM habitslist AS h
                                            INNER JOIN users AS u
                                            ON h.UserID = u.ID
                                            WHERE u.Username = '{username}';", connection);
            var reader = await query.ExecuteReaderAsync();

            List<HabitListModel> habitlist = new List<HabitListModel>();
            while (await reader.ReadAsync())
            {
                habitlist.Add(new HabitListModel((int)reader[0], (string)reader[1]));
            }
            await reader.CloseAsync();
            await connection.CloseAsync();
            return habitlist;
        }
        public async static Task<ApiError> AddHabitToList(string username, string title)
        {
            ApiError response;
            var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            var query = new MySqlCommand(@$"INSERT INTO habitslist (UserID, Title)
                                            VALUES ({TokenHandler.GetUserId(username).Result},
                                                    '{title}');", connection);
            var reader = await query.ExecuteReaderAsync();
            if (reader.RecordsAffected == 0)
            {
                response = new ApiError(444, "Habit not added");
            }
            else
            {
                response = new ApiError(200, "Habit successfully added");
            }
            await reader.CloseAsync();
            await connection.CloseAsync();
            return response;
        }
        public async static Task<ApiError> DeleteHabitFromList(string username, int id)
        {
            ApiError response;
            var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            var query = new MySqlCommand(@$"DELETE FROM habitslist
                                            WHERE ID = {id} AND UserId = {TokenHandler.GetUserId(username).Result};", connection);
            var reader = await query.ExecuteReaderAsync();
            if (reader.RecordsAffected == 0)
            {
                response = new ApiError(444, "Habit not deleted");
            }
            else
            {
                response = new ApiError(200, "Habit successfully deleted");
            }
            await reader.CloseAsync();
            await connection.CloseAsync();
            return response;
        }
    }
}
