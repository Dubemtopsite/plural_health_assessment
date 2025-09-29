namespace plural_health_backend.Models;
using System.ComponentModel.DataAnnotations;

public class AuditLog: BaseModel
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Details { get; set; }
    public string IpAddress { get; set; }
}