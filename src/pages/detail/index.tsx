const DetailPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-8">
          {/* 标题和分类 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-indigo-800">
              关于期末考试复习方法的讨论
            </h1>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm self-start sm:self-auto">
              学术交流
            </span>
          </div>

          {/* 作者信息 */}
          <div className="flex items-center space-x-3 mb-6 sm:mb-8">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 flexCenter text-sm">
              用户
            </div>
            <div>
              <h3 className="font-medium text-gray-800 text-sm sm:text-base">
                张三
              </h3>
              <span className="text-xs sm:text-sm text-gray-500">
                发布于 2024-01-20 10:30
              </span>
            </div>
          </div>

          {/* 内容 */}
          <div className="prose max-w-none mb-6 sm:mb-8">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              大家有什么好的复习方法可以分享一下吗？我觉得时间安排很重要...
              建议： 1. 制定详细的复习计划 2. 合理分配时间 3.
              找到适合自己的学习方法 4. 多做练习题 5. 保持良好的作息
            </p>
          </div>

          {/* 图片展示 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="rounded-lg overflow-hidden">
              <img
                src="/placeholder.jpg"
                alt="复习计划"
                className="w-full h-40 sm:h-48 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src="/placeholder.jpg"
                alt="学习笔记"
                className="w-full h-40 sm:h-48 object-cover"
              />
            </div>
          </div>

          {/* 互动数据 */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
            <span>浏览: 256</span>
            <span>评论: 23</span>
            <span>点赞: 45</span>
          </div>

          {/* 评论区 */}
          <div className="border-t pt-6 sm:pt-8">
            <h2 className="text-lg sm:text-xl font-bold text-indigo-800 mb-4 sm:mb-6">
              评论区
            </h2>

            {/* 评论输入框 */}
            <div className="mb-6 sm:mb-8">
              <textarea
                rows={4}
                placeholder="写下你的评论..."
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex justify-end mt-3 sm:mt-4">
                <div className="bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base hover:bg-indigo-700 transition-colors duration-300">
                  发表评论
                </div>
              </div>
            </div>

            {/* 评论列表 */}
            <div className="space-y-4 sm:space-y-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="border-l-4 border-gray-200 pl-3 sm:pl-4"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flexCenter text-xs sm:text-sm">
                      用户
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                      <span className="font-medium text-gray-800 text-sm sm:text-base">
                        李四
                      </span>
                      <span className="text-xs text-gray-500">1小时前</span>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    这些建议很实用，我也觉得制定计划很重要！
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs sm:text-sm text-gray-500">
                    <span className="cursor-pointer hover:text-indigo-600">
                      回复
                    </span>
                    <span className="cursor-pointer hover:text-indigo-600">
                      点赞
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
