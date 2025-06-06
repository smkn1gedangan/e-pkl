import { FilterX, Key, Menu } from "lucide-react";
import React from "react";

const Filter = ({ sortModal, setSortModal,isFilter = true, ...props }) => {
    return (
        <div
            className={`pb-4 p-2 flex ${
                isFilter ? "justify-between" : "justify-end"
            }`}
        >
            {isFilter && (
                <div className="relative mt-1 flex space-x-2 gap-2 items-center justify-center group">
                    <button
                        onClick={() => setSortModal(!sortModal)}
                        className="ml-2"
                    >
                        <Menu
                            className={"text-slate-800 w-8 h-8 cursor-pointer"}
                        />
                    </button>
                    <div
                        className="cursor-pointer absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden sm:group-hover:block
                            bg-gray-900 text-white text-sm px-3 py-1 rounded shadow text-center"
                    >
                        Sorting Data
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900"></div>
                    </div>
                </div>
            )}
            <div className="relative mt-1">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <Key className={"w-4 h-4 text-slate-500"} />
                </div>
                <input
                    {...props}
                    type="text"
                    id="search"
                    name="search"
                    className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-64 sm:80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Cari Data"
                />
            </div>
        </div>
    );
};

export default Filter;
