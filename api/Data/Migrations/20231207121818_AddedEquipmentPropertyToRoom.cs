using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedEquipmentPropertyToRoom : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RoomId",
                table: "EquipmentItems",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_EquipmentItems_RoomId",
                table: "EquipmentItems",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_EquipmentItems_Rooms_RoomId",
                table: "EquipmentItems",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EquipmentItems_Rooms_RoomId",
                table: "EquipmentItems");

            migrationBuilder.DropIndex(
                name: "IX_EquipmentItems_RoomId",
                table: "EquipmentItems");

            migrationBuilder.DropColumn(
                name: "RoomId",
                table: "EquipmentItems");
        }
    }
}
