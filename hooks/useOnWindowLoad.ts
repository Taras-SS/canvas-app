import { useEffect, EffectCallback, DependencyList } from "react";
import { isSSR } from "utils/isWindowDefined";

export const useOnWindowLoad = (
  effect: EffectCallback,
  deps: DependencyList
) => {
  const isWindowDefined = isSSR;
  useEffect(() => {
    if (!isWindowDefined) {
      return;
    }
    effect();
  }, [isWindowDefined, ...deps]);
};
