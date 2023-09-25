using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace BetterDay.Models
{
    public static class TokenHandler
    {
        public static string? GetCurrentUser(IEnumerable<Claim> claims)
        {
            return claims.FirstOrDefault(x => x.Type == "Username")?.Value;
        }

    }
}
