using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using OkGroomer.Models;
using OkGroomer.Repositories;
using System;
using System.Collections.Generic;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OkGroomer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnerController : ControllerBase
    {
        private readonly IOwnerRepository _ownerRepo;

        public OwnerController(IOwnerRepository ownerRepo)
        {
            _ownerRepo = ownerRepo;
        }



        // GET: api/<OwnerController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_ownerRepo.GetAll());
        }

        // GET api/<OwnerController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_ownerRepo.GetOwnerById(id));
        }
        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_ownerRepo.GetByFirebaseId(firebaseUserId));
        }

        // POST api/<OwnerController>
        [HttpPost]
        public IActionResult Post(Owner owner)
        {
            _ownerRepo.Add(owner);
            return CreatedAtAction("Get", new { id = owner.Id }, owner);
        }

        // PUT api/<OwnerController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Owner owner)
        {

            if (id != owner.Id)
            {
                Console.WriteLine("id: ", id, "post id: ", owner.Id);
                return BadRequest();
            }

            _ownerRepo.Edit(id, owner);
            return Ok(owner);
        }

        // DELETE api/<OwnerController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _ownerRepo.Delete(id);
            return Ok();
        }
    }
}
