import jsSHA from 'jssha';

export default function users(db) {
  const signin = async (req, res) => {
    console.log(req.body, 'req.bdy');
    const { username, password } = req.body;

    const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
    shaObj.update(password);
    const hashedPassword = shaObj.getHash('HEX');

    const currUser = await db.User.findOne({
      where: {
        username,
        password: hashedPassword,
      },
    });

    if (currUser) {
      const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
      shaObj.update(password);
      const loggedInHash = shaObj.getHash('HEX');

      // Send the cookies
      res.cookie('loggedInUserId', currUser.id);
      res.cookie('loggedInUsername', currUser.username);
      res.cookie('loggedInHash', loggedInHash);
      res.send({ auth: true });
    } else {
      res.send({ auth: false });
    }
  };

  return {
    signin,
  };
}
