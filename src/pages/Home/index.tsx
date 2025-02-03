import { NavigationBar } from '@/components';
import { useNavigate } from '@umijs/max';
import { message } from 'antd';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { ActivityCard, AiFloatCircle } from './components';
const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const tagList = useMemo(() => {
    return [
      {
        title: '学术论坛',
        onClick: () => {
          navigate('/conversation');
        },
      },
      {
        title: '网站反馈',
        onClick: () => {
          navigate('/feedback');
        },
      },
      {
        title: '二手交易',
        onClick: () => {
          message.error('暂未开放');
        },
      },
      {
        title: '失物招领',
        onClick: () => {
          message.error('暂未开放');
        },
      },
    ];
  }, [navigate]);

  return (
    <div
      className={twMerge(
        'min-h-screen bg-gradient-to-br from-blue-50 to-purple-50',
      )}
    >
      {/* 导航栏 */}
      <NavigationBar />

      {/* 主要内容区 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* 信息分类 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-6 sm:mb-10">
          {tagList.map((item) => (
            <div
              key={item.title}
              className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group"
              onClick={item.onClick}
            >
              <span className="text-base sm:text-lg text-indigo-700 font-medium group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600">
                {item.title}
              </span>
            </div>
          ))}
        </div>

        {/* 信息列表 */}
        <div className="space-y-5 sm:space-y-8">
          {[1, 2, 3].map((item) => (
            <ActivityCard key={item} />
          ))}
        </div>

        {/* AI悬浮小球 */}
        <AiFloatCircle />
      </div>
    </div>
  );
};

export default HomePage;
