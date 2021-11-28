import React, {useContext} from "react";

export const QualitiesContext = React.createContext();
export const useQualities = () => {
    return useContext(QualitiesContext);
}
export const QualitiesProvider = ({children}) => {
    return (
        <QualitiesContext.Provider value={"simple text"}>
            {children}
        </QualitiesContext.Provider>
    )
}