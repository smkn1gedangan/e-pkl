import React, { useEffect } from "react";

const Table = ({ headers, children }) => {
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-700">
            <thead className="text-xs text-gray-50 uppercase bg-slate-900 border border-white">
                <tr>
                    {headers.map((head, index) => (
                        <th
                            key={index}
                            scope="col"
                            className="px-4 text-center py-3"
                        >
                            {head.nama}
                        </th>
                    ))}
                </tr>
            </thead>
            {children}
        </table>
    );
};

export default Table;
