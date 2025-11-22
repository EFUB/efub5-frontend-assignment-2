import "./globals.css";
import Header from "./Header";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import ThemeClientLayout from "./ThemeClientLayout";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <ThemeClientLayout session={session}>{children}</ThemeClientLayout>
      </body>
    </html>
  );
}
