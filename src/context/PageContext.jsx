import { createContext, useContext } from 'react';

const PageContext = createContext(null);

export const PageProvider = ({ children, content }) => {
  return (
    <PageContext.Provider value={content}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContent = () => {
  return useContext(PageContext);
};
