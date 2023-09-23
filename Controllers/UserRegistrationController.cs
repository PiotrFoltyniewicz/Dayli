using Microsoft.AspNetCore.Mvc;
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
    public class UserRegistrationController : ControllerBase
    {
        private IConfiguration configuration;
        private ILogger logger;

        public UserRegistrationController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody] UserModel user)
        {
            if (user.Username == null || user.Password == null)
            {
                return new JsonResult(new ApiError(400, "Username or password is null"));
            }
            var result = await UserModel.CreateUser(user);
            return new JsonResult(result);
        }
    }
}
