export default function validateUserQuery(req, res, next) {
  const { page, limit, gender, minAge, maxAge } = req.query;

  if (page && (!Number.isInteger(+page) || +page <= 0)) {
    return res.status(400).json({ error: "page must be a positive integer" });
  }

  if (limit && (!Number.isInteger(+limit) || +limit < 1 || +limit > 100)) {
    return res.status(400).json({ error: "limit must be between 1 and 100" });
  }

  if (gender && !["male", "female"].includes(gender)) {
    return res.status(400).json({ error: "gender must be male or female" });
  }

  if (minAge && (!Number.isInteger(+minAge) || +minAge < 0)) {
    return res.status(400).json({ error: "minAge must be a positive integer" });
  }

  if (maxAge && (!Number.isInteger(+maxAge) || +maxAge < 0)) {
    return res.status(400).json({ error: "maxAge must be a positive integer" });
  }

  if (minAge && maxAge && +minAge > +maxAge) {
    return res.status(400).json({ error: "minAge cannot be greater than maxAge" });
  }

  next();
}
