import { login } from '@/api';
import { CloseOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Form, Input, Modal, message } from 'antd';

// 创建一个命令式调用的方法
export const showLoginModal = () => {
  let close: () => void;

  Modal.confirm({
    icon: null,
    title: (
      <div className="flex items-center justify-between">
        <span>登录</span>
      </div>
    ),
    width: 400,
    centered: true,
    footer: null,
    closable: true,
    content: (
      <Form
        name="login"
        onFinish={async (values) => {
          try {
            const { token } = await login(values);
            localStorage.setItem('token', token);
            message.success('登录成功');
            close?.();
          } catch (error) {
            message.error('登录失败');
          }
        }}
        autoComplete="off"
        layout="vertical"
        className="pt-4"
      >
        <Form.Item
          name="student_id"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="用户名"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="密码"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-10 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            登录
          </Button>
        </Form.Item>

        <div className="text-center mt-4">
          <span
            className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm"
            onClick={() => {
              close?.();
              history.push('/login');
            }}
          >
            如果没有账号前往登录页面进行注册
          </span>
        </div>
      </Form>
    ),
    onCancel: () => close?.(),
  });

  close = Modal.destroyAll;
};

export default showLoginModal;
