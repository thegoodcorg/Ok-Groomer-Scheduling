using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using OkGroomer.Models;
using OkGroomer.Repositories;
using System;
using System.Collections.Generic;
using System.Security.Claims;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OkGroomer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _UserRepo;

        public UserProfileController(IUserProfileRepository userRepo)
        {
            _UserRepo = userRepo;
        }



        // GET: api/<GroomerController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_UserRepo.GetAll());
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_UserRepo.GetByFirebaseId(firebaseUserId));
        }

        // GET api/<GroomerController>/5
        [HttpGet("id/{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_UserRepo.GetUserById(id));
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _UserRepo.GetByFirebaseId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpGet("GetGroomerBySelectedServices/{serviceIds}")]
        public IActionResult GetGroomerBySelectedServices([FromRoute] string serviceIds)
        {
            return Ok(_UserRepo.GetGroomersByServices(serviceIds));
            //return Ok();
        }

        // POST api/<GroomerController>
        [HttpPost]
        public IActionResult Post(UserProfile groomer)
        {
            _UserRepo.Add(groomer);
            return CreatedAtAction(nameof(GetUserProfile),
                new { firebaseUserId = groomer.FirebaseId },
                groomer);
        }

        // PUT api/<GroomerController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile groomer)
        {

            if (id != groomer.Id)
            {
                Console.WriteLine("id: ", id, "post id: ", groomer.Id);
                return BadRequest();
            }

            _UserRepo.Edit(id, groomer);
            return Ok(groomer);
        }

        // DELETE api/<GroomerController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _UserRepo.Delete(id);
            return Ok();
        }

        [HttpGet("Me")]
        public IActionResult Me()
        {
            var groomer = GetCurrentGroomer();
            if (groomer == null)
            {
                return NotFound();
            }

            return Ok(groomer);
        }

        private UserProfile GetCurrentGroomer()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _UserRepo.GetByFirebaseId(firebaseUserId);
        }
    }
}
