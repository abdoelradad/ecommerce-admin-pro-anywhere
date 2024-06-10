import { IoHomeOutline } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { AiTwotoneProfile } from "react-icons/ai";
import { AiFillProfile } from "react-icons/ai";
import { AiOutlineDatabase } from "react-icons/ai";
import { AiFillDatabase } from "react-icons/ai";
import { IoIosList } from "react-icons/io";
import { IoIosListBox } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineCategory } from "react-icons/md";
import { MdCategory } from "react-icons/md";
// this for links
const links = [
  {
    name: "Dashboard",
    icon: <IoHomeOutline />,
    activeIcon: <IoHomeSharp />,
    path: "/",
  },
  {
    name: "Products",
    icon: <AiOutlineDatabase />,
    activeIcon: <AiFillDatabase />,
    path: "/products",
    pathTwo: "/products/new",
    pathThree: "/products/edit/",
  },
  {
    name: "Category",
    icon: <MdOutlineCategory />,
    activeIcon: <MdCategory />,
    path: "/category",
  },
  {
    name: "Orders",
    icon: <IoIosList />,
    activeIcon: <IoIosListBox />,
    path: "/orders",
  },
  {
    name: "Settings",
    icon: <CiSettings />,
    activeIcon: <IoIosSettings />,
    path: "/settings",
  },
];

export default links;
