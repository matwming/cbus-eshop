import "./globals.css";
import { Providers } from "@/app/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" title="Cbus E-commerce">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
