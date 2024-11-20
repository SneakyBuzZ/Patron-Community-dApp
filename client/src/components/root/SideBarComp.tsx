import { SideBarList } from '@/lib/lists';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const SidebarComp = () => {
  const { pathname } = useLocation();

  return (
    <>
      <ul className="h-full flex flex-col justify-start items-start w-1/5 gap-7 py-5 px-4 overflow-y-auto scrollbar-hide">
        {SideBarList.map((each) => {
          return (
            <li key={each.title} className="w-full flex flex-col">
              <h3
                className={cn(
                  ' text-lg font-medium',
                  each.children.filter((each) => each.path === pathname).length > 0
                    ? 'text-PATRON_TEXT_WHITE_PRIMARY'
                    : 'text-neutral-500'
                )}
              >
                {each.title.toUpperCase()}
              </h3>

              {each.children && (
                <ul className="w-full border-l-2 dark:border-PATRON_BORDER_COLOR flex flex-col gap-3 pt-3">
                  {each.children.map((child) => (
                    <li key={child.title}>
                      <Link
                        to={child.path}
                        className={cn(
                          'text-sm text-PATRON_GRAY hover:text-PATRON_BLUE flex items-center gap-2 px-3 py-2 rounded-r-md ',
                          pathname === child.path
                            ? 'bg-neutral-100 dark:bg-PATRON_LIGHT_GRAY text-PATRON_LIGHT_GRAY dark:text-PATRON_TEXT_WHITE_PRIMARY border-y border-r'
                            : 'text-neutral-500 bg-none '
                        )}
                      >
                        <child.icon size={18} />
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default SidebarComp;
