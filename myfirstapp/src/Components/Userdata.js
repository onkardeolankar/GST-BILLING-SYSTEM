import React from 'react'
import { useSelector } from "react-redux";

export default function Userdata() {
  const searchedData = useSelector((state) => state.userReducer);
  const search_input=searchedData.search_input;
  console.log("redux data>>>"+typeof (search_input));
  return (
    <>
    <center><h3>Userdata</h3></center>
    <ul>
      <li>name:{search_input}</li>

    </ul>
    </>
  )
}
