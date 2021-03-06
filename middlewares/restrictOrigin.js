const allowedOrigins = ["localhost"];

export default (req, res, next) => {
  let isDomainAllowed = allowedOrigins.indexOf(req.hostname) !== -1;
  if (!isDomainAllowed) return res.status(403).json({ message: "RESTRICTED" });
  next();
};
