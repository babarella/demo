'use client';

import { useQuery } from '@tanstack/react-query';
import { createContext, PropsWithChildren, useState } from 'react';

import { Game, generateGame } from '@/lib/game';

type GameLog = Record<number, number | undefined>;

interface GameContext {
  game: Game;
  gameLog: GameLog;
  activeBoardRowIndex: number;
  betSize: number;
  isBoardLoading: boolean;
  isGameLost: boolean;
  isCashedOut: boolean;
  regenerateBoard: () => void;
  startGame: () => void;
  restartGame: () => void;
  changeBetSize: () => void;
  cashOut: () => void;
  setBetSize: (size: number) => void;
  choose: (choiceIdx: number) => void;
}

export const GameContext = createContext<GameContext>({
  game: [],
  gameLog: {},
  activeBoardRowIndex: -1,
  betSize: 1,
  isBoardLoading: false,
  isGameLost: false,
  isCashedOut: false,
  regenerateBoard: () => {},
  startGame: () => {},
  restartGame: () => {},
  changeBetSize: () => {},
  cashOut: () => {},
  setBetSize: () => {},
  choose: () => {},
});

export function GameProvider({ children }: PropsWithChildren) {
  // -1 no board row is in play
  const [activeBoardRowIndex, setActiveBoardRowIndex] = useState(-1);
  const [betSize, setBetSize] = useState(0);
  const [gameLog, setGameLog] = useState<GameLog>({});
  const [isGameLost, setIsGameLost] = useState(false);
  const [isCashedOut, setIsCashedOut] = useState(false);

  // Emulating fetching from server
  const {
    data: game = [],
    isLoading: isBoardLoading,
    refetch: regenerateBoard,
  } = useQuery({
    queryKey: ['board'],
    queryFn: async () => {
      return generateGame();
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  function startGame() {
    setActiveBoardRowIndex(game.length - 1);
  }

  function choose(choiceIdx: number) {
    const affectedRow = game[activeBoardRowIndex] ? { ...game[activeBoardRowIndex] } : null;
    if (!affectedRow) return;

    if (affectedRow && affectedRow.deathIndex === choiceIdx) {
      setIsGameLost(true);
    } else {
      setActiveBoardRowIndex((prev) => (prev === 0 ? prev : prev - 1));
    }

    setGameLog((prev) => ({ ...prev, [activeBoardRowIndex]: choiceIdx }));
  }

  async function restartGame() {
    const { data = [] } = await regenerateBoard();
    setGameLog({});
    setIsGameLost(false);
    setIsCashedOut(false);
    setActiveBoardRowIndex(data.length - 1);
  }

  async function changeBetSize() {
    setBetSize(0);
    regenerateBoard();
    setGameLog({});
    setActiveBoardRowIndex(-1);
    setIsGameLost(false);
    setIsCashedOut(false);
  }

  async function cashOut() {
    setIsCashedOut(true);
    setActiveBoardRowIndex((prev) => prev + 1);
  }

  const contextValue = {
    game,
    isBoardLoading,
    regenerateBoard,
    activeBoardRowIndex,
    betSize,
    setBetSize,
    startGame,
    restartGame,
    gameLog,
    choose,
    isGameLost,
    changeBetSize,
    isCashedOut,
    cashOut,
  };

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
}
