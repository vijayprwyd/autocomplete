export function debounce(func: (...a: []) => Promise<void> | void, delay = 200) {
  let timeout: ReturnType<typeof setTimeout> | null;
  return (...args: []) => {
    clearTimeout(timeout as ReturnType<typeof setTimeout>);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
