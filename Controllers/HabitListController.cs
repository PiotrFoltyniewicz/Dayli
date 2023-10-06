using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace BetterDay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HabitListController : ControllerBase
    {
        [HttpGet("list")]
        public async Task<IActionResult> GetHabitsList()
        {
            return null;
        }

        [HttpPut("add/{title}")]
        public async Task<IActionResult> AddHabitToList(string title)
        {
            return null;
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteHabitFromList(int id)
        {
            return null;
        }
    }
}
