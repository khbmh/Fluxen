import { createContext, useState, useEffect } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
export const DataContext = createContext(null);

function Data({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // Retrieve isDark value from localStorage if available
    const savedIsDark = localStorage.getItem('isDark');
    return savedIsDark === null ? false : JSON.parse(savedIsDark);
  });

  const handleDark = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    // Save isDark value to localStorage
    localStorage.setItem('isDark', JSON.stringify(newIsDark));
  };

  const lightTheme = {
    text: '#030a00',
    bg: '#f8fff5',
    primary: '#07ca62',
    secondary: '#111111'
  };

  const darkTheme = {
    text: '#f8fff5',
    bg: '#030a00',
    primary: '#35f890',
    secondary: '#3a54e9',
  };

  const authData = {
    isDark,
    handleDark,
    lightTheme,
    darkTheme,
  };

  return (
    <DataContext.Provider value={authData}>
      {children}
      {/* <Toaster /> */}
    </DataContext.Provider>
  );
}

export default Data;
