import React from 'react';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';

const LegalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavigationBar type="app" />
      <main className="mt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default LegalLayout;
