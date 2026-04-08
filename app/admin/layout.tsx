import { ReactNode } from 'react';
import Navbar from "../../components/ui/Admin_director/Navbar";
import Test from "../../app/test/page";
interface MyComponentProps {
  children: ReactNode;
}

export default function Layout({children}: MyComponentProps) {
  return (
    <div className="admin-theme min-h-screen bg-background">
      <Test/>
      
      {children}
    </div>
  );
}