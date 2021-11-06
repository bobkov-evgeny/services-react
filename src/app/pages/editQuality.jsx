import React, {useEffect, useState} from "react";
import EditForm from "../components/ui/editForm";
import {useParams} from "react-router-dom";
import qualityService from "../services/quality.service";
import {toast} from "react-toastify";


const EditQualityPage = () => {
    const [quality, setQuality] = useState(null);
    const [errors, setErrors] = useState(null);
    const id = useParams().id;

    const updateQuality = async (content) => {
        try {
            const data = await qualityService.update(id, content);
            return data.content;
        } catch (error) {
            const {message, code} = error.response.data;
            setErrors({message, code});
            toast.error(message);
        }
    };
    const getQuality = async (id) => {
        try {
            const data = await qualityService.get(id);
            return data;
        } catch (error) {
            console.log("expected error")
        }
    }

    useEffect(() => {
        getQuality(id).then(res => setQuality(res));
    }, [])
    const handleSubmit = (data) => {
        updateQuality(data);
    }
    return (
        <>
            <h1>Edit Quality Page</h1>
            {quality ? <EditForm data={quality} onSubmit={handleSubmit}/> : "Loading..."}
        </>
    );
};

export default EditQualityPage;
