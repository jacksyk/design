import { translateJson } from '@/api';
import { Back } from '@/components';
import { Button, Input, message } from 'antd';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface GenerateResponse {
  code: string;
  message: string;
  data: string;
}

const AutoGenerate = () => {
  const [formValue, setFormValue] = useState({
    url: '',
    type: 'query',
    params: '',
    method: 'get',
    responseName: '',
  });
  const [showText, setShowText] = useState('');

  const handleFormChange = (key: keyof typeof formValue, value: string) => {
    setFormValue((prev) => ({ ...prev, [key]: value }));
  };

  const handleBtnClick = () => {
    translateJson({
      ...formValue,
      params: JSON.parse(formValue.params) ?? '',
    }).then((res: GenerateResponse) => {
      message.success('生成成功');
      setShowText(res.data);
      console.log('res.data', res.data);
    });
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Back />
          <h1 className="text-2xl font-semibold text-gray-900">类型生成器</h1>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
            {/* URL 输入框 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                接口地址 <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="请输入需要解析的接口地址"
                value={formValue.url}
                onChange={(e) => handleFormChange('url', e.target.value)}
                className="rounded-lg"
              />
            </div>

            {/* 请求方法选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                请求方法 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                {['get', 'post', 'put', 'delete'].map((m) => (
                  <Button
                    key={m}
                    type={formValue.method === m ? 'primary' : 'default'}
                    onClick={() => handleFormChange('method', m)}
                    className="rounded-lg capitalize"
                  >
                    {m}
                  </Button>
                ))}
              </div>
            </div>

            {/* 参数类型选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                参数类型 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                {[
                  { value: 'query', label: 'Query 参数' },
                  { value: 'body', label: 'Body 参数' },
                ].map((item) => (
                  <Button
                    key={item.value}
                    type={formValue.type === item.value ? 'primary' : 'default'}
                    onClick={() => handleFormChange('type', item.value)}
                    className="rounded-lg"
                    disabled={
                      formValue.method === 'get' && item.value === 'body'
                    }
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* 参数输入框 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                请求参数 <span className="text-red-500">*</span>
              </label>
              <Input.TextArea
                placeholder='请输入 JSON 格式的参数，例如：&#10;{&#10;  "key": "value"&#10;}'
                value={formValue.params}
                onChange={(e) => handleFormChange('params', e.target.value)}
                className="rounded-lg"
                rows={4}
              />
            </div>

            {/* 返回类型名称 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                返回类型名称
              </label>
              <Input
                placeholder="请输入期望的返回类型名称（选填）"
                value={formValue.responseName}
                onChange={(e) =>
                  handleFormChange('responseName', e.target.value)
                }
                className="rounded-lg"
              />
            </div>

            <Button
              type="primary"
              onClick={handleBtnClick}
              className="w-full rounded-lg"
            >
              生成类型定义
            </Button>
          </div>

          {/* 结果展示区域不变 */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">生成结果</h3>
              <CopyToClipboard
                text={showText}
                onCopy={() => message.success('复制成功')}
              >
                <Button type="text">复制代码</Button>
              </CopyToClipboard>
            </div>
            <pre className="bg-gray-50 rounded-lg p-4  min-h-[400px]">
              {/* 这里展示生成的类型定义 */}
              {showText}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoGenerate;
