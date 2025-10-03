'use client';

import { useState } from 'react';

import { Button, Input, Label } from '@/components/ui';

export interface BeginDisplayProps {
  onBegin: (betSize: number) => void;
}

export function BeginDisplay({ onBegin }: BeginDisplayProps) {
  const [betSize, setBetSize] = useState(1);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="space-y-2">
        <Label htmlFor="bet-size">Select bet size:</Label>
        <Input
          id="bet-size"
          type="number"
          placeholder="Select bet size"
          value={betSize}
          min={1}
          step={1}
          className="w-[220px] text-center"
          required
          onChange={(e) => setBetSize(Number(e.target.value))}
        />
      </div>
      <Button size="lg" onClick={() => onBegin(1)} disabled={!betSize}>
        START GAME
      </Button>
    </div>
  );
}
