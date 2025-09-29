using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NanoidDotNet;
using plural_health_backend.Data;
using plural_health_backend.DTOs;
using plural_health_backend.Models;
using plural_health_backend.Services;

namespace plural_health_backend.Controllers
{
    [ApiController]
    [Route("api/patient")]
    
    public class PatientController: ControllerBase
    {
    
        private readonly PatientService _service;
        private readonly AppDatabaseContext _context;
        private readonly LogAuditService _logService;

        public PatientController(PatientService service,  AppDatabaseContext context,  LogAuditService logService)
        {
            _service = service;
            _context = context;
            _logService = logService;
        }

        [HttpGet]
        public async Task<IActionResult> FetchPatients([FromQuery] string? search, [FromQuery] string? sortBy,  [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var response = await _service.GetPatientsAsync(search ?? "",page);
                return Ok(ApiResponse<Object>.SuccessResponse(response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse<Object>.ErrorResponse(ex.Message ?? "Error processing request"));
            }
        }

        [HttpGet("{patientUid}")]
        public async Task<IActionResult> FetchPatient(string patientUid)
        {
            try
            {
                var patientDetail = await _context.Patients.FirstOrDefaultAsync(p => p.PatientUid == (patientUid));
                
                if (patientDetail == null)
                {
                    return NotFound(ApiResponse<object>.ErrorResponse("Patient not found"));
                }
                return Ok(ApiResponse<object>.SuccessResponse(patientDetail));
            }
            catch (Exception error)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse(error.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreatePatient([FromBody] CreateEditPatientDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ApiResponse<object>.ErrorResponse("Validation error", ModelState));
                }
                

                var patient = new Patient
                {
                    PatientUid = "HOSP" + Nanoid.Generate("092314567570", 8),
                    Title = dto.Title,
                    FirstName = dto.FirstName,
                    LastName = dto.LastName,
                    MiddleName = dto.MiddleName ?? "",
                    Email = dto.Email ?? "",
                    PhoneNumber = dto.PhoneNumber,
                    Address = dto.Address ?? "",
                    Status = "ACTIVE",
                    Gender = dto.Gender,
                    BirthDate = dto.DateOfBirth,
                    Country = dto.Country ?? "",
                    StateOfOrigin = dto.State ?? "",
                    HasInsurance = (dto.Insurer != null & dto.Insurer.Length > 0) ? true  : false,
                    Image = ""
                    
                };
                var insurance = new Insurance
                {
                    Insurer = dto.Insurer ?? "",
                    InusurancePlan = dto.InusurancePlan ?? "",
                    StartDate = dto.StartDate,
                    EndDate = dto.EndDate,
                };
                var response = await _service.CreatePatientAsync(patient, insurance);
                return Ok(ApiResponse<object>.SuccessResponse("", "Patient Added Successfully"));
            }
            catch (Exception error)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse(error.Message));
            }
        }
    }
}