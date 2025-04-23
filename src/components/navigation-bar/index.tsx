import { getNotifyFeedback, getNotifyFeedbackResponse } from '@/api';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import { useBoolean } from 'ahooks';
import { Drawer } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import showLoginModal from '../login-popup';
export const NavigationBar = () => {
  const navigate = useNavigate();
  const isPassAccess = localStorage.getItem('token');
  const [notifyList, setNotifyList] = useState<
    getNotifyFeedbackResponse['data']
  >([]);

  const [open, { setTrue: setOpenTrue, setFalse: setOpenFalse }] =
    useBoolean(false);

  useEffect(() => {
    if (isPassAccess) {
      // getNotifyFeedback().then((res) => {
      //   setNotifyList(res.data);
      // });
    }
  }, [isPassAccess]);

  const entryList = useMemo(() => {
    const list = [
      {
        text: '登录',
        route: '/login',
      },
      {
        text: '个人中心',
        route: '/personal',
      },
      {
        text: '通知',
        route: '/notify',
      },
      {
        text: '发布活动',
        route: '/publish',
      },
    ];
    if (isPassAccess) {
      delete list[0];
      return list;
    } else {
      return [list.shift()];
    }
  }, [isPassAccess]);

  return (
    <>
      {/* 顶部导航栏 */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between ">
            <MenuUnfoldOutlined
              className="text-indigo-600 text-[30px] sm:hidden cursor-pointer"
              onClick={setOpenTrue}
            />

            <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-wider hover:scale-105 transition-transform cursor-pointer hidden sm:block">
              校园信息交流平台
            </h1>

            {/* 移动端菜单按钮 */}
            {isPassAccess && (
              <div className="flex items-center gap-5 sm:hidden">
                <div
                  onClick={() => navigate('/publish')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center group"
                >
                  <svg
                    className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>发布</span>
                </div>
              </div>
            )}

            {/* 桌面端导航 */}
            <div className="hidden sm:flex items-center space-x-8">
              {isPassAccess && (
                <div
                  onClick={() => navigate('/publish')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center group"
                >
                  <svg
                    className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>发布</span>
                </div>
              )}
              {/* 消息通知图标 */}
              {isPassAccess && (
                <div
                  className="relative cursor-pointer group"
                  onClick={() => {
                    navigate('/notify');
                  }}
                >
                  <svg
                    className="w-6 h-6 text-indigo-600 hover:text-purple-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {notifyList.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {notifyList.length}
                    </span>
                  )}
                  {/* 悬浮提示框 */}
                  {notifyList.length > 0 && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-10 invisible group-hover:visible transition-all duration-300">
                      {notifyList.map((item) => {
                        return (
                          <div
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                            key={item.id}
                          >
                            <p className="text-sm text-gray-600">
                              {item.reply}
                            </p>
                            <span className="text-xs text-gray-400">
                              {item.createTime}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
              {/* 头像 */}
              {/* {isPassAccess && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer"></div>
              )} */}
              <div
                className="flex items-center space-x-2 text-indigo-600 hover:text-purple-600 transition-colors cursor-pointer"
                onClick={() => {
                  navigate('/personal');
                }}
              >
                <span className="text-lg font-medium">
                  {isPassAccess ? '个人中心' : '登录'}
                </span>
                {isPassAccess ? (
                  <svg
                    className="w-5 h-5"
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
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* 抽屉 */}
            <Drawer
              title={
                <div className="justify-between items-center flex">
                  <span className="text-lg font-medium text-indigo-600">
                    入口中心
                  </span>

                  <MenuFoldOutlined
                    className="text-indigo-600 text-[25px] sm:hidden cursor-pointer"
                    onClick={setOpenFalse}
                  />
                </div>
              }
              closable={false}
              onClose={setOpenFalse}
              open={open}
              placement="left"
              className="rounded-r-xl"
              width={window.innerWidth > 640 ? 320 : '75%'}
              styles={{
                body: {
                  padding: '12px',
                },
              }}
            >
              <div className="space-y-1.5">
                {entryList.map((item) => (
                  <div
                    key={item?.text}
                    onClick={() => {
                      if (item) {
                        if (
                          item.route === '/publish' ||
                          item.route === '/notify'
                        ) {
                          if (!localStorage.getItem('token')) {
                            showLoginModal();
                            return;
                          }
                        }
                        navigate(item.route);
                        setOpenFalse();
                      }
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-50 cursor-pointer transition-colors group"
                  >
                    <span className="text-gray-600 group-hover:text-indigo-600 transition-colors text-base font-medium">
                      {item?.text}
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors ml-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </>
  );
};
