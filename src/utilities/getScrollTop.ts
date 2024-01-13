export default function onScroll() {
  let scrollTop = 0;
  if (typeof window.pageYOffset !== "undefined") {
    scrollTop = window.pageYOffset;
  } else if (
    typeof document.compatMode !== "undefined" &&
    document.compatMode !== "BackCompat"
  ) {
    scrollTop = document.documentElement.scrollTop;
  } else if (typeof document.body !== "undefined") {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
}
