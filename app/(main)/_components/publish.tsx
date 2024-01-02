'use client';

import { Doc } from '@/convex/_generated/dataModel';
import { useOrigin } from '@/hooks/useOrigin';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Check, Copy, Globe } from 'lucide-react';

interface PublishProps {
  initialData: Doc<'documents'>;
}

export const Publish = (props: PublishProps) => {
  const { initialData } = props;

  const origin = useOrigin();
  const update = useMutation(api.documents.update);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const publishUrl = `${origin}/preview/${initialData._id}`;

  const onUnpublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => {
      setIsSubmitting(false);
    });

    toast.promise(promise, {
      loading: 'Unpublishing',
      success: 'Note has been unpublished',
      error: 'Failed to unpublish  note',
    });
  };

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => {
      setIsSubmitting(false);
    });

    toast.promise(promise, {
      loading: 'Publishing',
      success: 'Note has been published',
      error: 'Failed to publish note',
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(publishUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button size="sm" variant="ghost">
          Publish
          {initialData.isPublished && (
            <Globe className="text-sky-500 w-4 h-4 ml-2" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-3">
            <div className="flex gap-x-2">
              <Globe className="text-sky-500 animate-pulse h-4 w-4" />

              <p className="text-xs font-medium text-sky-500">
                This note is live on web
              </p>
            </div>

            <div className="flex items-center">
              <input
                value={publishUrl}
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                disabled
              />

              <Button
                className="h-8 rounded-l-none"
                onClick={onCopy}
                disabled={copied}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <Button
              onClick={onUnpublish}
              className="w-full text-xs"
              disabled={isSubmitting}
              size="sm"
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish this note</p>

            <span className="text-xs text-muted-foreground mb-4">
              Share your works with others
            </span>

            <Button
              className="w-full text-xs"
              size="sm"
              disabled={isSubmitting}
              onClick={onPublish}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
