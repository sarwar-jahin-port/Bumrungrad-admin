import React, { useState, useEffect } from "react";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
import { Card, Typography } from "@material-tailwind/react";
import Loader from "../components/Loader";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AiFillEye } from "react-icons/ai";

const AirPickUp = () => {
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [airPickup, setAirPickup] = useState([]);
  const handleOpen = (data) => {
    setOpen(!open);
    setModalData(data);
  };

  const TABLE_HEAD = ["Request ID", "Full Name", "WhatsApp", "Action"];

  const handaleDeleteAirPickUp = (pickUp) => {
    const aggre = window.confirm(`You Want to Delete, ${pickUp?.fullName}.`);
    if (aggre) {
      fetch(`http://127.0.0.1:8000/api/delete/air_pickups/${pickUp.id}`)
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
        setAirPickup(data.data || []);
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
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {pickUp?.fullName}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {pickUp?.whatsapp}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleOpen(pickUp)}
                        className="px-4 py-2 shadow rounded bg-blue text-white flex items-center gap-2"
                      >
                        <AiFillEye className="text-xl" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </>
      )}
      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader>
          <p>Airport Pick & Drop Request</p>
        </DialogHeader>
        <DialogBody>
          <h1 className="mt-2.5">
            <span className="font-semibold">Name : </span>{" "}
            {modalData?.fullName}
          </h1>
          <p className="mt-2.5">
            <span className="font-semibold"> WhatsApp : </span>{" "}
            {modalData?.whatsapp}
          </p>
          <p className="mt-2.5">
            <span className="font-semibold"> Concern : </span>{" "}
            {modalData?.concern}
          </p>
          {/* Legacy fields from the pre-redesign form (appointment/air ticket
              file upload + passenger count). Shown only when present, so any
              older/imported requests still display correctly. */}
          {modalData?.passenger && (
            <p className="mt-2.5">
              <span className="font-semibold"> Number of Passenger : </span>{" "}
              {modalData?.passenger}
            </p>
          )}
          {modalData?.appointment && (
            <div className="mt-2.5">
              <a
                className="flex w-fit gap-2 items-center px-2 py-1 shadow rounded bg-blue text-white"
                href={modalData?.appointment}
                target="blank"
              >
                <BsFileEarmarkArrowDown className="text-xl" /> Appointment
                File
              </a>
            </div>
          )}
          {modalData?.air_ticket && (
            <div className="mt-2.5">
              <a
                className="flex w-fit gap-2 items-center px-2 py-1 shadow rounded bg-blue text-white"
                href={modalData?.air_ticket}
                target="blank"
              >
                <BsFileEarmarkArrowDown className="text-xl" /> Air Ticket Copy
              </a>
            </div>
          )}
        </DialogBody>
        <DialogFooter className="flex justify-end">
          <Button
            variant="gradient"
            color="black"
            onClick={handleOpen}
            className="mr-4"
          >
            <span>Close</span>
          </Button>
          <Button
            onClick={() => {
              handaleDeleteAirPickUp(modalData);
              handleOpen();
            }}
            variant="gradient"
            color="red"
          >
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default AirPickUp;
