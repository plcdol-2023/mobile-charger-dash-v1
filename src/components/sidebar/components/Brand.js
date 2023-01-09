import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Text } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align="center" direction="column">
      {/* <HorizonLogo h="26px" w="175px" my="32px" color={logoColor} /> */}
      <Flex align="flex-start" direction="row" justify="center" mb="20px">
        <img
          src={process.env.PUBLIC_URL + "logo.png"}
          alt="logo"
          width="70px"
          height="70px"
        />
      </Flex>
        <Text
        color={logoColor}
        fontSize="20px"
        fontWeight="700"
        fontFamily="NotoSansKR"
        >
          Car Management System
        </Text>
        <Text
          color={logoColor}
          fontSize="15px"
          fontWeight="400"
          fontFamily="NotoSansKR"
          mb="15px"
          >
          2023 KNU Mobility Ornament
          </Text>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
