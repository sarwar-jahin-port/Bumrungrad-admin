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

const MedicalConsultancy = () => {
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [requests, setRequests] = useState([]);
  const handleOpen = (data) => {
    setOpen(!open);
    setModalData(data);
  };

  const handleDeleteRequest = (requestData) => {
    const confirmed = window.confirm(
      `You Want to Delete, ${requestData.fullName}.`
    );
    if (confirmed) {
      fetch(
        `http://127.0.0.1:8000/api/delete/medical_consultancies/${requestData.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const newRequests = requests.filter(
              (oneRequest) => oneRequest.id !== requestData.id
            );
            alert("Request Deleted Successfully");
            setRequests(newRequests);
          }
        });
    }
  };

  const TABLE_HEAD = ["Request ID", "Full Name", "WhatsApp", "Action"];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get/medical-consultancy")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data.data || []);
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
            Medical Consultancy Requests: {requests?.length}
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
                {requests?.map((oneRequest, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {oneRequest?.fullName}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {oneRequest?.whatsapp}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleOpen(oneRequest)}
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
          <p>Medical Consultancy Request</p>
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
              handleDeleteRequest(modalData);
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

export default MedicalConsultancy;
