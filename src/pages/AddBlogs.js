import { Button, Input, Option, Select, Spinner } from "@material-tailwind/react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const AddBlogs = () => {
  const [loader1, setLoader1] = useState(false);
  const [blogImg, setBlogImg] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

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

  //post
  const handleAddBlogs = (e) => {
    setLoader1(true);
    e.preventDefault();
    const name = e.target.name.value;
    const blogSlug = e.target.blogSlug.value
    const blogs = {
      blogImg,
      name,
      blogSlug,
      editorValue,
    };
    const formData = new FormData();
    formData.append("blogImage", blogImg);
    formData.append("blogTitle", name);
    formData.append("slug", blogSlug);
    formData.append("region", country);
    formData.append("blogDescription", editorValue);
    //append data with keys
    fetch("http://127.0.0.1:8000/api/add/blogs", {
      method: "POST",
      body: formData,
    })
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
    <div className="mx-5 md:container md:mx-auto py-10 px-5">
      <form
        onSubmit={handleAddBlogs}
        className="bg-white"
      >
        <div className="flex justify-between">
          <p className="text-2xl font-semibold">Add Blogs</p>
          <Button
            className="bg-blue flex items-center gap-2"
            type="submit"
            disabled={editorValue === "" || country === ""}
          >
            Add Blogs
            {
              loader1 && <Spinner className="h-4 w-4" />
            }
          </Button>
        </div>

        <hr className="my-5" />
        <div className="flex flex-row items-center">
          <input
            type="file"
            id="custom-input"
            onChange={(e) => setBlogImg(e.target.files[0])}
            required
          />
        </div>
        <p className="text-red-400 text-sm mt-2.5">
          Image Ratio - 1200*628. Image size not more than 500kb
        </p>
        <div className="my-4 flex flex-col gap-y-4">
          <Input required label="Title" name="name" />
          <Input required label="Slug" name="blogSlug" />
          <Select required value={country} label="Select Country" onChange={value => setCountry(value)}>
            {countries.map((c) => (
              <Option value={c}>{c}</Option>
            ))}
          </Select>
        </div>

        <div className="">
          <label htmlFor="" className="text-red">
            <span className="font-semibold">Description</span>
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
      </form>
    </div>
  );
};

export default AddBlogs;
