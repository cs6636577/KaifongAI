import { ReactNode } from 'react';

interface MyComponentProps {
  children: ReactNode;
}

export default function Layout({children}: MyComponentProps) {
  return (
    <div className="admin-theme min-h-screen bg-background">
      {children}
    </div>
  );
}