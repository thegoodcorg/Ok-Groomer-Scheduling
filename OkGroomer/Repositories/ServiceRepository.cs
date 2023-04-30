using Microsoft.Extensions.Configuration;
using OkGroomer.Models;
using System.Collections.Generic;
using System.ComponentModel;
using System.Xml.Linq;
using Tabloid.Repositories;
using Tabloid.Utils;

namespace OkGroomer.Repositories
{
    public class ServiceRepository : BaseRepository, IServiceRepository
    {
        public ServiceRepository(IConfiguration configuration) : base(configuration) { }

        public List<Service> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, GroomerId, DoesGroomerPerform FROM Service";

                    var services = new List<Service>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var service = new Service()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            GroomerId = DbUtils.GetInt(reader, "GroomerId"),
                            DoesGroomerPerform = reader.GetBoolean(reader.GetOrdinal("DoesGroomerPerform"))

                        };
                        services.Add(service);
                    }
                    reader.Close();

                    return services;
                }
            }
        }

        public Service GetServiceById(int id)
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
                                        GroomerId,
                                        DoesGroomerPerform
                                    From Service
                                    WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    Service service = null;
                    if (reader.Read())
                    {
                        service = new Service()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            GroomerId = DbUtils.GetInt(reader, "GroomerId"),
                            DoesGroomerPerform = reader.GetBoolean(reader.GetOrdinal("DoesGroomerPerform"))

                        };
                    }
                    reader.Close();
                    return service;
                }
            }
        }

        public void Add(Service service)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Service (Name, GroomerId, DoesGroomerPerform)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Name, @GroomerId, @DoesGroomerPerform)";
                    DbUtils.AddParameter(cmd, "@Name", service.Name);
                    DbUtils.AddParameter(cmd, "@GroomerId", service.GroomerId);
                    DbUtils.AddParameter(cmd, "@DoesGroomerPerform", service.DoesGroomerPerform);

                    service.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Edit(int id, Service service)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Service
                                        SET 
                                            Name = @Name,
                                            GroomerId = @GroomerId,
                                            DoesGroomerPerform = @DoesGroomerPerform
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@Name", service.Name);
                    DbUtils.AddParameter(cmd, "@GroomerId", service.GroomerId);
                    DbUtils.AddParameter(cmd, "@DoesGroomerPerform", service.DoesGroomerPerform);


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
                    cmd.CommandText = @"DELETE FROM Service WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
