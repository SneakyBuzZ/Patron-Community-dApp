import { Ellipsis, Gift, Heart, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';

const PostCard = () => {
  return (
    <>
      <div className="border flex flex-col justify-start items-start rounded-md w-full h-[37rem] bg-neutral-800/20">
        <div className="h-[12%] flex w-full justify-between items-center p-3 px-5 gap-4 border-b border-b-PATRON_BLACK">
          <div className="flex w-full justify-start items-center">
            <img
              className="rounded-full h-10 w-10 select-none pointer-events-none"
              src={'https://i.pinimg.com/564x/2f/98/17/2f98172f0a31207b3b67b076e2bcc534.jpg'}
              alt="ok"
            />
            <div className="flex flex-col justify-start items-start ml-2">
              <h4 className="text-base text-PATRON_TEXT_WHITE_PRIMARY">{'Kaushik'}</h4>
              <p className="text-xs text-PATRON_TEXT_WHITE_SECONDARY">0x23343FNKNDM234....</p>
            </div>
          </div>
          <Ellipsis />
        </div>

        <img
          className="h-[60%] w-full object-cover select-none pointer-events-none"
          src="https://i.pinimg.com/564x/2f/98/17/2f98172f0a31207b3b67b076e2bcc534.jpg"
          alt="image"
        />

        <div className="flex flex-col justify-center items-start h-[28%] w-full">
          <div className="flex justify-between items-center gap-2 p-3 w-full border-b border-b-PATRON_BORDER_COLOR">
            <div className="flex justify-start items-center gap-2">
              <Heart />
              <MessageCircle />
            </div>
            <Button className="h-9 dark:bg-neutral-800 border dark:border-PATRON_BORDER_COLOR">
              <Gift size={20} color="#BDBDBD" />
            </Button>
          </div>

          <p className="w-full p-3 flex justify-start items-start">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae nemo provident quidem
            ipsam minima eaque harum illo repudiandae, debitis bea....more
          </p>
        </div>
      </div>
    </>
  );
};

export default PostCard;
