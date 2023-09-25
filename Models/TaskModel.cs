using MySqlConnector;

namespace BetterDay.Models
{
    public class TaskModel
    {
        public int Id { get; private set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public bool Status { get; set; }

        public TaskModel(int id, DateTime date, string title, bool status)
        {
            Id = id;
            Date = date;
            Title = title;
            Status = status;
        }

        public TaskModel(DateTime date, string title, bool status)
        {
            Date = date;
            Title = title;
            Status = status;
        }

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

        public async static Task<IEnumerable<TaskModel>> GetTodaysTask(string username)
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

        public async static Task<IEnumerable<TaskModel>> GetTasks(string username, DateTime start, DateTime end)
        {
            return null;
        }
    }
}
