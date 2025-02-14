import { Back } from '@/components';
import {
  BookOutlined,
  CalculatorOutlined,
  ClockCircleOutlined,
  CodeOutlined,
  CompassOutlined,
  FileTextOutlined,
  LinkOutlined,
  TranslationOutlined,
} from '@ant-design/icons';
import { Card, Input, Space, Tabs, Tag } from 'antd';
import { useState } from 'react';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  category: string;
  link: string;
}

const tools: Tool[] = [
  {
    id: '1',
    title: '在线代码格式化',
    description: '支持多种语言的代码格式化工具',
    icon: <CodeOutlined className="text-2xl" />,
    tags: ['开发工具', '代码美化'],
    category: '开发工具',
    link: '/tools/code-formatter',
  },
  {
    id: '2',
    title: '文本比对工具',
    description: '快速对比两段文本的差异',
    icon: <FileTextOutlined className="text-2xl" />,
    tags: ['文本处理', '对比工具'],
    category: '文本工具',
    link: '/tools/text-diff',
  },
  {
    id: '3',
    title: '单位换算器',
    description: '常用单位换算工具',
    icon: <CalculatorOutlined className="text-2xl" />,
    tags: ['计算工具', '单位换算'],
    category: '实用工具',
    link: '/tools/unit-converter',
  },
  {
    id: '4',
    title: '在线翻译',
    description: '多语言在线翻译工具',
    icon: <TranslationOutlined className="text-2xl" />,
    tags: ['翻译', '语言工具'],
    category: '文本工具',
    link: '/tools/translator',
  },
  {
    id: '5',
    title: '时间计算器',
    description: '日期时间计算工具',
    icon: <ClockCircleOutlined className="text-2xl" />,
    tags: ['时间工具', '计算器'],
    category: '实用工具',
    link: '/tools/time-calculator',
  },
  {
    id: '6',
    title: '网址缩短器',
    description: '长网址转短链接工具',
    icon: <LinkOutlined className="text-2xl" />,
    tags: ['网址工具', 'URL'],
    category: '开发工具',
    link: '/tools/url-shortener',
  },
  {
    id: '7',
    title: '学习资源导航',
    description: '精选学习网站导航',
    icon: <CompassOutlined className="text-2xl" />,
    tags: ['学习', '导航'],
    category: '学习资源',
    link: '/tools/study-nav',
  },
  {
    id: '8',
    title: '考试倒计时',
    description: '考试日期提醒工具',
    icon: <BookOutlined className="text-2xl" />,
    tags: ['学习', '时间管理'],
    category: '学习资源',
    link: '/tools/exam-countdown',
  },
];

const categories = [
  { key: 'all', label: '全部工具' },
  { key: '开发工具', label: '开发工具' },
  { key: '文本工具', label: '文本工具' },
  { key: '实用工具', label: '实用工具' },
  { key: '学习资源', label: '学习资源' },
];

const OnlineToolbox = () => {
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(searchText.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchText.toLowerCase()) ||
      tool.tags.some((tag) =>
        tag.toLowerCase().includes(searchText.toLowerCase()),
      );
    const matchesCategory =
      activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 背景图案 */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none" />
      
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-10 p-4 bg-white/80 shadow-sm backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Back className="text-lg mb-0" />
            <h1 className="text-xl font-medium text-gray-800">在线工具箱</h1>
          </div>
        </div>
      </div>

      {/* 搜索区域 */}
      <div className="max-w-6xl mx-auto p-4">
        <Input.Search
          placeholder="搜索工具..."
          allowClear
          size="large"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="max-w-xl shadow-sm"
        />
      </div>

      {/* 分类标签页 */}
      <div className="max-w-6xl mx-auto px-4">
        <Tabs
          activeKey={activeCategory}
          onChange={setActiveCategory}
          items={categories}
          className="bg-white/60 px-4 rounded-lg backdrop-blur-sm"
        />
      </div>

      {/* 工具卡片列表 */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTools.map((tool) => (
            <Card
              key={tool.id}
              hoverable
              className="h-full bg-white/80 backdrop-blur-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300"
              onClick={() => {
                // TODO: 处理工具跳转
                console.log('跳转到:', tool.link);
              }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm">
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-1 text-gray-800">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-500">{tool.description}</p>
                  </div>
                </div>
                <Space size={[0, 8]} wrap className="mt-3">
                  {tool.tags.map((tag) => (
                    <Tag
                      key={tag}
                      className="bg-white/60 border-blue-100"
                    >
                      {tag}
                    </Tag>
                  ))}
                </Space>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnlineToolbox;
