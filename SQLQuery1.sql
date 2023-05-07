 SELECT 
bk.Id, 
bk.DogId, 
bk.GroomerId, 
bk.Date, 
bk.Price,
dog.Name, 
dog.Weight, 
dog.OwnerId,
up.FirstName,
up.LastName,
up.Email,
bsl.GroomerBookingRatesId,
gbr.ServiceId,
srv.Name
FROM Booking bk
LEFT JOIN Dog dog on bk.DogId = dog.Id
LEFT JOIN UserProfile up on up.Id = dog.OwnerId
LEFT JOIN BookingSelections bsl on bsl.bookingId = bk.id
LEFT JOIN GroomerBookingRates gbr on gbr.id = bsl.GroomerBookingRatesId
LEFT JOIN Service srv on srv.id = gbr.serviceid
WHERE bk.GroomerId = 19