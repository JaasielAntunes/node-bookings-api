import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

class Booking {
  constructor(roomId, guestName, checkInDate, checkOutDate) {
    this.id = uuidv4();
    this.roomId = roomId;
    this.guestName = guestName;
    this.checkInDate = format(new Date(checkInDate), 'dd/MM/yyyy');
    this.checkOutDate = format(new Date(checkOutDate), 'dd/MM/yyyy');
  }
}

export { Booking }