using MySqlConnector;
using BetterDay.Errors;
using Newtonsoft.Json;

namespace BetterDay.Models
{
    public class NoteModel
    {
        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public string Note { get; set; }
        [JsonConstructor]
        public NoteModel(int id, DateTime? date, string note)
        {
            Id = id;
            Date = date;
            Note = note;
        }

        public async static Task<IEnumerable<NoteModel>> GetAllUserNotes(string username)
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
            return notes;
        }

        public async static Task<IEnumerable<NoteModel>> GetTodaysNotes(string username)
        {
            var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            var query = new MySqlCommand(@$"SELECT n.Id, n.Date, n.Note
                                            FROM notes AS n
                                            INNER JOIN users AS u
                                            ON n.UserID = u.ID
                                            WHERE u.Username = '{username}' AND DATE(Date) = CURDATE();", connection);
            var reader = await query.ExecuteReaderAsync();

            List<NoteModel> notes = new List<NoteModel>();
            while (await reader.ReadAsync())
            {
                notes.Add(new NoteModel((int)reader[0], (DateTime)reader[1], (string)reader[2]));
            }
            await reader.CloseAsync();
            await connection.CloseAsync();
            return notes;
        }

        public async static Task<IEnumerable<NoteModel>> GetNotesByDate(string username, DateTime date)
        {
            var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            var query = new MySqlCommand(@$"SELECT n.Id, n.Date, n.Note
                                            FROM notes AS n
                                            INNER JOIN users AS u
                                            ON n.UserID = u.ID
                                            WHERE u.Username = '{username}' AND DATE(Date) = '{date.ToString("yyyy-MM-dd")}';", connection);
            var reader = await query.ExecuteReaderAsync();

            List<NoteModel> notes = new List<NoteModel>();
            while (await reader.ReadAsync())
            {
                notes.Add(new NoteModel((int)reader[0], (DateTime)reader[1], (string)reader[2]));
            }
            await reader.CloseAsync();
            await connection.CloseAsync();
            return notes;
        }

        public async static Task<ApiError> CreateNote(string username, NoteModel note)
        {
            ApiError response;
            var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            note.Date ??= DateTime.Now;

            var query = new MySqlCommand(@$"INSERT INTO notes (UserID, Date, Note)
                                            VALUES ({TokenHandler.GetUserId(username).Result},
                                                    '{note.Date.Value.ToString("yyyy-MM-dd")}',
                                                    '{note.Note}');", connection);
            var reader = await query.ExecuteReaderAsync();
            if (reader.RecordsAffected == 0)
            {
                response = new ApiError(444, "Note not created");
            }
            else
            {
                response = new ApiError(200, "Note successfully created");
            }
            await reader.CloseAsync();
            await connection.CloseAsync();
            return response;
        }

        public async static Task<ApiError> UpdateNote(string username, NoteModel note)
        {
            ApiError response;
            var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            var query = new MySqlCommand(@$"UPDATE notes
                                            SET Date = '{note.Date.Value.ToString("yyyy-MM-dd")}', Note = '{note.Note}'
                                            WHERE ID = {note.Id} AND UserId = {TokenHandler.GetUserId(username).Result};", connection);
            var reader = await query.ExecuteReaderAsync();
            if (reader.RecordsAffected == 0)
            {
                response = new ApiError(444, "Note not updated");
            }
            else
            {
                response = new ApiError(200, "Note successfully updated");
            }
            await reader.CloseAsync();
            await connection.CloseAsync();
            return response;
        }

        public async static Task<ApiError> DeleteNote(string username, int id)
        {
            ApiError response;
            var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            var query = new MySqlCommand(@$"DELETE FROM notes
                                            WHERE ID = {id} AND UserId = {TokenHandler.GetUserId(username).Result};", connection);
            var reader = await query.ExecuteReaderAsync();
            if (reader.RecordsAffected == 0)
            {
                response = new ApiError(444, "Note not deleted");
            }
            else
            {
                response = new ApiError(200, "Note successfully deleted");
            }
            await reader.CloseAsync();
            await connection.CloseAsync();
            return response;
        }
    }
}
