const SharePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-indigo-800">资源共享</h1>
            <div className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 cursor-pointer">
              上传资源
            </div>
          </div>

          {/* 资源分类 */}
          <div className="flex space-x-4 mb-8">
            <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer">
              全部
            </div>
            <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200">
              课程资料
            </div>
            <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200">
              电子书籍
            </div>
            <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200">
              考试资料
            </div>
          </div>

          {/* 搜索框 */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索资源..."
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </div>

          {/* 资源列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      高等数学期末复习资料
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>上传者：张三</span>
                      <span>•</span>
                      <span>2024-01-20</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                    课程资料
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  包含历年试题、重点知识总结、公式推导等内容，适合期末复习使用...
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex space-x-4 text-gray-500">
                    <span>大小：2.5MB</span>
                    <span>下载：128次</span>
                  </div>
                  <div className="flex space-x-3">
                    <div className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                      下载
                    </div>
                    <div className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                      收藏
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 加载更多 */}
          <div className="mt-8 text-center">
            <div className="inline-block px-6 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-300 cursor-pointer">
              加载更多
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePage;
