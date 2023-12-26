'use client';

import { CoverImageModal } from '@/components/modals/cover-image';
import { SettingsModal } from '@/components/modals/settings-modal';

export const ModalProvider = () => {
  return (
    <>
      <CoverImageModal />
      <SettingsModal />
    </>
  );
};
