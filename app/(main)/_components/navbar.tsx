'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';
import { MenuIcon } from 'lucide-react';
import { Title } from './title';

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export const Navbar = (props: NavbarProps) => {
  const { isCollapsed, onResetWidth } = props;

  const { documentId } = useParams<{ documentId: Id<'documents'> }>();

  const document = useQuery(api.documents.getById, { documentId });

  if (document === undefined) {
    return (
      <nav
        className="bg-background dark:bg-[#1F1F1F] px-3 py-2
        w-full flex items-center"
      >
        <Title.Skeleton />
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav
        className="bg-background dark:bg-[#1F1F1F] px-3 py-2
        w-full flex items-center gap-x-4"
      >
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="w-6 h-6 text-muted-foreground"
          />
        )}

        <div className="flex items-cetner justify-center">
          <Title initialData={document} />
        </div>
      </nav>
    </>
  );
};
