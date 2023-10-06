namespace BetterDay.Models
{
    public class HabitListModel
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public HabitListModel(int id, string title)
        {
            Id = id;
            Title = title;
        }
    }
}
