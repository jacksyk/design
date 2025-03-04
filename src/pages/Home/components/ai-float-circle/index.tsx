import { useMemoizedFn } from 'ahooks';
import { message } from 'antd';
import React, { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { AssistantMessage, UserMessage } from './components';

type AiFloatCircleType = {
  className?: string;
};

const handleStreamMeeage = (data: string) => {
  // 将数据流按行分割
  const lines = data.split('messageType:line').filter((item) => item !== '');
  return lines.pop() ?? '';
};

export const AiFloatCircle: React.FC<AiFloatCircleType> = ({ className }) => {
  // 添加控制AI助手显示状态的state
  const [showAIChat, setShowAIChat] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const [disabled, setDisabled] = useState(false);

  const [messageList, setMessageList] = useState<
    Array<{
      content: string;
      role: 'user' | 'assistant';
    }>
  >([]);

  const bufferMessage = useRef<
    {
      content: string;
      role: 'user' | 'assistant';
    }[]
  >([]);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const scrollToBottom = useMemoizedFn(() => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight;
    }
  });

  const handleSendSteam = useMemoizedFn(async () => {
    if (!inputValue.length) {
      message.info('请输入信息');
      return;
    }
    scrollToBottom();
    let count = 0;

    bufferMessage.current = [];
    bufferMessage.current.push(...messageList);
    setDisabled(true);

    const joinMessage = [
      {
        content: inputValue,
        role: 'user',
      },
    ];

    // @ts-ignore
    bufferMessage.current?.push(...joinMessage);

    setMessageList([...bufferMessage.current]);
    scrollToBottom();

    setInputValue('');

    try {
      const host =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://www.shuyikang.online/api';
      // http://47.122.119.171:3000/sse
      const response = await fetch(`${host}/sse`, {
        method: 'POST', // 使用 post 方法
        headers: {
          Accept: 'text/event-stream', // 可写可不写，写上明确表明需要返回数据流
          'Content-Type': 'application/json', // 默认是 text/plain 必须设置为 application/json,不然后端无法解析出 body 内容
        },
        // body 是一个字符串，指定 Content-Type 以表明内容格式，
        body: JSON.stringify({
          message: bufferMessage.current,
        }),
      });

      const handleValue = (value: any) => {
        const decoder = new TextDecoder('utf-8');
        let text = decoder.decode(value);
        text = handleStreamMeeage(text);
        const splitDataIndex = text.indexOf(':');
        const splitData = text.slice(splitDataIndex + 1);

        try {
          const data = JSON.parse(splitData);
          if (count === 1) {
            bufferMessage.current.push(data.data);
          } else {
            bufferMessage.current.pop();
            bufferMessage.current.push(data.data);
          }
          setMessageList([...bufferMessage.current]);
          scrollToBottom();
        } catch {
          console.log('解析错误');
        }
        return;
      };

      if (response.body) {
        const reader = response.body.getReader();

        let done: boolean;
        do {
          count++;
          const { done: currentDone, value } = await reader.read();
          done = currentDone;
          if (done) {
            handleValue(value);
            setDisabled(false);
            return;
          }
          handleValue(value);
          // 自行解析
        } while (!done);
      }

      return;
    } catch {
      console.error('sse发送错误');
    }
  });

  return (
    <div
      className={twMerge(
        'fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50',
        className,
      )}
    >
      {showAIChat && (
        <div
          className={twMerge(
            'absolute bottom-16 right-0 w-[calc(100vw-32px)] sm:w-96 max-w-[96vw] sm:max-w-none bg-white rounded-2xl shadow-2xl overflow-hidden',
            'animate__animated animate__fadeIn animate__fadeInFast__duration-150',
          )}
        >
          {/* 头部 */}
          <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">AI 助手</h3>
              </div>
              <div
                onClick={() => setShowAIChat(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            className="h-[400px] overflow-y-auto p-6 space-y-4 custom-scrollbar"
            ref={scrollContainer}
          >
            {messageList.map((item, index) => {
              if (item.role === 'user') {
                return (
                  <UserMessage
                    content={item.content}
                    key={`user-${index}`} // 使用索引确保 key 唯一
                  />
                );
              }
              if (item.role === 'assistant') {
                return (
                  <AssistantMessage
                    content={item.content}
                    key={`assistant-${index}`} // 使用索引确保 key 唯一
                  />
                );
              }
              return null;
            })}
          </div>

          {/* 输入框 */}
          <div className="p-4 border-t">
            <div className="flex gap-3">
              <input
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setInputValue(e.target.value);
                }}
                disabled={disabled}
                value={inputValue}
                type="text"
                placeholder={disabled ? '正在输出中...' : '输入你的问题...'}
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
              />
              <div
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md hover:shadow-lg"
                onClick={handleSendSteam}
              >
                <span>发送</span>
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
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 悬浮球按钮 */}
      <div
        onClick={() => setShowAIChat(!showAIChat)}
        className={twMerge(
          'w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center text-white',
          !showAIChat &&
            'animate__animated animate__heartBeat animate__repeat-2',
        )}
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </div>
    </div>
  );
};
