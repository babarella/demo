'use client';

import { useContext, useEffect, useRef } from 'react';

import { ScrollArea } from '@/components/ui';
import { GameContext } from '@/context';

import { GameBoardRow } from './game-board-row';

export function GameBoard() {
  const { game, activeBoardRowIndex, choose, gameLog, isGameLost, isCashedOut } =
    useContext(GameContext);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // jump to bottom on mount
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [game.length]);

  return (
    <div>
      <ScrollArea
        className="border-content1 rounded-lg border p-4"
        style={{ height: 'calc(100vh - 250px - 100px)' }}
      >
        <div className="flex flex-col gap-4">
          {game.map((item, itemIdx) => (
            <GameBoardRow
              key={itemIdx}
              row={item}
              isGameFinished={isGameLost || isCashedOut}
              selectedIndex={gameLog[itemIdx]}
              onIndexSelect={choose}
              active={itemIdx === activeBoardRowIndex}
            />
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
    </div>
  );
}
