import Image from 'next/image';
import { Heading } from './_components/heading';
import { Heroes } from './_components/heroes';
import { Footer } from './_components/footer';

const MarketingPage = () => {
  return (
    <div className='min-h-full dark:bg-[#1F1F1F] flex flex-col'>
      <div
        className='flex flex-col flex-1 items-center justify-center
        md:justify-start text-center gap-y-8 px-6 pb-10'
      >
        <Heading />
        <Heroes />
      </div>

      <Footer />
    </div>
  );
};

export default MarketingPage;
