import React from 'react';
import ReactMarkdown from 'react-markdown';

type UserMessageType = {
  content: string;
};

export const UserMessage: React.FC<UserMessageType> = ({
  content = '这是用户发送的消息。',
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="bg-indigo-100 rounded-2xl rounded-tr-sm p-4 max-w-[80%] self-end">
        <p className="text-indigo-700">
          <ReactMarkdown>{content}</ReactMarkdown>
        </p>
      </div>
    </div>
  );
};
