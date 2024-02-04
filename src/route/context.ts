import { createContext } from 'react';
import { TurboRoute } from './AppRouter';

export type RouteContextProps = {
  back: TurboRoute | undefined;
  current: TurboRoute;
};

export const RouteContext = createContext<RouteContextProps>(null);
