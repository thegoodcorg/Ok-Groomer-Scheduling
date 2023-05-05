using Microsoft.Extensions.Configuration;
using OkGroomer.Models;
using System.Collections.Generic;
using System.ComponentModel;
using System.Xml.Linq;
using Tabloid.Repositories;
using Tabloid.Utils;

namespace OkGroomer.Repositories
{
    public class BookingRepository : BaseRepository, IBookingRepository
    {
        public BookingRepository(IConfiguration configuration) : base(configuration) { }

        public List<Booking> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, DogId, GroomerId, Date, Price FROM Booking";

                    var bookings = new List<Booking>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var booking = new Booking()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            DogId = DbUtils.GetInt(reader, "DogId"),
                            GroomerId = DbUtils.GetInt(reader, "GroomerId"),
                            Date = DbUtils.GetDateTime(reader, "Date"),
                            Price = DbUtils.GetDecimal(reader, "Price")
                        };
                        bookings.Add(booking);
                    }
                    reader.Close();

                    return bookings;
                }
            }
        }
        public List<Booking> GetBookingByGroomerId(int groomerId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT 
                                            bk.Id, 
                                            bk.DogId, 
                                            bk.GroomerId, 
                                            bk.Date, 
                                            bk.Price,
                                            dog.Name, 
                                            dog.Weight, 
                                            dog.OwnerId,
                                            up.FirstName,
                                            up.LastName,
                                            up.Email
                                        FROM Booking bk
                                        LEFT JOIN Dog dog on bk.DogId = dog.Id
                                        LEFT JOIN UserProfile up on up.Id = dog.OwnerId
                                        WHERE GroomerId = @GroomerId";
                    DbUtils.AddParameter(cmd, "@GroomerId", groomerId);

                    var bookings = new List<Booking>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var booking = new Booking()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            DogId = DbUtils.GetInt(reader, "DogId"),
                            GroomerId = DbUtils.GetInt(reader, "GroomerId"),
                            Date = DbUtils.GetDateTime(reader, "Date"),
                            Price = DbUtils.GetDecimal(reader, "Price"),
                            Dog = new Dog()
                            {
                                Name = DbUtils.GetString(reader, "Name"),
                                Weight = DbUtils.GetInt(reader, "Weight"),
                                OwnerId = DbUtils.GetInt(reader, "OwnerId")
                            },
                            Profile = new UserProfile()
                            {
                                FirstName = DbUtils.GetString(reader,"FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader,"Email")
                            }
                            
                        };
                        bookings.Add(booking);
                    }
                    reader.Close();

                    return bookings;
                }
            }
        }
        public Booking GetBookingById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    Select
                                        Id, 
                                        DogId,
                                        GroomerId,
                                        Date
                                    From Booking
                                    WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    Booking booking = null;
                    if (reader.Read())
                    {
                        booking = new Booking()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            DogId = DbUtils.GetInt(reader, "DogId"),
                            GroomerId = DbUtils.GetInt(reader, "GroomerId"),
                            Date = DbUtils.GetDateTime(reader, "Date")
                        };
                    }
                    reader.Close();
                    return booking;
                }
            }
        }
        public List<Booking> GetBookingByDogId(int dogId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT 
                                            Id, 
                                            DogId, 
                                            GroomerId, 
                                            Date, 
                                            Price 
                                        FROM Booking
                                        WHERE dogId = @dogId";
                    DbUtils.AddParameter(cmd, "@dogId", dogId);

                    var bookings = new List<Booking>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var booking = new Booking()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            DogId = DbUtils.GetInt(reader, "DogId"),
                            GroomerId = DbUtils.GetInt(reader, "GroomerId"),
                            Date = DbUtils.GetDateTime(reader, "Date"),
                            Price = DbUtils.GetDecimal(reader, "Price")
                        };
                        bookings.Add(booking);
                    }
                    reader.Close();

                    return bookings;
                }
            }
        }
        public int Add(Booking booking)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Booking (DogId, GroomerId, Date, Price)
                                        OUTPUT INSERTED.ID
                                        VALUES (@DogId, @GroomerId, @Date, @Price)";

                    DbUtils.AddParameter(cmd, "@DogId", booking.DogId);
                    DbUtils.AddParameter(cmd, "@GroomerId", booking.GroomerId);
                    DbUtils.AddParameter(cmd, "@Date", booking.Date);
                    DbUtils.AddParameter(cmd, "@Price", booking.Price);

                    booking.Id = (int)cmd.ExecuteScalar();
                }
                return booking.Id;
            }
        }

        public void AddBookingSelections(int bookingId, int groomerBookingRateId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO BookingSelections (BookingId, GroomerBookingRatesId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@BookingId, @GroomerBookingRatesId)";

                    DbUtils.AddParameter(cmd, "@BookingId", bookingId);
                    DbUtils.AddParameter(cmd, "@GroomerBookingRatesId", groomerBookingRateId);

                   cmd.ExecuteNonQuery();
                }
            }
        }

        public void Edit(int id, Booking booking)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Booking
                                        SET 
                                            DogId = @DogId,
                                            GroomerId = @GroomerId,
                                            Price = @Price
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@DogId", booking.DogId);
                    DbUtils.AddParameter(cmd, "@GroomerId", booking.GroomerId);
                    DbUtils.AddParameter(cmd, "@Price", booking.Price);


                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Booking WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
