using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace BetterDay.Models
{
    public static class TokenHandler
    {
        public static string? GetCurrentUser(HttpContext context)
        {
            var identity = context.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                return identity.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value;
            }
            return null;
        }

    }
}
