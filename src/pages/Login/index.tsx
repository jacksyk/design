const Login = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-200 via-blue-200 to-blue-300 px-4 sm:px-0">
      <div className="w-full max-w-[400px] p-6 sm:p-10 rounded-xl bg-white/90 shadow-lg">
        <h1 className="text-center mb-6 sm:mb-8 text-xl sm:text-2xl font-semibold text-gray-800">
          欢迎登录
        </h1>
        <div className="mb-4 sm:mb-5">
          <input
            className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="用户名"
          />
        </div>
        <div className="mb-6 sm:mb-8">
          <input
            type="password"
            className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="密码"
          />
        </div>
        <div className="w-full p-2.5 sm:p-3 bg-blue-500 text-white rounded-lg text-sm sm:text-base cursor-pointer flexCenter hover:bg-blue-600 active:bg-blue-700 transition-colors">
          登录
        </div>
      </div>
    </div>
  );
};

export default Login;
