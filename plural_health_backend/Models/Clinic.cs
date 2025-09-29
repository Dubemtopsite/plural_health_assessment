using System.ComponentModel.DataAnnotations;

namespace plural_health_backend.Models;

public class Clinic: BaseModel
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    public required string ClinicName { get; set; }
}