// import React, { useEffect, useState } from 'react'
// import FormUpdate from './FormUpdate'
// import { DELETE_BOOKING_ENDPOINT, GET_DISH_ENDPOINT, GET_TABLES_ENDPOINT, GET_USER_ENDPOINT } from '@/utils/constants/endpoints';
// import axios from 'axios';
// import { UserState } from '../user/interfaces';
// import { DishesState } from '../dish/interfaces';
// import moment from 'moment';

// const List = () => {
//     const [data, setData] = useState([{_id:"", name: "", booking: [{ _id: "", user: "", startTime: new Date(), endTime: new Date(),dish: [], totalmoney: 0, type: "" }] }])

//     const [userData, setUserData] = useState<{ [key: string]: UserState }>({});
//     const [dishData, setDishData] = useState<{ [key: string]: DishesState }>({});
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(GET_TABLES_ENDPOINT, {
//                     withCredentials: true,
//                 });
//                 const Data = response.data;
//                 setData(response.data);



//                 const userPromises = Data.map(async (table: any) => {
//                     const userPromises = table.booking.map(async (idUser: any) => {
//                         const id = idUser.user;
//                         try {
//                             const response = await axios.get(GET_USER_ENDPOINT(id), {
//                                 withCredentials: true,
//                             });
//                             return { id, data: response.data };
//                         } catch (error) {
//                             console.log(`Error fetching chef ${id}:`, error);
//                             return { id, data: null };
//                         }
//                     });
//                     return Promise.all(userPromises);
//                 });

//                 const chefResults = await Promise.all(userPromises);
//                 console.log('chef', chefResults)
//                 const chefDataMap: { [key: string]: UserState } = {};
//                 chefResults.flat().forEach(({ id, data }) => {
//                     if (data) chefDataMap[id] = data;
//                 });
//                 setUserData(chefDataMap);



//                 const dishPromises = Data.map(async (table: any) => {
//                     const dishPromises = table.booking.map(async (booking: any) => {
//                         const dishPromises = booking.dish.map(async (dish: any) => {
//                             try {
//                                 const response = await axios.get(GET_DISH_ENDPOINT(dish), {
//                                     withCredentials: true,
//                                 });
//                                 return { dish, data: response.data };
//                             } catch (error) {
//                                 console.log(`Error fetching chef ${dish}:`, error);
//                                 return { dish, data: null };
//                             }
//                         })
//                         return Promise.all(dishPromises);
//                     });
//                     return Promise.all(dishPromises);
//                 });

//                 const dishResults = await Promise.all(dishPromises);
//                 console.log("....", dishResults)
//                 const dishDataMap: { [key: string]: DishesState } = {};
//                 const flattenedResults = dishResults.flat(2);
//                 flattenedResults.flat().forEach(({ dish, data }) => {        
//                         if (data) dishDataMap[dish] = data;            
//                 });
//                 setDishData(dishDataMap);

//             } catch (error) {
//                 console.log("Have error when call api", error);
//             }
//         };
//         fetchData();
//     }, []);
//     console.log("data", dishData)


//     const handleDelete = async (id: string) => {
//         try {
//             const res = await axios.delete(DELETE_BOOKING_ENDPOINT(id), {
//                 withCredentials: true
//             });
//             // if (res.status == 200) {
//             //     alert("done");
//             //     const response = await axios.get(GET_NEWS_ENDPOINT, {
//             //         withCredentials: true,
//             //     });
//             //     dispatch(setNews(response.data));
//             // } else {
//             //     alert("false");
//             // }
//         } catch (error) {
//             console.log('error', error);
//             alert('noooo');
//         }
//     }

//     // const query = useSelector((state: RootState) => state.searchNew.query);
//     // const results = useSelector((state: RootState) => state.searchNew.results);

//     // const debouncedSearch = useDebouncedCallback(
//     //     async (searchQuery: string) => {
//     //         try {
//     //             if (searchQuery) {
//     //                 const response = await axios.get(GET_NEW_BY_TITLE_ENDPOINT(searchQuery), {
//     //                     withCredentials: true
//     //                 });
//     //                 dispatch(setSearchResultsNew(response.data));
//     //             } else {
//     //                 const response = await axios.get(GET_NEWS_ENDPOINT, {
//     //                     withCredentials: true,
//     //                 });
//     //                 dispatch(setSearchResultsNew(response.data));
//     //             }
//     //         } catch (error) {
//     //             console.error('Search error:', error);
//     //         }
//     //     },
//     //     500
//     // );

//     // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     //     const value = e.target.value;
//     //     dispatch(setSearchQueryNew(value));
//     //     debouncedSearch(value);
//     // };

//     return (
//         <div>
//             <div className="row d-flex justify-content-between mx-2">
//                 <div className="d-flex">
//                     <div className="dataTables_length" id="datatable-checkbox_length">
//                         <label className="d-flex align-items-center">
//                             Show
//                             <select name="datatable-checkbox_length" aria-controls="datatable-checkbox" className="form-control input-sm mx-2">
//                                 <option value="10">10</option>
//                                 <option value="25">25</option>
//                                 <option value="50">50</option>
//                                 <option value="100">100</option>
//                             </select>
//                             entries
//                         </label>
//                     </div>
//                 </div>
//                 <div className="d-flex">
//                     <div id="datatable-checkbox_filter" className="dataTables_filter">
//                         <label className="d-flex align-items-center">
//                             Search:
//                             <input type="search" className="form-control input-sm mx-3" placeholder="search" aria-controls="datatable-checkbox" />
//                         </label>
//                     </div>
//                 </div>
//             </div>
//             <div>
//                 <table id="datatable-checkbox" className="table table-bordered bulk_action w-100">
//                     <thead>
//                         <tr>
//                             <th>Check</th>
//                             <th>Name</th>
//                             <th>User</th>
//                             <th>Time</th>
//                             <th>Total Money</th>
//                             <th>Dish</th>
//                             <th>Type</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map((data_item, index) => {
//                             const newBookings = data_item.booking.filter(booking => booking.type === "new");
//                             const newBookingsCount = newBookings.length;

//                             return newBookings.map((booking, i) => (
//                                 <tr key={`${index}-${i}`}>
//                                     {i === 0 && (
//                                         <>
//                                             <td rowSpan={newBookingsCount}>
//                                                 <b><input type="checkbox" id="check-all" /></b>
//                                             </td>
//                                             <td rowSpan={newBookingsCount}>{data_item.name}</td>
//                                         </>
//                                     )}
//                                     <td>{userData[booking.user]?.name || "Unknown User"}</td>
//                                     <td>{ moment(booking.startTime).format('YYYY-MM-DD') }    { moment(booking.startTime).format('HH:mm:ss') } - { moment(booking.endTime).format('HH:mm:ss') }</td>
//                                     <td>{booking.totalmoney}</td>
//                                     <td>{booking.dish && booking.dish.map((id: string) => dishData[id]?.name).join(', ')}</td>
//                                     <td>{booking.type}</td>
//                                     <td className="flex">
//                                         <FormUpdate _id={booking._id} table={data_item._id} user={booking.user} startTime={moment(booking.startTime).format('HH:mm')} endTime={moment(booking.endTime).format('HH:mm')} date={moment(booking.startTime).format('YYYY-MM-DD')} dish={booking.dish} totalmoney={booking.totalmoney} type={booking.type}/>
//                                         <button  onClick={() => handleDelete(booking._id)} type="button" className="btn btn-danger btn-sm text-[13px]">
//                                             <i className="fa fa-trash"></i>
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ));
//                         })}
//                     </tbody>


//                 </table>
//                 <table id="datatable-checkbox" className="table table-bordered bulk_action w-100">
//                     <thead>
//                         <tr>
//                             <th>Check</th>
//                             <th>Name</th>
//                             <th>User</th>
//                             <th>Time</th>
//                             <th>Total Money</th>
//                             <th>Dish</th>
//                             <th>Type</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map((data_item, index) =>
//                             data_item.booking
//                                 .filter((booking) => booking.type !== "new")
//                                 .map((booking, i) => (
//                                     <tr key={`${index}-${i}`}>
//                                         {i === 0 && (
//                                             <>
//                                                 <td>
//                                                     <b><input type="checkbox" id="check-all" /></b>
//                                                 </td>
//                                                 <td>{data_item.name}</td>
//                                             </>
//                                         )}
//                                         <td>{userData[booking.user]?.name || "Unknown User"}</td>
//                                         <td>{ moment(booking.startTime).format('YYYY-MM-DD') }    { moment(booking.startTime).format('HH:mm:ss') } - { moment(booking.endTime).format('HH:mm:ss') }</td>
//                                         <td>{booking.totalmoney}</td>
//                                         <td>{booking.dish && booking.dish.map((id: string) => dishData[id]?.name).join(', ')}</td>
//                                         <td>{booking.type}</td>
//                                         <td className="flex">
//                                         <FormUpdate _id={booking._id} table={data_item._id} user={booking.user} startTime={moment(booking.startTime).format('HH:mm')} endTime={moment(booking.endTime).format('HH:mm')} date={moment(booking.startTime).format('YYYY-MM-DD')} dish={booking.dish} totalmoney={booking.totalmoney} type={booking.type}/>
//                                             <button onClick={() => handleDelete(booking._id)} type="button" className="btn btn-danger btn-sm text-[13px]">
//                                                 <i className="fa fa-trash"></i>
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//         </div>
//     )
// }

// export default List





interface Dishs {
    dishId: string;
    quantity: number;
    name: string;
    price: number;
}
interface Bookings {
    user: string;
    tableName: string;
    name: string;
    phone: string;
    dish: Dishs[];
    totalmoney: number;
    status: string;
    startTime: Date;
    endTime: Date
}
import React, { useEffect, useState } from 'react'
import FormUpdate from './FormUpdate'
import { DELETE_BOOKING_ENDPOINT, GET_BOOKINGS_ENDPOINT, GET_DISH_ENDPOINT, GET_TABLES_ENDPOINT, GET_USER_ENDPOINT, UPDATE_BOOKING_ENDPOINT } from '@/utils/constants/endpoints';
import axios from 'axios';
import { UserState } from '../user/interfaces';
import { DishesState } from '../dish/interfaces';
import moment from 'moment';

const List = () => {
    const [data, setData] = useState<Bookings[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(GET_BOOKINGS_ENDPOINT, {
                    withCredentials: true,
                });
                const data = response.data;
                const sortedBookings = data.sort((a, b) => {
                    if (a.status === 'waiting' && b.status !== 'waiting') return -1;
                    if (a.status === 'confirmed' && b.status === 'waiting') return 1;
                    if (a.status === 'confirmed' && b.status !== 'confirmed') return -1;
                    return 0;
                });
                setData(sortedBookings);
            } catch (error) {
                console.log("Have error when call api", error);
            }
        };
        fetchData();
    }, []);


    const handleDelete = async (id: string) => {
        try {
            const res = await axios.delete(DELETE_BOOKING_ENDPOINT(id), {
                withCredentials: true
            });
        } catch (error) {
            console.log('error', error);
            alert('noooo');
        }
    }
    const handleConfirm = async (id: string) => {
        const data = {
            status: "confirmed",
        }
        try {
            const res = await axios.put(UPDATE_BOOKING_ENDPOINT(id), data);
            if(res.status == 200){
                alert('success');
            }
        } catch (error) {
            console.log('error', error);
            alert('noooo');
        }
    }
    const handleCancel = async (id: string) => {
        const data = {
            status: "canceled",
        }
        try {
            const res = await axios.put(UPDATE_BOOKING_ENDPOINT(id), data);
            if(res.status == 200){
                alert('success');
            }
        } catch (error) {
            console.log('error', error);
            alert('noooo');
        }
    }

    // const query = useSelector((state: RootState) => state.searchNew.query);
    // const results = useSelector((state: RootState) => state.searchNew.results);

    // const debouncedSearch = useDebouncedCallback(
    //     async (searchQuery: string) => {
    //         try {
    //             if (searchQuery) {
    //                 const response = await axios.get(GET_NEW_BY_TITLE_ENDPOINT(searchQuery), {
    //                     withCredentials: true
    //                 });
    //                 dispatch(setSearchResultsNew(response.data));
    //             } else {
    //                 const response = await axios.get(GET_NEWS_ENDPOINT, {
    //                     withCredentials: true,
    //                 });
    //                 dispatch(setSearchResultsNew(response.data));
    //             }
    //         } catch (error) {
    //             console.error('Search error:', error);
    //         }
    //     },
    //     500
    // );

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value;
    //     dispatch(setSearchQueryNew(value));
    //     debouncedSearch(value);
    // };

    return (
        <div>
            <div className="row d-flex justify-content-between mx-2">
                <div className="d-flex">
                    <div className="dataTables_length" id="datatable-checkbox_length">
                        <label className="d-flex align-items-center">
                            Show
                            <select name="datatable-checkbox_length" aria-controls="datatable-checkbox" className="form-control input-sm mx-2">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            entries
                        </label>
                    </div>
                </div>
                <div className="d-flex">
                    <div id="datatable-checkbox_filter" className="dataTables_filter">
                        <label className="d-flex align-items-center">
                            Search:
                            <input type="search" className="form-control input-sm mx-3" placeholder="search" aria-controls="datatable-checkbox" />
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <table id="datatable-checkbox" className="table table-bordered bulk_action w-100">
                    <thead>
                        <tr>
                            <th>Check</th>
                            <th>Name</th>
                            <th>User</th>
                            <th>Time</th>
                            <th>Total Money</th>
                            <th>Dish</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((data_item, index) => (
                            <tr key={index}>

                                <>
                                    <td >
                                        <b><input type="checkbox" id="check-all" /></b>
                                    </td>
                                    <td>{data_item.tableName}</td>
                                </>

                                <td>{data_item.name || "Unknown User"}</td>
                                <td>{moment(data_item.startTime).format('YYYY-MM-DD')}    {moment(data_item.startTime).format('HH:mm:ss')} - {moment(data_item.endTime).format('HH:mm:ss')}</td>
                                <td>{data_item.totalmoney}</td>
                                <td>{data_item.dish && Array.isArray(data_item.dish) && data_item.dish.length > 0 ? (
                                    data_item.dish.map((dishItem, dishIndex) => (
                                        <div key={dishIndex} className="flex">
                                            <p>{dishItem.name}</p>
                                            <p></p>
                                            <p>{dishItem.price} VND x {dishItem.quantity}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>Không có món ăn nào</p>
                                )}</td>
                                <td>{data_item.status}</td>
                                <td className="flex">
                                    {data_item.status == 'waiting' ? (
                                        <>
                                            <button onClick={() => handleConfirm(data_item._id)} type="button" className="btn btn-success btn-sm text-[13px]">
                                                Confirm
                                            </button><FormUpdate _id={data_item._id} table={data_item.table} user={data_item.user} startTime={moment(data_item.startTime).format('HH:mm')} endTime={moment(data_item.endTime).format('HH:mm')} date={moment(data_item.startTime).format('YYYY-MM-DD')} dish={data_item.dish} totalmoney={data_item.totalmoney} type={data_item.type} />
                                            <button onClick={() => handleCancel(data_item._id)} type="button" className="btn btn-danger btn-sm text-[13px]">
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <FormUpdate _id={data_item._id} table={data_item.table} user={data_item.user} startTime={moment(data_item.startTime).format('HH:mm')} endTime={moment(data_item.endTime).format('HH:mm')} date={moment(data_item.startTime).format('YYYY-MM-DD')} dish={data_item.dish} totalmoney={data_item.totalmoney} type={data_item.type} />
                                            <button onClick={() => handleCancel(data_item._id)} type="button" className="btn btn-danger btn-sm text-[13px]">
                                                Cancel
                                            </button>
                                        </>
                                    )}


                                </td>
                            </tr>
                        ))}

                    </tbody>


                </table>
            </div>

        </div>
    )
}

export default List
