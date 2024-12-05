import React, { ChangeEvent, useEffect, useState } from 'react';
import type { Booking, FormData } from './interfaces';
import axios from 'axios';
import { CREATE_BOOKING_ENDPOINT, GET_DISHS_ENDPOINT, GET_TABLES_ENDPOINT, GET_USERS_ENDPOINT, UPDATE_BOOKING_ENDPOINT } from '@/utils/constants/endpoints';

const FormUpdate: React.FC<Booking> = ({_id, table, user, startTime, endTime, date, dish, totalmoney, type}) => {
    const [formData, setFormData] = useState<FormData>({
        table: table,
        user: user,
        startTime: startTime,
        endTime: endTime,
        date: date,
        dish: dish,
        totalmoney: totalmoney,
        type: type
      });
    
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("startTime 1: ", formData.startTime);
    console.log("endTime 1: ", formData.endTime);
    console.log("date 1:", formData.date);
    const startDateTime = new Date(`${formData.date}T${formData.startTime}:00Z`);
    const endDateTime = new Date(`${formData.date}T${formData.endTime}:00Z`);
   console.log("1111", startDateTime);
   console.log("2222", endDateTime);
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const data = {
          ...formData, 
          startTime: startDateTime.toISOString(), 
          endTime: endDateTime.toISOString(), 
        };
        console.log("data booking", data);
        const response = await axios.put(UPDATE_BOOKING_ENDPOINT(_id), data);
        if (response.status === 200) {
          alert('User has been created.');
          setShowModal(false);
        } else {
          alert('Error creating user.');
        }
      } catch (error) {
        console.error('Error creating user:', error);
        alert('Error creating user.');
      }
    } else {
      setErrors(validationErrors);
    }
  };
  




  const handleDishChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    const price = Number(event.target.dataset.price);
    setFormData((prevData) => {
      let newDishList = prevData.dish || [];
      let newTotalMoney = prevData.totalmoney;
      
      if (checked) {
        newDishList = [...newDishList, value];
        newTotalMoney += price;
      } else {
        newDishList = newDishList.filter((id) => id !== value);
      }
      return {
        ...prevData,
        dish: newDishList,
        totalmoney: newTotalMoney,
      };
    });
  };
  
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showModal, setShowModal] = useState(false);
  const [showDish, setShowDish] = useState(false);
  const validate = (validateData: FormData) => {
    const errors: Partial<FormData> = {};
    if (!validateData.user) {
      errors.user = 'user is required';
    }
    return errors;
  };
  const [tables, setTables] = useState<{ _id: string; name: string }[]>([]);
  const [users, setUsers] = useState<{ _id: string; name: string }[]>([]);
  const [dishs, setDishs] = useState<{ _id: string; name: string, price: number }[]>([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const ResponseType = await axios.get(GET_TABLES_ENDPOINT, {
          withCredentials: true,
        });
        setTables(ResponseType.data);
        const ResponseChef = await axios.get(GET_USERS_ENDPOINT, {
          withCredentials: true,
        });
        setUsers(ResponseChef.data);
        const ResponseDish = await axios.get(GET_DISHS_ENDPOINT, {
          withCredentials: true,
        });
        setDishs(ResponseDish.data);
      } catch (error) {
        console.log("Error fetching dishes:", error);
      }
    }
    fetch();
  }, []);
  return (
    <div>
      <button type="button" data-toggle="modal" onClick={() => setShowModal(true)} data-target=".btn-update-user" className="btn btn-info btn-sm text-[13px]"><i className="fa fa-edit"></i></button>
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
                    <label htmlFor="select">Table * :</label>
                    <div>
                      <select id="table" name="table" onChange={handleSelectChange} className="form-control" value={formData.table}>
                        {tables.length > 0 && (
                          tables.map((table, index) => (
                            <option key={index} value={table._id}>{table.name}</option>
                          ))
                        )}
                      </select>
                    </div>
                    {errors.type && <span className="text-danger">{errors.type}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="select">User * :</label>
                    <div>
                      <select id="user" name="user" onChange={handleSelectChange} className="form-control" value={formData.user}>
                        {users.length > 0 && (
                          users.map((user, index) => (
                            <option key={index} value={user._id}>{user.name}</option>
                          ))
                        )}
                      </select>
                    </div>
                    {errors.type && <span className="text-danger">{errors.type}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="select">Dish :</label>
                    <div>
                      <div id="dish" className="form-control">
                        <button type="button" onClick={() => { setShowDish(true) }}>{formData.dish ? formData.dish.length : "Select dish"}  </button>

                        {showDish && (
                          <div className="modal1 btn-create-user h-[300px]">
                            <div className="modal-dialog modal-lg">
                              <div className="modal-content">

                                <div className="modal-header">
                                  <h4 className="modal-title" id="myModalLabel">Choose dish</h4>
                                  <button type="button" onClick={() => setShowDish(false)} className="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                                  </button>
                                </div>
                                <div className="modal-body row">
                                  {
                                    dishs.length > 0 && (
                                      dishs.map((dish, index) => (
                                        <div className="checkbox col-4" key={index}>
                                          <label>
                                            <input className="mx-3" onChange={handleDishChange} type="checkbox" key={index} value={dish._id} data-price={dish.price}  checked={formData.dish.includes(dish._id)}/> {dish.name}
                                          </label>
                                        </div>
                                      ))
                                    )
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                    {errors.type && <span className="text-danger">{errors.type}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Select Date:</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="form-control"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="startTime">Start Time:</label>
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      value={formData.startTime}
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="endTime">End Time:</label>
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      value={formData.endTime}
                      className="form-control"
                      onChange={handleChange}
                    />
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

export default FormUpdate
