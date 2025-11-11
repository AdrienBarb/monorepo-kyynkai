import React from 'react';
import FeatureCard from '@/components/home/FeatureCard';
import LandingHeader from '@/components/home/LandingHeader';

const LandingFeatures = () => {
  return (
    <section className="max-w-3xl mx-auto py-16 px-4">
      <LandingHeader title="EARN BY CREATING INTIMATE EXPERIENCES" />
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8">
        <FeatureCard
          icon="💬"
          title="Private Messaging"
          description="Have real conversations with your fans. Every message is paid — every word counts."
        />
        <FeatureCard
          icon="📸"
          title="Custom Nudes"
          description="Send unique, private nudes directly in the chat. Intimate, personal, and paid."
        />
      </div>
    </section>
  );
};

export default LandingFeatures;
