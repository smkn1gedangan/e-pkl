import React, { useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Head, Link } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import ReCAPTCHA from "react-google-recaptcha";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
const Welcome = ({ gambars }) => {
    let sliderRef = useRef(null);

    const settings = {
        infinite: true,
        fade: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    };
    return (
        <div
            className="h-screen object-cover object-center w-full shadow-2xl"
            style={{ background: "url(./header2.avif)" }}
        >
            <Head title="WELCOME" />
            <nav className="bg-transparent relative w-full z-20 top-0 start-0 ">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a
                        href="https://smkn1gedangan-malang.sch.id"
                        target="_blank"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <img
                            src="./img/logo.png"
                            className="h-8"
                            alt="Logo"
                        />
                        <span className="hidden md:block self-center text-2xl font-semibold whitespace-nowrap text-slate-900 md:text-white">
                            E-PKL
                        </span>
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <Link
                            as="button"
                            href={route("login")}
                            className="text-white bg-gradient-to-br from-emerald-700 to-sky-700  hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 rounded-lg text-sm px-4 py-2 text-center border border-white capitalize font-bold"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="w-full p-2 md:p-8 mt-4">
                <h1 className="mb-4 text-3xl font-extrabold text-white md:text-5xl lg:text-6xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        MODERN
                    </span>{" "}
                    RECAP DATA.
                </h1>
                <p className="text-lg font-normal text-gray-200 lg:text-xl ">
                    Monitoring, Penilaian, dan Dokumentasi PKL dalam Satu
                    Platform Digital yang Praktis dan Terintegrasi.
                </p>
            </div>
            <div className=" flex mt-4 md:mt-10 justify-center gap-2 p-2 items-center flex-wrap md:p-8">
                <div className="slider-container w-full mt-8">
                    <Slider
                        ref={(slider) => (sliderRef = slider)}
                        {...settings}
                        className=""
                    >
                        {gambars.length > 0
                            ? gambars.map((gambar) => (
                                  <div key={gambar.id} className="relative max-w-md left-1/2 -translate-x-1/2">
                                      <img
                                          className="object-center object-cover rounded-md"
                                          src={`./storage/${gambar.url}`}
                                          alt=""
                                      />
                                      <div
                                          style={{
                                              boxShadow:
                                                  "inset 0 0 3rem #38bdf8",
                                          }}
                                          className="inset-0 absolute opacity-90 z-30 shadow-emerald-500 shadow-2xl"
                                      ></div>
                                  </div>
                              ))
                            : ""}
                    </Slider>
                </div>
            </div>
           
            <Footer />
        </div>
    );
};

export default Welcome;
