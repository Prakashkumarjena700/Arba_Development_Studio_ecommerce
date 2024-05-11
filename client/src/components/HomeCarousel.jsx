import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function HomeCarousel() {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "10%",
        slidesToShow: 1,
        dots: true,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear",
        arrows: false
    };
    return (
        <div className="slider-container" >
            <Slider {...settings}>
                <div className='p-5' >
                    <img className='lg:h-[350px] md:h-[350px] h-[150px]  lg:w-[97%] md:w-[97%] w-full'  src="https://mindstacktechnologies.com/wordpress/wp-content/uploads/2018/01/ecommerce-banner.jpg" alt="" />
                </div>
                <div className='p-5' >
                    <img className=' lg:h-[350px] md:h-[350px] h-[150px] lg:w-[97%] md:w-[97%] w-full' src="https://static.vecteezy.com/system/resources/previews/002/294/833/non_2x/e-commerce-promotion-web-banner-design-free-vector.jpg" alt="" />
                </div>
                <div className='p-5' >
                    <img className=' lg:h-[350px] md:h-[350px] h-[150px] lg:w-[97%] md:w-[97%] w-full' src="https://www.jdmedia.co.za/images/carousel/Ecommerce-Banner-1920.jpg" alt="" />
                </div>
                <div className='p-5' >
                    <img className=' lg:h-[350px] md:h-[350px] h-[150px] lg:w-[97%] md:w-[97%] w-full' src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/grocery-sale-retail-or-e-commerce-banner-ad-design-template-67720435bb809be27f46dfb1dd44c6fa_screen.jpg?ts=1606113265" alt="" />
                </div>
                <div className='p-5' >
                    <img className=' lg:h-[350px] md:h-[350px] h-[150px] lg:w-[97%] md:w-[97%] w-full' src="https://static.vecteezy.com/system/resources/thumbnails/004/299/813/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg" alt="" />
                </div>
                <div className=' p-5' >
                    <img className=' lg:h-[350px] md:h-[350px] h-[150px] lg:w-[97%] md:w-[97%] w-full' src="https://static.vecteezy.com/system/resources/thumbnails/011/871/820/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg" alt="" />
                </div>

            </Slider>
        </div>
    );
}

export default HomeCarousel;

