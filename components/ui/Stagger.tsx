"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

type StaggerCtx = { visible: boolean; reduced: boolean };

const StaggerContext = createContext<StaggerCtx>({ visible: false, reduced: false });

/** Wrapper with one intersection observer; children use StaggerItem for staggered fade/slide. */
export function StaggerContainer({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <StaggerContext.Provider value={{ visible, reduced }}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </StaggerContext.Provider>
  );
}

type StaggerItemProps = {
  as?: ElementType;
  index: number;
  children: ReactNode;
  className?: string;
};

export function StaggerItem({ as: Tag = "div", index, children, className = "" }: StaggerItemProps) {
  const { visible, reduced } = useContext(StaggerContext);
  const delay = reduced ? 0 : index * 0.1;

  return (
    <Tag
      className={`transition-[transform,opacity] duration-[800ms] ease-out will-change-[transform,opacity] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-[20px] opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}
