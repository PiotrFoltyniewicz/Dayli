using MySqlConnector;
using BetterDay.Errors;
using Newtonsoft.Json;

namespace BetterDay.Models
{
    public class TaskModel
    {
        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public string Title { get; set; }
        public bool Status { get; set; }
        [JsonConstructor]
        public TaskModel(int id, DateTime? date, string title, bool status)
        {
            Id = id;
            Date = date;
            Title = title;
            Status = status;
        }
        /*
        [JsonConstructor]
        public TaskModel(DateTime? date, string title, bool status)
        {
            Date = date;
            Title = title;
            Status = status;
        }
        */
        public async static Task<IEnumerable<TaskModel>> GetAllUserTasks(string username)
        {
            var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            var query = new MySqlCommand(@$"SELECT t.Id, t.Date, t.Title, t.Status
                                            FROM tasks AS t
                                            INNER JOIN users AS u
                                            ON t.UserID = u.ID
                                            WHERE u.Username = '{username}';", connection);
            var reader = await query.ExecuteReaderAsync();

            List<TaskModel> tasks = new List<TaskModel>();
            while (await reader.ReadAsync())
            {
                tasks.Add(new TaskModel((int)reader[0], (DateTime)reader[1], (string)reader[2], (bool)reader[3]));
            }
            await reader.CloseAsync();
            await connection.CloseAsync();
            return tasks;
        }

        public async static Task<IEnumerable<TaskModel>> GetTodaysTasks(string username)
        {
            var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            var query = new MySqlCommand(@$"SELECT t.Id, t.Date, t.Title, t.Status
                                            FROM tasks AS t
                                            INNER JOIN users AS u
                                            ON t.UserID = u.ID
                                            WHERE u.Username = '{username}' AND DATE(Date) = CURDATE();", connection);
            var reader = await query.ExecuteReaderAsync();

            List<TaskModel> tasks = new List<TaskModel>();
            while(await reader.ReadAsync())
            {
                tasks.Add(new TaskModel((int)reader[0], (DateTime)reader[1], (string)reader[2], (bool)reader[3]));
            }
            await reader.CloseAsync();
            await connection.CloseAsync();
            return tasks;
        }

        public async static Task<IEnumerable<TaskModel>> GetTasksByDate(string username, DateTime date)
        {
            var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            var query = new MySqlCommand(@$"SELECT t.Id, t.Date, t.Title, t.Status
                                            FROM tasks AS t
                                            INNER JOIN users AS u
                                            ON t.UserID = u.ID
                                            WHERE u.Username = '{username}' AND DATE(Date) = '{date.ToString("yyyy-MM-dd")}';", connection);
            var reader = await query.ExecuteReaderAsync();

            List<TaskModel> tasks = new List<TaskModel>();
            while (await reader.ReadAsync())
            {
                tasks.Add(new TaskModel((int)reader[0], (DateTime)reader[1], (string)reader[2], (bool)reader[3]));
            }
            await reader.CloseAsync();
            await connection.CloseAsync();
            return tasks;
        }

        public async static Task<ApiError> CreateTask(string username, TaskModel task)
        {
            ApiError response;
            var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            task.Date ??= DateTime.Now;

            var query = new MySqlCommand(@$"INSERT INTO tasks (UserID, Date, Title, Status)
                                            VALUES ({TokenHandler.GetUserId(username).Result},
                                                    '{task.Date.Value.ToString("yyyy-MM-dd")}',
                                                    '{task.Title}',
                                                    false);", connection);
            var reader = await query.ExecuteReaderAsync();
            if(reader.RecordsAffected == 0)
            {
                response = new ApiError(444, "Task not created");
            }
            else
            {
                response = new ApiError(200, "Task successfully created");
            }
            await reader.CloseAsync();
            await connection.CloseAsync();
            return response;
        }

        public async static Task<ApiError> UpdateTask(string username, TaskModel task)
        {
            ApiError response;
            var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            var query = new MySqlCommand(@$"UPDATE tasks
                                            SET Date = '{task.Date.Value.ToString("yyyy-MM-dd")}', Title = '{task.Title}', Status = {task.Status}
                                            WHERE ID = {task.Id} AND UserId = {TokenHandler.GetUserId(username).Result};", connection);
            var reader = await query.ExecuteReaderAsync();
            if (reader.RecordsAffected == 0)
            {
                response = new ApiError(444, "Task not updated");
            }
            else
            {
                response = new ApiError(200, "Task successfully updated");
            }
            await reader.CloseAsync();
            await connection.CloseAsync();
            return response;
        }

        public async static Task<ApiError> DeleteTask(string username, int id)
        {
            ApiError response;
            var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            var query = new MySqlCommand(@$"DELETE FROM tasks
                                            WHERE ID = {id} AND UserId = {TokenHandler.GetUserId(username).Result};", connection);
            var reader = await query.ExecuteReaderAsync();
            if (reader.RecordsAffected == 0)
            {
                response = new ApiError(444, "Task not deleted");
            }
            else
            {
                response = new ApiError(200, "Task successfully deleted");
            }
            await reader.CloseAsync();
            await connection.CloseAsync();
            return response;
        }
    }
}
