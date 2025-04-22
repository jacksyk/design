import { getAllTags, uploadFile, uploadResourceTool, type Tag } from '@/api';
import { Back } from '@/components';
import { InboxOutlined, LinkOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import { useMount } from 'ahooks';
import { Button, Form, Input, Radio, Select, Upload, message } from 'antd';
import { useState } from 'react';

const { Dragger } = Upload;

enum ToolType {
  LINK = 'link',
  FILE = 'file',
}

const UploadFilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [fileType, setFileType] = useState<ToolType>(ToolType.LINK);
  const [tags, setTags] = useState<Tag[]>([]);

  const [uploadedLink, setUploadedLink] = useState<string>('');

  const uploadProps = {
    name: 'file',
    customRequest: async (options: any) => {
      const { file, onSuccess, onError } = options;
      try {
        const response = await uploadFile({
          file,
        });
        setUploadedLink(response);
        form.setFieldsValue({ link: response });
        message.success(`${file.name} 上传成功`);
        onSuccess(response);
      } catch (error) {
        message.error(`${file.name} 上传失败`);
        onError(error);
      }
    },
    beforeUpload: (file: File) => {
      // 这里可以添加文件类型和大小的校验
      const isLt50M = file.size / 1024 / 1024 < 50;
      if (!isLt50M) {
        message.error('文件大小不能超过50MB！');
        return false;
      }
      return true;
    },
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const submitData = {
        ...values,
        link: fileType === ToolType.FILE ? uploadedLink : values.link,
      };
      await uploadResourceTool(submitData);
      message.success('创建成功');
      navigate(-1);
    } catch (error) {
      message.error('创建失败');
    } finally {
      setLoading(false);
    }
  };

  useMount(() => {
    getAllTags().then((res) => {
      setTags(res);
    });
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Back />
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            上传资源
          </h1>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ type: ToolType.LINK }}
          >
            <Form.Item
              label="工具类型"
              name="type"
              rules={[{ required: true, message: '请选择工具类型' }]}
            >
              <Radio.Group
                onChange={(e) => setFileType(e.target.value)}
                className="mb-4"
              >
                <Radio.Button value={ToolType.LINK}>链接</Radio.Button>
                <Radio.Button value={ToolType.FILE}>文件</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '请输入标题' }]}
            >
              <Input placeholder="请输入标题" className="rounded-lg" />
            </Form.Item>

            <Form.Item
              label="描述"
              name="description"
              rules={[{ required: true, message: '请输入描述' }]}
            >
              <Input.TextArea
                placeholder="请输入描述"
                className="rounded-lg"
                rows={4}
              />
            </Form.Item>

            <Form.Item label="标签" name="tagIds">
              <Select
                mode="multiple"
                placeholder="请选择标签"
                className="rounded-lg"
                options={tags.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
            </Form.Item>

            {fileType === ToolType.LINK ? (
              <Form.Item
                label="链接"
                name="link"
                rules={[
                  { required: true, message: '请输入链接' },
                  { type: 'url', message: '请输入有效的URL' },
                ]}
              >
                <Input
                  placeholder="请输入链接"
                  className="rounded-lg"
                  prefix={<LinkOutlined />}
                />
              </Form.Item>
            ) : (
              <Form.Item
                label="上传文件"
                name="link"
                rules={[{ required: true, message: '请上传文件' }]}
              >
                <Dragger {...uploadProps} className="bg-gray-50">
                  <p className="text-4xl text-gray-400">
                    <InboxOutlined />
                  </p>
                  <p className="text-base">点击或拖拽文件到此处上传</p>
                  <p className="text-sm text-gray-500">
                    上传完成后将自动填入链接
                  </p>
                </Dragger>
              </Form.Item>
            )}

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-10 bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                上传
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UploadFilePage;
