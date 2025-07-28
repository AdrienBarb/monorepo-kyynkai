'use client';

import React, { useRef, useState } from 'react';
import Title from '@/components/ui/Title';
import { Pencil, Upload } from 'lucide-react';
import Image from 'next/image';
import imgixLoader from '@/lib/imgix/loader';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';
import { useTranslations } from 'next-intl';

interface ProfilePictureStepProps {
  profileImageId?: string;
  onProfilePictureUpdate: (profileImageId: string) => void;
}

const ProfilePictureStep: React.FC<ProfilePictureStepProps> = ({
  profileImageId,
  onProfilePictureUpdate,
}) => {
  const t = useTranslations();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    setIsUploading(true);

    try {
      const response = await axios.post('/api/medias/signed-url', {
        fileType: file.type,
        folder: 'medias',
      });

      const { signedUrl, fileKey } = response.data;

      await axios.put(signedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      onProfilePictureUpdate(fileKey);
      toast.success(t('profilePictureUploadSuccess'));
    } catch (err) {
      console.error('Error uploading file:', err);
      toast.error(t('profilePictureUploadError'));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Title Tag="h2" className="mb-4 text-custom-black font-semibold">
          {t('profilePictureStepTitle')}
        </Title>
        <p className="text-custom-black font-medium">
          {t('profilePictureStepDescription')}
        </p>
      </div>

      <div className="flex justify-center">
        <div className="relative">
          <div className="relative w-40 h-40 rounded-full overflow-hidden cursor-pointer group border-4 border-custom-black/30">
            {profileImageId ? (
              <Image
                src={imgixLoader({
                  src: profileImageId,
                  width: 160,
                  quality: 80,
                })}
                alt="Profile"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className="w-full h-full bg-background/10 flex items-center justify-center">
                <Upload className="w-12 h-12 text-custom-black/60" />
              </div>
            )}

            <div
              className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => fileInputRef.current?.click()}
            >
              <Pencil className="text-secondary" size={24} />
            </div>

            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Loader size={32} style={{ color: 'white' }} />
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            onChange={handleFileUpload}
            type="file"
            className="hidden"
            accept="image/png, image/jpeg"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureStep;
