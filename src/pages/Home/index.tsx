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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* 公告栏 */}
        <div className="mb-10">
          <NoticeBar
            scrollable
            text={'ai助手上线了，限时免费体验，抓紧体验吧！实时聊天室也上线了'}
            className="rounded-lg !bg-blue-50 !text-blue-600 border !border-blue-100"
            style={{
              '--rv-notice-bar-height': '40px',
              '--rv-notice-bar-padding': '0 16px',
            }}
            speed={60}
          />
        </div>

        {/* 服务卡片区 */}
        <div className="mb-16">
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">探索服务</h2>
            <p className="text-gray-500">便捷的校园生活，从这里开始</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {tagList.map((item) => (
              <div
                key={item.title}
                className="group bg-white rounded-xl p-5 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-100 hover:shadow-lg"
                onClick={item.onClick}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-white transition-colors">
                    <div className="text-blue-600">{item.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-medium mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      点击进入 →
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 最新活动区 */}
        <div className="mb-16">
          <TitleWrapperCard
            title="最新活动"
            isShowAllEntry
            allEntryCb={() => navigate('/list')}
            className="!bg-transparent !shadow-none !p-0"
          >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((item) => (
                <ActivityCard
                  key={item.id}
                  {...item}
                  className="bg-white rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300"
                />
              ))}
            </div>
          </TitleWrapperCard>
        </div>

        {/* 介绍区域 */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 sm:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              智慧校园新体验
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              打造智能化的校园服务平台，为您提供便捷的学习和生活体验
            </p>
            <button
              onClick={() => navigate('/chat')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              立即体验
            </button>
          </div>
        </div>
      </div>

      <AiFloatCircle className="!bg-blue-600/90" />
    </div>
  );
};

export default HomePage;
