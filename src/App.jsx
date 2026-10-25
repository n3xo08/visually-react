import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';
import logoFull from './assets/logo_napis_biale.png';
import mascotCzarne from './assets/logo_czarne.png';
import heroBackground from './assets/tlo.jpg';
import heroUfoLayer from './assets/trawa.png';
import heroGrassLayer from './assets/kamienie.png';
import aboutRocksLayer from './assets/głazy.png';
import telefonImage from './assets/telefon.png';
import filmReklamowy01Poster from './assets/film-reklamowy-01.jpg';
import filmReklamowy02Poster from './assets/film-reklamowy-02.jpg';
import filmReklamowy03Poster from './assets/film-reklamowy-03.jpg';
import materialKlienta01Poster from './assets/material-klienta-01.jpg';
import materialKlienta02Poster from './assets/material-klienta-02.jpg';
import iconNagrywanie from './assets/icon-nagrywanie.png';
import iconMontaz from './assets/icon-montaz.png';
import iconPublikacja from './assets/icon-publikacja.png';
import iconObsluga from './assets/icon-obsluga.png';
import servicesPlanetRed from './assets/planeta-czerwona.png';
import servicesPlanetOrange from './assets/planeta-pomaranczowa.png';
import servicesPlanetBlue from './assets/planeta-niebieska.png';
import servicesPlanetPink from './assets/planeta-rozowa.png';
import tloPc from './assets/tlo-pc.jpg';
import tloTel from './assets/tlo-tel.jpg';

gsap.registerPlugin(ScrollTrigger);

const WEB3FORMS_ACCESS_KEY = 'd702db6e-2d05-48d4-9b67-c1e29285cc1d';
const YT_ID = 'MqSoqw0BTz8';

const SECTION_IDS = ['o-nas', 'wyniki', 'uslugi', 'proces', 'cennik', 'kontakt'];
const NAV_ITEMS = [
  { label: 'O nas', href: '#o-nas' },
  { label: 'Wyniki', href: '#wyniki' },
  { label: 'Usługi', href: '#uslugi' },
  { label: 'Proces', href: '#proces' },
  { label: 'Cennik', href: '#cennik' },
];
const CONTACT_INDEX = SECTION_IDS.length - 1;

const SHOW_TESTIMONIAL = false;
const TESTIMONIAL = { quote: '', author: '', role: '' };

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const plNum = (n, decimals = 0) =>
  n.toLocaleString('pl-PL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

const MOTION = {
  ease: 'power4.out',
  revealDuration: 0.72,
  stagger: 0.1,
  start: 'top 94%',
};

// Trzy zwarte skupiska na pustych fragmentach trawy — poza UFO i stworkami.
// Mobile ma osobne pozycje, bo object-position warstwy pokazuje tam inny wycinek obrazu.
const HERO_FIREFLIES = [
  { left: '6%', top: '62%', mobileLeft: '11%', mobileTop: '28%', size: '1.5px', duration: '7.6s', delay: '-1.8s', driftX: '7px', driftY: '-6px', midX: '-4px', midY: '3px', color: '#f6efad' },
  { left: '9%', top: '68%', mobileLeft: '15%', mobileTop: '34%', size: '3px', duration: '9.2s', delay: '-5.1s', driftX: '-8px', driftY: '-9px', midX: '5px', midY: '4px', color: '#dff5bb' },
  { left: '12%', top: '73%', mobileLeft: '19%', mobileTop: '39%', size: '4.5px', duration: '8.4s', delay: '-2.7s', driftX: '6px', driftY: '7px', midX: '-6px', midY: '-3px', color: '#ffe4a3' },
  { left: '15%', top: '78%', mobileLeft: '23%', mobileTop: '36%', size: '2px', duration: '10.4s', delay: '-7.4s', driftX: '-6px', driftY: '-5px', midX: '7px', midY: '5px', color: '#f4f0b2' },
  { left: '8%', top: '80%', mobileLeft: '13%', mobileTop: '41%', size: '5px', duration: '7.9s', delay: '-4.3s', driftX: '9px', driftY: '-4px', midX: '-5px', midY: '6px', color: '#d9f2b3' },
  { left: '13%', top: '66%', mobileLeft: '21%', mobileTop: '31%', size: '1.5px', duration: '9.8s', delay: '-0.9s', driftX: '-7px', driftY: '6px', midX: '4px', midY: '-5px', color: '#ffeca8' },
  { left: '17%', top: '74%', mobileLeft: '17%', mobileTop: '38%', size: '3px', duration: '8.8s', delay: '-6.2s', driftX: '6px', driftY: '-8px', midX: '-8px', midY: '4px', color: '#e4f6b7' },
  { left: '11%', top: '76%', mobileLeft: '24%', mobileTop: '33%', size: '2.5px', duration: '11.2s', delay: '-3.6s', driftX: '-5px', driftY: '-6px', midX: '6px', midY: '5px', color: '#ffe9a6' },
  { left: '4%', top: '71%', mobileLeft: '10%', mobileTop: '36%', size: '2px', duration: '8.1s', delay: '-6.8s', driftX: '8px', driftY: '5px', midX: '-4px', midY: '-6px', color: '#e0f5bb' },
  { left: '56%', top: '61%', mobileLeft: '73%', mobileTop: '29%', size: '4px', duration: '9.6s', delay: '-2.2s', driftX: '-6px', driftY: '-7px', midX: '5px', midY: '4px', color: '#f8eaa4' },
  { left: '59%', top: '67%', mobileLeft: '77%', mobileTop: '35%', size: '2.5px', duration: '7.4s', delay: '-4.9s', driftX: '7px', driftY: '6px', midX: '-5px', midY: '-4px', color: '#e1f2b5' },
  { left: '62%', top: '72%', mobileLeft: '81%', mobileTop: '40%', size: '5px', duration: '10.8s', delay: '-8.1s', driftX: '-8px', driftY: '-5px', midX: '6px', midY: '5px', color: '#ffe6a0' },
  { left: '65%', top: '77%', mobileLeft: '85%', mobileTop: '34%', size: '1.5px', duration: '8.7s', delay: '-1.1s', driftX: '5px', driftY: '-8px', midX: '-7px', midY: '3px', color: '#d8f2b1' },
  { left: '68%', top: '63%', mobileLeft: '75%', mobileTop: '38%', size: '3.5px', duration: '9.9s', delay: '-5.7s', driftX: '-5px', driftY: '7px', midX: '4px', midY: '-5px', color: '#f7eeac' },
  { left: '71%', top: '70%', mobileLeft: '79%', mobileTop: '31%', size: '2px', duration: '8.3s', delay: '-3.2s', driftX: '8px', driftY: '-4px', midX: '-6px', midY: '6px', color: '#e2f5b7' },
  { left: '74%', top: '75%', mobileLeft: '83%', mobileTop: '37%', size: '2.5px', duration: '9.1s', delay: '-6.3s', driftX: '-7px', driftY: '-6px', midX: '5px', midY: '4px', color: '#ffe9a8' },
  { left: '61%', top: '80%', mobileLeft: '87%', mobileTop: '41%', size: '4.5px', duration: '7.8s', delay: '-2.5s', driftX: '6px', driftY: '8px', midX: '-5px', midY: '-4px', color: '#dff4b5' },
  { left: '67%', top: '82%', mobileLeft: '80%', mobileTop: '33%', size: '1.5px', duration: '10.6s', delay: '-7.2s', driftX: '-8px', driftY: '5px', midX: '6px', midY: '-6px', color: '#f9eda7' },
  { left: '81%', top: '58%', mobileLeft: '89%', mobileTop: '27%', size: '5px', duration: '8.9s', delay: '-4.1s', driftX: '7px', driftY: '-7px', midX: '-4px', midY: '5px', color: '#e4f6b8' },
  { left: '84%', top: '64%', mobileLeft: '93%', mobileTop: '34%', size: '2px', duration: '9.7s', delay: '-0.7s', driftX: '-6px', driftY: '6px', midX: '5px', midY: '-4px', color: '#ffe5a1' },
  { left: '87%', top: '70%', mobileLeft: '97%', mobileTop: '40%', size: '3.5px', duration: '7.5s', delay: '-5.4s', driftX: '5px', driftY: '-5px', midX: '-7px', midY: '4px', color: '#dbf3b3' },
  { left: '90%', top: '76%', mobileLeft: '91%', mobileTop: '36%', size: '2px', duration: '10.2s', delay: '-3.8s', driftX: '-8px', driftY: '-6px', midX: '6px', midY: '5px', color: '#f8efa9' },
  { left: '93%', top: '61%', mobileLeft: '95%', mobileTop: '30%', size: '4.5px', duration: '8.6s', delay: '-6.6s', driftX: '7px', driftY: '7px', midX: '-5px', midY: '-5px', color: '#e0f5b9' },
  { left: '96%', top: '69%', mobileLeft: '99%', mobileTop: '39%', size: '1.5px', duration: '9.4s', delay: '-1.5s', driftX: '-6px', driftY: '-8px', midX: '4px', midY: '6px', color: '#ffeba7' },
  { left: '88%', top: '81%', mobileLeft: '88%', mobileTop: '42%', size: '3px', duration: '11s', delay: '-7.8s', driftX: '8px', driftY: '-4px', midX: '-6px', midY: '4px', color: '#dff4b4' },
  { left: '92%', top: '74%', mobileLeft: '94%', mobileTop: '32%', size: '5px', duration: '8s', delay: '-4.6s', driftX: '-7px', driftY: '6px', midX: '5px', midY: '-6px', color: '#f7eaa1' },
  { left: '97%', top: '78%', mobileLeft: '98%', mobileTop: '37%', size: '2px', duration: '9.8s', delay: '-2.9s', driftX: '6px', driftY: '-7px', midX: '-4px', midY: '5px', color: '#e3f6b7' },
];

const RESULTS_STARS = [
  { layer: 'far', left: '8%', top: '9%', size: '1px', opacity: 0.42, delay: '-2.2s' },
  { layer: 'far', left: '22%', top: '18%', size: '2px', opacity: 0.52, delay: '-5.8s' },
  { layer: 'far', left: '39%', top: '7%', size: '1px', opacity: 0.4, delay: '-1.3s' },
  { layer: 'far', left: '58%', top: '24%', size: '1.5px', opacity: 0.48, delay: '-4.5s' },
  { layer: 'far', left: '76%', top: '12%', size: '2px', opacity: 0.55, delay: '-7.4s' },
  { layer: 'far', left: '92%', top: '32%', size: '1px', opacity: 0.44, delay: '-3.1s' },
  { layer: 'far', left: '14%', top: '49%', size: '1.5px', opacity: 0.46, delay: '-6.2s' },
  { layer: 'far', left: '49%', top: '56%', size: '1px', opacity: 0.4, delay: '-0.8s' },
  { layer: 'far', left: '83%', top: '66%', size: '1.5px', opacity: 0.5, delay: '-5.2s' },
  { layer: 'mid', left: '5%', top: '30%', size: '2.5px', opacity: 0.66, delay: '-4.2s' },
  { layer: 'mid', left: '18%', top: '68%', size: '3px', opacity: 0.58, delay: '-1.7s' },
  { layer: 'mid', left: '31%', top: '38%', size: '2px', opacity: 0.62, delay: '-6.8s' },
  { layer: 'mid', left: '47%', top: '16%', size: '2.5px', opacity: 0.64, delay: '-3.6s' },
  { layer: 'mid', left: '64%', top: '45%', size: '3px', opacity: 0.58, delay: '-7.2s' },
  { layer: 'mid', left: '79%', top: '25%', size: '2px', opacity: 0.64, delay: '-2.9s' },
  { layer: 'mid', left: '96%', top: '54%', size: '2.5px', opacity: 0.6, delay: '-5.5s' },
  { layer: 'mid', left: '73%', top: '78%', size: '2px', opacity: 0.52, delay: '-0.6s' },
  { layer: 'near', left: '11%', top: '83%', size: '4px', opacity: 0.82, delay: '-2.6s' },
  { layer: 'near', left: '27%', top: '52%', size: '3.5px', opacity: 0.74, delay: '-6.1s' },
  { layer: 'near', left: '55%', top: '72%', size: '4px', opacity: 0.78, delay: '-4.7s' },
  { layer: 'near', left: '68%', top: '8%', size: '3px', opacity: 0.7, delay: '-1.2s' },
  { layer: 'near', left: '88%', top: '87%', size: '4.5px', opacity: 0.74, delay: '-7.8s' },
];

const REVEAL_FROM = {
  up: { y: 64, opacity: 0, scale: 0.965, rotateX: 7 },
  left: { x: -72, opacity: 0, rotateY: 5 },
  right: { x: 72, opacity: 0, rotateY: -5 },
  pop: { y: 48, opacity: 0, scale: 0.94, rotateX: 9 },
  fade: { opacity: 0 },
};

const revealTo = (from) => {
  const to = { opacity: 1, transformPerspective: 1200 };
  if ('x' in from) to.x = 0;
  if ('y' in from) to.y = 0;
  if ('scale' in from) to.scale = 1;
  if ('rotateX' in from) to.rotateX = 0;
  if ('rotateY' in from) to.rotateY = 0;
  if ('rotateZ' in from) to.rotateZ = 0;
  return to;
};


function YouTubeFacade({ id, label, caption }) {
  const [active, setActive] = useState(false);
  return (
    <figure>
      {active ? (
        <div className="yt-facade">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      ) : (
        <button type="button" className="yt-facade" onClick={() => setActive(true)} aria-label={`Odtwórz: ${label}`}>
          <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" loading="lazy" decoding="async" width="1280" height="720" />
          <span className="yt-facade__play" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
          <span className="yt-facade__meta">{label}</span>
        </button>
      )}
      {caption && <figcaption className="media-caption">{caption}</figcaption>}
    </figure>
  );
}

const INSTAGRAM_VIDEOS = {
  client: [
    { href: 'https://www.instagram.com/reel/DTVy2UGjIJV/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', label: 'Realizacja dla klienta 01', poster: materialKlienta01Poster },
    { href: 'https://www.instagram.com/reel/DUGLnRLDN22/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', label: 'Realizacja dla klienta 02', poster: materialKlienta02Poster },
  ],
  ads: [
    { href: 'https://www.instagram.com/reel/DV8vDYKjEDk/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', label: 'Film reklamowy 01', poster: filmReklamowy01Poster },
    { href: 'https://www.instagram.com/reel/DX6sC3osB4U/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', label: 'Film reklamowy 02', poster: filmReklamowy02Poster },
    { href: 'https://www.instagram.com/reel/DZvEzblACwW/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', label: 'Film reklamowy 03', poster: filmReklamowy03Poster },
  ],
};

const COVERFLOW_PLAYBACK_EVENT = 'coverflow-playback-start';

const announceCoverflowPlayback = (carouselId) => {
  document.dispatchEvent(new CustomEvent(COVERFLOW_PLAYBACK_EVENT, { detail: { carouselId } }));
};

function InstagramEmbed({ reelId, label, carouselId, onLoad }) {
  const iframeRef = useRef(null);
  const announceInteraction = useCallback(() => {
    announceCoverflowPlayback(carouselId);
  }, [carouselId]);

  useEffect(() => {
    const iframe = iframeRef.current;
    const handleWindowBlur = () => {
      window.requestAnimationFrame(() => {
        if (document.activeElement === iframe) announceInteraction();
      });
    };

    window.addEventListener('blur', handleWindowBlur);
    return () => {
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [announceInteraction]);

  return (
    <iframe
      ref={iframeRef}
      src={`https://www.instagram.com/reel/${reelId}/embed/?playsinline=1`}
      title={label}
      onLoad={onLoad}
      onFocus={announceInteraction}
      onPointerDown={announceInteraction}
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}

function CoverflowSlide({ video, offset, isActive, isPlayerMounted, isPlayerReady, carouselId, onPlay, onPlayerReady, index }) {
  const reelId = video.href.split('/reel/')[1]?.split('/')[0] || '';
  const depth = Math.abs(offset);
  const isHidden = depth > 2;
  const handlePlaceholderClick = () => onPlay(index);
  const playButton = (
    <span className="coverflow-video-play-button" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="m9 6 9 6-9 6V6Z" /></svg>
    </span>
  );

  return (
    <div
      className="coverflow-slide"
      data-active={isActive}
      data-depth={depth}
      aria-hidden={isHidden ? 'true' : undefined}
      style={{
        transform: `translate3d(${offset * 27}%, 0, 0) scale(${isActive ? 1 : 0.84})`,
        zIndex: isActive ? 10 : 5 - depth,
        opacity: isHidden ? 0 : Math.max(0.35, 1 - depth * 0.34),
        pointerEvents: isHidden ? 'none' : 'auto',
      }}
    >
      <div className={`coverflow-video-card coverflow-instagram-card ${isActive ? 'coverflow-instagram-card--active' : ''} ${isPlayerReady ? 'coverflow-instagram-card--ready' : ''}`}>
        {isPlayerMounted ? (
          <>
            <InstagramEmbed reelId={reelId} label={video.label} carouselId={carouselId} onLoad={onPlayerReady} />
            {!isPlayerReady && (
              <div className="coverflow-video-loading-poster" aria-hidden="true">
                {video.poster && <img src={video.poster} alt="" loading="lazy" decoding="async" />}
                {playButton}
              </div>
            )}
          </>
        ) : (
          <button
            type="button"
            className="coverflow-video-placeholder"
            onClick={handlePlaceholderClick}
            tabIndex={isHidden ? -1 : 0}
            aria-label={isActive ? `Przygotowywanie ${video.label}` : `Pokaż ${video.label}`}
          >
            {video.poster && <img src={video.poster} alt="" loading="lazy" decoding="async" />}
            {playButton}
          </button>
        )}
      </div>
    </div>
  );
}

function VideoCoverflow({ videos, title, subtitle, id }) {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(videos.length / 2));
  const [isActivePlayerMounted, setIsActivePlayerMounted] = useState(false);
  const [isActivePlayerReady, setIsActivePlayerReady] = useState(false);
  const viewportRef = useRef(null);
  const isViewportVisibleRef = useRef(false);
  const hasEnteredViewportRef = useRef(false);
  const touchStart = useRef(null);
  const touchDelta = useRef(0);

  const stopPlayback = useCallback(() => {
    setIsActivePlayerMounted(false);
    setIsActivePlayerReady(false);
  }, []);
  const selectIndex = useCallback((nextIndex) => {
    stopPlayback();
    setCurrentIndex(nextIndex);
    setIsActivePlayerMounted(true);
  }, [stopPlayback]);
  const goNext = useCallback(() => selectIndex((currentIndex + 1) % videos.length), [currentIndex, selectIndex, videos.length]);
  const goPrev = useCallback(() => selectIndex((currentIndex - 1 + videos.length) % videos.length), [currentIndex, selectIndex, videos.length]);
  useEffect(() => {
    const viewport = viewportRef.current;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPlayback();
      } else if (isViewportVisibleRef.current) {
        setIsActivePlayerMounted(true);
      }
    };

    // Instagram nie udostępnia publicznego API pauzy dla cross-origin iframe.
    // Odmontowanie aktywnego embedu jest więc pewnym sposobem zatrzymania Reela.
    if (!viewport || !('IntersectionObserver' in window)) {
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }

    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsActivePlayerMounted(true);
    }, { rootMargin: '600px 0px', threshold: 0 });
    const stopObserver = new IntersectionObserver(([entry]) => {
      isViewportVisibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) {
        hasEnteredViewportRef.current = true;
        setIsActivePlayerMounted(true);
      } else if (hasEnteredViewportRef.current) {
        stopPlayback();
      }
    }, { threshold: 0 });

    preloadObserver.observe(viewport);
    stopObserver.observe(viewport);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      preloadObserver.disconnect();
      stopObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [stopPlayback]);

  useEffect(() => {
    const stopWhenOtherStarts = (event) => {
      if (event.detail?.carouselId === id) return;
      stopPlayback();
    };

    document.addEventListener(COVERFLOW_PLAYBACK_EVENT, stopWhenOtherStarts);
    return () => document.removeEventListener(COVERFLOW_PLAYBACK_EVENT, stopWhenOtherStarts);
  }, [id, stopPlayback]);

  const onTouchStart = (e) => { touchStart.current = e.targetTouches[0].clientX; touchDelta.current = 0; };
  const onTouchMove = (e) => { if (touchStart.current !== null) touchDelta.current = touchStart.current - e.targetTouches[0].clientX; };
  const onTouchEnd = () => { const d = touchDelta.current; if (Math.abs(d) > 44) (d > 0 ? goNext : goPrev)(); touchStart.current = null; touchDelta.current = 0; };
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
  };
  return (
    <div className="coverflow-section">
      <div className="coverflow-layout">
        <div className="coverflow-info" data-reveal="left">
          {title && <h3 className="slider-title">{title}</h3>}
          {subtitle && <p className="slider-subtitle">{subtitle}</p>}
          <span className="slider-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            Przeciągnij lub użyj strzałek
          </span>
        </div>
        <div className="coverflow-carousel" data-reveal="right">
          <div className="coverflow-wrapper">
            <button type="button" className="slider-btn slider-btn-prev" onClick={goPrev} aria-label="Poprzedni materiał"><span aria-hidden="true">‹</span></button>
            <div ref={viewportRef} className="coverflow-viewport" role="group" aria-roledescription="karuzela" aria-label={title} tabIndex={0} onKeyDown={onKeyDown} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
              <div className="coverflow-track">
                {videos.map((video, i) => {
                  const rawOffset = i - currentIndex;
                  const offset = rawOffset > videos.length / 2
                    ? rawOffset - videos.length
                    : rawOffset < -videos.length / 2
                      ? rawOffset + videos.length
                      : rawOffset;

                  return (
                    <CoverflowSlide
                      key={`${id}-${i}`}
                      index={i}
                      video={video}
                      offset={offset}
                      isActive={i === currentIndex}
                      isPlayerMounted={i === currentIndex && isActivePlayerMounted}
                      isPlayerReady={i === currentIndex && isActivePlayerReady}
                      carouselId={id}
                      onPlay={selectIndex}
                      onPlayerReady={() => setIsActivePlayerReady(true)}
                    />
                  );
                })}
              </div>
            </div>
            <button type="button" className="slider-btn slider-btn-next" onClick={goNext} aria-label="Następny materiał"><span aria-hidden="true">›</span></button>
          </div>
          <div className="slider-dots">
            {videos.map((video, i) => <button key={video.href} type="button" className={`slider-dot ${i === currentIndex ? 'active' : ''}`} onClick={() => selectIndex(i)} aria-label={`${video.label}, ${i + 1} z ${videos.length}`} aria-current={i === currentIndex} />)}
          </div>
          <a className="coverflow-open-link" href={videos[currentIndex].href} target="_blank" rel="noreferrer">Otwórz aktualny film na Instagramie <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </div>
  );
}

const SERVICES = [
  {
    num: '01',
    planet: servicesPlanetRed,
    icon: iconNagrywanie,
    title: 'Nagrywanie',
    desc: 'Przychodzimy z gotowym pomysłem, nie z pytaniem „co dziś kręcimy?”. Koncepcja, scenariusz, plan zdjęciowy i realizacja: całość po naszej stronie.',
  },
  {
    num: '02',
    planet: servicesPlanetOrange,
    icon: iconMontaz,
    title: 'Montaż',
    desc: 'Surowe ujęcia zamieniamy w materiał, który trzyma uwagę do końca. Rytm, dźwięk, napisy i color grading dopięty pod konkretną platformę.',
  },
  {
    num: '03',
    planet: servicesPlanetBlue,
    icon: iconPublikacja,
    title: 'Publikacja',
    desc: 'Content bez planu to loteria. Ustalamy harmonogram, godziny publikacji i tematy na cały miesiąc, potem konsekwentnie je realizujemy.',
  },
  {
    num: '04',
    planet: servicesPlanetPink,
    icon: iconObsluga,
    title: 'Obsługa',
    desc: 'Odpowiadamy na komentarze i wiadomości, pilnujemy społeczności i wyłapujemy realne zapytania, zanim wystygną.',
  },
];

function ServicePlanetTitle({ title }) {
  const letters = Array.from(title);
  const centerIndex = (letters.length - 1) / 2;
  const maxDistance = Math.max(centerIndex, 1);

  return (
    <h3 aria-label={title}>
      <span className="service-planet__title-visual" aria-hidden="true">
        {letters.map((letter, index) => {
          const distance = Math.abs(index - centerIndex) / maxDistance;

          return (
            <span
              className="service-planet__title-letter"
              key={`${title}-${index}`}
              style={{
                '--title-curve': `${distance ** 2 * 0.28}em`,
                '--title-rotation': `${(index - centerIndex) * 2.4}deg`,
              }}
            >
              {letter === ' ' ? '\u00a0' : letter}
            </span>
          );
        })}
      </span>
    </h3>
  );
}

function UslugiSection() {
  const sectionRef = useRef(null);
  const backdropRef = useRef(null);
  const storyRef = useRef(null);
  const headingRef = useRef(null);
  const planetsRef = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const story = storyRef.current;
    const heading = headingRef.current;
    const backdrop = backdropRef.current;
    const planets = planetsRef.current.filter(Boolean);

    if (!section || !story || !heading || !backdrop || planets.length !== SERVICES.length) return undefined;

    if (prefersReducedMotion()) {
      planets.forEach((planet, index) => {
        const visual = planet.querySelector('.service-planet__visual');
        const image = planet.querySelector('.service-planet__image');
        const content = planet.querySelector('.service-planet__content');

        planet.style.zIndex = String(40 + index);
        visual?.style.setProperty('opacity', index === 0 ? '1' : '0');
        image?.style.setProperty('opacity', '1');
        content?.style.setProperty('opacity', '1');
      });
      return undefined;
    }

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(
        {
          isMobile: '(max-width: 767px)',
          isDesktop: '(min-width: 768px)',
        },
        (context) => {
          const { isMobile } = context.conditions;
          const viewportHeight = () => window.innerHeight;
          const planetStart = 0;
          const enterDuration = 0.42;
          const holdDuration = 0.46;
          const transitionLead = 0.36;
          // Poprzednia planeta zaczyna odlot chwilę przed wejściem kolejnej.
          // Ruchy nadal się nakładają, ale nie wygląda to tak, jakby kolejna
          // planeta pojawiała się zanim obecna zdążyła ruszyć.
          const stepLength = enterDuration + holdDuration + transitionLead;
          const totalDuration = planetStart + stepLength * SERVICES.length;
          const storyLength = () => viewportHeight() * totalDuration;
          const planetSize = isMobile ? 'min(158vw, 780px)' : 'min(76vw, 118vh, 1180px)';
          // Pierwsza planeta startuje tuż za dolną krawędzią, żeby sekcja nie
          // zaczynała się pustym ekranem. Na mobile większy offset wynika z
          // proporcjonalnie większej planety.
          const initialYPercent = isMobile ? 80 : 43;
          // GSAP steruje tu pełnym translateY. Na mobile aktywny fragment
          // zatrzymuje się odrobinę wyżej, żeby lepiej wypełnić pusty kadr.
          const activeYPercent = isMobile ? -19 : -15;
          // Starsze planety zostają za aktywną, są mniejsze i lekko wyżej.
          // Na mobile zwiększamy odstęp między poziomami, żeby ich dalsze
          // fragmenty były widoczne także w górnej części ekranu.
          const getDepthState = (depth) => {
            const size = planets[0].querySelector('.service-planet__visual').offsetWidth;
            const height = story.clientHeight;
            const activeCenter = height * 0.5 + size * (activeYPercent / 100 + 0.5);
            const activeTop = activeCenter - size * 0.5;
            const nearestDiameter = size * (isMobile ? 0.42 : 0.44);
            const diameter = nearestDiameter * 0.64 ** (depth - 1);
            const edgeOverlap = 0.08;
            const stackStep = isMobile ? 0.12 : 0.05;
            let top = activeTop - nearestDiameter * edgeOverlap;
            for (let level = 2; level <= depth; level += 1) {
              top -= nearestDiameter * 0.64 ** (level - 2) * stackStep;
            }
            const projectedCenter = top + diameter * 0.5;
            const z = -180 * depth;
            const perspectiveScale = 1200 / (1200 - z);
            const localCenter = height * 0.5 + (projectedCenter - height * 0.5) / perspectiveScale;
            const scale = diameter / (size * perspectiveScale);
            return {
              yPercent: ((localCenter - height * 0.5) / size - 0.5) * 100,
              scale,
              z,
              filter: `blur(${(isMobile ? 2 : 2.5) + (depth - 1) * 5}px)`,
            };
          };
          const planetStates = planets.map((planet, index) => ({
            visual: planet.querySelector('.service-planet__visual'),
            content: planet.querySelector('.service-planet__content'),
            image: planet.querySelector('.service-planet__image'),
            index,
          }));

          section.classList.add('uslugi-is-enhanced');

          planetStates.forEach(({ visual, content, image, index }, planetIndex) => {
            gsap.set(visual, {
              width: planetSize,
              height: planetSize,
              xPercent: -50,
              yPercent: initialYPercent,
              scale: 0.82,
              z: -420,
              opacity: planetIndex === 0 ? 1 : 0,
              force3D: true,
            });
            gsap.set(image, {
              opacity: 1,
              filter: 'none',
            });
            gsap.set(content, {
              xPercent: -50,
              yPercent: -50,
              scale: 1,
              opacity: 0,
              force3D: true,
            });
            planets[planetIndex].style.zIndex = String(40 + index);
          });

          gsap.set(heading, { opacity: 1, y: 0, filter: 'none' });
          gsap.set(backdrop, { backgroundPositionY: '0%' });
          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: story,
              start: 'top top',
              end: () => `+=${Math.ceil(storyLength())}`,
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to(backdrop, { backgroundPositionY: '28%', duration: totalDuration }, 0);
          tl.to(heading, {
            opacity: 0,
            y: -30,
            filter: 'blur(4px)',
            duration: 0.22,
            ease: 'power2.in',
          }, 0.08);

          SERVICES.forEach((service, index) => {
            const current = planetStates[index];
            const next = planetStates[index + 1];
            const stepStart = planetStart + index * stepLength;
            const exitStart = stepStart + enterDuration + holdDuration;
            // Odlot zaczyna się przed kolejnym wejściem, a kończy już w trakcie
            // jego ruchu, dzięki czemu przejście pozostaje płynne.
            const exitDuration = 0.62;
            const currentDepth = getDepthState(1);

            // Widoczność zmienia się skokowo na początku wejścia. Planeta nie
            // przenika podczas lotu — startuje nieprzezroczysta poza kadrem.
            tl.set(current.visual, { opacity: 1 }, stepStart);
            tl.to(current.visual, {
              yPercent: activeYPercent,
              scale: 1,
              z: 0,
              duration: enterDuration,
              ease: 'power3.out',
            }, stepStart);
            tl.fromTo(current.content, {
              yPercent: 16,
              opacity: 1,
              filter: 'none',
            }, {
              yPercent: -50,
              scale: 1,
              opacity: 1,
              filter: 'none',
              duration: enterDuration,
              ease: 'power3.out',
            }, stepStart);

            if (!next) return;

            tl.to(current.content, {
              yPercent: -50,
              scale: 1,
              opacity: 0,
              filter: 'blur(9px)',
              duration: exitDuration,
              ease: 'power2.inOut',
            }, exitStart);
            tl.to(current.visual, {
              ...currentDepth,
              duration: exitDuration,
              ease: 'power2.inOut',
            }, exitStart);
            for (let olderIndex = index - 1; olderIndex >= 0; olderIndex -= 1) {
              const older = planetStates[olderIndex];
              const olderDepth = getDepthState(index - olderIndex + 1);
              tl.to(older.visual, {
                ...olderDepth,
                duration: exitDuration,
                ease: 'power2.inOut',
              }, exitStart);
              tl.to(older.content, {
                yPercent: -50,
                scale: 1,
                opacity: 0,
                filter: `blur(${6 + (index - olderIndex) * 2}px)`,
                duration: exitDuration,
                ease: 'power2.inOut',
              }, exitStart);
            }
          });

          planets.forEach((planet, index) => {
            planet.style.zIndex = String(40 + index);
          });

          return () => {
            tl.kill();
            gsap.set(planets, { clearProps: 'all' });
            gsap.set(backdrop, { clearProps: 'backgroundPositionY' });
            gsap.set(heading, { clearProps: 'all' });
            story.style.removeProperty('min-height');
            section.classList.remove('uslugi-is-enhanced');
          };
        }
      );
    }, section);

    return () => {
      ctx.revert();
      mm.revert();
      section.classList.remove('uslugi-is-enhanced');
    };
  }, []);
  return (
    <section ref={sectionRef} id="uslugi" className="services-stage uslugi-section">
      <div ref={storyRef} className="uslugi-story">
        <div ref={backdropRef} className="uslugi-backdrop" aria-hidden="true" />
        <div className="uslugi-story__veil" aria-hidden="true" />

        <div ref={headingRef} className="uslugi-story__heading">
          <span className="section-label section-label--plain">Usługi</span>
          <h2 className="title title--md">Cztery rzeczy, które bierzemy z Twojej głowy</h2>
          <p className="subtitle">Przelatujemy przez cały proces — od pierwszego ujęcia do aktywnej społeczności.</p>
        </div>

        <div className="uslugi-planets" aria-live="polite">
          {SERVICES.map((service, index) => (
            <article
              className={`service-planet service-planet--${index + 1}`}
              key={service.num}
              ref={(element) => { planetsRef.current[index] = element; }}
              aria-label={`${service.title}: ${service.desc}`}
            >
              <div className="service-planet__visual">
                <img
                  src={service.planet}
                  alt=""
                  className="service-planet__image"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  decoding="async"
                  width="1000"
                  height="1000"
                />
                <div className="service-planet__content">
                  <ServicePlanetTitle title={service.title} />
                  <img src={service.icon} alt="" className="service-planet__icon" loading="eager" decoding="async" width="512" height="512" />
                  <p>{service.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="uslugi-story__hint" aria-hidden="true">
          <span>Scrolluj, aby odkrywać</span>
          <span className="uslugi-story__hint-line" />
        </div>
      </div>

    </section>
  );
}

const PROCESS = [
  { num: '1', title: 'Napisz do nas', desc: 'Formularz albo Instagram. Wystarczy kilka zdań o firmie i o tym, co chcesz osiągnąć.' },
  { num: '2', title: 'Rozmowa i zakres', desc: 'Ustalamy cele, liczbę materiałów, harmonogram nagrań i budżet. Bez ukrytych pozycji.' },
  { num: '3', title: 'Pierwszy dzień zdjęciowy', desc: 'Przyjeżdżamy z pełnym sprzętem i gotowym planem. Ty robisz swoje, my resztę.' },
  { num: '4', title: 'Publikacja i wyniki', desc: 'Wrzucamy, moderujemy, mierzymy. Co miesiąc dostajesz konkretne liczby, nie ogólniki.' },
];

const KPIS = [
  { to: 600, prefix: '+', label: 'obserwacji na Instagramie' },
  { to: 1500, prefix: '+', label: 'obserwacji na TikToku' },
  { to: 200, suffix: ' tys.', label: 'polubień w 4 miesiące' },
  { to: 3, suffix: ' mln', label: 'wyświetleń na social mediach', warm: true },
];

const Check = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Arrow = () => (
  <span className="btn__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h13M12 5l7 7-7 7" />
    </svg>
  </span>
);

const FAQ = [
  {
    q: 'Ile trwa start współpracy?',
    a: 'Po rozmowie i ustaleniu zakresu pierwszy dzień zdjęciowy planujemy zwykle w ciągu 1–2 tygodni. Pierwsze materiały widzisz przed publikacją, więc nic nie idzie w świat bez Twojej akceptacji.',
  },
  {
    q: 'Muszę mieć pomysły na filmy?',
    a: 'Nie. Koncepcje przygotowujemy my, na podstawie tego, co działa w Twojej branży. Twoja rola to udostępnić nam miejsce, ludzi i produkt oraz powiedzieć, czego absolutnie nie chcesz pokazywać.',
  },
  {
    q: 'Co, jeśli nie czuję się dobrze przed kamerą?',
    a: 'To najczęstsza obawa i najłatwiejsza do rozwiązania. Prowadzimy przez ujęcia krok po kroku, kręcimy krótkimi fragmentami i montujemy tak, żeby efekt był naturalny. Sporo formatów robimy też bez pokazywania twarzy.',
  },
  {
    q: 'Czy pracujecie tylko lokalnie?',
    a: 'Bazujemy w okolicach Bielska-Białej i Żywca i tam jesteśmy najszybsi. Dalsze realizacje robimy zjazdami: kręcimy materiał na kilka tygodni naprzód w jeden lub dwa dni zdjęciowe.',
  },
  {
    q: 'Jak wygląda rozliczenie?',
    a: 'Współpraca miesięczna z ustalonym z góry zakresem, płatna po zakończonym miesiącu. Pojedyncze realizacje, na przykład film reklamowy, wyceniamy osobno przed startem.',
  },
];

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const navbarRef = useRef(null);
  const capsuleRef = useRef(null);
  const navLinksRef = useRef([]);
  const activeIndexRef = useRef(0);
  const isScrollingRef = useRef(false);

  const heroSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const resultsSectionRef = useRef(null);
  const projectCardRef = useRef(null);
  const resultsPhoneRef = useRef(null);
  const backgroundRef = useRef(null);
  const kpiRefs = useRef([]);
  const kpiStripRef = useRef(null);

  const moveCapsule = useCallback((index, animate = true) => {
    const capsule = capsuleRef.current;
    const target = navLinksRef.current[index];
    if (!capsule || !target) return;

    const props = {
      left: target.offsetLeft,
      top: target.offsetTop,
      width: target.offsetWidth,
      height: target.offsetHeight,
      opacity: 1,
    };
    gsap.killTweensOf(capsule);
    if (animate && !prefersReducedMotion()) {
      gsap.to(capsule, {
        ...props,
        duration: 0.42,
        ease: 'back.out(1.08)',
        overwrite: 'auto',
      });
    } else {
      gsap.set(capsule, props);
    }
  }, []);

  const handleNavClick = (e, index) => {
    e.preventDefault();
    activeIndexRef.current = index;
    setActiveIndex(index);
    isScrollingRef.current = true;
    moveCapsule(index);
    const target = document.getElementById(SECTION_IDS[index]);
    if (target) target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    window.setTimeout(() => { isScrollingRef.current = false; }, 620);
  };

  const handleMobileNavClick = (e, index) => {
    handleNavClick(e, index);
    setIsMobileMenuOpen(false);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setIsError(false);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'Nowe zapytanie ze strony',
          from_name: 'visually.pl',
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        setContactForm({ name: '', email: '', message: '' });
      } else {
        setIsError(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    moveCapsule(0, false);

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || isScrollingRef.current) return;
          const idx = SECTION_IDS.indexOf(entry.target.id);
          if (idx !== -1 && idx !== activeIndexRef.current) {
            activeIndexRef.current = idx;
            setActiveIndex(idx);
            moveCapsule(idx);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));

    const heroEl = heroSectionRef.current;
    const contactEl = document.getElementById('kontakt');

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY;
        if (navbarRef.current) navbarRef.current.classList.toggle('is-scrolled', y > 24);

        const heroBottom = heroEl ? heroEl.offsetHeight * 0.85 : 500;
        const contactTop = contactEl ? contactEl.offsetTop - window.innerHeight * 0.6 : Infinity;
        setShowStickyCta(y > heroBottom && y < contactTop);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const onResize = () => {
      if (!isScrollingRef.current) moveCapsule(activeIndexRef.current, false);
    };
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [moveCapsule]);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return undefined;
    const cards = Array.from(document.querySelectorAll('[data-tilt]'));
    const cleanups = cards.map((card) => {
      const rotateX = gsap.quickTo(card, 'rotateX', { duration: 0.55, ease: 'power3.out' });
      const rotateY = gsap.quickTo(card, 'rotateY', { duration: 0.55, ease: 'power3.out' });
      const x = gsap.quickTo(card, 'x', { duration: 0.55, ease: 'power3.out' });
      const y = gsap.quickTo(card, 'y', { duration: 0.55, ease: 'power3.out' });
      const onMove = (event) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        rotateX(py * -4);
        rotateY(px * 5);
        x(px * 3);
        y(py * 3);
      };
      const onLeave = () => {
        rotateX(0);
        rotateY(0);
        x(0);
        y(0);
      };
      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerleave', onLeave);
      return () => {
        card.removeEventListener('pointermove', onMove);
        card.removeEventListener('pointerleave', onLeave);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setIsMobileMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onPlay = (e) => {
      const target = e.target;
      if (!(target instanceof HTMLVideoElement) || target.muted) return;
      document.querySelectorAll('video').forEach((v) => {
        if (v !== target && !v.paused && !v.muted) v.pause();
      });
    };
    document.addEventListener('play', onPlay, true);
    return () => document.removeEventListener('play', onPlay, true);
  }, []);

  useLayoutEffect(() => {
    const reduce = prefersReducedMotion();
    document.documentElement.classList.add('gsap-ready');
    ScrollTrigger.config({ ignoreMobileResize: true });

    let media = null;
    let refreshHandler = null;
    let safetyTimer = 0;
    const ctx = gsap.context(() => {
      const heroTargets = gsap.utils.toArray('[data-hero]');
      const backgroundImage = backgroundRef.current?.querySelector('img');
      const heroSection = heroSectionRef.current;
      const heroBackgroundLayer = heroSection?.querySelector('.hero-scene__background');
      const heroUfoLayerElement = heroSection?.querySelector('.hero-scene__ufo');
      const heroFireflies = heroSection?.querySelector('.hero-fireflies');
      const heroContent = heroSection?.querySelector('.hero-content');
      const heroStones = heroSection?.querySelector('.hero-stones');
      const aboutSection = aboutSectionRef.current;
      const aboutCave = aboutSection?.querySelector('.about-scene__cave');
      const aboutContent = aboutSection?.querySelector('.about-grid');
      const aboutRocks = aboutSection?.querySelector('.about-scene__rocks');
      const resultsSection = resultsSectionRef.current;
      const resultsStars = resultsSection?.querySelectorAll('.results-stars');
      const resultsNebula = resultsSection?.querySelector('.results-cosmos-scene__nebula');
      const resultsPhone = resultsPhoneRef.current;
      const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;
      if (!reduce) {
        if (backgroundImage) {
          gsap.to(backgroundImage, {
            yPercent: -5,
            scale: 1.08,
            ease: 'none',
            scrollTrigger: { start: 0, end: 'max', scrub: 1.2 },
          });
        }
        if (heroSection && heroBackgroundLayer && heroUfoLayerElement && heroFireflies && heroContent && heroStones) {
          const heroTimeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: heroSection,
              start: 'top top',
              // Kończymy parallax dokładnie przy odklejeniu sticky viewportu.
              // Potem cała scena wyjeżdża już wspólnie, bez dodatkowego przyspieszenia kamieni.
              end: 'bottom bottom',
              scrub: 0.45,
              invalidateOnRefresh: true,
            },
          });
          // Tekst, trawa/UFO i świetliki mają wspólny parallax. Kamienie pozostają
          // szybszym planem pierwszym, więc mogą płynnie zasłonić napis.
          // Tło i oświetlenie dostają identyczny dystans w pikselach — procenty
          // rozjeżdżały je przez różne wysokości obu warstw.
          const getHeroSkyTravel = () => -(heroBackgroundLayer.getBoundingClientRect().height * 0.1);
          heroTimeline
            .fromTo(heroBackgroundLayer,
              { y: 0 },
              { y: getHeroSkyTravel, force3D: true },
              0)
            .fromTo(heroUfoLayerElement,
              { yPercent: 0 },
              { yPercent: -40, force3D: true },
              0)
            .fromTo(heroFireflies,
              { yPercent: 0 },
              { yPercent: -40, force3D: true },
              0)
            .fromTo(heroContent,
              { xPercent: -50, yPercent: 0 },
              {
                xPercent: -50,
                yPercent: -40,
                force3D: true,
              },
              0)
            .fromTo(heroStones,
              { yPercent: 0 },
              { yPercent: -136, force3D: true },
              0)
            ;
        }

        if (resultsSection && resultsStars?.length && resultsPhone) {
          // Wyniki mają własną, spokojną paralaksę. Gwiazdy są rozłożone na trzech
          // planach, a telefon zachowuje się jak obiekt zawieszony w tej scenie.
          const resultsTimeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: resultsSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.45,
              invalidateOnRefresh: true,
            },
          });
          resultsTimeline
            .fromTo(resultsStars[0], { yPercent: -4, xPercent: -1 }, { yPercent: 11, xPercent: 1, force3D: true }, 0)
            .fromTo(resultsStars[1], { yPercent: -9, xPercent: 1 }, { yPercent: 21, xPercent: -2, force3D: true }, 0)
            .fromTo(resultsStars[2], { yPercent: -15, xPercent: -2 }, { yPercent: 32, xPercent: 3, force3D: true }, 0)
            .fromTo(resultsPhone, { y: 112, x: -22, rotate: -8, rotateY: -8, scale: 0.9 }, { y: -124, x: 24, rotate: 8, rotateY: 8, scale: 1.18, force3D: true }, 0);
          if (resultsNebula) {
            resultsTimeline.fromTo(resultsNebula, { yPercent: 8, xPercent: -4, scale: 0.94 }, { yPercent: -10, xPercent: 5, scale: 1.08, force3D: true }, 0);
          }
        }

        if (aboutSection && aboutCave && aboutContent && aboutRocks) {
          // Sekcja przewija się normalnie razem z dokumentem; nie jest przypinana.
          // Parallax dodaje tylko różne dystanse: głazy są najszybsze,
          // treść wolniejsza, a jaskinia porusza się najsubtelniej w tle.
          const aboutTimeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: aboutSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          });
          aboutTimeline
            .fromTo(aboutCave,
              { yPercent: 1.5, scale: isMobileViewport ? 1 : 1.055 },
              { yPercent: -1.5, scale: isMobileViewport ? 1 : 1.055, force3D: true },
              0)
            .fromTo(aboutContent,
              { yPercent: 5 },
              { yPercent: -5, force3D: true },
              0)
            .fromTo(aboutRocks,
              { yPercent: 14 },
              { yPercent: -14, force3D: true },
              0);
        }
      }

      if (reduce) {
        gsap.set(heroTargets, { opacity: 1, x: 0, y: 0, scale: 1 });
      } else if (heroTargets.length) {
        gsap.set(heroTargets, { opacity: 0, y: 20 });
        gsap.timeline({ defaults: { ease: MOTION.ease }, onComplete: () => gsap.set(heroTargets, { clearProps: 'willChange' }) })
          .to(heroTargets, { opacity: 1, y: 0, duration: 0.86, stagger: MOTION.stagger, delay: 0.12 });
      }

      const revealTargets = gsap.utils.toArray('[data-reveal], [data-stagger] > *');
      if (reduce) {
        gsap.set(revealTargets, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: 'transform' });
      } else {
        document.querySelectorAll('.main-content section').forEach((section) => {
          const found = Array.from(section.querySelectorAll('[data-reveal], [data-stagger] > *'));
          const items = found.filter((el, i) => found.indexOf(el) === i);
          if (!items.length) return;
          items.sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
          items.forEach((el) => {
            const from = REVEAL_FROM[el.dataset.reveal] || REVEAL_FROM.up;
            gsap.set(el, { opacity: 0, ...from });
          });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: section.dataset.revealStart || MOTION.start,
              once: true,
              fastScrollEnd: true,
              invalidateOnRefresh: true,
            },
          });
          items.forEach((el, index) => {
            const from = REVEAL_FROM[el.dataset.reveal] || REVEAL_FROM.up;
            tl.to(el, {
              ...revealTo(from),
              duration: MOTION.revealDuration,
              ease: MOTION.ease,
            }, Math.min(index * MOTION.stagger, 0.5));
          });
        });

      }

      const strip = kpiStripRef.current;
      const write = (el, kpi, value) => {
        el.textContent = `${kpi.prefix || ''}${plNum(value, kpi.decimals || 0)}${kpi.suffix || ''}`;
      };
      KPIS.forEach((kpi, i) => {
        const el = kpiRefs.current[i];
        if (el) write(el, kpi, reduce ? kpi.to : 0);
      });
      if (!reduce && strip) {
        const numbers = gsap.timeline({ scrollTrigger: { trigger: strip, start: MOTION.start, once: true, fastScrollEnd: true } });
        KPIS.forEach((kpi, i) => {
          const el = kpiRefs.current[i];
          if (!el) return;
          const state = { value: 0 };
          numbers.to(state, {
            value: kpi.to,
            duration: 1.45,
            ease: 'power3.out',
            onUpdate: () => write(el, kpi, state.value),
            onComplete: () => write(el, kpi, kpi.to),
          }, Math.min(i * MOTION.stagger, 0.3));
        });
      }

      const safetySweep = () => {
        document.querySelectorAll('[data-reveal]:not([data-reveal-done]), [data-stagger] > *:not([data-reveal-done])').forEach((el) => {
          const box = el.getBoundingClientRect();
          if (box.top >= window.innerHeight * 1.14 || box.bottom <= -80) return;
          if (getComputedStyle(el).opacity !== '0') return;
          gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
          el.setAttribute('data-reveal-done', 'true');
        });
      };
      const refresh = () => {
        ScrollTrigger.refresh();
        window.clearTimeout(safetyTimer);
        safetyTimer = window.setTimeout(safetySweep, 360);
      };
      refreshHandler = refresh;
      window.addEventListener('load', refreshHandler);
      if (document.fonts?.ready) document.fonts.ready.then(refreshHandler).catch(() => {});
      safetyTimer = window.setTimeout(safetySweep, 2200);
    });

    return () => {
      window.clearTimeout(safetyTimer);
      if (refreshHandler) window.removeEventListener('load', refreshHandler);
      if (media) media.revert();
      ctx.revert();
      document.documentElement.classList.remove('gsap-ready');
    };
  }, []);

  return (
    <>
      <picture ref={backgroundRef} className="background">
        <source media="(min-width: 768px)" srcSet={tloPc} />
        <img src={tloTel} alt="" aria-hidden="true" />
      </picture>

      {/* ===== NAWIGACJA ===== */}
      <nav ref={navbarRef} className="navbar" aria-label="Główna nawigacja">
        <div className="nav-liquid-shell">
          <div className="nav-inner">
            <a href="#hero" className="nav-logo-link" aria-label="Visually, strona główna">
            <img src={logoFull} alt="Visually" className="nav-logo-full" width="120" height="22" />
          </a>

          <div ref={capsuleRef} className="nav-active-capsule" aria-hidden="true" />

          <div className="nav-links">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link ${activeIndex === i ? 'is-active' : ''}`}
                ref={(el) => { navLinksRef.current[i] = el; }}
                onClick={(e) => handleNavClick(e, i)}
                aria-current={activeIndex === i ? 'true' : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#kontakt"
            className="nav-cta"
            ref={(el) => { navLinksRef.current[CONTACT_INDEX] = el; }}
            onClick={(e) => handleNavClick(e, CONTACT_INDEX)}
          >
            Kontakt
          </a>

          <button
            type="button"
            className="nav-hamburger"
            aria-label={isMobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileMenuOpen((p) => !p)}
          >
            <span /><span /><span />
            </button>
          </div>
        </div>

        <div id="mobile-menu" className={`glass-panel mobile-menu ${isMobileMenuOpen ? 'is-open' : ''}`}>
          {NAV_ITEMS.map((item, i) => (
            <a key={item.label} href={item.href} className="mobile-menu-link" onClick={(e) => handleMobileNavClick(e, i)}>
              {item.label}
              <span className="mobile-menu-num">0{i + 1}</span>
            </a>
          ))}
          <a href="#kontakt" className="mobile-menu-link mobile-menu-link--cta" onClick={(e) => handleMobileNavClick(e, CONTACT_INDEX)}>
            Kontakt
          </a>
        </div>
      </nav>

      {/* ===== HERO: WARSTWOWA SCENA PARALLAX ===== */}
      <section id="hero" ref={heroSectionRef} className="hero-scene-section">
        <div className="hero-viewport">
          <div className="hero-scene" aria-hidden="true">
            <img
              src={heroBackground}
              alt=""
              className="hero-scene__layer hero-scene__background"
              width="1920"
              height="1080"
              decoding="async"
              fetchPriority="high"
            />
            <img
              src={heroUfoLayer}
              alt=""
              className="hero-scene__layer hero-scene__ufo"
              width="1920"
              height="1080"
              decoding="async"
            />
            <div className="hero-scene__scrim" />
            <div className="hero-fireflies" aria-hidden="true">
              {HERO_FIREFLIES.map((firefly, index) => (
                <span
                  key={`hero-firefly-${index + 1}`}
                  className="hero-firefly"
                  style={{
                    '--firefly-left': firefly.left,
                    '--firefly-top': firefly.top,
                    '--firefly-mobile-left': firefly.mobileLeft,
                    '--firefly-mobile-top': firefly.mobileTop,
                    '--firefly-base-size': firefly.size,
                    '--firefly-duration': firefly.duration,
                    '--firefly-delay': firefly.delay,
                    '--firefly-drift-x': firefly.driftX,
                    '--firefly-drift-y': firefly.driftY,
                    '--firefly-mid-x': firefly.midX,
                    '--firefly-mid-y': firefly.midY,
                    '--firefly-color': firefly.color,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="hero-content">
            <div className="hero-content__heading">
              <h1 className="title hero-title" data-hero>
                <span className="hero-title__lead">Content, który</span>
                <span className="hero-title__accent-wrap">
                  <span className="hero-title__sparkle hero-title__sparkle--left" aria-hidden="true">✦</span>
                  <span className="hero-title__accent">robi robotę.</span>
                  <span className="hero-title__star" aria-hidden="true">✦</span>
                  <span className="hero-title__sparkle hero-title__sparkle--right" aria-hidden="true">✦</span>
                  <span className="hero-title__sparkle hero-title__sparkle--top" aria-hidden="true">✦</span>
                  <span className="hero-title__sparkle hero-title__sparkle--bottom" aria-hidden="true">✦</span>
                </span>
              </h1>
            </div>

            <div className="hero-content__lower">
              <p className="hero-sub" data-hero>
                My tworzymy. <span>Twoja marka rośnie.</span>
              </p>

              <div className="hero-actions" data-hero>
                <a href="#kontakt" className="btn btn--solid btn--lg" onClick={(e) => handleNavClick(e, CONTACT_INDEX)}>
                  Zapytaj o wycenę
                  <Arrow />
                </a>
                <a href="#wyniki" className="btn btn--ghost btn--lg" onClick={(e) => handleNavClick(e, 1)}>
                  Zobacz wyniki
                </a>
              </div>
            </div>
          </div>

          <div className="hero-stones" aria-hidden="true">
            <img
              src={heroGrassLayer}
              alt=""
              className="hero-scene__layer hero-scene__grass"
              width="1920"
              height="1080"
              decoding="async"
            />
          </div>
          <div className="hero-scene__fade" aria-hidden="true" />
        </div>
      </section>

      <main className="main-content">
        {/* ===== O NAS ===== */}
        <section id="o-nas" ref={aboutSectionRef} className="about-section">
          <div className="about-viewport">
            <div className="about-interior">
              <div className="about-scene" aria-hidden="true">
                <div className="about-scene__cave-window">
                  <div className="about-scene__cave" />
                </div>
              </div>
              <div className="about-grid">
                <div className="about-copy">
                  <h2 className="title title--md about-title" data-reveal="up">
                    Mała ekipa,
                    <span className="title-muted">duże wymagania wobec siebie.</span>
                  </h2>
                  <p className="subtitle" data-reveal="up">
                    <strong>Visually</strong> wzięło się z pasji do kamery. Zaczynaliśmy od motoryzacji: tam
                    nauczyliśmy się kadru, montażu i opowiadania obrazem. Po drodze zrobiliśmy materiał, który
                    trafił na duży ekran w kinie w Bielsku-Białej.
                  </p>
                  <p className="subtitle" data-reveal="up">
                    Dziś prowadzimy social media szkoły jazdy w Żywcu i realizujemy filmy reklamowe dla firm z okolicy.
                    Nie jesteśmy dużą agencją i nie udajemy, że jesteśmy. Dostajesz kontakt bezpośrednio z ludźmi,
                    którzy trzymają kamerę.
                  </p>
                </div>

                <div className="about-media" data-reveal="right" data-tilt>
                  <YouTubeFacade
                    id={YT_ID}
                    label="Nasz film na dużym ekranie, kino w Bielsku-Białej"
                    caption="Realizacja pokazywana przed seansami w bielskim kinie."
                  />
                </div>
              </div>
            </div>
            <div className="about-foreground" aria-hidden="true">
              <div className="about-scene__rocks">
                <img src={aboutRocksLayer} alt="" width="1920" height="1080" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== KOSMOS: WYNIKI + USŁUGI ===== */}
        <div className="cosmos-sequence">
          {/* ===== WYNIKI ===== */}
          <section id="wyniki" ref={resultsSectionRef} className="results-section">
          <div className="results-cosmos-scene" aria-hidden="true">
            <div className="results-cosmos-scene__nebula" />
            {[...new Set(RESULTS_STARS.map((star) => star.layer))].map((layer) => (
              <div className={`results-stars results-stars--${layer}`} key={layer}>
                {RESULTS_STARS.filter((star) => star.layer === layer).map((star, index) => (
                  <span
                    className="results-star"
                    key={`${layer}-${index}`}
                    style={{
                      '--star-left': star.left,
                      '--star-top': star.top,
                      '--star-size': star.size,
                      '--star-opacity': star.opacity,
                      '--star-delay': star.delay,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="section-head section-head--center">
            <span className="section-label section-label--plain" data-reveal="up">Wyniki</span>
            <h2 className="title title--md" data-reveal="up">Zamiast obiecywać, pokazujemy liczby</h2>
            <p className="subtitle" data-reveal="up">
              Wszystko poniżej pochodzi z jednego konta klienta, w cztery miesiące, bez złotówki
              wydanej na reklamy.
            </p>
          </div>

          <div className="results-feature">
            <div className="case-study-card" ref={projectCardRef} data-reveal="up" data-tilt>
              <div className="case-study-window">
                <div className="case-study-window__top">
                  <div>
                    <span className="case-study-window__eyebrow">OSK CASE STUDY</span>
                    <h3>OSK Niedzielny Kierowca</h3>
                  </div>
                </div>
                <p className="case-study-window__lead">
                  Prawdziwe wyniki szkoły jazdy z Żywca. Wszystko zrobione organicznie — bez budżetu reklamowego,
                  dzięki regularnym materiałom i konsekwentnej komunikacji.
                </p>
                <div className="case-study-results">
                  <div className="case-study-results__head">
                    <strong>Wyniki organiczne</strong>
                    <span>4 miesiące działania</span>
                  </div>
                  <div className="kpi-strip" ref={kpiStripRef} data-stagger>
                    {KPIS.map((kpi, i) => (
                      <article className={`kpi ${kpi.warm ? 'kpi--warm' : ''}`} key={kpi.label}>
                        <span className="kpi__value" ref={(el) => { kpiRefs.current[i] = el; }}>0</span>
                        <span className="kpi__label">{kpi.label}</span>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="case-study-phone-scene">
              <div className="project-image-container">
                <img
                  ref={resultsPhoneRef}
                  src={telefonImage}
                  alt="Telefon z materiałami OSK Niedzielny Kierowca"
                  className="project-image"
                  loading="lazy"
                  decoding="async"
                  width="720"
                  height="720"
                />
              </div>
            </div>
          </div>

          {SHOW_TESTIMONIAL && TESTIMONIAL.quote && (
            <blockquote className="pull-quote" data-reveal="pop">
              <p>„{TESTIMONIAL.quote}”</p>
              <cite>{TESTIMONIAL.author}, {TESTIMONIAL.role}</cite>
            </blockquote>
          )}

          <VideoCoverflow
            id="reklamy"
            videos={INSTAGRAM_VIDEOS.ads}
            title="Filmy reklamowe"
            subtitle="Krótkie formy, które pokazują firmę tak, jak chciałbyś, żeby ją zapamiętano. Oglądaj aktywny materiał bez opuszczania strony."
          />

          <VideoCoverflow
            id="montaz"
            videos={INSTAGRAM_VIDEOS.client}
            title="Nasi klienci"
            subtitle="Zobacz gotowe realizacje i materiały klientów bezpośrednio na stronie."
          />

          <div className="section-cta" data-reveal="up">
            <div className="section-cta__text">
              <h3>Twoja branża wygląda inaczej?</h3>
              <p>Powiedz, co sprzedajesz i komu. Wrócimy z trzema pomysłami na materiały, zanim cokolwiek podpiszemy.</p>
            </div>
            <a href="#kontakt" className="btn btn--solid" onClick={(e) => handleNavClick(e, CONTACT_INDEX)}>
              Odezwij się
              <Arrow />
            </a>
          </div>
        </section>

        {/* ===== USŁUGI ===== */}
        <UslugiSection />
        </div>

        {/* ===== PROCES ===== */}
        <section id="proces" className="section--tight">
          <div className="section-head">
            <span className="section-label section-label--plain" data-reveal="up">Jak pracujemy</span>
            <h2 className="title title--md" data-reveal="up">Od wiadomości do pierwszej publikacji</h2>
          </div>
          <div className="process-row" data-stagger>
            {PROCESS.map((step) => (
              <article className="process-step" data-tilt key={step.num}>
                <div className="process-step__top">
                  <span className="process-num">{step.num}</span>
                </div>
                <div className="process-step__content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ===== CENNIK ===== */}
        <section id="cennik" className="section-cennik">
          <div className="section-head section-head--center">
            <span className="section-label section-label--plain" data-reveal="up">Cennik</span>
            <h2 className="title title--md" data-reveal="up">Trzy pakiety, zero gwiazdek w regulaminie</h2>
            <p className="subtitle" data-reveal="up">
              Zakres ustalamy przed startem i trzymamy się go. Bez opłat za „dodatkowe poprawki”.
            </p>
          </div>

          <div className="pricing-grid" data-stagger>
            {/* START */}
            <div className="pricing-card" data-tilt>
              <div className="pricing-header">
                <h3>Start</h3>
                <p className="pricing-desc">Dla marek, które dopiero wchodzą w wideo i chcą sprawdzić, czy to działa.</p>
              </div>
              <ul className="pricing-features">
                <li className="pricing-feature"><Check /> 4 rolki / TikToki miesięcznie</li>
                <li className="pricing-feature"><Check /> Montaż i color grading</li>
                <li className="pricing-feature"><Check /> Publikacja i podstawowy plan treści</li>
              </ul>
              <a href="#kontakt" className="btn btn--ghost btn--block" onClick={(e) => handleNavClick(e, CONTACT_INDEX)}>
                Zapytaj o ofertę
              </a>
            </div>

            {/* STANDARD */}
            <div className="pricing-card pricing-card-standard" data-tilt>
              <span className="pricing-badge">
                <img src={mascotCzarne} alt="" className="pricing-badge-mascot" loading="lazy" decoding="async" />
                Najczęściej wybierany
              </span>
              <div className="pricing-header">
                <h3>Standard</h3>
                <p className="pricing-desc">Pełny rytm publikacji. Ten pakiet zrobił wyniki, które widzisz wyżej.</p>
              </div>
              <ul className="pricing-features">
                <li className="pricing-feature"><Check /> 8 rolek / TikToków miesięcznie</li>
                <li className="pricing-feature"><Check /> 1 post foto tygodniowo</li>
                <li className="pricing-feature"><Check /> Pełna obsługa i publikacja</li>
                <li className="pricing-feature"><Check /> Plan treści na cały miesiąc</li>
                <li className="pricing-feature"><Check /> Raport wyników co miesiąc</li>
              </ul>
              <a href="#kontakt" className="btn btn--brand btn--block" onClick={(e) => handleNavClick(e, CONTACT_INDEX)}>
                Zaczynamy
                <Arrow />
              </a>
            </div>

            {/* PREMIUM */}
            <div className="pricing-card" data-tilt>
              <div className="pricing-header">
                <h3>Premium</h3>
                <p className="pricing-desc">Dla firm, które chcą oddać social media w całości i mieć spokój.</p>
              </div>
              <ul className="pricing-features">
                <li className="pricing-feature"><Check /> 12+ rolek / TikToków miesięcznie</li>
                <li className="pricing-feature"><Check /> Sesja zdjęciowa w cenie</li>
                <li className="pricing-feature"><Check /> Moderacja komentarzy i wiadomości</li>
                <li className="pricing-feature"><Check /> Dedykowany opiekun projektu</li>
                <li className="pricing-feature"><Check /> Priorytetowy czas realizacji</li>
              </ul>
              <a href="#kontakt" className="btn btn--ghost btn--block" onClick={(e) => handleNavClick(e, CONTACT_INDEX)}>
                Zapytaj o ofertę
              </a>
            </div>
          </div>

          <p className="pricing-note" data-reveal="up">
            Każdą współpracę wyceniamy indywidualnie: liczy się branża, zakres i to, jak dużo jesteśmy w stanie
            wziąć na siebie. <b>Pierwsza rozmowa i propozycja zakresu są bezpłatne.</b>
          </p>
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" className="section--tight">
          <div className="section-head section-head--center">
            <span className="section-label section-label--plain" data-reveal="up">Pytania</span>
            <h2 className="title title--md" data-reveal="up">To, o co pytają najczęściej</h2>
          </div>

          <div className="faq-list" data-reveal="up">
            {FAQ.map((item, i) => {
              const open = openFaq === i;
              return (
                <div className="faq-item" key={item.q} data-open={open}>
                  <h3>
                    <button
                      type="button"
                      className="faq-q"
                      aria-expanded={open}
                      aria-controls={`faq-a-${i}`}
                      id={`faq-q-${i}`}
                      onClick={() => setOpenFaq(open ? -1 : i)}
                    >
                      {item.q}
                      <span className="faq-icon" aria-hidden="true">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div className="faq-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                    <div><p>{item.a}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== KONTAKT ===== */}
        <section id="kontakt" className="contact-section">
          <div className="contact-layout">
            <aside className="contact-aside">
              <span className="section-label" data-reveal="up">Kontakt</span>
              <h2 className="title title--md" data-reveal="up">
                Zacznijmy od
                <span className="title-muted">krótkiej rozmowy.</span>
              </h2>
              <p className="subtitle" data-reveal="up">
                Opowiedz w kilku zdaniach o swojej marce i celu. Wrócimy z konkretną odpowiedzią w ciągu 24 godzin.
              </p>

              <div className="contact-direct" data-reveal="up">
                <a href="mailto:visually.shot@gmail.com">visually.shot@gmail.com</a>
                <a href="https://instagram.com/visually.shot" target="_blank" rel="noreferrer">Instagram&nbsp;↗</a>
              </div>
              <p className="contact-note" data-reveal="up">Bez zobowiązań. Bez automatycznych wiadomości.</p>
            </aside>

            <div className="glass-panel contact-form-wrap" data-reveal="right">
              {isSuccess ? (
                <div className="form-sent">
                  <h3>Wiadomość jest u nas.</h3>
                  <p>Dziękujemy. Odpowiemy najpóźniej w ciągu 24 godzin.</p>
                  <button type="button" className="btn btn--ghost btn--sm" onClick={() => setIsSuccess(false)}>
                    Napisz kolejną wiadomość
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <p className="contact-form-intro">Trzy pola wystarczą, żeby zacząć.</p>

                  {isError && (
                    <div className="form-status form-status-error" role="alert">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na e-mail.
                    </div>
                  )}

                  <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="sr-only" />

                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="contact-name">Imię lub firma</label>
                      <input
                        id="contact-name" name="name" type="text" autoComplete="organization"
                        placeholder="Jak się do Ciebie zwracać?"
                        value={contactForm.name} onChange={handleContactChange} required
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="contact-email">E-mail</label>
                      <input
                        id="contact-email" name="email" type="email" autoComplete="email"
                        placeholder="twoj@email.pl"
                        value={contactForm.email} onChange={handleContactChange} required
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-message">W czym możemy pomóc?</label>
                    <textarea
                      id="contact-message" name="message" rows="5"
                      placeholder="Napisz krótko o marce, projekcie lub celu."
                      value={contactForm.message} onChange={handleContactChange} required
                    />
                  </div>

                  <button type="submit" className="btn btn--solid btn--lg contact-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Wysyłanie…' : 'Wyślij wiadomość'}
                    {!isSubmitting && <Arrow />}
                  </button>

                  <p className="form-fineprint">
                    Wiadomość służy wyłącznie do kontaktu w sprawie zapytania.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ===== STOPKA ===== */}
        <footer className="footer">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src={logoFull} alt="Visually" className="footer-logo-full" loading="lazy" decoding="async" />
              <p>Studio wideo i foto z Beskidów. Robimy content, który da się policzyć.</p>
            </div>
            <div className="footer-col">
              <h4>Strona</h4>
              <ul>
                {NAV_ITEMS.map((item, i) => (
                  <li key={item.label}>
                    <a href={item.href} onClick={(e) => handleNavClick(e, i)}>{item.label}</a>
                  </li>
                ))}
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Kontakt</h4>
              <ul>
                <li><a href="mailto:visually.shot@gmail.com">visually.shot@gmail.com</a></li>
                <li><a href="https://instagram.com/visually.shot" target="_blank" rel="noreferrer">@visually.shot</a></li>
                <li><a href="#kontakt" onClick={(e) => handleNavClick(e, CONTACT_INDEX)}>Formularz wyceny</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Visually. Wszelkie prawa zastrzeżone.</span>
            <span>Bielsko-Biała ˇ Żywiec ˇ cała Polska</span>
          </div>
        </footer>
      </main>

      {/* ===== STICKY CTA (mobile) ===== */}
      <div className={`sticky-cta ${showStickyCta ? 'is-visible' : ''}`}>
        <span className="sticky-cta__text">
          <strong>Darmowa wycena</strong>
          <span>Odpowiedź w 24 h</span>
        </span>
        <a href="#kontakt" className="btn btn--solid btn--sm" onClick={(e) => handleNavClick(e, CONTACT_INDEX)}>
          Napisz
          <Arrow />
        </a>
      </div>
    </>
  );
}

export default App;
