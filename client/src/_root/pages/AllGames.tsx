import GameGrid from '@/components/root/GameGrid';

const AllGames = () => {
  return (
    <section className="w-full min-h-screen">
      <h1 className="text-xl w-full py-2 pt-3 px-7 font-audio-wide border-b dark:border-b-PATRON_BORDER_COLOR">
        All Groups
      </h1>
      <div className="h-5/6 px-7">
        <GameGrid />
      </div>
    </section>
  );
};

export default AllGames;