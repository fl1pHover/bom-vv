import { AiOutlineCar } from "react-icons/ai";
import { BsBuilding, BsPhone } from "react-icons/bs";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { MdComputer } from "react-icons/md";
import { RiHomeSmile2Line } from "react-icons/ri";

export const SellTypes = {
  sell: {
    id: "sell",
    name: "Зарах",
  },
  rent: {
    id: "rent",
    name: "Түрээслэх",
  },
};

export const AdTypes = {
  default: {
    id: "default",
    name: "Энгийн",
  },
  poster: {
    id: "poster",
    name: "Постер",
  },
  special: {
    id: "special",
    name: "Онцгой",
  },
};

export const Category = {
  realState: "realState",
  vehicle: "vehicle",
  computer: "computer",
  phone: "phone",
  electronics: "electronics",
  householdItems: "householdItems",
};

export const getIconCategory = ({ item }) => {
  switch (item) {
    case Category.realState:
      return <BsBuilding />;
    case Category.vehicle:
      return <AiOutlineCar />;
    case Category.computer:
      return <MdComputer />;
    case Category.phone:
      return <BsPhone />;
    case Category.electronics:
      return <CgSmartHomeWashMachine />;
    case Category.householdItems:
      return <RiHomeSmile2Line />;
  }
};

export const Filters = {
  floor: {
    id: "floor",
    name: "Шал",
  },
  room: {
    id: "room",
    name: "Өрөөний тоо",
  },
  bathroom: {
    id: "bathroom",
    name: "Угаалгын өрөөний тоо",
  },
  masterBedroom: {
    id: "masterBedroom",
    name: "Мастер өрөөний тоо",
  },
  window: {
    id: "window",
    name: "Цонх",
  },
  windowUnit: {
    id: "windowUnit",
    name: "Цонхны тоо",
  },
  door: {
    id: "door",
    name: "Хаалга",
  },
  balconyUnit: {
    id: "balconyUnit",
    name: "Тагтны тоо",
  },
  buildingFloor: {
    id: "buildingFloor",
    name: "Барилгын давхар",
  },
  garage: {
    id: "garage",
    name: "Гараж",
  },
  paymentMethod: {
    id: "paymentMethod",
    name: "Төлбөрийн хэлбэр",
  },
  barter: {
    id: "barter",
    name: "Бартер",
  },
  landLicense: {
    id: "landLicense",
    name: "Газрын эзэмшлийн хэлбэр",
  },
  landUsage: {
    id: "landUsage",
    name: "Газрын зориулалт",
  },
  objectType: {
    id: "objectType",
    name: "Объектын төрөл",
  },
  serviceType: {
    id: "serviceType",
    name: "Үйл ажиллагааны хэлбэр",
  },
  phone: {
    id: "phone",
    name: "Утас",
  },
  price: {
    id: "price",
    name: "Үнэ",
  },
  unitPrice: {
    id: "unitPrice",
    name: "Нэгжийн үнэ",
  },
  area: {
    id: "area",
    name: "Талбай",
  },
  operation: {
    id: "operation",
    name: "Ашиглалтанд орсон он",
  },
  district: {
    id: "district",
    name: "Дүүрэг",
  },
  committee: {
    id: "committee",
    name: "Хороо",
  },
  location: {
    id: "location",
    name: "Байршил",
  },
  town: {
    id: "town",
    name: "Хотхон",
  },
  howFloor: {
    id: "howFloor",
    name: "Хэдэн давхарт",
  },
};
