using Microsoft.Extensions.Configuration;
using OkGroomer.Models;
using OkGroomer.Repositories;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Xml.Linq;
using Tabloid.Repositories;
using Tabloid.Utils;

namespace OkUser.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, FirstName, LastName, Email, FirebaseId, Groomer FROM UserProfile";

                    var Users = new List<UserProfile>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var user = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                            Groomer = reader.GetBoolean(reader.GetOrdinal("Groomer"))
                        };
                        Users.Add(user);
                    }
                    reader.Close();

                    return Users;
                }
            }
        }

        public UserProfile GetUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    Select
                                        Id, 
                                        FirstName,
                                        LastName,
                                        Email,
                                        FirebaseId,
                                        Groomer
                                    From UserProfile
                                    WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    UserProfile user = null;
                    if (reader.Read())
                    {
                        user = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                            Groomer = reader.GetBoolean(reader.GetOrdinal("Groomer"))
                        };
                    }
                    reader.Close();
                    return user;
                }
            }
        }
        public UserProfile GetByFirebaseId(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
                                        Id, 
                                        FirstName,
                                        LastName,
                                        Email,
                                        FirebaseId,
                                        Groomer
                                    From UserProfile
                                    WHERE FirebaseId = @FirebaseId";

                    DbUtils.AddParameter(cmd, "@FirebaseId", firebaseId);

                    UserProfile user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email= DbUtils.GetString(reader,"Email"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                            Groomer = reader.GetBoolean(reader.GetOrdinal("Groomer"))
                        };
                    }
                    reader.Close();
                    return user;
                }
            }
        }

        public List<UserProfile> GetGroomersByServices(string serviceIds)
        {
            int[] arr = serviceIds.Split(',').Select(int.Parse).ToArray();
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    var parameters = new List<string>();
                    for (int i = 0; i < arr.Length; i++)
                    {
                        parameters.Add($"@serviceId{i}");
                        DbUtils.AddParameter(cmd, parameters[i], arr[i]);
                    }
                    cmd.CommandText = $@"SELECT *
                                        FROM UserProfile
                                        WHERE Groomer = 1 
                                        AND NOT EXISTS (
                                            SELECT sr.Id 
                                            FROM Service sr
                                            WHERE sr.Id NOT IN (
                                                SELECT gbr.serviceid
                                                FROM GroomerBookingRates gbr 
                                                WHERE gbr.GroomerId = UserProfile.Id
                                            )
                                          AND sr.Id IN ({string.Join(",", parameters)})
                                        )";
                    //DbUtils.AddParameter(cmd, "@serviceIds", arr);

                    var Users = new List<UserProfile>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var user = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                            Groomer = reader.GetBoolean(reader.GetOrdinal("Groomer"))
                        };
                        Users.Add(user);
                    }
                    reader.Close();

                    return Users;
                }
            }
        }

        public void Add(UserProfile user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirstName, LastName, Email, FirebaseId, Groomer)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirstName, @LastName, @Email, @FirebaseId, @Groomer)";
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@FirebaseId", user.FirebaseId);
                    DbUtils.AddParameter(cmd, "@Groomer", user.Groomer);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Edit(int id, UserProfile user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE UserProfile
                                        SET 
                                            FirstName = @FirstName,
                                            LastName = @LastName,
                                            Email = @Email,
                                            FirebaseId = @FirebaseId
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@FirebaseId", user.FirebaseId);


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
                    cmd.CommandText = @"DELETE FROM UserProfile WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
