import { fastify } from "fastify";
import { BookingRepository } from "../repositories/BookingRepository.js";
import { BookingService } from "../services/BookingService.js";
import { BookingController } from "../controllers/BookingController.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { UserService } from "../services/UserService.js";
import { AuthController } from "../controllers/AuthController.js";
import { Routes } from "../initializer/Routes.js";

class AppInitializer {
  static initialize() {
    const app = fastify();
    const bookingRepository = new BookingRepository();
    const bookingService = new BookingService(bookingRepository);
    const bookingController = new BookingController(bookingService);
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const authController = new AuthController(userService);

    Routes.defineRoutes(app, bookingController, authController, userService);
    return app;
  }
}

export { AppInitializer };
