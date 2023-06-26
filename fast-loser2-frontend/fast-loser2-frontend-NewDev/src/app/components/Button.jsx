import React from 'react';
import { Field } from 'formik';

const Button = (props) => {
  return (
    <div>
      <Field
        type="submit"
        className={
          props.width
            ? `${props.width} bg-[#7cc474] tracking-wider hover:bg-[#54b44b] text-white font-extrabold py-2 px-4 rounded cursor-pointer`
            : 'bg-[#7cc474] hover:bg-[#54b44b] tracking-wider text-white font-extrabold py-2 px-4 rounded w-full cursor-pointer'
        }
        value={props.children}
        name={props.name}
      />
    </div>
  );
};

export default Button;
