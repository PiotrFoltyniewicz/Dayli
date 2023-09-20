namespace BetterDay.Models
{
    public static class Encryption
    {
        public static string EncryptText(string text) => Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(text));

        public static string DecryptText(string text) => System.Text.Encoding.UTF8.GetString(Convert.FromBase64String(text));
    }
}
