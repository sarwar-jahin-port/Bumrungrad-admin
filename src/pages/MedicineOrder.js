import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Card, Typography } from "@material-tailwind/react";
import { AiFillEye } from "react-icons/ai";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
const MedicineOrder = () => {
  const [loader, setLoader] = useState(true);
  const [orderMedicine, setOrderMedicine] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [orderMedicineData, setModalData] = useState({});
  const handleOpen = (data) => {
    setOpen(!open);
    setModalData(data);
  };
  const handaleDeleteMedicine = (medicineData, index) => {
    const aggre = window.confirm(`You Want to Delete, ${medicineData?.name}.`);
    if (aggre) {
      fetch(
        `https://api.discoverinternationalmedicalservice.com/api/delete/order_medicines/${medicineData.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const newMedicine = orderMedicine.filter(
              (medicine) => medicine.id !== medicineData.id
            );
            alert("Medicine Order Deleted Successfully");
            setOrderMedicine(newMedicine);
          }
        });
    }
  };
  const TABLE_HEAD = [
    "Request ID",
    "Name",
    "Phone Number",
    "Concern",
    "Prescriotion Picture",
    "Medicine List",
    "Clear Order",
  ];
  useEffect(() => {
    fetch("https://api.discoverinternationalmedicalservice.com/api/get/order/medicine")
      .then((res) => res.json())
      .then((data) => {
        setOrderMedicine(data.data);
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
            Total Medicine Order: {orderMedicine?.length}
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
                {orderMedicine?.map((medicine, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {medicine?.name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {medicine?.phoneNumber}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {medicine?.concern}
                      </Typography>
                    </td>
                    <td className="p-4">
                      {medicine?.prescription !== null ? (
                        <a
                          href={medicine?.prescription}
                          target="blank"
                          rel="noopener noreferrer"
                          className="flex w-fit gap-2 items-center px-4 py-2 shadow rounded bg-blue text-white"
                        >
                          <BsFileEarmarkArrowDown className="text-xl" />
                          Prescription
                        </a>
                      ) : (
                        "No Prescriotion"
                      )}
                    </td>

                    <td className="p-4">
                      {!medicine?.medicines?.length ||
                      !medicine?.quantity?.length ? (
                        "No List"
                      ) : (
                        <button
                          onClick={() => handleOpen(medicine)}
                          className="px-4 py-2 shadow rounded bg-blue text-white flex items-center gap-2"
                        >
                          <AiFillEye className="text-xl" />
                          View
                        </button>
                      )}
                    </td>
                    <td>
                      <Button
                        onClick={() => handaleDeleteMedicine(medicine)}
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
      <Dialog
        open={open}
        handler={handleOpen}
        size="lg"
        className="md:h-[80vh] overflow-scroll"
      >
        <DialogBody>
          <p className="text-xl font-semibold text-blue">Medicine Order</p>
          <Card className="h-full w-full overflow-scroll mt-4">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Medicines
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Quantity
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderMedicineData?.medicines?.map((medicine, i) => {
                  const isLast = i === medicine.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr key={i}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {medicine}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {orderMedicineData?.quantity?.[i]}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
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
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default MedicineOrder;
