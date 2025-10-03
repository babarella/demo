import numeral from 'numeral';

import { Button } from '@/components/ui';

export interface ActiveDisplayProps {
  multiplier: number;
  betSize: number;
  onCashOut: () => void;
}

export function ActiveDisplay({ multiplier, betSize, onCashOut }: ActiveDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4 text-3xl font-semibold">
        <div>{numeral(multiplier).format('0,0.00')}x</div>
        <div className="text-brand">{numeral(betSize * multiplier).format('0,0.00[00]')} ETH</div>
      </div>
      <Button size="lg" onClick={onCashOut} disabled={multiplier === 1}>
        CASH OUT
      </Button>
    </div>
  );
}
