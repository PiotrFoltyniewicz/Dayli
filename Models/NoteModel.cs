namespace BetterDay.Models
{
    public class NoteModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Note { get; set; }

        public NoteModel(int id, DateTime date, string note)
        {
            Id = id;
            Date = date;
            Note = note;
        }
    }
}
