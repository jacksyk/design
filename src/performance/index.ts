/**
 * 网站性能监测模块
 */
// 性能指标类型定义
interface PerformanceMetrics {
  // 页面加载时间
  pageLoadTime?: number;
  // DOM 内容加载时间
  domContentLoadedTime?: number;
  // 首次内容绘制时间 (FCP)
  firstContentfulPaint?: number;
  // 最大内容绘制时间 (LCP)
  largestContentfulPaint?: number;
  // 首次输入延迟 (FID)
  firstInputDelay?: number;
  // 累积布局偏移 (CLS)
  cumulativeLayoutShift?: number;
  // 首次字节时间 (TTFB)
  timeToFirstByte?: number;
  // 资源加载时间
  resourceLoadTimes?: Array<{
    name: string;
    duration: number;
    size?: number;
    type?: string;
  }>;
  // 用户设备信息
  deviceInfo?: {
    userAgent: string;
    screenWidth: number;
    screenHeight: number;
    deviceMemory?: number;
    connection?: string;
  };
  // 页面路径
  path: string;
  // 时间戳
  timestamp: number;
}

/**
 * 收集性能指标
 * @returns 性能指标对象
 */
export const collectPerformanceMetrics = (): Promise<PerformanceMetrics> => {
  // 确保在浏览器环境中运行
  if (typeof window === 'undefined' || !window.performance) {
    console.warn('Performance API 不可用');
    return Promise.resolve({ path: '', timestamp: Date.now() });
  }

  const metrics: PerformanceMetrics = {
    path: window.location.pathname,
    timestamp: Date.now(),
  };

  // 获取导航计时数据
  const navigationTiming = performance.getEntriesByType(
    'navigation',
  )[0] as PerformanceNavigationTiming;
  if (navigationTiming) {
    metrics.pageLoadTime =
      navigationTiming.loadEventEnd - navigationTiming.startTime;
    metrics.domContentLoadedTime =
      navigationTiming.domContentLoadedEventEnd - navigationTiming.startTime;
    metrics.timeToFirstByte =
      navigationTiming.responseStart - navigationTiming.requestStart;
  }

  // 获取绘制计时数据
  const paintEntries = performance.getEntriesByType('paint');
  const fcpEntry = paintEntries.find(
    (entry) => entry.name === 'first-contentful-paint',
  );
  if (fcpEntry) {
    metrics.firstContentfulPaint = fcpEntry.startTime;
  }

  // 获取资源加载时间
  const resourceEntries = performance.getEntriesByType('resource');
  metrics.resourceLoadTimes = resourceEntries.map((entry) => ({
    name: entry.name,
    duration: entry.duration,
    size: (entry as PerformanceResourceTiming).transferSize,
    type: entry.initiatorType,
  }));

  // 获取设备信息
  metrics.deviceInfo = {
    userAgent: navigator.userAgent,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    deviceMemory: (navigator as any).deviceMemory,
    connection: (navigator as any).connection?.effectiveType,
  };

  // 创建一个 Promise 来收集 Web Vitals 指标
  return new Promise((resolve) => {
    if (!('PerformanceObserver' in window)) {
      resolve(metrics);
      return;
    }

    let fcp = false;
    let lcp = false;
    let cls = false;

    // 检查是否所有指标都已收集
    const checkAllMetricsCollected = () => {
      if (fcp && lcp && cls) {
        resolve(metrics);
      }
    };

    // 监听 FCP
    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const fcpEntry = entries.find(
          (entry) => entry.name === 'first-contentful-paint',
        );
        if (fcpEntry) {
          metrics.firstContentfulPaint = fcpEntry.startTime;
        }
        fcp = true;
        checkAllMetricsCollected();
      }).observe({ type: 'paint', buffered: true });
    } catch (e) {
      console.warn('FCP 监测不可用', e);
      fcp = true;
      checkAllMetricsCollected();
    }

    // 监听 LCP
    try {
      new PerformanceObserver((entryList) => {
        console.log('lcp');
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        metrics.largestContentfulPaint = lastEntry.startTime;
        lcp = true;
        checkAllMetricsCollected();
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.warn('LCP 监测不可用', e);
      lcp = true;
      checkAllMetricsCollected();
    }

    // 监听 CLS
    try {
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        console.log('cls');
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        metrics.cumulativeLayoutShift = clsValue;
        cls = true;
        checkAllMetricsCollected();
      }).observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.warn('CLS 监测不可用', e);
      cls = true;
      checkAllMetricsCollected();
    }

    // 监听 FID
    // try {
    //   new PerformanceObserver((entryList) => {
    //     console.log('fid');
    //     const firstInput = entryList.getEntries()[0];
    //     if (firstInput) {
    //       metrics.firstInputDelay =
    //         firstInput.processingStart - firstInput.startTime;
    //     }
    //     fid = true;
    //     checkAllMetricsCollected();
    //   }).observe({ type: 'first-input', buffered: true });
    // } catch (e) {
    //   console.warn('FID 监测不可用', e);
    //   fid = true;
    //   checkAllMetricsCollected();
    // }

    // 设置超时，避免永远等待
    setTimeout(() => {
      if (!(lcp && cls)) {
        console.warn('部分性能指标收集超时');
        resolve(metrics);
      }
    }, 10000); // 10秒超时
  });
};

/**
 * 发送性能数据到服务器
 * @param metrics 性能指标数据
 */
export const sendPerformanceMetrics = (metrics: PerformanceMetrics): void => {
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://www.shuyikang.online:3000';

  // 使用 Beacon API 发送数据，不阻塞页面卸载
  // 降级方案
  console.log('metrics', metrics);
  fetch(`${baseUrl}/performance`, {
    method: 'POST',
    body: JSON.stringify(metrics),
    headers: {
      'Content-Type': 'application/json',
    },
    // 使用 keepalive 确保请求在页面卸载后仍能完成
    keepalive: true,
  }).catch((err) => console.error('发送性能数据失败:', err));
};

/**
 * 初始化性能监测
 */
export const initPerformanceMonitoring = (): void => {
  // 确保在浏览器环境中运行
  if (typeof window === 'undefined') return;

  // 页面加载完成后收集初始指标
  window.addEventListener('load', async () => {
    // 延迟执行以确保所有指标都已收集
    const metrics = await collectPerformanceMetrics();
    sendPerformanceMetrics(metrics);
    console.log('性能指标:', metrics);
  });
};

/**
 * 在应用入口处调用此函数启动性能监测
 */
export const startPerformanceMonitoring = (): void => {
  // 开发环境下可选择不启用
  //   if (process.env.NODE_ENV !== 'production') {
  //     console.log('开发环境下不启用性能监测');
  //     return;
  //   }

  initPerformanceMonitoring();
};
