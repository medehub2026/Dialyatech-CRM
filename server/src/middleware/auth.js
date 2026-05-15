import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "local-dev-secret";

export function signToken(user) {
  return jwt.sign({ sub: user.id, role: user.role, email: user.email, name: user.name }, secret, { expiresIn: "8h" });
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return res.status(401).json({ message: "Authentication required" });
  try {
    req.user = jwt.verify(token, secret);
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function allowRoles(...roles) {
  return (req, res, next) => {
    if (!roles.length || roles.includes(req.user?.role)) return next();
    return res.status(403).json({ message: "Insufficient role permissions" });
  };
}
