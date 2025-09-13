// import { createContext, useContext, useState } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const UserContext = createContext(null);

// const useUser = () => {
//     return useContext(UserContext);
// };

// const UserProvider = ({ children }) => {
//     const [userData, setUserData] = useState(() => {
//         const savedData = localStorage.getItem('userData');
//         return savedData ? JSON.parse(savedData) : null;
//     });

//     const saveUserData = (data) => {
//         setUserData(data);
//         localStorage.setItem('userData', JSON.stringify(data));
//     };

//     const clearUserData = () => {
//         setUserData(null);
//         localStorage.removeItem('userData');
//     };

//     const logout = () => {
//         console.log('Logout triggered');
//         clearUserData();
//         toast.success('You have successfully logged out!', {
//             position: 'top-right',
//             autoClose: 3000,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//         });
//     };
    

//     return (
//         <UserContext.Provider value={{ userData, setUserData: saveUserData, clearUserData, logout }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export { UserProvider, useUser };


import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create context
const UserContext = createContext(null);

// Custom hook to use the context
const useUser = () => {
    return useContext(UserContext);
};

// Provider
const UserProvider = ({ children }) => {
    // Store user data in state + localStorage
    const [userData, setUserData] = useState(() => {
        const savedData = localStorage.getItem('userData');
        return savedData ? JSON.parse(savedData) : null;
    });

    // ✅ Add toggle state here
    const [toggle, setToggle] = useState(false);

    const saveUserData = (data) => {
        setUserData(data);
        localStorage.setItem('userData', JSON.stringify(data));
    };

    const clearUserData = () => {
        setUserData(null);
        localStorage.removeItem('userData');
    };

    const logout = () => {
        console.log('Logout triggered');
        clearUserData();
        toast.success('You have successfully logged out!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <UserContext.Provider
            value={{
                userData,
                setUserData: saveUserData,
                clearUserData,
                logout,
                toggle,      // ✅ provide toggle
                setToggle,   // ✅ provide setToggle
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, useUser };

