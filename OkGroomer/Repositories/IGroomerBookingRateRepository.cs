using OkGroomer.Models;
using System.Collections.Generic;

namespace OkGroomer.Repositories
{
    public interface IGroomerBookingRateRepository
    {
        void Add(GroomerBookingRates bookingRate);
        void Delete(int id);
        void Edit(int id, GroomerBookingRates bookingRate);
        List<GroomerBookingRates> GetAll();
        GroomerBookingRates GetGroomerBookingRateById(int id);
        GroomerBookingRates GetDistinctRate(int serviceId, int groomerId);
    }
}