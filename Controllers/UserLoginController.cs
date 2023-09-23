using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BetterDay.Models;

namespace BetterDay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLoginController : ControllerBase
    {
        private readonly ILogger _logger;

        public UserLoginController(ILogger<UserLoginController> logger)
        {
            _logger = logger;
        }
        [HttpPost]
        public async Task<IActionResult> Index([FromBody] UserModel user)
        {
            //błędy var result = await UserModel.LoginUser(user);
            //      return new JsonResult(result);
            return null;
        }
    }
}
