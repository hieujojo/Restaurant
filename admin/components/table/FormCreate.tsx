import React, { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import type { FormData } from './interfaces';
import axios from 'axios';
import { CREATE_TABLE_ENDPOINT, GET_TYPE_TABLES_ENDPOINT } from '@/utils/constants/endpoints';
import { useDispatch } from 'react-redux';
import { addTable } from '@/features/table/tableSlice';
import { setError } from '@/features/slices/errorSlices';

const FormCreate: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        image: [],
        quantity: 0,
        type: ''
      });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const validate = (validateData: FormData) => {
        const errors: Partial<FormData> = {};
        if (!validateData.name) {
            errors.name = 'Name is required';
        } 
        if (!validateData.type) {
            errors.type = 'Type is required';
        }
        return errors;
    };
    
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value 
        }));
    };
    // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const { files, id } = event.target;
    //     if (files && files.length > 0) {
    //         const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    //         console.log("image", newImages)
    //         if (id === 'file-input') {
    //             setImageSrc(prevData => ([...prevData, ...newImages]));
    //             setFormData(prevData => ({
    //                 ...prevData,
    //                 image: [...prevData.image, ...newImages]
    //             }));
    //         }
    //     }
    // };
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files && files.length > 0) {
            const newFiles = Array.from(files);
            setFormData(prevData => ({
                ...prevData,
                image: [...prevData.image, ...newFiles]
            }));
        }
    };
    
    const dispatch = useDispatch();
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const validationErrors = validate(formData);
    //     if (Object.keys(validationErrors).length === 0) {

    //         const formattedData = {
    //             ...formData,
    //             image: formData.image || []
    //         };
    //         try {
    //             const response = await axios.post(CREATE_TABLE_ENDPOINT, formattedData, {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });
    
    //             if (response.status === 200) {
    //                 dispatch(addTable(response.data));
    //                 dispatch(setError({ status: 'success', message: 'Create table successfully!' }));
    //                 setShowModal(false);
    //             } else {
    //                 dispatch(setError({ status: 'danger', message: 'Create table failed!' }));
    //             }
    //         } catch (error) {
    //             console.error('Error creating dish:', error);
    //             dispatch(setError({ status: 'danger', message: 'Create table failed!' }));
    //         }
    //     } else {
    //         setErrors(validationErrors);
    //     }
    // };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length === 0) {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('quantity', formData.quantity.toString());
            formDataToSend.append('type', formData.type);
            
            // Thêm tất cả các file ảnh vào FormData
            formData.image.forEach(file => {
                formDataToSend.append('image', file); // Key phải là 'image' để khớp với bên server
            });
    
            try {
                const response = await axios.post(CREATE_TABLE_ENDPOINT, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                if (response.status === 200) {
                    dispatch(addTable(response.data));
                    dispatch(setError({ status: 'success', message: 'Create table successfully!' }));
                    setShowModal(false);
                } else {
                    dispatch(setError({ status: 'danger', message: 'Create table failed!' }));
                }
            } catch (error) {
                console.error('Error creating table:', error);
                dispatch(setError({ status: 'danger', message: 'Create table failed!' }));
            }
        } else {
            setErrors(validationErrors);
        }
    };
    














    const [imageSrc, setImageSrc] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);
    const clearImage = (index: number) => {
        setImageSrc(prevData => prevData.filter((_, i) => i !== index));
        setFormData(prevData => ({
            ...prevData,
            image: prevData.image.filter((_, i) => i !== index)
        }));
    };
    
    useEffect(() => {
        setImageSrc([]);
    }, [showModal]);

    const removeDuplicates = (array: string[]) => {
        return Array.from(new Set(array));
      };
    const [types, setTypes] = useState<string[]>([]);
    useEffect(()=>{
        const fetchTypeDish = async () => {
            try {
                const ResponseType = await axios.get(GET_TYPE_TABLES_ENDPOINT, {
                    withCredentials: true,
                });
                setTypes(removeDuplicates(ResponseType.data));
            } catch (error) {
                console.log("Error fetching dishes:", error);
            }
        }
        fetchTypeDish();
    },[]);
    return (
        <div>
            <button type="button" onClick={() => setShowModal(true)} data-toggle="modal" data-target=".btn-create-user" className="btn btn-info mx-2">Create <i className="fa fa-plus"></i></button>
            {showModal && (
                <div className="modal1 btn-create-user">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title" id="myModalLabel">Create dish</h4>
                                <button type="button" onClick={() => setShowModal(false)} className="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="demo-form" onSubmit={handleSubmit} data-parsley-validate>
                                    <div className="form-group">
                                        <div className="row">
                                            {imageSrc.length > 0 && (
                                                imageSrc.map((image, index) => (
                                                    <>
                                                        <Image
                                                            key={index}
                                                            className="mb-5"
                                                            src={image}
                                                            width={100}
                                                            height={100}
                                                            alt="image"
                                                        />
                                                        <button onClick={()=>{clearImage(index)}} className="relative text-[20px] top-[-70px] left-[-10px]">x</button>
                                                    </>
                                                ))
                                            )}
                                        </div>
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
                                        <input type="text" id="name" onChange={handleChange} className="form-control" name="name"/>
                                        {errors.name && <span className="text-danger">{errors.name}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Quantity :</label>
                                        <input type="number" id="quantity" onChange={handleChange} className="form-control" name="quantity"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="select">Type * :</label>
                                        <div>
                                            <select id="type" name="type" onChange={handleChange} className="form-control">
                                            {types.length > 0 && (
                                                types.map((type, index)=>(
                                                    <option key={index} value={type}>{type}</option>
                                                ))
                                            )}
                                            </select>
                                        </div>
                                        {errors.type && <span className="text-danger">{errors.type}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description :</label>
                                        <textarea id="description" onChange={handleChange} className="form-control" name="description" />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Save</button>
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

export default FormCreate

















