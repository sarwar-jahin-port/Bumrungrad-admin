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
    "Patient Type",
    "Doctor Name",
    "Time Slot",
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
                          className="font-normal capitalize"
                        >
                          {oneTelemedicine?.patientType}
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
                          {oneTelemedicine?.timeSlot}
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
                    <span className="font-semibold"> Patient Type : </span>{" "}
                    <span className="capitalize">
                      {teleMedicineModalData?.patientType}
                    </span>
                  </p>
                  <p className="mt-2.5">
                    <span className=" font-semibold "> Birth Date : </span>{" "}
                    {teleMedicineModalData?.birthDate}
                  </p>{" "}
                  <p className="mt-2.5">
                    <span className="font-semibold"> Contact Details : </span>{" "}
                    {teleMedicineModalData?.contactDetails}
                  </p>
                  {/* Legacy fields from the pre-redesign form (doc §2.1 trimmed
                      these out). Kept in the schema and shown here only when
                      present, so any older/imported requests still display
                      correctly without cluttering new ones. */}
                  {teleMedicineModalData?.passportId && (
                    <p className="mt-2.5">
                      <span className=" font-semibold "> Passport Id : </span>{" "}
                      {teleMedicineModalData?.passportId}
                    </p>
                  )}
                  {teleMedicineModalData?.nationality && (
                    <p className="mt-2.5">
                      <span className="font-semibold"> Nationality : </span>{" "}
                      {teleMedicineModalData?.nationality}
                    </p>
                  )}
                  {teleMedicineModalData?.residence && (
                    <p className="mt-2.5">
                      <span className="font-semibold"> Residence : </span>{" "}
                      {teleMedicineModalData?.residence}
                    </p>
                  )}
                  {teleMedicineModalData?.interpreter && (
                    <p className="mt-2.5">
                      <span className="font-semibold"> Interpreter : </span>{" "}
                      {teleMedicineModalData?.interpreter}
                    </p>
                  )}
                </div>
                <div className="ml-3">
                  <h1 className="text-xl mb-2.5 font-semibold text-blue">
                    Other Information
                  </h1>{" "}
                  <hr />
                  <p className="mt-2.5">
                    <span className="font-semibold"> Preferred Doctor :</span>{" "}
                    {teleMedicineModalData?.preferredDoctor}
                  </p>
                  <p className="mt-2.5">
                    <span className="font-semibold"> Time Slot : </span>{" "}
                    {teleMedicineModalData?.timeSlot}
                  </p>
                  <p className="mt-2.5">
                    <span className="font-semibold"> Specific Concern : </span>{" "}
                    {teleMedicineModalData?.specificConcern}
                  </p>
                  {teleMedicineModalData?.hnNum && (
                    <p className="mt-2.5">
                      <span className="font-semibold">HN Number : </span>
                      {teleMedicineModalData?.hnNum}
                    </p>
                  )}
                  {teleMedicineModalData?.preferredDate && (
                    <p className="mt-2.5">
                      <span className="font-semibold"> Preferred Date : </span>{" "}
                      {teleMedicineModalData?.preferredDate}
                    </p>
                  )}
                  {teleMedicineModalData?.purposeAppointment && (
                    <p className="mt-2.5">
                      <span className="font-semibold">
                        Purpose Appointment :{" "}
                      </span>
                      {teleMedicineModalData?.purposeAppointment}
                    </p>
                  )}
                  {teleMedicineModalData?.paymentType && (
                    <p className="mt-2.5">
                      <span className="font-semibold"> PaymentType : </span>{" "}
                      {teleMedicineModalData?.paymentType}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter className="flex justify-between">
            <div className="">
              {teleMedicineModalData?.investigationDocument && (
                <a
                  className="flex w-fit gap-2 items-center px-2 py-1 shadow rounded bg-blue text-white font-light text-lg"
                  href={teleMedicineModalData?.investigationDocument}
                  target="blank"
                >
                  <BsFileEarmarkArrowDown className="text-xl" /> Investigation
                  Document
                </a>
              )}
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
