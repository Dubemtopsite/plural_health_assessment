using System.ComponentModel.DataAnnotations;

namespace plural_health_backend.Models;

public enum InvoiceStatus
{
    Draft,
    Finalized,
    PartiallyPaid,
    Paid
}

public class Invoice: BaseModel
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public Guid PatientId { get; set; }
    public Patient Patient { get; set; }
    public decimal Subtotal { get; set; }
    public decimal Discount { get; set; }
    public decimal Total { get; set; }
    public InvoiceStatus Status { get; set; } = InvoiceStatus.Draft;
    public string InvoiceNumber { get; set; }
    public ICollection<InvoiceItem> Items { get; set; }
    public ICollection<TransactionHistory> Payments { get; set; }
}