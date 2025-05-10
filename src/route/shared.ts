import { TurboRoute } from './AppRouter';

export const find = (
  routes: TurboRoute[],
  predicate: (route: TurboRoute) => boolean,
): TurboRoute | undefined => {
  const queue: TurboRoute[] = [...routes];

  while (queue.length > 0) {
    const route = queue.shift();
    if (route && predicate(route)) {
      return route;
    }
    if (route && route.children) {
      queue.push(...route.children);
    }
  }

  return undefined;
};
