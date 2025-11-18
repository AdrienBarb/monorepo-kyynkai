'use client';

import React from 'react';

interface Props {
  tags: string[];
  selectedTag?: string | null;
  onSelectTag?: (tag: string | null) => void;
}

const FantasyTags: React.FC<Props> = ({
  tags,
  selectedTag = null,
  onSelectTag,
}) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="mb-2 w-full">
      <div
        className="overflow-x-auto pb-2"
        style={{ scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch' }}
      >
        <div className="inline-flex w-max gap-2">
          {tags.map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onSelectTag?.(isActive ? null : tag)}
                aria-pressed={isActive}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-primary text-background'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FantasyTags;
