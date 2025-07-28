'use client';

import React, { useState, FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ShareModal from '@/components/ShareModal';
import { useUser } from '@/hooks/users/useUser';
import { Ellipsis } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { appRouter } from '@/constants/appRouter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

interface Props {}

const UserProfileMenu: FC<Props> = () => {
  //router
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();

  const { user } = useUser();

  //localstate
  const [openShareModal, setOpenShareModal] = useState(false);

  const handleEditAccountDetailsClick = () => {
    router.push(appRouter.myProfile);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-md"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              {user?.slug === slug && (
                <DropdownMenuItem
                  className="text-base font-medium font-karla"
                  onClick={handleEditAccountDetailsClick}
                >
                  Edit Profile
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className="text-base font-medium font-karla"
                onClick={() => setOpenShareModal(true)}
              >
                Share
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ShareModal
        open={openShareModal}
        setOpen={setOpenShareModal}
        urlToShare={`${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`}
        title="Come discover this profile on KYYNK"
      />
    </>
  );
};

export default UserProfileMenu;
