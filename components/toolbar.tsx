'use client';

import { Doc } from '@/convex/_generated/dataModel';
import { IconPicker } from './icon-picker';
import { Button } from '@/components/ui/button';
import { ImageIcon, Smile, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import TextareaAutosize from 'react-textarea-autosize';
import { remove } from '@/convex/documents';
import { useCoverImage } from '@/hooks/useCoverImage';

interface ToolbarProps {
  initialData: Doc<'documents'>;
  preview?: boolean;
}

export const Toolbar = (props: ToolbarProps) => {
  const { preview, initialData } = props;

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.icon);

  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    });
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || 'Untitled',
    });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
    });
  };

  const coverImage = useCoverImage();

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">{value}</p>
          </IconPicker>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full opacity-0 group-hover/icon:opacity-100
            transition text-muted-foreground text-xs"
            onClick={onRemoveIcon}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}

      <div
        className="opacity-0 group-hover:opacity-100 flex
        items-center gap-x-1 py-4"
      >
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              variant="outline"
              size="sm"
              className="text-muted-foreground text-xs"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}

        {!initialData.coverImg && !preview && (
          <Button
            className="text-muted-foreground text-xs"
            onClick={coverImage.onOpen}
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>

      {isEditing && !preview ? (
        <TextareaAutosize
          className="text-5xl bg-transparent font-bold
          break-words outline-none text-[#3F3F3F]
          dark:text-[#CFCFCF] resize-none"
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          onChange={(e) => onInput(e.target.value)}
        />
      ) : (
        <div
          className="pb-[11.5px] text-5xl font-bold
          break-words outline-none text-[#3F3F3F]
          dark:text-[#CFCFCF]"
          onClick={enableInput}
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
};
