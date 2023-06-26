import React from 'react';

const CustomToast = (props) => {
  return (
    <div className="">
      <p className="text-3xl text-white font-bold">{props.message}</p>
    </div>
  );
};

export default CustomToast;
