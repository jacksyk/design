import { Back } from '@/components';
import { useBoolean } from 'ahooks';
import {
  Avatar,
  Button,
  Card,
  Empty,
  Input,
  message,
  Select,
  Space,
  Tag,
  theme,
} from 'antd';
import { useState } from 'react';

const { Search } = Input;

type Product = {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  description: string;
  images: string[];
  category: string;
  condition: string;
  seller: {
    name: string;
    avatar: string;
  };
  createdAt: string;
};

const mockProducts: Product[] = [
  {
    id: '1',
    title: '二手 MacBook Pro 2021',
    price: 8999,
    originalPrice: 12999,
    description:
      '95新，无维修史，电池健康度90%，充电次数180次，配件齐全，原装充电器',
    images: ['https://picsum.photos/seed/1/800/600'],
    category: '电子产品',
    condition: '95新',
    seller: {
      name: '张三',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    },
    createdAt: '2024-03-15',
  },
  {
    id: '2',
    title: '高等数学第七版 同济大学',
    price: 25,
    originalPrice: 48,
    description: '几乎全新，只翻过几次，无笔记，适合考研',
    images: ['https://picsum.photos/seed/2/800/600'],
    category: '书籍教材',
    condition: '99新',
    seller: {
      name: '李四',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    },
    createdAt: '2024-03-14',
  },
  {
    id: '3',
    title: 'Nike Air Zoom 跑步鞋',
    price: 299,
    originalPrice: 799,
    description: '穿过几次，尺码42.5，适合跑步健身',
    images: ['https://picsum.photos/seed/3/800/600'],
    category: '运动器材',
    condition: '9成新',
    seller: {
      name: '王五',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    },
    createdAt: '2024-03-13',
  },
  {
    id: '4',
    title: '宿舍神器小台灯',
    price: 39,
    originalPrice: 89,
    description: '可充电，三档调光，触控开关，用了一学期',
    images: ['https://picsum.photos/seed/4/800/600'],
    category: '生活用品',
    condition: '8成新',
    seller: {
      name: '小明',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    },
    createdAt: '2024-03-12',
  },
  {
    id: '5',
    title: 'iPad Air 4 64G',
    price: 2999,
    originalPrice: 4799,
    description: '去年购入，保修还有半年，配件齐全，带笔',
    images: ['https://picsum.photos/seed/5/800/600'],
    category: '电子产品',
    condition: '95新',
    seller: {
      name: '小红',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
    },
    createdAt: '2024-03-11',
  },
];

const categories = [
  '全部',
  '电子产品',
  '书籍教材',
  '生活用品',
  '运动器材',
  '其他',
];

const conditions = ['全部', '全新', '99新', '95新', '9成新', '8成新', '其他'];

// 添加导入
import PublishForm from './components/PublishForm';

const SecondHandTransactions = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedCondition, setSelectedCondition] = useState('全部');
  const [products] = useState<Product[]>(mockProducts);
  const [isDarkMode, setIsDarkMode] = useBoolean(false);
  const [showPublishForm, setShowPublishForm] = useState(false);

  const { token } = theme.useToken();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory =
      selectedCategory === '全部' || product.category === selectedCategory;
    const matchesCondition =
      selectedCondition === '全部' || product.condition === selectedCondition;
    return matchesSearch && matchesCategory && matchesCondition;
  });

  const handlePublish = (values: any) => {
    console.log('发布商品:', values);
    // TODO: 调用接口发布商品
    message.success('发布成功！');
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      {/* 顶部导航栏 */}
      <div
        className={`sticky top-0 z-10 p-4 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-sm backdrop-blur-sm bg-opacity-90`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Back className="text-lg" />
              <h1
                className={`text-xl font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}
              >
                校园二手交易
              </h1>
            </div>
            <Button
              type="primary"
              size="middle"
              onClick={() => {
                // TODO: 跳转到发布页面
              }}
              className={`px-6 ${
                isDarkMode ? 'bg-blue-500 hover:bg-blue-600 border-none' : ''
              }`}
            >
              <Button
                type="primary"
                size="middle"
                onClick={() => setShowPublishForm(true)}
                className={`px-6 ${
                  isDarkMode ? 'bg-blue-500 hover:bg-blue-600 border-none' : ''
                }`}
              >
                发布商品
              </Button>
            </Button>
          </div>
        </div>
      </div>

      {/* 搜索和筛选区 */}
      <div className="max-w-6xl mx-auto p-4 sm:px-6">
        <Space direction="vertical" size="middle" className="w-full">
          <Search
            placeholder="搜索商品..."
            allowClear
            enterButton
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={`max-w-xl ${isDarkMode ? 'dark' : ''}`}
          />
          <Space wrap className="w-full justify-start">
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              style={{ width: 120 }}
              options={categories.map((cat) => ({ label: cat, value: cat }))}
              className={isDarkMode ? 'dark' : ''}
              placeholder="选择分类"
            />
            <Select
              value={selectedCondition}
              onChange={setSelectedCondition}
              style={{ width: 120 }}
              options={conditions.map((cond) => ({ label: cond, value: cond }))}
              className={isDarkMode ? 'dark' : ''}
              placeholder="选择成色"
            />
          </Space>
        </Space>
      </div>

      {/* 商品列表 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                hoverable
                cover={
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      alt={product.title}
                      src={product.images[0]}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                }
                className={`overflow-hidden border ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                    : 'hover:border-gray-300'
                }`}
              >
                <Card.Meta
                  title={
                    <div className="flex justify-between items-start gap-2">
                      <span
                        className={`text-lg font-medium truncate flex-1 ${
                          isDarkMode ? 'text-white' : ''
                        }`}
                      >
                        {product.title}
                      </span>
                      <Tag color={token.colorPrimary}>{product.condition}</Tag>
                    </div>
                  }
                  description={
                    <div className="space-y-3 mt-2">
                      <p
                        className={`line-clamp-2 text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center gap-2">
                          <Avatar src={product.seller.avatar} size="small" />
                          <span
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            {product.seller.name}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-red-500 text-lg font-medium">
                            ¥{product.price}
                          </span>
                          <span
                            className={`text-xs line-through ${
                              isDarkMode ? 'text-gray-500' : 'text-gray-400'
                            }`}
                          >
                            ¥{product.originalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  }
                />
              </Card>
            ))}
          </div>
        ) : (
          <Empty
            description={
              <span className={isDarkMode ? 'text-gray-400' : ''}>
                暂无相关商品
              </span>
            }
            className="py-20"
          />
        )}
      </div>

      {/* 添加发布表单 */}
      <PublishForm
        open={showPublishForm}
        onClose={() => setShowPublishForm(false)}
        onSubmit={handlePublish}
      />
    </div>
  );
};

export default SecondHandTransactions;
