import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";

export default function Account() {
  //   {
  //   "id": 4258,
  //   "name": "hades",
  //   "email": "hades@gmail123.com",
  //   "password": "",
  //   "phone": null,
  //   "birthday": "02/11/2022",
  //   "avatar": null,
  //   "gender": false,
  //   "role": "User"
  // },
  return (
    <div>
      Account DEtails
      <Link to={`/profiles/4258`}>To Profiless</Link>
    </div>
  );
}
