using System.ComponentModel.DataAnnotations;

namespace plural_health_backend.Models;

public class Wallet: BaseModel
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    public required Guid PatientId { get; set; }
    [Required]
    public required decimal Balance { get; set; }
    
    public Patient Patient { get; set; }
    
}