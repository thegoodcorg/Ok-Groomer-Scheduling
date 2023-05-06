using Microsoft.Extensions.Configuration;
using OkGroomer.Models;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
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
                                            up.Email,
                                            bsl.GroomerBookingRatesId,
                                            gbr.ServiceId,
                                            srv.Name as ServiceName,
                                            srv.Description
                                            FROM Booking bk
                                            LEFT JOIN Dog dog on bk.DogId = dog.Id
                                            LEFT JOIN UserProfile up on up.Id = dog.OwnerId
                                            LEFT JOIN BookingSelections bsl on bsl.bookingId = bk.id
                                            LEFT JOIN GroomerBookingRates gbr on gbr.id = bsl.GroomerBookingRatesId
                                            LEFT JOIN Service srv on srv.id = gbr.serviceid
                                            WHERE bk.GroomerId = @GroomerId";
                    DbUtils.AddParameter(cmd, "@GroomerId", groomerId);

                    var bookings = new List<Booking>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var bookingId = DbUtils.GetInt(reader, "Id");
                        var existingBooking = bookings.FirstOrDefault(b => b.Id == bookingId);
                        if (existingBooking == null)
                        {
                            var booking = new Booking()
                            {
                                Id = bookingId,
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
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    Email = DbUtils.GetString(reader, "Email")
                                },
                                Services = new List<Service>()
                            };

                            var serviceId = DbUtils.GetInt(reader, "ServiceId");
                            if (serviceId != 0)
                            {
                                var service = new Service()
                                {
                                    Id = serviceId,
                                    Name = DbUtils.GetString(reader, "ServiceName"),
                                    Description = DbUtils.GetString(reader, "Description")
                                };
                                booking.Services.Add(service);
                            }

                            bookings.Add(booking);
                        }
                        else
                        {
                            var serviceId = DbUtils.GetInt(reader, "ServiceId");
                            if (serviceId != 0)
                            {
                                var service = new Service()
                                {
                                    Id = serviceId,
                                    Name = DbUtils.GetString(reader, "ServiceName"),
                                    Description = DbUtils.GetString(reader,"Description")
                                };
                                existingBooking.Services.Add(service);
                            }
                        }
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
                    up.Email,
                    bsl.GroomerBookingRatesId,
                    gbr.ServiceId,
                    srv.Name as ServiceName,
                    srv.Description
                FROM Booking bk
                LEFT JOIN Dog dog on bk.DogId = dog.Id
                LEFT JOIN UserProfile up on up.Id = dog.OwnerId
                LEFT JOIN BookingSelections bsl on bsl.bookingId = bk.id
                LEFT JOIN GroomerBookingRates gbr on gbr.id = bsl.GroomerBookingRatesId
                LEFT JOIN Service srv on srv.id = gbr.serviceid
                WHERE bk.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    Booking booking = null;
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        if (booking == null)
                        {
                            booking = new Booking()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
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
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    Email = DbUtils.GetString(reader, "Email")
                                },
                                Services = new List<Service>()
                            };
                        }

                        var serviceId = DbUtils.GetInt(reader, "ServiceId");
                        if (serviceId != 0)
                        {
                            var service = new Service()
                            {
                                Id = serviceId,
                                Name = DbUtils.GetString(reader, "ServiceName"),
                                Description = DbUtils.GetString(reader, "Description")
                            };
                            booking.Services.Add(service);
                        }
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
