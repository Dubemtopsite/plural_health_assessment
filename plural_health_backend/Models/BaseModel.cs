namespace plural_health_backend.Models;

public abstract class BaseModel
{
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}