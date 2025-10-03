// death state -> title, restart
// normal state -> current multiplier + bet size + stop game
// win -> end multiplier + win amount + start again
import { useContext } from 'react';

import { GameContext } from '@/context';
import { cn } from '@/lib/utils';

import { ActiveDisplay } from './active-display';
import { BeginDisplay } from './begin-display';
import { DeathDisplay } from './death-display';
import { WinDisplay } from './win-display';

type GameControlsMode = 'begin' | 'active' | 'win' | 'death';

const multiplier = 1;

const styles = {
  container: 'rounded-xl border px-4 py-6 h-[250px] box-border flex items-center justify-center',
  containerBase: 'border-success/50 bg-success/5',
  containerDeath: 'border-destructive/50 bg-destructive/5',
};

export function GameControls() {
  const {
    betSize,
    activeBoardRowIndex,
    setBetSize,
    startGame,
    game,
    isGameLost,
    restartGame,
    changeBetSize,
    isCashedOut,
    cashOut,
  } = useContext(GameContext);

  const isGameBetsizeSelected = !!betSize;
  const isFullVictory = activeBoardRowIndex === 0 && !isGameLost;

  const mode: GameControlsMode = !isGameBetsizeSelected
    ? 'begin'
    : isGameLost
      ? 'death'
      : isCashedOut || isFullVictory
        ? 'win'
        : 'active';

  const containerModeClassName = mode === 'death' ? styles.containerDeath : styles.containerBase;
  const accomplishedMultiplier = game[activeBoardRowIndex + 1]?.multiplier || 1;
  const ongoingMultiplier = game[activeBoardRowIndex]?.multiplier || 1;

  const currentDisplay = () => {
    const displaysMap: Record<GameControlsMode, any> = {
      ['begin']: (
        <BeginDisplay
          onBegin={(size) => {
            setBetSize(size);
            startGame();
          }}
        />
      ),
      ['active']: (
        <ActiveDisplay betSize={betSize} multiplier={accomplishedMultiplier} onCashOut={cashOut} />
      ),
      ['win']: (
        <WinDisplay
          multiplier={ongoingMultiplier}
          reward={ongoingMultiplier * betSize}
          onGameRestart={restartGame}
          onChangeBetSize={changeBetSize}
        />
      ),
      ['death']: <DeathDisplay onGameRestart={restartGame} onChangeBetSize={changeBetSize} />,
    };
    return displaysMap[mode];
  };

  return <div className={cn(styles.container, containerModeClassName)}>{currentDisplay()}</div>;
}
