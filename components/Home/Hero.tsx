'use client';

import Link from 'next/link';
import { Button, Carousel } from 'antd';
import { ArrowRight, ShoppingBag, Zap } from 'lucide-react';
import useGetslides from '@/hooks/useGetSlides';

export default function Hero() {
  const { data: slides, isLoading } = useGetslides();



  // const slides = [
  //   {
  //     title: 'Summer Collection',
  //     subtitle: 'Up to 50% Off',
  //     description: 'Discover our latest arrivals and exclusive summer deals',
  //     image:
  //       'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg',
  //     color: 'from-blue-600 to-cyan-500',
  //   },
  //   {
  //     title: 'Premium Electronics',
  //     subtitle: 'Innovation at Your Fingertips',
  //     description: 'Shop the latest tech gadgets and smart devices',
  //     image:
  //       'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
  //     color: 'from-slate-700 to-slate-500',
  //   },
  //   {
  //     title: 'Exclusive Deals',
  //     subtitle: 'Limited Time Offers',
  //     description: 'Grab your favorite products before they are gone',
  //     image:
  //       'https://images.pexels.com/photos/1050244/pexels-photo-1050244.jpeg',
  //     color: 'from-orange-600 to-red-500',
  //   },
  // ];

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
