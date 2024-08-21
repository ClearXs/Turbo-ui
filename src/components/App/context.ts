import React from 'react';
import { ShowModular } from '../modular/useModular';
import { ShowSliderSide } from '../slider-side/useSliderSide';

export interface useAppProps {
  modular: ShowModular;
  sliderSide: ShowSliderSide;
}

export const AppContext = React.createContext<useAppProps>({});

export default AppContext;
