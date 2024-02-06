import React from "react";
import ContactsIcon from "@mui/icons-material/Contacts";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useSelector } from "react-redux";

const Footer = () => {
  return (
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">Sonata</div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact Information</h2>
            <div className="business_nfo">
              <div className="tag">
                <ContactsIcon />

                <div className="nfo">
                  <div>Address</div>
                  <div>Brooklyn Avenue, NYC</div>
                </div>
              </div>
              <div className="tag">
                <AccessTimeFilledIcon></AccessTimeFilledIcon>

                <div className="nfo">
                  <div>Phone</div>
                  <div>878612639</div>
                </div>
              </div>
              <div className="tag">
                <PhoneIcon></PhoneIcon>

                <div className="nfo">
                  <div>Working Hours</div>
                  <div>Always Open</div>
                </div>
              </div>
              <div className="tag">
                <EmailIcon/>

                <div className="nfo">
                  <div>Email</div>
                  <div>sonata@gmail.com</div>
                </div>
              </div>              
            </div>
          </div>
          <div className="left">
            <h2>Be the first to know</h2>
            <div>
            e and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
