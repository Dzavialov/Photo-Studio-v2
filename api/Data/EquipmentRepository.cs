using api.Entities;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class EquipmentRepository : IEquipmentRepository
    {
        private readonly DataContext _context;

        public EquipmentRepository(DataContext context)
        {
            _context = context;
        }

        public void AddEquipment(EquipmentItem equipment)
        {
           _context.EquipmentItems.Add(equipment);
        }

        public async Task<IEnumerable<EquipmentItem>> GetEquipmentAsync()
        {
            return await _context.EquipmentItems.Include(i => i.Image).ToListAsync();
        }

        public async Task<EquipmentItem> GetEquipmentItemByIdAsync(int id)
        {
            return await _context.EquipmentItems.Include(i => i.Image).SingleOrDefaultAsync(e => e.Id == id);
        }

        public void RemoveEquipment(EquipmentItem equipment)
        {
            _context.EquipmentItems.Remove(equipment);
        }
    }
}
