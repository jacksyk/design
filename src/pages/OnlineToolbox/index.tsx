import { AllToolTypes, getAllTags, getAllTool } from '@/api';
import { Back } from '@/components';
import { BookOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import { useMount } from 'ahooks';
import { Button, Card, Empty, Input, Space, Tabs, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';

type TagType = {
  key: string;
  label: string;
};

const OnlineToolbox = () => {
  const [searchText, setSearchText] = useState('');
  const [activeTag, setActiveTag] = useState<string>();
  const [tags, setTags] = useState<TagType[]>([]);
  const [tools, setTools] = useState<AllToolTypes[]>([]);
  const allToolsBuffer = useRef<AllToolTypes[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTag) {
      if (activeTag === 'all') {
        setTools(allToolsBuffer.current);
        return;
      }
      const activeTagVal = Number.parseInt(activeTag);
      setTools(
        allToolsBuffer.current.filter((tool) =>
          tool.tags.some((tag) => tag.id === activeTagVal),
        ),
      );
    }
  }, [activeTag]);

  useMount(() => {
    getAllTags().then((res) => {
      const tags = res.map((item) => ({
        key: item.id.toString(),
        label: item.name,
      }));
      tags.unshift({
        key: 'all',
        label: '全部',
      });
      setTags(tags);
      setActiveTag(tags[0].key.toString());
    });
    getAllTool().then((res) => {
      setTools(res);
      allToolsBuffer.current = res;
    });
  });

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 背景图案 */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none" />

      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-10 p-4 bg-white/80 shadow-sm backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Back className="text-lg mb-0" />
              <h1 className="text-xl font-medium text-gray-800">在线工具箱</h1>
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/uploadFile')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              分享资源
            </Button>
          </div>
        </div>
      </div>

      {/* 搜索区域 */}
      <div className="max-w-6xl mx-auto p-4">
        <Input.Search
          placeholder="搜索工具..."
          allowClear
          disabled
          size="large"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="max-w-xl shadow-sm"
        />
      </div>

      {/* 分类标签页 */}
      <div className="max-w-6xl mx-auto px-4">
        <Tabs
          activeKey={activeTag}
          onChange={setActiveTag}
          items={tags}
          className="bg-white/60 px-4 rounded-lg backdrop-blur-sm"
        />
      </div>

      {/* 工具卡片列表 */}
      {tools.length > 0 ? (
        <div className="max-w-6xl mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <Card
                key={tool.id}
                hoverable
                className="h-full bg-white/80 backdrop-blur-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                onClick={() => {
                  // TODO: 处理工具跳转
                  // console.log('跳转到:', tool.link);
                  window.open(tool.link);
                }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm">
                      {/* {tool.icon ?? ''} */}
                      <BookOutlined></BookOutlined>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-1 text-gray-800">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  <Space size={[0, 8]} wrap className="mt-3">
                    {tool.tags.map((tag) => (
                      <Tag key={tag.id} className="bg-white/60 border-blue-100">
                        {tag.name}
                      </Tag>
                    ))}
                  </Space>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Empty description="暂无资源" />
      )}
    </div>
  );
};

export default OnlineToolbox;
