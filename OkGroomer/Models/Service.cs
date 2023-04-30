namespace OkGroomer.Models
{
    public class Service
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int GroomerId { get; set; }
        public bool DoesGroomerPerform { get; set; }

    }
}
