const ConversationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-8">
          {/* 头部 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:justify-between mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-indigo-800">
              讨论论坛
            </h1>
            <div className="bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 cursor-pointer text-center">
              发起讨论
            </div>
          </div>

          {/* 分类标签 - 移动端可滚动 */}
          <div className="mb-6 sm:mb-8 overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-100 hover:scrollbar-thumb-indigo-600">
            <div className="flex space-x-3 sm:space-x-4 whitespace-nowrap pb-2">
              <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer text-sm sm:text-base">
                全部
              </div>
              <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 text-sm sm:text-base">
                学术交流
              </div>
              <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 text-sm sm:text-base">
                校园生活
              </div>
              <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 text-sm sm:text-base">
                求助答疑
              </div>
            </div>
          </div>

          {/* 搜索框 */}
          <div className="mb-6 sm:mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索讨论主题..."
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </div>

          {/* 讨论列表 */}
          <div className="space-y-4 sm:space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-100 hover:scrollbar-thumb-indigo-600">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="border-l-4 border-indigo-400 bg-gray-50 p-4 sm:p-6 rounded-lg hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 flexCenter text-sm">
                      用户
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm sm:text-base">
                        张三
                      </h3>
                      <span className="text-xs sm:text-sm text-gray-500">
                        2小时前
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs sm:text-sm self-start sm:self-auto">
                    学术交流
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-2 sm:mb-3">
                  关于期末考试复习方法的讨论
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  大家有什么好的复习方法可以分享一下吗？我觉得时间安排很重要...
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500">
                  <div className="flex space-x-4 sm:space-x-6">
                    <span>浏览: 256</span>
                    <span>回复: 23</span>
                    <span>点赞: 45</span>
                  </div>
                  <div className="flex items-center space-x-4 border-t sm:border-t-0 pt-3 sm:pt-0">
                    <span className="cursor-pointer hover:text-indigo-600">
                      点赞
                    </span>
                    <span className="cursor-pointer hover:text-indigo-600">
                      回复
                    </span>
                    <span className="cursor-pointer hover:text-indigo-600">
                      分享
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 加载更多 */}
          <div className="mt-6 sm:mt-8 text-center">
            <div className="inline-block px-4 sm:px-6 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-300 cursor-pointer text-sm sm:text-base">
              加载更多
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
