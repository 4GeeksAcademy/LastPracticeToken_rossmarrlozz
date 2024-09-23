import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: updatedStore => 
                    setState({
                        store: { ...state.store, ...updatedStore },
                        actions: { ...state.actions }
                    })
            })
        );

        useEffect(() => {
            if (state.actions) {
                state.actions.getMessage(); // Llama a la acción getMessage
                state.actions.syncToken(); // Llama a la acción syncToken
            }
        }, [state.actions]); 

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;
