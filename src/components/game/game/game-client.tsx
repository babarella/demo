'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { GameProvider } from '@/context';

import { GameBoard } from '../game-board';
import { GameControls } from '../game-controls';

const queryClient = new QueryClient({});

export function GameClient() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <div>
          <div>
            <GameBoard />
          </div>
          <div className="mt-8">
            <GameControls />
          </div>
        </div>
      </GameProvider>
    </QueryClientProvider>
  );
}
