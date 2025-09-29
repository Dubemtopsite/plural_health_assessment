using System.Text.Json;
using plural_health_backend.Data;
using plural_health_backend.Models;

namespace plural_health_backend.Services;

public class LogAuditService
{
    private readonly AppDatabaseContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public LogAuditService(AppDatabaseContext context, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task LogAuditAsync(object logContent)
    {
        var ip = _httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
        _context.AuditLogs.Add(new AuditLog
        {
            IpAddress = ip,
            Details = JsonSerializer.Serialize(logContent)
        });
        await _context.SaveChangesAsync();
    }
}