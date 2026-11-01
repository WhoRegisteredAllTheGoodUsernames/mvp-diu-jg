import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Resolve — Service desk",
  description: "Manage internal service requests and incidents.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
