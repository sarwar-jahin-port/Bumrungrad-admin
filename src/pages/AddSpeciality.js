// import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";

export default function AddSpeciality() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [speciality, setSpeciality] = useState("");
  const [specialties, setSpecialities] = useState([]);
  const [subSpecialties, setSubSpecialities] = useState([]);
  const [parentSpecialityId, setparentSpecialityId] = useState("");
  const [activeTab, setActiveTab] = React.useState("Expertise");

  //add speacility
  const addSpeciality = () => {
    setLoading(true);
    const postData = { name: speciality };
    fetch("https://api.discoverinternationalmedicalservice.com/api/add/specialty", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.response.status === 404) {
          toast.error("Speciality Exist!");
        } else {
          setSpeciality("");
          setLoading(false);
          toast.success("Speciality Added Successfully!");
        }
      })
      .catch((e) => console.error(e));
  };
  //delete speciality
  const handaleDeletespeciality = (d) => {
    const aggre = window.confirm(`You Want to Delete, ${d?.name}.`);
    if (aggre) {
      fetch(`https://api.discoverinternationalmedicalservice.com/api/delete/specialties/${d.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const newTableData = specialties.filter(
              (doctor) => doctor.id !== d.id
            );
            alert("Speciality Deleted Successfully");
            setSpecialities(newTableData);
          }
        });
    }
  };
  //add sub speacility
  const addSubSpeciality = (e) => {
    setLoading2(true);
    e.preventDefault();
    const sub_speciality = e.target.sub_speciality.value;
    const postData = {
      specialty: parentSpecialityId,
      sub_specialty: sub_speciality,
    };
    fetch("https://api.discoverinternationalmedicalservice.com/api/add/sub/specialty", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.response?.status === 404) {
          toast.error("This Sub Speciality Exist!");
          setLoading2(false);
        } else {
          setLoading2(false);
          toast.success("Sub Speciality Added Successfully!");
          e.target.reset();
        }
      })
      .catch((e) => console.error(e));
  };

  //get speacilities
  useEffect(() => {
    fetch("https://api.discoverinternationalmedicalservice.com/api/get/specialty")
      .then((res) => res.json())
      .then((data) => {
        if (data?.response?.status === 200) {
          setSpecialities(data?.response?.data);
        } else {
        }
      });
  }, [loading]);

  //get sub speacilities
  useEffect(() => {
    fetch("https://api.discoverinternationalmedicalservice.com/api/get/sub/specialty")
      .then((res) => res.json())
      .then((data) => {
        setSubSpecialities(data?.response?.data);
      });
  }, [loading2]);

  //delete speciality
  const handaleDeleteSubspeciality = (d) => {
    const aggre = window.confirm(`You Want to Delete, ${d?.sub_specialty}.`);
    if (aggre) {
      fetch(
        `https://api.discoverinternationalmedicalservice.com/api/delete/sub_specialties/${d.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const newTableData = subSpecialties.filter(
              (doctor) => doctor.id !== d.id
            );
            alert("Sub Speciality Deleted Successfully");
            setSubSpecialities(newTableData);
          }
        });
    }
  };

  return (
    <div className="p-5 mx-5 md:container md:mx-auto">
      <div className="rounded-xl shadow-xl bg-white p-5">
        <p className="text-2xl font-semibold">Add Expertise</p>
        <hr className="my-5" />
        <div className="">
          <Tabs value={activeTab}>
            <TabsHeader
              className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
              indicatorProps={{
                className:
                  "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
              }}
            >
              <Tab
                value="Expertise"
                onClick={() => setActiveTab("Expertise")}
                className={activeTab === "Expertise" ? "text-gray-900" : ""}
              >
                Expertise
              </Tab>
              <Tab
                value="Speciality"
                onClick={() => setActiveTab("Speciality")}
                className={activeTab === "Speciality" ? "text-gray-900" : ""}
              >
                Speciality
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value={"Expertise"} className="">
                <div className="">
                  <div className="bg-white rounded-xl shadow p-5 md:w-1/2">
                    <p className="text-xl mb-5 font-semibold">Add Speciality</p>
                    <div className="relative">
                      <Input
                        value={speciality}
                        type="text"
                        label="Add Specility"
                        onChange={(e) => setSpeciality(e.target.value)}
                      />
                      <Button
                        size="sm"
                        onClick={addSpeciality}
                        className="!absolute right-1 top-1 rounded bg-blue"
                      >
                        {loading ? "Loading..." : "Add"}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="bg-white mt-5 p-5 shadow rounded-xl">
                  <p className="font-semibold">Specility List</p>
                  <hr className="my-3" />
                  <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {specialties?.map((speciality) => (
                      <li
                        className="p-2.5 rounded-md shadow-md flex items-center justify-between"
                        key={speciality.id}
                      >
                        <span>{speciality.name}</span>
                        <button
                          onClick={() => handaleDeletespeciality(speciality)}
                        >
                          <AiOutlineDelete className="text-2xl text-red-500" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabPanel>
              <TabPanel value={"Speciality"} className="">
                <div className="">
                  <div className="bg-white rounded-xl shadow p-5 mt-5 md:w-1/2">
                    <form
                      action=""
                      className="flex flex-col gap-2"
                      onSubmit={addSubSpeciality}
                    >
                      <div>
                        <p className="text-xl mb-5 font-semibold">
                          Add Sub Speciality
                        </p>
                        <Select
                          label="Select Specialty"
                          onChange={(value) => setparentSpecialityId(value)}
                        >
                          {specialties?.map((speciality) => (
                            <Option key={speciality.id} value={speciality.name}>
                              {speciality.name}
                            </Option>
                          ))}
                        </Select>
                      </div>
                      <Input
                        type="text"
                        label="Add Sub Specility"
                        name="sub_speciality"
                      />
                      <Button size="sm" type="submit" className="bg-blue">
                        {loading2 ? "Loading..." : "Add"}
                      </Button>
                    </form>
                  </div>
                </div>
                <div className="bg-white mt-5 p-5 shadow rounded-xl">
                  <p className="font-semibold">Sub Specility List</p>
                  <hr className="my-3" />
                  <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {subSpecialties?.map((speciality) => (
                      <li
                        className="p-2.5 my-1 rounded-md shadow-md flex justify-between items-center"
                        key={speciality.id}
                      >
                        <span className="uppercase">
                          {speciality.sub_specialty}
                        </span>
                        <button
                          onClick={() => handaleDeleteSubspeciality(speciality)}
                        >
                          <AiOutlineDelete className="text-2xl text-red-500" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
