import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
  message,
} from 'antd';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react';

const { TextArea } = Input;

interface PublishFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
}

const PublishForm = ({ open, onClose, onSubmit }: PublishFormProps) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async (file: any) => {
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('只能上传图片文件！');
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('图片必须小于 5MB！');
      return false;
    }
    return false;
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (fileList.length === 0) {
        message.error('请至少上传一张商品图片！');
        return;
      }
      onSubmit({ ...values, images: fileList });
      form.resetFields();
      setFileList([]);
      onClose();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <Modal
      title="发布商品"
      open={open}
      onCancel={onClose}
      width={640}
      footer={[
        <Button key="cancel" onClick={onClose}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          发布
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        className="mt-4"
        requiredMark={false}
      >
        <Form.Item
          label="商品图片"
          required
          tooltip="最多上传 5 张图片，每张大小不超过 5MB"
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            beforeUpload={beforeUpload}
            onChange={({ fileList: newFileList }) => setFileList(newFileList)}
            maxCount={5}
          >
            {fileList.length < 5 && (
              <div>
                <PlusOutlined />
                <div className="mt-2">上传</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          label="商品标题"
          name="title"
          rules={[{ required: true, message: '请输入商品标题' }]}
        >
          <Input placeholder="请输入商品标题" maxLength={50} showCount />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="商品分类"
            name="category"
            rules={[{ required: true, message: '请选择商品分类' }]}
          >
            <Select
              options={[
                { label: '电子产品', value: '电子产品' },
                { label: '书籍教材', value: '书籍教材' },
                { label: '生活用品', value: '生活用品' },
                { label: '运动器材', value: '运动器材' },
                { label: '其他', value: '其他' },
              ]}
              placeholder="选择分类"
            />
          </Form.Item>

          <Form.Item
            label="商品成色"
            name="condition"
            rules={[{ required: true, message: '请选择商品成色' }]}
          >
            <Select
              options={[
                { label: '全新', value: '全新' },
                { label: '99新', value: '99新' },
                { label: '95新', value: '95新' },
                { label: '9成新', value: '9成新' },
                { label: '8成新', value: '8成新' },
                { label: '其他', value: '其他' },
              ]}
              placeholder="选择成色"
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="售价"
            name="price"
            rules={[{ required: true, message: '请输入售价' }]}
          >
            <InputNumber
              placeholder="请输入售价"
              min={0}
              precision={2}
              addonBefore="¥"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="原价"
            name="originalPrice"
            rules={[{ required: true, message: '请输入原价' }]}
          >
            <InputNumber
              placeholder="请输入原价"
              min={0}
              precision={2}
              addonBefore="¥"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </div>

        <Form.Item
          label="商品描述"
          name="description"
          rules={[{ required: true, message: '请输入商品描述' }]}
        >
          <TextArea
            placeholder="请详细描述商品的使用情况、配件信息等"
            maxLength={500}
            showCount
            rows={4}
          />
        </Form.Item>
      </Form>

      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="预览图片" className="w-full" src={previewImage} />
      </Modal>
    </Modal>
  );
};

export default PublishForm;