import React from 'react'
import { SwiperCarousel } from '../Slider/SwiperCarousel/SwiperCarousel'
import { SwiperSlider } from '../Slider/SwiperSlider/SwiperSlider'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const SwiperSkelton = () => {
  return (
    <>
            <SwiperCarousel>
                <SwiperSlider>
                <Skeleton width="100%" height="300px"/>

                    
                </SwiperSlider>
                <SwiperSlider>
                <Skeleton width="100%" height="300px"/>

                    
                </SwiperSlider>
                <SwiperSlider>
                <Skeleton width="100%" height="300px"/>

                    
                </SwiperSlider>


            </SwiperCarousel>
    </>
  )
}
