import {
  getAllActivity,
  getAllActivityResponse,
  getAllCademic,
  getAllCampus,
  getAllTags,
  getAllTutor,
} from '@/api';
import { NavigationBar, showLoginModal, TitleWrapperCard } from '@/components';
import { joinUrlParams } from '@/utils';
import {
  CommentOutlined,
  CustomerServiceOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import { Carousel, message } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { NoticeBar } from 'react-vant';
import { ActivityCard, AiFloatCircle } from './components';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<getAllActivityResponse['data']>([]);
  const totalNumber = useRef<number>(0);

  // 教育通知
  const [eduNotices, setEduNotices] = useState<getAllActivityResponse['data']>(
    [],
  );

  const [tutor, setTutor] = useState<getAllActivityResponse['data']>([]);

  const handleClickToDetail = (id: number) => {
    if (!localStorage.getItem('token')) {
      message.warning('请先登录');
      showLoginModal();
      return;
    }

    navigate(
      joinUrlParams('/detail', {
        id,
      }),
    );
  };

  const handleClickToList = () => {
    if (!localStorage.getItem('token')) {
      message.warning('请先登录');
      showLoginModal();
      return;
    }
    navigate('/list');
  };

  const tagList = useMemo(() => {
    const list = [
      {
        title: '网站反馈',
        icon: <CommentOutlined className="text-2xl" />,
        onClick: () => {
          navigate('/feedback');
        },
      },
      {
        title: '在线聊天',
        icon: <CustomerServiceOutlined className="text-2xl" />,
        onClick: () => {
          navigate('/chat');
        },
      },
      {
        title: '资源库工具',
        icon: <ToolOutlined className="text-2xl" />,
        onClick: () => {
          navigate('/onlineToolbox');
        },
      },
    ];
    return list;
  }, [navigate]);

  useEffect(() => {
    getAllCampus().then((res) => {
      const { data, totalCount } = res;
      setList(data);
      totalNumber.current = totalCount;
    });

    getAllCademic().then((res) => {
      const { data } = res;
      setEduNotices(data.slice(0, 9));
    });

    getAllTutor().then((res) => {
      const { data } = res;
      setTutor(data.slice(0, 9));
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <NavigationBar />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-6">
        {/* 公告栏 - 减小高度和间距 */}
        <div className="mb-4 sm:mb-6">
          <NoticeBar
            scrollable
            text="公告：ai助手上线了，限时免费体验，抓紧体验吧！同学们可以使用在此网站使用ai助手！关于近期考试安排的通知，请同学们查看教务通知"
            className="rounded-lg !bg-blue-50 !text-blue-600 border !border-blue-100 text-xs sm:text-sm"
            style={{
              '--rv-notice-bar-height': '32px',
              '--rv-notice-bar-padding': '0 10px',
            }}
            speed={60}
          />
        </div>

        {/* 服务卡片区 - 减小间距和文字大小 */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
              探索服务
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              便捷的校园生活，从这里开始
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {tagList.map((item) => (
              <div
                key={item.title}
                className="group bg-white rounded-lg p-3 sm:p-4 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-100 hover:shadow-md"
                onClick={item.onClick}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-white transition-colors flex-shrink-0">
                    <div className="text-blue-600 text-base sm:text-lg">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-medium text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      点击进入 →
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 通知和活动区域 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 sm:mb-10">
          {/* 教务通知 */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4">
              <h3 className="text-base font-medium text-gray-900">教务通知</h3>
            </div>
            {eduNotices.length > 0 ? (
              <Carousel
                autoplay
                dots={{ className: '!-bottom-1' }}
                draggable
                className="[&_.slick-dots_li.slick-active_button]:!bg-blue-500 [&_.slick-dots_li_button]:!bg-gray-300"
              >
                {Array.from({ length: Math.ceil(eduNotices.length / 3) }).map(
                  (_, index) => (
                    <div key={index} className="space-y-3 pb-8">
                      {eduNotices
                        .slice(index * 3, index * 3 + 3)
                        .map((notice) => (
                          <div
                            key={notice.id}
                            className="flex items-center justify-between py-2.5 hover:bg-gray-50 px-3 rounded-lg cursor-pointer"
                            onClick={() => handleClickToDetail(notice.id)}
                          >
                            <span className="text-sm text-gray-700 truncate flex-1">
                              {notice.title}
                            </span>
                            <span className="text-xs text-gray-500 ml-3">
                              {notice.createTime}
                            </span>
                          </div>
                        ))}
                    </div>
                  ),
                )}
              </Carousel>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 mb-4 text-gray-200">
                  <svg
                    className="w-full h-full"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h12v2H6zm0-3h12v2H6zm0 6h8v2H6z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">暂无通知</p>
              </div>
            )}
            <div className="text-center mt-7">
              <span
                className="inline-block px-6 py-2.5 text-sm text-blue-600 hover:text-blue-800 cursor-pointer bg-blue-50 hover:bg-blue-100 rounded-full transition-colors font-medium"
                onClick={handleClickToList}
              >
                查看更多相关通知 →
              </span>
            </div>
          </div>

          {/* 导员通知 */}
          <div className="bg-white rounded-lg border border-gray-100 p-4">
            <div className="mb-3">
              <h3 className="text-base font-medium text-gray-900">导员通知</h3>
            </div>
            {tutor.length > 0 ? (
              <Carousel
                autoplay
                dots={{ className: '!-bottom-1' }}
                draggable
                className="[&_.slick-dots_li.slick-active_button]:!bg-blue-500 [&_.slick-dots_li_button]:!bg-gray-300"
              >
                {Array.from({ length: Math.ceil(tutor.length / 3) }).map(
                  (_, index) => (
                    <div key={index} className="space-y-2 pb-6">
                      {tutor.slice(index * 3, index * 3 + 3).map((notice) => (
                        <div
                          key={notice.id}
                          className="flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded cursor-pointer"
                          onClick={() => handleClickToDetail(notice.id)}
                        >
                          <span className="text-sm text-gray-700 truncate flex-1">
                            {notice.title}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {notice.createTime}
                          </span>
                        </div>
                      ))}
                    </div>
                  ),
                )}
              </Carousel>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 mb-4 text-gray-200">
                  <svg
                    className="w-full h-full"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h12v2H6zm0-3h12v2H6zm0 6h8v2H6z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">暂无通知</p>
              </div>
            )}
            <div className="text-center mt-6">
              <span
                className="inline-block px-6 py-2.5 text-sm text-blue-600 hover:text-blue-800 cursor-pointer bg-blue-50 hover:bg-blue-100 rounded-full transition-colors font-medium"
                onClick={handleClickToList}
              >
                查看更多相关通知 →
              </span>
            </div>
          </div>

          {/* 最新活动区 */}
          <div>
            <TitleWrapperCard
              title="校园动态"
              isShowAllEntry
              allEntryCb={handleClickToList}
              className="!bg-transparent !shadow-none !p-0"
            >
              <div className="grid grid-cols-1 gap-3">
                {list.slice(0, 3).map((item) => (
                  <ActivityCard
                    key={item.id}
                    {...item}
                    className="bg-white rounded-lg border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-300"
                  />
                ))}
              </div>
            </TitleWrapperCard>
          </div>
        </div>

        {/* 介绍区域 - 减小内边距和文字大小 */}
        {/* <div className="rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-4 sm:p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
              智慧校园新体验
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 mb-4 sm:mb-6">
              打造智能化的校园服务平台，为您提供便捷的学习和生活体验
            </p>
            <div
              onClick={() => navigate('/chat')}
              className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              立即体验
            </div>
          </div>
        </div> */}
      </div>

      <AiFloatCircle />
    </div>
  );
};

export default HomePage;
