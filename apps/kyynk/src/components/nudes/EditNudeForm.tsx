'use client';

import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams } from 'next/navigation';
import Select from 'react-select';
import { TagsType, tagList } from '@/constants/constants';
import { getCreditsWithFiat } from '@/utils/prices/getMediaPrice';
import useApi from '@/hooks/requests/useApi';
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
import { nudeSchema } from '@/schemas/nudeSchema';
import CustomSlider from '../CustomSlider';
import { useQueryClient } from '@tanstack/react-query';
import { NudeWithPermissions } from '@/types/nudes';
import { formatFiat } from '@/utils/prices/formatFiat';
import { useTranslations } from 'next-intl';

interface Props {
  nude?: NudeWithPermissions;
  setOpen: (open: boolean) => void;
}

const EditNudeForm: FC<Props> = ({ nude, setOpen }) => {
  const { usePut } = useApi();
  const queryClient = useQueryClient();
  const { slug } = useParams<{ slug: string }>();
  const t = useTranslations();

  const { mutate: editNude, isPending: isEditLoading } = usePut(
    `/api/nudes/${nude?.id}`,
    {
      onSuccess: (newNude: NudeWithPermissions) => {
        queryClient.setQueryData(
          ['get', { url: `/api/users/${slug}/nudes`, params: {} }],
          (oldData: any) => {
            return oldData
              ? oldData.map((item: NudeWithPermissions) =>
                  item.id === newNude.id ? newNude : item,
                )
              : [newNude];
          },
        );

        setOpen(false);
      },
    },
  );

  const form = useForm<z.infer<typeof nudeSchema>>({
    resolver: zodResolver(nudeSchema),
    defaultValues: {
      description: nude?.description || '',
      price: nude?.fiatPrice ? formatFiat(nude?.fiatPrice) : 0,
      tags: nude?.tags.map((tag) => ({ value: tag, label: tag })) || [],
    },
  });

  const { handleSubmit, setValue } = form;

  const { creditPrice } = getCreditsWithFiat(form.watch('price') || 0);

  const onSubmit = handleSubmit((values) => {
    const payload = {
      description: values.description,
      price: values.price * 100,
      tags: values.tags,
    };

    editNude(payload);
  });

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="space-y-8 flex flex-col items-center w-full"
      >
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
          isLoading={isEditLoading}
          disabled={isEditLoading}
          className="w-full"
        >
          {t('editNude')}
        </Button>
      </form>
    </Form>
  );
};

export default EditNudeForm;
