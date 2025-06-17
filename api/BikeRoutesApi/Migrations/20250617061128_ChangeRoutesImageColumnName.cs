using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BikeRoutesApi.Migrations
{
    /// <inheritdoc />
    public partial class ChangeRoutesImageColumnName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "photo",
                table: "bike_routes",
                newName: "image");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "image",
                table: "bike_routes",
                newName: "photo");
        }
    }
}
