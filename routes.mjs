import { resolve } from 'path';
import cars from './controllers/cars.mjs';
import users from './controllers/users.mjs';
import bookings from './controllers/bookings.mjs';
import db from './models/index.mjs';
import convertUserIdToHash from './helper.mjs';

export default function routes(app) {
  app.use(async (req, res, next) => {
    req.middlewareLoggedIn = false;

    if (req.cookies.loggedInUserId) {
      const hash = convertUserIdToHash(req.cookies.loggedInUserId);

      if (req.cookies.loggedInHash === hash) {
        req.middlewareLoggedIn = true;
      }

      const { loggedInUserId } = req.cookies;
      // Find this user in the database
      const chosenUser = await db.User.findOne({
        where: {
          id: loggedInUserId,
        },
      });
      if (!chosenUser) {
        res.status(503).send('sorry an error has occurred');
      }
      req.middlewareLoggedIn = true;
      req.loggedInUserId = Number(req.cookies.loggedInUserId);
      req.loggedInUsername = chosenUser.username;
      next();
      return;
    }
    next();
  });

  // special JS page. Include the webpack index.html file
  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  const CarsController = cars(db);
  app.get('/availableCars', CarsController.index);

  const UsersController = users(db);
  app.post('/user/signin', UsersController.signin);

  const BookingsController = bookings(db);
  app.get('/unavailableDates/:carId', BookingsController.getUnavailableDates);
  app.post('/confirmBooking', BookingsController.confirm);
}
