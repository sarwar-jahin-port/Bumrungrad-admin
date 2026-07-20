import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import {
  PresentationChartBarIcon,
  PowerIcon,
  ClipboardDocumentListIcon,
  GiftIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  PlusIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { BiSolidAmbulance, BiSolidUserDetail, BiSolidPhoneCall } from "react-icons/bi";
import { FaPassport, FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineOrderedList, AiFillProfile } from "react-icons/ai";
import { FaHandHoldingMedical } from "react-icons/fa";
import { TbRibbonHealth } from "react-icons/tb";
import {
  BsFillTelephoneForwardFill,
  BsQuestionOctagonFill,
} from "react-icons/bs";
import { ImBlogger2 } from "react-icons/im";
import { GiNewspaper } from "react-icons/gi";
import { MdAirplaneTicket, MdWheelchairPickup, MdMedicalServices, MdOutlineHotel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export function LeftBar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handaleLogOut = () => {
    navigate("/");
  };

  return (
    <div className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 overflow-y-auto">
      <List>
        <Link to="/home">
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Link to="/home/users">
          <ListItem>
            <ListItemPrefix>
              <BiSolidUserDetail className="h-5 w-5" />
            </ListItemPrefix>
            Patient
          </ListItem>
        </Link>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <ClipboardDocumentListIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Doctors
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0 ml-4 ">
              <Link to="/home/add-speciality">
                <ListItem>
                  <ListItemPrefix>
                    <PlusIcon strokeWidth={3} className="h-5 w-5" />
                  </ListItemPrefix>
                  Add Speciality
                </ListItem>
              </Link>
              <Link to="/home/add-doctors">
                <ListItem>
                  <ListItemPrefix>
                    <PlusIcon strokeWidth={3} className="h-5 w-5" />
                  </ListItemPrefix>
                  Add Doctor
                </ListItem>
              </Link>
              <Link to="/home/doctors-list">
                <ListItem>
                  <ListItemPrefix>
                    <ListBulletIcon strokeWidth={3} className="h-5 w-5" />
                  </ListItemPrefix>
                  Doctors List
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <GiftIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Packages
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0 ml-4">
              <Link to="/home/add-packages">
                <ListItem>
                  <ListItemPrefix>
                    <PlusIcon strokeWidth={3} className="h-5 w-5" />
                  </ListItemPrefix>
                  Add Package
                </ListItem>
              </Link>
              <Link to="/home/get-packages">
                <ListItem>
                  <ListItemPrefix>
                    <ListBulletIcon strokeWidth={3} className="h-5 w-5" />
                  </ListItemPrefix>
                  Packages List
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 3 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 3}>
            <AccordionHeader
              onClick={() => handleOpen(3)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <BuildingOffice2Icon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Clinic & Centers
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0 ml-4">
              <Link to="/home/add-centers">
                <ListItem>
                  <ListItemPrefix>
                    <PlusIcon strokeWidth={3} className="h-5 w-5" />
                  </ListItemPrefix>
                  Add Centers
                </ListItem>
              </Link>
              <Link to="/home/centers-list">
                <ListItem>
                  <ListItemPrefix>
                    <ListBulletIcon strokeWidth={3} className="h-5 w-5" />
                  </ListItemPrefix>
                  Centers List
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 4}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 4 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 4}>
            <AccordionHeader
              onClick={() => handleOpen(4)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <ImBlogger2 className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Manage Blogs
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0 ml-4">
              <Link to="/home/blogs-list">
                <ListItem>
                  <ListItemPrefix>
                    <ListBulletIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Blogs List
                </ListItem>
              </Link>
              <Link to="/home/add-blogs">
                <ListItem>
                  <ListItemPrefix>
                    <PlusIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Add Blogs
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 5}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 5 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 5}>
            <AccordionHeader
              onClick={() => handleOpen(5)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <GiNewspaper className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Manage News
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0 ml-4">
              <Link to="/home/add-news">
                <ListItem>
                  <ListItemPrefix>
                    <PlusIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Add News
                </ListItem>
              </Link>
              <Link to="/home/news-list">
                <ListItem>
                  <ListItemPrefix>
                    <ListBulletIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  News List
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>

        <Link to="/home/appointments">
          <ListItem>
            <ListItemPrefix>
              <CalendarDaysIcon className="h-5 w-5" />
            </ListItemPrefix>
            Appoinments
          </ListItem>
        </Link>
        <Link to="/home/air_ambulance">
          <ListItem>
            <ListItemPrefix>
              <BiSolidAmbulance className="h-5 w-5" />
            </ListItemPrefix>
            Air Ambulance
          </ListItem>
        </Link>
        <Link to="/home/air_ambulance_hubs">
          <ListItem>
            <ListItemPrefix>
              <FaMapMarkerAlt className="h-5 w-5" />
            </ListItemPrefix>
            Air Ambulance Hubs
          </ListItem>
        </Link>
        <Link to="/home/medicine_order">
          <ListItem>
            <ListItemPrefix>
              <AiOutlineOrderedList className="h-5 w-5" />
            </ListItemPrefix>
            Medicine Orders
          </ListItem>
        </Link>
        <Link to="/home/tele_medicine">
          {" "}
          <ListItem>
            <ListItemPrefix>
              <BsFillTelephoneForwardFill className="h-5 w-5" />
            </ListItemPrefix>
            Tele Medicine
          </ListItem>
        </Link>
        <Link to="/home/admissions">
          {" "}
          <ListItem>
            <ListItemPrefix>
              <FaHandHoldingMedical className="h-5 w-5" />
            </ListItemPrefix>
            Direct Admission
          </ListItem>
        </Link>
        <Link to="/home/medical-consultancy">
          {" "}
          <ListItem>
            <ListItemPrefix>
              <MdMedicalServices className="h-5 w-5" />
            </ListItemPrefix>
            Medical Consultancy
          </ListItem>
        </Link>
        <Link to="/home/lodging-booking">
          {" "}
          <ListItem>
            <ListItemPrefix>
              <MdOutlineHotel className="h-5 w-5" />
            </ListItemPrefix>
            Lodging Booking
          </ListItem>
        </Link>
        <Link to="/home/emergency-desk">
          {" "}
          <ListItem>
            <ListItemPrefix>
              <BiSolidPhoneCall className="h-5 w-5" />
            </ListItemPrefix>
            Emergency Desk
          </ListItem>
        </Link>
        <Link to="/home/visa_processing">
          <ListItem>
            <ListItemPrefix>
              <FaPassport className="h-5 w-5" />
            </ListItemPrefix>
            Visa Processing
          </ListItem>
        </Link>
        <Link to="/home/air_ticket">
          <ListItem>
            <ListItemPrefix>
              <MdAirplaneTicket className="h-5 w-5" />
            </ListItemPrefix>
            Air Tickets
          </ListItem>
        </Link>
        <Link to="/home/air_pickup">
          {" "}
          <ListItem>
            <ListItemPrefix>
              <MdWheelchairPickup className="h-5 w-5" />
            </ListItemPrefix>
            Air Pickup
          </ListItem>
        </Link>
        <Link to="/home/medical_record">
          {" "}
          <ListItem>
            <ListItemPrefix>
              <AiFillProfile className="h-5 w-5" />
            </ListItemPrefix>
            Medical Record
          </ListItem>
        </Link>
        <Link to="/home/see_query">
          {" "}
          <ListItem>
            <ListItemPrefix>
              <BsQuestionOctagonFill className="h-5 w-5" />
            </ListItemPrefix>
            Client Query
          </ListItem>
        </Link>
        <Link to="/home/check-up">
          {" "}
          <ListItem>
            <ListItemPrefix>
              <FaHandHoldingMedical className="h-5 w-5" />
            </ListItemPrefix>
            Check Up
          </ListItem>
        </Link>
        <Link to="/home/health-Package">
          {" "}
          <ListItem>
            <ListItemPrefix>
              <TbRibbonHealth className="h-5 w-5" />
            </ListItemPrefix>
            Health Package
          </ListItem>
        </Link>
        <button onClick={handaleLogOut}>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </button>
      </List>
    </div>
  );
}
