namespace plural_health_backend.Services;

public class ApiResponse<T>
{
    public bool Success { get; set; } = true;
    public string Message { get; set; } = string.Empty;
    public T? Data { get; set; }
    public object? Errors { get; set; }
    
    public static ApiResponse<T> SuccessResponse(T data, string message = "Request successful")
    {

        return new ApiResponse<T>
        {
            Success = true,
            Data = data,
            Message = message,
        };
    }

    public static ApiResponse<T> ErrorResponse(string message, object? errors = null)
    {
        return new ApiResponse<T>
        {
            Success = false,
            Message = message,
            Errors = errors,
        };
    }
}