'use client';

import React, { useState, useMemo, FC } from 'react';
import Dropzone from 'react-dropzone';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import useApi from '@/hooks/requests/useApi';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/users/useUser';
import Title from './ui/Title';
import Text from './ui/Text';
import { Separator } from './ui/Separator';
import { Button } from './ui/Button';
import { appRouter } from '@/constants/appRouter';
import axios from 'axios';
import { Card } from './ui/Card';
import { useTranslations } from 'next-intl';

interface Props {}

const IdentityVerificationForm: FC<Props> = () => {
  const router = useRouter();
  const t = useTranslations();
  const [frontIdentity, setFrontIdentity] = useState<null | File>(null);
  const [backIdentity, setBackIdentity] = useState<null | File>(null);
  const [frontAndFaceIdentity, setFrontAndFaceIdentity] = useState<null | File>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const { user, refetch } = useUser();

  const { usePost } = useApi();

  const { mutate: identityVerification, isPending } = usePost(
    `/api/me/identity`,
    {
      onSuccess: () => {
        refetch();
        router.push(appRouter.becomeCreator);
      },
    },
  );

  const onDropIdentityFront = (acceptedFiles: any) => {
    setFrontIdentity(acceptedFiles[0]);
  };
  const onDropIdentityBack = (acceptedFiles: any) => {
    setBackIdentity(acceptedFiles[0]);
  };
  const onDropIdentityFrontAndFace = (acceptedFiles: any) => {
    setFrontAndFaceIdentity(acceptedFiles[0]);
  };

  const handleFileUpload = async (file: File, folder: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/medias/signed-url', {
        fileType: file.type,
        folder,
      });

      const { signedUrl, fileKey } = response.data;

      await axios.put(signedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      setIsLoading(false);
      return fileKey;
    } catch (err) {
      console.error('Error uploading file:', err);
      toast.error(t('identitySomethingWentWrong'));
      setIsLoading(false);
    }
  };

  const handleSubmitForm = async () => {
    if (!frontIdentity || !backIdentity || !frontAndFaceIdentity) {
      toast.error(t('identityMissingPictures'));
      return;
    }

    const frontIdentityKey = await handleFileUpload(frontIdentity, 'identity');
    const backIdentityKey = await handleFileUpload(backIdentity, 'identity');
    const frontAndFaceIdentityKey = await handleFileUpload(
      frontAndFaceIdentity,
      'identity',
    );

    if (!frontIdentityKey || !backIdentityKey || !frontAndFaceIdentityKey) {
      toast.error(t('identityFailedUpload'));
      return;
    }

    identityVerification({
      frontIdentity: frontIdentityKey,
      backIdentity: backIdentityKey,
      frontAndFaceIdentity: frontAndFaceIdentityKey,
    });
  };

  const baseStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    width: '100%',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'black',
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer',
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
    }),
    [],
  );

  const StatusCard = ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }) => (
    <div className="status">
      <Title Tag="h3" className="text-center mb-4">
        {title}
      </Title>
      {description && <Text className="text-center mb-8">{description}</Text>}
    </div>
  );

  return (
    <Card className="max-w-screen-sm mx-auto">
      {user?.identityVerificationStatus === 'unverified' && (
        <StatusCard
          title={t('identityNotVerified')}
          description={t('identityNotVerifiedDescription')}
        />
      )}
      {user?.identityVerificationStatus === 'rejected' && (
        <StatusCard
          title={t('identityRejected')}
          description={t('identityRejectedDescription')}
        />
      )}
      {user?.identityVerificationStatus === 'pending' && (
        <StatusCard
          title={t('identityBeingVerified')}
          description={t('identityBeingVerifiedDescription')}
        />
      )}
      {user?.identityVerificationStatus === 'verified' && (
        <StatusCard title={t('identityVerified')} />
      )}

      {(user?.identityVerificationStatus === 'unverified' ||
        user?.identityVerificationStatus === 'rejected') && (
        <>
          <div className="dropzone-container flex flex-col space-y-4">
            <div className="dropzone-wrapper relative">
              {frontIdentity ? (
                <div
                  className="preview-wrapper bg-cover bg-center absolute w-full h-full"
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(
                      frontIdentity,
                    )})`,
                  }}
                >
                  <div
                    className="delete-icon absolute top-0 right-0 p-2 cursor-pointer"
                    onClick={() => setFrontIdentity(null)}
                  >
                    <CloseIcon sx={{ color: 'black' }} />
                  </div>
                </div>
              ) : (
                ''
              )}
              <Dropzone
                onDrop={onDropIdentityFront}
                multiple={false}
                accept={{
                  'image/png': ['.png', '.jpg', '.jpeg'],
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />

                    <div className="dropzone-details text-center">
                      <h4>{t('identityFrontTitle')}</h4>
                      <p>
                        <span className="file-link underline cursor-pointer">
                          {t('browse')}
                        </span>{' '}
                        or{' '}
                        <span className="file-link underline cursor-pointer">
                          {t('drop')}
                        </span>{' '}
                        {t('aFileHere')}
                      </p>
                      <Image
                        alt="Image description front of ID"
                        src="/images/front-id.png"
                        width={300}
                        height={200}
                      />
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>
            <div className="dropzone-wrapper relative">
              {backIdentity ? (
                <div
                  className="preview-wrapper bg-cover bg-center absolute w-full h-full"
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(
                      backIdentity,
                    )})`,
                  }}
                >
                  <div
                    className="delete-icon absolute top-0 right-0 p-2 cursor-pointer"
                    onClick={() => setBackIdentity(null)}
                  >
                    <CloseIcon sx={{ color: 'black' }} />
                  </div>
                </div>
              ) : (
                ''
              )}
              <Dropzone
                onDrop={onDropIdentityBack}
                multiple={false}
                accept={{
                  'image/png': ['.png', '.jpg', '.jpeg'],
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />

                    <div className="dropzone-details text-center">
                      <h4>{t('identityBackTitle')}</h4>
                      <p>
                        <span className="file-link underline cursor-pointer">
                          {t('browse')}
                        </span>{' '}
                        or{' '}
                        <span className="file-link underline cursor-pointer">
                          {t('drop')}
                        </span>{' '}
                        {t('aFileHere')}
                      </p>
                      <Image
                        alt="Image description back of ID"
                        src="/images/back-id.png"
                        width={300}
                        height={200}
                      />
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>
            <div className="dropzone-wrapper relative">
              {frontAndFaceIdentity ? (
                <div
                  className="preview-wrapper bg-cover bg-center absolute w-full h-full"
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(
                      frontAndFaceIdentity,
                    )})`,
                  }}
                >
                  <div
                    className="delete-icon absolute top-0 right-0 p-2 cursor-pointer"
                    onClick={() => setFrontAndFaceIdentity(null)}
                  >
                    <CloseIcon sx={{ color: 'black' }} />
                  </div>
                </div>
              ) : (
                ''
              )}
              <Dropzone
                onDrop={onDropIdentityFrontAndFace}
                multiple={false}
                accept={{
                  'image/png': ['.png', '.jpg', '.jpeg'],
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />

                    <div className="dropzone-details text-center">
                      <h4>{t('identityFaceAndIdTitle')}</h4>
                      <p>
                        <span className="file-link underline cursor-pointer">
                          {t('browse')}
                        </span>{' '}
                        or{' '}
                        <span className="file-link underline cursor-pointer">
                          {t('drop')}
                        </span>{' '}
                        {t('aFileHere')}
                      </p>
                      <Image
                        alt="Image description face and ID"
                        src="/images/face-and-id.png"
                        width={300}
                        height={200}
                      />
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>
          </div>

          <ul className="list-disc pl-5 mt-8">
            <li>{t('imageQualityTip1')}</li>
            <li>{t('imageQualityTip2')}</li>
            <li>{t('imageQualityTip3')}</li>
            <li>{t('imageQualityTip4')}</li>
          </ul>

          <Separator className="my-4" />

          <Text className="text-center">{t('documentsReviewNotice')}</Text>

          <Separator className="my-4" />

          <Button
            className="w-full"
            type="submit"
            isLoading={isPending || isLoading}
            disabled={isPending || isLoading}
            onClick={handleSubmitForm}
          >
            {t('validate')}
          </Button>
        </>
      )}
    </Card>
  );
};

export default IdentityVerificationForm;
