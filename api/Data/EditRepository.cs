using api.Entities;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class EditRepository : IEditRepository
    {
        private readonly DataContext _context;

        public EditRepository(DataContext context)
        {
            _context = context;
        }

        public void AddEditItem(EditItem editItem)
        {
            _context.EditItems.Add(editItem);
        }

        public async Task<EditItem> GetEditItemByIdAsync(int id)
        {
            return await _context.EditItems.Include(i => i.Images).SingleOrDefaultAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<EditItem>> GetEditItemsAsync()
        {
            return await _context.EditItems.Include(i => i.Images).ToListAsync();
        }

        public void RemoveEditItem(EditItem editItem)
        {
            _context.EditItems.Remove(editItem);
        }
    }
}
