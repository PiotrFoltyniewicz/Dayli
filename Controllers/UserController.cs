using Microsoft.AspNetCore.Mvc;
using BetterDay.Models;

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
        public async Task<IActionResult> CreateUser([FromBody] UserModel user)
        {
            var result = await UserModel.CreateUser(user);
            return new JsonResult(result);
        }

        /*
        [HttpPost]
        public async Task<IActionResult> LoginUser([FromBody] UserModel user)
        {
            var result = await UserModel.LoginUser(user);
            return new JsonResult(result);
        }
        */
    }
}
