"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HomePage() {
  const slides = [
    {
      href: "https://www.tanishq.co.in/shop/celeste-solitaires?lang=en_IN",
      desktop:
        "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw9010136e/homepage/HeroBanner/celeste-solitaire-desktop.jpg",
      mobile:
        "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw8f9bd590/homepage/HeroBanner/celeste-solitaire-mobile.jpg",
      alt: "Celeste Solitaire",
    },
    {
      href: "https://www.tanishq.co.in/shop/diamond-1?lang=en_IN",
      desktop:
        "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw9e65c145/homepage/HeroBanner/festivals-of-diamond1-offer-desktop.jpg",
      mobile:
        "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwb6332e21/homepage/HeroBanner/festivals-of-diamond1-offer-mobile.jpg",
      alt: "Festival of Diamonds",
    },
    {
      href: "https://www.tanishq.co.in/shop/radiance-in-rhythm?lang=en_IN",
      desktop:
        "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw63015926/homepage/HeroBanner/rir-desktop-new.jpg",
      mobile:
        "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw7eef2080/homepage/HeroBanner/rir-mobile-new.jpg",
      alt: "Radiance In Rhythm",
    },
    {
      href: "https://www.tanishq.co.in/shop/sparkling-avenues?lang=en_IN",
      desktop:
        "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw2d6dfd57/homepage/HeroBanner/sparkling-avenues-desktop.jpg",
      mobile:
        "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwe17464ce/homepage/HeroBanner/sparkling-avenues-mobile.jpg",
      alt: "Sparkling Avenues",
    },
    {
      href: "https://www.tanishq.co.in/shop/dailywear-earrings?lang=en_IN",
      desktop:
        "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwb3ca7843/homepage/HeroBanner/dailywear-desktop1.jpg",
      mobile:
        "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwb89900f2/homepage/HeroBanner/dailywear-mobile1.jpg",
      alt: "Dailywear Earrings",
    },
    {
      href: "https://www.tanishq.co.in/shop/18kt-jewellery?lang=en_IN&pmin=0&pmax=100000",
      desktop:
        "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw19a96d60/homepage/HeroBanner/18-kt-jew-desktop.jpg",
      mobile:
        "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw350e5165/homepage/HeroBanner/18-kt-jew-mobile.jpg",
      alt: "18Kt Jewellery",
    },
    {
      href: "https://www.tanishq.co.in/rivaah?lang=en_IN",
      desktop:
        "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw5a5ad31d/rivaahpage/rivaah-south-geo-d1.jpg",
      mobile:
        "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw9dcaecc1/rivaahpage/rivaah-south-geo-m1.jpg",
      alt: "Rivaah",
    },
  ];

  const trending = [
    {
      href: "https://www.tanishq.co.in/shop/auspicious?lang=en_IN",
      img: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw04fafb24/homepage/trendingNow/auspicious-trending.jpg",
      text: "Auspicious Occasion",
    },
    {
      href: "https://www.tanishq.co.in/gifting?lang=en_IN",
      img: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwd7004c0d/homepage/trendingNow/gifting.jpg",
      text: "Gifting Jewellery",
    },
    {
      href: "https://www.tanishq.co.in/shop/18kt-jewellery?lang=en_IN",
      img: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw28989eec/homepage/trendingNow/18kt-jewellery.jpg",
      text: "18Kt Jewellery",
    },
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-10 pt-20">
      {/* Hero Banner Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        speed={1000}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          640: { spaceBetween: 15 },
          768: { spaceBetween: 15 },
          1024: { spaceBetween: 30, slidesPerView: 1.2 },
        }}
        className="rounded-2xl overflow-hidden shadow-xl"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <a href={slide.href}>
              <picture>
                <source srcSet={slide.mobile} media="(max-width: 767px)" />
                <img
                  src={slide.desktop}
                  alt={slide.alt}
                  className="w-full h-auto rounded-2xl transition-transform duration-500 hover:scale-[1.02]"
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </picture>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Collections Section */}
      <section className="mt-20 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 tracking-wider bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
          The KALAKRITI COLLECTION
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-500">
            <a href="https://www.tanishq.co.in/shop/sparkling-avenues?lang=en_IN">
              <img
                alt="Sparkling Avenues"
                className="w-full h-auto"
                src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw3fd145e1/homepage/tanishq-collections/sparkling-desktop.jpg"
                loading="lazy"
              />
            </a>
          </div>

          <div className="grid grid-rows-2 gap-8">
            <div className="rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-500">
              <a href="https://www.tanishq.co.in/shop/dailywear-earrings?lang=en_IN">
                <img
                  alt="Dailywear Earrings"
                  className="w-full h-auto"
                  src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwfba22b76/homepage/tanishq-collections/stunning-every-ear.jpg"
                  loading="lazy"
                />
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-500">
              <a href="https://www.tanishq.co.in/shop/ganesha-chaturthi?lang=en_IN">
                <img
                  alt="Ganesh Chaturthi"
                  className="w-full h-auto"
                  src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw96c93899/homepage/tanishq-collections/ganesh-chaturthi.jpg"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Trending Section */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mt-20 mb-10 bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
  Trending Now
</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trending.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={item.img}
                alt={item.text}
                className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <p className="text-center mt-4 font-medium text-gray-700 group-hover:text-pink-600">
                {item.text}
              </p>
            </a>
          ))}
        </div>
      </section>
    </section>
  );
}
