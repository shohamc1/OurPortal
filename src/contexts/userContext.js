import React, {useState} from 'react';

const UserContext = React.createContext();

const UserProvider = (props) => {
    const [cart, setCart] = useState([]);

    return (
        <UserContext.Provider
            value={{cart, setCart}}
            {...props}
        />
    );
}

const useUser = () => {
    const context = React.useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

export { UserProvider, useUser };