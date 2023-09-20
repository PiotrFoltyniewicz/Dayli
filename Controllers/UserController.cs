using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BetterDay.Models;
using BetterDay.Errors;

namespace BetterDay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILogger _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IActionResult CreateUser([FromBody] UserModel user)
        {
            var result = UserModel.CreateUser(user).Result;

            return StatusCode(result.StatusCode, result.ErrorMessage);
        }
    }
}
