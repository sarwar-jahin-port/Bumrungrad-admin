import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import {
  Button,
  Input,
  Option,
  Select,
  Spinner,
} from "@material-tailwind/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const OneBlogs = () => {
  const { slug } = useParams();
  const [loader, setLoader] = useState(true);
  const [oneBlog, setOneBlog] = useState({});
  const [country, setCountry] = useState("");
  const [preview, setPreview] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const [blogImg, setBlogImg] = useState("");

  const navigate = useNavigate();
  //react quil....

  const [editorValue, seteditorValue] = useState();

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
  // get data
  useEffect(() => {
    fetch(
      `https://api.discoverinternationalmedicalservice.com/api/get/blogs/${slug}`
    )
      .then((res) => res.json())
      .then((data) => {
        setOneBlog(data.data);
        setCountry(data.data.region);
        seteditorValue(data.data.blogDescription);
        setLoader(false);
      });
  }, [slug]);

  //update blog
  const handleUpdateBlogs = (e) => {
    setLoader1(true);
    e.preventDefault();
    const name = e.target.name.value;
    const slug = e.target.slug.value;
    // const blogs = {
    //   blogImg,
    //   name,
    //   slug,
    //   editorValue,
    // };
    const formData = new FormData();
    formData.append("blogImage", blogImg !== "" ? blogImg : null);
    formData.append("blogTitle", name);
    formData.append("slug", slug);
    formData.append("region", country);
    formData.append("blogDescription", editorValue);
    //append data with keys
    fetch(
      `https://api.discoverinternationalmedicalservice.com/api/update/blogs/${oneBlog?.id}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setLoader1(false);
          navigate("/home/blogs-list");
        } else {
          window.alert(data.msg);
          setLoader1(false);
        }
      })
      .catch((e) => console.error(e));
  };

  const countries = [
    "GLOBAL",
    "BAHRAIN",
    "BANGLADESH",
    "CAMBODIA",
    "CHAD",
    "CHINA",
    "EAST AFRICA",
    "ETHIOPIA",
    "HONG KONG",
    "INDONESIA",
    "KENYA",
    "KUWAIT",
    "LAOS",
    "MONGOLIA",
    "MYANMAR",
    "NEPAL",
  ];
  return (
    <div className="p-5 my-5 md:container md:mx-auto">
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between">
            <p className="text-2xl font-semibold">Update Blogs</p>
            {preview ? (
              <Button
                onClick={() => setPreview(!preview)}
                className="bg-red-500"
              >
                Cancel
              </Button>
            ) : (
              <Button onClick={() => setPreview(!preview)} className="bg-blue">
                Preview
              </Button>
            )}
          </div>

          <hr className="my-5" />
          {preview ? (
            <div className="flex flex-col gap-2.5 md:gap-5">
              <div className="flex justify-center">
                <img className="h-[400px] w-full" src={oneBlog?.blogImage} alt="" />
              </div>
              <div className="">
                <h5 className="text-xl font-semibold">{oneBlog?.blogTitle}</h5>
                <div
                  dangerouslySetInnerHTML={{ __html: oneBlog?.blogDescription }}
                />
                {/* <p>{oneBlog?.blogSlogan}</p> */}
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdateBlogs} className="bg-white">
              <img
                className="h-[400px] w-full"
                src={oneBlog?.blogImage}
                alt=""
              />
              <div className="flex flex-row items-center mt-5">
                <input
                  type="file"
                  id="custom-input"
                  onChange={(e) => setBlogImg(e.target.files[0])}
                />
              </div>
              <p className="text-red-400 text-sm mt-2.5">
                Image Ratio - 1200*628. Image size not more than 500kb
              </p>
              <div className="my-4 flex flex-col gap-y-4">
                <Input
                  defaultValue={oneBlog?.blogTitle}
                  required
                  label="Title"
                  name="name"
                />
                <Input
                  defaultValue={oneBlog?.slug}
                  required
                  label="Slug"
                  name="slug"
                />
                <Select
                  value={country}
                  label="Select Country"
                  onChange={(value) => setCountry(value)}
                >
                  {countries.map((c) => (
                    <Option value={c}>{c}</Option>
                  ))}
                </Select>
                {/* <Textarea
                  defaultValue={oneBlog?.blogSlogan}
                  required
                  label='Blog Slogan'
                  name='descriptiion'
                  rows={8}
                /> */}
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
                className="bg-blue flex items-center gap-2"
                type="submit"
                disabled={editorValue === ""}
              >
                Update Blogs
                {loader1 && <Spinner className="h-4 w-4" />}
              </Button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default OneBlogs;
