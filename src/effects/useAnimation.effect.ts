import { useEffect } from 'react';
import gsap from 'gsap';

export default function useAnimation(
	entry: IntersectionObserverEntry,
	property: gsap.CSSVars,
	duration: number = 1
) {
	useEffect(
		() => {
			if (entry && entry.isIntersecting)
				gsap.to(entry.target, duration, {
					css: property
				});
		},
		[ entry, duration, property ]
	);
}
