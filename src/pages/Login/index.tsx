const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-purple-200 via-blue-200 to-blue-300">
      <div className="p-10 rounded-lg bg-white/90 shadow-lg w-[400px]">
        <h1 className="text-center mb-8 text-gray-800">欢迎登录</h1>
        <div className="mb-5">
          <input
            className="w-full p-3 border border-gray-200 rounded text-sm"
            placeholder="用户名"
          />
        </div>
        <div className="mb-8">
          <input
            type="password"
            className="w-full p-3 border border-gray-200 rounded text-sm"
            placeholder="密码"
          />
        </div>
        <div className="w-full p-3 bg-blue-500 text-white rounded text-base cursor-pointer flexCenter">
          登录
        </div>
      </div>
    </div>
  );
};

export default Login;
