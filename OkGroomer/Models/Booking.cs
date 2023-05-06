using System;
using System.Collections.Generic;

namespace OkGroomer.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public UserProfile Profile { get; set; }
        public int DogId { get; set; }
        public Dog Dog { get; set; }
        public int GroomerId { get; set; }
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
        public List<int> GroomerBookingRatesId { get; set; }
        public List<Service> Services { get; set; }

    }
}
