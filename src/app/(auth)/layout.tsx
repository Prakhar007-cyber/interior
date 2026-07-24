/** Bare layout for the client-portal auth pages — no site nav or footer. */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-dvh bg-bone">{children}</div>;
}
