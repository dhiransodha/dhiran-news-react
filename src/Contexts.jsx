// import { createContext, useState } from "react";

// export const LoadingContext = createContext();
// export const LoadingProvider = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   return (
//     <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
//       {children}
//     </LoadingContext.Provider>
//   );
// };

// export const ErrorContext = createContext();
// export const ErrorProvider = ({ children }) => {
//   const [isError, setIsError] = useState(false);
//   return (
//     <ErrorContext.Provider value={{ isError, setIsError }}>
//       {children}
//     </ErrorContext.Provider>
//   );
// };

// export default LoadingContext;