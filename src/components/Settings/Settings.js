import React, { useState, useEffect } from "react";
import "./admin-css.css";
import { useCookies } from "react-cookie";
import { AiOutlineStop } from "react-icons/ai";
import cloudinaryService from "../../services/cloudinary-services";
import { useNavigate } from "react-router-dom";
import Loader from "../Animation/Loader";
import IdbService from "../../services/idb-services";

const Settings = () => {
  const initialSettings = {
    companyName: "",
    companyEmail: "",
    companyLogo: "",
    companyPhoneNumber: "",
    companyAddress: "",
    companyWhatsapp: "",
  };
  const initimage = {
    files: { 0: {}, length: "" },
  };
  const [cookies, setcookies] = useCookies(["token"]);
  const [settings, setSettings] = useState(initialSettings);
  const [image, setImage] = useState(initimage);
  const [loader, setLoader] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    // Used to set token for debugging
    // const today = new Date();
    // const next7Days = new Date(today);
    // next7Days.setDate(next7Days.getDate() + 7);
    // const news = next7Days;
    // console.log(news);
    // setcookies("token", "biglongshlong", { path: "/", expires: news });

    if (image.files) {
      if (settings.companyEmail) {
        console.log(image.files);
      }
      console.log(settings.companyLogo);
      document.getElementById(
        "img"
      ).style.backgroundImage = `url(${settings.companyLogo})`;
    }
  }, [settings]);

  useEffect(() => {
    IdbService.readSettings()
      .then((res) => {
        console.log(res.success, res.data);
        if (res.data) {
          setSettings(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cookies.token]);

  const handlePostChange = (event) => {
    const { name, value } = event.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleImageChange = (event) => {
    const pic = event.target.files;
    if (pic.length === 1) {
      setImage({ ...image, ["files"]: event.target.files[0] });

      const uri = URL.createObjectURL(event.target.files[0]);

      setSettings({ ...settings, companyLogo: uri });
    }
  };

  const Saved = () => {
    if (loader === true) {
      return (
        <button
          className={`btn btn-primary`}
          style={{
            width: "140px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader style={loader} /> Submiting
        </button>
      );
    } else if (loader === false) {
      return (
        <button
          className={`btn btn-success`}
          style={{
            width: "140px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Submited
        </button>
      );
    } else {
      return (
        <button
          className={`btn btn-secondary`}
          style={{
            width: "140px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Submit
        </button>
      );
    }
  };

  const Post = (e) => {
    e.preventDefault();
    const {
      companyName,
      companyEmail,
      companyAddress,
      companyPhoneNumber,
      companyWhatsapp,
    } = settings;
    if (
      companyName ||
      companyEmail ||
      companyAddress ||
      companyPhoneNumber ||
      companyWhatsapp
    ) {
      setLoader(true);
      cloudinaryService
        .upload(image.files, settings.companyEmail)
        .then((response) => {
          if (response.data.secure_url) {
            const url = response.data.secure_url;
            settings.companyLogo = url;

            IdbService.createSettings(settings)
              .then((response) => {
                setLoader(false);
                console.log(response.success, response.message);
                navigate("/invoice");
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
    }
  };

  return (
    <form onSubmit={Post} noValidate={false}>
      <div className="invoice-div">
        <div className="part-2">
          <div className="from-side-2">
            <h2>Settings</h2>
            <div>
              <legend
                style={{ width: "31%", position: "relative", left: "65%" }}
                class="legendn text-danger"
              >
                <AiOutlineStop /> fill all the boxes
              </legend>
            </div>
            <div>
              <label htmlFor=""> Company Name </label>
              <input
                type="text"
                name="companyName"
                onChange={handlePostChange}
                value={settings.companyName}
              />
            </div>
            <div>
              <label htmlFor=""> Email </label>
              <input
                type="text"
                name="companyEmail"
                onChange={handlePostChange}
                value={settings.companyEmail}
              />
            </div>
            <div>
              <label htmlFor=""> Company Logo </label>
              <div
                id="img"
                className="logo-box-2"
                style={{
                  width: "469px",
                  height: "286px",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "469px,286px",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  name="fileud"
                  id="fileud"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />

                <label htmlFor="fileud" style={{ cursor: "pointer" }}>
                  + Logo
                </label>
              </div>
            </div>

            <div>
              <label htmlFor=""> Address </label>
              <input
                type="text"
                name="companyAddress"
                onChange={handlePostChange}
                value={settings.companyAddress}
              />
            </div>
            <div>
              <label htmlFor=""> Phone Number </label>
              <input
                type="number"
                name="companyPhoneNumber"
                onChange={handlePostChange}
                value={settings.companyPhoneNumber}
              />
            </div>

            <div>
              <label htmlFor=""> Whatsapp</label>
              <input
                type="number"
                name="companyWhatsapp"
                onChange={handlePostChange}
                value={settings.companyWhatsapp}
              />
            </div>
          </div>
        </div>

        <hr />
      </div>

      <div className="before-table-2">
        <div className="invoice-cats">
          <div className="new-invoice">
            <Saved />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Settings;
