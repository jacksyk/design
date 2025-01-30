const ConversationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-indigo-800">讨论论坛</h1>
            <div className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 cursor-pointer">
              发起讨论
            </div>
          </div>

          {/* 分类标签 */}
          <div className="flex space-x-4 mb-8">
            <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer">
              全部
            </div>
            <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200">
              学术交流
            </div>
            <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200">
              校园生活
            </div>
            <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200">
              求助答疑
            </div>
          </div>

          {/* 搜索框 */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索讨论主题..."
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </div>

          {/* 讨论列表 */}
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="border-l-4 border-indigo-400 bg-gray-50 p-6 rounded-lg hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flexCenter">
                      用户
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">张三</h3>
                      <span className="text-sm text-gray-500">2小时前</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                    学术交流
                  </span>
                </div>
                <h2 className="text-xl font-medium text-gray-800 mb-3">
                  关于期末考试复习方法的讨论
                </h2>
                <p className="text-gray-600 mb-4">
                  大家有什么好的复习方法可以分享一下吗？我觉得时间安排很重要...
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex space-x-6">
                    <span>浏览: 256</span>
                    <span>回复: 23</span>
                    <span>点赞: 45</span>
                  </div>
                  <div className="flex items-center space-x-4">
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

export default ConversationPage;
