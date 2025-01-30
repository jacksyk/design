const NotifyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-indigo-800 mb-8">消息通知</h1>

          {/* 通知分类标签 */}
          <div className="flex space-x-4 mb-8">
            <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer">
              全部
            </div>
            <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200">
              系统通知
            </div>
            <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200">
              活动提醒
            </div>
            <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200">
              评论回复
            </div>
          </div>

          {/* 通知列表 */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => {
              const isUnread = item <= 3; // 假设前3条是未读消息
              return (
                <div
                  key={item}
                  className={`p-6 border-l-4 rounded-lg hover:shadow-md transition-all duration-300 ${
                    isUnread
                      ? 'border-indigo-400 bg-white'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {isUnread && (
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          isUnread ? 'text-indigo-600' : 'text-gray-500'
                        }`}
                      >
                        系统通知
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      2024-01-20 10:30
                    </span>
                  </div>
                  <h3
                    className={`text-lg font-medium mb-2 ${
                      isUnread ? 'text-gray-800' : 'text-gray-600'
                    }`}
                  >
                    您发布的帖子收到了新的回复
                  </h3>
                  <p
                    className={`mb-4 ${
                      isUnread ? 'text-gray-600' : 'text-gray-500'
                    }`}
                  >
                    用户&quot;张三&quot;在您发布的&quot;关于举办编程马拉松比赛的通知&quot;中发表了评论...
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-indigo-600 cursor-pointer hover:text-indigo-700">
                      查看详情
                    </div>
                    <div className="flex space-x-4">
                      {isUnread && (
                        <span className="text-gray-500 cursor-pointer hover:text-gray-700">
                          标记已读
                        </span>
                      )}
                      <span className="text-red-500 cursor-pointer hover:text-red-700">
                        删除
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 加载更多 */}
          <div className="mt-8 text-center">
            <div className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-300">
              加载更多
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifyPage;
