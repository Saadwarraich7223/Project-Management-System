const generateToken = (user, statusCode, message, res) => {
  const token = user.generateToken();

  const cookieExpireyDays = Number(process.env.COOKIE_EXPIRE) || 7;

  const isProduction =
    process.env.NODE_ENV === "production" ||
    (process.env.FRONTEND_URL &&
      process.env.FRONTEND_URL.includes("vercel.app"));

  const cookieOptions = {
    expires: new Date(Date.now() + cookieExpireyDays * 24 * 60 * 60 * 1000),
    httpsOnly: true,
    sameSite: isProduction ? "None" : "Lax",
    secure: isProduction,
  };

  res.status(statusCode).cookie("token", token, cookieOptions).json({
    success: true,
    message: message,
    user,
    token,
  });
};

export default generateToken;
