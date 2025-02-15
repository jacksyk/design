import { getAllActivity, getAllActivityResponse } from '@/api';
import { NavigationBar, TitleWrapperCard } from '@/components';
import {
  CommentOutlined,
  CustomerServiceOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import { useEffect, useMemo, useRef, useState } from 'react';
import { NoticeBar } from 'react-vant';
import { ActivityCard, AiFloatCircle } from './components';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<getAllActivityResponse['data']>([]);
  const totalNumber = useRef<number>(0);
  const tagList = useMemo(() => {
    return [
      {
        title: '网站反馈',
        icon: <CommentOutlined className="text-2xl" />,
        onClick: () => {
          navigate('/feedback');
        },
      },
      {
        title: '在线聊天',
        icon: <CustomerServiceOutlined className="text-2xl" />,
        onClick: () => {
          navigate('/chat');
        },
      },
      {
        title: '资源库工具',
        icon: <ToolOutlined className="text-2xl" />,
        onClick: () => {
          navigate('/onlineToolbox');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <NavigationBar />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {/* 公告栏 */}
        <div className="mb-6 sm:mb-10">
          <NoticeBar
            scrollable
            text="ai助手上线了，限时免费体验，抓紧体验吧！实时聊天室也上线了"
            className="rounded-lg !bg-blue-50 !text-blue-600 border !border-blue-100 text-sm sm:text-base"
            style={{
              '--rv-notice-bar-height': '36px',
              '--rv-notice-bar-padding': '0 12px',
            }}
            speed={60}
          />
        </div>

        {/* 服务卡片区 */}
        <div className="mb-8 sm:mb-16">
          <div className="flex flex-col items-center mb-6 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
              探索服务
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              便捷的校园生活，从这里开始
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {tagList.map((item) => (
              <div
                key={item.title}
                className="group bg-white rounded-xl p-4 sm:p-5 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-100 hover:shadow-lg"
                onClick={item.onClick}
              >
                <div className="flex items-center sm:items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-white transition-colors flex-shrink-0">
                    <div className="text-blue-600 text-lg sm:text-2xl">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-0.5 sm:mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      点击进入 →
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 最新活动区 */}
        <div className="mb-8 sm:mb-16">
          <TitleWrapperCard
            title="最新活动"
            isShowAllEntry
            allEntryCb={() => navigate('/list')}
            className="!bg-transparent !shadow-none !p-0"
          >
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
              {list.map((item) => (
                <ActivityCard
                  key={item.id}
                  {...item}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300"
                />
              ))}
            </div>
          </TitleWrapperCard>
        </div>

        {/* 介绍区域 */}
        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 sm:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">
              智慧校园新体验
            </h2>
            <p className="text-sm sm:text-lg text-blue-100 mb-6 sm:mb-8">
              打造智能化的校园服务平台，为您提供便捷的学习和生活体验
            </p>
            <div
              onClick={() => navigate('/chat')}
              className="w-full sm:w-auto bg-white text-blue-600 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-50 transition-colors"
            >
              立即体验
            </div>
          </div>
        </div>
      </div>

      <AiFloatCircle />
    </div>
  );
};

export default HomePage;
