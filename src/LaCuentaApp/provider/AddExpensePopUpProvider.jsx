import { createContext, useState, useContext } from 'react';

const PopupContext = createContext();
export const usePopupContext = () => useContext(PopupContext);

const PopupProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isExpenseDetailOpen, setIsExpenseDetailOpen] = useState(false)

  return (
    <PopupContext.Provider value={{ isPopupOpen, setIsPopupOpen, isExpenseDetailOpen, setIsExpenseDetailOpen }}>
      {children}
    </PopupContext.Provider>
  );
};

export default PopupProvider;
