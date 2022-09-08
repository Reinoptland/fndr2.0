import { useEffect, useState } from "react";

export function classNameBuilderHelper(param, styles) {
  let classNameResult;
  if (typeof param == "object") {
    classNameResult = param
      .map((el) => {
        el = styles[el];

        return el;
      })
      .join(" ");
  }
  return classNameResult;
}

export function useWindowDimension() {
  const hasWindow = typeof window !== "undefined";

  function getWindowDimension() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return { width, height };
  }

  const [windowDiemsions, setWindowDimensions] = useState(getWindowDimension());

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions((current) => (current = getWindowDimension()));
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return windowDiemsions;
}
