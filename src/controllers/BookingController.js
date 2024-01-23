class BookingController {
  constructor(service) {
    this.service = service;
  }

  index() {
    const bookings = this.service.findAllBookings();
    return { code: 200, body: { bookings } };
  }

  save(req) {
    const { roomId, guestName, checkInDate, checkOutDate } = req.body;
    const newBooking = this.service.createBooking({
      roomId,
      guestName,
      checkInDate,
      checkOutDate,
    });

    if (!roomId || !guestName || !checkInDate || !checkOutDate) {
      return {
        code: 400,
        body: { message: "Todos os campos devem ser informados!" },
      }; 
    }

    return {
      code: 201,
      body: { message: "Reserva criada com sucesso!", newBooking },
    };
  }
}

export { BookingController };
