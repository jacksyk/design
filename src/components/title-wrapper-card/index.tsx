import { twMerge } from 'tailwind-merge';

type TitleWrapperCardType = {
  title: string;
  isShowAllEntry?: boolean;
  children: React.ReactNode;
  allEntryText?: string;
  className?: string;
  allEntryCb?: () => void;
};

export const TitleWrapperCard: React.FC<TitleWrapperCardType> = (props) => {
  const {
    title,
    isShowAllEntry,
    children,
    allEntryText = '查看全部',
    className = '',
    allEntryCb,
  } = props;
  return (
    <div
      className={twMerge(
        'bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg p-6 sm:p-8 mb-8 sm:mb-10',
        className,
      )}
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h2>
        {isShowAllEntry && (
          <span
            className="text-sm text-gray-500 cursor-pointer"
            onClick={allEntryCb}
          >
            {allEntryText}
          </span>
        )}
      </div>

      {children}
    </div>
  );
};
