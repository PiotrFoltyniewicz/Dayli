using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BetterDay.Models;
using Newtonsoft.Json;

namespace BetterDay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HabitListController : ControllerBase
    {
        [HttpGet]
        public async Task<IEnumerable<HabitListModel>> GetHabitsList()
        {
            string currUser = TokenHandler.GetCurrentUser(User.Claims);
            return await HabitListModel.GetHabitList(currUser);
        }

        [HttpPut("add/{title}")]
        public async Task<int> AddHabitToList(string title)
        {
            string currUser = TokenHandler.GetCurrentUser(User.Claims);
            var result = await HabitListModel.AddHabitToList(currUser, title);
            return result;
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteHabitFromList(int id)
        {
            string currUser = TokenHandler.GetCurrentUser(User.Claims);
            var result = await HabitListModel.DeleteHabitFromList(currUser, id);
            return new JsonResult(result);
        }
    }
}
