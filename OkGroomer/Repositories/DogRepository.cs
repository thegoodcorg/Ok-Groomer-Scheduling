using Microsoft.Extensions.Configuration;
using OkGroomer.Models;
using System.Collections.Generic;
using System.ComponentModel;
using System.Xml.Linq;
using Tabloid.Repositories;
using Tabloid.Utils;

namespace OkGroomer.Repositories
{
    public class DogRepository : BaseRepository, IDogRepository
    {
        public DogRepository(IConfiguration configuration) : base(configuration) { }

        public List<Dog> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, Weight, OwnerId FROM Dog";

                    var Dogs = new List<Dog>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var dog = new Dog()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Weight = DbUtils.GetInt(reader, "Weight"),
                            OwnerId = DbUtils.GetInt(reader, "OwnerId")
                        };
                        Dogs.Add(dog);
                    }
                    reader.Close();

                    return Dogs;
                }
            }
        }

        public Dog GetDogById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    Select
                                        Id, 
                                        Name,
                                        Weight,
                                        OwnerId
                                    From Dog
                                    WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    Dog dog = null;
                    if (reader.Read())
                    {
                        dog = new Dog()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Weight = DbUtils.GetInt(reader, "Weight"),
                            OwnerId = DbUtils.GetInt(reader,"OwnerId")
                        };
                    }
                    reader.Close();
                    return dog;
                }
            }
        }

        public void Add(Dog dog)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Dog (Name, Weight, OwnerId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Name, @Weight, @OwnerID)";
                    DbUtils.AddParameter(cmd, "@Name", dog.Name);
                    DbUtils.AddParameter(cmd, "@Weight", dog.Weight);
                    DbUtils.AddParameter(cmd, "@OwnerId", dog.OwnerId);

                    dog.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Edit(int id, Dog dog)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Dog
                                        SET 
                                            Name = @Name,
                                            Weight = @Weight
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@Name", dog.Name);
                    DbUtils.AddParameter(cmd, "@Weight", dog.Weight);

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
                    cmd.CommandText = @"DELETE FROM Dog WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
