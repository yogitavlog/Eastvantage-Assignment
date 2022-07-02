import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Fetch() {
  const url = "https://randomuser.me/api";
  const userData = {
    name: "",
    email: "",
  }
  const [data, setData] = useState(userData);
 

  useEffect(() => {
    getUserData();
  }, [])


  const getUserData = async () => {
    try {
      let response = await axios.get(url);
      if(response) {
        let user = response.data.results[0];
        let username = user.name.title+" "+user.name.first+" "+user.name.last;
        let useremail = user.email;
        persistData(username, useremail);
        setData({name: username, email: useremail});
      }
    }
    catch (err) {
      console.log(err);
    }
  }


  const persistData = (name, email) => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };


  return (
    <div className="userContainer">
      <h1>user Data</h1>
      <div>
        <p>Name: {data.name}</p>
        <p >Email: {data.email}</p>
      </div>
      <button onClick={() => getUserData()}>Refresh</button>
    </div>
  )
}

export default Fetch;
