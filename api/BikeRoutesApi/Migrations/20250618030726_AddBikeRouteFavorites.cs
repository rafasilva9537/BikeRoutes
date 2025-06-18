using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BikeRoutesApi.Migrations
{
    /// <inheritdoc />
    public partial class AddBikeRouteFavorites : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "favorite_bike_routes",
                columns: table => new
                {
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    BikeRouteId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_favorite_bike_routes", x => new { x.UserId, x.BikeRouteId });
                    table.ForeignKey(
                        name: "FK_favorite_bike_routes_bike_routes_BikeRouteId",
                        column: x => x.BikeRouteId,
                        principalTable: "bike_routes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_favorite_bike_routes_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_favorite_bike_routes_BikeRouteId",
                table: "favorite_bike_routes",
                column: "BikeRouteId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "favorite_bike_routes");
        }
    }
}
