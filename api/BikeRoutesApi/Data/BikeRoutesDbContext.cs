using BikeRoutesApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace BikeRoutesApi.Data;

public class BikeRoutesDbContext : DbContext
{
    public BikeRoutesDbContext()
    {
    }

    public BikeRoutesDbContext(DbContextOptions<BikeRoutesDbContext> options)
        : base(options)
    {
    }

    public DbSet<BikeRoute> BikeRoutes { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("postgis");

        modelBuilder.Entity<BikeRoute>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("bike_routes_pkey");

            entity.ToTable("bike_routes");

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.AverageSpeed).HasColumnName("average_speed");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Distance).HasColumnName("distance");
            entity.Property(e => e.Duration).HasColumnName("duration");
            entity.Property(e => e.EndPath)
                .HasColumnType("geography(Point,4326)")
                .HasColumnName("end_path");
            entity.Property(e => e.PathRoutes)
                .HasColumnType("geography(LineString,4326)")
                .HasColumnName("path_routes");
            entity.Property(e => e.Image).HasColumnName("image");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.StartPath)
                .HasColumnType("geography(Point,4326)")
                .HasColumnName("start_path");
            entity.Property(e => e.Title)
                .HasColumnType("character varying")
                .HasColumnName("title");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.BikeRoutes)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("bike_routes_users_id_fkey");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("users_pkey");

            entity.ToTable("users");

            entity.HasIndex(e => e.Email, "users_email_key").IsUnique();

            entity.HasIndex(e => e.Phone, "users_phone_key").IsUnique();

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.Email)
                .HasColumnType("character varying")
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasColumnType("character varying")
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasColumnType("character varying")
                .HasColumnName("last_name");
            entity.Property(e => e.Phone)
                .HasColumnType("character varying")
                .HasColumnName("phone");
            entity.Property(e => e.Photo).HasColumnName("photo");
        });
    }
}
