import React, { createContext, useContext, useState } from 'react';
import ErrorModal from '../screens/modal/ErrorModal.tsx';

interface ErrorModalContextData {
    showError: (msg: string) => void;
}

const ErrorModalContext = createContext<ErrorModalContextData>({ showError: () => {} });

export function ErrorModalProvider({ children }: { children: React.ReactNode }) {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    const showError = (msg: string) => {
        setMessage(msg);
        setVisible(true);
    };

    return (
        <ErrorModalContext.Provider value={{ showError }}>
            {children}
            <ErrorModal visible={visible} message={message} onClose={() => setVisible(false)} />
        </ErrorModalContext.Provider>
    );
}

export const useErrorModal = () => useContext(ErrorModalContext);
