'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ImageIcon, X } from 'lucide-react';
import { useCoverImage } from '@/hooks/useCoverImage';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';
import { useEdgeStore } from '@/lib/edgestore';
import { Skeleton } from '@/components/ui/skeleton';

interface CoverProps {
  url?: string;
  preview?: boolean;
}

export const Cover = (props: CoverProps) => {
  const { preview, url } = props;

  const { documentId } = useParams<{ documentId: Id<'documents'> }>();

  const { edgestore } = useEdgeStore();

  const coverImage = useCoverImage();

  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemove = () => {
    if (url) {
      edgestore.publicFiles.delete({ url });
    }

    removeCoverImage({ id: documentId });
  };

  return (
    <div
      className={cn(
        'relative w-full h-[350px] group',
        !url && 'h-[12vh]',
        url && 'bg-muted',
      )}
    >
      {!!url && (
        <>
          <Image className="object-cover" fill src={url} alt="Cover image" />
        </>
      )}

      {url && !preview && (
        <div
          className="opacity-0 group-hover:opacity-100 transition
            absolute flex items-center right-0 bottom-0 p-3 gap-x-2"
        >
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-1" />
            Change cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = () => {
  return <Skeleton className="w-full h-[12vh]" />;
};
