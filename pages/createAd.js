import {
     Box,
     Center,
     Divider,
     Grid,
     GridItem,
     HStack,
     Input,
     Select,
     Text,
     Textarea,
     VStack,
} from "@chakra-ui/react";
import { useState } from "react";

import MainContainer from "../layout/mainContainer";

const categories = [
     {
          category: "Үл хөдлөх хөрөнгө",
          categories: [
               {
                    category: "Газар",
                    filters: [
                         "Зарын гарчиг... 100 тэмдэгтэд багтаан бичнэ үү. ",
                         "Газрын зориулалт",
                         "Эзэмшлийн хэлбэр",
                         "Утас",
                         "Үнэ",
                         "Талбай",
                         "Нэгж талбайн үнэ",
                         "Дүүрэг",
                         "Хороо",
                         "Байршил",
                         "Гэрчилгээ олгосон он",
                         "Хүчинтэй хугацаа (жил)",
                         "Бартер",
                         "Төлбөрийн нөхцөл",
                         "Газрын зурагт байршил сонго",
                         "Хөрөнгийн зураг",
                         "Кадастрын зураг",
                         "Зарын дэлгэрэнгүй... 10000 тэмдэгтэд багтаан бичнэ үү.",
                    ],
               },
               {
                    category: "Оффис",

                    filters: [
                         "Зарын гарчиг... 100 тэмдэгтэд багтаан бичнэ үү. ",
                         "Утас",
                         "Үнэ",
                         "Талбай",
                         "Нэгж талбайн үнэ",
                         "Дүүрэг",
                         "Хороо",
                         "Байршил",
                         "Оффисын нэр",
                         "Ашиглалтад орсон он",
                         "Барилгын давхар",
                         "Хэдэн давхарт",
                         "Бартер",
                         "Төлбөрийн нөхцөл",
                         "Газрын зурагт байршил сонго",
                         "Хөрөнгийн зураг",
                         "План зураг",
                         "Зарын дэлгэрэнгүй... 10000 тэмдэгтэд багтаан бичнэ үү.",
                    ],
               },
          ],
     },
     {
          category: "Үл хөдлөх хөрөнгө",
          categories: [{ category: "Газар" }, { category: "Оффис" }],
     },
];
const types = ["Зарах"];

export default function CreateAd() {
     const [type, setType] = useState("");
     const [category, setCategory] = useState("");
     const [subCategory, setSubCategory] = useState("");

     return (
          <Box as="section" m={5} id="add__ad">
               <MainContainer>
                    <Box bgColor={"white"} p={10} rounded={10}>
                         <Box
                              display={"grid"}
                              gridTemplateColumns={"repeat(3,1fr)"}
                              gap={10}
                         >
                              <HStack>
                                   <Text width={"100%"}>
                                        Зарах хөрөнгийн төрөл
                                   </Text>
                                   <Select
                                        placeholder="Сонгох"
                                        onChange={(e) =>
                                             setCategory(e.target.value)
                                        }
                                        value={category}
                                   >
                                        {categories.map((c, i) => {
                                             return (
                                                  <option
                                                       value={`${i}`}
                                                       key={i}
                                                  >
                                                       {c.category}
                                                  </option>
                                             );
                                        })}
                                   </Select>
                              </HStack>
                              <HStack>
                                   <Text width={"100%"}>Борлуулах төрөл</Text>
                                   <Select
                                        placeholder="Сонгох"
                                        onChange={(e) =>
                                             setType(e.target.value)
                                        }
                                        value={type}
                                   >
                                        {types.map((t, i) => {
                                             return (
                                                  <option value={t} key={i}>
                                                       {t}
                                                  </option>
                                             );
                                        })}
                                   </Select>
                              </HStack>
                              <HStack>
                                   {category != "" && (
                                        <>
                                             <Text width={"100%"}>
                                                  Хөрөнгийн дэд төрөл
                                             </Text>
                                             <Select
                                                  placeholder="Сонгох"
                                                  onChange={(e) =>
                                                       setSubCategory(
                                                            e.target.value
                                                       )
                                                  }
                                                  value={subCategory}
                                             >
                                                  {categories[category] !==
                                                       undefined &&
                                                       categories[
                                                            category
                                                       ].categories.map(
                                                            (c, i) => {
                                                                 return (
                                                                      <option
                                                                           key={
                                                                                i
                                                                           }
                                                                           value={`${i}`}
                                                                      >
                                                                           {
                                                                                c.category
                                                                           }
                                                                      </option>
                                                                 );
                                                            }
                                                       )}
                                             </Select>
                                        </>
                                   )}
                              </HStack>
                         </Box>
                         <VStack gap={5} mt={10}>
                              {category != "" &&
                                   subCategory != "" &&
                                   categories[category].categories[
                                        subCategory
                                   ].filters.map((f, i) => {
                                        console.log(
                                             categories[category].categories[
                                                  subCategory
                                             ].filters.length
                                        );
                                        return (
                                             <>
                                                  {i == 0 && (
                                                       <Textarea
                                                            placeholder={f}
                                                            type="textarea"
                                                            height="100px"
                                                            whiteSpace={
                                                                 "nowrap"
                                                            }
                                                       />
                                                  )}
                                                  {i ==
                                                       categories[category]
                                                            .categories[
                                                            subCategory
                                                       ].filters.length -
                                                            1 && (
                                                       <Input placeholder={f} />
                                                  )}
                                                  {i ==
                                                       categories[category]
                                                            .categories[
                                                            subCategory
                                                       ].filters.length -
                                                            3 && (
                                                       <Center>
                                                            <Input
                                                                 type={"file"}
                                                                 height="100px"
                                                            />
                                                       </Center>
                                                  )}
                                                  {i ==
                                                       categories[category]
                                                            .categories[
                                                            subCategory
                                                       ].filters.length -
                                                            3 && (
                                                       <Input type={"file"} />
                                                  )}
                                                  <Grid
                                                       templateColumns={
                                                            "repeat(2,1fr)"
                                                       }
                                                  >
                                                       <GridItem>
                                                            {i != 0 &&
                                                                 i !=
                                                                      categories[
                                                                           category
                                                                      ]
                                                                           .categories[
                                                                           subCategory
                                                                      ].filters
                                                                           .length -
                                                                           1 &&
                                                                 i !=
                                                                      categories[
                                                                           category
                                                                      ]
                                                                           .categories[
                                                                           subCategory
                                                                      ].filters
                                                                           .length -
                                                                           2 &&
                                                                 i !=
                                                                      categories[
                                                                           category
                                                                      ]
                                                                           .categories[
                                                                           subCategory
                                                                      ].filters
                                                                           .length -
                                                                           3 &&
                                                                 categories[
                                                                      category
                                                                 ].categories[
                                                                      subCategory
                                                                 ].filters
                                                                      .length -
                                                                      4 && (
                                                                      <Input />
                                                                 )}
                                                       </GridItem>
                                                  </Grid>{" "}
                                                  <Divider />
                                             </>
                                        );
                                   })}
                         </VStack>
                    </Box>
               </MainContainer>
          </Box>
     );
}