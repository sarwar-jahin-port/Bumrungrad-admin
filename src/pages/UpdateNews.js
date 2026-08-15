import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { Button, Input, Textarea, Spinner } from "@material-tailwind/react";

const UpdateNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [loader1, setLoader1] = useState(false);
  const [oneNews, setOneNews] = useState({});
  const [preview, setPreview] = useState(false);
  const [newsImg, setNewsImg] = useState("");

  useEffect(() => {
    fetch(`https://api.discoverinternationalmedicalservice.com/api/get/news/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOneNews(data.data);
        setLoader(false);
      });
  }, [id]);

  const handleUpdateNews = (e) => {
    e.preventDefault();
    setLoader1(true);
    const formData = new FormData();
    if (newsImg !== "") {
      formData.append("newsImage", newsImg);
    }
    formData.append("newsTitle", e.target.name.value);
    formData.append("newsSlogan", e.target.slogan.value);
    formData.append("newsDescription", e.target.descriptiion.value);

    fetch(`https://api.discoverinternationalmedicalservice.com/api/update/news/${id}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoader1(false);
        if (data.status === 200) {
          navigate("/home/news-list");
        } else {
          window.alert(data.msg);
        }
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className="p-5 my-5 md:container md:mx-auto">
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between">
            <p className="text-2xl font-semibold">Update News</p>
            {preview ? (
              <Button onClick={() => setPreview(!preview)} className="bg-red-500">
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
                <img className="h-[400px] w-full object-cover" src={oneNews?.newsImage} alt="" />
              </div>
              <div>
                <h5 className="text-xl font-semibold">{oneNews?.newsTitle}</h5>
                <p className="text-sm italic text-gray-600 mt-1">{oneNews?.newsSlogan}</p>
                <p className="mt-3">{oneNews?.newsDescription}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdateNews} className="bg-white">
              <img className="h-[400px] w-full object-cover" src={oneNews?.newsImage} alt="" />
              <div className="flex flex-row items-center mt-5">
                <input type="file" id="custom-input" onChange={(e) => setNewsImg(e.target.files[0])} />
              </div>
              <p className="text-red-400 text-sm mt-2.5">
                Image Ratio - 1200*628. Image size not more than 500kb
              </p>
              <div className="my-4 flex flex-col gap-y-4">
                <Input defaultValue={oneNews?.newsTitle} required label="Title" name="name" />
                <Input defaultValue={oneNews?.newsSlogan} label="Slogan" name="slogan" />
                <Textarea
                  defaultValue={oneNews?.newsDescription}
                  required
                  label="Description"
                  name="descriptiion"
                  rows={8}
                />
              </div>
              <Button className="bg-blue flex items-center gap-2" type="submit">
                Update News
                {loader1 && <Spinner className="h-4 w-4" />}
              </Button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default UpdateNews;
