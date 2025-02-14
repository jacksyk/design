import {
  addCollections,
  addLikes,
  addViews,
  commentResponse,
  getComments,
  getOneActivity,
  getOneActivityResponse,
  sendCommentToServer,
} from '@/api';
import { Back } from '@/components';
import { useSearchParams } from '@umijs/max';
import { useMemoizedFn, useMount } from 'ahooks';
import { message } from 'antd';
import { useState } from 'react';

const DetailPage: React.FC = () => {
  const [params] = useSearchParams();
  const id = params.get('id');
  const [getOneActivityResponse, setGetOneActivityResponse] = useState<
    getOneActivityResponse['data'] | undefined
  >();

  const [comments, setComments] = useState<commentResponse>([]);

  const [isLiked, setIsLiked] = useState(false);
  const [isCollected, setIsCollected] = useState(false);

  const [commentInput, setCommentInput] = useState('');

  const {
    collections,
    createTime,
    description,
    likes,
    title,
    username,
    views,
    avatar,
  } = getOneActivityResponse ?? {};

  const resetComment = useMemoizedFn(() => {
    if (id) {
      getComments({
        activityId: +id,
      }).then((res) => setComments(res));
    }
  });

  const handleLikeClick = useMemoizedFn(() => {
    if (id) {
      addLikes({
        activityId: +id,
      }).then((res) => {
        // 代表取消点赞成功
        if (res.data.data === '0') {
          setGetOneActivityResponse((prev) => {
            if (prev) {
              return {
                ...prev,
                likes: prev.likes - 1,
              };
            }
          });
          return;
        }
        setGetOneActivityResponse((prev) => {
          if (prev) {
            return {
              ...prev,
              likes: prev.likes + 1,
            };
          }
        });
      });
    }
    setIsLiked(!isLiked);
  });

  const handleCollectClick = useMemoizedFn(() => {
    if (id) {
      addCollections({
        activityId: +id,
      }).then((res) => {
        // 代表取消点赞成功
        if (res.data.data === '0') {
          setGetOneActivityResponse((prev) => {
            if (prev) {
              return {
                ...prev,
                collections: prev.collections - 1,
              };
            }
          });
          return;
        }
        setGetOneActivityResponse((prev) => {
          if (prev) {
            return {
              ...prev,
              collections: prev.collections + 1,
            };
          }
        });
      });
    }
    setIsCollected(!isCollected);
  });

  const sendComment = useMemoizedFn(() => {
    if (id) {
      sendCommentToServer({
        activityId: +id,
        content: commentInput,
      })
        .then(() => {
          setCommentInput('');
          message.success('评论成功');
          resetComment();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  useMount(() => {
    window.scrollTo({
      top: 0,
    });
    if (id) {
      getOneActivity({
        activityId: +id,
      }).then((res) => {
        setGetOneActivityResponse(res.data);
        setIsLiked(res.data.isLiked);
        setIsCollected(res.data.isCollected);
        // 每次成功看到内容，都请求一次view
        addViews({
          activityId: +id,
        });
      });
      getComments({
        activityId: +id,
      }).then((res) => setComments(res));
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Back></Back>
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-8">
          {/* 标题和分类 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-indigo-800">
              {title}
            </h1>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm self-start sm:self-auto">
              学术交流
            </span>
          </div>

          {/* 作者信息 */}
          <div className="flex items-center space-x-3 mb-6 sm:mb-8">
            {!avatar && (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 flexCenter text-sm">
                用户
              </div>
            )}

            {avatar && (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full  flexCenter text-sm">
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full h-full rounded-full"
                />
              </div>
            )}

            <div>
              <h3 className="font-medium text-gray-800 text-sm sm:text-base">
                {username}
              </h3>
              <span className="text-xs sm:text-sm text-gray-500">
                发布于 {createTime}
              </span>
            </div>
          </div>

          {/* 内容 */}
          <div className="prose max-w-none mb-6 sm:mb-8">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>

          {/* 互动数据和操作 */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-6">
              <div
                onClick={handleLikeClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isLiked
                    ? 'bg-pink-50 text-pink-600 hover:bg-pink-100'
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                <svg
                  className={`w-5 h-5 transition-all duration-300 ${
                    isLiked
                      ? 'fill-pink-600 stroke-none scale-110'
                      : 'fill-none stroke-current'
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="text-sm font-medium">
                  {isLiked ? '已点赞' : '点赞'} {likes}
                </span>
              </div>

              <div
                onClick={handleCollectClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isCollected
                    ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                <svg
                  className={`w-5 h-5 transition-all duration-300 ${
                    isCollected
                      ? 'fill-yellow-600 stroke-none scale-110'
                      : 'fill-none stroke-current'
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <span className="text-sm font-medium">
                  {isCollected ? '已收藏' : '收藏'} {collections}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span>{views} 次浏览</span>
              </div>
            </div>
          </div>

          {/* 评论区 */}
          <div className="border-t pt-6 sm:pt-8">
            <h2 className="text-lg sm:text-xl font-bold text-indigo-800 mb-4 sm:mb-6">
              评论区
            </h2>

            {/* 评论输入框 */}
            <div className="mb-6 sm:mb-8">
              <textarea
                onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setCommentInput(e.target.value);
                }}
                value={commentInput}
                rows={4}
                placeholder="写下你的评论..."
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex justify-end mt-3 sm:mt-4">
                <div
                  className="bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base hover:bg-indigo-700 transition-colors duration-300"
                  onClick={sendComment}
                >
                  发表评论
                </div>
              </div>
            </div>

            {/* 评论列表 */}
            <div className="space-y-4 sm:space-y-6">
              {comments.map((item) => (
                <div
                  key={item.id}
                  className="border-l-4 border-gray-200 pl-3 sm:pl-4"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    {avatar ? (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flexCenter text-xs sm:text-sm">
                        <img
                          src={item.avatar}
                          alt=""
                          className="size-full rounded-[50%]"
                        />
                      </div>
                    ) : (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flexCenter text-xs sm:text-sm">
                        用户
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                      <span className="font-medium text-gray-800 text-sm sm:text-base">
                        {item.userName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {/* TODO:更换几个小时之前 */}
                        {item.createdTime}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    {item.content}
                  </p>

                  {/* TODO:代办 */}
                  {/* <div className="flex items-center space-x-4 mt-2 text-xs sm:text-sm text-gray-500">
                    <span className="cursor-pointer hover:text-indigo-600">
                      回复
                    </span>
                    <span className="cursor-pointer hover:text-indigo-600">
                      点赞
                    </span>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
