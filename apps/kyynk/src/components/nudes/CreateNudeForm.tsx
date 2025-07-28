'use client';

import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { TagsType, tagList } from '@/constants/constants';
import { getCreditsWithFiat } from '@/utils/prices/getMediaPrice';
import useApi from '@/hooks/requests/useApi';
import { useTranslations } from 'next-intl';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSubLabel,
} from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/TextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Text from '@/components/ui/Text';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { Pencil } from 'lucide-react';
import type { Media } from '@prisma/client';
import { nudeSchema } from '@/schemas/nudeSchema';
import CustomSlider from '../CustomSlider';
import imgixLoader from '@/lib/imgix/loader';
import { NudeWithPermissions } from '@/types/nudes';
import { useUser } from '@/hooks/users/useUser';
import { useQueryClient } from '@tanstack/react-query';
import { NudeCreationStepsType } from '@/components/modals/NudeCreationModal';

interface Props {
  setStep: (step: NudeCreationStepsType) => void;
  selectedMedia: Media | null;
  setCreatedNude: (nude: NudeWithPermissions) => void;
}

const CreateNudeForm: FC<Props> = ({
  setStep,
  selectedMedia,
  setCreatedNude,
}) => {
  const { usePost } = useApi();
  const { user } = useUser();
  const t = useTranslations();

  const queryClient = useQueryClient();

  const { mutate: createNude, isPending } = usePost(`/api/nudes`, {
    onSuccess: (createdNude: NudeWithPermissions) => {
      setCreatedNude(createdNude);
      setStep('success');
      queryClient.invalidateQueries({
        queryKey: [
          'get',
          { url: `/api/users/${user?.slug}/nudes`, params: {} },
        ],
      });
    },
  });

  const form = useForm<z.infer<typeof nudeSchema>>({
    resolver: zodResolver(nudeSchema),
    defaultValues: {
      description: '',
      price: 0,
      tags: [],
    },
  });

  const { handleSubmit, setValue } = form;

  const { creditPrice } = getCreditsWithFiat(form.watch('price') || 0);

  const onSubmit = handleSubmit((values) => {
    if (!selectedMedia) {
      toast.error('You forgot to upload a video');
      return;
    }

    const payload = {
      ...(selectedMedia && { mediaId: selectedMedia.id }),
      description: values.description,
      price: values.price * 100,
      tags: values.tags,
    };

    createNude(payload);
  });

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="space-y-8 flex flex-col items-center w-full"
      >
        <FormItem className="w-full">
          <FormLabel>{t('video')}*</FormLabel>
          {selectedMedia && selectedMedia.thumbnailId ? (
            <div className="aspect-[4/5] relative rounded-md overflow-hidden">
              <Button
                size="icon"
                onClick={() => setStep('gallery')}
                className="absolute top-2 right-2 z-10"
              >
                <Pencil color="white" strokeWidth={3} />
              </Button>
              <Image
                src={imgixLoader({
                  src: selectedMedia.thumbnailId,
                  width: 300,
                  quality: 80,
                })}
                alt={`media`}
                layout="fill"
                objectFit="cover"
                quality={80}
                priority
                className="object-cover object-center"
              />
            </div>
          ) : (
            <div
              className="rounded-md border-dashed border border-black mt-2 cursor-pointer aspect-[4/5] flex items-center justify-center text-center flex-col gap-2"
              onClick={() => setStep('gallery')}
            >
              <FontAwesomeIcon icon={faPlus} size="lg" />
              <Text className="text-custom-black">{t('addVideo')}</Text>
            </div>
          )}
        </FormItem>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{t('description')}*</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} className="mt-2 text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{t('price')}</FormLabel>
              <FormSubLabel>
                {t('credits')}: {creditPrice}
              </FormSubLabel>
              <FormControl>
                <div className="mt-14 px-4">
                  <CustomSlider
                    setValue={(value: number) => setValue('price', value)}
                    fetchedPrice={field.value}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{t('tags')}</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  className="w-full pt-2"
                  onChange={(selectedOptions) =>
                    field.onChange(selectedOptions)
                  }
                  options={tagList.map((currentTag) => ({
                    value: currentTag,
                    label: t('nudeCategories.' + currentTag),
                  }))}
                  value={field.value}
                  classNamePrefix="react-select"
                  getOptionLabel={(el: TagsType) =>
                    t('nudeCategories.' + el.value)
                  }
                  getOptionValue={(el: TagsType) => el.value}
                  closeMenuOnSelect={false}
                  placeholder={t('selectTags')}
                  noOptionsMessage={() => <span>{t('noOptions')}</span>}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                      outline: 'none',
                      border: '1px solid black',
                      ':hover': {
                        border: '1px solid black',
                      },
                    }),
                    option: (
                      styles,
                      { data, isDisabled, isFocused, isSelected },
                    ) => ({
                      ...styles,
                      backgroundColor: isDisabled
                        ? undefined
                        : isSelected
                        ? '#d9d7f6'
                        : isFocused
                        ? '#d9d7f6'
                        : undefined,
                    }),
                    menuList: (styles) => ({
                      ...styles,
                      backgroundColor: '#fff0eb',
                      borderRadius: '6px',
                    }),
                    multiValue: (styles) => ({
                      ...styles,
                      backgroundColor: '#cecaff',
                    }),
                    multiValueLabel: (styles) => ({
                      ...styles,
                      color: 'white',
                    }),
                    multiValueRemove: (styles) => ({
                      ...styles,
                      color: 'white',
                    }),
                    noOptionsMessage: (styles) => ({
                      ...styles,
                      color: 'black',
                    }),
                    placeholder: (styles) => ({
                      ...styles,
                      color: 'rgba(0, 0, 0, 0.3)',
                    }),
                  }}
                  isMulti
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          isLoading={isPending}
          disabled={isPending}
          className="w-full"
        >
          {t('createNude')}
        </Button>
      </form>
    </Form>
  );
};

export default CreateNudeForm;
