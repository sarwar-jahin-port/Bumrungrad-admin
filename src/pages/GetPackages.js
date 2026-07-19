import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Avatar,
} from "@material-tailwind/react";
import { toast } from "react-toastify";

export default function GetPackages() {
  const [loader, setLoader] = useState(false);
  const [updateLoader, setUpdateLoader] = useState(false);
  const [packages, setPackages] = useState([]);
  const [open, setOpen] = React.useState(false);
  //updated value
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleOpen = (data) => {
    setOpen(!open);
    setId(data.id);
    setTitle(data.title);
    setDescription(data.description);
    setImage(data.cover_photo);
  };

  //Delete Packsge
  const handaleDeletePackage = (p) => {
    const aggre = window.confirm(`You Want to Delete, ${p?.title}.`);
    if (aggre) {
      fetch(`http://127.0.0.1:8000/api/delete/packages/${p.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const newPackage = packages.filter((pc) => pc.id !== p.id);
            alert("Package Deleted Successfully");
            setPackages(newPackage);
          }
        });
    }
  };

  // get parent packages
  useEffect(() => {
    setLoader(true);
    fetch("http://127.0.0.1:8000/api/get/package")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404) {
          setLoader(false);
        } else {
          setPackages(data?.data);
          setLoader(false);
        }
      });
  }, [updateLoader]);
  //update parent package
  const handleUpdateParentPackages = () => {
    setUpdateLoader(true);
    const formData = new FormData();
    formData.append("cover_photo", image);
    formData.append("title", title);
    formData.append("description", description);

    fetch(`http://127.0.0.1:8000/api/update/package/${id}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Parent Package Added Successfully!");
        setOpen(false);
        setUpdateLoader(false);
        window.location.reload();
      })
      .catch((e) => console.error(e));
  };
  return (
    <div className="m-5 md:m-10">
      {loader ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-xl font-semibold text-blue">
            Total Parent Packages: {packages?.length}
          </h2>
          <hr className="my-5" />
          <div className="my-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {packages?.map((p, i) => (
              <div
                key={i}
                className="flex flex-col justify-between gap-2 shadow hover:shadow-xl duration-300 ease-linear"
              >
                <img src={p?.cover_photo} alt="" loading="lazy" />
                <div className="p-2.5">
                  <p className="font-semibold text-blue md:text-xl mb-2.5">
                    {p?.title}
                  </p>
                  <p>{p?.description?.slice(0, 150)}</p>
                </div>
                <div className="flex">
                  <Link
                    className="text-center bg-blue text-white p-1.5 w-full"
                    to={`/home/package_details/${p.slug}`}
                    target="_blank"
                  >
                    View
                  </Link>
                  <Link
                    className="text-center bg-orange-500 text-white p-1.5 w-full"
                    onClick={() => handleOpen(p)}
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handaleDeletePackage(p)}
                    className=" bg-red-500 text-white p-1.5 w-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Update Parent Package</DialogHeader>
        <DialogBody className="flex flex-col gap-5">
          <img src={image} alt="cover_photo" className="h-[200px] w-[300px]" />
          <input type="file" onChange={e => setImage(e.target.files[0])} />
          <Input
            onChange={(e) => setTitle(e.target.value)}
            label="Enter title"
            defaultValue={title}
          />
          <Textarea
            onChange={(e) => setDescription(e.target.value)}
            label="Enter Description"
            defaultValue={description}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
            size="sm"
          >
            <span>Cancel</span>
          </Button>
          <Button
            className="bg-blue"
            size="sm"
            onClick={handleUpdateParentPackages}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
