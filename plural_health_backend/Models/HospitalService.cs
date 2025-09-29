using System.ComponentModel.DataAnnotations;

namespace plural_health_backend.Models;

public class HospitalService: BaseModel
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public string Name { get; set; }
    public decimal Price { get; set; }
    public bool RequiresPreAuth { get; set; }
}