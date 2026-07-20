import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./layouts/Main";
import AddDoctors from "./pages/AddDoctors";
import SignIn from "./auth/SignIn";
import AddPackages from "./pages/AddPackages";
import AddSpeciality from "./pages/AddSpeciality";
import AddCenters from "./pages/AddCenters";
import GetPackages from "./pages/GetPackages";
import Appointment from "./pages/Appointment";
import DoctorsList from "./pages/DoctorsList";
import AirAmbulance from "./pages/AirAmbulance";
import AirAmbulanceHubs from "./pages/AirAmbulanceHubs";
import MedicineOrder from "./pages/MedicineOrder";
import AirTicket from "./pages/AirTicket";
import TeleMedicine from "./pages/TeleMedicine";
import AirPickUp from "./pages/AirPickUp";
import MedicalRecord from "./pages/MedicalRecord";
import SeeQuery from "./pages/SeeQuery";
import CenterList from "./pages/CenterList";
import CheakUp from "./pages/CheakUp";
import ChildPackage from "./pages/ChildPackage";
import ChildPackageDetails from "./pages/ChildPackageDetails";
import Users from "./pages/Users";
import HealthPackage from "./pages/HealthPackage";
import VisaProcessing from "./pages/VisaProcessing";
import AddNews from "./pages/AddNews";
import AddBlogs from "./pages/AddBlogs";
import OneBlogs from "./pages/OneBlogs";
import OneNews from "./pages/OneNews";
import CenterUpdate from "./pages/CenterUpdate";
import NewsList from "./pages/NewsList";
import Blogslist from "./pages/Blogslist";
import PrivateAuth from "./auth/PrivateAuth";
import UpdateDoctor from "./pages/UpdateDoctor";
import Admission from "./pages/Admission";
import MedicalConsultancy from "./pages/MedicalConsultancy";
import LodgingBooking from "./pages/LodgingBooking";
import EmergencyDesk from "./pages/EmergencyDesk";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/home",
    element: (
      <PrivateAuth>
        <Main />
      </PrivateAuth>
    ),
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/home/add-speciality",
        element: <AddSpeciality />,
      },
      {
        path: "/home/add-doctors",
        element: <AddDoctors />,
      },
      {
        path: "/home/add-packages",
        element: <AddPackages />,
      },
      {
        path: "/home/get-packages",
        element: <GetPackages />,
      },
      {
        path: "/home/add-centers",
        element: <AddCenters />,
      },
      {
        path: "/home/appointments",
        element: <Appointment />,
      },
      {
        path: "/home/doctors-list",
        element: <DoctorsList />,
      },
      {
        path: "/home/update-doctor/:slug",
        element: <UpdateDoctor />,
      },
      {
        path: "/home/air_ambulance",
        element: <AirAmbulance />,
      },
      {
        path: "/home/air_ambulance_hubs",
        element: <AirAmbulanceHubs />,
      },
      {
        path: "/home/medicine_order",
        element: <MedicineOrder />,
      },
      {
        path: "/home/tele_medicine",
        element: <TeleMedicine />,
      },
      {
        path: "/home/admissions",
        element: <Admission />,
      },
      {
        path: "/home/medical-consultancy",
        element: <MedicalConsultancy />,
      },
      {
        path: "/home/lodging-booking",
        element: <LodgingBooking />,
      },
      {
        path: "/home/emergency-desk",
        element: <EmergencyDesk />,
      },
      {
        path: "/home/air_ticket",
        element: <AirTicket />,
      },
      {
        path: "/home/air_pickup",
        element: <AirPickUp />,
      },
      {
        path: "/home/medical_record",
        element: <MedicalRecord />,
      },
      {
        path: "/home/see_query",
        element: <SeeQuery />,
      },
      {
        path: "/home/centers-list",
        element: <CenterList />,
      },
      {
        path: "/home/update-center/:slug",
        element: <CenterUpdate />,
      },
      {
        path: "/home/check-up",
        element: <CheakUp />,
      },
      {
        path: "/home/package_details/:slug",
        element: <ChildPackage />,
      },
      {
        path: "/home/childPackage_details/:slug",
        element: <ChildPackageDetails />,
      },
      {
        path: "/home/health-Package",
        element: <HealthPackage />,
      },
      {
        path: "/home/users",
        element: <Users />,
      },
      {
        path: "/home/visa_processing",
        element: <VisaProcessing />,
      },
      {
        path: "/home/add-news",
        element: <AddNews />,
      },
      {
        path: "/home/news-list",
        element: <NewsList />,
      },
      {
        path: "/home/add-blogs",
        element: <AddBlogs />,
      },
      {
        path: "/home/blogs-list",
        element: <Blogslist />,
      },
      {
        path: "/home/one-blogs/:slug",
        element: <OneBlogs />,
      },
      {
        path: "/home/one-News/:id",
        element: <OneNews />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
