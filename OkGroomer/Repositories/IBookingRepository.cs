using OkGroomer.Models;
using System.Collections.Generic;

namespace OkGroomer.Repositories
{
    public interface IBookingRepository
    {
        int Add(Booking booking);
        void Delete(int id);
        void Edit(int id, Booking booking);
        List<Booking> GetAll();
        Booking GetBookingById(int id);
        List<Booking> GetBookingByDogId(int dogId);
        List<Booking> GetBookingByGroomerId(int groomerId);
        void AddBookingSelections(int bookingId, int groomerBookingRateId);
    }
}