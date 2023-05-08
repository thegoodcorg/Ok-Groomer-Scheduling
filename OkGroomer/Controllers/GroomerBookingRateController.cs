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
    public class GroomerBookingRatesController : ControllerBase
    {
        private readonly IGroomerBookingRateRepository _ratesRepo;

        public GroomerBookingRatesController(IGroomerBookingRateRepository ratesRepo)
        {
            _ratesRepo = ratesRepo;
        }



        // GET: api/<GroomerBookingRates>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_ratesRepo.GetAll());
        }

        // GET api/<GroomerBookingRates>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_ratesRepo.GetGroomerBookingRateById(id));
        }
        [HttpGet("GroomerId/{id}")]
        public IActionResult GetRatesByGroomerId(int id) 
        {
            return Ok(_ratesRepo.GetRatesByGroomerId(id));
        }

        //GET api/GroomerBookingRates/GetByGroomerId
        [HttpGet("myrate")]
        public IActionResult GetByGroomerId(int serviceId, int groomerId)
        {
            return Ok(_ratesRepo.GetDistinctRate(serviceId, groomerId));
        }

        // POST api/<GroomerBookingRates>
        [HttpPost]
        public IActionResult Post(GroomerBookingRates groomerRate)
        {
            _ratesRepo.Add(groomerRate);
            return CreatedAtAction("Get", new { id = groomerRate.Id }, groomerRate);
        }

        [HttpPut("updateDoesGroomerOffer/{bookingRateId}")]
        public IActionResult updateDoesGroomerOffer(int bookingRateId, GroomerBookingRates bookingRate)
        {
            _ratesRepo.EditDoesGroomerOffer(bookingRateId, bookingRate);
            return Ok(bookingRate);
        }

        // PUT api/<GroomerBookingRatesBookingRates>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, GroomerBookingRates groomerRate)
        {

            if (id != groomerRate.Id)
            {
                Console.WriteLine("id: ", id, "post id: ", groomerRate.Id);
                return BadRequest();
            }

            _ratesRepo.Edit(id, groomerRate);
            return Ok(groomerRate);
        }

        // DELETE api/<GroomerBookingRates>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _ratesRepo.Delete(id);
            return Ok();
        }
    }
}
