import React from 'react';
import { ShowModular } from '../Modular/useModular';
import { ShowSliderSide } from '../SliderSide/useSliderSide';

export interface useAppProps {
  modular: ShowModular;
  sliderSide: ShowSliderSide;
}

export const AppContext = React.createContext<useAppProps>({});

export default AppContext;
