import PostCard from '@/components/root/PostCard';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { TextShimmer } from '@/components/ui/text-shimmer';
import { Hand } from 'lucide-react';

const HomePage = () => {
  return (
    <section className="w-full flex justify-start items-start h-full overflow-y-auto">
      <div className="flex h-full w-7/12 p-5 px-14">
        <PostCard />
      </div>
      <div className="flex flex-col items-center justify-start gap-2 h-full p-5 px-10 w-5/12 border-l border-l-PATRON_BORDER_COLOR">
        <div className="flex flex-col w-full gap-1 mb-1">
          <div className="flex w-full justify-between items-center">
            <TextShimmer duration={1} className="text-xl text-PATRON_TEXT_WHITE_PRIMARY">
              FEATURED BOUNTIES
            </TextShimmer>
            <button className="text-xs text-PATRON_TEXT_WHITE_SECONDARY">{'View All'}</button>
          </div>
          <p className="text-sm text-neutral-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, doloremque.
          </p>
        </div>

        <InfiniteSlider
          durationOnHover={75}
          gap={10}
          className="w-full flex justify-center items-center gap-3 overflow-x-auto scrollbar-hide h-[40%] rounded-md"
        >
          <img className="h-full w-2/3 object-cover rounded-md" src="/bounty.png" alt="bounty" />
          <img
            className="h-full w-2/3 object-cover rounded-md"
            src="https://i.pinimg.com/736x/71/3d/61/713d614489191613e76e8c7204d64ad5.jpg"
            alt="bouint"
          />
          <img
            className="h-full w-2/3 object-cover rounded-md"
            src="https://i.pinimg.com/736x/71/3d/61/713d614489191613e76e8c7204d64ad5.jpg"
            alt="bouint"
          />
        </InfiniteSlider>

        <div className="flex flex-col w-full gap-4 mt-7">
          <div className="flex flex-col justify-center items-start w-full gap-1">
            <TextShimmer duration={1} className="text-xl text-PATRON_TEXT_WHITE_PRIMARY">
              BIG WHALES
            </TextShimmer>
            <p className="text-sm text-neutral-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, doloremque.
            </p>
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="w-full flex justify-between items-center border border-PATRON_BORDER_COLOR rounded-md p-2">
              <div className="flex justify-start items-center gap-2 ">
                <img className="w-10 h-10 rounded-full" src="/bounty.png" alt="profile" />
                <div className="flex flex-col justify-center items-start">
                  <span className="text-md text-PATRON_TEXT_WHITE_PRIMARY">Kaushik</span>
                  <span className="text-xs text-PATRON_TEXT_WHITE_SECONDARY">
                    0x23343FNKNDM234....
                  </span>
                </div>
              </div>
              <Hand size={18} className="mr-2" />
            </div>
            <div className="w-full flex justify-between items-center border border-PATRON_BORDER_COLOR rounded-md p-2">
              <div className="flex justify-start items-center gap-2 ">
                <img className="w-10 h-10 rounded-full" src="/bounty.png" alt="profile" />
                <div className="flex flex-col justify-center items-start">
                  <span className="text-md text-PATRON_TEXT_WHITE_PRIMARY">Kaushik</span>
                  <span className="text-xs text-PATRON_TEXT_WHITE_SECONDARY">
                    0x23343FNKNDM234....
                  </span>
                </div>
              </div>
              <Hand size={18} className="mr-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
