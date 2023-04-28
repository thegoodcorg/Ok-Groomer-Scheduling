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
    public class NoteController : ControllerBase
    {
        private readonly INoteRepository _noteRepo;

        public NoteController(INoteRepository noteRepo)
        {
            _noteRepo = noteRepo;
        }



        // GET: api/<OwnerController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_noteRepo.GetAll());
        }

        // GET api/<OwnerController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_noteRepo.GetNoteById(id));
        }

        // POST api/<OwnerController>
        [HttpPost]
        public IActionResult Post(Note note)
        {
            _noteRepo.Add(note);
            return CreatedAtAction("Get", new { id = note.Id }, note);
        }

        // PUT api/<OwnerController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Note note)
        {

            if (id != note.Id)
            {
                Console.WriteLine("id: ", id, "post id: ", note.Id);
                return BadRequest();
            }

            _noteRepo.Edit(id, note);
            return Ok(note);
        }

        // DELETE api/<OwnerController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _noteRepo.Delete(id);
            return Ok();
        }
    }
}
