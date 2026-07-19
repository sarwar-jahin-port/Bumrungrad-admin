import React, { useState, useEffect } from "react";

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
import { BsFileEarmarkArrowDown } from "react-icons/bs";

const TeleMedicine = () => {
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [teleMedicineModalData, setModalData] = useState({});
  const [teleMedicine, setTeleMedicine] = useState([]);
  const handleOpen = (data) => {
    setOpen(!open);
    setModalData(data);
  };

  const handaleDeleteTeleMedicine = (telemedicineData) => {
    const aggre = window.confirm(
      `You Want to Delete, ${telemedicineData.fullName}.`
    );
    if (aggre) {
      fetch(
        `http://127.0.0.1:8000/api/delete/tele_medicines/${telemedicineData.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const newteleMedicine = teleMedicine.filter(
              (oneTelemedicine) => oneTelemedicine.id !== telemedicineData.id
            );
            alert("Tele Medicine Deleted Successfully");
            setTeleMedicine(newteleMedicine);
          }
        });
    }
  };

  const TABLE_HEAD = [
    "Request ID",
    "Patient Name",
    "Passport Number",
    "Doctor Name",
    "Appointment Date",
    "Action",
  ];
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get/tele/medicine")
      .then((res) => res.json())
      .then((data) => {
        setTeleMedicine(data.data);
        setLoader(false);
      });
  }, []);

  return (
      <div className="m-5 md:m-10">
        {loader ? (
          <Loader />
        ) : (
          <>
            <p className="text-xl font-semibold text-blue">
              Tele Medicine Request: {teleMedicine?.length}
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
                  {teleMedicine?.map((oneTelemedicine, index) => (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {oneTelemedicine?.fullName}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {oneTelemedicine?.passportId}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {oneTelemedicine?.preferredDoctor}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {oneTelemedicine?.preferredDate}
                        </Typography>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => handleOpen(oneTelemedicine)}
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
        <Dialog open={open} handler={handleOpen} size="lg">
          <DialogHeader className="">
            <p className="">Tele Medicine</p>
          </DialogHeader>
          <DialogBody>
            <div className="overscroll-auto">
              <div className="grid grid-cols-2">
                <div className="mr-3">
                  <h1 className="text-xl mb-2.5 font-semibold text-blue">
                    Patient Details
                  </h1>
                  <hr />
                  <h1 className="mt-2.5">
                    <span className="font-semibold">Name : </span>{" "}
                    {teleMedicineModalData?.fullName}
                  </h1>
                  <p className="mt-2.5">
                    <span className=" font-semibold "> Birth Date : </span>{" "}
                    {teleMedicineModalData?.birthDate}
                  </p>{" "}
                  <p className="mt-2.5">
                    <span className=" font-semibold "> Passport Id : </span>{" "}
                    {teleMedicineModalData?.passportId}
                  </p>{" "}
                  <p className="mt-2.5">
                    <span className="font-semibold"> Nationality : </span>{" "}
                    {teleMedicineModalData?.nationality}
                  </p>
                  <p className="mt-2.5">
                    <span className="font-semibold"> Contact Details : </span>{" "}
                    {teleMedicineModalData?.contactDetails}
                  </p>
                  <p className="mt-2.5">
                    <span className="font-semibold"> Residence : </span>{" "}
                    {teleMedicineModalData?.residence}
                  </p>
                  <p className="mt-2.5">
                    <span className="font-semibold"> Interpreter : </span>{" "}
                    {teleMedicineModalData?.interpreter}
                  </p>
                </div>
                <div className="ml-3">
                  <h1 className="text-xl mb-2.5 font-semibold text-blue">
                    Other Iformatin
                  </h1>{" "}
                  <hr />
                  <p className="mt-2.5">
                    <span className="font-semibold">HN Number : </span>
                    {teleMedicineModalData?.hnNum}
                  </p>
                  <p className="mt-2.5">
                    <span className="font-semibold"> Preferred Doctor :</span>{" "}
                    {teleMedicineModalData?.preferredDoctor}
                  </p>
                  <p className="mt-2.5">
                    <span className="font-semibold"> Preferred Date : </span>{" "}
                    {teleMedicineModalData?.preferredDate}
                  </p>
                  <p className="mt-2.5">
                    <span className="font-semibold">
                      Purpose Appointment :{" "}
                    </span>
                    {teleMedicineModalData?.purposeAppointment}
                  </p>
                  <p className="mt-2.5">
                    <span className="font-semibold"> PaymentType : </span>{" "}
                    {teleMedicineModalData?.paymentType}
                  </p>
                  <p className="mt-2.5">
                    <span className="font-semibold"> Specific Concern : </span>{" "}
                    {teleMedicineModalData?.specificConcern}
                  </p>
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter className="flex justify-between">
            <div className="">
              <a
                className="flex w-fit gap-2 items-center px-2 py-1 shadow rounded bg-blue text-white font-light text-lg"
                href={teleMedicineModalData?.investigationDocument}
                target="blank"
              >
                <BsFileEarmarkArrowDown className="text-xl" /> Investigation
                Document
              </a>
            </div>
            <div>
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
                  handaleDeleteTeleMedicine(teleMedicineModalData);
                  handleOpen();
                }}
                variant="gradient"
                color="red"
              >
                <span>Delete</span>
              </Button>
            </div>
          </DialogFooter>
        </Dialog>
      </div>
  );
};

export default TeleMedicine;
