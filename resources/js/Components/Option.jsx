import React from "react";
import InputLabel from "./InputLabel";

export const OptionSorting = ({ datas, handleSearchChange, dataSearch }) => {
    return (
        <div className="grid gap-4 mb-4 grid-cols-2 p-4">
            
            <div className="">
                <InputLabel value={"Data"} />
                <select
                    onChange={(e) => handleSearchChange(e)}
                    value={dataSearch.sort_by}
                    id="sort_by"
                    name="sort_by"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 "
                >
                    {datas.map((data) => (
                        <option key={data.value} value={data.value}>
                            {data.name}
                        </option>
                    ))}
                </select>
            </div>
            {dataSearch.sort_by !== "" && (
                <div className="">
                    <InputLabel value={"Sorting"} />
                    <select
                        onChange={(e) => handleSearchChange(e)}
                        value={dataSearch.sort_order}
                        id="sort_order"
                        name="sort_order"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 "
                    >
                        <option value="desc">Akhir</option>
                        <option value="asc">Awal</option>
                    </select>
                </div>
            )}
        </div>
    );
};
