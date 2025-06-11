export function DefaultPaddedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-xl mx-auto px-6 py-16 space-y-6">{children}</div>
  );
}
