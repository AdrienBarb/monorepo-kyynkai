import React, { FC, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Ellipsis } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { Button } from '../ui/Button';
import Text from '../ui/Text';
import Link from 'next/link';
import Avatar from '../ui/Avatar';
import useApi from '@/hooks/requests/useApi';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import DeleteConfirmationModal from '../modals/ConfirmationModal';
import { NudeWithPermissions } from '@/types/nudes';
import { useTranslations } from 'next-intl';
import { useGlobalModalStore } from '@/stores/GlobalModalStore';

interface NudePostProps {
  nude: NudeWithPermissions;
}

const HeaderNudeModal: FC<NudePostProps> = ({ nude }) => {
  const { slug } = useParams<{ slug: string }>();
  const queryClient = useQueryClient();
  const { usePut } = useApi();
  const t = useTranslations();
  const { openModal, closeModal } = useGlobalModalStore();
  const { mutate: archiveNude } = usePut(`/api/nudes/${nude.id}/archive`, {
    onSuccess: () => {
      queryClient.setQueryData(
        ['get', { url: `/api/users/${slug}/nudes`, params: {} }],
        (oldData: any) => {
          return oldData
            ? oldData.filter((item: NudeWithPermissions) => item.id !== nude.id)
            : [];
        },
      );
    },
  });

  const handleConfirmDelete = async () => {
    await archiveNude({});
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Link href={`/${nude.user.slug}`}>
          <div className="flex items-center gap-2">
            <Avatar
              size={48}
              imageId={nude?.user?.profileImageId}
              pseudo={nude?.user?.pseudo}
            />
            <div className="flex flex-col">
              <span className="text-base font-bold font-karla leading-none">
                {nude?.user?.pseudo}
              </span>
              <span className="text-sm font-normal font-karla text-custom-black/50">
                {formatDistanceToNow(new Date(nude.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        </Link>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-md z-[1000]"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="text-base font-medium font-karla"
              >
                <Link href={`/contact-us`}>{t('report')}</Link>
              </DropdownMenuItem>
              {nude.permissions.canEdit && (
                <>
                  <DropdownMenuItem
                    className="text-base font-medium font-karla"
                    onClick={() => openModal('nudeEdit', { nude })}
                  >
                    {t('edit')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500 text-base font-medium"
                    onClick={() => {
                      closeModal();
                      openModal('confirmation', {
                        onDeleteConfirm: handleConfirmDelete,
                        text: t('deleteNudeConfirm'),
                      });
                    }}
                  >
                    {t('delete')}
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Text className="whitespace-pre-wrap">{nude.description}</Text>
    </>
  );
};

export default HeaderNudeModal;
