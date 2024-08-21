import React, { Component, useMemo } from 'react';
import AppContext, { useAppProps } from './context';
import useModularHolder from '../modular/useModularHolder';
import useSliderSideHolder from '../slider-side/useSliderSideHolder';

export interface AppProps {
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}

const useApp = () => React.useContext<useAppProps>(AppContext);

const App: React.FC<AppProps> & { useApp: () => useAppProps } = ({
  children,
  style,
  className,
}) => {
  const [showModular, modularContextHolder] = useModularHolder();
  const [showSliderSide, sliderSideContextHolder] = useSliderSideHolder();

  const memoizedContextValue = useMemo<useAppProps>(() => {
    return {
      modular: showModular,
      sliderSide: showSliderSide,
    };
  }, [showModular, showSliderSide]);

  return (
    <AppContext.Provider value={memoizedContextValue}>
      {modularContextHolder}
      {sliderSideContextHolder}
      {children}
    </AppContext.Provider>
  );
};

App.useApp = useApp;

export default App;
