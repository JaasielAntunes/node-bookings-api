import { v4 as uuidv4 } from "uuid";
import { format, parse } from "date-fns";

class Booking {
  constructor({ id, user, roomId, guestName, checkInDate, checkOutDate }) {
    this.id = id ?? uuidv4();
    this.user = user;
    this.roomId = roomId;
    this.guestName = guestName;

    const parsedCheckInDate = parse(checkInDate, "yyyy-MM-dd", new Date());
    const parsedCheckOutDate = parse(checkOutDate, "yyyy-MM-dd", new Date());

    this.checkInDate = format(parsedCheckInDate, "dd/MM/yyyy");
    this.checkOutDate = format(parsedCheckOutDate, "dd/MM/yyyy");
  }

  toJSON() {
    return {
      id: this.id,
      user: this.user,
      roomId: this.roomId,
      guestName: this.guestName,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
    };
  }
}

export { Booking };
