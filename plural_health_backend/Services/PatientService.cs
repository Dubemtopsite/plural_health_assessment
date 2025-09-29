using Microsoft.EntityFrameworkCore;
using plural_health_backend.Data;
using plural_health_backend.Models;

namespace plural_health_backend.Services
{

    public class PatientService
    {
        private readonly AppDatabaseContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly LogAuditService _logAuditService;

        public PatientService(AppDatabaseContext context, IHttpContextAccessor httpContextAccessor,  LogAuditService logAuditService)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _logAuditService = logAuditService;
        }

        public async Task<Patient> DoPatientExist(Guid patientId)
        {
            var query = await _context.Patients.Where(p => p.PatientId == patientId).FirstOrDefaultAsync();
            if (query == null)
            {
                throw new Exception("Patient not found");
            };
            return query;
        }

        public async Task<List<Patient>> GetPatientsAsync(string search, int page)
        {
            try
            {
                var query = _context.Patients.Include(a => a.Wallet).AsQueryable();
                if (!string.IsNullOrEmpty(search))
                {
                    query = query.Where(p =>
                        p.FirstName.Contains(search) || p.LastName.Contains(search) || p.PatientUid.Contains(search));
                }

                query = query.OrderBy(p => p.CreatedAt).Skip((page - 1) * 10).Take(10);
                return await query.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<Patient> CreatePatientAsync(Patient patient, Insurance insurance)
        {
            var doPatientExist = await _context.Patients.FirstOrDefaultAsync(p =>
                p.PhoneNumber == patient.PhoneNumber && p.BirthDate == patient.BirthDate && p.Gender == patient.Gender);
            if (doPatientExist != null)
            {
                throw new  Exception("Patient with the provided detail already exists");
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
            
            try
            {
                
                _context.Patients.Add(patient);
                await _context.SaveChangesAsync();

                _context.Wallets.Add(new Wallet { PatientId = patient.PatientId, Balance = 0 });
                await _context.SaveChangesAsync();

                if (patient.HasInsurance)
                {
                    _context.Insurances.Add(new Insurance
                    {
                        PatientId = patient.PatientId, Insurer = insurance.Insurer,
                        InusurancePlan = insurance.InusurancePlan, StartDate = insurance.StartDate,
                        EndDate = insurance.EndDate
                    });
                    await _context.SaveChangesAsync();
                }
                
                await transaction.CommitAsync();

                await _logAuditService.LogAuditAsync(
                    new
                    {
                        created_by = "Front Desk Staff",
                        patientId = patient.PatientId,
                        patientUid = patient.PatientUid
                    });

                return patient;
            }
            catch {
                await transaction.RollbackAsync();
                throw;
                
            }
        }

    }
}