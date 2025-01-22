import { useState } from 'react';
import { FaThumbsUp, FaStar } from 'react-icons/fa';
import FlexRow from '../ui/flex-row';
import { Label } from '../ui/label';
import { format } from 'date-fns';
import FlexCol from '../ui/flex-col';

type GamePropType = {
  gameCoverImage: string;
  gameDisplayImage: string;
  gameName: string;
  gameDescription: string;
  id: string;
  createdAt: Date;
  rating: string;
  likes: string;
};

export const Game = ({
  gameCoverImage,
  gameDisplayImage,
  gameName,
  gameDescription,
  id,
  createdAt,
  rating,
  likes,
}: GamePropType) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      key={id}
      style={{
        borderRadius: '12px',
      }}
      className="w-full flex flex-col overflow-hidden border border-zinc-950/10 bg-neutral-50/50 dark:border-zinc-50/10 dark:bg-PATRON_DARK_GRAY"
    >
      <img src={gameCoverImage} alt={gameName} className="h-40 w-full object-cover" />
      <div className="flex flex-col flex-grow items-start justify-between p-2 py-3 gap-3">
        <FlexRow className="gap-3 w-full justify-start">
          <img
            src={gameDisplayImage}
            alt={gameName}
            className="h-14 w-14 rounded-full object-cover border-2 border-neutral-200 dark:border-PATRON_BORDER_COLOR"
          />
          <div className="flex justify-between items-center w-full pr-4">
            <FlexCol className="items-start">
              <Label className="text-PATRON_BLACK dark:text-zinc-50 font-changa text-lg">
                {gameName.toUpperCase()}
              </Label>
              <span className="text-PATRON_TEXT_WHITE_SECONDARY dark:text-zinc-400 text-xs text-start">
                {expanded ? gameDescription : `${gameDescription.substring(0, 50)}...`}
                <button onClick={handleExpand} className="text-neutral-400 ml-1">
                  {expanded ? 'Read Less' : 'Read More'}
                </button>
              </span>
            </FlexCol>
            <a
              href="https://flip-n-win.vercel.app/"
              className="h-full w-28 bg-white py-2 rounded-md text-sm text-black"
            >
              Play
            </a>
          </div>
        </FlexRow>
        <FlexRow className="gap-5 w-full justify-between items-center px-3">
          <FlexRow className="gap-3">
            <div className="flex items-center gap-2">
              <FaStar size={12} color="#fff" />
              <span className="text-neutral-400">{rating}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaThumbsUp size={12} color="#fff" />
              <span className="text-neutral-400">{likes}</span>
            </div>
          </FlexRow>
          <span className="text-neutral-500 dark:text-zinc-400 text-xs">
            Released on: {format(new Date(createdAt), 'MMMM dd, yyyy')}
          </span>
        </FlexRow>
      </div>
    </div>
  );
};

export default Game;
