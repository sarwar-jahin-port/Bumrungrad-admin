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

const SeeQuery = () => {
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = useState(true);
  const [allQuery, setAllQuery] = useState([]);
  const [oneQuery, setModalData] = useState({});

  const handleOpen = (data) => {
    setOpen(!open);
    setModalData(data);
  };

  const handaleDeleteQuery = (oneQuery) => {
    const aggre = window.confirm(
      `You Want to Delete, ${oneQuery?.doctorName}.`
    );
    if (aggre) {
      fetch(
        `http://127.0.0.1:8000/api/delete/questions/${oneQuery.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const newQueryData = allQuery.filter(
              (query) => query.id !== oneQuery.id
            );
            alert("Query Deleted Successfully");
            setAllQuery(newQueryData);
          }
        });
    }
  };

  const TABLE_HEAD = [
    "Request ID",
    "Doctor Name",
    "Patient Name",
    "Email",
    "Phone Number",
    "Action",
  ];
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get/questions")
      .then((res) => res.json())
      .then((data) => {
        setAllQuery(data.data);
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
            Patient Queries: {allQuery?.length}
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
                {allQuery?.map((query, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {query?.doctorName}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {`${query?.firstName}  ${query?.lastName}`}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {query?.email}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {query?.phoneNumber}
                      </Typography>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleOpen(query)}
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
          <p className="">Client Query</p>
        </DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-2">
            <div className="mr-2">
              <h5 className="text-lg font-semibold">Doctor Information</h5>
              <hr className="my-2.5" />
              <p className="mt-2.5">
                <span className="font-semibold">Inquery : </span>
                {oneQuery?.inquery}
              </p>
              <p className="mt-2.5">
                <span className="font-semibold">Doctor Name : </span>
                {oneQuery?.doctorName}
              </p>
              <p className="mt-2.5">
                <span className="font-semibold">Treatment Interest : </span>
                {oneQuery?.treatmentInterest}
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold">Patient Information</h5>
              <hr className="my-2.5" />
              <p className="mt-2.5">
                <span className="font-semibold">Patient Name : </span>
                {`${oneQuery?.firstName}  ${oneQuery?.lastName}`}
              </p>
              <p className="mt-2.5">
                <span className="font-semibold">Question : </span>
                {oneQuery?.question}
              </p>
              <p className="mt-2.5">
                <span className="font-semibold">HN Number : </span>
                {oneQuery?.hospitalNumber}
              </p>
              <p className="mt-2.5">
                <span className="font-semibold">Email : </span>
                {oneQuery?.email}
              </p>
              <p className="mt-2.5">
                <span className="font-semibold">Phone Number : </span>
                {oneQuery?.phoneNumber}
              </p>
              <p className="mt-2.5">
                <span className="font-semibold">DOB : </span>
                {oneQuery?.birtDate}
              </p>
              <p className="mt-2.5">
                <span className="font-semibold">Gender : </span>
                {oneQuery?.gender}
              </p>
              <p className="mt-2.5">
                <span className="font-semibold">Citizenship : </span>
                {oneQuery?.citizenship}
              </p>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
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
                handaleDeleteQuery(oneQuery);
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

export default SeeQuery;
