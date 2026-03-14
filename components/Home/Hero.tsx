'use client';

import Link from 'next/link';
import { Button, Carousel } from 'antd';
import { ShoppingBag, Zap } from 'lucide-react';
import useGetslides from '@/hooks/useGetSlides';
import HeroSkeleton from './HeroSkeleton';

export default function Hero() {
  const { data: slides, isLoading } = useGetslides();

  if (isLoading) return <HeroSkeleton />;

  return (
    <div className="relative">
      <Carousel autoplay autoplaySpeed={5000} effect="fade">
        {slides?.map((slide, index) => (
          <div key={index}>
            <div className="relative h-150 w-full overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/40" />
              </div>

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <div className="max-w-2xl">
                  <div className="flex items-center space-x-2 mb-4">
                    <Zap className="h-6 w-6 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold text-lg">
                      {slide.badge}

                    </span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl text-gray-200 mb-8">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href={`/${slide.link}`}>
                      <Button
                        type="primary"
                        size="large"
                        className="h-12 px-8 text-lg font-semibold bg-blue-600 hover:bg-blue-700 border-none"
                        icon={<ShoppingBag className="h-5 w-5" />}
                      >
                        Shop Now
                      </Button>
                    </Link>

                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

    </div>
  );
}
