export default function ProtectedRoute({ session, children }) {
  if (!session) return null;
  return children;
}
