using Microsoft.AspNetCore.Mvc;
using BetterDay.Models;

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
        public async Task<IActionResult> Index([FromBody] UserModel user)
        {
            var result = await UserModel.CreateUser(user);
            return new JsonResult(result);
        }
    }
}
