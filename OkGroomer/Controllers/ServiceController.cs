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
    public class ServiceController : ControllerBase
    {
        private readonly IServiceRepository _serviceRepo;

        public ServiceController(IServiceRepository serviceRepo)
        {
            _serviceRepo = serviceRepo;
        }



        // GET: api/<Service>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_serviceRepo.GetAll());
        }

        // GET api/<Service>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_serviceRepo.GetServiceById(id));
        }

        // POST api/<Service>
        [HttpPost]
        public IActionResult Post(Service service)
        {
            _serviceRepo.Add(service);
            return CreatedAtAction("Get", new { id = service.Id }, service);
        }

        // PUT api/<ServiceBookingRates>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Service service)
        {

            if (id != service.Id)
            {
                Console.WriteLine("id: ", id, "post id: ", service.Id);
                return BadRequest();
            }

            _serviceRepo.Edit(id, service);
            return Ok(service);
        }

        // DELETE api/<Service>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _serviceRepo.Delete(id);
            return Ok();
        }
    }
}
