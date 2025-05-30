import { sendFeedBack } from '@/api';
import { Back } from '@/components';
import { useNavigate } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';
import { message } from 'antd';
import { useState } from 'react';
const FeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState<{
    title: string;
    content: string;
  }>({
    content: '',
    title: '',
  });

  const handleSendMessage = useMemoizedFn(() => {
    sendFeedBack(formValue).then(() => {
      setFormValue({
        title: '',
        content: '',
      });
      message.success('反馈成功');
      navigate('/home');
    });
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Back />
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-800 mb-6 sm:mb-8">
            意见反馈
          </h1>

          {/* 反馈类型 */}
          {/* <div className="mb-4 sm:mb-6">
            <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1.5 sm:mb-2">
              反馈类型
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">请选择反馈类型</option>
              <option value="bug">功能异常</option>
              <option value="suggestion">功能建议</option>
              <option value="content">内容问题</option>
              <option value="other">其他</option>
            </select>
          </div> */}

          {/* 反馈标题 */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1.5 sm:mb-2">
              反馈标题
            </label>
            <input
              type="text"
              placeholder="请简要描述您的反馈"
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormValue({
                  ...formValue,
                  title: e.target.value,
                });
              }}
            />
          </div>

          {/* 反馈内容 */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1.5 sm:mb-2">
              反馈内容
            </label>
            <textarea
              rows={6}
              placeholder="请详细描述您的问题或建议..."
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setFormValue({
                  ...formValue,
                  content: e.target.value,
                });
              }}
            />
          </div>

          {/* 截图上传 */}
          {/* <div className="mb-6 sm:mb-8">
            <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1.5 sm:mb-2">
              添加截图（选填）
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center">
              <div className="text-gray-500">
                <p className="text-sm sm:text-base">点击或拖拽图片到此处上传</p>
                <p className="text-xs sm:text-sm mt-1 sm:mt-2">
                  支持 jpg、png 格式，大小不超过 5MB
                </p>
              </div>
            </div>
          </div> */}

          {/* 联系方式 */}
          {/* <div className="mb-6 sm:mb-8">
            <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1.5 sm:mb-2">
              联系方式（选填）
            </label>
            <input
              type="text"
              placeholder="请留下您的邮箱或手机号，方便我们及时回复"
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div> */}

          {/* 提交按钮 */}
          <div className="flex justify-end">
            <div
              className="w-full sm:w-auto bg-indigo-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base hover:bg-indigo-700 transition-colors duration-300 flexCenter"
              onClick={handleSendMessage}
            >
              提交反馈
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
