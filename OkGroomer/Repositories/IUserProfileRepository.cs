using OkGroomer.Models;
using System.Collections.Generic;

namespace OkGroomer.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile owner);
        void Delete(int id);
        void Edit(int id, UserProfile owner);
        List<UserProfile> GetAll();
        UserProfile GetUserById(int id);
        UserProfile GetByFirebaseId(string firebaseId);

    }
}