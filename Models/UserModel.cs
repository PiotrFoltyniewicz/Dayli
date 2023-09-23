using MySqlConnector;
using BetterDay.Errors;
using Microsoft.AspNetCore.Mvc;
using BetterDay.Models;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using System.Text;

namespace BetterDay.Models
{
    public class UserModel
    {
        public string Username { get; private set; }
        public string Password { get; private set; }

        public UserModel(string username, string password)
        {
            Username = username;
            Password = password;
        }

        public async static Task<ApiError> CreateUser(UserModel userData)
        {
            using var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            var query = new MySqlCommand($"SELECT Username FROM `users` WHERE Username = '{userData.Username}'", connection);
            var reader = await query.ExecuteReaderAsync();
            if (reader.HasRows)
            {
                await connection.CloseAsync();
                return new ApiError(422, "User already exists");
            }
            await reader.CloseAsync();

            query = new MySqlCommand($"INSERT INTO `users` (Username, Password) VALUES ('{userData.Username}', '{Encryption.EncryptText(userData.Password)}')", connection);
            reader = await query.ExecuteReaderAsync();
            await reader.CloseAsync();

            await connection.CloseAsync();
            return new ApiError(201, "Successfully created new user");
        }

        public async static Task<bool> LoginUser(UserModel userData)
        {
            using var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();
            var query = new MySqlCommand($"SELECT Username, Password FROM `users` WHERE Username = '{userData.Username}'", connection);
            var reader = await query.ExecuteReaderAsync();
            if (reader.HasRows)
            {
                await reader.ReadAsync();
                if(Encryption.DecryptText(reader.GetString(2)) == userData.Password)
                {
                    await reader.CloseAsync();
                    await connection.CloseAsync();
                    return true;
                }

            }
            await reader.CloseAsync();
            await connection.CloseAsync();
            return false;
        }
    }
}
