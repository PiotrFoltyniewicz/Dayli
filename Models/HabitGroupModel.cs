namespace BetterDay.Models
{
    public class HabitGroupModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        private List<HabitModel> habits;

        public HabitGroupModel(int id, DateTime date, IEnumerable<HabitModel> habits) 
        {
            Id = id;
            Date = date;
            this.habits = habits.ToList();
        }

        public HabitModel this[int i]
        {
            get { return habits[i]; }
            set { habits[i] = value; }
        }
    }
}
