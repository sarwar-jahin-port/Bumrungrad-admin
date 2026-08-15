import React, { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Loader from "../components/Loader";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AiFillEye } from "react-icons/ai";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";

const Appointment = () => {
  const [open, setOpen] = React.useState(false);
  const [appoinmentModalData, setModalData] = useState({});

  //get appointments
  const {
    isLoading,
    refetch,
    error,
    data: appointments,
  } = useQuery({
    queryKey: ["appointment"],
    queryFn: () =>
      fetch(
        "https://api.discoverinternationalmedicalservice.com/api/get/doctor/appointments"
      ).then((res) => res.json()),
  });

  if (isLoading) return <Loader />;

  if (error) return "An error has occurred: " + error.message;

  // handle status change
  const handaleStatusChange = (data) => {
    fetch(
      `https://api.discoverinternationalmedicalservice.com/api/review/appointment/${data?.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          refetch();
        }
      });
  };
  const handaleSucess = (id) => {
    fetch(
      `https://api.discoverinternationalmedicalservice.com/api/appointment/success/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          refetch();
        }
      });
  };
  //handle modal
  const handleOpen = (data) => {
    setOpen(!open);
    setModalData(data);
    handaleStatusChange(data);
  };

  // Delete Data
  const handaleDeleteAppointment = (appointmentData) => {
    const aggre = window.confirm(
      `You Want to Delete, ${appointmentData?.PataientFirstName}.`
    );
    if (aggre) {
      fetch(
        `https://api.discoverinternationalmedicalservice.com/api/delete/doctorappoinments/${appointmentData?.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setModalData({});
            alert("Appointment Deleted Successfully");
            refetch();
          }
        });
    }
  };
  const TABLE_HEAD = [
    "Request ID",
    "Patient Name",
    "HN Number",
    "Doctor Name",
    "Speciality",
    "Status",
    "View",
  ];
  return (
    <div className="m-5 md:m-10">
      <p className="text-xl font-semibold text-blue">
        Appointment : {appointments?.data?.length}
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
                    className="font-normal leading-none opacity-70 
                          "
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {appointments?.data?.map((appointments, index) => (
              <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {index + 1}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {appointments?.PataientFirstName}
                  </Typography>
                </td>

                <td className="p-4">
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {appointments?.HnNumber
                      ? appointments?.HnNumber
                      : "Not Remember"}
                  </Typography>
                </td>

                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {appointments?.doctor ? appointments?.doctor : "Recommend"}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {appointments?.specialty}
                  </Typography>
                </td>

                <td className="p-4">
                  {appointments?.status === "0" && (
                    <button className="px-2 py-1 shadow rounded bg-red-500 text-white flex items-center gap-2">
                      Pending
                    </button>
                  )}
                  {appointments?.status === "1" && (
                    <button
                      onClick={() => handaleSucess(appointments?.id)}
                      className="px-2 py-1 shadow rounded bg-blue text-white flex items-center gap-2"
                    >
                      Mark as done
                    </button>
                  )}
                  {appointments?.status === "2" && (
                    <button
                      onClick={() => handaleSucess(appointments?.id)}
                      className="px-2 py-1 shadow rounded bg-green-400 text-white flex items-center gap-2"
                    >
                      Completed
                    </button>
                  )}
                </td>

                <td className="p-4 flex">
                  <button
                    onClick={() => handleOpen(appointments)}
                    className="px-2 py-1 shadow-md rounded border border-blue text-blue flex items-center gap-2"
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
      <Dialog
        open={open}
        handler={handleOpen}
        size="lg"
        className="md:h-[80vh] overflow-scroll"
      >
        <DialogBody>
          <h5 className="text-lg mt-5 font-semibold">Doctor Information</h5>
          <hr className="my-2.5" />
          <div>
            <p>
              <span className="font-semibold">Doctor Name : </span>
              {appoinmentModalData?.doctor}
            </p>
            <div className="grid grid-cols-2 mt-2.5">
              <p>
                <span className="font-semibold">Specialty : </span>
                {appoinmentModalData?.specialty}
              </p>
              {appoinmentModalData?.subSpecialty && (
                <p>
                  <span className="font-semibold">Sub Specialty : </span>
                  {appoinmentModalData?.subSpecialty}
                </p>
              )}
            </div>
            <h5 className="text-lg mt-5 font-semibold">
              Appointment Information
            </h5>
            <hr className="my-2.5" />
            <div className="mt-2.5 grid grid-cols-3">
              <p className="">
                <span className="font-semibold">First Date: </span>
                <br />
                {appoinmentModalData?.selectedDate}
              </p>

              <p className="">
                <span className="font-semibold">First Shift: </span>
                <br />
                {appoinmentModalData?.shift}
              </p>
              <p className="">
                <span className="font-semibold">First Shift Time: </span>
                <br />
                {appoinmentModalData?.firstSiftTime}
              </p>
            </div>
            <div className="mt-2.5 grid grid-cols-3">
              <p className="">
                <span className="font-semibold">Second Date: </span>
                <br />
                {appoinmentModalData?.selectedDate2}
              </p>

              <p className="">
                <span className="font-semibold">Second Shift: </span>
                <br />
                {appoinmentModalData?.shift2}
              </p>

              <p className="">
                <span className="font-semibold">Second Shift Time: </span>
                <br />
                {appoinmentModalData?.SecondSiftTime}
              </p>
            </div>

            <div className="mt-2.5">
              {appoinmentModalData?.medicalDesc && (
                <p>
                  <span className="font-semibold">Medical Desc : </span>
                  {appoinmentModalData?.medicalDesc}
                </p>
              )}
            </div>
            <h5 className="text-lg mt-5 font-semibold">Patient Information</h5>
            <hr className="my-2.5" />
            <div>
              <div className="grid grid-cols-2">
                {appoinmentModalData?.HnNumber && (
                  <p className="mt-2.5">
                    <span className="font-semibold"> HN Number : </span>
                    {appoinmentModalData?.HnNumber
                      ? appoinmentModalData?.HnNumber
                      : "Not Remember"}
                  </p>
                )}
                <p className="mt-2.5">
                  <span className="font-semibold"> Patient Name : </span>
                  {appoinmentModalData?.PataientFirstName}{" "}
                  {appoinmentModalData?.PataientLastName}
                </p>
                <p className="mt-2.5">
                  <span className="font-semibold"> Patient DOB : </span>
                  {appoinmentModalData?.PataientDob}
                </p>
                <p className="mt-2.5">
                  <span className="font-semibold">Pataient Citizenship : </span>
                  {appoinmentModalData?.PataientCitizenship}
                </p>
                <p className="mt-2.5">
                  <span className="font-semibold">Patient Country : </span>
                  {appoinmentModalData?.country !== null
                    ? appoinmentModalData?.country
                    : "Thailand"}
                </p>
                <p className="mt-2.5">
                  <span className="font-semibold"> Patient Gender : </span>
                  {appoinmentModalData?.PataientGender}
                </p>
                <p className="mt-2.5">
                  <span className="font-semibold"> Patient Email : </span>
                  {appoinmentModalData?.PataientEmail}
                </p>
                <p className="mt-2.5">
                  <span className="font-semibold"> Patient Phone : </span>
                  {appoinmentModalData?.PataientPhone}
                </p>

                <p className="mt-2.5">
                  <span className="font-semibold"> Old Patient : </span>
                  {appoinmentModalData?.oldPataint ? "Yes" : "No"}
                </p>
              </div>
            </div>
            {appoinmentModalData?.RequestorFirstname && (
              <div>
                <h5 className="text-lg mt-5 font-semibold">
                  Requestor Information
                </h5>
                <hr className="my-2.5" />
                <p className="mt-2.5">
                  <span className="font-semibold"> Requestor Name : </span>
                  {appoinmentModalData?.RequestorFirstname}{" "}
                  {appoinmentModalData?.RequestorLastName}
                </p>

                <p className="mt-2.5">
                  <span className="font-semibold"> Requestor Email : </span>
                  {appoinmentModalData?.RequestorEmail}
                </p>
                <p className="mt-2.5">
                  <span className="font-semibold"> Requestor Phone : </span>
                  {appoinmentModalData?.RequestorPhone}
                </p>
                <p className="mt-2.5">
                  <span className="font-semibold"> Requestor Relation: </span>
                  {appoinmentModalData?.RequestoerRelation}
                </p>
              </div>
            )}
          </div>
          <hr className="mt-2.5" />
          <h5 className="text-lg my-2.5 font-semibold">Uploaded Documents</h5>
          <ul className="list-disc px-5">
            {appoinmentModalData?.passport && (
              <li>
                <a
                  className="flex w-fit gap-2 items-center px-2 py-1"
                  href={appoinmentModalData?.passport}
                  target="blank"
                >
                  <BsFileEarmarkArrowDown className="text-xl" /> Passport
                </a>
              </li>
            )}

            {appoinmentModalData?.medicalReport1 && (
              <li>
                <a
                  className="flex w-fit gap-2 items-center px-2 py-1"
                  href={appoinmentModalData?.medicalReport1}
                  target="blank"
                >
                  <BsFileEarmarkArrowDown className="text-xl" /> Report 1
                </a>
              </li>
            )}
            {appoinmentModalData?.medicalReport2 && (
              <li>
                <a
                  className="flex w-fit gap-2 items-center px-2 py-1"
                  href={appoinmentModalData?.medicalReport1}
                  target="blank"
                >
                  <BsFileEarmarkArrowDown className="text-xl" /> Report 2
                </a>
              </li>
            )}
            {appoinmentModalData?.medicalReport3 && (
              <li>
                <a
                  className="flex w-fit gap-2 items-center px-2 py-1"
                  href={appoinmentModalData?.medicalReport1}
                  target="blank"
                >
                  <BsFileEarmarkArrowDown className="text-xl" /> Report 3
                </a>
              </li>
            )}
            {appoinmentModalData?.driveLink1 && (
              <li>
                <a
                  className="flex w-fit gap-2 items-center px-2 py-1"
                  href={appoinmentModalData?.driveLink1}
                  target="blank"
                >
                  <BsFileEarmarkArrowDown className="text-xl" /> Drive 1
                </a>
              </li>
            )}
            {appoinmentModalData?.driveLink2 && (
              <li>
                <a
                  className="flex w-fit gap-2 items-center px-2 py-1"
                  href={appoinmentModalData?.driveLink2}
                  target="blank"
                >
                  <BsFileEarmarkArrowDown className="text-xl" /> Drive 2
                </a>
              </li>
            )}
          </ul>
        </DialogBody>
        <DialogFooter className="flex justify-end">
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
                handaleDeleteAppointment(appoinmentModalData);
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

export default Appointment;
