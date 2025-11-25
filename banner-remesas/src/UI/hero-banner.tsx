'use client';

import { useState, useRef, useEffect } from 'react';

interface HeroBannerProps {
  videoUrl: string;
  title: string;
  description: string;
}

import './hero-banner.css';

export default function HeroBanner({
  videoUrl,
  title,
  description,
}: HeroBannerProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setIsVideoLoaded(true);
    const handleError = () => setIsVideoLoaded(true);

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <section id="hero_section_banner_remesas">
      <div id="hero_content_wrapper_banner_remesas">
        <div id="hero_text_container_banner_remesas">
          <h1 id="hero_title_banner_remesas">{title}</h1>
          <p id="hero_description_banner_remesas">{description}</p>
        </div>

        <div id="hero_video_block_banner_remesas">
          <div id="hero_video_wrapper_banner_remesas">
            <video
              id="hero_video_banner_remesas"
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              src={videoUrl}
            />

            <div
              id="hero_video_gradient_banner_remesas"
              aria-hidden="true"
            />
            <div
              id="hero_video_gradient_radius_banner_remesas"
              aria-hidden="true"
            />

            {!isVideoLoaded && (
              <div
                id="hero_video_fallback_banner_remesas"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
