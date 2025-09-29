using Microsoft.EntityFrameworkCore;
using plural_health_backend.Data;
using plural_health_backend.Models;

namespace plural_health_backend.Services;

public class AppointmentService
{
    private readonly AppDatabaseContext _context;
    

    public AppointmentService(AppDatabaseContext context)
    {
        _context = context;
    }

    public async Task<List<Appointment>> GetAppointmentsAsync(DateOnly? date = null,Guid? clinicId = null, string search = null, int page = 1, int pageSize = 20, bool ascending = true)
    {
        date ??= DateOnly.FromDateTime(DateTime.Today);
        var query = _context.Appointments.Include(a => a.Patient).Include(a => a.Clinic).Include(a => a.Patient.Wallet)
            .Where(a => a.AppointmentDate == date.Value);
        if (clinicId.HasValue)
        {
            query = query.Where(a => a.ClinicId == clinicId.Value);
        }

        if (!string.IsNullOrEmpty(search))
        {
            query = query.Where(a => a.Patient.FirstName.Contains(search) || a.Patient.LastName.Contains(search) || a.Patient.PhoneNumber.Contains(search) || a.Patient.PatientUid.Contains(search));
        }

        query = ascending ? query.OrderBy(a => a.StartTime) : query.OrderByDescending(a => a.StartTime);

        return await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
    }

    public async Task<Appointment> CreateAppointmentAsync(Appointment appointment)
    {
        if (appointment.AppointmentDate < DateOnly.FromDateTime(DateTime.Today) || appointment.StartTime < TimeSpan.Zero)
        {
            throw new Exception("Invalid date/time.");
        }
        
        var overlapping = await _context.Appointments.AnyAsync(a => a.ClinicId == appointment.ClinicId && a.AppointmentDate == appointment.AppointmentDate && ((a.StartTime < appointment.EndTime && a.EndTime > appointment.StartTime) ||
                                                                        (appointment.StartTime < a.EndTime && appointment.EndTime > a.StartTime)) &&
                                                                    Math.Abs((a.StartTime - appointment.StartTime).TotalHours) < 2);
        
        if (overlapping)
        {
            throw new Exception("Double booking detected.");
        }
        _context.Appointments.Add(appointment);
        await _context.SaveChangesAsync();
        
        return appointment;
    }
}