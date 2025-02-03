import ReactMarkdown from 'react-markdown';

type UserMessageType = {
  content: string;
};

export const AssistantMessage: React.FC<UserMessageType> = ({
  content = '你好！我是你的AI助手，有什么可以帮你的吗？',
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="bg-gray-50 rounded-2xl rounded-tl-sm p-4 max-w-[80%] self-start">
        <p className="text-gray-700">
          <ReactMarkdown>{content}</ReactMarkdown>
        </p>
      </div>
    </div>
  );
};
