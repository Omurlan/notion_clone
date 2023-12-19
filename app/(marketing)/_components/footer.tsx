import { Button } from '@/components/ui/button';

import { Logo } from './logo';

export const Footer = () => {
  return (
    <div
      className='flex items-center dark:bg-[#1F1F1F]
      w-full p-6 bg-background z-50'
    >
      <Logo />

      <div
        className='md:ml-auto w-full md:justify-end justify-between
        flex items-center gap-x-2
        text-muted-foreground'
      >
        <Button variant='ghost'>Privacy Policy</Button>
        <Button variant='ghost'>Terms & Conditions</Button>
      </div>
    </div>
  );
};
