import React, {useEffect} from 'react';
import axios from 'axios';
import { DELETE_USER_ENDPOINT, GET_USERS_ENDPOINT, SEARCH_USER_ENDPOINT } from '@/utils/constants/endpoints';
import { parseCookies } from 'nookies';
import Image from 'next/image';
import FormUpdate from './FormUpdate';
import { RootState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../../features/user/userSlices';
import { setSearchQuery, setSearchResults } from '@/features/user/searchSlices';
import { useDebouncedCallback } from 'use-debounce';
import { setError } from '@/features/slices/errorSlices';

const List = () => {
    const users = useSelector((state: RootState) => state.users.users);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cookies = parseCookies();
                const response = await axios.get(GET_USERS_ENDPOINT, {
                    headers: {
                        'Authorization': `Bearer ${cookies.auth_token}`,
                    },
                    withCredentials: true,
                });
                dispatch(setUsers(response.data));
            } catch (error) {
                console.log("Have error when call api", error);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleDelete = async (id: string) => {
        try {
            const res = await axios.delete(DELETE_USER_ENDPOINT(id), {
                withCredentials: true
            });
            if (res.status == 200) {
                dispatch(setError({ status: 'success', message: 'Delete user successfully!' }));
                const cookies = parseCookies();
                const response = await axios.get(GET_USERS_ENDPOINT, {
                    headers: {
                        'Authorization': `Bearer ${cookies.auth_token}`,
                    },
                    withCredentials: true,
                });
                dispatch(setUsers(response.data));
            } else {
                dispatch(setError({ status: 'danger', message: 'Delete user failed!' }));
            }
        } catch (error) {
            dispatch(setError({ status: 'danger', message: 'Delete user failed!' }));
        }
    }

    const query = useSelector((state: RootState) => state.searchUser.query);
    const results = useSelector((state: RootState) => state.searchUser.results);

    const debouncedSearch = useDebouncedCallback(
        async (searchQuery: string) => {
            try {
                if(searchQuery){
                    const response = await axios.get(SEARCH_USER_ENDPOINT(searchQuery), {
                        withCredentials: true
                    });
                    dispatch(setSearchResults(response.data));
                }else{
                    const response = await axios.get(GET_USERS_ENDPOINT, {
                        withCredentials: true,
                    });
                    dispatch(setSearchResults(response.data));
                }
            } catch (error) {
                console.error('Search error:', error);
            }
        },
        500
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setSearchQuery(value));
        debouncedSearch(value);
    };

    return (
        <>
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
                            <input type="search" value={query} onChange={handleChange} className="form-control input-sm mx-3" placeholder="search" aria-controls="datatable-checkbox" />
                        </label>
                    </div>
                </div>
            </div>
            <div className="row">
                <table id="datatable-checkbox w-[100%]" className="table table-striped table-bordered bulk_action">
                    <thead>
                        <tr>
                            <th>
                                <span><input type="checkbox" id="check-all" /></span>
                            </th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {results.length > 0 ? (
                            results.map(result => (
                                <tr key={result._id}>
                                    <td>
                                        <b><input type="checkbox" id="check-all" /></b>
                                    </td>
                                    <td>
                                        {result.img ? (
                                            <Image
                                                src={`/${result.img}`}
                                                alt={`${result.name}'s avatar`}
                                                width={64}
                                                height={64}
                                                className="object-cover rounded-full"
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>
                                    <td>{result.name}</td>
                                    <td>{result.email}</td>
                                    <td>{result.phone}</td>
                                    <td>{result.gender}</td>
                                    <td className="flex">
                                        <FormUpdate _id={result._id} img={result.img} password={result.password} name={result.name} email={result.email} phone={result.phone} gender={result.gender} isAdmin={result.isAdmin}></FormUpdate>
                                        <button onClick={() => handleDelete(result._id)} type="button" className="btn btn-danger btn-sm text-[13px]"><i className="fa fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            users.map(user => (
                                <tr key={user._id}>
                                    <td>
                                        <b><input type="checkbox" id="check-all" /></b>
                                    </td>
                                    <td>
                                        {user.img ? (
                                            <Image
                                                src={`/${user.img}`}
                                                alt={`${user.name}'s avatar`}
                                                width={64}
                                                height={64}
                                                className="object-cover rounded-full"
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.gender}</td>
                                    <td className="flex">
                                        <FormUpdate _id={user._id} img={user.img} password={user.password} name={user.name} email={user.email} phone={user.phone} gender={user.gender} isAdmin={user.isAdmin}></FormUpdate>
                                        <button onClick={() => handleDelete(user._id)} type="button" className="btn btn-danger btn-sm text-[13px]"><i className="fa fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default List;
