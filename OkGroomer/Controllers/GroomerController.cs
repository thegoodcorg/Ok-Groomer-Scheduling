﻿using Microsoft.AspNetCore.Mvc;
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

        // GET api/<GroomerController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_GroomerRepo.GetGroomerById(id));
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
    }
}