import classNames from 'classnames';
import React from 'react';

type FormSubmitProps = React.ComponentPropsWithoutRef<'button'>;

const FormSubmit: React.FC<FormSubmitProps> = ({ children, className, ...rest }) => {
  return (
    <button
      type="submit"
      {...rest}
      className={classNames(
        'bg-gray-900 hover:bg-gray-800 transition-all	duration-200	ease-in-out text-gray-300 text-lg w-full justify-center px-5 py-1 rounded-xl shadow-custom',
        className,
      )}>
      {children}
    </button>
  );
};

export default FormSubmit;
