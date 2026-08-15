import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Button,
  Input,
  Option,
  Select,
  Spinner,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AiOutlineDelete } from "react-icons/ai";

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const ChildPackageDetails = () => {
  const [loader, setLoader] = useState(false);
  const [childLoader, setChildLoader] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [childDetailsPackage, setChildDetailsPackage] = useState({});

  //dialogue
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(!open2);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(!open3);

  const [parentPckages, setParentPackages] = useState([]);
  const [parentId, setParentId] = useState("");
  const [selectedChildImage, setSelectedChildImage] = useState("");

  const [childSlug, setChildSlug] = useState("");
  const [childSlugEdited, setChildSlugEdited] = useState(false);

  // Terms & Conditions -> DB `conditions` column
  const [term, setTerm] = useState("");
  const [terms, setTerms] = useState([]);

  // Package Inclusions -> DB `inclusions` column
  const [inclusion, setInclusion] = useState("");
  const [inclusions, setInclusions] = useState([]);

  // Package Exclusions -> DB `exclusions` column
  const [exclusion, setExclusion] = useState("");
  const [exclusions, setExclusions] = useState([]);

  const addTerm = () => {
    setTerms([...terms, { condition: term }]);
    setTerm("");
  };
  const removeTerm = (index) => {
    setTerms(terms.filter((_, i) => i !== index));
  };
  const addInclusion = () => {
    setInclusions([...inclusions, { inclusion }]);
    setInclusion("");
  };
  const removeInclusion = (index) => {
    setInclusions(inclusions.filter((_, i) => i !== index));
  };
  const addExclusion = () => {
    setExclusions([...exclusions, { exclusion }]);
    setExclusion("");
  };
  const removeExclusion = (index) => {
    setExclusions(exclusions.filter((_, i) => i !== index));
  };

  //react quil
  const [editorValue, seteditorValue] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video", "code-block"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  //get parent package
  useEffect(() => {
    fetch("https://api.discoverinternationalmedicalservice.com/api/get/package")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404) {
        } else {
          setParentPackages(data?.data);
        }
      });
  }, []);

  //get packages details
  useEffect(() => {
    setLoader(true);
    fetch(`https://api.discoverinternationalmedicalservice.com/api/get/sub/package/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          const found = data?.data;
          setChildDetailsPackage(found);
          setParentId(found?.parent_id ? String(found.parent_id) : "");
          setChildSlug(found?.slug || "");
          seteditorValue(found?.content || "");
          setTerms(found?.conditions || []);
          setInclusions(found?.inclusions || []);
          setExclusions(found?.exclusions || []);
        }
        setLoader(false);
      });
  }, [slug]);

  // update child package
  const handleUpdateChildPackages = (e) => {
    setChildLoader(true);
    e.preventDefault();
    const title = e.target.title.value;
    const price = e.target.price.value;
    const location = e.target.location.value;
    const shift1 = e.target.shift1.value;
    const shift2 = e.target.shift2.value;

    const formData = new FormData();
    if (selectedChildImage) {
      formData.append("cover_photo", selectedChildImage);
    }
    formData.append("title", title);
    formData.append("slug", childSlug);
    formData.append("price", price);
    formData.append("parent_id", parentId);
    formData.append("location", location);
    formData.append("shift1", shift1);
    formData.append("shift2", shift2);
    formData.append("content", editorValue);
    formData.append("conditions", JSON.stringify(terms));
    formData.append("inclusions", JSON.stringify(inclusions));
    formData.append("exclusions", JSON.stringify(exclusions));

    fetch(
      `https://api.discoverinternationalmedicalservice.com/api/update/sub/package/${childDetailsPackage?.id}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === 200) {
          toast.success("Child Package Updated Successfully!");
          setChildLoader(false);
          navigate("/home/get-packages");
        } else {
          toast.error(data?.msg);
          setChildLoader(false);
        }
      })
      .catch((e) => console.error(e));
  };
  return (
    <section className="mx-5 md:container md:mx-auto py-10">
      {loader ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleUpdateChildPackages}
          action=""
          className="flex flex-col gap-5"
        >
          <h5 className="text-xl font-semibold">Update Child Package</h5>
          <img
            src={childDetailsPackage?.cover_photo}
            alt="child_package_cover_photo"
            className="h-[200px] w-[300px]"
          />
          <div className="flex flex-row items-center">
            <input
              type="file"
              id="child-input"
              onChange={(e) => setSelectedChildImage(e.target.files[0])}
              hidden
            />
            <label
              htmlFor="child-input"
              className="block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-blue duration-300 ease-linear text-white cursor-pointer"
            >
              Choose file
            </label>
            <label className="text-sm text-slate-500">
              {selectedChildImage?.name
                ? selectedChildImage?.name
                : "No File Chosen"}
            </label>
          </div>
          <p className="text-red-400 text-sm">
            Image Ratio - 1200*628. Image size not more than 500kb
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="w-full">
              <Select
                label="Select Parent Package"
                required
                value={parentId}
                onChange={(value) => setParentId(value)}
              >
                {parentPckages?.map((pp) => (
                  <Option key={pp.id} value={pp.id.toString()}>
                    {pp.title}
                  </Option>
                ))}
              </Select>
              {parentId === "" && (
                <p className="text-red-500 text-sm mt-1">
                  *Select Parent Package
                </p>
              )}
            </div>
            <Input
              label="Enter Title"
              name="title"
              required
              defaultValue={childDetailsPackage?.title}
            />
            <div>
              <Input
                label="Enter Slug"
                name="slug"
                value={childSlug}
                onChange={(e) => {
                  setChildSlugEdited(true);
                  setChildSlug(slugify(e.target.value));
                }}
              />
              <p className="text-xs text-slate-500 mt-1">
                Used in the page URL — edit only if needed.
              </p>
            </div>
            <Input
              label="Enter Price"
              name="price"
              type="number"
              required
              defaultValue={childDetailsPackage?.price}
            />
            <Input
              label="Enter Location"
              name="location"
              defaultValue={childDetailsPackage?.location}
            />
            <Input
              label="Enter First Shift"
              name="shift1"
              defaultValue={childDetailsPackage?.shift1}
            />
            <Input
              label="Enter Second Shift"
              name="shift2"
              defaultValue={childDetailsPackage?.shift2}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Terms & Conditions -> conditions */}
            <div className="flex items-center gap-5">
              <div className="relative flex w-full">
                <Input
                  value={term}
                  type="text"
                  label="Terms & Conditions"
                  onChange={(e) => setTerm(e.target.value)}
                />
                <Button
                  size="sm"
                  onClick={addTerm}
                  className="!absolute right-1 top-1 rounded bg-blue"
                  disabled={term === ""}
                >
                  Add
                </Button>
              </div>
              <div className="relative">
                <Button
                  onClick={handleOpen}
                  size="sm"
                  className="bg-white text-blue border border-blue"
                >
                  View
                </Button>
                {terms.length > 0 && (
                  <div className="h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl"></div>
                )}
                <Dialog open={open} handler={handleOpen}>
                  <DialogHeader>Terms &amp; Conditions</DialogHeader>
                  <DialogBody divider>
                    {terms.length > 0 ? (
                      <div className="flex flex-col gap-4">
                        {terms.map((c, i) => (
                          <div key={i} className="flex justify-between">
                            <p className="text-xl w-5/6">
                              {i + 1}. {c.condition}
                            </p>
                            <div className="w-1/6 flex justify-center">
                              <AiOutlineDelete
                                onClick={() => removeTerm(i)}
                                className="text-red-500 text-3xl cursor-pointer"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="py-5 font-semibold text-red-500">
                        Enter Something!
                      </p>
                    )}
                  </DialogBody>
                  <DialogFooter>
                    <Button
                      variant="text"
                      color="red"
                      size="sm"
                      onClick={handleOpen}
                      className="mr-1"
                    >
                      <span>Close</span>
                    </Button>
                  </DialogFooter>
                </Dialog>
              </div>
            </div>
            {/* Package Inclusions -> inclusions */}
            <div className="flex items-center gap-5">
              <div className="relative flex w-full">
                <Input
                  value={inclusion}
                  type="text"
                  label="Package Inclusions"
                  onChange={(e) => setInclusion(e.target.value)}
                />
                <Button
                  size="sm"
                  onClick={addInclusion}
                  className="!absolute right-1 top-1 rounded bg-blue"
                  disabled={inclusion === ""}
                >
                  Add
                </Button>
              </div>
              <div className="relative">
                <Button
                  onClick={handleOpen2}
                  size="sm"
                  className="bg-white text-blue border border-blue"
                >
                  View
                </Button>
                {inclusions.length > 0 && (
                  <div className="h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl"></div>
                )}
                <Dialog open={open2} handler={handleOpen2}>
                  <DialogHeader>Package Inclusions</DialogHeader>
                  <DialogBody divider>
                    {inclusions.length > 0 ? (
                      <div className="flex flex-col gap-4">
                        {inclusions.map((c, i) => (
                          <div key={i} className="flex justify-between">
                            <p className="text-xl w-5/6">
                              {i + 1}. {c.inclusion}
                            </p>
                            <div className="w-1/6 flex justify-center">
                              <AiOutlineDelete
                                onClick={() => removeInclusion(i)}
                                className="text-red-500 text-3xl cursor-pointer"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="py-5 font-semibold text-red-500">
                        Enter Something!
                      </p>
                    )}
                  </DialogBody>
                  <DialogFooter>
                    <Button
                      variant="text"
                      color="red"
                      size="sm"
                      onClick={handleOpen2}
                      className="mr-1"
                    >
                      <span>Close</span>
                    </Button>
                  </DialogFooter>
                </Dialog>
              </div>
            </div>
            {/* Package Exclusions -> exclusions */}
            <div className="flex items-center gap-5">
              <div className="relative flex w-full">
                <Input
                  value={exclusion}
                  type="text"
                  label="Package Exclusions"
                  onChange={(e) => setExclusion(e.target.value)}
                />
                <Button
                  size="sm"
                  onClick={addExclusion}
                  className="!absolute right-1 top-1 rounded bg-blue"
                  disabled={exclusion === ""}
                >
                  Add
                </Button>
              </div>
              <div className="relative">
                <Button
                  onClick={handleOpen3}
                  size="sm"
                  className="bg-white text-blue border border-blue"
                >
                  View
                </Button>
                {exclusions.length > 0 && (
                  <div className="h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl"></div>
                )}
                <Dialog open={open3} handler={handleOpen3}>
                  <DialogHeader>Package Exclusions</DialogHeader>
                  <DialogBody divider>
                    {exclusions.length > 0 ? (
                      <div className="flex flex-col gap-4">
                        {exclusions.map((c, i) => (
                          <div key={i} className="flex justify-between">
                            <p className="text-xl w-5/6">
                              {i + 1}. {c.exclusion}
                            </p>
                            <div className="w-1/6 flex justify-center">
                              <AiOutlineDelete
                                onClick={() => removeExclusion(i)}
                                className="text-red-500 text-3xl cursor-pointer"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="py-5 font-semibold text-red-500">
                        Enter Something!
                      </p>
                    )}
                  </DialogBody>
                  <DialogFooter>
                    <Button
                      variant="text"
                      color="red"
                      size="sm"
                      onClick={handleOpen3}
                      className="mr-1"
                    >
                      <span>Close</span>
                    </Button>
                  </DialogFooter>
                </Dialog>
              </div>
            </div>
          </div>
          <div className="">
            <label htmlFor="" className="text-red">
              <span className="font-semibold">Long Description</span>
            </label>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={editorValue}
              onChange={seteditorValue}
              className="my-2.5"
            />
          </div>
          <Button
            className="bg-blue w-fit flex items-center gap-1"
            type="submit"
          >
            Update{" "}
            {childLoader && <Spinner className="h-4 w-4" color="white" />}
          </Button>
        </form>
      )}
    </section>
  );
};

export default ChildPackageDetails;
