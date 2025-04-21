import { createUser, login, sendEmail } from '@/api';
import { useNavigate } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';
import { message } from 'antd';
import { useRef, useState } from 'react';
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [formValue, setFormValue] = useState({
    studentId: '',
    password: '',
    email: '',
    code: '',
  });
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleLogin = useMemoizedFn(() => {
    if (isLogin) {
      login({
        student_id: formValue.studentId,
        password: formValue.password,
      }).then((res) => {
        localStorage.setItem('token', res.token);
        navigate('/home');
        message.success(res.message);
      });
    } else {
      if (!isSendEmail) {
        sendEmail({
          to: formValue.email,
        }).then(() => {
          message.success('验证码发送成功');
          setIsSendEmail(true);
        });
      } else {
        createUser({
          student_id: formValue.studentId,
          password: formValue.password,
          email: formValue.email,
          code: formValue.code,
        }).then(() => {
          message.success('注册成功');
          setIsLogin(true);
        });
      }
    }
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-200 via-blue-200 to-blue-300 px-4 sm:px-0">
      <div className="w-full max-w-[400px] p-6 sm:p-10 rounded-xl bg-white/90 shadow-lg backdrop-blur-sm">
        <h1 className="text-center mb-6 sm:mb-8 text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {isLogin ? '欢迎登录' : '用户注册'}
        </h1>

        <div className="space-y-4 sm:space-y-5">
          <div>
            <input
              className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              placeholder="学号"
              value={formValue.studentId}
              onChange={(e) =>
                setFormValue({ ...formValue, studentId: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (formValue.password.length === 0) {
                    if (inputRef.current) {
                      inputRef.current.focus()
                    }
                  }
                  handleLogin();
                }
              }}
            />
          </div>

          <div>
            <input
              type="password"
              className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              placeholder="密码"
              ref={inputRef}
              value={formValue.password}
              onChange={(e) =>
                setFormValue({ ...formValue, password: e.target.value })
              }
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {!isLogin && (
            <div>
              <input
                className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="邮箱"
                value={formValue.email}
                onChange={(e) =>
                  setFormValue({
                    ...formValue,
                    email: e.target.value,
                  })
                }
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
          )}

          {!isLogin && (
            <div>
              <input
                className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="验证码"
                value={formValue.code}
                onChange={(e) =>
                  setFormValue({
                    ...formValue,
                    code: e.target.value,
                  })
                }
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
          )}
        </div>

        <div className="mt-8 space-y-4">
          <div
            className="w-full p-2.5 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm sm:text-base cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flexCenter"
            onClick={handleLogin}
          >
            {isLogin ? '登录' : !isSendEmail ? '发送验证码' : '注册'}
          </div>

          <div className="text-center">
            <span
              className="text-sm text-blue-600 hover:text-purple-600 cursor-pointer transition-colors"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? '没有账号？立即注册' : '已有账号？立即登录'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
