using Microsoft.AspNetCore.Mvc;
using BetterDay.Models;
using Microsoft.AspNetCore.Authorization;

namespace BetterDay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HabitController : ControllerBase
    {
        [HttpGet("today")]
        public async Task<IActionResult> GetTodaysHabits()
        {
            return null;
        }

        [HttpGet("{startDate}:{endDate}")]
        public async Task<IActionResult> GetHabitsBetweenDates(DateTime startDate, DateTime endDate)
        {
            return null;
        }

        [HttpPut("create/{date}")]
        public async Task<IActionResult> CreateHabitsForDate(DateTime date, [FromBody] IEnumerable<HabitModel> habits)
        {
            return null;
        }

        [HttpPost("update/{id}/{status}")]
        public async Task<IActionResult> UpdateHabit(int id, bool status)
        {
            return null;
        }

    }
}
