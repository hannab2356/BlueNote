using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class BlueNoteRepository : IBlueNoteRepository
    {
        private readonly DataContext _context;
        public BlueNoteRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<IEnumerable<Lesson>> GetAllLessons()
        {
            var lessons = await _context.Lessons.ToListAsync();

            return lessons;
        }

        public async Task<Lesson> GetLesson(int lessonId)
        {
            var lessons = await _context.Lessons.FirstOrDefaultAsync(u => u.Id == lessonId);

            return lessons;
        }

        public async Task<IEnumerable<Lesson>> GetAdminLessons(int adminId)
        {
            var lessons = await _context.Lessons
                    .OrderBy(l => l.CreatedDate)
                    .Where(i => i.AdminId == adminId)
                    .ToListAsync();

            return lessons;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}