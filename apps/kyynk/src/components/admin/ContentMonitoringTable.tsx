'use client';

import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Play, Eye, Check, X, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Textarea } from '@/components/ui/TextArea';
import { Label } from '@/components/ui/Label';
import ApiVideoPlayer from '@api.video/react-player';
import imgixLoader from '@/lib/imgix/loader';
import Image from 'next/image';
import useApi from '@/hooks/requests/useApi';
import { apiRouter } from '@/constants/apiRouter';
import toast from 'react-hot-toast';

interface NudeWithModeration {
  id: string;
  description?: string;
  createdAt: string;
  moderationStatus: 'pending' | 'approved' | 'rejected';
  moderatedBy?: string;
  moderatedAt?: string;
  moderationReason?: string;
  user: {
    id: string;
    pseudo: string;
    profileImageId?: string;
    slug: string;
  };
  media: {
    id: string;
    thumbnailId?: string;
    videoId?: string;
  };
}

interface ContentMonitoringTableProps {
  nudes: NudeWithModeration[];
  isLoading: boolean;
  onModerationComplete: () => void;
  pagination: {
    total: number;
    totalPages: number;
    page: number;
    limit: number;
  };
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const ContentMonitoringTable: React.FC<ContentMonitoringTableProps> = ({
  nudes,
  isLoading,
  onModerationComplete,
  pagination,
  currentPage,
  onPageChange,
}) => {
  const { usePut } = useApi();
  const [selectedNude, setSelectedNude] = useState<NudeWithModeration | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const { mutate: moderateContent, isPending: isModerating } = usePut(
    selectedNude ? apiRouter.moderateContent(selectedNude.id) : '',
    {
      onSuccess: () => {
        toast.success('Content moderated successfully');
        onModerationComplete();
        setIsModalOpen(false);
        setIsRejectModalOpen(false);
        setSelectedNude(null);
        setRejectReason('');
      },
      onError: (error: any) => {
        toast.error('Failed to moderate content');
        console.error('Moderation error:', error);
      },
    },
  );

  const handleApprove = (nude: NudeWithModeration) => {
    setSelectedNude(nude);
    moderateContent({ status: 'approved' });
  };

  const handleReject = (nude: NudeWithModeration) => {
    setSelectedNude(nude);
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = () => {
    if (selectedNude) {
      moderateContent({
        status: 'rejected',
        reason: rejectReason || 'Content violates community guidelines',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending Review</Badge>;
      case 'approved':
        return <Badge variant="default">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getModerationInfo = (nude: NudeWithModeration) => {
    if (nude.moderationStatus === 'pending') return null;

    return (
      <div className="text-xs text-muted-foreground">
        {nude.moderationStatus === 'approved' ? 'Approved' : 'Rejected'}
        {nude.moderatedAt &&
          ` on ${formatDistanceToNow(new Date(nude.moderatedAt))} ago`}
        {nude.moderationReason && (
          <div className="mt-1">
            <strong>Reason:</strong> {nude.moderationReason}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (nudes.length === 0) {
    return (
      <div className="text-center py-8">
        <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No content found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          No content matches the current filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {nudes.map((nude) => (
          <div key={nude.id} className="border rounded-lg p-4">
            <div className="flex items-start space-x-4">
              {/* Thumbnail */}
              <div className="relative w-24 h-32 flex-shrink-0">
                {nude.media.thumbnailId ? (
                  <Image
                    src={imgixLoader({
                      src: nude.media.thumbnailId,
                      width: 96,
                      quality: 80,
                    })}
                    alt="Content thumbnail"
                    fill
                    className="object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                    <Eye className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Content Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {nude.description || 'No description'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      by {nude.user.pseudo} •{' '}
                      {formatDistanceToNow(new Date(nude.createdAt))} ago
                    </p>
                    {getModerationInfo(nude)}
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {getStatusBadge(nude.moderationStatus)}
                  </div>
                </div>

                {/* Action Buttons */}
                {nude.moderationStatus === 'pending' && (
                  <div className="flex items-center space-x-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedNude(nude);
                        setIsModalOpen(true);
                      }}
                      className="flex items-center space-x-1"
                    >
                      <Play className="h-4 w-4" />
                      <span>Preview</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleApprove(nude)}
                      disabled={isModerating}
                      className="flex items-center space-x-1"
                    >
                      <Check className="h-4 w-4" />
                      <span>Approve</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(nude)}
                      disabled={isModerating}
                      className="flex items-center space-x-1"
                    >
                      <X className="h-4 w-4" />
                      <span>Reject</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing page {currentPage} of {pagination.totalPages} (
            {pagination.total} total items)
          </div>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Content Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedNude && (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Creator:</span>
                  <span className="text-sm">{selectedNude.user.pseudo}</span>
                </div>
                {selectedNude.description && (
                  <div>
                    <span className="text-sm font-medium">Description:</span>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedNude.description}
                    </p>
                  </div>
                )}
                {selectedNude.media.videoId ? (
                  <div className="rounded-md overflow-hidden">
                    <ApiVideoPlayer
                      video={{ id: selectedNude.media.videoId }}
                      style={{ height: '400px', width: '100%' }}
                      hideTitle={true}
                      controls={['play', 'progressBar', 'volume', 'fullscreen']}
                    />
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No video available for preview
                  </div>
                )}
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="default"
                    onClick={() => handleApprove(selectedNude)}
                    disabled={isModerating}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsRejectModalOpen(true);
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Reject Reason Modal */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Content</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reject-reason">
                Reason for rejection (optional)
              </Label>
              <Textarea
                id="reject-reason"
                placeholder="Explain why this content is being rejected..."
                value={rejectReason}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setRejectReason(e.target.value)
                }
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsRejectModalOpen(false);
                  setRejectReason('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmReject}
                disabled={isModerating}
              >
                Reject Content
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
