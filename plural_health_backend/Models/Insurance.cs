using System.ComponentModel.DataAnnotations;

namespace plural_health_backend.Models;

public class Insurance: BaseModel
{
    [Key]
    public Guid InsuranceId { get; set; } = Guid.NewGuid();
    
    [Required]
    public Guid PatientId { get; set; }
    
    [Required]
    public required string Insurer { get; set; }
    
    [Required]
    public required string InusurancePlan {get; set;}
    
    
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool IsActive => DateTime.UtcNow >= StartDate && DateTime.UtcNow <= EndDate; 
    
    public Patient? Patient { get; set; }
}