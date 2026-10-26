import { useCallback, useEffect, useRef, useState } from "react";
import { highlights } from "../data/highlights";
import { useI18n } from "../context/LanguageContext";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { findDish } from "../services/menu";

const GAP = 16;

export function FoodCarousel() {
  const { t, dict } = useI18n();
  const reduced = usePrefersReducedMotion();
  const viewportRef = useRef(null);
  const nextRef = useRef(() => {});
  const prevRef = useRef(() => {});
  const [cardWidth, setCardWidth] = useState(0);
  const [step, setStep] = useState(0);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  const slides = [...highlights, ...highlights];

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const width = viewport.clientWidth;
    const visible = width >= 1040 ? 3 : width >= 720 ? 2 : 1;
    const card = (width - GAP * (visible - 1)) / visible;
    setCardWidth(card);
    setStep(card + GAP);
  }, []);

  useEffect(() => {
    measure();
    const viewport = viewportRef.current;
    if (!viewport) return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [measure]);

  const goNext = useCallback(() => {
    setAnimate(true);
    setIndex((current) => current + 1);
  }, []);

  const goPrev = useCallback(() => {
    setIndex((current) => {
      if (current === 0) {
        setAnimate(false);
        return highlights.length;
      }
      setAnimate(true);
      return current - 1;
    });
  }, []);

  useEffect(() => {
    nextRef.current = goNext;
    prevRef.current = goPrev;
  }, [goNext, goPrev]);

  useEffect(() => {
    if (index === highlights.length && !animate) {
      const frame = requestAnimationFrame(() => {
        setAnimate(true);
        setIndex(highlights.length - 1);
      });
      return () => cancelAnimationFrame(frame);
    }
    return undefined;
  }, [index, animate]);

  useEffect(() => {
    if (paused || reduced) return undefined;
    const timer = window.setInterval(goNext, 3000);
    return () => window.clearInterval(timer);
  }, [paused, reduced, goNext]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;
    let startX = 0;
    let startY = 0;
    let tracking = false;

    const onStart = (event) => {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      tracking = true;
      setPaused(true);
    };
    const onMove = (event) => {
      if (!tracking) return;
      const dx = event.touches[0].clientX - startX;
      const dy = event.touches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8)
        event.preventDefault();
    };
    const onEnd = (event) => {
      if (!tracking) return;
      tracking = false;
      const dx = event.changedTouches[0].clientX - startX;
      if (dx > 48) prevRef.current();
      else if (dx < -48) nextRef.current();
      setPaused(false);
    };

    viewport.addEventListener("touchstart", onStart, { passive: true });
    viewport.addEventListener("touchmove", onMove, { passive: false });
    viewport.addEventListener("touchend", onEnd);
    return () => {
      viewport.removeEventListener("touchstart", onStart);
      viewport.removeEventListener("touchmove", onMove);
      viewport.removeEventListener("touchend", onEnd);
    };
  }, []);

  function onTransitionEnd(event) {
    if (
      event.target !== event.currentTarget ||
      event.propertyName !== "transform"
    )
      return;
    if (index >= highlights.length) {
      setAnimate(false);
      setIndex(0);
    }
  }

  return (
    <section
      className="section carousel-section"
      aria-roledescription="carousel"
    >
      <div className="section-head">
        <p className="eyebrow">{t("highlights.eyebrow")}</p>
        <h2>{t("highlights.title")}</h2>
        <p className="lede">{t("highlights.intro")}</p>
      </div>
      <div
        className="carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="carousel-viewport" ref={viewportRef}>
          <div
            className="carousel-track"
            style={{
              gap: `${GAP}px`,
              transform: step
                ? `translate3d(${-index * step}px, 0, 0)`
                : undefined,
              transition:
                animate && !reduced
                  ? "transform 560ms cubic-bezier(.22,.7,.3,1)"
                  : "none",
            }}
            onTransitionEnd={onTransitionEnd}
          >
            {slides.map((item, slideIndex) => {
              const copy = dict.highlights.items[item.id];
              const dish = item.menuNumber
                ? findDish(item.menuNumber, item.menuName)
                : null;
              const price = dish?.price || "";
              return (
                <article
                  className="slide"
                  key={`${item.id}-${slideIndex}`}
                  style={cardWidth ? { width: `${cardWidth}px` } : undefined}
                  aria-hidden={slideIndex >= highlights.length}
                >
                  <div className="slide-media">
                    <img
                      src={item.image}
                      alt={copy.alt}
                      width="1200"
                      height="900"
                      loading="lazy"
                    />
                  </div>
                  <div className="slide-body">
                    <h3>{copy.name}</h3>
                    <p>{copy.description}</p>
                    {price ? (
                      <p className="price-tag">
                        {price} {t("common.currency")}
                      </p>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="carousel-controls">
          <button
            type="button"
            className="icon-btn"
            onClick={goPrev}
            aria-label={t("highlights.prev")}
          >
            ‹
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={goNext}
            aria-label={t("highlights.next")}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
