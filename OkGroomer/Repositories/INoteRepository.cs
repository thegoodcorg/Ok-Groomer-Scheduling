using OkGroomer.Models;
using System.Collections.Generic;

namespace OkGroomer.Repositories
{
    public interface INoteRepository
    {
        void Add(Note note);
        void Delete(int id);
        void Edit(int id, Note note);
        List<Note> GetAll();
        Note GetNoteById(int id);
    }
}