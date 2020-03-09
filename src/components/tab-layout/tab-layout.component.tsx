import React, { useState, useEffect, useRef } from 'react';
import './tab-layout.styles.scss';
import gsap from 'gsap';
import usePrevious from '../../effects/usePrevious.effect';

interface IProps {
  tabs: string[];
  defaultActive?: number;
}

export default function TabLayout ({ tabs, defaultActive = 0 }: IProps){
  const [ activeTab, setActiveTab ] = useState(defaultActive);
  const borderRef = useRef<HTMLDivElement>(null);

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
    [ borderRef, activeTab, tabs ]
  );

  return (
    <div className='tab-layout'>
      {tabs.map((tab, idx) => (
        <div className={`tab${idx === activeTab ? '-active' : ''}`} key={tab}>
          <span onClick={(e) => setActiveTab(idx)}>{tab}</span>
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
