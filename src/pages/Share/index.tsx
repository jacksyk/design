const SharePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-8">
          {/* 头部 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:justify-between mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-indigo-800">
              资源共享
            </h1>
            <div className="w-full sm:w-auto bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base hover:bg-indigo-700 transition-colors duration-300">
              上传资源
            </div>
          </div>

          {/* 资源分类 */}
          <div className="mb-6 sm:mb-8 overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="flex space-x-3 sm:space-x-4 whitespace-nowrap">
              <div className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer text-sm sm:text-base">
                全部
              </div>
              <div className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 text-sm sm:text-base">
                课程资料
              </div>
              <div className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 text-sm sm:text-base">
                电子书籍
              </div>
              <div className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 text-sm sm:text-base">
                考试资料
              </div>
            </div>
          </div>

          {/* 搜索框 */}
          <div className="mb-6 sm:mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索资源..."
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </div>

          {/* 资源列表 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-0 sm:justify-between mb-3 sm:mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">
                      高等数学期末复习资料
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
                      <span>上传者：张三</span>
                      <span className="hidden sm:inline">•</span>
                      <span>2024-01-20</span>
                    </div>
                  </div>
                  <span className="self-start px-2 sm:px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs sm:text-sm">
                    课程资料
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-4">
                  包含历年试题、重点知识总结、公式推导等内容，适合期末复习使用...
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center sm:justify-between text-xs sm:text-sm">
                  <div className="flex space-x-4 text-gray-500">
                    <span>大小：2.5MB</span>
                    <span>下载：128次</span>
                  </div>
                  <div className="flex space-x-3">
                    <div className="flex-1 sm:flex-none px-4 py-1.5 sm:py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                      下载
                    </div>
                    <div className="flex-1 sm:flex-none px-4 py-1.5 sm:py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                      收藏
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

export default SharePage;
