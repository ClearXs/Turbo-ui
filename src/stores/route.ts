import BaseStore from './base';
import { TurboRoute } from '@/route/AppRouter';
import _ from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';
import { RootStore } from '.';
import {
  APP_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
} from '@/route/routes';

export default class RouteStore extends BaseStore {
  routes: TurboRoute[] = [];

  constructor(store: RootStore) {
    super(store);

    makeObservable(this, {
      routes: observable,
      userRoutes: computed,
      setRoutes: action,
    });
  }

  setRoutes(routes: TurboRoute[]) {
    this.routes = routes;
  }

  get userRoutes() {
    const homeRoute = { ...HOME_ROUTE };
    const profileRoute = { ...PROFILE_ROUTE };
    const newRenderRoutes = [homeRoute, profileRoute, ...this.routes];
    const appRoute = { ...APP_ROUTE };
    const loginRoute = { ...LOGIN_ROUTE };
    appRoute.loader = () => newRenderRoutes;
    appRoute.children = newRenderRoutes;
    const routes = [appRoute, loginRoute];
    return routes;
  }
}
