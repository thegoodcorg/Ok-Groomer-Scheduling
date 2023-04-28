using Microsoft.Extensions.Configuration;
using OkGroomer.Models;
using System.Collections.Generic;
using System.ComponentModel;
using System.Xml.Linq;
using Tabloid.Repositories;
using Tabloid.Utils;

namespace OkGroomer.Repositories
{
    public class NoteRepository : BaseRepository, INoteRepository
    {
        public NoteRepository(IConfiguration configuration) : base(configuration) { }

        public List<Note> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, DogId, GroomerId, Content FROM Note";

                    var notes = new List<Note>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var note = new Note()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            DogId = DbUtils.GetInt(reader, "DogId"),
                            GroomerId = DbUtils.GetInt(reader, "GroomerId"),
                            Content = DbUtils.GetString(reader, "Content")
                        };
                        notes.Add(note);
                    }
                    reader.Close();

                    return notes;
                }
            }
        }

        public Note GetNoteById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    Select
                                        Id, 
                                        DogId,
                                        GroomerId,
                                        Content
                                    From Note
                                    WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    Note note = null;
                    if (reader.Read())
                    {
                        note = new Note()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            DogId = DbUtils.GetInt(reader, "DogId"),
                            GroomerId = DbUtils.GetInt(reader, "GroomerId"),
                            Content = DbUtils.GetString(reader, "Content")
                        };
                    }
                    reader.Close();
                    return note;
                }
            }
        }

        public void Add(Note note)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Note (DogId, GroomerId, Content)
                                        OUTPUT INSERTED.ID
                                        VALUES (@DogId, @GroomerId, @Content)";
                    DbUtils.AddParameter(cmd, "@DogId", note.DogId);
                    DbUtils.AddParameter(cmd, "@GroomerId", note.GroomerId);
                    DbUtils.AddParameter(cmd, "@Content", note.Content);

                    note.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Edit(int id, Note note)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Note
                                        SET 
                                            DogId = @DogId,
                                            GroomerId = @GroomerId,
                                            Content = @Content
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@DogId", note.DogId);
                    DbUtils.AddParameter(cmd, "@GroomerId", note.GroomerId);
                    DbUtils.AddParameter(cmd, "@Content", note.Content);


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
                    cmd.CommandText = @"DELETE FROM Note WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
