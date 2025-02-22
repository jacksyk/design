import { getAllActivityResponse } from '@/api';
import { joinUrlParams } from '@/utils';
import { useNavigate } from '@umijs/max';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
type ActivityCardType = Partial<
  getAllActivityResponse['data'][0] & {
    className: string;
  }
>;

export const ActivityCard: React.FC<ActivityCardType> = (props) => {
  const {
    avatar,
    createTime,
    description,
    id,
    likes,
    title,
    username,
    views,
    className,
  } = props;

  const navigate = useNavigate();

  const handleClickToDetail = useCallback(() => {
    navigate(
      joinUrlParams('/detail', {
        id,
      }),
    );
  }, [id, navigate]);

  return (
    <div
      className={twMerge(
        'bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-400 group cursor-pointer',
        className,
      )}
      onClick={handleClickToDetail}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-800 mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-colors overflow-hidden text-nowrap text-ellipsis">
        {title}
      </h2>
      <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed truncate whitespace-nowrap overflow-hidden">
        {description ?? ''}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm sm:text-base text-gray-500">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <span className="flex items-center">
            <span className="w-8 h-8 rounded-full bg-gradient-to-r  mr-2 shadow-md">
              <img src={avatar} alt="" className="rounded-full" />
            </span>
            <span className="font-medium text-gray-700">{username}</span>
          </span>
          <span className="text-indigo-500 ssm:block hidden">{createTime}</span>
        </div>
        <div className="text-indigo-500 ssm:hidden">
          {dayjs(createTime).format('YYYY-MM-DD')}
        </div>
        <div className="flex items-center space-x-6">
          <span className="flex items-center space-x-2 ">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>{views}</span>
          </span>
          <span className="flex items-center space-x-2 ">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{likes}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
