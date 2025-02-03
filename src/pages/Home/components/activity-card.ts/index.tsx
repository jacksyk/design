import { useNavigate } from '@umijs/max';

export const ActivityCard = () => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-400 group cursor-pointer"
      onClick={() => navigate('/detail')}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-800 mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-colors">
        信息标题
      </h2>
      <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
        这里是信息内容的简要描述，可以包含一些具体的细节...
      </p>
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm sm:text-base text-gray-500">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <span className="flex items-center">
            <span className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 mr-2 shadow-md"></span>
            <span className="font-medium text-gray-700">张三</span>
          </span>
          <span className="text-indigo-500">2024-01-20</span>
        </div>
        <div className="flex items-center space-x-6">
          <span className="flex items-center space-x-2 hover:text-indigo-600 transition-colors">
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>123</span>
          </span>
          <span className="flex items-center space-x-2 hover:text-indigo-600 transition-colors">
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
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>45</span>
          </span>
        </div>
      </div>
    </div>
  );
};
