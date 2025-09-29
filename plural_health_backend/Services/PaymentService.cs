using plural_health_backend.Data;

namespace plural_health_backend.Services;

public class PaymentService
{
    private readonly AppDatabaseContext _context;
    

    public PaymentService(AppDatabaseContext context)
    {
        _context = context;
    }
}