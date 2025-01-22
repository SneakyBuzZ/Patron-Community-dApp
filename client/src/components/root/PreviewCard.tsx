import { MagicCard } from '@/components/magicui/magic-card';
import { Button } from '@/components/ui/button';
import { DotLoader } from 'react-spinners';

const PreviewCard = ({ imageUrl, isPending }: { imageUrl?: string; isPending?: boolean }) => {
  return (
    <div className="w-full order-6 border-t dark:border-t-PATRON_BORDER_COLOR lg:order-3 flex flex-col justify-center items-center py-5 h-full">
      <h1 className="text-xl w-full pb-3 px-10 sm:text-center font-audio-wide border-b dark:border-b-PATRON_BORDER_COLOR">
        Preview
      </h1>
      <div className="flex w-full flex-col items-center py-16">
        <MagicCard
          className="cursor-pointer rounded-t-lg p-3 dark:bg-PATRON_DARK_GRAY flex-col items-center justify-center  dark:border-PATRON_BORDER_COLOR w-4/5 md:w-3/5 shadow-2xl shadow-[#84dcff29]"
          gradientColor={'#1C1C1C'}
        >
          {isPending ? (
            <>
              <div className="flex flex-col justify-center items-center p-20">
                <DotLoader color="#fff" />
              </div>
            </>
          ) : (
            <img
              src={imageUrl || '/place-holder.png'}
              alt="Display"
              className="object-fill rounded-md w-full mx-auto select-none pointer-events-none"
            />
          )}

          <div className="flex items-center justify-between gap-24 md:gap-40 px-5 py-2 w-full">
            <h1 className="text-xl text-PATRON_TEXT_WHITE_PRIMARY my-2">THIS IS TITLE</h1>
            <Button className="h-7 text-xs text-rose-400">Join</Button>
          </div>
        </MagicCard>
        <MagicCard
          className="cursor-pointer rounded-b-lg bg-neutral-100 dark:bg-PATRON_LIGHT_GRAY flex-col items-center justify-center dark:border-PATRON_BORDER_COLOR w-4/5 md:w-3/5"
          gradientColor={'#1C1C1C'}
        >
          <p className="text-xs py-5 px-3 text-PATRON_TEXT_WHITE_SECONDARY">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam odio consectetur culpa
            corrupti est debitis minus possimus laboriosam maxime sed?
          </p>
        </MagicCard>
      </div>
    </div>
  );
};

export default PreviewCard;
