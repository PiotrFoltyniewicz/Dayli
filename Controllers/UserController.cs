﻿using Microsoft.AspNetCore.Mvc;
using BetterDay.Models;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using System.Text;
using BetterDay.Errors;

namespace BetterDay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IConfiguration configuration;
        private ILogger logger;

        public UserController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginUser([FromBody] UserModel user)
        {
            if(user != null)
            {
                if (await UserModel.LoginUser(user))
                {
                    string token = CreateToken(user.Username);
                    return Ok(token);
                }
            }
            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterUser([FromBody] UserModel user)
        {
            if (user.Username == null || user.Password == null)
            {
                return new JsonResult(new ApiError(400, "Username or password is null"));
            }
            var result = await UserModel.CreateUser(user);
            return new JsonResult(result);
        }

        private string CreateToken(string username, bool refresh = false)
        {
            var issuer = configuration["Jwt:Issuer"];
            var audience = configuration["Jwt:Audience"];
            var key = Encoding.ASCII.GetBytes(configuration["Jwt:Key"]);
            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature);

            var subject = new ClaimsIdentity(new[]
            {
                        new Claim(JwtRegisteredClaimNames.Sub, configuration["JWT:Subject"]),
                        new Claim("Username", username)
                    });

            var expires = DateTime.UtcNow.AddDays(1);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = subject,
                Expires = expires,
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = signingCredentials,
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            return jwtToken;
        }

    }
}
