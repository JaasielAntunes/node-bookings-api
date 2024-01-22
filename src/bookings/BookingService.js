class BookingService {
  constructor(repo) {
    this.repo = repo;
  }

  findAllBookings() {
    return this.repo.findAll();
  }
}