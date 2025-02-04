import { useNavigate } from '@umijs/max';

const PersonalPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* 页面标题和返回按钮 */}
        <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-2xl mb-6 sm:mb-8 p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              onClick={() => navigate(-1)}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 p-2.5 rounded-xl shadow-sm hover:shadow-md cursor-pointer group transition-all duration-300"
            >
              <svg
                className="w-5 h-5 text-indigo-600 group-hover:-translate-x-1 transition-transform"
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
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                个人中心
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                管理你的个人信息和动态
              </p>
            </div>
          </div>
        </div>

        {/* 原有的个人信息卡片 */}
        {/* 个人信息卡片 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 sm:p-8 mb-4 sm:mb-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col sm:flex-row items-center sm:space-x-6 text-center sm:text-left">
              <div className="relative group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 border-4 border-white shadow mb-4 sm:mb-0"></div>
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
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
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-indigo-800 mb-1 sm:mb-2">
                  张三
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-1">
                  计算机科学与技术学院
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  个人简介：热爱技术，喜欢分享
                </p>
              </div>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
              onClick={() => {
                // 处理编辑个人信息
              }}
            >
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              编辑资料
            </button>
          </div>
        </div>

        {/* 个人数据统计 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
          {[
            { label: '发布信息', count: 12 },
            { label: '参与活动', count: 8 },
            { label: '收藏内容', count: 24 },
            { label: '获得点赞', count: 156 },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="text-xl sm:text-2xl font-bold text-indigo-600 mb-1 sm:mb-2">
                {item.count}
              </div>
              <div className="text-gray-600 text-sm sm:text-base">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* 最近活动 */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-8 mb-4 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-indigo-800 mb-4 sm:mb-6">
            最近活动
          </h3>
          <div className="space-y-4 sm:space-y-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between border-b border-gray-100 pb-4"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-indigo-50 flexCenter">
                    <span className="text-indigo-600 text-sm">活动</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                      参与了校园歌手大赛
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">
                      2024-01-20
                    </p>
                  </div>
                </div>
                <span className="text-indigo-500 cursor-pointer hover:text-indigo-600 text-sm sm:text-base self-end sm:self-auto">
                  查看详情
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 我的发布 */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-8">
          <h3 className="text-lg sm:text-xl font-bold text-indigo-800 mb-4 sm:mb-6">
            我的发布
          </h3>
          <div className="space-y-4 sm:space-y-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="border-l-4 border-indigo-400 bg-gray-50 p-4 sm:p-6 rounded-r-xl hover:shadow-md transition-all duration-300"
              >
                <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">
                  关于举办编程马拉松比赛的通知
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                  诚邀各位同学参加本次编程马拉松比赛，展示你的编程实力...
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500">
                  <span>2024-01-15</span>
                  <div className="flex items-center space-x-4">
                    <span>浏览: 89</span>
                    <span>评论: 12</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
