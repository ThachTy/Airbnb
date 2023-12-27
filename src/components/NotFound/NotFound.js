import React, { useEffect, useRef } from "react";
import "./NotFound.scss";
import Notfound from "../../assets/image/NotFound.png";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    let idTime = setTimeout(() => {
      navigate("/");
    }, 4000);

    return () => {
      clearTimeout(idTime);
    };
  });

  return (
    <div id="notfound">
      <Link className="back" to={"/"}>
        Back to Home
      </Link>
      <img className="img" src={Notfound} />
    </div>
  );
}
