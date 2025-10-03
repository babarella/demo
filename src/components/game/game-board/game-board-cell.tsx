import { cn } from '@/lib/utils';

type GameBoardCellMode = 'idle' | 'reveal' | 'loss' | 'win';

export interface GameBoardCellProps {
  size?: string;
  active?: boolean;
  isPlanted?: boolean;
  canReveal?: boolean;
  selected: boolean;
  onSelect?: () => void;
}

const styles = {
  base: 'flex items-center justify-center rounded-md',
  idle: 'bg-content2',
  reveal: 'bg-content2',
  loss: 'bg-destructive',
  win: 'bg-brand',
  active: 'transition transition-all hover:opacity-70 cursor-pointer',
  inactive: 'pointer-events-none',
};

export function GameBoardCell({
  size = '48px',
  active = true,
  canReveal = false,
  isPlanted = false,
  selected = false,
  onSelect = () => {},
}: GameBoardCellProps) {
  const mode: GameBoardCellMode =
    active || !canReveal
      ? 'idle'
      : selected
        ? isPlanted
          ? 'loss'
          : 'win'
        : isPlanted
          ? 'reveal'
          : 'idle';

  return (
    <div
      className={cn(styles.base, active ? styles.active : styles.inactive, styles[mode])}
      style={{
        height: size,
        width: size,
        minWidth: size,
        minHeight: size,
        maxWidth: size,
        maxHeight: size,
      }}
      onClick={() => (active ? onSelect() : () => {})}
    >
      {['reveal', 'loss'].includes(mode) ? 'X' : ''}
    </div>
  );
}
