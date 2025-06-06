import React from "react";

const Textarea = ({className,placeholder, ...props}) => {
    return (
        <textarea
            {...props}
            rows="2"
            className={`block p-2.5 w-full text-sm text-gray-900  rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 placeholder:text-gray-700 resize-none ${className}`}
            placeholder={`${placeholder}`}
        ></textarea>
    );
};

export default Textarea;
