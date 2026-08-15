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
const AirAmbulance = () => {
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [airAmbulenceModalData, setModalData] = useState({});
  const handleOpen = (data) => {
    setOpen(!open);
    setModalData(data);
  };

  const [airAmbulance, setAirAmbulancet] = useState([]);

  // Delete Data...
  const handaleDeleteAirAmbulance = (airAmbulanceData) => {
    const aggre = window.confirm(
      `You Want to Delete This, ${airAmbulanceData?.entry_date} Date .`
    );
    if (aggre) {
      fetch(
        `https://api.discoverinternationalmedicalservice.com/api/delete/air_ambulances/${airAmbulanceData.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const newAirAmbulance = airAmbulance.filter(
              (oneAmbulance) => oneAmbulance.id !== airAmbulanceData.id
            );
            alert("Air Ambulance Deleted Successfully");
            setAirAmbulancet(newAirAmbulance);
          }
        });
    }
  };
  const TABLE_HEAD = ["Request ID", "Entry Date", "Passport Copy", "Action"];
  useEffect(() => {
    fetch("https://api.discoverinternationalmedicalservice.com/api/get/air/ambulance")
      .then((res) => res.json())
      .then((data) => {
        setAirAmbulancet(data.data);
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
            Air Ambulance Request: {airAmbulance?.length}
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
                          i === 4 && "text-center"
                        }`}
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {airAmbulance?.map((oneAmbulance, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-4">{index + 1}</td>

                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {oneAmbulance?.entry_date}
                      </Typography>
                    </td>

                    <td className="p-4">
                      <a
                        href={oneAmbulance?.passport_copy}
                        target="blank"
                        rel="noopener noreferrer"
                        className="flex w-fit items-center gap-2 px-2 py-1 shadow rounded bg-blue text-white "
                      >
                        <BsFileEarmarkArrowDown className="text-xl" />
                        Passport
                      </a>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleOpen(oneAmbulance)}
                        className="flex w-fit gap-2 items-center px-2 py-1 shadow rounded bg-blue text-white "
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
        <DialogHeader>
          <div>Airambulance</div>
        </DialogHeader>
        <DialogBody>
          <div>
            <h1 className="font-semibold">
              Entry Date : {airAmbulenceModalData?.entry_date}
            </h1>
            <p className="mt-2.5">
              {" "}
              <span className="font-semibold"> Summary : </span> <br />
              {airAmbulenceModalData?.summary}
            </p>
            <p className="mt-2.5">
              {" "}
              <span className="font-semibold">Description :</span>
              <br /> {airAmbulenceModalData?.description}
            </p>
          </div>

          <div className="mt-2.5">
            <a
              className="flex w-fit gap-2 items-center px-2 py-1 shadow rounded bg-blue text-white "
              href={airAmbulenceModalData?.passport_copy}
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
              handaleDeleteAirAmbulance(airAmbulenceModalData);
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

export default AirAmbulance;
