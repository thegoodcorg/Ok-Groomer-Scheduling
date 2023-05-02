namespace OkGroomer.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string FirebaseId { get; set; }
        public bool Groomer { get; set; }

    }
}
