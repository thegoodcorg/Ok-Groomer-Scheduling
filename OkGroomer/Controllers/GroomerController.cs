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
    public class GroomerController : ControllerBase
    {
        private readonly IGroomerRepository _GroomerRepo;

        public GroomerController(IGroomerRepository groomerRepo)
        {
            _GroomerRepo = groomerRepo;
        }



        // GET: api/<GroomerController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_GroomerRepo.GetAll());
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_GroomerRepo.GetByFirebaseId(firebaseUserId));
        }

        // GET api/<GroomerController>/5
        [HttpGet("id/{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_GroomerRepo.GetGroomerById(id));
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _GroomerRepo.GetByFirebaseId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        // POST api/<GroomerController>
        [HttpPost]
        public IActionResult Post(Groomer groomer)
        {
            _GroomerRepo.Add(groomer);
            return CreatedAtAction("Get", new { id = groomer.Id }, groomer);
        }

        // PUT api/<GroomerController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Groomer groomer)
        {

            if (id != groomer.Id)
            {
                Console.WriteLine("id: ", id, "post id: ", groomer.Id);
                return BadRequest();
            }

            _GroomerRepo.Edit(id, groomer);
            return Ok(groomer);
        }

        // DELETE api/<GroomerController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _GroomerRepo.Delete(id);
            return Ok();
        }

        [HttpGet("Me")]
        public IActionResult Me()
        {
            var userProfile = GetCurrentUserProfile();
            if (userProfile == null)
            {
                return NotFound();
            }

            return Ok(userProfile);
        }


        private Groomer GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _GroomerRepo.GetByFirebaseId(firebaseUserId);
        }
    }
}
