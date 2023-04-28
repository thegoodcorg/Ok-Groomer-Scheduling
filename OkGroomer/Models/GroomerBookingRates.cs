namespace OkGroomer.Models
{
    public class GroomerBookingRates
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int GroomerId { get; set; }
        public decimal SmallDogPrice { get; set; }
        public decimal MediumDogPrice { get; set; }
        public decimal LargeDogPrice { get; set; }
        public decimal TimeToComplete { get; set; }

    }
}
