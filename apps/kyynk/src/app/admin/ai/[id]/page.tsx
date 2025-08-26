'use client';

import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import useApi from '@/hooks/requests/useApi';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/TextArea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { TRAITS } from '@/constants/ai-girlfriends/traits';
import { toast } from 'react-hot-toast';
import {
  AiGirlfriendFormData,
  aiGirlfriendSchema,
} from '@/schemas/ai-girlfriends/aiGirlfriendSchema';
import { AI_GIRLFRIEND_ARCHETYPES } from '@/constants/ai-girlfriends/archetypes';

export default function EditAiGirlfriendPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { useGet, usePut } = useApi();

  const {
    data: aiGirlfriend,
    isLoading,
    refetch,
    error,
  } = useGet(`/api/admin/ai-girlfriends/${id}`);

  const { mutate: updateAiGirlfriend, isPending: isSaving } = usePut(
    `/api/admin/ai-girlfriends/${id}`,
    {
      onSuccess: () => {
        toast.success('AI girlfriend updated successfully');
        refetch();
      },
    },
  );

  const form = useForm<AiGirlfriendFormData>({
    resolver: zodResolver(aiGirlfriendSchema),
    defaultValues: {
      pseudo: '',
      archetype: '',
      isActive: false,
      traits: [],
      hook: '',
    },
  });

  console.log('🚀 ~ form:', form.getValues());

  useEffect(() => {
    console.log('🚀 ~ EditAiGirlfriendPage ~ aiGirlfriend:', aiGirlfriend);
    if (aiGirlfriend) {
      form.reset({
        ...form.getValues(),
        pseudo: aiGirlfriend.pseudo,
        archetype: aiGirlfriend.archetype || 'none',
        isActive: aiGirlfriend.isActive,
        traits: aiGirlfriend.traits,
        hook: aiGirlfriend.hook || '',
      });
    }
  }, [aiGirlfriend, form]);

  const onSubmit = (data: AiGirlfriendFormData) => {
    if (!aiGirlfriend) return;

    const submissionData = {
      ...data,
      archetype: data.archetype === 'none' ? null : data.archetype,
    };

    updateAiGirlfriend(submissionData);
  };

  const handleTraitToggle = (trait: string) => {
    const currentTraits = form.getValues('traits');
    const newTraits = currentTraits.includes(trait)
      ? currentTraits.filter((t) => t !== trait)
      : [...currentTraits, trait];
    form.setValue('traits', newTraits);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !aiGirlfriend) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-lg">
          {error instanceof Error ? error.message : 'AI girlfriend not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button
          variant="link"
          onClick={() => router.push('/admin/ai')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to AI Girlfriends
        </Button>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Edit {aiGirlfriend.pseudo}
        </h1>
        <p className="text-gray-600">
          Manage AI girlfriend settings and preferences
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Core details about the AI girlfriend
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="pseudo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="archetype"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Archetype</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an archetype" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {AI_GIRLFRIEND_ARCHETYPES.map((archetype) => (
                            <SelectItem key={archetype} value={archetype}>
                              {archetype}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Active Status</FormLabel>
                        <FormDescription>
                          Enable or disable this AI girlfriend
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traits & Characteristics</CardTitle>
                <CardDescription>
                  Personality and behavior traits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="traits"
                  render={() => (
                    <FormItem>
                      <FormLabel>Traits</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {TRAITS.map((trait) => (
                          <div
                            key={trait}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={trait}
                              checked={form.watch('traits').includes(trait)}
                              onCheckedChange={() => handleTraitToggle(trait)}
                            />
                            <label
                              htmlFor={trait}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                            >
                              {trait}
                            </label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hook</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter a compelling hook or introduction..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A brief description that captures the AI
                        girlfriend&apos;s essence
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* System Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>Technical details and metadata</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormLabel>Created</FormLabel>
                  <p className="text-gray-900">
                    {new Date(aiGirlfriend.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <FormLabel>Last Updated</FormLabel>
                  <p className="text-gray-900">
                    {new Date(aiGirlfriend.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
