import React from "react";

const TitleModal = ({title,icon,...props}) => {
    return (
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 ">
                {title}
            </h3>
            <button
                {...props}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
                {icon}
            </button>
        </div>
    );
};

export default TitleModal;
