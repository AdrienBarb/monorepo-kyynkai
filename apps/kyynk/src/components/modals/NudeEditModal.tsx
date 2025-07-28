'use client';

import React, { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/Dialog';
import EditNudeForm from '@/components/nudes/EditNudeForm';
import { NudeWithPermissions } from '@/types/nudes';

interface Props {
  setOpen: (open: boolean) => void;
  open: boolean;
  nude: NudeWithPermissions;
}

const NudeEditModal: FC<Props> = ({ setOpen, open, nude }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-y-scroll">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle>Edit a nude</DialogTitle>
          <DialogDescription>Here you can edit a nude.</DialogDescription>
        </DialogHeader>

        <EditNudeForm nude={nude} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default NudeEditModal;
