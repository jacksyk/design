import {
  getPersonalInfo,
  updatePersonalInfo,
  uploadFile,
  UserInfoReponse,
} from '@/api';
import { AdvancedCropper, TitleWrapperCard } from '@/components';
import { joinUrlParams } from '@/utils';
import { useNavigate } from '@umijs/max';
import { useMemoizedFn, useMount } from 'ahooks';
import { message, Modal } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useRef, useState } from 'react';

const PersonalPage: React.FC = () => {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState<{
    avatar: string | undefined;
    email: string | undefined;
    username: string | undefined;
    password: string | undefined;
    introduction: string | undefined;
    college: string | undefined;
    contact: string | undefined;
  }>({
    avatar: undefined,
    email: undefined,
    username: undefined,
    password: undefined,
    introduction: undefined,
    college: undefined,
    contact: undefined,
  });

  const saveRef = useRef<HTMLDivElement>(null);

  const [templateUrl, setTemplateUrl] = useState('');

  const [userInfo, setUserInfo] = useState<UserInfoReponse['data']>({
    avatar: '',
    email: '',
    username: '',
    introduction: '',
    college: '',
    contact: '',
    student_id: 0,
    activities: [],
    feedback: [],
    collectionCount: 0,
    likesCount: 0,
    password: '',
  });

  /** 是否展示编辑内容 */
  const [isShowEdit, setIsShowEdit] = useState(false);

  /** 展示编辑头像的modal */
  const [isShowModal, setIsShowModal] = useState(false);

  useMount(() => {
    getPersonalInfo().then((res) => {
      setUserInfo(res.data);
      setFormValue({
        avatar: res.data.avatar,
        college: res.data.college,
        contact: res.data.contact,
        email: res.data.email,
        introduction: res.data.introduction,
        username: res.data.username,
        password: res.data.password,
      });
    });
  });

  const handleUploadAvatar = useMemoizedFn(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          /** 生成临时预览url */
          const tempUrl = URL.createObjectURL(file);

          setTemplateUrl(tempUrl);

          setIsShowModal(true);

          input.remove();
        } catch (error) {
          console.log('error', error);
        }
      }
    };
    input.click();
  });

  const handleClickEdit = useCallback(() => {
    setIsShowEdit(true);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  const handleCropImage = useMemoizedFn(async (file: File) => {
    const url = await uploadFile({
      file,
    });
    setFormValue({
      ...formValue,
      avatar: url,
    });
  });

  const handleUploadFile = useMemoizedFn(() => {
    updatePersonalInfo(formValue)
      .then(() => {
        message.success('更新成功');
        getPersonalInfo().then((res) => {
          setUserInfo(res.data);
        });
      })
      .catch(() => {
        message.error('更新失败');
      });
  });

  const handleBack = useCallback(() => {
    if (isShowEdit) {
      setIsShowEdit(false);
    } else {
      navigate(-1);
    }
  }, [isShowEdit, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* 页面标题和返回按钮 */}
        <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-2xl mb-6 sm:mb-8 p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              onClick={handleBack}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 p-2.5 rounded-xl shadow-sm hover:shadow-md cursor-pointer group transition-all duration-300"
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
                个人中心
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                管理你的个人信息和动态
              </p>
            </div>
          </div>
        </div>

        {/* 原有的个人信息卡片 */}
        {/* 个人信息卡片 */}
        {!isShowEdit && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 sm:p-8 mb-4 sm:mb-8 animate__animated animate__bounceInLeft">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col sm:flex-row items-center sm:space-x-6 text-center sm:text-left">
                <div className="relative group">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br  border-white shadow mb-4 sm:mb-0">
                    <img
                      src={userInfo.avatar}
                      alt=""
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-indigo-800 mb-1 sm:mb-2">
                    {userInfo.username}
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base mb-1">
                    {userInfo.college}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    个人简介：{userInfo.introduction}
                  </p>
                </div>
              </div>
              <div>
                <div
                  className="flex items-center gap-2 px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                  onClick={handleClickEdit}
                >
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  编辑资料
                </div>

                <div
                  className="flex mt-[10px] cursor-pointer items-center gap-2 px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                  onClick={handleLogout}
                >
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  退出登陆
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 个人数据统计 */}
        {!isShowEdit && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8 animate__animated animate__bounceInRight">
            {[
              { label: '我的活动', count: userInfo.activities.length },
              { label: '我的收藏', count: userInfo.collectionCount },
              { label: '我的点赞', count: userInfo.likesCount },
              { label: '我的反馈', count: userInfo.feedback.length },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="text-xl sm:text-2xl font-bold text-indigo-600 mb-1 sm:mb-2">
                  {item.count}
                </div>
                <div className="text-gray-600 text-sm sm:text-base">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 我的活动 */}
        {!isShowEdit && (
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-8 mb-4 sm:mb-8 animate__animated animate__bounceInLeft">
            <h3 className="text-lg sm:text-xl font-bold text-indigo-800 mb-4 sm:mb-6">
              我的活动
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {userInfo.activities.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between border-b border-gray-100 pb-4"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-indigo-50 flexCenter">
                      <span className="text-indigo-600 text-sm">活动</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {dayjs(item.created_at).format('YYYY-MM-DD')}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-indigo-500 cursor-pointer hover:text-indigo-600 text-sm sm:text-base self-end sm:self-auto"
                    onClick={() => {
                      navigate(
                        joinUrlParams('/detail', {
                          id: item.id,
                        }),
                      );
                    }}
                  >
                    查看详情
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 我的收藏 */}
        {/* {!isShowEdit && (
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-8 animate__animated animate__bounceInRight">
            <h3 className="text-lg sm:text-xl font-bold text-indigo-800 mb-4 sm:mb-6">
              我的反馈
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="border-l-4 border-indigo-400 bg-gray-50 p-4 sm:p-6 rounded-r-xl hover:shadow-md transition-all duration-300"
                >
                  <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">
                    关于举办编程马拉松比赛的通知
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                    诚邀各位同学参加本次编程马拉松比赛，展示你的编程实力...
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500">
                    <span>2024-01-15</span>
                    <div className="flex items-center space-x-4">
                      <span>浏览: 89</span>
                      <span>评论: 12</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* 编辑信息 */}
        {isShowEdit && (
          <TitleWrapperCard
            title="修改个人信息"
            className="animate__animated animate__fadeInUp max-w-3xl mx-auto"
          >
            <div className="space-y-6 py-4">
              {/* 头像上传 */}
              <div className="flex flex-col items-center gap-4 pb-6 border-b border-gray-100">
                <div className="relative group">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br  border-4 border-white shadow-lg overflow-hidden">
                    {formValue.avatar && (
                      <img
                        src={formValue.avatar}
                        alt="头像"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div
                    onClick={handleUploadAvatar}
                    className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-gray-500">点击更换头像</p>
              </div>

              {/* 基本信息 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    姓名
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="请输入姓名"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormValue({
                        ...formValue,
                        username: e.target.value,
                      });
                    }}
                    value={formValue.username}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    学院
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="请输入所属学院"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormValue({
                        ...formValue,
                        college: e.target.value,
                      });
                    }}
                    value={formValue.college}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    个人简介
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2.5 text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                    placeholder="请输入个人简介"
                    onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      setFormValue({
                        ...formValue,
                        introduction: e.target.value,
                      });
                    }}
                    value={formValue.introduction}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    联系方式
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="请输入联系方式"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormValue({
                        ...formValue,
                        contact: e.target.value,
                      });
                    }}
                    value={formValue.contact}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    邮箱
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="请输入邮箱地址"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormValue({
                        ...formValue,
                        email: e.target.value,
                      });
                    }}
                    value={formValue.email}
                  />
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                <div
                  onClick={() => setIsShowEdit(false)}
                  className="px-6 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  取消
                </div>
                <div
                  onClick={() => {
                    // 处理保存逻辑
                    setIsShowEdit(false);
                    handleUploadFile();
                  }}
                  className="px-6 py-2.5 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  保存修改
                </div>
              </div>
            </div>
          </TitleWrapperCard>
        )}

        <Modal
          open={isShowModal}
          onOk={() => {
            setIsShowModal(false);
            saveRef.current?.click();
          }}
          onCancel={() => {
            setIsShowModal(false);
          }}
        >
          <AdvancedCropper
            url={templateUrl}
            saveRef={saveRef}
            onOk={handleCropImage}
          ></AdvancedCropper>
        </Modal>
      </div>
    </div>
  );
};

export default PersonalPage;
