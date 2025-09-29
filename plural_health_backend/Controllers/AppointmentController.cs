using Microsoft.AspNetCore.Mvc;
using plural_health_backend.Data;
using plural_health_backend.DTOs;
using plural_health_backend.Models;
using plural_health_backend.Services;

namespace plural_health_backend.Controllers;

[ApiController]
[Route("api/appointment")]

public class AppointmentController: ControllerBase
{
    private readonly PatientService _patientService;
    private readonly AppDatabaseContext _context;
    private readonly LogAuditService _logService;
    private readonly AppointmentService _appointmentService;
    private readonly GeneralService _generalService;

    public AppointmentController(PatientService service, AppointmentService appointmentService, GeneralService generalService,  AppDatabaseContext context,  LogAuditService logService)
    {
        _patientService = service;
        _context = context;
        _logService = logService;
        _appointmentService = appointmentService;
        _generalService = generalService;
    }
    
    [HttpGet]
    public async Task<IActionResult> FetchAppointments([FromQuery] DateOnly? date, [FromQuery] Guid? clinicId, [FromQuery] string search, [FromQuery] int page = 1, [FromQuery] int pageSize = 20, [FromQuery] bool ascending = true)
    {
        try
        {
            var response = await _appointmentService.GetAppointmentsAsync(date, clinicId, search, page, pageSize, ascending);
            return Ok(ApiResponse<Object>.SuccessResponse(response));
        }
        catch (Exception ex)
        {
            return BadRequest(ApiResponse<Object>.ErrorResponse(ex.Message ?? "Error processing request"));
        }
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateNewAppointment([FromBody] CreateEditAppointmentDto dto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse("Validation error", ModelState));
            }
            
            await _patientService.DoPatientExist(dto.PatientId);
            await _generalService.GetClinicAsync(dto.ClinicId);
            var appointment = new Appointment
            {
                PatientId = dto.PatientId,
                ClinicId = dto.ClinicId,
                AppointmentType = dto.AppointmentType,
                ShouldRepeat = dto.ShouldRepeat,
                AppointmentDate = dto.AppointmentDate,
                StartTime = dto.StartTime
            };
            
            await _appointmentService.CreateAppointmentAsync(appointment);
            
            return Ok(ApiResponse<object>.SuccessResponse(appointment, "Appointment created successfully"));
        }
        catch (Exception ex)
        {
            return BadRequest(ApiResponse<Object>.ErrorResponse(ex.Message ?? "Error processing request"));
        }
    }
    
}