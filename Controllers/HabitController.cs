using Microsoft.AspNetCore.Mvc;
using BetterDay.Models;

namespace BetterDay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HabitController : ControllerBase
    {
        [HttpGet("today")]
        public async Task<IActionResult> GetTodaysHabits()
        {
            return null;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetHabitsList()
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

        [HttpPut("add/{title}")]
        public async Task<IActionResult> AddHabitToList(string title)
        {
            return null;
        }

        [HttpPost("update/{id}/{status}")]
        public async Task<IActionResult> UpdateHabit(int id, bool status)
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
