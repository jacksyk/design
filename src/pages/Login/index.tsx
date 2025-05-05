import { createUser, login, sendEmail, updatePassword } from '@/api';
import { useNavigate } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';
import { message } from 'antd';
import { useMemo, useRef, useState } from 'react';

type StepType =
  | 'login'
  | 'register'
  | 'sendEmail'
  | 'preForgetPassword'
  | 'forgetPassword';

const Login = () => {
  const [step, setStep] = useState<StepType>('login');

  const [formValue, setFormValue] = useState({
    studentId: '',
    password: '',
    email: '',
    code: '',
    newPassword: '', // 新增字段
  });

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAction = useMemoizedFn(() => {
    if (step === 'login') {
      // ps: 这里是登陆逻辑
      if (!formValue.studentId) {
        message.error('请输入学号');
        return;
      }
      if (!formValue.password) {
        message.error('请输入密码');
        return;
      }

      login({
        student_id: formValue.studentId,
        password: formValue.password,
      }).then((res) => {
        localStorage.setItem('token', res.token);
        navigate('/home');
        message.success(res.message);
      });
    } else if (step === 'register') {
      // ps: 注册账号，但是还没有发送验证码

      sendEmail({
        to: formValue.email,
      }).then(() => {
        message.success('验证码发送成功');
        setStep('sendEmail');
      });
    } else if (step === 'sendEmail') {
      // ps: 发送验证码后，注册账号
      createUser({
        student_id: formValue.studentId,
        password: formValue.password,
        email: formValue.email,
        code: formValue.code,
      }).then(() => {
        message.success('注册成功');
        setStep('login');
      });
    } else if (step === 'preForgetPassword') {
      // ps: 忘记密码前置操作，发送验证码
      sendEmail({
        to: formValue.email,
      }).then(() => {
        message.success('验证码发送成功');
        setStep('forgetPassword'); // 直接进入 forgetPassword 状态
      });
    } else if (step === 'forgetPassword') {
      // ps: 忘记密码操作
      updatePassword({
        studentId: formValue.studentId,
        verifyCode: formValue.code,
        newPassword: formValue.newPassword,
      }).then(() => {
        message.success('密码修改成功');
        setStep('login');
      });
    }
  });

  const btnText = useMemo(() => {
    switch (step) {
      case 'login':
        return '登录';
      case 'register':
        return '发送验证码';
      case 'sendEmail':
        return '注册';
      case 'preForgetPassword':
        return '发送验证码';
      case 'forgetPassword':
        return '修改密码';
      default:
        return '登录';
    }
  }, [step]);

  const titleText = useMemo(() => {
    switch (step) {
      case 'login':
        return '欢迎登录';
      case 'register':
        return '用户注册';
      case 'sendEmail':
        return '用户注册';
      case 'preForgetPassword':
        return '忘记密码';
      case 'forgetPassword':
        return '忘记密码';
    }
  }, [step]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-200 via-blue-200 to-blue-300 px-4 sm:px-0">
      <div className="w-full max-w-[400px] p-6 sm:p-10 rounded-xl bg-white/90 shadow-lg backdrop-blur-sm">
        <h1 className="text-center mb-6 sm:mb-8 text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {titleText}
        </h1>

        <div className="space-y-4 sm:space-y-5">
          {(step === 'login' ||
            step === 'register' ||
            step === 'sendEmail') && (
            <>
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
                          inputRef.current.focus();
                        }
                      }
                      handleAction();
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
                  onKeyDown={(e) => e.key === 'Enter' && handleAction()}
                />
              </div>
            </>
          )}

          {step === 'preForgetPassword' && (
            <>
              <div>
                <input
                  className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  placeholder="学号"
                  value={formValue.studentId}
                  onChange={(e) =>
                    setFormValue({ ...formValue, studentId: e.target.value })
                  }
                  onKeyDown={(e) => e.key === 'Enter' && handleAction()}
                />
              </div>
              <div>
                <input
                  className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  placeholder="邮箱"
                  value={formValue.email}
                  onChange={(e) =>
                    setFormValue({ ...formValue, email: e.target.value })
                  }
                  onKeyDown={(e) => e.key === 'Enter' && handleAction()}
                />
              </div>
            </>
          )}

          {step === 'forgetPassword' && (
            <>
              <div>
                <input
                  className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  placeholder="学号"
                  value={formValue.studentId}
                  onChange={(e) =>
                    setFormValue({ ...formValue, studentId: e.target.value })
                  }
                  onKeyDown={(e) => e.key === 'Enter' && handleAction()}
                />
              </div>
              <div>
                <input
                  className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  placeholder="邮箱"
                  value={formValue.email}
                  onChange={(e) =>
                    setFormValue({ ...formValue, email: e.target.value })
                  }
                  onKeyDown={(e) => e.key === 'Enter' && handleAction()}
                />
              </div>
              <div>
                <input
                  className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  placeholder="验证码"
                  value={formValue.code}
                  onChange={(e) =>
                    setFormValue({ ...formValue, code: e.target.value })
                  }
                  onKeyDown={(e) => e.key === 'Enter' && handleAction()}
                />
              </div>
              <div>
                <input
                  type="password"
                  className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  placeholder="新密码"
                  value={formValue.newPassword}
                  onChange={(e) =>
                    setFormValue({ ...formValue, newPassword: e.target.value })
                  }
                  onKeyDown={(e) => e.key === 'Enter' && handleAction()}
                />
              </div>
            </>
          )}

          {(step === 'register' || step === 'sendEmail') && (
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
                onKeyDown={(e) => e.key === 'Enter' && handleAction()}
              />
            </div>
          )}

          {step === 'sendEmail' && (
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
                onKeyDown={(e) => e.key === 'Enter' && handleAction()}
              />
            </div>
          )}
        </div>

        <div className="mt-8 space-y-4">
          <div
            className="w-full p-2.5 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm sm:text-base cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flexCenter"
            onClick={handleAction}
          >
            {btnText}
          </div>

          <div className="flex justify-between items-center text-sm px-1">
            <span
              className="text-blue-600 hover:text-purple-600 cursor-pointer transition-colors"
              onClick={() => {
                if (step === 'login') {
                  setStep('register');
                } else {
                  setStep('login');
                }
              }}
            >
              {step === 'login' ? '没有账号？立即注册' : '已有账号？立即登录'}
            </span>
            {step === 'login' && (
              <span
                className=" text-blue-600 hover:text-purple-600 cursor-pointer transition-colors"
                onClick={() => setStep('preForgetPassword')}
              >
                忘记密码？
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
