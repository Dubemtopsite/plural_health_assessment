using Microsoft.EntityFrameworkCore;
using plural_health_backend.Data;
using plural_health_backend.Models;

namespace plural_health_backend.Services;

public class GeneralService
{
    private readonly AppDatabaseContext _context;
    

    public GeneralService(AppDatabaseContext context)
    {
        _context = context;
    }

    public async Task<Clinic> GetClinicAsync(Guid clinicId)
    {
        var query = await _context.Clinics.Where(p => p.Id == clinicId).FirstOrDefaultAsync();
        if (query == null) throw new Exception("Clinic not found");
        return query;
    }
}