using OkGroomer.Models;
using System.Collections.Generic;

namespace OkGroomer.Repositories
{
    public interface IServiceRepository
    {
        void Add(Service service);
        void Delete(int id);
        void Edit(int id, Service service);
        List<Service> GetAll();
        Service GetServiceById(int id);
    }
}