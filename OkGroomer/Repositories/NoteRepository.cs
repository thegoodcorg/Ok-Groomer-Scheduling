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
                    cmd.CommandText = @"SELECT Id, DogId, GroomerId, Content, Date FROM Note";

                    var notes = new List<Note>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var note = new Note()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            DogId = DbUtils.GetInt(reader, "DogId"),
                            GroomerId = DbUtils.GetInt(reader, "GroomerId"),
                            Date = DbUtils.GetDateTime(reader,"Date"),
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

        public List<Note> GetNotesByDogId(int dogId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    Select
                                        n.Id, 
                                        n.DogId,
                                        n.GroomerId,
                                        n.Content,
                                        n.Date,
                                        up.FirstName
                                    From Note n
                                    LEFT JOIN UserProfile up on up.id = n.GroomerId
                                    WHERE DogId = @DogId";
                    DbUtils.AddParameter(cmd, "@DogId", dogId);

                    var reader = cmd.ExecuteReader();
                    var notes = new List<Note>();
                    while (reader.Read())
                    {
                        Note note = new Note()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            DogId = DbUtils.GetInt(reader, "DogId"),
                            GroomerId = DbUtils.GetInt(reader, "GroomerId"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Date = DbUtils.GetDateTime(reader, "Date"),
                            Groomer = new UserProfile()
                            {
                                FirstName = DbUtils.GetString(reader, "FirstName")
                            }
                        };
                        notes.Add(note);
                    }
                    reader.Close();
                    return notes;
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
                    cmd.CommandText = @"INSERT INTO Note (DogId, GroomerId, Content, Date)
                                        OUTPUT INSERTED.ID
                                        VALUES (@DogId, @GroomerId, @Content, @Date)";
                    DbUtils.AddParameter(cmd, "@DogId", note.DogId);
                    DbUtils.AddParameter(cmd, "@GroomerId", note.GroomerId);
                    DbUtils.AddParameter(cmd, "@Content", note.Content);
                    DbUtils.AddParameter(cmd, "@Date", note.Date);

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
