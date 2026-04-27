import { Inter } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/components/transitionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tran Tien Quang — Full-Stack Engineer",
  description:
    "Full-stack engineer (5+ yrs). Java / Spring Boot · React / Next.js. Currently building Vietnam's Booking.com / Agoda equivalent. Previously NAVER, Cốc Cốc, Appota.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
