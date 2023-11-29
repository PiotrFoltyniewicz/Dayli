using System.Text.Json.Serialization;

namespace BetterDay.Models
{
    public class HabitListArray
    {
        public HabitListModel[] Array { get; set; }

        [JsonConstructor]
        public HabitListArray(HabitListModel[] array)
        {
            Array = array;
        }
    }
}
