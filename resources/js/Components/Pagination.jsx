import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";

const Pagination = ({ datas }) => {

    return (
        <section className="flex flex-wrap justify-center md:justify-between items-center gap-0 sm:gap-2 p-2">
            <p className="text-sm font-medium text-slate-800 capitalize mt-4 md:mt-0">
                menampilkan <strong>{datas.from}</strong> sampai
                <strong> {datas.to}</strong> dari <strong>{datas.total}</strong>{" "}
                data
            </p>
            <div className="flex gap-1 mt-0 md:mt-4 justify-center flex-wrap p-1 mb-4">
                {datas?.data?.length > 0 &&
                    datas.links.map((link, index) => (
                        <Link
                            href={link.url ?? "#"}
                            key={index}
                            // disabled={!link.url}
                            className={`px-3 py-1 border ${
                                link.active ? "bg-stone-700 text-white" : "bg-stone-300"
                            }`}
                            onClick={(e) => {
                                if (!link.url) {
                                    e.preventDefault();
                                }
                            }}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
            </div>
        </section>
    );
};

export default Pagination;
