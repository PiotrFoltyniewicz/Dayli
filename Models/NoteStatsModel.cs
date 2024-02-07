namespace BetterDay.Models
{
    public class NoteStatsModel
    {
        public async static Task<IEnumerable<DateTime>> GetDaysWithNotes(string username, DateTime startDate, DateTime endDate)
        {
            IEnumerable<NoteModel> notes = NoteModel.GetNotesBetweenDates(username, startDate, endDate).Result;
            return notes.Select(task => (DateTime)task.Date).Distinct();
        }
    }
}
