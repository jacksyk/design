const PersonalPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* 个人信息卡片 */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-8 mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-6 text-center sm:text-left">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 border-4 border-white shadow mb-4 sm:mb-0"></div>
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
