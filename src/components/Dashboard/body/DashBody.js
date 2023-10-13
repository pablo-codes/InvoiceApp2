import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import DashNav from "./DashNav";
import "../css/bootstrap1.css";
import "../css/style1.css";
import "../css/metisMenu.css";
import img1 from "../img/icon_search.svg";
import img2 from "../img/bell.svg";
import img3 from "../img/msg.svg";
import IdbService from "../../../services/idb-services";

// import indexService from '../../../services/indexService';

const DashBody = () => {
  const initialSettings = {
    companyName: "",
    companyEmail: "",
    companyLogo: "",
    companyPhoneNumber: "",
    companyAddress: "",
    companyWhatsapp: "",
  };

  const [from, setFrom] = useState(initialSettings);
  const [query, setQuery] = useState("");
  //const [cookies, setCookies] = useCookies(['token'])
  // const [Details, setDetails] = useState(initialDetails);
  //const id = cookies.token
  // const responses = (id) => {
  //     indexService.index(id)
  //         .then((response) => {
  //             setDetails(response.data)

  //         })
  //         .catch(e => {
  //             console.log(e);
  //         });
  // }

  useEffect(() => {
    IdbService.readSettings()
      .then((e) => {
        setFrom(e.data);
      })
      .catch((err) => {
        console.log(err);
      });
    //     responses(id)
  }, []);

  return (
    <>
      <DashNav />
      <section className="main_content dashboard_part">
        <div className="container-fluid g-0">
          <div className="row">
            <div className="col-lg-12 p-0">
              <div className="header_iner d-flex justify-content-between align-items-center">
                <div className="sidebar_icon d-lg-none">
                  <i className="ti-menu"></i>
                </div>
                <div className="serach_field-area">
                  <div className="search_inner">
                    <form action="client.github.io/#/dashboard">
                      <div className="search_field">
                        <input
                          type="text"
                          placeholder="Search name "
                          value={query}
                          onChange={(e) => {
                            setQuery(e.target.value);
                          }}
                        />
                      </div>
                      <button type="submit">
                        <img src={img1} alt="" />
                      </button>
                    </form>
                  </div>
                </div>
                <div className="header_right d-flex justify-content-between align-items-center">
                  <div className="header_notification_warp d-flex align-items-center">
                    <li>
                      <a href="client.github.io/#/dashboard">
                        <img src={img2} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="client.github.io/#/dashboard">
                        <img src={img3} alt="" />
                      </a>
                    </li>
                  </div>
                  <div className="profile_info">
                    {(function () {
                      if (from) {
                        return (
                          <>
                            <img src={from.companyLogo} alt="profile-pic" />
                            <div className="profile_info_iner">
                              <p>Welcome user!</p>
                              <h5>{from.companyName}</h5>
                              <div className="profile_info_details">
                                <Link to="/profile">
                                  My Profile <i className="ti-user"></i>
                                </Link>
                                <Link to="/settings">
                                  Settings <i className="ti-settings"></i>
                                </Link>
                                <a href="">
                                  Log Out <i className="ti-shift-left"></i>
                                </a>
                              </div>
                            </div>
                          </>
                        );
                      }
                    })(from)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Outlet context={query} />

        <div className="footer_part">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="footer_iner text-center">
                  <p>
                    2023 © Influence - Designed by{" "}
                    <a href="https://pablo-codes.github.io/">pablo-codes</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashBody;
