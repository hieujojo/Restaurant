import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import type { Chef, FormData } from './interfaces';
import axios from 'axios';
import { UPDATE_CHEF_ENDPOINT } from '@/utils/constants/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import { updateChef } from '@/features/chef/chefSlice';
import { RootState } from '../../store/store';
import Error from '../ui/Error';
import { setError } from '@/features/slices/errorSlices';

const FormUpdate: React.FC<Chef> = ({ _id, name, image, description }) => {
    const [formData, setFormData] = useState<FormData>({
        name: name,
        image: image,
        description: description,
    });

    const [error, setErrors] = useState<Partial<FormData>>({})
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [idUser, setIdUser] = useState('');
    const setShowModal = (id: string) => {
        setShowModalEdit(true);
        setIdUser(id);
    }

    const [imageSrc, setImageSrc] = useState('');
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { files, id } = event.target;
        if (files && files.length > 0) {
            const src = URL.createObjectURL(files[0]);
            if (id === 'file-input') {
                setImageSrc(src);
                setFormData((prevData) => ({ ...prevData, image: files[0] }));
            }
        }
    };

    const validate = (validateData: FormData) => {
        const errors: Partial<FormData> = {};

        if (!validateData.name) {
            errors.name = 'name is required';
        }
        if (!validateData.description) {
            errors.description = 'description is required';
        }
        return errors;
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
    const dispatch = useDispatch();
    const { status, message } = useSelector((state: RootState) => state.error);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length === 0) {
            const data = new FormData();
            for (const key in formData) {
                const value = formData[key as keyof FormData];
                if (typeof value === 'boolean') {
                    data.append(key, value ? 'true' : 'false');
                } else if (value instanceof File) {
                    data.append(key, value);
                }
                else {
                    data.append(key, value);
                }
            }
            try {
                const response = await axios.put(UPDATE_CHEF_ENDPOINT(_id), data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                });
                if (response.status === 200) {
                    dispatch(updateChef(response.data));
                    dispatch(setError({ status: 'success', message: 'User updated successfully.' }));
                } else {
                    dispatch(setError({ status: 'danger', message: 'Error updating user.' }));
                }
            } catch (error) {
                dispatch(setError({ status: 'danger', message: 'Error updating user.' }));
            }
        } else {
            setErrors(validationErrors);
        }
    };
    return (
        <div>
            {status && message && <Error state={status} message={message} />}
            <button onClick={() => setShowModal(_id)} data-toggle="modal" data-target=".btn-update-user" type="button" className="btn btn-info btn-sm text-[13px]"><i className="fa fa-edit"></i></button>
            {showModalEdit && (idUser === _id) && (
                <div className="modal1 btn-update-user" tabIndex={-1} role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title" id="myModalLabel">Update user</h4>
                                <button type="button" className="close" data-dismiss="modal" onClick={() => setShowModalEdit(false)}><span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="demo-form" data-parsley-validate onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        {imageSrc ? (
                                            <Image className="mb-5" src={imageSrc} width={100} height={100} alt="image" />
                                        )
                                            : (
                                                <Image className="mb-5" src={`/${formData.image}`} width={100} height={100} alt="image" />
                                            )
                                        }

                                        <label
                                            className="font-semibold cursor-pointer text-black rounded-lg py-2.5 px-5 bg-[#5A738E]"
                                            htmlFor="file-input"
                                        >
                                            Upload Main Image
                                        </label>
                                        <input
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            type="file"
                                            id="file-input"
                                            className="hidden"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Name * :</label>
                                        <input type="text" id="name" value={formData.name} onChange={handleChange} className="form-control" name="name" />
                                        {error.name && <span className="text-danger">{error.name}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description * :</label>
                                        <input type="text" id="description" value={formData.description} onChange={handleChange} className="form-control" name="description" data-parsley-trigger="change" />
                                        {error.description && <span className="text-danger">{error.description}</span>}
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-dismiss="modal"
                                            onClick={() => setShowModalEdit(false)}
                                        >
                                            Close
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FormUpdate
