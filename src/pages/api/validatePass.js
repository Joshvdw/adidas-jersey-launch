export default function handler(req, res) {
  const password = req.body;
  const secretPassword = process.env.PRESS_PASS;

  if (password === secretPassword) {
    res.status(200).json({ valid: true });
  } else {
    res.status(200).json({ valid: false });
  }
}
