import React from 'react';
import { ErrorMessage, useField } from "formik";

export const Input = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
        <div className={
            props.width
                ? ` ${'w-' + props.width
                }`
                : `w-full max-w-2xl`
        }>
            <div className="flex items-center">
                <div className="w-1/3">
                    <label className="block text-[#FFFFFF] font-bold text-left mb-1 pr-4"
                        htmlFor={field.name}>
                        {label}
                    </label>
                </div>
                <div className="w-2/3">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#7cc474] border-transparent focus:ring-0"
                        {...field} {...props}
                        id="inline-full-name"
                        autoComplete="off"
                    />
                </div>
            </div>
            <div className={
                props.margin
                    ? ` text-red-700 text-sm font-extrabold flex justify-start mb-10 ${'ml-' + props.margin
                    }`
                    : ` text-red-700 text-sm font-extrabold flex justify-start ml-56 mb-6`
            }>
                <ErrorMessage name={field.name} />
            </div>
        </div>
    );
};

export default Input;