import { getAllActivity, getAllActivityResponse } from '@/api';
import { NavigationBar, TitleWrapperCard } from '@/components';
import { useNavigate } from '@umijs/max';
import { message } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityCard, AiFloatCircle } from './components';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<getAllActivityResponse['data']>([]);
  const totalNumber = useRef<number>(0);

  const tagList = useMemo(() => {
    return [
      {
        title: '网站反馈',
        onClick: () => {
          navigate('/feedback');
        },
      },
      {
        title: '学术论坛',
        onClick: () => {
          message.error('暂未开放，尽情期待');
          // navigate('/conversation');
        },
      },
      {
        title: '二手交易',
        onClick: () => {
          message.error('暂未开放，尽情期待');
        },
      },
      {
        title: '失物招领',
        onClick: () => {
          message.error('暂未开放，尽情期待');
        },
      },
    ];
  }, [navigate]);

  useEffect(() => {
    getAllActivity({
      limit: 5,
      page: 1,
    }).then((res) => {
      const { data, totalCount } = res;
      setList(data);
      totalNumber.current = totalCount;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <NavigationBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* 信息分类专区 */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 mb-8 sm:mb-10 animate__animated animate__fadeInDown">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center animate__animated animate__pulse animate__infinite">
            校园服务
          </h2>
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {tagList.map((item, index) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-3 bg-white/90 p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-xl hover:scale-[1.02] hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={item.onClick}
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center group-hover:bg-white/80">
                  {item.title === '学术论坛' && (
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                  )}
                  {item.title === '网站反馈' && (
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  )}
                  {item.title === '二手交易' && (
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  )}
                  {item.title === '失物招领' && (
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-base font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 信息列表专区 */}
        <TitleWrapperCard title="活动列表" isShowAllEntry>
          <div className="space-y-4 sm:space-y-6">
            {list.map((item, index) => (
              <div
                key={item.id}
                className="animate__animated animate__fadeInRight"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <ActivityCard {...item} />
              </div>
            ))}
          </div>
        </TitleWrapperCard>

        <div className="animate__animated animate__bounceIn animate__delay-1s fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 ">
          <AiFloatCircle />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
