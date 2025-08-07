'use client';

import { ArrowRight } from 'lucide-react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Textarea } from '@/components/ui/TextArea';
import { cn } from '@/utils/tailwind/cn';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight?: number;
}

interface ConversationInputProps {
  isDisabled?: boolean;
  onSendMessage: ({ message }: { message: string }) => void;
  isCreationMessageLoading?: boolean;
}

function useAutoResizeTextarea({
  minHeight,
  maxHeight,
}: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`;

      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY),
      );

      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight],
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);

  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

const ConversationInput: React.FC<ConversationInputProps> = ({
  isDisabled = false,
  onSendMessage,
  isCreationMessageLoading,
}) => {
  const [value, setValue] = useState('');
  const t = useTranslations();
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 72,
    maxHeight: 300,
  });

  const handleSendMessage = () => {
    if (!value.trim() || isDisabled) return;
    setValue('');
    adjustHeight(true);
    onSendMessage({ message: value });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div
        className={cn(
          'max-w-xl w-full mx-auto',
          isDisabled && 'opacity-60 cursor-not-allowed',
        )}
      >
        <div className="relative border border-custom-black/20 rounded-xl">
          <div className="relative flex flex-col">
            <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
              <Textarea
                value={value}
                placeholder={t('typeYourMessage')}
                className={cn(
                  'w-full rounded-xl rounded-b-none px-4 py-3 border-none placeholder:text-black/70 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base',
                  isDisabled && 'cursor-not-allowed bg-zinc-100/50',
                )}
                ref={textareaRef}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  if (!isDisabled) {
                    setValue(e.target.value);
                    adjustHeight();
                  }
                }}
                disabled={isDisabled}
              />
            </div>

            <div className="h-14 rounded-b-xl flex items-center">
              <div className="absolute left-3 right-3 bottom-3 flex items-center justify-between w-[calc(100%-24px)]">
                <div className="flex items-center gap-2"></div>
                <Button
                  aria-label="Send message"
                  variant="default"
                  size="icon"
                  disabled={
                    !value.trim() || isDisabled || isCreationMessageLoading
                  }
                  isLoading={isCreationMessageLoading}
                  onClick={handleSendMessage}
                >
                  <ArrowRight className={cn('w-4 h-4 text-secondary')} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationInput;
