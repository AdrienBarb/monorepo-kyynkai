import { Check } from 'lucide-react';

const Feature = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-20 px-4">
      <div className="container mx-auto">
        <div className="flex gap-4 flex-col items-start">
          <div className="flex gap-2 flex-col w-full items-center">
            <h2 className="font-rubik font-bold text-center  text-4xl max-w-md">
              Discover Our Unique Advantages
            </h2>
          </div>
          <div className="flex gap-10 pt-6 flex-col w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 items-start lg:grid-cols-3 gap-10">
              <div className="flex flex-row gap-4 w-full items-start">
                <Check
                  strokeWidth={3}
                  className="w-4 h-4 mt-2 text-primary flex-shrink-0"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-normal">0% platform fees for 1 months</p>
                  <p className="text-zinc-500 text-sm">
                    Enjoy all your earnings without initial fees.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <Check
                  strokeWidth={3}
                  className="w-4 h-4 mt-2 text-primary flex-shrink-0"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-normal">
                    Only 10% fees after (vs 20% on OnlyFans)
                  </p>
                  <p className="text-zinc-500 text-sm">
                    Maximize your earnings with reduced fees.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <Check
                  strokeWidth={3}
                  className="w-4 h-4 mt-2 text-primary flex-shrink-0"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-normal">
                    Chat-based content — more engagement, more earnings
                  </p>
                  <p className="text-zinc-500 text-sm">
                    Increase your interactions and profits.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 w-full items-start">
                <Check
                  strokeWidth={3}
                  className="w-4 h-4 mt-2 text-primary flex-shrink-0"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-normal">
                    Credit-based system — no chargebacks
                  </p>
                  <p className="text-zinc-500 text-sm">
                    Secure your transactions without worries.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <Check
                  strokeWidth={3}
                  className="w-4 h-4 mt-2 text-primary flex-shrink-0"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-normal">
                    Get paid for every voice reply, custom nude, or message
                  </p>
                  <p className="text-zinc-500 text-sm">
                    Every interaction counts towards your earnings.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <Check
                  strokeWidth={3}
                  className="w-4 h-4 mt-2 text-primary flex-shrink-0"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-normal">
                    Secure, EU-based, with verified creators only
                  </p>
                  <p className="text-zinc-500 text-sm">
                    A trusted platform for you and your fans.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
