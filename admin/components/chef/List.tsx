import { DELETE_CHEF_ENDPOINT, GET_CHEFS_ENDPOINT, GET_DISHES_BY_CHEF_ID_ENDPOINT, SEARCH_CHEF_ENDPOINT } from '@/utils/constants/endpoints';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FormUpdate from './FormUpdate';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setChef } from '@/features/chef/chefSlice';
import Image from 'next/image';
import { parseCookies } from 'nookies';
import { setSearchQueryChef, setSearchResultsChef } from '@/features/chef/searchSlices';
import { useDebouncedCallback } from 'use-debounce';
import type {DishesState} from '../dish/interfaces'
import { setError } from '@/features/slices/errorSlices';

const List = () => {
    const chefs = useSelector((state: RootState) => state.chefs.chefs);
    const dispatch = useDispatch();
    const [dishes, setDishes] = useState<DishesState>({});

    useEffect(() => {
        const fetchChefsAndDishes = async () => {
            try {
                const chefResponse = await axios.get(GET_CHEFS_ENDPOINT, {
                    withCredentials: true,
                });
                const chefsData = chefResponse.data;
                dispatch(setChef(chefsData));

                const dishesData: DishesState = {};
                for (const chef of chefsData) {
                    try {
                        const dishResponse = await axios.get(GET_DISHES_BY_CHEF_ID_ENDPOINT(chef._id), {
                            withCredentials: true,
                        });
                        dishesData[chef._id] = dishResponse.data;
                    } catch (error) {
                        console.log(`Error fetching dishes for chef ${chef._id}:`, error);
                    }
                }
                setDishes(dishesData);
            } catch (error) {
                console.log("Error fetching chefs and dishes:", error);
            }
        };

        fetchChefsAndDishes();
    }, [dispatch]);

    const handleDelete = async (id: string) => {
        try {
            const res = await axios.delete(DELETE_CHEF_ENDPOINT(id), {
                withCredentials: true
            });
            if (res.status == 200) {
                dispatch(setError({ status: 'success', message: 'Delete chef successfully!' }));
                const cookies = parseCookies();
                const response = await axios.get(GET_CHEFS_ENDPOINT, {
                    headers: {
                        'Authorization': `Bearer ${cookies.auth_token}`,
                    },
                    withCredentials: true,
                });
                dispatch(setChef(response.data));
            } else {
                dispatch(setError({ status: 'danger', message: 'Delete chef failed!' }));
            }
        } catch (error) {
            dispatch(setError({ status: 'danger', message: 'Delete chef failed!' }));
        }
    }

    const queryChef = useSelector((state: RootState) => state.searchChef.queryChef);
    const resultsChef = useSelector((state: RootState) => state.searchChef.resultsChef);

    const debouncedSearch = useDebouncedCallback(
        async (searchQuery: string) => {
            try {
                if(searchQuery){
                    const response = await axios.get(SEARCH_CHEF_ENDPOINT(searchQuery), {
                        withCredentials: true
                    });
                    dispatch(setSearchResultsChef(response.data));
                }else{
                    const response = await axios.get(GET_CHEFS_ENDPOINT, {
                        withCredentials: true,
                    });
                    dispatch(setSearchResultsChef(response.data));
                }
            } catch (error) {
                console.error('Search error:', error);
            }
        },
        500
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueChef = e.target.value;
        dispatch(setSearchQueryChef(valueChef));
        debouncedSearch(valueChef);
    };

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
                            <input type="search" value={queryChef} onChange={handleChange} className="form-control input-sm mx-3" placeholder="" aria-controls="datatable-checkbox" />
                        </label>
                    </div>
                </div>
            </div>

            <div className="row">
                <table id="datatable-checkbox" className="table table-striped table-bordered bulk_action w-100">
                    <thead>
                        <tr>
                            <th><input type="checkbox" id="check-all" /></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>List dish</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {resultsChef.length > 0 ? (
                            resultsChef.map(result => (
                                <tr key={result._id}>
                                <td><input type="checkbox" /></td>
                                <td><Image
                                        src={`/${result.image}`}
                                        alt={`${result.name}'s avatar`}
                                        width={64}
                                        height={64}
                                        className="object-cover rounded-full"
                                    /></td>
                                <td>{result.name}</td>
                                <td className="w-[50%]">{result.description}</td>
                                <td>
                                    {dishes[result._id] ? (
                                        <ul>
                                            {dishes[result._id].map(dish => (
                                                <li key={dish._id}>{dish.name}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span></span>
                                    )}
                                </td>
                                <td className="flex">
                                    <FormUpdate _id={result._id} name={result.name} image={result.image} description={result.description}/>
                                    <button type="button" onClick={() => handleDelete(result._id)} className="btn btn-danger btn-sm text-[13px]"><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                            ))
                        ) : (chefs.map(chef => (
                            <tr key={chef._id}>
                                <td><input type="checkbox" /></td>
                                <td><Image
                                        src={`/${chef.image}`}
                                        alt={`${chef.name}'s avatar`}
                                        width={64}
                                        height={64}
                                        className="object-cover rounded-full"
                                    /></td>
                                <td>{chef.name}</td>
                                <td className="w-[50%]">{chef.description}</td>
                                <td>
                                    {dishes[chef._id] ? (
                                        <ul>
                                            {dishes[chef._id].map(dish => (
                                                <li key={dish._id}>{dish.name}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span></span>
                                    )}
                                </td>
                                <td className="flex">
                                    <FormUpdate _id={chef._id} name={chef.name} image={chef.image} description={chef.description}/>
                                    <button type="button" onClick={() => handleDelete(chef._id)} className="btn btn-danger btn-sm text-[13px]"><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default List;
