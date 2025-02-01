const NotifyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-800 mb-6 sm:mb-8">
            消息通知
          </h1>

          {/* 通知分类标签 */}
          <div className="mb-6 sm:mb-8 overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="flex space-x-3 sm:space-x-4 whitespace-nowrap">
              <div className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer text-sm sm:text-base">
                全部
              </div>
              <div className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 text-sm sm:text-base">
                系统通知
              </div>
              <div className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 text-sm sm:text-base">
                活动提醒
              </div>
              <div className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 text-sm sm:text-base">
                评论回复
              </div>
            </div>
          </div>

          {/* 通知列表 */}
          <div className="space-y-3 sm:space-y-4">
            {[1, 2, 3, 4, 5].map((item) => {
              const isUnread = item <= 3;
              return (
                <div
                  key={item}
                  className={`p-4 sm:p-6 border-l-4 rounded-lg hover:shadow-md transition-all duration-300 ${
                    isUnread
                      ? 'border-indigo-400 bg-white'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 sm:justify-between mb-2">
                    <div className="flex items-center">
                      {isUnread && (
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                      )}
                      <span
                        className={`text-xs sm:text-sm font-medium ${
                          isUnread ? 'text-indigo-600' : 'text-gray-500'
                        }`}
                      >
                        系统通知
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">
                      2024-01-20 10:30
                    </span>
                  </div>
                  <h3
                    className={`text-base sm:text-lg font-medium mb-2 ${
                      isUnread ? 'text-gray-800' : 'text-gray-600'
                    }`}
                  >
                    您发布的帖子收到了新的回复
                  </h3>
                  <p
                    className={`text-sm mb-4 ${
                      isUnread ? 'text-gray-600' : 'text-gray-500'
                    }`}
                  >
                    用户&quot;张三&quot;在您发布的&quot;关于举办编程马拉松比赛的通知&quot;中发表了评论...
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center sm:justify-between">
                    <div className="text-indigo-600 cursor-pointer hover:text-indigo-700 text-sm sm:text-base">
                      查看详情
                    </div>
                    <div className="flex space-x-4 border-t sm:border-t-0 pt-2 sm:pt-0">
                      {isUnread && (
                        <span className="text-gray-500 cursor-pointer hover:text-gray-700 text-sm">
                          标记已读
                        </span>
                      )}
                      <span className="text-red-500 cursor-pointer hover:text-red-700 text-sm">
                        删除
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 加载更多 */}
          <div className="mt-6 sm:mt-8 text-center">
            <div className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-indigo-600 text-indigo-600 rounded-lg text-sm sm:text-base hover:bg-indigo-50 transition-colors duration-300">
              加载更多
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifyPage;
