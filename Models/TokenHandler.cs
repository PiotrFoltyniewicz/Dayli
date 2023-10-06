using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using MySqlConnector;

namespace BetterDay.Models
{
    public static class TokenHandler
    {
        public static string? GetCurrentUser(IEnumerable<Claim> claims)
        {
            return claims.FirstOrDefault(x => x.Type == "Username")?.Value;
        }

        public static async Task<int> GetUserId(string username)
        {
            var connection = new MySqlConnection("Server=localhost;User ID=root;Password=;Database=betterdaydb");
            await connection.OpenAsync();

            var query = new MySqlCommand(@$"SELECT ID
                                            FROM users
                                            WHERE Username = '{username}';", connection);
            var reader = await query.ExecuteReaderAsync();

            await reader.ReadAsync();
            int userId = (int)reader[0];
            await reader.CloseAsync();
            await connection.CloseAsync();
            return userId;
        }
    }
}
