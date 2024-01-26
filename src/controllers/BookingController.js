class BookingController {
  constructor(service) {
    this.service = service;
  }

  async index() {
    const bookings = await this.service.findAllBookings();
    return { code: 200, body: { bookings } };
  }

  async save(req) {
    const { roomId, guestName, checkInDate, checkOutDate } = req.body;
    const user = req.user;

    // console.log(user);

    if (!roomId || !guestName || !checkInDate || !checkOutDate) {
      return {
        code: 400,
        body: { message: "Todos os campos devem ser informados!" },
      }; 
    }

    const newBooking = await this.service.createBooking({
      userId: user.id,
      roomId,
      guestName,
      checkInDate,
      checkOutDate,
    });

    return {
      code: 201,
      body: { message: "Reserva criada com sucesso para: " + guestName, newBooking },
    };
  }
}

export { BookingController };
