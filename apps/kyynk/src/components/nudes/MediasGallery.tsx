'use client';

import React, { FC } from 'react';
import GalleryCard from './GalleryCard';
import useApi from '@/hooks/requests/useApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { VideoUploader } from '@api.video/video-uploader';
import toast from 'react-hot-toast';
import Text from '@/components/ui/Text';
import type { Media } from '@prisma/client';
import { NudeCreationStepsType } from '@/components/modals/NudeCreationModal';
import { useTranslations } from 'next-intl';

interface MediasGalleryProps {
  setStep: (e: NudeCreationStepsType) => void;
  setUploadProgress: (e: number | null) => void;
  setSelectedMedia: (media: Media | null) => void;
  selectedMedia: Media | null;
}

const MediasGallery: FC<MediasGalleryProps> = ({
  setStep,
  setUploadProgress,
  setSelectedMedia,
  selectedMedia,
}) => {
  const { fetchData, usePost, useGet } = useApi();
  const t = useTranslations();

  const { mutate: createMedia } = usePost('/api/medias', {
    onSuccess: () => {
      refetch();
    },
  });

  const { data: userMedias, refetch } = useGet(
    '/api/medias',
    {},
    {
      refetchOnWindowFocus: true,
      refetchInterval: 20000,
    },
  );

  const handleUpload = async (file: File) => {
    setStep('uploading');
    setUploadProgress(0);

    try {
      const { uploadToken, videoId } = await fetchData(
        '/api/medias/upload-token',
      );

      if (!uploadToken) throw new Error('Failed to retrieve upload token');

      const uploader = new VideoUploader({
        uploadToken,
        file,
        retries: 3,
        ...(videoId && { videoId }),
      });

      uploader.onProgress((event) => {
        const progress = Math.round(
          (event.uploadedBytes / event.totalBytes) * 100,
        );
        setUploadProgress(progress);
      });

      const uploadResult = await uploader.upload();

      createMedia({
        videoId: uploadResult.videoId,
      });

      setStep('gallery');
    } catch (error) {
      console.error('Upload error:', error);
      setStep('gallery');
      toast.error(t('uploadError'));
    }
  };

  return (
    <div className="overflow-y-auto h-full w-full">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div
          className="aspect-square relative rounded-lg overflow-hidden cursor-pointer items-center justify-center bg-primary text-secondary flex flex-col gap-2 p-2 text-center"
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'video/*';
            input.onchange = (event) => {
              const target = event.target as HTMLInputElement;
              const file = target.files ? target.files[0] : null;
              if (file) {
                handleUpload(file);
              }
            };
            input.click();
          }}
        >
          <FontAwesomeIcon icon={faPlus} size="lg" />
          <Text className="text-secondary">{t('uploadNewVideo')}</Text>
        </div>

        {userMedias?.map((currentMedia: Media) => {
          return (
            <div key={currentMedia.id} className="aspect-square">
              <GalleryCard
                media={currentMedia}
                refetch={refetch}
                setSelectedMedia={setSelectedMedia}
                selectedMedia={selectedMedia}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MediasGallery;
