using System.ComponentModel.DataAnnotations;

namespace plural_health_backend.Models;

public class TransactionHistory: BaseModel
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    public Guid InvoiceId { get; set; }
    public Invoice Invoice { get; set; }
    
    [Required]
    public decimal Amount { get; set; }
    
    [Required]
    public string Method { get; set; } = "Cash"; // Only cash supported as per story
    
    public DateTime Date { get; set; } = DateTime.UtcNow;
    
    public Guid CreatedByUserId { get; set; }
}