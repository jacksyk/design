import { createActivity } from '@/api';
import { Back, MyEditor } from '@/components';
import { useNavigate } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';
import { DatePicker, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { DatetimePicker, Field } from 'react-vant';

const { RangePicker } = DatePicker;

const PublishPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileApp, setIsMobileApp] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileApp(window.innerWidth < 700);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [time, setTime] = useState<{
    startTime: Date | string;
    endTime: Date | string;
  }>({
    startTime: new Date(),
    endTime: new Date(),
  });

  /** 表单值 */
  const [formValue, setFormValue] = useState<{
    startTime: number;
    endTime: number;
    title: string;
    content: string;
    description: string;
  }>({
    startTime: 0,
    endTime: 0,
    title: '',
    content: '',
    description: '',
  });

  useEffect(() => {
    console.log('formValue', formValue);
  }, [formValue]);

  /** 日期选择器 */
  const onTimeRangeChange = useMemoizedFn((_: any, dateString: any) => {
    const startTime = dayjs(dateString[0]).valueOf();
    const endTime = dayjs(dateString[1]).valueOf();
    setFormValue((prev) => ({
      ...prev,
      startTime,
      endTime,
    }));
  });

  /** 创建活动 */
  const sendCreateActivity = useMemoizedFn(() => {
    console.log(formValue, '>>>>');

    createActivity({
      title: formValue.title,
      description: formValue.description,
      content: formValue.content,
      start_time: formValue.startTime,
      end_time: formValue.endTime,
    }).then(() => {
      message.success('发布成功');
      navigate('/home');
    });
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* 返回按钮 */}

        <Back></Back>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-800 mb-6 sm:mb-8">
            发布活动
          </h1>

          {/* 选择日期 */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1.5 sm:mb-2">
              日期
            </label>
            {/* 桌面端日期选择器 */}
            {!isMobileApp && (
              <RangePicker
                showTime
                onChange={onTimeRangeChange}
                className="w-full"
                placeholder={['开始时间', '结束时间']}
                style={{ fontSize: 16 }}
                popupClassName="!text-base"
              />
            )}

            {/* 移动端日期选择器 */}
            {isMobileApp && (
              <div className="space-y-3">
                <DatetimePicker
                  popup={{
                    round: true,
                  }}
                  type="datetime"
                  title="开始时间"
                  minDate={new Date(2000, 0, 1)}
                  maxDate={new Date(2050, 10, 1)}
                  value={new Date(time.startTime)}
                  onConfirm={(value: any) => {
                    setTime({
                      ...time,
                      startTime: value,
                    });
                    setFormValue((prev) => ({
                      ...prev,
                      startTime: new Date(value).getTime(),
                    }));
                  }}
                >
                  {(val: any, _: any, actions: any) => (
                    <Field
                      readOnly
                      clickable
                      label="开始时间"
                      value={new Date(val).toLocaleString()}
                      placeholder="请选择开始时间"
                      onClick={() => actions.open()}
                      className="rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    />
                  )}
                </DatetimePicker>

                <DatetimePicker
                  popup={{
                    round: true,
                  }}
                  type="datetime"
                  title="结束时间"
                  minDate={new Date(dayjs(time.startTime).valueOf())}
                  maxDate={new Date(2050, 10, 1)}
                  value={new Date(time.endTime)}
                  onConfirm={(value: any) => {
                    setTime({
                      ...time,
                      endTime: value,
                    });
                    setFormValue((prev) => ({
                      ...prev,
                      endTime: new Date(value).getTime(),
                    }));
                  }}
                >
                  {(val: any, _: any, actions: any) => (
                    <Field
                      readOnly
                      clickable
                      label="结束时间"
                      value={new Date(val).toLocaleString()}
                      placeholder="请选择结束时间"
                      onClick={() => actions.open()}
                      className="rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    />
                  )}
                </DatetimePicker>
              </div>
            )}
          </div>

          {/* 标题输入 */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1.5 sm:mb-2">
              标题
            </label>
            <input
              type="text"
              placeholder="请输入标题"
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormValue((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            />
          </div>

          {/* 描述输入 */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1.5 sm:mb-2">
              描述
            </label>
            <input
              type="text"
              placeholder="请输入描述"
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormValue((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
            />
          </div>

          {/* 内容输入 */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1.5 sm:mb-2">
              内容
            </label>
            <MyEditor
              onChangeContent={(html: string) => {
                setFormValue((prev) => ({
                  ...prev,
                  content: html,
                }));
              }}
            />
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-end">
            <div
              className="w-full sm:w-auto bg-indigo-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base hover:bg-indigo-700 transition-colors duration-300 flexCenter"
              onClick={sendCreateActivity}
            >
              发布
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishPage;
