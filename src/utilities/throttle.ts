export default function _throttle<T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  wait: number
) {
  let lastCall = 0;
  return (...args: T) => {
    const now = Date.now();
    if (now - lastCall < wait) {
      return;
    }
    lastCall = now;
    callback(...args);
  };
}
