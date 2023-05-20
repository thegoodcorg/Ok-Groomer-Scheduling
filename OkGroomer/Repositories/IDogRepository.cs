using OkGroomer.Models;
using System.Collections.Generic;

namespace OkGroomer.Repositories
{
    public interface IDogRepository
    {
        void Add(Dog dog);
        void Delete(int id);
        void Edit(int id, Dog dog);
        List<Dog> GetAll();
        Dog GetDogById(int id);
        List<Dog> GetDogsByUserId(int userId);
    }
}