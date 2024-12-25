import React from 'react';
import { FormContext } from './FormProvider';
import classNames from 'classnames';

interface FormInputProps extends React.ComponentPropsWithoutRef<'input'> {
  name: string;
}

const FormInput: React.FC<FormInputProps> = ({ name, className, children, ...rest }) => {
  const formContext = React.useContext(FormContext);

  if (!formContext) {
    throw new Error('FormInput must be used within a FormProvider');
  }

  const { values, setFieldValue } = formContext;

  return (
    <div className="flex flex-row items-center gap-4">
      {children}
      <input
        {...rest}
        name={name}
        value={values[name] || ''}
        onChange={(e) => setFieldValue(name, e.target.value)}
        className={classNames('shadow-md', className)}
      />
    </div>
  );
};

export default FormInput;
