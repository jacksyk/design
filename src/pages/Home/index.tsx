import { getAllActivity, getAllActivityResponse } from '@/api';
import { NavigationBar, TitleWrapperCard } from '@/components';
import { useNavigate } from '@umijs/max';
import { message } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { NoticeBar } from 'react-vant';
import { twMerge } from 'tailwind-merge';
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
        title: '在线聊天',
        onClick: () => {
          // message.error('暂未开放，尽情期待');
          navigate('/chat');
        },
      },
      {
        title: '资源库工具',
        onClick: () => {
          navigate('/onlineToolbox');
          message.error('暂未开放，尽情期待');
        },
      },
      // {
      //   title: '失物招领',
      //   onClick: () => {
      //     message.error('暂未开放，尽情期待');
      //   },
      // },
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
    <div
      className={twMerge(
        'min-h-screen bg-gradient-to-br from-blue-50 to-purple-50',
      )}
    >
      {/* 导航栏 */}
      <NavigationBar />

      {/* 主要内容区 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* 公告栏 */}
        <div className="mb-8">
          <NoticeBar
            scrollable
            text={'ai助手上线了，限时免费体验，抓紧体验吧！实时聊天室也上线了'.repeat(
              1,
            )}
            className="rounded-lg !bg-indigo-50 !text-indigo-600 border !border-indigo-100"
            style={{
              '--rv-notice-bar-height': '40px',
              '--rv-notice-bar-padding': '0 16px',
            }}
            speed={100}
          />
        </div>

        {/* 信息分类专区 */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center">
            校园服务
          </h2>
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {tagList.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-3 bg-white/90 p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-xl hover:scale-[1.02] hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group"
                onClick={item.onClick}
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center group-hover:bg-white/80">
                  {item.title === '在线聊天' && (
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
                  {item.title === '资源库工具' && (
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
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
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
        <TitleWrapperCard
          title="最新活动"
          isShowAllEntry
          allEntryCb={() => {
            navigate('/list');
          }}
        >
          <div className="space-y-4 sm:space-y-6">
            {list.map((item) => (
              <ActivityCard key={item.id} {...item} />
            ))}
          </div>
        </TitleWrapperCard>

        {/* AI悬浮小球 */}
        <AiFloatCircle />
      </div>
    </div>
  );
};

export default HomePage;
