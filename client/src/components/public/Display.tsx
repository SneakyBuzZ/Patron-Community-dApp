import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { useTheme } from '../shared/ThemeProvider';
import { useEffect, useState } from 'react';

const Display = () => {
  const { theme } = useTheme();
  const [path, setPath] = useState('/display.svg');

  useEffect(() => {
    theme === 'dark' ? setPath('/display.svg') : setPath('/display-light.svg');
  });

  return (
    <>
      <div
        className=" w-2/3 mx-auto relative top-12 p-1 sm:p-3  rounded-md 
      dark:bg-PATRON_LIGHT_GRAY border dark:border-PATRON_BORDER_COLOR shadow-xl"
      >
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <img src={path} alt="Display" className="object-cover select-none pointer-events-none" />
        </AspectRatio>
      </div>
    </>
  );
};

export default Display;
