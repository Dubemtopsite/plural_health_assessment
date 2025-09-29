using Microsoft.EntityFrameworkCore;
using plural_health_backend.Models;

namespace plural_health_backend.Data;

public class AppDatabaseContext: DbContext
{
    public AppDatabaseContext(DbContextOptions<AppDatabaseContext> options) : base(options) {}

    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
    {
        OnBeforeSave();
        return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Clinic>().HasData(
            new Clinic { Id = new Guid("459c24ab-3ac6-4782-9360-a0ce7cb85376"), ClinicName = "Accident and Emergency", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Clinic { Id = new Guid("fbb47023-62dd-440d-8a07-91615fbb9927"), ClinicName = "Neurology", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Clinic { Id = new Guid("6a885e00-e948-4a85-8eb3-7e7fcdd82946"), ClinicName = "Cardiology", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Clinic { Id = new Guid("fa31e486-ee6d-4b8c-b10b-d8b32b1e5e21"), ClinicName = "Gastroenterology", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Clinic { Id = new Guid("5b199233-16f3-477f-9cab-3474bfab608d"), ClinicName = "Renal", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
            );

        modelBuilder.Entity<HospitalService>().HasData(
            new HospitalService { Id = Guid.Parse("f4a3a9ff-2f7a-41e4-8d61-2d4a1d8e1d77"), Name = "General Consultation", Price = 5000.00m, RequiresPreAuth = false },
            new HospitalService { Id = Guid.Parse("c7e0b1cb-6bde-47e2-9158-083f9f8ec71a"), Name = "Pediatric Checkup", Price = 7000.00m, RequiresPreAuth = false },
            new HospitalService { Id = Guid.Parse("a87ff679-a4f3-4c0e-9d4e-7e6e9a7b9c3d"), Name = "Dental Examination", Price = 8000.00m, RequiresPreAuth = false },
            new HospitalService { Id = Guid.Parse("c9bf9e57-1685-4c89-bafb-0f1f5c7b3a4e"), Name = "Eye Examination", Price = 6000.00m, RequiresPreAuth = false },
            new HospitalService { Id = Guid.Parse("1b4f972a-e0dc-4e3f-9f8e-3e2a9b5c8d7f"), Name = "X-Ray Imaging", Price = 15000.00m, RequiresPreAuth = true },
            new HospitalService { Id = Guid.Parse("2c5d3e8b-9f4c-4a1b-8e2d-4f9e1b6c7d8a"), Name = "Blood Test", Price = 5000.00m, RequiresPreAuth = false },
            new HospitalService { Id = Guid.Parse("3d6e4f9c-0a5d-4b2c-9f3e-5a8b2c7d9e0f"), Name = "Ultrasound Scan", Price = 20000.00m, RequiresPreAuth = true },
            new HospitalService { Id = Guid.Parse("4e7f5a0d-1b6e-4c3d-8f4e-6b9c3d8e0a1f"), Name = "Cardiology Consultation", Price = 12000.00m, RequiresPreAuth = false },
            new HospitalService { Id = Guid.Parse("5f8a6b1e-2c7f-4d4e-9a5e-7c8d9e0a1b2c"), Name = "Physiotherapy Session", Price = 10000.00m, RequiresPreAuth = false },
            new HospitalService { Id = Guid.Parse("6a9b7c2f-3d8c-4e5f-8a6e-8d9a0b1c2d3e"), Name = "Gynecological Exam", Price = 9000.00m, RequiresPreAuth = false },
            new HospitalService { Id = Guid.Parse("7b0c8d3f-4e9a-5f6b-9a7f-9a0b1c2d3e4f"), Name = "Orthopedic Consultation", Price = 11000.00m, RequiresPreAuth = false },
            new HospitalService { Id = Guid.Parse("8c1d9e4a-5f0b-6c7d-8e9f-0a1b2c3d4e5f"), Name = "MRI Scan", Price = 50000.00m, RequiresPreAuth = true },
            new HospitalService { Id = Guid.Parse("9d2e0f5b-6c1c-7d8e-9f0a-1a2b3c4d5e6f"), Name = "Vaccination Admin", Price = 3000.00m, RequiresPreAuth = false },
            new HospitalService { Id = Guid.Parse("0e3f1a6c-7d2d-8e9f-0a1b-2a3b4c5d6e7f"), Name = "Dermatology Checkup", Price = 8000.00m, RequiresPreAuth = false },
            new HospitalService { Id = Guid.Parse("1f4a2b7d-8e3e-9f0a-1b2c-3a4b5c6d7e8f"), Name = "Endocrinology Consult", Price = 13000.00m, RequiresPreAuth = false },
            new HospitalService { Id = Guid.Parse("2a5b3c8e-9f4f-0a1b-2c3d-4a5b6c7d8e9f"), Name = "Physical Therapy", Price = 9000.00m, RequiresPreAuth = false },
            new HospitalService { Id = Guid.Parse("3b6c4d9f-0a5a-1b2c-3d4e-5a6b7c8d9e0f"), Name = "Neurology Exam", Price = 15000.00m, RequiresPreAuth = true },
            new HospitalService { Id = Guid.Parse("4c7d5e0a-1b6b-2c3d-4e5f-6a7b8c9d0e1f"), Name = "Allergy Testing", Price = 7000.00m, RequiresPreAuth = false },
            new HospitalService { Id = Guid.Parse("5d8e6f1b-2c7c-3d4e-5f6a-7a8b9c0d1e2f"), Name = "Surgical Consultation", Price = 20000.00m, RequiresPreAuth = true },
            new HospitalService { Id = Guid.Parse("6e9f7a2c-3d8d-4e5f-6a7b-8a9b0c1d2e3f"), Name = "Routine Checkup", Price = 4000.00m, RequiresPreAuth = false }
        );;
        
        modelBuilder.Entity<Wallet>()
            .HasOne(w => w.Patient)
            .WithOne(p => p.Wallet)
            .HasForeignKey<Wallet>(w => w.PatientId)
            .IsRequired();

        modelBuilder.Entity<Insurance>()
            .HasOne(i => i.Patient)
            .WithOne(p => p.Insurance)
            .HasForeignKey<Insurance>(i => i.PatientId)
            .IsRequired();

        modelBuilder.Entity<Appointment>()
            .HasOne(a => a.Patient)
            .WithMany()
            .HasForeignKey(a => a.PatientId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Appointment>()
            .HasOne(a => a.Clinic)
            .WithMany()
            .HasForeignKey(a => a.ClinicId)
            .OnDelete(DeleteBehavior.Cascade);
    }
    
    

    public DbSet<Clinic> Clinics { get; set; }
    public DbSet<Patient> Patients { get; set; }
    public DbSet<Insurance> Insurances { get; set; }
    public DbSet<Wallet> Wallets { get; set; }
    public DbSet<AuditLog> AuditLogs { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Invoice> Invoices { get; set; }
    public DbSet<InvoiceItem> InvoiceItems { get; set; }  
    public DbSet<TransactionHistory> TransactionHistories { get; set; }
    public DbSet<HospitalService> HospitalServices { get; set; }


    private void OnBeforeSave()
    {
        var entries = ChangeTracker.Entries()
            .Where(e => e.Entity is BaseModel && (e.State == EntityState.Added || e.State == EntityState.Modified));

        foreach (var entry in entries)
        {
            var entity = (BaseModel)entry.Entity;
            if (entry.State == EntityState.Added)
            {
                entity.CreatedAt = DateTime.UtcNow;
            }
            entity.UpdatedAt = DateTime.UtcNow;
        }
    }
    
}