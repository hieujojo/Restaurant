import React, { ChangeEvent, useState } from 'react';
import type { FormData } from './interfaces';
import axios from 'axios';
import { CREATE_NEW_ENDPOINT } from '@/utils/constants/endpoints';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addNew } from '@/features/new/newSlices';
import { setError } from '@/features/slices/errorSlices';

const FormCreate: React.FC = () => {
  const initialFormData: FormData = {
    content: '',
    image: '',
    slug: '',
    title: '',
    type: '',
  }
  const [formData, setFormData] = useState<FormData>(initialFormData);
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

    if (!validateData.title) {
      errors.title = 'Title is required';
    }
    if (!validateData.content) {
      errors.content = 'Content is required';
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
        const response = await axios.post(CREATE_NEW_ENDPOINT, data);
        if (response.status === 200) {
          dispatch(addNew(response.data));
          dispatch(setError({ status: 'success', message: 'Create new successfully!' }));
          setFormData(initialFormData);
          setShowModal(false);
        } else {
          dispatch(setError({ status: 'danger', message: 'Create new failed!' }));
        }
      } catch (error) {
        dispatch(setError({ status: 'danger', message: 'Create new failed!' }));
      }
    } else {
      setErrors(validationErrors);
    }
  };
  return (
    <div>
      <button type="button" data-toggle="modal" onClick={() => setShowModal(true)} data-target=".btn-create-user" className="btn btn-info mx-2">Create <i className="fa fa-plus"></i></button>
      {showModal && (
      <div className="modal1 btn-create-user">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">Create new</h4>
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
                  <label htmlFor="title">title * :</label>
                  <input type="text" id="title"  onChange={handleChange} className="form-control" name="title"/>
                  {errors.title && <span className="text-danger">{errors.title}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="content">content * :</label>
                  <input type="text" id="content"  onChange={handleChange} className="form-control" name="content" data-parsley-trigger="change"/>
                  {errors.content && <span className="text-danger">{errors.content}</span>}
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
