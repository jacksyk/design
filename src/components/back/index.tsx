import { useNavigate } from '@umijs/max';
import { twMerge } from 'tailwind-merge';

type BackProps = {
  className?: string;
};

export const Back: React.FC<BackProps> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div
      className={twMerge(
        'flex items-center text-indigo-600 hover:text-indigo-800 cursor-pointer mb-4 group',
        className,
      )}
      onClick={() => navigate(-1)}
    >
      <svg
        className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span className="text-sm sm:text-base font-medium">返回</span>
    </div>
  );
};
