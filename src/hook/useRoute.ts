import _ from 'lodash';
import { useContext } from 'react';
import { RouteContext } from '@/route/context';

const useRoute = () => {
  const route = useContext(RouteContext);
  return route?.current;
};

const useBackRoute = () => {
  const route = useContext(RouteContext);
  return route?.back;
};

export { useRoute, useBackRoute };
