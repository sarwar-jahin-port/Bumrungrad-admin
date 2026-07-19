import React, { useState, useEffect } from "react";
import { BsFileEarmarkArrowDown, BsFillPersonFill } from "react-icons/bs";
import { Card, Typography } from "@material-tailwind/react";
import Loader from "../components/Loader";
import { Button } from "@material-tailwind/react";
const AirPickUp = () => {
  const [loader, setLoader] = useState(true);
  const [airPickup, setAirPickup] = useState([]);
  const TABLE_HEAD = [
    "Request ID",
    "Patient  Appointment File",
    "Air Ticket File",
    "Number of Passenger",
    "Action",
  ];

  const handaleDeleteAirPickUp = (pickUp) => {
    const aggre = window.confirm(
      `You Want to Delete, ${pickUp?.passenger} Number of Passenger.`
    );
    if (aggre) {
      fetch(
        `http://127.0.0.1:8000/api/delete/air_pickups/${pickUp.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const newpickUpData = airPickup.filter(
              (airpickup) => airpickup.id !== pickUp.id
            );
            alert("Air Pickup Deleted Successfully");
            setAirPickup(newpickUpData);
          }
        });
    }
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get/air/pickup")
      .then((res) => res.json())
      .then((data) => {
        setAirPickup(data.data);
        setLoader(false);
      });
  }, []);
  return (
    <div className="m-5 md:m-10">
      {" "}
      {loader ? (
        <Loader />
      ) : (
        <>
          <p className="text-xl font-semibold text-blue">
            Air Pickup Request: {airPickup?.length}
          </p>
          <Card className="mt-5 md:mt-10 h-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, i) => (
                    <th
                      key={i}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70 "
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {airPickup?.map((pickUp, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">
                      <a
                        href={pickUp?.appointment}
                        target="blank"
                        rel="noopener noreferrer"
                      >
                        <button className="flex items-center gap-2 px-4 py-2 shadow rounded bg-blue text-white ">
                          <BsFileEarmarkArrowDown /> Appointment File
                        </button>
                      </a>
                    </td>
                    <td className="p-4">
                      <a
                        href={pickUp?.air_ticket}
                        target="blank"
                        rel="noopener noreferrer"
                      >
                        <button className="flex items-center gap-2 px-4 py-2 shadow rounded bg-blue text-white ">
                          <BsFileEarmarkArrowDown /> Passport Copy
                        </button>
                      </a>
                    </td>
                    <td className="p-4">
                      <button className="flex items-center gap-2 px-4 py-2 min-w-[100px] shadow rounded bg-blue text-white ">
                        <BsFillPersonFill /> {pickUp?.passenger}
                      </button>
                    </td>
                    <td className="p-4">
                      <Button
                        onClick={() => {
                          handaleDeleteAirPickUp(pickUp);
                        }}
                        variant="gradient"
                        color="red"
                      >
                        <span>Delete</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </>
      )}
    </div>
  );
};

export default AirPickUp;
