import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { GET_PROFILE_USE } from '@/utils/constants/endpoints';
interface UserDetails {
  _id: string;
  name: string;
  email: string;
  gender: string;
  phone: string;
  img: string;
}
const TopNavigation = () => {
  const [details, setDetails] = useState<UserDetails>();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(GET_PROFILE_USE, {
          withCredentials: true,
        });
        setDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile()

  }, []);
  return (
    <div className="top_nav">
          <div className="nav_menu">
              <div className="nav toggle">
                <a id="menu_toggle"><i className="fa fa-bars"></i></a>
              </div>
              <nav className="nav navbar-nav">
              <ul className=" navbar-right">
                <li className="nav-item dropdown open ps-[15px]">
                  <a href="javascript:;" className="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">
                    <Image src={`/${details?.img}`} width={100} height={100} alt="vds" />John Doe
                  </a>
                  <div className="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item"  href="javascript:;"> Profile</a>
                      <a className="dropdown-item"  href="javascript:;">
                        <span className="badge bg-red pull-right">50%</span>
                        <span>Settings</span>
                      </a>
                  <a className="dropdown-item"  href="javascript:;">Help</a>
                    <a className="dropdown-item"  href="login.html"><i className="fa fa-sign-out pull-right"></i> Log Out</a>
                  </div>
                </li>

                <li role="presentation" className="nav-item dropdown open">
                  <a href="javascript:;" className="dropdown-toggle info-number" id="navbarDropdown1" data-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-envelope-o"></i>
                    <span className="badge bg-green">6</span>
                  </a>
                  <ul className="dropdown-menu list-unstyled msg_list" role="menu" aria-labelledby="navbarDropdown1">
                    <li className="nav-item">
                      <a className="dropdown-item">
                        <span className="image"><Image src="/images/img.jpg" width={100} height={100} alt="Profile Image" /></span>
                        <span>
                          <span>John Smith</span>
                          <span className="time">3 mins ago</span>
                        </span>
                        <span className="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="dropdown-item">
                        <span className="image"><Image src="/images/img.jpg" width={100} height={100} alt="Profile Image" /></span>
                        <span>
                          <span>John Smith</span>
                          <span className="time">3 mins ago</span>
                        </span>
                        <span className="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="dropdown-item">
                        <span className="image"><Image src="/images/img.jpg" width={100} height={100} alt="Profile Image" /></span>
                        <span>
                          <span>John Smith</span>
                          <span className="time">3 mins ago</span>
                        </span>
                        <span className="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="dropdown-item">
                        <span className="image"><Image src="/images/img.jpg" width={100} height={100} alt="Profile Image" /></span>
                        <span>
                          <span>John Smith</span>
                          <span className="time">3 mins ago</span>
                        </span>
                        <span className="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <div className="text-center">
                        <a className="dropdown-item">
                          <strong>See All Alerts</strong>
                          <i className="fa fa-angle-right"></i>
                        </a>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
  )
}

export default TopNavigation
