import React from 'react';
import LandingHeader from '@/components/home/LandingHeader';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const ModelOffer = () => {
  return (
    <section className="max-w-4xl mx-auto py-20 px-4 flex flex-col items-center">
      <LandingHeader
        title="YOU'RE A MODEL?"
        description="Sign up now and earn 100% of your revenue for the first 3 months!"
      />
      <Button asChild>
        <Link href="/register">Sign Up</Link>
      </Button>
    </section>
  );
};

export default ModelOffer;
