import jwt from 'jsonwebtoken';

const generateToken = (res, donorId) => {
  const token = jwt.sign(
    { donorId },
    process.env.JWT_SECRET,
    {
      expiresIn: '60d', // set token validity to 60 days
    }
  );

  // set jwt as http-only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60 * 24 * 60 * 60 * 1000, // 60 days
  });
}

export default generateToken;
