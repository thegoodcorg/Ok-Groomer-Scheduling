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
    public class DogController : ControllerBase
    {
        private readonly IDogRepository _dogRepo;

        public DogController(IDogRepository dogRepo)
        {
            _dogRepo = dogRepo;
        }



        // GET: api/<OwnerController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_dogRepo.GetAll());
        }

        // GET api/<OwnerController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_dogRepo.GetDogById(id));
        }

        [HttpGet("ownerId/{ownerId}")]
        public IActionResult GetDogsByUserId(int ownerId)
        {
            return Ok(_dogRepo.GetDogsByUserId(ownerId));
        }
        // POST api/<OwnerController>
        [HttpPost]
        public IActionResult Post(Dog dog)
        {
            _dogRepo.Add(dog);
            return CreatedAtAction("Get", new { id = dog.Id }, dog);
        }

        // PUT api/<OwnerController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Dog dog)
        {

            if (id != dog.Id)
            {
                Console.WriteLine("id: ", id, "post id: ", dog.Id);
                return BadRequest();
            }

            _dogRepo.Edit(id, dog);
            return Ok(dog);
        }

        // DELETE api/<OwnerController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _dogRepo.Delete(id);
            return Ok();
        }
    }
}
