import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

class Booking {
  constructor({ id, userId, roomId, guestName, checkInDate, checkOutDate }) {
    this.id = id ?? uuidv4();
    this.userId = userId;
    this.roomId = roomId;
    this.guestName = guestName;

    if (checkInDate.length > 10 || checkOutDate.length > 10) {
      throw new Error(
        "As datas devem ter no máximo 10 caracteres no formato yyyy-MM-dd"
      );
    }

    this.checkInDate = new Date(checkInDate).toISOString().substring(0, 10);
    this.checkOutDate = new Date(checkOutDate).toISOString().substring(0, 10);
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      roomId: this.roomId,
      guestName: this.guestName,
      checkInDate: format(this.checkInDate, "dd/MM/yyyy"),
      checkOutDate: format(this.checkOutDate, "dd/MM/yyyy"),
    };
  }
}

export { Booking };
