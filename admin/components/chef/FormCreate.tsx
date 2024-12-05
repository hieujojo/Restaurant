import React, { ChangeEvent, useState } from 'react';
import type { FormData } from './interfaces';
import axios from 'axios';
import { CREATE_CHEF_ENDPOINT } from '@/utils/constants/endpoints';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addChef } from '@/features/chef/chefSlice';
import { setError } from '@/features/slices/errorSlices';

const FormCreate: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        image: '',
        description: '',
      });
      const [errors, setErrors] = useState<Partial<FormData>>({});
      const [showModal, setShowModal] = useState(false);
      const [imageSrc, setImageSrc] = useState('');
    
      const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };
    
      
    
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
      const dispatch = useDispatch();
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
                } else {
                    data.append(key, value);
                }
            }
            try {
                const response = await axios.post(CREATE_CHEF_ENDPOINT, data);
                if (response.status === 200) {
                    dispatch(addChef(response.data));
                    dispatch(setError({ status: 'success', message: 'Create chef successfully!' }));
                    setShowModal(false);
                } else {
                    dispatch(setError({ status: 'danger', message: 'Create chef failed!' }));
                }
            } catch (error) {
                dispatch(setError({ status: 'danger', message: 'Create chef failed!' }));
            }
        } else {
            setErrors(validationErrors);
        }
    };
    return (
        <div>
            <button
        type="button"
        data-toggle="modal"
        data-target=".btn-create-user"
        onClick={() => setShowModal(true)}
        className="btn btn-info mx-2"
      >
        Create <i className="fa fa-plus"></i>
      </button>
            {showModal && (
                 <div className="modal1 btn-create-user">
                 <div className="modal-dialog modal-lg">
                   <div className="modal-content">
 
                         <div className="modal-header">
                             <h4 className="modal-title" id="myModalLabel">Create user</h4>
                             <button type="button" onClick={() => setShowModal(false)} className="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                             </button>
                         </div>
                         <div className="modal-body">
                             <form id="demo-form" onSubmit={handleSubmit} data-parsley-validate>
                                 <div className="form-group">
                                     {imageSrc && (
                                         <Image className="mb-5" src={imageSrc} width={100} height={100} alt="image" />
                                     )}
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
                                     <label htmlFor="description">Description * :</label>
                                     <input type="text" id="description" onChange={handleChange} className="form-control" name="description" data-parsley-trigger="change" />
                                     {errors.description && <span className="text-danger">{errors.description}</span>}
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
