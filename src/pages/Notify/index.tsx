import {
  getNotifyFeedbackResponse,
  getPersonFeedback,
  taggingReadNotify,
} from '@/api';
import { Back } from '@/components';
import { useMemoizedFn, useMount } from 'ahooks';
import { message } from 'antd';
import { groupBy } from 'lodash-es';
import { useCallback, useMemo, useRef, useState } from 'react';

const NotifyPage: React.FC = () => {
  const [notifyList, setNotifyList] = useState<
    getNotifyFeedbackResponse['data']
  >([]);

  const bufferListMap = useRef<Record<string, any>>({});
  const [tagIndex, setTagIndex] = useState<string>('all');

  const resetNotifyList = useMemoizedFn(
    (way: 'all' | 'pending' | 'resolved' | 'readed') => {
      getPersonFeedback().then((res) => {
        bufferListMap.current = groupBy(res.data, 'status');
        const willUpdateArray = [];
        if (way === 'all') {
          if (bufferListMap.current['resolved']?.length) {
            willUpdateArray.push(...bufferListMap.current['resolved']);
          }
          if (bufferListMap.current['pending']?.length) {
            willUpdateArray.push(...bufferListMap.current['pending']);
          }
          if (bufferListMap.current['readed']?.length) {
            willUpdateArray.push(...bufferListMap.current['readed']);
          }
          console.log(willUpdateArray, '>>>');
          setNotifyList(willUpdateArray);
        }

        if (way === 'pending') {
          if (bufferListMap.current['pending']?.length) {
            willUpdateArray.push(...bufferListMap.current['pending']);
          }
          setNotifyList(willUpdateArray);
        }

        if (way === 'resolved') {
          if (bufferListMap.current['resolved']?.length) {
            willUpdateArray.push(...bufferListMap.current['resolved']);
          }
          setNotifyList(willUpdateArray);
        }

        if (way === 'readed') {
          if (bufferListMap.current['readed']?.length) {
            willUpdateArray.push(...bufferListMap.current['readed']);
          }
          setNotifyList(willUpdateArray);
        }
      });
    },
  );

  useMount(() => {
    resetNotifyList('all');
  });

  const handleFlagClick = useCallback(
    (id: number) => {
      taggingReadNotify({
        feedbackId: id,
      })
        .then(() => {
          resetNotifyList('all');
          message.success('标记成功');
        })
        .catch(() => {
          message.error('标记失败');
        });
    },
    [resetNotifyList],
  );

  const computedNotifyText = useCallback(
    (status: 'pending' | 'resolved' | 'readed') => {
      console.log('status', status);
      if (status === 'pending') {
        return '待回复';
      }
      if (status === 'resolved') {
        return '已回复';
      }

      if (status === 'readed') {
        return '已读';
      }
    },
    [],
  );

  const tagList = useMemo(() => {
    return [
      {
        text: '全部',
        value: 'all',
        onClick() {
          resetNotifyList('all');
          setTagIndex(this.value);
        },
      },
      {
        text: '未回复',
        value: 'pending',
        onClick() {
          resetNotifyList('pending');
          setTagIndex(this.value);
        },
      },
      {
        text: '已回复',
        value: 'resolved',
        onClick() {
          resetNotifyList('resolved');
          setTagIndex(this.value);
        },
      },
      {
        text: '已读',
        value: 'readed',
        onClick() {
          resetNotifyList('readed');
          setTagIndex(this.value);
        },
      },
    ];
  }, [resetNotifyList]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Back></Back>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-800 mb-6 sm:mb-8">
            反馈通知
          </h1>

          {/* 通知分类标签 */}
          <div className="mb-6 sm:mb-8 overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="flex space-x-3 sm:space-x-4 whitespace-nowrap">
              {tagList.map((item) => {
                return (
                  <div
                    className={
                      tagIndex === item.value
                        ? 'px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer text-sm sm:text-base'
                        : 'px-3 sm:px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 text-sm sm:text-base'
                    }
                    key={item.text}
                    onClick={() => {
                      item.onClick();
                    }}
                  >
                    {item.text}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 通知列表 */}
          <div className="space-y-3 sm:space-y-4">
            {notifyList.map((item) => {
              const getStatusStyle = () => {
                switch (item.status) {
                  case 'pending':
                    return 'border-yellow-400 bg-yellow-50';
                  case 'resolved':
                    return 'border-green-400 bg-green-50';
                  case 'readed':
                    return 'border-gray-200 bg-gray-50';
                  default:
                    return 'border-gray-200 bg-gray-50';
                }
              };

              const getStatusDot = () => {
                switch (item.status) {
                  case 'pending':
                    return 'bg-yellow-500';
                  case 'resolved':
                    return 'bg-green-500';
                  case 'readed':
                    return 'bg-gray-400';
                  default:
                    return 'bg-gray-400';
                }
              };

              const getTextStyle = () => {
                switch (item.status) {
                  case 'pending':
                    return 'text-yellow-600';
                  case 'resolved':
                    return 'text-green-600';
                  case 'readed':
                    return 'text-gray-500';
                  default:
                    return 'text-gray-500';
                }
              };

              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-6 border-l-4 rounded-lg hover:shadow-md transition-all duration-300 ${getStatusStyle()}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 sm:justify-between mb-2">
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${getStatusDot()}`}
                      />
                      <span
                        className={`text-xs sm:text-sm font-medium ${getTextStyle()}`}
                      >
                        {computedNotifyText(item.status)}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {item.createTime}
                    </span>
                  </div>
                  <h3
                    className={`text-base sm:text-lg font-medium mb-2 ${
                      item.status !== 'readed'
                        ? 'text-gray-800'
                        : 'text-gray-600'
                    }`}
                  >
                    {/* 您发布的反馈收到了新的回复 */}
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm mb-4 ${
                      item.status !== 'readed'
                        ? 'text-gray-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {item.reply}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center sm:justify-between">
                    <div className="text-indigo-600 cursor-pointer hover:text-indigo-700 text-sm sm:text-base"></div>
                    <div className="flex space-x-4 border-t sm:border-t-0 pt-2 sm:pt-0">
                      {item.status === 'resolved' && (
                        <span
                          className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-all duration-300 ${'text-green-600 hover:text-green-700 hover:bg-green-50'}`}
                          onClick={() => handleFlagClick(item.id)}
                        >
                          标记已读
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 加载更多 */}
          {/* <div className="mt-6 sm:mt-8 text-center">
            <div className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-indigo-600 text-indigo-600 rounded-lg text-sm sm:text-base hover:bg-indigo-50 transition-colors duration-300">
              加载更多
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default NotifyPage;
