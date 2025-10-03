import { Button } from '@/components/ui';

export interface DeathDisplayProps {
  onGameRestart: () => void;
  onChangeBetSize: () => void;
}

export function DeathDisplay({ onGameRestart, onChangeBetSize }: DeathDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-destructive text-primary-foreground rounded-full px-6 py-2 text-4xl font-semibold">
        DEATH TILE!
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
