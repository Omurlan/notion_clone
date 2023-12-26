'use client';

import { Id } from '@/convex/_generated/dataModel';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/modals/confirm-modal';

interface BannerProps {
  documentId: Id<'documents'>;
}

export const Banner = (props: BannerProps) => {
  const { documentId } = props;
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId }).then(() => {
      console.log('REMOVE');
    });

    toast.promise(promise, {
      loading: 'Deleting the note',
      success: 'Note deleted',
      error: 'Failed to delete note',
    });

    router.push('/documents');
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: 'Restoring the note',
      success: 'Note restored',
      error: 'Failed to restore note',
    });
  };

  return (
    <div
      className="w-full bg-rose-500 text-center text-sm p-2
      flex items-center gap-x-2 justify-center"
    >
      <p className="text-white">This page is in the trash</p>

      <Button
        variant="outline"
        className="border-white bg-transparent
        hover:bg-primary/5 text-white hover:text-white
        p-1 px-2 h-auto font-normal"
        size="sm"
        onClick={onRestore}
      >
        Restore page
      </Button>

      <ConfirmModal onConfirm={onRemove}>
        <Button
          variant="outline"
          className="border-white bg-transparent
          hover:bg-primary/5 text-white hover:text-white
          p-1 px-2 h-auto font-normal"
          size="sm"
        >
          Remove page
        </Button>
      </ConfirmModal>
    </div>
  );
};
