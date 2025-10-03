import { GameClient } from '@/components/game';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="m-auto min-h-[100vh] max-w-[768px] px-4">
      <div className="box-border h-full max-h-[100vh] py-8">
        <GameClient />
      </div>
    </div>
  );
}
