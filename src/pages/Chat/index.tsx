import { Back } from '@/components';
import { useMount, useUnmount } from 'ahooks';
import { Avatar, Button, Input, message, Switch } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

// 首先修改消息类型的定义
type MessageType = 'user' | 'other' | 'system';

const Chat = () => {
  /** 暗黑模式适配 */
  const [isDarkMode, setIsDarkMode] = useState(false);

  /** 当前人数 */
  const [count, setCount] = useState(0);

  const socket = useRef<Socket>();

  const container = useRef<HTMLDivElement>(null);

  const userName = useRef('用户' + Math.random().toString(36).slice(-4));
  /** 系统消息 */
  // const [systemMessage, setSystemMessage] = useState('');

  /** 消息列表 */
  const [messages, setMessages] = useState<
    Array<{
      content: string;
      type: MessageType;
      timestamp: number;
      username?: string;
    }>
  >([
    {
      content: '欢迎来到校园论坛！让我们开始愉快的讨论吧 ✨',
      type: 'system',
      timestamp: Date.now(),
      username: 'system',
    },
    {
      content: '你好！欢迎来到聊天室 ✨',
      type: 'other',
      timestamp: Date.now(),
      username: 'AI助手',
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /** 滑动到底部 */
  const scrollToBottom = () => {
    if (container.current) {
      container.current.scrollTo({
        top: container.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    if (socket.current) {
      socket.current.emit('sendMessage', {
        content: inputValue,
        timestamp: Date.now(),
      });
    }
    // setMessages([
    //   ...messages,
    //   {
    //     content: inputValue,
    //     type: 'user',
    //     timestamp: Date.now(),
    //     username: '用户',
    //   },
    // ]);
    setInputValue('');
  };

  useMount(() => {
    // socket.current = io('http://localhost:3000');
    socket.current = io('http://47.122.119.171:3000');
    /** 监听链接 */
    socket.current.on('connect', () => {
      if (socket.current) {
        socket.current.emit('enter', {
          username: userName.current,
        });
      }
    });

    socket.current.on('system', (response: { message: string }) => {
      const { message } = response;
      const joinMessage = {
        content: `${message}✨`,
        type: 'system' as MessageType,
        timestamp: Date.now(),
        username: 'system',
      };
      setMessages((prev) => [...prev, joinMessage]);
    });

    /** 监听链接 */
    socket.current.on(
      'message',
      (response: { content: string; timestamp: number }) => {
        // console.log('response>>>>', response);
        const { content, timestamp } = response;
        const joinMessage = {
          content,
          timestamp,
          type: 'other' as MessageType,
          username: '匿名用户',
        };
        setMessages((prev) => [...prev, joinMessage]);
      },
    );

    /** personCount */
    socket.current.on('count', (response: { count: number }) => {
      const { count } = response;
      setCount(count);
    });
  });

  useUnmount(() => {
    if (socket.current) {
      socket.current.emit('leave', {
        username: userName.current,
      });
      // socket.current.disconnect(); 如果这里关闭，会导致丢包
    }
  });

  useEffect(() => {
    // 添加页面刷新/关闭监听
    const handleBeforeUnload = () => {
      if (socket.current) {
        socket.current.emit('leave', {
          username: userName.current,
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // 清理事件监听
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div
      className={`h-screen flex flex-col ${
        isDarkMode
          ? 'bg-[#1a1a1a] text-white'
          : 'bg-gradient-to-br from-blue-50 to-purple-50'
      }`}
    >
      {/* 顶部导航区 */}
      <div
        className={`flex items-center justify-between p-4 ${
          isDarkMode
            ? 'bg-[#2a2a2a] border-gray-800'
            : 'bg-white/80 backdrop-blur-sm border-gray-100'
        } border-b shadow-sm`}
      >
        <div className="flex items-center gap-4">
          <Back
            className={
              isDarkMode
                ? 'text-gray-400 hover:text-white mb-0'
                : 'text-gray-600 hover:text-gray-900 mb-0'
            }
          />
          <div className="flex items-center gap-2">
            <h1
              className={`text-lg font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}
            >
              当前聊天室：
            </h1>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                isDarkMode
                  ? 'bg-gray-800 text-gray-300'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {count} 人在线
            </span>
          </div>
        </div>
        <Switch
          checkedChildren="🌙"
          unCheckedChildren="☀️"
          checked={isDarkMode}
          onChange={setIsDarkMode}
          className={isDarkMode ? 'bg-blue-500' : ''}
        />
      </div>

      {/* 聊天区域 */}
      <div className="flex-1 overflow-y-auto px-4 py-6" ref={container}>
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`
                flex gap-3 group
                ${message.type === 'system' ? 'justify-center' : ''}
                ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}
              `}
            >
              {/* 用户消息和其他用户消息 */}
              {message.type !== 'system' && (
                <>
                  <Avatar
                    size={36}
                    className={`
                      shadow-sm transition-transform duration-200 group-hover:scale-105 shrink-0
                      ${
                        message.type === 'user'
                          ? isDarkMode
                            ? 'bg-purple-500'
                            : 'bg-indigo-500'
                          : isDarkMode
                          ? 'bg-blue-500'
                          : 'bg-gray-600'
                      }
                    `}
                  >
                    {message.username?.[0] ||
                      (message.type === 'user' ? '我' : '他')}
                  </Avatar>

                  <div className="flex flex-col gap-1">
                    {/* 添加用户名显示 */}
                    {message.type === 'other' && (
                      <span
                        className={`text-xs px-1 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {message.username}
                      </span>
                    )}
                    <div
                      className={`
                        px-4 py-2.5 rounded-2xl text-sm shadow-sm
                        ${
                          message.type === 'user'
                            ? isDarkMode
                              ? 'bg-purple-500 text-white rounded-tr-none'
                              : 'bg-indigo-500 text-white rounded-tr-none'
                            : isDarkMode
                            ? 'bg-[#2a2a2a] text-white rounded-tl-none'
                            : 'bg-white text-gray-800 rounded-tl-none'
                        }
                      `}
                    >
                      <p className="leading-relaxed">{message.content}</p>
                    </div>
                    <span
                      className={`text-xs px-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      } ${
                        message.type === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {dayjs(message.timestamp).format('HH:mm')}
                    </span>
                  </div>
                </>
              )}

              {/* 系统消息 */}
              {message.type === 'system' && (
                <div
                  className={`px-4 py-1.5 rounded-full text-xs animate__animated animate__fadeInDown animate__faster ${
                    isDarkMode
                      ? 'bg-gray-800/50 text-gray-400'
                      : 'bg-gray-100/80 backdrop-blur-sm text-gray-600'
                  }`}
                >
                  {message.content}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 底部输入区 */}
      <div
        className={`p-4 border-t shadow-sm ${
          isDarkMode
            ? 'bg-[#2a2a2a] border-gray-800'
            : 'bg-white/80 backdrop-blur-sm border-gray-100'
        }`}
      >
        <div className="max-w-4xl mx-auto flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleSend}
            placeholder="输入消息..."
            className={`flex-1 ${
              isDarkMode
                ? 'bg-[#3a3a3a] border-gray-700 text-white placeholder:text-gray-500 hover:border-purple-500 focus:border-purple-500 hover:bg-[#404040] focus:bg-[#404040]'
                : 'bg-gray-50 hover:border-indigo-500 focus:border-indigo-500'
            }`}
            size="large"
          />
          <Button
            type="primary"
            size="large"
            onClick={handleSend}
            className={`border-none shadow-sm ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-indigo-500 hover:bg-indigo-600'
            }`}
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
