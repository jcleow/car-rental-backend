export default function bookings(db) {
  const getUnavailableDates = async (req, res) => {
    const { carId } = req.params;
    const unavailableDates = await db.Booking.findAll({
      where: {
        carId,
      },
    });
    res.send(unavailableDates);
  };

  const confirm = async (req, res) => {
    const {
      userId, carId, startDate, endDate,
    } = req.body;

    const newBooking = await db.Booking.create({
      userId,
      carId,
      startDate,
      endDate,
      rentStatus: 'booked',
    }, {
      returning: true,
    });
    res.send(newBooking);
  };
  return {
    getUnavailableDates,
    confirm,
  };
}
