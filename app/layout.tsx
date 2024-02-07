import { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <div className="bg-white container mx-auto flex justify-between items-center py-6 px-6 mb-14">
          <h1 className="text-3xl font-bold">Where in the world?</h1>

          <button className="text-xl">Dark Mode</button>
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
