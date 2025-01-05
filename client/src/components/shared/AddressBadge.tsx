import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const AddressBadge = ({
  address,
  className,
  from = 8,
}: {
  address: `0x${string}`;
  className?: string;
  from?: number;
}) => {
  return (
    <Badge
      variant={'secondary'}
      className={cn(
        'h-6 ml-1 border-neutral-300 dark:border-PATRON_BORDER_COLOR cursor-pointer bg-neutral-200 dark:bg-PATRON_LIGHT_GRAY dark:text-PATRON_TEXT_WHITE_SECONDARY dark:hover:text-PATRON_TEXT_WHITE_PRIMARY ',
        className
      )}
    >
      {address.slice(0, from) + '...' + address.slice(from, address.length - 30)}
    </Badge>
  );
};

export default AddressBadge;
