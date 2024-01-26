import { Booking } from "../bookings/booking.js";

class BookingService {
  constructor(repo) {
    this.repo = repo;
  }

  async findAllBookings() {
    const bookings = await this.repo.findAll();
    if (bookings.length === 0) {
      throw new Error("Não foi encontrada nenhuma reserva cadastrada!");
    }

    return bookings;
  }

  async createBooking({ userId, roomId, guestName, checkInDate, checkOutDate }) {
    const newBooking = new Booking({
      userId,
      roomId,
      guestName,
      checkInDate,
      checkOutDate,
    });

    const allBookings = await this.repo.findAll();
    const isRoomAvailable = allBookings.find((booking) => {
      return (
        booking.roomId === newBooking.roomId &&
        booking.checkInDate < newBooking.checkOutDate &&
        booking.checkOutDate > newBooking.checkInDate
      );
    });

    if (isRoomAvailable) {
      throw new Error("Quarto ocupado! Informe outras datas de check-in e check-out.");
    }

    await this.repo.create(newBooking);
    return newBooking;
  }
}

export { BookingService };
