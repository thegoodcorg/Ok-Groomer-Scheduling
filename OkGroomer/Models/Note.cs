namespace OkGroomer.Models
{
    public class Note
    {
        public int Id { get; set; }
        public int DogId { get; set; }
        public string Content { get; set; }
        public int GroomerId { get; set; }

    }
}
