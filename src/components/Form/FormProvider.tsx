import React from 'react';

interface FormContextType {
  values: { [key: string]: string };
  setFieldValue: (field: string, value: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FormContext = React.createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: React.ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [values, setValues] = React.useState<{ [key: string]: string }>({});

  const setFieldValue = (field: string, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  return <FormContext.Provider value={{ values, setFieldValue }}>{children}</FormContext.Provider>;
};
