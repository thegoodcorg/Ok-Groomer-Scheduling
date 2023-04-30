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
                                        Id, 
                                        GroomerId, 
                                        SmallDogPrice, 
                                        MediumDogPrice, 
                                        LargeDogPrice, 
                                        TimeToComplete,
                                        ServiceId
                                    FROM GroomerBookingRates";

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
                            ServiceId = DbUtils.GetInt(reader,"ServiceId")
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
                                        Id, 
                                        GroomerId, 
                                        SmallDogPrice, 
                                        MediumDogPrice, 
                                        LargeDogPrice, 
                                        TimeToComplete,
                                        ServiceId
                                    FROM GroomerBookingRates
                                    WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    GroomerBookingRates bookingRate = null;
                    if (reader.Read())
                    {
                        bookingRate = new GroomerBookingRates()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            GroomerId = DbUtils.GetInt(reader, "id"),
                            SmallDogPrice = DbUtils.GetDecimal(reader, "SmallDogPrice"),
                            MediumDogPrice = DbUtils.GetDecimal(reader, "MediumDogPrice"),
                            LargeDogPrice = DbUtils.GetDecimal(reader, "LargedogPrice"),
                            TimeToComplete = DbUtils.GetDecimal(reader, "TimeToComplete"),
                            ServiceId = DbUtils.GetInt(reader, "ServiceId"),
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
                                            ServiceId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@GroomerId, 
                                            @SmallDogPrice, 
                                            @MediumDogPrice, 
                                            @LargeDogPrice, 
                                            @TimeToComplete,
                                            @ServiceId)";
                    DbUtils.AddParameter(cmd, "@GroomerId", bookingRate.GroomerId);
                    DbUtils.AddParameter(cmd, "@SmallDogPrice", bookingRate.SmallDogPrice);
                    DbUtils.AddParameter(cmd, "@MediumDogPrice", bookingRate.MediumDogPrice);
                    DbUtils.AddParameter(cmd, "@LargeDogPrice", bookingRate.LargeDogPrice);
                    DbUtils.AddParameter(cmd, "@TimeToComplete", bookingRate.TimeToComplete);
                    DbUtils.AddParameter(cmd, "@SerivceId", bookingRate.ServiceId);


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
                                            ServiceId = @ServiceId
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@GroomerId", bookingRate.GroomerId);
                    DbUtils.AddParameter(cmd, "@SmallDogPrice", bookingRate.SmallDogPrice);
                    DbUtils.AddParameter(cmd, "@MediumDogPrice", bookingRate.MediumDogPrice);
                    DbUtils.AddParameter(cmd, "@LargeDogPrice", bookingRate.LargeDogPrice);
                    DbUtils.AddParameter(cmd, "@TimeToComplete", bookingRate.TimeToComplete);
                    DbUtils.AddParameter(cmd, "@ServiceId", bookingRate.ServiceId);

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
