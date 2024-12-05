import FormCreate from '@/components/dish/FormCreate'
import List from '@/components/dish/List'
import Layout from '@/components/layout'
import React from 'react'

const dish = () => {
  return (
    <Layout>
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className="x_panel">
            <div className="x_title d-flex justify-content-between">
              <div>
                <h2><small>Dish Manager</small></h2>
                <FormCreate />
              </div>
              <ul className="nav navbar-right panel_toolbox">
                <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                </li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Settings 1</a>
                    <a className="dropdown-item" href="#">Settings 2</a>
                  </div>
                </li>
                <li><a className="close-link"><i className="fa fa-close"></i></a>
                </li>
              </ul>
            </div>
            <div className="x_content">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card-box table-responsive">
                   

                    <List />

                    <div className="row d-flex">
                      <div className="col-sm-5 d-flex">
                        <div className="dataTables_info" id="datatable-checkbox_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div>
                      </div>
                      <div className="col-sm-7">
                        <div className="dataTables_paginate paging_simple_numbers" id="datatable-checkbox_paginate">
                          <ul className="pagination">
                            <li className="paginate_button previous disabled" id="datatable-checkbox_previous">
                              <a href="#" aria-controls="datatable-checkbox" data-dt-idx="0" tabIndex={0}>Previous</a>
                            </li>
                            <li className="paginate_button active">
                              <a href="#" aria-controls="datatable-checkbox" data-dt-idx="1" tabIndex={0}>1</a>
                            </li>
                            <li className="paginate_button ">
                              <a href="#" aria-controls="datatable-checkbox" data-dt-idx="2" tabIndex={0}>2</a>
                            </li>
                            <li className="paginate_button ">
                              <a href="#" aria-controls="datatable-checkbox" data-dt-idx="3" tabIndex={0}>3</a>
                            </li>
                            <li className="paginate_button ">
                              <a href="#" aria-controls="datatable-checkbox" data-dt-idx="4" tabIndex={0}>4</a>
                            </li>
                            <li className="paginate_button ">
                              <a href="#" aria-controls="datatable-checkbox" data-dt-idx="5" tabIndex={0}>5</a>
                            </li>
                            <li className="paginate_button ">
                              <a href="#" aria-controls="datatable-checkbox" data-dt-idx="6" tabIndex={0}>6</a>
                            </li>
                            <li className="paginate_button next" id="datatable-checkbox_next">
                              <a href="#" aria-controls="datatable-checkbox" data-dt-idx="7" tabIndex={0}>Next</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout >
  )
}

export default dish
