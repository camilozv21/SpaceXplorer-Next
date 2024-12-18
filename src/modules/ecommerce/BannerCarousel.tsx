"use client"

import { useMediaQuery } from '@mantine/hooks';
import './BannerCarousel.css'
import { Carousel, CarouselSlide, useAnimationOffsetEffect } from '@mantine/carousel';
import Autoplay from "embla-carousel-autoplay";
import { EmblaCarouselType } from 'embla-carousel-react';
import { useRef, useState } from 'react';

export default function BannerCarousel() {
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const [emblaApiRef, setEmblaApiRef] = useState<EmblaCarouselType | null>(null);
  const isSmallScreen = useMediaQuery("(min-width: 0px) and (max-width: 768px)");

  useAnimationOffsetEffect(emblaApiRef, 3000)

  return (
    <>
      <Carousel
        loop
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        id="carousel-featured-products"
        getEmblaApi={setEmblaApiRef}
        align="center"
        controlsOffset={-30}
        slideGap={20}
        height="100%"
        withControls={isSmallScreen ? false : true}
        style={{ flex: 1 }}
      >
        <CarouselSlide>1</CarouselSlide>
        <CarouselSlide>2</CarouselSlide>
        <CarouselSlide>3</CarouselSlide>
      </Carousel>
    </>
  )
}
