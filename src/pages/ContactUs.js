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

const ContactUs = () => {
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [contacts, setContacts] = useState([]);
  const handleOpen = (data) => {
    setOpen(!open);
    setModalData(data);
  };

  const handleDeleteContact = (contactData) => {
    const confirmed = window.confirm(
      `You Want to Delete, ${contactData.name}.`
    );
    if (confirmed) {
      fetch(`http://127.0.0.1:8000/api/delete/contacts/${contactData.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const newContacts = contacts.filter(
              (oneContact) => oneContact.id !== contactData.id
            );
            alert("Contact Deleted Successfully");
            setContacts(newContacts);
          }
        });
    }
  };

  const TABLE_HEAD = ["Request ID", "Name", "Email", "Phone", "Action"];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get/contact")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data.data || []);
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
            Contact Us Requests: {contacts?.length}
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
                {contacts?.map((oneContact, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {oneContact?.name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {oneContact?.email}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {oneContact?.phone}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleOpen(oneContact)}
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
          <p>Contact Us Request</p>
        </DialogHeader>
        <DialogBody>
          <h1 className="mt-2.5">
            <span className="font-semibold">Name : </span>{" "}
            {modalData?.name}
          </h1>
          <p className="mt-2.5">
            <span className="font-semibold"> Email : </span>{" "}
            {modalData?.email}
          </p>
          <p className="mt-2.5">
            <span className="font-semibold"> Phone : </span>{" "}
            {modalData?.phone}
          </p>
          <p className="mt-2.5">
            <span className="font-semibold"> Message : </span>{" "}
            {modalData?.message}
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
              handleDeleteContact(modalData);
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

export default ContactUs;
