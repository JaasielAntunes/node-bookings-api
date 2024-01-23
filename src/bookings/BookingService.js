import { Booking } from "./booking.js";

class BookingService {
  constructor(repo) {
    this.repo = repo;
  }

  findAllBookings() {
    return this.repo.findAll();
  }

  createBooking({ roomId, guestName, checkInDate, checkOutDate }) {
    const newBooking = new Booking(
      roomId,
      guestName,
      checkInDate,
      checkOutDate
    );
    this.repo.create(newBooking);
    return newBooking;
  }
}

export { BookingService };
