const PublishPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-indigo-800 mb-8">发布信息</h1>

          {/* 信息分类选择 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              信息类型
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">请选择类型</option>
              <option value="academic">学术交流</option>
              <option value="activity">校园活动</option>
              <option value="trade">二手交易</option>
              <option value="lost">失物招领</option>
            </select>
          </div>

          {/* 标题输入 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">标题</label>
            <input
              type="text"
              placeholder="请输入标题"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* 内容输入 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">内容</label>
            <textarea
              rows={6}
              placeholder="请输入内容"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* 图片上传 */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">
              添加图片
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-gray-500">
                <p>点击或拖拽图片到此处上传</p>
                <p className="text-sm mt-2">支持 jpg、png 格式</p>
              </div>
            </div>
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-end">
            <div className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
              发布
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishPage;
