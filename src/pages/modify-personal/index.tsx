import { useNavigate } from '@umijs/max';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';

const ModifyPersonal = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      // TODO: 调用接口保存数据
      message.success('保存成功');
      navigate(-1);
    } catch (error) {
      message.error('保存失败');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-12">
        {/* 页面标题和返回按钮 */}
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl sm:rounded-2xl mb-4 sm:mb-10 p-4 sm:p-8 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6">
            <div
              onClick={() => navigate(-1)}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md cursor-pointer group transition-all duration-300"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                修改个人资料
              </h1>
              <p className="text-gray-500 text-sm sm:text-base mt-1 sm:mt-2">
                完善你的个人信息，让别人更好地了解你
              </p>
            </div>
          </div>
        </div>

        {/* 表单区域 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-10">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              name: '张三',
              college: '计算机科学与技术学院',
              studentId: '202126202047',
              introduction: '热爱技术，喜欢分享',
            }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
              <Form.Item
                label={
                  <span className="text-sm sm:text-base font-medium">姓名</span>
                }
                name="name"
                rules={[{ required: true, message: '请输入姓名' }]}
              >
                <Input
                  placeholder="请输入姓名"
                  className="h-10 sm:h-11 text-sm sm:text-base"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-sm sm:text-base font-medium">学号</span>
                }
                name="studentId"
                rules={[{ required: true, message: '请输入学号' }]}
              >
                <Input
                  placeholder="请输入学号"
                  disabled
                  className="h-10 sm:h-11 text-sm sm:text-base"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-sm sm:text-base font-medium">学院</span>
                }
                name="college"
                rules={[{ required: true, message: '请输入所属学院' }]}
                className="sm:col-span-2"
              >
                <Input
                  placeholder="请输入所属学院"
                  className="h-10 sm:h-11 text-sm sm:text-base"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-sm sm:text-base font-medium">
                    个人简介
                  </span>
                }
                name="introduction"
                className="sm:col-span-2"
              >
                <Input.TextArea
                  placeholder="介绍一下你自己吧..."
                  rows={4}
                  maxLength={500}
                  showCount
                  className="text-sm sm:text-base"
                />
              </Form.Item>
            </div>

            <div className="flex justify-center mt-6 sm:mt-10">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full sm:w-1/2 h-10 sm:h-12 text-sm sm:text-base font-medium bg-gradient-to-r from-indigo-500 to-purple-600 border-none hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                保存修改
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ModifyPersonal;
