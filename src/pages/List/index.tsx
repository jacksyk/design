import { getAllActivity, getAllActivityResponse } from '@/api';
import { useNavigate } from '@umijs/max';
import { Input, Select, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { ActivityCard } from '../Home/components';

const ListPage: React.FC = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<getAllActivityResponse['data']>([]);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [filter, setFilter] = useState('all');
  const [_page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchList = async (currentPage: number, searchContent: string = '') => {
    try {
      setLoading(true);
      const res = await getAllActivity({
        limit: 5,
        page: currentPage,
        searchContent,
      });
      if (currentPage === 1) {
        setList(res.data);
      } else {
        setList((prev) => [...prev, ...res.data]);
      }
      setHasMore(res.data.length === 5);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    const timer = setTimeout(() => {
      fetchList(1, searchKey);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchKey, filter]);

  // 添加滚动监听
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      // 判断是否到底
      if (scrollHeight - scrollTop - clientHeight < 100) {
        setPage((prev) => {
          fetchList(prev + 1, searchKey);
          return prev + 1;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, searchKey]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* 页面标题 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-4">
            <div
              onClick={() => navigate(-1)}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-xl shadow-sm hover:shadow-md cursor-pointer group transition-all duration-300"
            >
              <svg
                className="w-5 h-5 text-indigo-600 group-hover:-translate-x-1 transition-transform"
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
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                全部活动
              </h1>
              <p className="text-gray-500 text-sm sm:text-base mt-1">
                浏览所有校园活动信息
              </p>
            </div>
          </div>
        </div>

        {/* 搜索和筛选区 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-auto flex-1">
              <Input.Search
                placeholder="搜索活动标题..."
                allowClear
                size="large"
                className="w-full"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </div>
            <Select
              value={filter}
              onChange={setFilter}
              size="large"
              className="w-full sm:w-[180px]"
              options={[
                { label: '全部类型', value: 'all' },
                { label: '学术活动', value: 'academic' },
                { label: '文体活动', value: 'sports' },
                { label: '志愿服务', value: 'volunteer' },
                { label: '其他活动', value: 'other' },
              ]}
              suffixIcon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              }
            />
          </div>
        </div>

        {/* 活动列表 */}
        <div className="relative min-h-[200px]">
          <div className="space-y-4 sm:space-y-6">
            {list.map((item) => (
              <ActivityCard key={item.id} {...item} />
            ))}
            {loading && (
              <div className="flex justify-center py-4">
                <Spin />
              </div>
            )}
            {!loading && list.length === 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center">
                <div className="text-gray-400 mb-2">
                  <svg
                    className="w-12 h-12 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">暂无相关活动</p>
                <p className="text-gray-400 text-sm mt-1">试试更换搜索关键词</p>
              </div>
            )}
            {!loading && !hasMore && list.length > 0 && (
              <div className="text-center py-4 text-gray-400">
                没有更多活动了
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
