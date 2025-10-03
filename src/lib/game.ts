import random from 'lodash/random';

export type GameBoard = number[];

export interface GameRow {
  size: number;
  deathIndex: number;
  multiplier: number;
}

export type Game = GameRow[];

export function generateGame(): Game {
  const board = generateBoard();
  const multipliers = generateMultipliersForBoard(board);

  return board.map((size, index) => ({
    size,
    deathIndex: random(0, size - 1),
    multiplier: multipliers[index],
  }));
}

export function generateBoard(): GameBoard {
  return [6, 5, 4, 7, 4, 4, 4, 4, 7, 3, 2, 6, 2, 3, 2, 3, 5, 6, 2, 6, 6, 2, 7, 7, 2].reverse();
}

/**
 * Calculates the cumulative multiplier for each row, applying the house edge.
 * The multiplier for a row represents the total multiplier achieved *after* completing that row.
 */
export function generateMultipliersForBoard(board: GameBoard): number[] {
  const multipliers: number[] = [];
  let currentMultiplier = 1;

  for (const row of board) {
    // Calculate base multiplier for this row (1 / (1 - death_chance))
    const baseMultiplier = 1 / (1 - 1 / row);
    // Multiply with previous cumulative multiplier
    currentMultiplier *= baseMultiplier;
    // Apply house edge to the multiplier
    const multiplierWithEdge = currentMultiplier * (1 - 0.45);
    // Push the multiplier with house edge to the array
    multipliers.push(multiplierWithEdge);
  }

  return multipliers.reverse();
}
