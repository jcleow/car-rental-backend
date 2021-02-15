export default function cars(db) {
  const index = async (req, res) => {
    try {
      const availableCars = await db.Car.findAll({
        where: {
          isAvailable: true,
        },
      });

      res.send({ availableCars });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    index,
  };
}
