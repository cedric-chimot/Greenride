import React from 'react';
import { Field } from 'formik';

const Button = (props) => {
    return (
        <div>
            <Field
                type="submit"
                className={
                    props.width
                        ? `${props.width} bg-[#7cc474] hover:bg-[#54b44b] text-white font-extrabold py-4 px-32 cursor-pointer rounded`
                        : 'bg-[#7cc474] hover:bg-[#54b44b] text-white font-extrabold py-4 px-32 cursor-pointer rounded'
                }
                value={props.children}
            />
        </div>
    );
};

export default Button;