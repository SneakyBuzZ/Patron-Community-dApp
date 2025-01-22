import { GameList } from '@/lib/lists';
import { Game } from './Game';

const GameGrid = () => {
  return (
    <ul className="flex flex-col items-start mx-auto mt-3 text-center gap-y-4 sm:gap-x-8  my-6">
      {GameList &&
        GameList.map((each) => (
          <Game
            createdAt={each.createdAt}
            gameName={each.gameName}
            gameDisplayImage={each.gameDisplayImage || ''}
            id={each.id}
            gameCoverImage={each.gameCover}
            gameDescription={each.gameDescription}
            likes={each.likes}
            rating={each.rating}
          />
        ))}
    </ul>
  );
};

export default GameGrid;
