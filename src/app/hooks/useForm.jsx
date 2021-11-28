import {useState} from "react";

const useForm = (initialState = {}, onSubmit) => {
    const [form, setForm] = useState(initialState || {});

    const handleChange = (target) => {
        setForm((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(form);
    };

    return {form, handleChange, handleSubmit}
}

export default useForm;