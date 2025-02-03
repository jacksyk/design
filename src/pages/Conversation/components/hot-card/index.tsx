export const HotCard = () => {
  return (
    <div className="border-l-4 border-indigo-400 bg-gray-50 p-4 sm:p-6 rounded-lg hover:shadow-md transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 flexCenter text-sm">
            用户
          </div>
          <div>
            <h3 className="font-medium text-gray-800 text-sm sm:text-base">
              张三
            </h3>
            <span className="text-xs sm:text-sm text-gray-500">2小时前</span>
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
          <span className="cursor-pointer hover:text-indigo-600">点赞</span>
          <span className="cursor-pointer hover:text-indigo-600">回复</span>
          <span className="cursor-pointer hover:text-indigo-600">分享</span>
        </div>
      </div>
    </div>
  );
};
