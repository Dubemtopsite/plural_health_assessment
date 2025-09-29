namespace plural_health_backend.Models;
using System.ComponentModel.DataAnnotations;

public class Patient :BaseModel
{
    [Key]
    public Guid PatientId { get; set; } = Guid.NewGuid();

    [Required]
    public required string PatientUid { get; set; }
    
    [Required]
    public required string Title {get; set;}
    
    [Required]
    public required string FirstName { get; set; }
    
    [Required]
    public required string LastName { get; set; }

    public string MiddleName { get; set; } = null!;

    public string Email { get; set; } = null!;
    
    [Required]
    public DateOnly BirthDate { get; set; } 
    
    [Required]
    public required string PhoneNumber { get; set; }
    
    [Required]
    public required string Address { get; set; }

    public string Country { get; set; } = null!;

    public string StateOfOrigin { get; set; } = null!;

    public string Image { get; set; } = null!;

    [Required] public required string Gender { get; set; }
    
    public Boolean HasInsurance { get; set; }
    
    public required string Status { get; set; }
    
    public Wallet Wallet { get; set; }
    
    public Insurance? Insurance { get; set; }

}