namespace BetterDay.Models
{
    public class TaskModel
    {
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public bool Status { get; set; }

        public TaskModel(DateTime date, string title, int status)
        {
            Date = date;
            Title = title;
            if(status == 0)
            {
                Status = false;
            }
            else
            {
                Status = true;
            }
        }
    }
}
