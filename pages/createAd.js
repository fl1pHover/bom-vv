import React, { useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

import { useAuth } from "context/auth";
import { API_URL } from "@/constants/api";
import { categories as localCategories } from "@/data/categories";

import Step1 from "@/components/createAd/step1";
import Step2 from "@/components/createAd/step2";
import Step3 from "@/components/createAd/step3";
import Step4 from "@/components/createAd/step4";

import { ContainerX } from "@/lib/Container";
import FormTitle from "@/components/createAd/title";
import StepButtons from "@/components/createAd/stepButtons";
import StepProgress from "@/components/createAd/stepProgress";

export default function CreateAd({ categories }) {
  const toast = useToast();
  const { districts, locations, token } = useAuth(); // TODOs: user: 403 BAD REQUEST

  const router = useRouter();
  // // if (!user) router.push("/login");

  const [step, setStep] = useState(-1);
  const passcategory = useMemo(
    () => (categories?.length > 0 ? categories : localCategories),
    [categories]
  );

  //  STEP 1 DATA => HURUHNGIIN TURUL, DED TURUL, ZARIIN TURUL, ZARAH TURUL
  const [types, setTypes] = useState({
    categoryId: false,
    categoryName: false,
    subCategoryId: false,
    sellType: false,
    adType: false,
  });
  // STEP-2 DATA => ID HADGALJ BAIGAA
  const [positions, setPositions] = useState({
    district_id: "",
    committee_id: "",
    location_id: "",
    town_id: "",
  });
  // STEP2 DATA => NAME (NER) HADGALJ BAIGA
  const [positionNames, setPositionNames] = useState({
    district: "",
    location: "",
    committee: "",
    town: "",
  });
  // FILTER INFORMATION - FOR WHICH DATA TO DISPLAY
  const [filters, setFilters] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  // STEP3 IIN DATA - PRICE, AREA, UNITPRICE, TITLE, DESC, IMAGE
  const [generalData, setGeneralData] = useState({
    price: false,
    area: false,
    unitPrice: false,
    title: false,
    desc: false,
    imgSelected: false,
    images: [],
  });
  // STEP 3IIN RAW IMAGE FILES
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  // THIS EFFECT IS FOR FETCHING FILTER DATA FOR STEP2,STEP3,STEP4
  React.useEffect(() => {
    console.log("CALLING FILTER FUNCTION...");
    if (types.categoryName && types.subCategoryId) {
      try {
        passcategory[types.categoryId].subCategory.filter((item) => {
          if (item.href == types.subCategoryId) {
            axios
              .get(`${API_URL}/category/filters/{id}/false?id=${item._id}`)
              .then((res) => {
                setSubCategory(res.data?.subCategory);
                setFilters(res.data?.filters);
              });
          }
        });
      } catch (e) {
        console.log(e);
      }
    } else {
    }
  }, [passcategory, types.categoryId, types.subCategoryId, types.categoryName]);

  // checking validation of steps in here
  const handleNextStep = () => {
    if (step === -1)
      return checkConditionOnNextStep(
        types?.categoryName &&
          types?.subCategoryId &&
          types?.sellType &&
          types?.adType
      );
    if (step === 0) return validateStep2();
    if (step === 1)
      return checkConditionOnNextStep(
        generalData.price &&
          generalData.area &&
          generalData.unitPrice &&
          generalData.title &&
          generalData.desc &&
          generalData.imgSelected
      );
    if (step === 4) return validateStep4();
  };

  const checkConditionOnNextStep = (booleanValue) => {
    return booleanValue
      ? setStep((prev) => prev + 1)
      : toast({
          title: "Та бүх талбарыг бөглөнө үү.",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
  };

  const validateStep2 = () => {
    // CHECKING IF IT IS REALSTATE => IT HAS FOUR STEPS
    if (types?.categoryName === "realState") {
      // console.table(positions);
      // THIS CONDITION IS FOR WHETHER IT HAS TOWN_ID -> LAND & OFFICE DEER XOTXOH NII ID GEJ BAIHGUI
      const hasTownId =
        types?.subCategoryId !== "land" && types?.subCategoryId !== "office";

      const mainValidation =
        positions?.location_id &&
        positions?.district_id &&
        positions?.committee_id;

      if (hasTownId)
        return checkConditionOnNextStep(mainValidation && positions?.town_id);
      return checkConditionOnNextStep(mainValidation);
    } else {
      // TODOs: IF IT IS NOT REALSTATE -> MEANING IT HAS 3 STEPS
    }
  };
  const validateStep4 = () => {};

  const handlePrevStep = () => {
    setStep((prev) => {
      return prev > -1 ? prev - 1 : prev;
    });
  };


  // console.log("filters", filters);
  // console.log("subCategory", subCategory);
  // console.log("positions", positions);
  // console.table(types);
  // console.log("images", images);
  // console.table(generalData);

  return (
    <div className="min-h-[80vh] py-10">
      <ContainerX>
        <StepProgress
          activeStep={step}
          handleClick={(stepId) => setStep(stepId)}
          hasFourStep={types?.categoryName === "realState"}
        />
        {
          // STEP1 TYPES: CATEGORY, SUBCATEGORY, ADTYPE, SELLTYPE
          step === -1 && (
            <Step1 {...{ types, setTypes }} categories={passcategory} />
          )
        }

        {filters?.map((filter, index) => {
          if (step == index) {
            if (index == 0)
              //STEP2: LOCATIONS - DISTRICT, LOCATION, COMMITTEE, TOWN
              return (
                <Step2
                  key={index}
                  {...{
                    types,
                    districts,
                    locations,
                    positions,
                    setPositions,
                    positionNames,
                    setPositionNames,
                  }}
                />
              );
            if (index == 1)
              return (
                <Step3
                  key={index}
                  filter={filter}
                  images={images}
                  setImages={setImages}
                  generalData={generalData}
                  setGeneralData={setGeneralData}
                />
              );
            if (index == 2)
              return (
                <div key={index}>
                  <FormTitle>Дэлгэрэнгүй мэдээлэл</FormTitle>
                  <div className="bg-white min-h-[40vh] rounded-xl py-10 md:px-10 px-2">
                    <Step4 filter={filter} />
                  </div>
                </div>
              );
          }
        })}

        <StepButtons onNext={handleNextStep} onPrev={handlePrevStep} />
      </ContainerX>
    </div>
  );
  // router.push("/login");
}
export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/category`);
  const resjson = await res.json();

  const categories = resjson?.categories;
  return {
    props: { categories },
  };
}
