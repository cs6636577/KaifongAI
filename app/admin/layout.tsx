import { ReactNode } from 'react';
import Navbar from "../../components/ui/Admin_director/Navbar";
interface MyComponentProps {
  children: ReactNode;
}

export default function Layout({children}: MyComponentProps) {
  return (
    <div className="admin-theme min-h-screen bg-background">
      <Navbar/>
      {children}
    </div>
  );
}