using MySqlConnector;
using BetterDay.Errors;

namespace BetterDay.Models
{
    public class UserModel
    {
        public int? Id { get; private set; }
        public string Username { get; private set; }
        public string Password { get; private set; }

        // constructor for model creation by user
        public UserModel(string username, string password)
        {
            Username = username;
            Password = password;
        }

        public async static Task<ApiError> CreateUser(UserModel userData)
        {
            using var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            var query = new MySqlCommand($"SELECT Username FROM users WHERE{userData.Username}");
            var reader = await query.ExecuteReaderAsync();

            if (reader.HasRows)
            {
                await connection.CloseAsync();
                return new ApiError(469, "This username already exists");
            }

            query = new MySqlCommand($"INSERT INTO users (Username, Password) VALUES ({userData.Username}, {Encryption.EncryptText(userData.Password)})");
            reader = await query.ExecuteReaderAsync();

            await connection.CloseAsync();
            return new ApiError(111, "Successfully created new user");
        }
    }
}
