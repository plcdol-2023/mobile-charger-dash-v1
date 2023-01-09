import React from 'react';
import Card from 'components/card/Card';
import {
  Box,
  Button,
  Progress,
  ProgressLabel,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

// Custom components
import IconBox from 'components/icons/IconBox';

import MiniStatistics from 'components/card/MiniStatistics';

import LineChart from 'components/charts/LineChart';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdBarChart, MdOutlineCalendarToday } from 'react-icons/md';
// Assets
import { RiArrowUpSFill } from 'react-icons/ri';
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from 'variables/charts';
const CarStatus = () => {
  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white');

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const iconColor = useColorModeValue('brand.500', 'white');
  const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const bgHover = useColorModeValue(
    { bg: 'secondaryGray.400' },
    { bg: 'whiteAlpha.50' }
  );
  const bgFocus = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.100' }
  );

  const garageList = ['1번차고', '2번차고', '3번차고'];
  return (
    <>
      {garageList.map((garage, index) => {
        return (
          <Card
            justifyContent="flex-start"
            align="flex-start"
            direction="column"
            w="100%"
            h="50vh"
            mb="0px"
            key={index}
          >
            {/* 상단 아이콘 버튼 */}
            <Flex justify="space-between" ps="0px" pe="20px" pt="5px">
              <Flex align="center" w="100%">
                <Button
                  bg={boxBg}
                  fontSize="sm"
                  fontWeight="500"
                  color={textColorSecondary}
                  borderRadius="7px"
                >
                  <Icon
                    as={MdOutlineCalendarToday}
                    color={textColorSecondary}
                    me="4px"
                  />
                  This month
                </Button>
                <Button
                  ms="auto"
                  align="center"
                  justifyContent="center"
                  bg={bgButton}
                  _hover={bgHover}
                  _focus={bgFocus}
                  _active={bgFocus}
                  w="37px"
                  h="37px"
                  lineHeight="100%"
                  borderRadius="10px"
                >
                  <Icon as={MdBarChart} color={iconColor} w="24px" h="24px" />
                </Button>
              </Flex>
            </Flex>

            {/* 제목 컴포넌트*/}
            <Flex flexDirection="column" justify="center" px="10px" py="25px">
              {/* 제목 */}
              <Flex flexDirection="row" justify="center" me="20px">
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdBarChart}
                      color={brandColor}
                    />
                  }
                />

                <Text
                  color={textColor}
                  fontSize="34px"
                  fontWeight="700"
                  lineHeight="100%"
                  ml="10px"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {garage}
                </Text>
              </Flex>
              {/* ontrack */}
              <Flex align="center" justify="center" mt="10px">
                <Icon as={IoCheckmarkCircle} color="green.500" me="4px" />
                <Text color="green.500" fontSize="md" fontWeight="700">
                  On track
                </Text>
              </Flex>
            </Flex>
            {/* 내용 */}
            <Flex w="100%" flexDirection={{ base: 'column', lg: 'column' }}>
              <Text
                color={textColor}
                fontSize="20px"
                fontWeight="500"
                lineHeight="100%"
                textAlign="left"
                ml="10px" // 좌측 margin
                // mr="20px" // 우측 margin
                // mt="20px" // 위 margin
                // mb="20px" // 아래 margin
                // mx="20px" // 좌우 margin
                my="20px" // 상하 margin
              >
                - 차량번호 :
              </Text>
              <Text
                color={textColor}
                fontSize="20px"
                fontWeight="500"
                lineHeight="100%"
                textAlign="left"
                ml="10px" // 좌측 margin
                my="20px" // 상하 margin
              >
                - 배터리 충전 상태 :
              </Text>

              <Progress
                variant="table"
                colorScheme="brandScheme"
                h="24px"
                w="90%"
                mx="5%"
                value={75}
                hasStripe
                isAnimated
                max={100}
                min={0}
              >
                <ProgressLabel fontSize={15} py="4px">
                  75%
                </ProgressLabel>
              </Progress>

              <Text
                color={textColor}
                fontSize="20px"
                fontWeight="500"
                lineHeight="100%"
                textAlign="left"
                ml="10px" // 좌측 margin
                my="20px" // 상하 margin
              >
                - 최종검사시간 :
              </Text>
            </Flex>
          </Card>
        );
      })}
    </>
  );
};

export default CarStatus;
