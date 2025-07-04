import { Plus } from "lucide-react";
import React from "react";

const TitlePage = ({ title, quote, nameRoute, icon, children, ...props }) => {
    return (
        <div className="flex justify-between mt-4 p-2 items-center">
            <div className="p-2 md:p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 ">
                {title}
                <p className="mt-1 text-xs sm:text-sm font-normal text-gray-500 ">
                    {quote}
                </p>
            </div>
            {nameRoute && (
                <div className="flex items-center gap-2">
                    {children}
                    <button
                        {...props}
                        className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-100 bg-gray-900 shadow-sm transition duration-150 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-25 gap-2 cursor-pointer"
                    >
                        <span className="hidden md:block">{nameRoute}</span>
                        {icon ?? <Plus />}
                    </button>
                </div>
            )}
        </div>
    );
};

export default TitlePage;
