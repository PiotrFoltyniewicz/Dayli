using MySqlConnector;

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
            Date = date;
            Title = title;
            Status = status;
        }

        public async static Task<IEnumerable<HabitModel>> GetAllUserHabits(string username)
        {
            var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            var query = new MySqlCommand(@$"SELECT n.Id, n.Date, n.Note
                                            FROM notes AS n
                                            INNER JOIN users AS u
                                            ON n.UserID = u.ID
                                            WHERE u.Username = '{username}';", connection);
            var reader = await query.ExecuteReaderAsync();

            List<NoteModel> notes = new List<NoteModel>();
            while (await reader.ReadAsync())
            {
                notes.Add(new NoteModel((int)reader[0], (DateTime)reader[1], (string)reader[2]));
            }
            await reader.CloseAsync();
            await connection.CloseAsync();
            HabitGroupModel m;
            return null;
        }
    }
}
