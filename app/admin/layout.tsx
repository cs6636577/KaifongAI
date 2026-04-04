import { ReactNode } from 'react';

interface MyComponentProps {
  children: ReactNode;
}

export default function Layout({children}: MyComponentProps) {
  return (
    <>test
      {children}
    </>
  );
}