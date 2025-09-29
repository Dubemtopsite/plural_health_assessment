using System.ComponentModel.DataAnnotations;

namespace plural_health_backend.Models;

public class InvoiceItem: BaseModel
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public Guid InvoiceId { get; set; }
    public Invoice Invoice { get; set; }
    [Required]
    public Guid ServiceId { get; set; }
    public HospitalService Service { get; set; }
    [Required]
    public int Quantity { get; set; } = 1;
    public decimal UnitPrice { get; set; }
    public decimal Discount { get; set; }
    public decimal Total => (UnitPrice * Quantity) - Discount;
}