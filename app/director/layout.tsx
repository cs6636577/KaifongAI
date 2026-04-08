import type { Metadata } from "next";
import DirectorShell from "../directorshell";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DirectorShell>{children}</DirectorShell>;
}