using OkGroomer.Models;
using System.Collections.Generic;

namespace OkGroomer.Repositories
{
    public interface IBookingRepository
    {
        void Add(Booking booking);
        void Delete(int id);
        void Edit(int id, Booking booking);
        List<Booking> GetAll();
        Booking GetBookingById(int id);
    }
}