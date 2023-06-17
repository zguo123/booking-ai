import { Inter } from "next/font/google";
import { Providers } from "./providers";

export const metadata = {
  title: "Booking AI",
  description: "An AI powered booking system for your business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
