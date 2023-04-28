using System;

namespace OkGroomer.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int DogId { get; set; }
        public int GroomerId { get; set; }
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
    }
}
