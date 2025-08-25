'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
import { ArrowLeft } from 'lucide-react';

interface AiGirlfriendDetails {
  id: string;
  pseudo: string;
  slug: string;
  profileImageId: string;
  isActive: boolean;
  archetype: string | null;
  traits: string[];
  hook: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function EditAiGirlfriendPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [aiGirlfriend, setAiGirlfriend] = useState<AiGirlfriendDetails | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchAiGirlfriend();
    }
  }, [slug]);

  const fetchAiGirlfriend = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/ai-girlfriends/${slug}`);

      if (!response.ok) {
        throw new Error('Failed to fetch AI girlfriend');
      }

      const data = await response.json();
      setAiGirlfriend(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (isActive: boolean) => {
    if (!aiGirlfriend) return;

    try {
      setSaving(true);
      const response = await fetch(
        `/api/admin/ai-girlfriends/${aiGirlfriend.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isActive }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update AI girlfriend');
      }

      setAiGirlfriend((prev) => (prev ? { ...prev, isActive } : null));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error || !aiGirlfriend) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-lg">
          {error || 'AI girlfriend not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button
          variant="secondary"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Core details about the AI girlfriend
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <p className="text-gray-900">{aiGirlfriend.pseudo}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Slug</label>
              <p className="text-gray-900 font-mono">{aiGirlfriend.slug}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Archetype
              </label>
              <p className="text-gray-900">{aiGirlfriend.archetype || 'N/A'}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="flex items-center space-x-3 mt-2">
                <Checkbox
                  checked={aiGirlfriend.isActive}
                  onCheckedChange={(checked) =>
                    handleToggleActive(checked as boolean)
                  }
                  disabled={saving}
                />
                <Badge
                  variant={aiGirlfriend.isActive ? 'default' : 'secondary'}
                >
                  {aiGirlfriend.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traits & Characteristics</CardTitle>
            <CardDescription>Personality and behavior traits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Traits
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {aiGirlfriend.traits.length > 0 ? (
                  aiGirlfriend.traits.map((trait, index) => (
                    <Badge key={index} variant="outline">
                      {trait}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500">No traits defined</span>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Hook</label>
              <p className="text-gray-900 mt-2">
                {aiGirlfriend.hook || 'No hook defined'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>Technical details and metadata</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Created
                </label>
                <p className="text-gray-900">
                  {new Date(aiGirlfriend.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Last Updated
                </label>
                <p className="text-gray-900">
                  {new Date(aiGirlfriend.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
