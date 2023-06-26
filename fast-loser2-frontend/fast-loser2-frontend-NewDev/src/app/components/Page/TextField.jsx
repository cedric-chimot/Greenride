import React from 'react';
import { ErrorMessage, useField } from 'formik';

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="container2">
      <div className="text-red-700 text-sm font-extrabold flex justify-start mb-6">
        <ErrorMessage name={field.name} />
      </div>
    </div>
  );
};
