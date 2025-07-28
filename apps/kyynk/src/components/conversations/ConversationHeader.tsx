import { FC } from 'react';
import Link from 'next/link';
import { UserType } from '@prisma/client';
import Avatar from '../ui/Avatar';
import Text from '../ui/Text';
import { ConversationUser } from '@/types/users';

interface Props {
  otherUser: ConversationUser | null;
}

const ConversationHeader: FC<Props> = ({ otherUser }) => {
  if (!otherUser) return null;

  const headerContent = (
    <div className="flex items-center gap-2">
      <Avatar
        imageId={otherUser.profileImageId}
        pseudo={otherUser.pseudo}
        size={40}
      />
      <Text className="text-lg font-bold">{otherUser.pseudo}</Text>
    </div>
  );

  return (
    <div className="flex justify-between items-center mb-2 p-4">
      {otherUser.userType === UserType.creator ? (
        <Link href={`/${otherUser.slug}`}>{headerContent}</Link>
      ) : (
        headerContent
      )}
    </div>
  );
};

export default ConversationHeader;
