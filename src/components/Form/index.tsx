import classNames from 'classnames';
import React from 'react';
import { FormProvider } from './FormProvider';
import FormInput from './FormInput';
import FormSubmit from './FormSubmit';

type FormComponentProps = React.ComponentPropsWithoutRef<'form'>;

const FormComponent: React.FC<FormComponentProps> = ({ className, children, ...rest }) => {
  return (
    <FormProvider>
      <form {...rest} className={classNames('form-class', className)}>
        {children}
      </form>
    </FormProvider>
  );
};

const Form = Object.assign(FormComponent, {
  Input: FormInput,
  Submit: FormSubmit,
});

export default Form;
