import React from 'react';
import { Card } from '@/components/ui/Card';
import { ScrollArea } from '@/components/ui/ScrollArea';

const SalesList = ({ sales }: { sales: any }) => {
  return (
    <Card>
      <h2 className="text-lg font-bold mb-4">Recent Sales</h2>
      <ScrollArea className="max-h-96">
        {sales.map((sale: any, index: number) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <div>
              <p className="font-semibold">{sale.buyerPseudo}</p>
              <p className="text-sm text-gray-500">{sale.fiatAmount} €</p>
            </div>
            <p className="font-bold">+{sale.creditAmount} credits</p>
          </div>
        ))}
      </ScrollArea>
    </Card>
  );
};

export default SalesList;
