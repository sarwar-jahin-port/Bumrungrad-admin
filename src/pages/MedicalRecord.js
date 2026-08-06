import React, { useState, useEffect } from "react";
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
const MedicalRecord = () => {
  const [loader, setLoader] = useState(true);
  const [medicalRecord, setMedicalRecord] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [medicalRecordModalData, setModalData] = useState({});
  const handleOpen = (data) => {
    setOpen(!open);
    setModalData(data);
  };
  const handaleDeleteMedicineRecord = (medicileRecordData) => {
    const aggre = window.confirm(
      `You Want to Delete, ${medicileRecordData?.hnNum}.`
    );
    if (aggre) {
      fetch(
        `http://127.0.0.1:8000/api/delete/medicalreports/${medicileRecordData.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const newMedicineRecord = medicalRecord.filter(
              (oneMedicalRecord) =>
                oneMedicalRecord.id !== medicileRecordData.id
            );
            alert("Medical Record Deleted Successfully");
            setMedicalRecord(newMedicineRecord);
          }
        });
    }
  };
  const TABLE_HEAD = [
    "Request ID",
    "Name",
    "WhatsApp",
    "HN Number",
    "Passport Copy",
    "Action",
  ];
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get/medical/report")
      .then((res) => res.json())
      .then((data) => {
        setMedicalRecord(data.data);
        setLoader(false);
      });
  }, []);
  return (
    <div className="m-5 md:m-10">
      {loader ? (
        <Loader />
      ) : (
        <>
          <p className="text-xl text-blue font-semibold">
            Medical Record Request: {medicalRecord?.length}
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
                        className={`font-normal leading-none opacity-70 ${
                          i === 5 && "text-center"
                        }`}
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {medicalRecord?.map((oneMedicalRecord, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {oneMedicalRecord?.name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {oneMedicalRecord?.whatsapp}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {oneMedicalRecord?.hnNum}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <a
                        href={oneMedicalRecord?.passport}
                        target="blank"
                        rel="noopener noreferrer"
                        className="flex w-fit items-center gap-2 px-4 py-2 shadow rounded bg-blue text-white "
                      >
                        <BsFileEarmarkArrowDown className="text-xl" />
                        Passport
                      </a>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleOpen(oneMedicalRecord)}
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
      <Dialog open={open} handler={handleOpen}>
        <DialogBody>
          <p className="text-xl font-semibold text-blue">Medical Record</p>
          <p className="mt-5">
            <span className="font-semibold">Name:</span>{" "}
            {medicalRecordModalData?.name}
          </p>
          <p className="mt-5">
            <span className="font-semibold">WhatsApp:</span>{" "}
            {medicalRecordModalData?.whatsapp}
          </p>
          <p className="mt-5">
            <span className="font-semibold">HN Number:</span>{" "}
            {medicalRecordModalData?.hnNum}
          </p>
          <p className="mt-2.5">
            <span className="font-semibold">Case Summary:</span> <br />
            {medicalRecordModalData?.caseSummary}
          </p>
          <div className="mt-2.5">
            <a
              className="flex w-fit gap-2 items-center px-2 py-1 shadow rounded bg-blue text-white "
              href={medicalRecordModalData?.passport}
              target="blank"
            >
              <BsFileEarmarkArrowDown className="text-xl" /> Passport
            </a>
          </div>
        </DialogBody>
        <DialogFooter>
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
              handaleDeleteMedicineRecord(medicalRecordModalData);
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

export default MedicalRecord;
