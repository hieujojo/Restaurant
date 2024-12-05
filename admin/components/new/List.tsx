import React, { useEffect } from 'react'
import FormUpdate from './FormUpdate'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import axios from 'axios';
import { DELETE_NEW_ENDPOINT, GET_NEWS_ENDPOINT, GET_NEW_BY_TITLE_ENDPOINT } from '@/utils/constants/endpoints';
import { setNews } from '@/features/new/newSlices';
import { useDebouncedCallback } from 'use-debounce';
import { setSearchQueryNew, setSearchResultsNew } from '@/features/new/searchSlices';
import Image from 'next/image';
import { setError } from '@/features/slices/errorSlices';

const List = () => {
    const news = useSelector((state: RootState) => state.news.news);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(GET_NEWS_ENDPOINT, {
                    withCredentials: true,
                });
                dispatch(setNews(response.data));
            } catch (error) {
                console.log("Have error when call api", error);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleDelete = async (id: string) => {
        try {
            const res = await axios.delete(DELETE_NEW_ENDPOINT(id), {
                withCredentials: true
            });
            if (res.status == 200) {
                dispatch(setError({ status: 'success', message: 'Delete new successfully!' }));
                const response = await axios.get(GET_NEWS_ENDPOINT, {
                    withCredentials: true,
                });
                dispatch(setNews(response.data));
            } else {
                dispatch(setError({ status: 'danger', message: 'Delete new failed!' }));
            }
        } catch (error) {
            dispatch(setError({ status: 'danger', message: 'Delete new failed!' }));
        }
    }

    const query = useSelector((state: RootState) => state.searchNew.query);
    const results = useSelector((state: RootState) => state.searchNew.results);

    const debouncedSearch = useDebouncedCallback(
        async (searchQuery: string) => {
            try {
                if (searchQuery) {
                    const response = await axios.get(GET_NEW_BY_TITLE_ENDPOINT(searchQuery), {
                        withCredentials: true
                    });
                    dispatch(setSearchResultsNew(response.data));
                } else {
                    const response = await axios.get(GET_NEWS_ENDPOINT, {
                        withCredentials: true,
                    });
                    dispatch(setSearchResultsNew(response.data));
                }
            } catch (error) {
                console.error('Search error:', error);
            }
        },
        500
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setSearchQueryNew(value));
        debouncedSearch(value);
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
                            <input type="search" value={query} onChange={handleChange} className="form-control input-sm mx-3" placeholder="search" aria-controls="datatable-checkbox" />
                        </label>
                    </div>
                </div>
            </div>
            <div className="row">
                <table id="datatable-checkbox" className="table table-striped table-bordered bulk_action w-100">
                    <thead>
                        <tr>
                            <th>
                                <th><input type="checkbox" id="check-all" /></th>
                            </th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Slug</th>
                            <th>Content</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        <tr>
                            <td>
                                <th><input type="checkbox" id="check-all" /></th>
                            </td>
                            <td>Tiger Nixon</td>
                            <td>SystemArchitect@gmail.com</td>
                            <td>0123456789</td>
                            <td>female</td>
                            <td>2011/04/25</td>
                            <td>
                                
                                <button type="button" className="btn btn-danger btn-sm text-[13px]"><i className="fa fa-trash"></i></button>
                                <FormUpdate />
                            </td>
                        </tr>
                    </tbody> */}


                    <tbody>
                        {results.length > 0 ? (
                            results.map(result => (
                                <tr key={result._id}>
                                    <td>
                                        <b><input type="checkbox" id="check-all" /></b>
                                    </td>
                                    <td>
                                        {result.image ? (
                                            <Image
                                                src={`/${result.image}`}
                                                alt={`${result.title}'s avatar`}
                                                width={64}
                                                height={64}
                                                className="object-cover rounded-full"
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>
                                    <td>{result.title}</td>
                                    <td>{result.type}</td>
                                    <td>{result.slug}</td>
                                    <td>{result.content}</td>
                                    <td className="flex">
                                        <FormUpdate _id={result._id} image={result.image} title={result.title} type={result.type} slug={result.slug} content={result.content}></FormUpdate>
                                        <button onClick={() => handleDelete(result._id)} type="button" className="btn btn-danger btn-sm text-[13px]"><i className="fa fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            news.map(new_item => (
                                <tr key={new_item._id}>
                                    <td>
                                        <b><input type="checkbox" id="check-all" /></b>
                                    </td>
                                    <td>
                                        {new_item.image ? (
                                            <Image
                                                src={`/${new_item.image}`}
                                                alt={`${new_item.title}'s avatar`}
                                                width={64}
                                                height={64}
                                                className="object-cover rounded-full"
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>
                                    <td>{new_item.title}</td>
                                    <td>{new_item.type}</td>
                                    <td>{new_item.slug}</td>
                                    <td>{new_item.content}</td>
                                    <td className="flex">
                                        <FormUpdate _id={new_item._id} image={new_item.image} title={new_item.title} type={new_item.type} slug={new_item.slug} content={new_item.content}></FormUpdate>
                                        <button onClick={() => handleDelete(new_item._id)} type="button" className="btn btn-danger btn-sm text-[13px]"><i className="fa fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default List
