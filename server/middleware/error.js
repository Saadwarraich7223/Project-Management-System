class ErrorHandler extends Error {
  constructor(message, statusCode) {
    (super(message), (this.statusCode = statusCode));
  }
}

const errorMiddleware = (err, req, res, next) => {
  console.error("Error caught in middleware:", err); // Debugging: Log full error
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (err.code === 11000) {
    err.message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err.statusCode = 400;
  }

  if (err.name === "JsonWebTokenError") {
    err.message = "JSON Web Token is invalid, try again";
    err.statusCode = 400;
  }

  if (err.name === "TokenExpiredError") {
    err.message = "JSON Web Token is expired, try again";
    err.statusCode = 400;
  }

  if (err.name === "CastError") {
    err.message = `Resource not found. Invalid: ${err.path}`;
    err.statusCode = 400;
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((value) => value.message)
        .join(", ")
    : err.message;

  return res.status(err.statusCode || 500).json({
    success: false,
    message: errorMessage,
  });
};

export { errorMiddleware, ErrorHandler };
