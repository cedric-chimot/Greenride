import React from 'react';
import { Field } from 'formik';

const InputT = (props) => {
  return (
    <Field
      className={
        props.width
          ? ` appearance-none border-2 border-gray-200 rounded-full 
                    py-2 px-4 text-gray-700 leading-tight h-10 focus:outline-none 
                     focus:border-[#7cc474] border-transparent focus:ring-0 ${
                       'w-' + props.width
                     }`
          : ` appearance-none border-2 border-gray-200 rounded-full 
                    py-2 px-4 text-gray-700 leading-tight h-10 focus:outline-none 
                     focus:border-[#7cc474] border-transparent w-full focus:ring-0`
      }
      name={props.name ? props.name : ''}
      type={props.type ? props.type : ''}
      placeholder={props.placeholder ? props.placeholder : ''}
    />
  );
};

export default InputT;
