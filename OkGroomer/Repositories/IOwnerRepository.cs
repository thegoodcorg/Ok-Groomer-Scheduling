using OkGroomer.Models;
using System.Collections.Generic;

namespace OkGroomer.Repositories
{
    public interface IOwnerRepository
    {
        List<Owner> GetAll();

        public Owner GetOwnerById(int id);
        public void Add(Owner owner);
        public void Edit(int id, Owner owner);
        public void Delete(int id);
    }
}