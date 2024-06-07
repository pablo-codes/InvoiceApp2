import React from "react";
import { RiSettingsLine } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import { BiPackage } from "react-icons/bi";
import { LuPackagePlus, LuUserCircle2 } from "react-icons/lu";
import { Link } from "react-router-dom";
import img1 from "../img/1.svg";
import img2 from "../img/2.svg";

const DashNav = () => {
  return (
    <nav className="sidebar">
      <div className="logo d-flex justify-content-between">
        <a href="client.github.io/#/dashboard">
          <img src={require("../img/logo.png")} alt="" />
        </a>
        <div className="sidebar_close_icon d-lg-none">
          <i className="ti-close"></i>
        </div>
      </div>
      <ul id="sidebar_menu" className="metismenu">
        <li className="bars">
          <Link to="/">
            <img src={img1} alt="home" />
            <span className="bars-span">Dashboard</span>
          </Link>
        </li>
        <li className="bars">
          <Link to="/all-invoice">
            <img src={img2} alt="" />
            <span className="bars-span">Invoices</span>
          </Link>
        </li>
        <li className="bars">
          <Link to="/invoice">
            <IoCreateOutline size={"20px"} />
            <span className="bars-span">Create</span>
          </Link>
        </li>
        <li className="bars">
          <Link to="/all-product">
            <BiPackage size={"20px"} />
            <span className="bars-span">Product</span>
          </Link>
        </li>
        <li className="bars">
          <Link to="/product">
            <LuPackagePlus size={"20px"} />
            <span className="bars-span">Add</span>
          </Link>
        </li>
        {/* <li className="bars">
          <Link to="/images">
            <RiImageLine size={"20px"} />
            <span className="bars-span">Images</span>
          </Link>
        </li> */}
        <li className="bars">
          <Link to="/profile">
            <LuUserCircle2 size={"20px"} />
            <span className="bars-span">Profile</span>
          </Link>
        </li>
        <li className="bars">
          <Link to="/settings">
            <RiSettingsLine size={"20px"} />
            <span className="bars-span">Settings</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default DashNav;
