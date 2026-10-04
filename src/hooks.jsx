import { useEffect, useRef, useState } from 'react';

export const reduceMotion = matchMedia('(prefers-reduced-motion:reduce)').matches;

/** True once the element has scrolled into view (fires once). */
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

/** Fade-and-rise wrapper. `as` picks the element (div by default). */
export function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, seen] = useInView();
  return <Tag ref={ref} className={`rv${seen ? ' in' : ''} ${className}`.trim()} {...rest}>{children}</Tag>;
}

/** Number that counts up when it scrolls into view. */
export function Counter({ to, dec = 0, pre = '', suf = '' }) {
  const [ref, seen] = useInView();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf; const t0 = performance.now();
    const step = (n) => {
      const k = reduceMotion ? 1 : Math.min(1, (n - t0) / 1600);
      setV(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <b ref={ref}>{pre}{dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-IN')}{suf}</b>;
}

/** Id of the section currently under the header, for the nav highlight. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const y = scrollY + 160;
      let cur = ids[0];
      ids.forEach((id) => { const el = document.getElementById(id); if (el && el.offsetTop <= y) cur = id; });
      if (innerHeight + scrollY >= document.body.scrollHeight - 4) cur = ids[ids.length - 1];
      setActive(cur);
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, [ids]);
  return active;
}
