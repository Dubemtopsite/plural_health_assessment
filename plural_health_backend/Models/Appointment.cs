using System.ComponentModel.DataAnnotations;

namespace plural_health_backend.Models;

public class Appointment
{
    [Key]
    public Guid AppointmentId { get; set; } =  Guid.NewGuid();
    
    [Required]
    public Guid PatientId { get; set; }
    
    [Required]
    public Guid ClinicId { get; set; }

    [Required] 
    public required string AppointmentType { get; set; }
    
    public Boolean ShouldRepeat { get; set; } = false;
    
    [Required]
    public DateOnly AppointmentDate { get; set; }
    
    [Required]
    public TimeSpan StartTime { get; set; }
    
    public TimeSpan Duration { get; set; } = TimeSpan.FromHours(1);
    
    public TimeSpan EndTime => StartTime + Duration;
    
    public string Status { get; set; } = "Scheduled";
    
    public Patient? Patient { get; set; }
    public Clinic? Clinic { get; set; }
}