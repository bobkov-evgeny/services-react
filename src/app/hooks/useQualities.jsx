import React, {useContext, useEffect, useRef, useState} from "react";
import qualityService from "../services/quality.service";
import {toast} from "react-toastify";

export const QualitiesContext = React.createContext();
export const useQualities = () => {
    return useContext(QualitiesContext);
}
export const QualitiesProvider = ({children}) => {
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getQualities = async () => {
            try {
                const {content} = await qualityService.fetchAll();
                setQualities(content);
                setIsLoading(false);
            } catch (error) {
                errorCatcher(error)
            }
        }
        getQualities()
    }, []);

    const getQuality = (id) => {
        return qualities.find(item => item._id === id)
    };
    const updateQuality = async ({_id: id, ...data}) => {
        console.log(id, data)
        try {
            const {content} = await qualityService.update(id, data);
            setQualities(prevState => prevState.map(item => {
                return item._id === content._id ? content : item
            }));
            return qualities;
        } catch (error) {
            errorCatcher(error)
        }
    }
    const addQuality = async (data) => {
        try {
            const {content} = await qualityService.create(data);
            setQualities(prevState => [...prevState, content]);
            return content;
        } catch (error) {
            errorCatcher(error)
        }
    }
    const deleteQuality = async (id) => {
        setQualities(prevState => prevState.filter(item => item._id !== id));
        try {
            await qualityService.delete(id);
        } catch (error) {
            errorCatcher(error)
        }
    }

    function errorCatcher (error) {
        const {message} = error.response.data;
        setError(message);
    }

    useEffect(() => {
        if(error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error])
    
    return (
        <QualitiesContext.Provider value={{qualities, getQuality, updateQuality, addQuality, deleteQuality}}>
            {!isLoading ? children : <h1>Loading...</h1>}
        </QualitiesContext.Provider>
    )
}
