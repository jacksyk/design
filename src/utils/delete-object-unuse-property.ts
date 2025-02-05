export const deleteObjectUnuseProperty = (obj: any) => {
  for (const key in obj) {
    if (obj[key] === undefined || obj[key] === null) {
      delete obj[key];
    }
  }
  return obj;
};
