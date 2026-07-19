import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AiFillEye } from "react-icons/ai";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
import Loader from "../components/Loader";
const VisaProcessing = () => {
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = useState(true);
  const [visaProcess, setVisaProcess] = useState([]);
  const [oneVisa, setOneVisa] = useState({});
  const handleOpen = (data) => {
    setOpen(!open);
    setOneVisa(data);
  };
  const handaleDeleteVissa = (oneVisa) => {
    const aggre = window.confirm(
      `You Want to Delete, ${oneVisa?.PataientFirstName}.`
    );
    if (aggre) {
      fetch(
        `http://127.0.0.1:8000/api/delete/visa_processings/${oneVisa.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const newQueryData = visaProcess.filter(
              (visa) => visa.id !== oneVisa.id
            );
            alert("Visa Deleted Successfully");
            setVisaProcess(newQueryData);
          }
        });
    }
  };

  const TABLE_HEAD = [
    "Request ID",
    "Name",
    "Visa Invitation Letter",
    "Email",
    "Phone",
    "Action",
  ];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get/visa/precessing")
      .then((res) => res.json())
      .then((data) => {
        setVisaProcess(data.data);
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
            Visa Processing Request : {visaProcess?.length}
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
                {visaProcess?.map((oneVisaProcess, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {`${oneVisaProcess.PataientFirstName} ${oneVisaProcess.PataientLastName}`}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <a
                          href={oneVisaProcess?.invitationLetter}
                          target="blank"
                          rel="noopener noreferrer"
                        >
                          <button className="flex items-center gap-2 px-4 py-2 shadow rounded bg-blue text-white ">
                            <BsFileEarmarkArrowDown /> Invitation Letter
                          </button>
                        </a>
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {oneVisaProcess.PataientEmail}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {oneVisaProcess.PataientPhone}
                      </Typography>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleOpen(oneVisaProcess)}
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
          <p className="">Visa Processing</p>
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
                  <span className="font-semibold">Name : </span>
                  {`${oneVisa?.PataientFirstName} ${oneVisa?.PataientLastName}`}
                </h1>
                <p className="mt-2.5">
                  <span className=" font-semibold"> Birth Date : </span>{" "}
                  {oneVisa?.PataientDob}
                </p>{" "}
                <p className="mt-2.5">
                  <span className=" font-semibold "> Patient Gender : </span>{" "}
                  {oneVisa?.PataientGender}
                </p>{" "}
                <p className="mt-2.5">
                  <span className="font-semibold"> Nationality : </span>{" "}
                  {oneVisa?.PataientCitizenship}
                </p>
                <p className="mt-2.5">
                  <span className="font-semibold"> Contact Details : </span>{" "}
                  {oneVisa?.PataientPhone}
                </p>
                <p className="mt-2.5">
                  <span className="font-semibold"> Residence : </span>{" "}
                  {oneVisa?.country}
                </p>
                <p className="mt-2.5">
                  <span className="font-semibold"> Old Patient : </span>{" "}
                  {oneVisa?.oldPataint}
                </p>
                {oneVisa?.HnNumber && (
                  <p className="mt-2.5">
                    <span className="font-semibold"> HN Number : </span>{" "}
                    {oneVisa?.HnNumber}
                  </p>
                )}
              </div>
              <div className="ml-3">
                <h1 className="text-xl mb-2.5 font-semibold text-blue">
                  Uploaded Documents
                </h1>{" "}
                <hr />
                <ul className="list-disc px-5">
                  {oneVisa?.passport && (
                    <li>
                      <a
                        className="flex w-fit gap-2 items-center px-2 py-1"
                        href={oneVisa?.passport}
                        target="blank"
                      >
                        <BsFileEarmarkArrowDown className="text-xl" /> Passport
                      </a>
                    </li>
                  )}

                  {oneVisa?.medicalReport1 && (
                    <li>
                      <a
                        className="flex w-fit gap-2 items-center px-2 py-1"
                        href={oneVisa?.medicalReport1}
                        target="blank"
                      >
                        <BsFileEarmarkArrowDown className="text-xl" /> Report 1
                      </a>
                    </li>
                  )}
                  {oneVisa?.medicalReport2 && (
                    <li>
                      <a
                        className="flex w-fit gap-2 items-center px-2 py-1"
                        href={oneVisa?.medicalReport2}
                        target="blank"
                      >
                        <BsFileEarmarkArrowDown className="text-xl" /> Report 2
                      </a>
                    </li>
                  )}
                  {oneVisa?.invitationLetter && (
                    <li>
                      <a
                        className="flex w-fit gap-2 items-center px-2 py-1"
                        href={oneVisa?.invitationLetter}
                        target="blank"
                      >
                        <BsFileEarmarkArrowDown className="text-xl" />{" "}
                        Invitation Letter
                      </a>
                    </li>
                  )}
                  {oneVisa?.driveLink1 && (
                    <li>
                      <a
                        className="flex w-fit gap-2 items-center px-2 py-1"
                        href={oneVisa?.driveLink1}
                        target="blank"
                      >
                        <BsFileEarmarkArrowDown className="text-xl" /> Drive 1
                      </a>
                    </li>
                  )}
                  {oneVisa?.driveLink2 && (
                    <li>
                      <a
                        className="flex w-fit gap-2 items-center px-2 py-1"
                        href={oneVisa?.driveLink2}
                        target="blank"
                      >
                        <BsFileEarmarkArrowDown className="text-xl" /> Drive 2
                      </a>
                    </li>
                  )}
                </ul>
              </div>
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
                handaleDeleteVissa(oneVisa);
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

export default VisaProcessing;
