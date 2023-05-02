using Microsoft.Extensions.Configuration;
using OkGroomer.Models;
using System.Collections.Generic;
using System.ComponentModel;
using System.Xml.Linq;
using Tabloid.Repositories;
using Tabloid.Utils;

namespace OkGroomer.Repositories
{
    public class GroomerBookingRateRepository : BaseRepository, IGroomerBookingRateRepository
    {
        public GroomerBookingRateRepository(IConfiguration configuration) : base(configuration) { }

        public List<GroomerBookingRates> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT 
                                        gbr.Id, 
                                        gbr.GroomerId, 
                                        gbr.SmallDogPrice, 
                                        gbr.MediumDogPrice, 
                                        gbr.LargeDogPrice, 
                                        gbr.TimeToComplete,
                                        gbr.serviceId,
                                        gbr.DoesGroomerOffer,
                                        srv.Id as ServiceId,
                                        srv.Name,
                                        srv.Description
                                    FROM GroomerBookingRates gbr
                                    LEFT JOIN Service srv on gbr.serviceId = srv.Id ";

                    var GroomerBookingRatess = new List<GroomerBookingRates>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var bookingRate = new GroomerBookingRates()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            GroomerId = DbUtils.GetInt(reader, "id"),
                            SmallDogPrice = DbUtils.GetDecimal(reader, "SmallDogPrice"),
                            MediumDogPrice = DbUtils.GetDecimal(reader, "MediumDogPrice"),
                            LargeDogPrice = DbUtils.GetDecimal(reader, "LargedogPrice"),
                            TimeToComplete = DbUtils.GetDecimal(reader, "TimeToComplete"),
                            ServiceId = DbUtils.GetInt(reader,"serviceId"),
                            DoesGroomerOffer = reader.GetBoolean(reader.GetOrdinal("DoesGroomerOffer")),
                            Service = new Service()
                            {
                                Id = DbUtils.GetInt(reader, "ServiceId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Description = DbUtils.GetString(reader, "Description")
                            }
                        };
                        GroomerBookingRatess.Add(bookingRate);
                    }
                    reader.Close();

                    return GroomerBookingRatess;
                }
            }
        }

        public GroomerBookingRates GetGroomerBookingRateById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT 
                                        gbr.Id, 
                                        gbr.GroomerId, 
                                        gbr.SmallDogPrice, 
                                        gbr.MediumDogPrice, 
                                        gbr.LargeDogPrice, 
                                        gbr.TimeToComplete,
                                        gbr.ServiceId,
                                        srv.id AS ServiceId, 
                                        srv.Name,
                                        srv.Description
                                    FROM GroomerBookingRates gbr
                                    LEFT JOIN Service srv on srv.id = gbr.ServiceId
                                    WHERE gbr.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    GroomerBookingRates bookingRate = null;
                    if (reader.Read())
                    {
                        bookingRate = new GroomerBookingRates()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            GroomerId = DbUtils.GetInt(reader, "Groomerid"),
                            SmallDogPrice = DbUtils.GetDecimal(reader, "SmallDogPrice"),
                            MediumDogPrice = DbUtils.GetDecimal(reader, "MediumDogPrice"),
                            LargeDogPrice = DbUtils.GetDecimal(reader, "LargedogPrice"),
                            TimeToComplete = DbUtils.GetDecimal(reader, "TimeToComplete"),
                            ServiceId = DbUtils.GetInt(reader,"ServiceId"),
                            Service = new Service()
                            {
                                Id = DbUtils.GetInt(reader, "ServiceId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Description = DbUtils.GetString(reader, "Description")
                            }
                        };
                    }
                    reader.Close();
                    return bookingRate;
                }
            }
        }

        public GroomerBookingRates GetDistinctRate(int serviceId, int groomerId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT 
                                        gbr.Id, 
                                        gbr.GroomerId, 
                                        gbr.SmallDogPrice, 
                                        gbr.MediumDogPrice, 
                                        gbr.LargeDogPrice, 
                                        gbr.TimeToComplete,
                                        gbr.ServiceId,
                                        gbr.DoesGroomerOffer,
                                        srv.id AS ServiceId, 
                                        srv.Name,
                                        srv.Description
                                    FROM GroomerBookingRates gbr
                                    LEFT JOIN Service srv on srv.id = gbr.ServiceId
                                    WHERE gbr.ServiceId = @ServiceId AND gbr.GroomerId = @GroomerId";
                    DbUtils.AddParameter(cmd, "@ServiceId", serviceId);
                    DbUtils.AddParameter(cmd, "@GroomerId", groomerId);


                    var reader = cmd.ExecuteReader();
                    GroomerBookingRates bookingRate = null;
                    if (reader.Read())
                    {
                        bookingRate = new GroomerBookingRates()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            GroomerId = DbUtils.GetInt(reader, "Groomerid"),
                            SmallDogPrice = DbUtils.GetDecimal(reader, "SmallDogPrice"),
                            MediumDogPrice = DbUtils.GetDecimal(reader, "MediumDogPrice"),
                            LargeDogPrice = DbUtils.GetDecimal(reader, "LargedogPrice"),
                            TimeToComplete = DbUtils.GetDecimal(reader, "TimeToComplete"),
                            DoesGroomerOffer = reader.GetBoolean(reader.GetOrdinal("DoesGroomerOffer")),
                            ServiceId = DbUtils.GetInt(reader, "ServiceId"),
                            Service = new Service()
                            {
                                Id = DbUtils.GetInt(reader, "ServiceId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Description = DbUtils.GetString(reader, "Description")
                            }
                        };
                    }
                    reader.Close();
                    return bookingRate;
                }
            }
        }

        public void Add(GroomerBookingRates bookingRate)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO GroomerBookingRates 
                                            (GroomerId,
                                            SmallDogPrice, 
                                            MediumDogPrice,
                                            LargeDogPrice, 
                                            TimeToComplete,
                                            DoesGroomerOffer,
                                            ServiceId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@GroomerId, 
                                            @SmallDogPrice, 
                                            @MediumDogPrice, 
                                            @LargeDogPrice, 
                                            @TimeToComplete,
                                            @DoesGroomerOffer
                                            @ServiceId)";
                    DbUtils.AddParameter(cmd, "@GroomerId", bookingRate.GroomerId);
                    DbUtils.AddParameter(cmd, "@SmallDogPrice", bookingRate.SmallDogPrice);
                    DbUtils.AddParameter(cmd, "@MediumDogPrice", bookingRate.MediumDogPrice);
                    DbUtils.AddParameter(cmd, "@LargeDogPrice", bookingRate.LargeDogPrice);
                    DbUtils.AddParameter(cmd, "@TimeToComplete", bookingRate.TimeToComplete);
                    DbUtils.AddParameter(cmd, "@ServiceId", bookingRate.ServiceId);
                    DbUtils.AddParameter(cmd, "@DoesGroomerOffer", bookingRate.DoesGroomerOffer);


                    bookingRate.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Edit(int id, GroomerBookingRates bookingRate)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE GroomerBookingRates
                                        SET 
                                            GroomerId = @GroomerId, 
                                            SmallDogPrice = @SmallDogPrice, 
                                            MediumDogPrice = @MediumDogPrice, 
                                            LargeDogPrice = @LargeDogPrice, 
                                            TimeToComplete = @TimeToComplete,
                                            DoesGroomerOffer = @DoesGroomerOffer,
                                            ServiceId = @ServiceId
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    DbUtils.AddParameter(cmd, "@GroomerId", bookingRate.GroomerId);
                    DbUtils.AddParameter(cmd, "@SmallDogPrice", bookingRate.SmallDogPrice);
                    DbUtils.AddParameter(cmd, "@MediumDogPrice", bookingRate.MediumDogPrice);
                    DbUtils.AddParameter(cmd, "@LargeDogPrice", bookingRate.LargeDogPrice);
                    DbUtils.AddParameter(cmd, "@TimeToComplete", bookingRate.TimeToComplete);
                    DbUtils.AddParameter(cmd, "@ServiceId", bookingRate.ServiceId);
                    DbUtils.AddParameter(cmd, "@DoesGroomerOffer", bookingRate.DoesGroomerOffer);

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
                    cmd.CommandText = @"DELETE FROM GroomerBookingRates WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
