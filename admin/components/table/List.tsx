import { RootState } from '@/store/store';
import { DELETE_TABLE_ENDPOINT, GET_TABLES_ENDPOINT, GET_TABLE_BY_NAME_ENDPOINT } from '@/utils/constants/endpoints';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FormUpdate from './FormUpdate';
import { setTable } from '@/features/table/tableSlice';
import { setError } from '@/features/slices/errorSlices';
import { useDebouncedCallback } from 'use-debounce';
import { setSearchQueryTable, setSearchResultsTable } from '@/features/table/searchSlices';

const List = () => {
    const tables = useSelector((state: RootState) => state.tables.tables);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(GET_TABLES_ENDPOINT, {
                    withCredentials: true,
                });
                const tableData = response.data;
                dispatch(setTable(tableData));
            } catch (error) {
                console.log("Have error when call api", error);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleDelete = async (id: string) => {
        try {
            const res = await axios.delete(DELETE_TABLE_ENDPOINT(id), {
                withCredentials: true
            });
            if (res.status == 200) {
                dispatch(setError({ status: 'success', message: 'Delete table successfully!' }));
                const response = await axios.get(GET_TABLES_ENDPOINT, {
                    withCredentials: true,
                });
                dispatch(setTable(response.data));
            } else {
                dispatch(setError({ status: 'danger', message: 'Delete table failed!' }));
            }
        } catch (error) {
            console.log('error', error);
            dispatch(setError({ status: 'danger', message: 'Delete table failed!' }));
        }
    }



    const query = useSelector((state: RootState) => state.searchTable.queryTable);
    const results = useSelector((state: RootState) => state.searchTable.resultsTable);

    const debouncedSearch = useDebouncedCallback(
        async (searchQuery: string) => {
            try {
                if (searchQuery) {
                    const response = await axios.get(GET_TABLE_BY_NAME_ENDPOINT(searchQuery), {
                        withCredentials: true
                    });
                    dispatch(setSearchResultsTable(response.data));
                } else {
                    const response = await axios.get(GET_TABLES_ENDPOINT, {
                        withCredentials: true,
                    });
                    dispatch(setSearchResultsTable(response.data));
                }
            } catch (error) {
                console.error('Search error:', error);
            }
        },
        500
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setSearchQueryTable(value));
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
                            <th>Name</th>

                        </tr>
                    </thead>


                    <tbody>
                        {results.length > 0 ? (
                            results.map(result => (
                                <tr key={result._id}>
                                    <td className="w-[5%]">
                                        <th><input type="checkbox" id="check-all" /></th>
                                    </td>
                                    <td className="w-[30%]">
                                        <div>
                                            <div className="columns-2">
                                                {result.image.slice(0, 3).map((image, index) => (
                                                    <img
                                                        key={index}
                                                        width={50}
                                                        height={50}
                                                        className="mb-1 w-[170px] h-[170px]"
                                                        src={`${image}`}
                                                        alt={`Image ${index}`}
                                                    />
                                                    // <Image
                                                    //     key={index}
                                                    //     src={`/${image}`}
                                                    //     alt={` avatar`}
                                                    //     width={64}
                                                    //     height={64}
                                                    //     className="object-cover rounded-full"
                                                    // />
                                                ))}
                                                {result.image.length > 4 && (
                                                    <div
                                                        onClick={() => setShowModal(result._id)}
                                                        className=" cursor-pointer mb-1 w-[170px] h-[170px] flex items-center justify-center bg-gray-200"
                                                    >
                                                        <span>+{result.image.length - 3}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* form image */}
                                            {showModal === result._id && (
                                                <div className="modal1 btn-create-user">
                                                    <div className="modal-dialog modal-lg">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <button
                                                                    type="button"
                                                                    className="close"
                                                                    data-dismiss="modal"
                                                                    onClick={() => setShowModal('')}
                                                                >
                                                                    <span aria-hidden="true">×</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="columns-4">
                                                                    {result.image.map((image, index) => (
                                                                        <img
                                                                            key={index}
                                                                            width={50}
                                                                            height={50}
                                                                            className="mb-1 w-[170px] h-[170px]"
                                                                            src={`${image}`}
                                                                            alt={`Image ${index}`} />
                                                                    ))}
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-secondary"
                                                                        data-dismiss="modal"
                                                                        onClick={() => setShowModal('')}
                                                                    >
                                                                        Close
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    </td>
                                    <td className="h-full relative">
                                        <p><b className="text-[20px]">{result.name}</b></p>
                                        <p><b>Quantity :</b>{result.quantity}</p>
                                        <p><b>Type: </b>{result.type}</p>
                                        <p><b>Description: </b>{result.description}</p>
                                        <div className="flex absolute right-5 bottom-0">
                                            <FormUpdate _id={result._id} name={result.name} quantity={result.quantity} image={result.image} description={result.description} type={result.type} />
                                            <button type="button" title="Delete" onClick={() => handleDelete(result._id)} className="btn btn-danger btn-sm text-[13px]"><i className="fa fa-trash"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            tables.map(table => (
                                <tr key={table._id}>
                                    <td className="w-[5%]">
                                        <th><input type="checkbox" id="check-all" /></th>
                                    </td>
                                    <td className="w-[30%]">
                                        <div>
                                            <div className="columns-2">
                                                {table.image.slice(0, 3).map((image, index) => (
                                                    <img
                                                        key={index}
                                                        width={50}
                                                        height={50}
                                                        className="mb-1 w-[170px] h-[170px]"
                                                        src={`${image}`}
                                                        alt={`Image ${index}`}
                                                    />
                                                    // <Image
                                                    //     key={index}
                                                    //     src={`/${image}`}
                                                    //     alt={` avatar`}
                                                    //     width={64}
                                                    //     height={64}
                                                    //     className="object-cover rounded-full"
                                                    // />
                                                ))}
                                                {table.image.length > 4 && (
                                                    <div
                                                        onClick={() => setShowModal(table._id)}
                                                        className=" cursor-pointer mb-1 w-[170px] h-[170px] flex items-center justify-center bg-gray-200"
                                                    >
                                                        <span>+{table.image.length - 3}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* form image */}
                                            {showModal === table._id && (
                                                <div className="modal1 btn-create-user">
                                                    <div className="modal-dialog modal-lg">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <button
                                                                    type="button"
                                                                    className="close"
                                                                    data-dismiss="modal"
                                                                    onClick={() => setShowModal('')}
                                                                >
                                                                    <span aria-hidden="true">×</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="columns-4">
                                                                    {table.image.map((image, index) => (
                                                                        <img
                                                                            key={index}
                                                                            width={50}
                                                                            height={50}
                                                                            className="mb-1 w-[170px] h-[170px]"
                                                                            src={`${image}`}
                                                                            alt={`Image ${index}`} />
                                                                    ))}
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-secondary"
                                                                        data-dismiss="modal"
                                                                        onClick={() => setShowModal('')}
                                                                    >
                                                                        Close
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    </td>
                                    <td className="h-full relative">
                                        <p><b className="text-[20px]">{table.name}</b></p>
                                        <p><b>Quantity :</b>{table.quantity}</p>
                                        <p><b>Type: </b>{table.type}</p>
                                        <p><b>Description: </b>{table.description}</p>
                                        <div className="flex absolute right-5 bottom-0">
                                            <FormUpdate _id={table._id} name={table.name} quantity={table.quantity} image={table.image} description={table.description} type={table.type} />
                                            <button type="button" title="Delete" onClick={() => handleDelete(table._id)} className="btn btn-danger btn-sm text-[13px]"><i className="fa fa-trash"></i></button>
                                        </div>
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
