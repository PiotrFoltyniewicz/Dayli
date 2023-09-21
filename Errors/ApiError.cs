namespace BetterDay.Errors
{
    public class ApiError
    {
        public int StatusCode { get; private set; }
        public string Message { get; private set; }

        public ApiError(int statusCode, string message)
        {
            StatusCode = statusCode;
            Message = message;
        }
    }
}
