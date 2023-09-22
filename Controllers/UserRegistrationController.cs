using Microsoft.AspNetCore.Mvc;
using BetterDay.Models;
using BetterDay.Errors;

namespace BetterDay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRegistrationController : ControllerBase
    {
        private readonly ILogger _logger;

        public UserRegistrationController(ILogger<UserRegistrationController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody] UserModel user)
        {
            if(user.Username == null || user.Password == null)
            {
                return new JsonResult(new ApiError(400, "Username or password is null"));
            }
            var result = await UserModel.CreateUser(user);
            return new JsonResult(result);
        }
    }
}
