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
                    cmd.CommandText = @"SELECT Id, GroomerId, Name, Description FROM Service";

                    var services = new List<Service>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var service = new Service()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            GroomerId = DbUtils.GetInt(reader,"GroomerId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description")
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
                                        GroomerId,
                                        Name,
                                        Description
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
                            GroomerId = DbUtils.GetInt(reader, "GroomerId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description")
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
                    cmd.CommandText = @"INSERT INTO Service (Name, Description, GroomerId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Name, @Description, @GroomerId)";
                    DbUtils.AddParameter(cmd, "@Name", service.Name);
                    DbUtils.AddParameter(cmd, "@Description", service.Description);
                    DbUtils.AddParameter(cmd, "@GroomerId", service.GroomerId);

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
                                            Description = @Description
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@Name", service.Name);
                    DbUtils.AddParameter(cmd, "@Description", service.Description);

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
