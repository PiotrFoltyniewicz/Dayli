using Microsoft.AspNetCore.Mvc;
using BetterDay.Models;

namespace BetterDay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        [HttpGet("today")]
        public async Task<IActionResult> GetTodaysNote()
        {
            return null;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllNotes()
        {
            return null;
        }

        [HttpGet("{date}")]
        public async Task<IActionResult> GetNoteByDate(DateTime date)
        {
            return null;
        }

        [HttpPut("create")]
        public async Task<IActionResult> CreateNote(int id, [FromBody]  NoteModel note)
        {
            return null;
        }

        [HttpPost("update/{id}")]
        public async Task<IActionResult> UpdateNote(int id, [FromBody] NoteModel note)
        {
            return null;
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            return null;
        }
    }
}
