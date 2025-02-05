export const validateEmptyObjectValue = (
  /** 传入的对象 */
  obj: Record<string, any>,
  /** 需要验证的key */
  keyMap: Array<string>,
) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (keyMap.includes(key)) {
        if (obj[key] === undefined || obj[key] === null) {
          reject(`${key}不能为空`);
          return;
        }
      }
    }
    resolve('校验成功');
  });
};
