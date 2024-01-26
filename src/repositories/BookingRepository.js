import { db } from "../database/index.js";
import { Booking } from "../bookings/booking.js";

class BookingRepository {
  constructor() {
    this.db = db;
  }

  async findAll() {
    const storedBookings = await this.db.manyOrNone(
      'select id, room_id as "roomId", guest_name as "guestName", check_in_date as "checkInDate", check_out_date as "checkOutDate", user_id as "userId" from Bookings'
    );

    return storedBookings.map((booking) => new Booking(booking));
  }

  async create(booking) {
    await this.db.none(
      "insert into Bookings (id, room_id, guest_name, check_in_date, check_out_date, user_id) values (${id}, ${roomId}, ${guestName}, ${checkInDate}, ${checkOutDate}, ${userId})", booking
    );
  }
}

export { BookingRepository };
