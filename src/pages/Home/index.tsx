const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* 顶部导航栏 */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flexCenter justify-between">
          <h1 className="text-2xl font-bold text-indigo-800 tracking-tight">
            校园信息交流平台
          </h1>
          <div className="flex items-center space-x-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 border-2 border-white shadow hover:shadow-lg transition"></div>
          </div>
        </div>
      </div>

      {/* 主要内容区 */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 信息分类 */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {['学术交流', '校园活动', '二手交易', '失物招领'].map((item) => (
            <div
              key={item}
              className="bg-white p-5 rounded-xl shadow-md flexCenter cursor-pointer hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
            >
              <span className="text-indigo-700 font-medium">{item}</span>
            </div>
          ))}
        </div>

        {/* 信息列表 */}
        <div className="space-y-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-400"
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
    </div>
  );
};

export default HomePage;
