using Microsoft.Extensions.Configuration;
using OkGroomer.Models;
using System.Collections.Generic;
using System.ComponentModel;
using System.Xml.Linq;
using Tabloid.Repositories;
using Tabloid.Utils;

namespace OkGroomer.Repositories
{
    public class GroomerRepository : BaseRepository, IGroomerRepository
    {
        public GroomerRepository(IConfiguration configuration) : base(configuration) { }

        public List<Groomer> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, FirstName, LastName, Email, FirebaseId FROM Groomer";

                    var Groomers = new List<Groomer>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var owner = new Groomer()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId")
                        };
                        Groomers.Add(owner);
                    }
                    reader.Close();

                    return Groomers;
                }
            }
        }

        public Groomer GetGroomerById(int id)
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
                                        FirebaseId
                                    From Groomer
                                    WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    Groomer owner = null;
                    if (reader.Read())
                    {
                        owner = new Groomer()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId")
                        };
                    }
                    reader.Close();
                    return owner;
                }
            }
        }
        public Groomer GetByFirebaseId(string firebaseId)
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
                                        Email
                                    From Groomer
                                    WHERE FirebaseId = @Firebaseid";

                    DbUtils.AddParameter(cmd, "@FirebaseId", firebaseId);

                    Groomer groomer = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        groomer = new Groomer()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId")
                        };
                    }
                    reader.Close();
                    return groomer;
                }
            }
        }

        public void Add(Groomer groomer)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Groomer (FirstName, LastName, Email, FirebaseId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirstName, @LastName, @Email, @FirebaseId)";
                    DbUtils.AddParameter(cmd, "@FirstName", groomer.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", groomer.LastName);
                    DbUtils.AddParameter(cmd, "@Email", groomer.Email);
                    DbUtils.AddParameter(cmd, "@FirebaseId", groomer.FirebaseId);

                    groomer.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Edit(int id, Groomer groomer)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Groomer
                                        SET 
                                            FirstName = @FirstName,
                                            LastName = @LastName,
                                            Email = @Email,
                                            FirebaseId = @FirebaseId
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@FirstName", groomer.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", groomer.LastName);
                    DbUtils.AddParameter(cmd, "@Email", groomer.Email);
                    DbUtils.AddParameter(cmd, "@FirebaseId", groomer.FirebaseId);


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
                    cmd.CommandText = @"DELETE FROM Groomer WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
