'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Error = () => {
  return (
    <div
      className="h-full flex flex-col items-center
      justify-center space-y-4"
    >
      <Image
        className="dark:hidden"
        height={300}
        width={300}
        src="/error.png"
        alt="Error"
      />

      <Image
        className="hidden dark:block"
        height={300}
        width={300}
        src="/error-dark.png"
        alt="Error"
      />

      <h2 className="text-xl font-medium">Something went wrong</h2>

      <Button asChild>
        <Link href="/documents">Go back</Link>
      </Button>
    </div>
  );
};

export default Error;
