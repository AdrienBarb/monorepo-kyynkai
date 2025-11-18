import React from 'react';

interface Props {
  tags: string[];
}

const FantasyTags: React.FC<Props> = ({ tags }) => {
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
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FantasyTags;
