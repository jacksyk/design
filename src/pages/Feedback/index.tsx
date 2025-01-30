const FeedbackPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-indigo-800 mb-8">意见反馈</h1>

          {/* 反馈类型 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              反馈类型
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">请选择反馈类型</option>
              <option value="bug">功能异常</option>
              <option value="suggestion">功能建议</option>
              <option value="content">内容问题</option>
              <option value="other">其他</option>
            </select>
          </div>

          {/* 反馈标题 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              反馈标题
            </label>
            <input
              type="text"
              placeholder="请简要描述您的反馈"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* 反馈内容 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              反馈内容
            </label>
            <textarea
              rows={6}
              placeholder="请详细描述您的问题或建议..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* 截图上传 */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">
              添加截图（选填）
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-gray-500">
                <p>点击或拖拽图片到此处上传</p>
                <p className="text-sm mt-2">
                  支持 jpg、png 格式，大小不超过 5MB
                </p>
              </div>
            </div>
          </div>

          {/* 联系方式 */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">
              联系方式（选填）
            </label>
            <input
              type="text"
              placeholder="请留下您的邮箱或手机号，方便我们及时回复"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-end">
            <div className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
              提交反馈
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
