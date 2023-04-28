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
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepository _BookingRepo;

        public BookingController(IBookingRepository bookingRepository)
        {
            _BookingRepo = bookingRepository;
        }



        // GET: api/<BookingController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_BookingRepo.GetAll());
        }

        // GET api/<BookingController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_BookingRepo.GetBookingById(id));
        }

        // POST api/<BookingController>
        [HttpPost]
        public IActionResult Post(Booking booking)
        {
            _BookingRepo.Add(booking);
            return CreatedAtAction("Get", new { id = booking.Id }, booking);
        }

        // PUT api/<BookingController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Booking booking)
        {

            if (id != booking.Id)
            {
                Console.WriteLine("id: ", id, "post id: ", booking.Id);
                return BadRequest();
            }

            _BookingRepo.Edit(id, booking);
            return Ok(booking);
        }

        // DELETE api/<BookingController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _BookingRepo.Delete(id);
            return Ok();
        }
    }
}
