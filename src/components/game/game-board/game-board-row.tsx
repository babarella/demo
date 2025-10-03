import numeral from 'numeral';

import { GameRow } from '@/lib/game';
import { cn } from '@/lib/utils';

import { GameBoardCell } from './game-board-cell';

export interface GameBoardRowProps {
  row: GameRow;
  isGameFinished: boolean;
  selectedIndex: number | undefined;
  onIndexSelect: (index: number) => void;
  active: boolean;
}

export function GameBoardRow({
  row,
  isGameFinished,
  active,
  onIndexSelect,
  selectedIndex,
}: GameBoardRowProps) {
  return (
    <div className="flex items-center">
      <div className="flex w-[120px] max-w-[120px] items-center justify-center text-center">
        {numeral(row.multiplier).format('0,0.00')}x
      </div>
      <div
        className={cn(
          'bg-content1 flex w-full items-center justify-center gap-3 rounded-lg p-4',
          active ? 'border-brand border' : 'border-content1 border',
        )}
      >
        {Array.from({ length: row.size }).map((_, index) => (
          <GameBoardCell
            key={index}
            active={active && selectedIndex === undefined}
            canReveal={selectedIndex !== undefined || isGameFinished}
            selected={selectedIndex === index}
            isPlanted={index === row.deathIndex}
            onSelect={() => onIndexSelect(index)}
          />
        ))}
      </div>
    </div>
  );
}
