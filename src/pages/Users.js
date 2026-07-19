import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { AiFillDelete } from "react-icons/ai";

export default function Users() {
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState([]);

  const handaleDeleteUser = (user) => {
    const aggre = window.confirm(
      `You want to remove, ${user?.firstName}.`
    )
    if (aggre) {
      fetch(
        `http://127.0.0.1:8000/api/delete/air_pickups/${user.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const newUserData = userData.filter(
              (ud) => ud.id !== user.id
            )
            alert('User Deleted Successfully')
            setUserData(newUserData)
          }
        })
    }
  }

  //get user data
  useEffect(() => {
    setLoader(true);
    fetch("http://127.0.0.1:8000/api/get/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setUserData(data.data);
          setLoader(false);
        } else {
          setLoader(false);
        }
      });
  }, []);
  return (
    <div className="m-5 md:m-10">
      <h1 className="text-xl font-semibold text-blue">Registerted Users: {userData?.length}</h1>
      <div className="mt-5">
        {loader ? (
          <Loader />
        ) : (
          <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {userData?.map((ud, i) => (
              <div key={i} className="shadow p-5 rounded relative">
                <p className="flex gap-2">
                  {" "}
                  <span className="font-semibold text-blue">Name:</span>
                  <span className="capitalize">
                    {ud?.firstName} {ud?.lastName}{" "}
                  </span>
                </p>
                <p className="flex gap-2">
                  {" "}
                  <span className="font-semibold text-blue">Citizenship:</span>
                  <span className="capitalize">{ud?.citizenship} </span>
                </p>
                <p className="flex gap-2">
                  {" "}
                  <span className="font-semibold text-blue">Country:</span>
                  <span className="capitalize">{ud?.country} </span>
                </p>
                <p className="flex gap-2">
                  {" "}
                  <span className="font-semibold text-blue">DOB:</span>
                  {ud?.dob}{" "}
                </p>
                <p className="flex gap-2">
                  {" "}
                  <span className="font-semibold text-blue">Email:</span>
                  {ud?.email}{" "}
                </p>
                <p className="flex gap-2">
                  {" "}
                  <span className="font-semibold text-blue">Phone:</span>
                  {ud?.phone}{" "}
                </p>

                <button onClick={()=> handaleDeleteUser(ud)} className="absolute bottom-2 right-2 p-1 rounded-full bg-red-100 border">
                  <AiFillDelete className="text-3xl text-red-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
