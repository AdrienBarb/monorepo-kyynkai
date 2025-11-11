'use client';

import { AiGirlfriendsTable } from '@/components/admin/AiGirlfriendsTable';
import useApi from '@/hooks/requests/useApi';
import axios from 'axios';

export default function AdminAiPage() {
  const { useGet } = useApi();

  const {
    data: aiGirlfriends = [],
    isLoading,
    error,
    refetch,
  } = useGet('/api/admin/ai-girlfriends');

  const deleteAIGirlfriend = async (id: string) => {
    try {
      await axios.delete(`/api/admin/ai-girlfriends/${id}`);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-lg">
          {error instanceof Error ? error.message : 'An error occurred'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Girlfriends Management
        </h1>
        <p className="text-gray-600">
          Manage your AI girlfriends and their settings
        </p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <AiGirlfriendsTable
            data={aiGirlfriends}
            deleteAIGirlfriend={deleteAIGirlfriend}
          />
        </div>
      </div>
    </div>
  );
}
