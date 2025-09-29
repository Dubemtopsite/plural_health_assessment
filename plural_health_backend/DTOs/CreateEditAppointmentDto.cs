using System.ComponentModel.DataAnnotations;

namespace plural_health_backend.DTOs;

public class CreateEditAppointmentDto
{
    [Required] public Guid PatientId { get; set; }
    [Required] public Guid ClinicId { get; set; }
    [Required] public string AppointmentType { get; set; } = null!;
    public Boolean ShouldRepeat { get; set; } = false;
    [Required] public DateOnly AppointmentDate { get; set; }
    [Required] public TimeSpan StartTime { get; set; }
}