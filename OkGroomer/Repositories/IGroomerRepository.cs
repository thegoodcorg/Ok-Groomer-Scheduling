using OkGroomer.Models;
using System.Collections.Generic;

namespace OkGroomer.Repositories
{
    public interface IGroomerRepository
    {
        void Add(Groomer owner);
        void Delete(int id);
        void Edit(int id, Groomer owner);
        List<Groomer> GetAll();
        Groomer GetGroomerById(int id);
    }
}