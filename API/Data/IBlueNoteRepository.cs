using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Data
{
    public interface IBlueNoteRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<User> GetUser(int id);
         Task<IEnumerable<Lesson>> GetAdminLessons(int adminId);
         Task<IEnumerable<Lesson>> GetAllLessons();
         Task<Lesson> GetLesson(int lessonId);
    }
}