import moment from "moment";
import React, { useEffect, useState } from "react";

const Footer = ({ children }) => {
    const [currentDate, setCurrentDate] = useState(moment());
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(moment());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    },[]);
    return (
        <footer className="bg-white rounded-lg shadow-sm m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <section className="map w-full h-48">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.5893292145684!2d112.61662247356743!3d-8.243983582792838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78a756844f736f%3A0xee8e378530c977fc!2sSMK%20Negeri%201%20Gedangan!5e0!3m2!1sid!2sid!4v1749087043538!5m2!1sid!2sid"
                            className="border-none w-full h-48"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </section>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
                <span className="block text-sm text-gray-900 text-center">
                    {currentDate.format("MMMM Do YYYY, h:mm:ss A")}
                    &nbsp;&nbsp;
                    <a
                        href="https://smkn1gedangan-malang.sch.id/"
                        className="hover:underline"
                    >
                        Smkn 1 Gedangan
                    </a>
                    . All Rights Reserved.
                </span>

                {children}
            </div>
        </footer>
    );
};

export default Footer;
