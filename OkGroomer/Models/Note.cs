using System;

namespace OkGroomer.Models
{
    public class Note
    {
        public int Id { get; set; }
        public int DogId { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public int GroomerId { get; set; }
        public UserProfile Groomer { get; set; }


    }
}
