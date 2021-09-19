export const generateKey = (val: string): string => {
  return window.btoa(`${Date.now()}-${val}`);
};
