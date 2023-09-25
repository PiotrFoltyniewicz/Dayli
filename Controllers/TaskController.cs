using Microsoft.AspNetCore.Mvc;
using BetterDay.Models;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BetterDay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskController : ControllerBase
    {

        // GET: api/task
        [HttpGet]
        [Route("today")]
        public async Task<IEnumerable<TaskModel>> GetTodaysTask()
        {
            //return await TaskModel.GetAllUserTasks(TokenHandler.GetCurrentUser(User.Claims));
            return await TaskModel.GetTodaysTask(TokenHandler.GetCurrentUser(User.Claims));
        }

        [HttpGet]
        [Route("all")]
        public async Task<IEnumerable<TaskModel>> GetAllTasks()
        {
            return await TaskModel.GetAllUserTasks(TokenHandler.GetCurrentUser(User.Claims));
        }

        /*
        // GET api/task/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TaskController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<TaskController>/5
        [HttpPut("{id}")]
        public void (int id, [FromBody] string value)
        {
        }

        // DELETE api/<TaskController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        */
    }
}
