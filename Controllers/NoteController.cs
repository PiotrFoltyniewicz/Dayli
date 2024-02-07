using Microsoft.AspNetCore.Mvc;
using BetterDay.Models;
using Microsoft.AspNetCore.Authorization;

namespace BetterDay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NoteController : ControllerBase
    {
        [HttpGet("today")]
        public async Task<IEnumerable<NoteModel>> GetTodaysNotes()
        {
            string currUser = TokenHandler.GetCurrentUser(User.Claims);
            return await NoteModel.GetTodaysNotes(currUser);
        }

        [HttpGet("all")]
        public async Task<IEnumerable<NoteModel>> GetAllNotes()
        {
            string currUser = TokenHandler.GetCurrentUser(User.Claims);
            return await NoteModel.GetAllUserNotes(currUser);
        }

        [HttpGet("{date}")]
        public async Task<IEnumerable<NoteModel>> GetNotesByDate(DateTime date)
        {
            string currUser = TokenHandler.GetCurrentUser(User.Claims);
            return await NoteModel.GetNotesByDate(currUser, date);
        }

        [HttpPut("create")]
        public async Task<IActionResult> CreateNote([FromBody] NoteModel note)
        {
            string currUser = TokenHandler.GetCurrentUser(User.Claims);
            var result = await NoteModel.CreateNote(currUser, note);
            return new JsonResult(result);
        }

        [HttpPost("update/{id}")]
        public async Task<IActionResult> UpdateNote(int id, [FromBody] NoteModel note)
        {
            note.Id = id;
            string currUser = TokenHandler.GetCurrentUser(User.Claims);
            var result = await NoteModel.UpdateNote(currUser, note);
            return new JsonResult(result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            string currUser = TokenHandler.GetCurrentUser(User.Claims);
            var result = await NoteModel.DeleteNote(currUser, id);
            return new JsonResult(result);
        }

        [HttpGet("stats/calendar/{startDate}:{endDate}")]
        public async Task<IEnumerable<DateTime>> GetDaysWithNotes(int interval, DateTime startDate, DateTime endDate)
        {
            string currUser = TokenHandler.GetCurrentUser(User.Claims);
            return await NoteStatsModel.GetDaysWithNotes(currUser, startDate, endDate);
        }
    }
}
