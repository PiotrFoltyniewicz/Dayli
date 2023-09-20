namespace BetterDay.Errors
{
    public class ApiError
    {
        public int StatusCode { get; private set; }
        public string ErrorMessage { get; private set; }

        public ApiError(int statusCode, string errorMessage)
        {
            StatusCode = statusCode;
            ErrorMessage = errorMessage;
        }
    }
}
