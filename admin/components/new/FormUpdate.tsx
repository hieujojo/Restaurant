import React, { ChangeEvent, useState } from 'react'
import type { New, FormData } from './interfaces'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import axios from 'axios';
import { UPDATE_NEW_ENDPOINT } from '@/utils/constants/endpoints';
import { updateNew } from '@/features/new/newSlices';
import { setError } from '@/features/slices/errorSlices';
import Image from 'next/image';
import Error from '../ui/Error';

const FormUpdate: React.FC<New> = ({ _id, content, image, slug, title, type }) => {
    const [formData, setFormData] = useState<FormData>({
        content: content,
        image: image,
        slug: slug,
        title: title,
        type: type,
    });

    const [error, setErrors] = useState<Partial<FormData>>({})
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [idNew, setIdNew] = useState('');
    const setShowModal = (id: string) => {
        setShowModalEdit(true);
        setIdNew(id);
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

        if (!validateData.title) {
            errors.title = 'title is required';
        }
        if (!validateData.content) {
            errors.content = 'content is required';
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
                const response = await axios.put(UPDATE_NEW_ENDPOINT(_id), data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                });
                if (response.status === 200) {
                    dispatch(updateNew(response.data));
                    dispatch(setError({ status: 'success', message: 'New updated successfully.' }));
                } else {
                    dispatch(setError({ status: 'danger', message: 'Error updating new.' }));
                }
            } catch (error) {
                dispatch(setError({ status: 'danger', message: 'Error updating new.' }));
            }
        } else {
            setErrors(validationErrors);
        }
    };
    return (
        <div>
            {status && message && <Error state={status} message={message} />}
            <button  onClick={() => setShowModal(_id)} data-toggle="modal" data-target=".btn-update-user" type="button" className="btn btn-info btn-sm text-[13px]"><i className="fa fa-edit"></i></button>
            {showModalEdit && (idNew === _id) && (
            <div className="modal1 btn-create-user">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel">Update new</h4>
                            <button type="button" onClick={() => setShowModalEdit(false)} className="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* <!-- start form for validation --> */}
                            <form id="demo-form" onSubmit={handleSubmit} data-parsley-validate>
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
                                    <label htmlFor="title">title * :</label>
                                    <input type="text" value={formData.title} id="title" onChange={handleChange} className="form-control" name="title" />
                                    {error.title && <span className="text-danger">{error.title}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="content">content * :</label>
                                    <input type="text" value={formData.content} id="content" onChange={handleChange} className="form-control" name="content" data-parsley-trigger="change" />
                                    {error.content && <span className="text-danger">{error.content}</span>}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" onClick={() => setShowModalEdit(false)} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                            {/* <!-- end form for validations --> */}
                        </div>

                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default FormUpdate
