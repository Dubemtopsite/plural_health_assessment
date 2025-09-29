using System.ComponentModel.DataAnnotations;

namespace plural_health_backend.DTOs;

enum TitleEnum
{
    Mr, Mrs, Miss, Master
}

enum GenderEnum
{
    Male, Female
}

public class CreateEditPatientDto
{
    [Required] [EnumDataType(typeof(TitleEnum))] public string Title { get; set; } = null!;
    [Required] [StringLength(50)] public string FirstName { get; set; } = null!;
    [Required] [StringLength(50)] public string LastName { get; set; } = null!;
    public string? MiddleName { get; set; }
    public string? Email { get; set; }
    
    [Required] public DateOnly DateOfBirth { get; set; }
    [Required] [Phone] public string PhoneNumber { get; set; } = null!;

    [Required]
    [EnumDataType(typeof(GenderEnum))]
    public string Gender { get; set; } = null!;
    public string? Address { get; set; }
    public string? Country { get; set; }
    public string? State { get; set; }
    
    // For Insurance
    public string? Insurer { get; set; }  = null!;
    
    public string? InusurancePlan {get; set;} = null!;
    
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}