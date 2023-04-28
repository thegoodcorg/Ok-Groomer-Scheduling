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

        public void Add(Booking booking)
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
