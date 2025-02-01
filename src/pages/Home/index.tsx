import { useNavigate } from '@umijs/max';
import { message } from 'antd';
import { useMemo, useState } from 'react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  // 添加控制AI助手显示状态的state
  const [showAIChat, setShowAIChat] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* 顶部导航栏 */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-wider hover:scale-105 transition-transform">
            校园信息交流平台
          </h1>
          <div className="flex items-center space-x-8">
            {/* 发布按钮 */}
            <div
              onClick={() => navigate('/publish')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              发布
            </div>
            {/* 消息通知图标 */}
            <div className="relative cursor-pointer group">
              <svg
                className="w-6 h-6 text-indigo-600 hover:text-purple-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
              {/* 悬浮提示框 */}
              <div
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-10 invisible group-hover:visible transition-all duration-300"
                onClick={() => {
                  navigate('/notify');
                }}
              >
                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm text-gray-600">张三回复了你的帖子</p>
                  <span className="text-xs text-gray-400">2分钟前</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm text-gray-600">李四点赞了你的评论</p>
                  <span className="text-xs text-gray-400">1小时前</span>
                </div>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer"></div>
            <div className="flex items-center space-x-2 text-indigo-600 hover:text-purple-600 transition-colors cursor-pointer">
              <span
                className="text-lg font-medium"
                onClick={() => {
                  navigate('/personal');
                }}
              >
                个人中心
              </span>
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区 */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 信息分类 */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {tagList.map((item) => (
            <div
              key={item.title}
              className="bg-white p-5 rounded-xl shadow-md flexCenter cursor-pointer hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
              onClick={item.onClick}
            >
              <span className="text-indigo-700 font-medium">{item.title}</span>
            </div>
          ))}
        </div>

        {/* 信息列表 */}
        <div className="space-y-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-400"
              onClick={() => {
                navigate('/detail');
              }}
            >
              <h2 className="text-xl font-semibold text-indigo-800 mb-3 hover:text-blue-600 cursor-pointer">
                信息标题
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                这里是信息内容的简要描述，可以包含一些具体的细节...
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-6">
                  <span className="flex items-center">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 mr-2"></span>
                    张三
                  </span>
                  <span className="text-indigo-400">2024-01-20</span>
                </div>
                <div className="flex items-center space-x-6">
                  <span className="hover:text-indigo-500 cursor-pointer">
                    浏览: 123
                  </span>
                  <span className="hover:text-indigo-500 cursor-pointer">
                    评论: 45
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* AI助手悬浮球 */}
      <div className="fixed bottom-8 right-8 z-50">
        {showAIChat && (
          <div className="absolute bottom-16 right-0 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* 头部 */}
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">AI 助手</h3>
                </div>
                <div
                  onClick={() => setShowAIChat(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* 聊天内容区 */}
            <div className="h-[400px] overflow-y-auto p-6 space-y-4">
              <div className="flex flex-col space-y-2">
                <div className="bg-gray-50 rounded-2xl rounded-tl-sm p-4 max-w-[80%] self-start">
                  <p className="text-gray-700">
                    你好！我是你的AI助手，有什么可以帮你的吗？
                  </p>
                </div>
              </div>
            </div>

            {/* 输入框 */}
            <div className="p-4 border-t">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="输入你的问题..."
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
                />
                <div className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md hover:shadow-lg">
                  <span>发送</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 悬浮球按钮 */}
        <div
          onClick={() => setShowAIChat(!showAIChat)}
          className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center text-white"
        >
          <svg
            className="w-7 h-7"
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
        </div>
      </div>
    </div>
  );
};

export default HomePage;
