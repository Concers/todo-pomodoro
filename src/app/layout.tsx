import "./globals.css";

export const metadata = {
  title: "TODO-POMODORO",
  description: "TODO-POMODORO",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
