namespace BetterDay.Models
{
    public class HabitModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public bool Status { get; set; }

        public HabitModel(int id, DateTime date, string title, bool status)
        {
            Id = id;
            Date = date;
            Title = title;
            Status = status;
        }
    }
}
