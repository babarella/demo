import numeral from 'numeral';

import { Button } from '@/components/ui';

export interface WinDisplayProps {
  multiplier: number;
  reward: number;
  onGameRestart: () => void;
  onChangeBetSize: () => void;
}

export function WinDisplay({
  multiplier,
  reward,
  onGameRestart,
  onChangeBetSize,
}: WinDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-brand text-primary-foreground rounded-full px-6 py-2 text-4xl font-semibold">
        {numeral(multiplier).format('0,0.00')}x
      </div>
      <div className="text-brand text-2xl font-semibold">
        {numeral(reward).format('0,0.00[00]')} ETH
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="brand" size="lg" onClick={onGameRestart}>
          Play Again
        </Button>
        <Button size="lg" onClick={onChangeBetSize}>
          Change Bet Size
        </Button>
      </div>
    </div>
  );
}
