import { useNavigate } from '@umijs/max';

export const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* 顶部导航栏 */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-wider hover:scale-105 transition-transform cursor-pointer">
              校园信息交流平台
            </h1>

            {/* 移动端菜单按钮 */}
            <div className="flex items-center gap-5 sm:hidden">
              <div
                onClick={() => navigate('/publish')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center group"
              >
                <svg
                  className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300"
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
                <span>发布</span>
              </div>
            </div>

            {/* 桌面端导航 */}
            <div className="hidden sm:flex items-center space-x-8">
              <div
                onClick={() => navigate('/publish')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center group"
              >
                <svg
                  className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300"
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
                <span>发布</span>
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
      </div>
    </>
  );
};
