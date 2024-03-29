import { Image, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
//TODO Icons
import { useRouter } from "next/router";
import mergeNames from "../../util/mergeNames";
import { UserIcon } from "./icons";

import { useAuth } from "@/context/auth";
import { STYLES } from "@/styles/index";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import { useRef } from "react";
import { BsGrid } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiHeart } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import CustomModal from "@/util/CustomModal";
import Feedback from "@/util/Feedback";
import { MdShare } from "react-icons/md";

const drawerItem = [
  {
    icon: <CgProfile />,
    text: "Хувийн мэдээлэл",
    href: "Profile",
  },
  {
    icon: <BsGrid />,
    text: "Миний зарууд",
    href: "MyAds",
  },
  {
    icon: <MdShare />,
    text: "Хуваалцсан зарууд",
    href: "SharedAds",
  },
  {
    icon: <FiHeart />,
    text: "Миний хүслүүд",
    href: "Bookmark",
  },
  {
    icon: <IoWalletOutline />,
    text: "Хэтэвч",
    href: "WalletPage",
  },
];

const BodyDrawer = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const user = getCookie("user");

  return (
    <DrawerBody className="flex flex-col justify-between p-0 bg-bgdark/95">
      <div
        className={mergeNames(
          STYLES.flexBetween,
          "flex-col w-full items-center "
        )}
      >
        {user && (
          <div
            className={mergeNames(
              STYLES.flexCenter,
              "flex-col items-center text-white"
            )}
          >
            <Image
              // src={user?.image}
              src={
                JSON.parse(user)?.profileImg ??
                "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png"
              }
              alt="user image"
              className="w-[100px] aspect-square rounded-full bg-gray-400 object-cover mt-10"
            />
            <h2 className="text-[22px] mt-2 font-bold">
              {JSON.parse(user)?.username}
            </h2>
            <h2 className="text-[14px] font-semibold">
              {JSON.parse(user)?.email}
            </h2>
          </div>
        )}
      </div>
      <div className="flex flex-col p-4 text-center bg-white rounded-t-2xl">
        <div className="grid grid-cols-2 gap-4 py-3">
          {drawerItem.map((d, i) => {
            return (
              <DownLink
                key={i}
                icon={d.icon}
                onClick={() =>
                  router.push(
                    { pathname: "/account", query: { tab: `${d.href}` } },
                    null,
                    { shallow: true }
                  )
                }
                text={d.text}
              />
            );
          })}
        </div>
        <div className="w-full h-[1px] mt-[50px] mb-4 bg-gray-200 inline-block" />
        <div className="flex flex-col space-y-2 ">
          <Feedback />
          <button
            onClick={logout}
            className="py-2 font-semibold text-white rounded-md bg-mainBlossom hover:bg-red-500 "
          >
            Гарах
          </button>
        </div>
      </div>
    </DrawerBody>
  );
};

const DownLink = ({ href, text, className, icon, onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      className={mergeNames(
        "px-5 py-4 transition-all ease-in-out border-2 rounded-lg h-[100px] group hover:bg-gray-100 text-mainBlossom text-bold",
        STYLES.flexCenter,
        "flex-col items-center"
      )}
    >
      {text && text?.length > 0 ? (
        <>
          <p className="text-[30px] mb-2">{icon}</p>
          <Text className="font-semibold">{text}</Text>
        </>
      ) : (
        ""
      )}
    </button>
  );
};

const UserDrawer = () => {
  const router = useRouter();
  const [active, setActive] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const handleClick = () => {
    setActive(!current);
  };
  return (
    <div className="relative">
      <UserIcon
        text="Профайл"
        // onClick={handleClick}

        onClick={onOpen}
        active={active}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent className="bg-transparent">
          <DrawerCloseButton className="text-white" />

          <BodyDrawer />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default UserDrawer;
