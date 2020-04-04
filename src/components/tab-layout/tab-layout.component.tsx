import React, { useEffect, useRef, useState } from 'react';
import './tab-layout.styles.scss';
import gsap from 'gsap';

interface IProps {
  tabs: string[];
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

export default function TabLayout ({ tabs, activeTab, setActiveTab }: IProps){
  const [ scrollOffset, setScrollOffset ] = useState(
    Array.from({ length: tabs.length }).map(() => 0)
  );
  const borderRef = useRef<HTMLDivElement>(null);

  const setActiveTabAndSaveOffset = (idx: number) => {
    setScrollOffset((s) => {
      const newState = [ ...s ];
      newState[activeTab] = window.scrollY;
      return newState;
    });

    setActiveTab(idx);
  };

  useEffect(
    () => {
      window.scrollTo({
        top: scrollOffset[activeTab]
      });
    },
    [ activeTab, scrollOffset ]
  );

  useEffect(
    () => {
      if (borderRef.current) {
        gsap
          .timeline()
          .to(
            borderRef.current,
            {
              duration: 0.2,
              css: {
                opacity: 0
              }
            },
            'start'
          )
          .to(
            borderRef.current,
            {
              duration: 0.2,
              css: {
                opacity: 1
              }
            },
            '+=0.20'
          );
      }
    },
    [ borderRef, tabs, activeTab ]
  );

  return (
    <div className='tab-layout'>
      {tabs.map((tab, idx) => (
        <div className={`tab${idx === activeTab ? '-active' : ''}`} key={tab}>
          <span onClick={() => setActiveTabAndSaveOffset(idx)}>{tab}</span>
        </div>
      ))}
      <div
        ref={borderRef}
        style={{
          left: `calc(100% / ${tabs.length * 2} * (${activeTab * 2} + 1))`
        }}
        className='tab-layout__active-border'
      />
    </div>
  );
}
