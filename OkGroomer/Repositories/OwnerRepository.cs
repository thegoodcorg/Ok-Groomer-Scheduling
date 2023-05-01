using Microsoft.Extensions.Configuration;
using OkGroomer.Models;
using System.Collections.Generic;
using System.ComponentModel;
using System.Xml.Linq;
using Tabloid.Repositories;
using Tabloid.Utils;

namespace OkGroomer.Repositories
{
    public class OwnerRepository : BaseRepository, IOwnerRepository
    {
        public OwnerRepository(IConfiguration configuration) : base(configuration) { }

        public List<Owner> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, FirstName, LastName, Email, FirebaseId FROM Owner";

                    var Owners = new List<Owner>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var owner = new Owner()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId")
                        };
                        Owners.Add(owner);
                    }
                    reader.Close();

                    return Owners;
                }
            }
        }

        public Owner GetOwnerById(int id)
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
                                    From Owner
                                    WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    Owner owner = null;
                    if (reader.Read())
                    {
                         owner = new Owner()
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

        public Owner GetByFirebaseId(string firebaseId)
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
                                        FirebaseId
                                    From Owner
                                    WHERE FirebaseId = @Firebaseid";

                    DbUtils.AddParameter(cmd, "@FirebaseId", firebaseId);

                    Owner owner = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        owner = new Owner()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId")
                        };
                    }
                    reader.Close();
                    return owner;
                }
            }
        }

        public void Add(Owner owner)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Owner (FirstName, LastName, Email, FirebaseId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirstName, @LastName, @Email, @FirebaseId)";
                    DbUtils.AddParameter(cmd, "@FirstName", owner.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", owner.LastName);
                    DbUtils.AddParameter(cmd, "@Email", owner.Email);
                    DbUtils.AddParameter(cmd, "@FirebaseId", owner.FirebaseId);

                    owner.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Edit(int id, Owner owner)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Owner
                                        SET 
                                            FirstName = @FirstName,
                                            LastName = @LastName,
                                            Email = @Email
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@FirstName", owner.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", owner.LastName);
                    DbUtils.AddParameter(cmd, "@Email", owner.Email);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Delete (int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Owner WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
