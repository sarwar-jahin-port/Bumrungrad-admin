import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";

const ChildPackage = () => {
  const [loader, setLoader] = useState();
  const { slug } = useParams();
  const [childPackage, setChildPackage] = useState([]);
  //delete

  const handaleDeleteChild = (cp) => {
    const aggre = window.confirm(`You Want to Delete, ${cp?.title}.`);
    if (aggre) {
      fetch(
        `https://api.discoverinternationalmedicalservice.com/api/delete/sub_packages/${cp.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const newPackage = childPackage.filter((pc) => pc.id !== cp.id);
            alert("Package Deleted Successfully");
            setChildPackage(newPackage);
          }
        });
    }
  };
  useEffect(() => {
    setLoader(true);
    fetch(`https://api.discoverinternationalmedicalservice.com/api/get/sub/packages/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setChildPackage(data?.data);
          setLoader(false);
        }
        setLoader(false);
      });
  }, [slug]);
  return (
    <section className="mx-5 md:container md:mx-auto py-10">
      {loader ? (
        <Loader />
      ) : (
        <div>
          {childPackage?.length > 0 ? (
            <>
              <h2 className="md:ml-8 text-xl font-semibold md:text-2xl capitalize text-blue">
                Total sub packages: {childPackage.length}
              </h2>
              <hr className="my-5" />
              <div className="md:ml-8 my-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {" "}
                {childPackage.map((cp, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-2 shadow"
                  >
                    <img src={cp?.cover_photo} alt="" loading="lazy" />
                    <div className="p-2.5">
                      <p className="font-semibold text-blue md:text-xl mb-2.5">
                        {cp?.title}
                      </p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: cp?.content?.slice(0, 250),
                        }}
                      />
                    </div>
                    <div className="flex">
                      {" "}
                      <Link
                        to={`/home/childPackage_details/${cp.slug}`}
                        className="group bg-blue text-white p-2.5 w-1/2 flex justify-center gap-2"
                        target="_blank"
                      >
                        {/* <RemoveRedEyeIcon /> */}
                        <span className="capitalize">Update</span>
                      </Link>
                      <button
                        onClick={() => handaleDeleteChild(cp)}
                        className=" bg-red-500 text-white p-2.5 w-1/2 "
                      >
                        <span className="capitalize">Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="min-h-[80vh] flex justify-center items-center text-3xl font-semibold text-red-700">
              Data Not Found
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default ChildPackage;
