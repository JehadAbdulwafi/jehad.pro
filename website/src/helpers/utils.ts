function isValidEmail(email: string) {
  const regexp = new RegExp(/[^@]+@[^.]+\..+/g);
  return regexp.test(email);
}

// this function takes an element on at the time of finding which callback will be returned
export function scrollHandler(ref: { getBoundingClientRect: () => any; }, callback: (arg0: boolean) => void) {
  return function () {
    const pos = ref.getBoundingClientRect();
    if (pos.y <= 0 && -pos.y < pos.height) {
      return callback(true);
    }
    callback(false);
  };
}

export function useEffectScroll(ref: { current: any; }, func: any) {
  const handler = scrollHandler(ref.current, func);
  window.addEventListener('scroll', handler);
  return () => window.removeEventListener('scroll', handler);
}

export default isValidEmail;
