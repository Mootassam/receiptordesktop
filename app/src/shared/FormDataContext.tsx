import React, { createContext, useContext, ReactNode } from "react";

export interface FormData {
  time: string;
  date: string;
  sender: string;
  amount: string;
  receiver: string;
  txid: string;
  fee?: string;
  referenceNo?: string;
}

interface FormDataContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormDataContext = createContext<FormDataContextType | null>(null);

interface FormDataProviderProps {
  children: ReactNode;
  value: FormDataContextType;
}

export const FormDataProvider: React.FC<FormDataProviderProps> = ({ children, value }) => {
  return (
    <FormDataContext.Provider value={value}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }
  return context;
};

export default FormDataContext;
