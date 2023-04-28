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
                                        Name, 
                                        GroomerId, 
                                        SmallDogPrice, 
                                        MediumDogPrice, 
                                        LargeDogPrice, 
                                        TimeToComplete 
                                    FROM GroomerBookingRates";

                    var GroomerBookingRatess = new List<GroomerBookingRates>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var bookingRate = new GroomerBookingRates()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            GroomerId = DbUtils.GetInt(reader, "id"),
                            SmallDogPrice = DbUtils.GetDecimal(reader, "SmallDogPrice"),
                            MediumDogPrice = DbUtils.GetDecimal(reader, "MediumDogPrice"),
                            LargeDogPrice = DbUtils.GetDecimal(reader, "LargedogPrice"),
                            TimeToComplete = DbUtils.GetDecimal(reader, "TimeToComplete")
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
                                        Name, 
                                        GroomerId, 
                                        SmallDogPrice, 
                                        MediumDogPrice, 
                                        LargeDogPrice, 
                                        TimeToComplete 
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
                            Name = DbUtils.GetString(reader, "name"),
                            GroomerId = DbUtils.GetInt(reader, "id"),
                            SmallDogPrice = DbUtils.GetDecimal(reader, "SmallDogPrice"),
                            MediumDogPrice = DbUtils.GetDecimal(reader, "MediumDogPrice"),
                            LargeDogPrice = DbUtils.GetDecimal(reader, "LargedogPrice"),
                            TimeToComplete = DbUtils.GetDecimal(reader, "TimeToComplete")
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
                                            (Name, 
                                            GroomerId,
                                            SmallDogPrice, 
                                            MediumDogPrice,
                                            LargeDogPrice, 
                                            TimeToComplete)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Name, 
                                            @GroomerId, 
                                            @SmallDogPrice, 
                                            @MediumDogPrice, 
                                            @LargeDogPrice, 
                                            @TimeToComplete)";
                    DbUtils.AddParameter(cmd, "@GroomerId", bookingRate.GroomerId);
                    DbUtils.AddParameter(cmd, "@Name", bookingRate.Name);
                    DbUtils.AddParameter(cmd, "@SmallDogPrice", bookingRate.SmallDogPrice);
                    DbUtils.AddParameter(cmd, "@MediumDogPrice", bookingRate.MediumDogPrice);
                    DbUtils.AddParameter(cmd, "@LargeDogPrice", bookingRate.LargeDogPrice);
                    DbUtils.AddParameter(cmd, "@TimeToComplete", bookingRate.TimeToComplete);


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
                                            Name = @Name, 
                                            GroomerId = @GroomerId, 
                                            SmallDogPrice = @SmallDogPrice, 
                                            MediumDogPrice = @MediumDogPrice, 
                                            LargeDogPrice = @LargeDogPrice, 
                                            TimeToComplete = @TimeToComplete
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@GroomerId", bookingRate.GroomerId);
                    DbUtils.AddParameter(cmd, "@Name", bookingRate.Name);
                    DbUtils.AddParameter(cmd, "@SmallDogPrice", bookingRate.SmallDogPrice);
                    DbUtils.AddParameter(cmd, "@MediumDogPrice", bookingRate.MediumDogPrice);
                    DbUtils.AddParameter(cmd, "@LargeDogPrice", bookingRate.LargeDogPrice);
                    DbUtils.AddParameter(cmd, "@TimeToComplete", bookingRate.TimeToComplete);

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
