// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  CircularProgress,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import CarStatus from "./components/CarStatus";

//mongo configuration
import { app, credentials } from "util/mongoConfig";

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  // Set state variables
  const [user, setUser] = useState();
  const [events, setEvents] = useState({});
  const [parkingStatus, setParkingStatus] = useState([]);
  const [loading, setLoading] = useState(false);

  // This useEffect hook will run only once when the page is loaded : load DB data once
  useEffect(() => {
    const login = async () => {
      const loginUser = await app.logIn(credentials);

      // Connect to the database
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("parking").collection("status");
      const status = await collection.find({});
      setParkingStatus(status);
      console.log("parking status updated");

      setUser(() => loginUser);
      console.log("login complete, subscribing to events");
      // Everytime a change happens in the stream, add it to the list of events
      for await (const change of collection.watch()) {
        setEvents(() => change);
      }
    };
    login();
    return () => {};
  }, []);

  //DB events handler
  useEffect(() => {
    if (events.operationType === "update") {
      const locationNum = events.fullDocument.location - 1;
      let newParkingStatus = [...parkingStatus];
      newParkingStatus[locationNum] = events.fullDocument;
      setParkingStatus(() => [...newParkingStatus]);
      timer(200).then(() => {
        setLoading(false);
      });
    }
    return () => {
      setLoading(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  return (
    <>
      {!user && (
        <Flex
          justify="center"
          flexDirection="column"
          align="center"
          w="100%"
          h="100vh"
        >
          <CircularProgress isIndeterminate />
          <Text fontWeight={700} fontSize={30} mt={30}>
            "로딩 중.."
          </Text>
        </Flex>
      )}
      {user && (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
          {/* 최상단 버튼 */}
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
            gap="20px"
            mb="20px"
          >
            <MiniStatistics
              startContent={
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
              }
              name="수입"
              value="$350.4"
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdAttachMoney}
                      color={brandColor}
                    />
                  }
                />
              }
              name="지출"
              value="$642.39"
            />
            <MiniStatistics growth="+23%" name="수익" value="$574.34" />
            <MiniStatistics
              endContent={
                <Flex me="-16px" mt="10px">
                  <FormLabel htmlFor="balance">
                    <Avatar src={Usa} />
                  </FormLabel>
                  <Select
                    id="balance\\"
                    variant="mini"
                    mt="5px"
                    me="0px"
                    defaultValue="usd"
                  >
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="gba">GBA</option>
                  </Select>
                </Flex>
              }
              name="정산 금액"
              value="$2,531"
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
                  icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
                />
              }
              name="New Tasks"
              value="154"
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdFileCopy}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Total Projects"
              value="2935"
            />
          </SimpleGrid>
          {/* 작업차트 */}
          <SimpleGrid
            columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 2, "2xl": 3 }}
            gap="20px"
            mb="20px"
          >
            <CarStatus
              user={user}
              parkingStatus={parkingStatus}
              loading={loading}
            />
          </SimpleGrid>
          {/* 차트 */}
          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
            <TotalSpent />
            <WeeklyRevenue />
          </SimpleGrid>
          {/* 체크박스, 테이블 */}
          <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
            <CheckTable
              columnsData={columnsDataCheck}
              tableData={tableDataCheck}
            />
            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
              <DailyTraffic />
              <PieCard />
            </SimpleGrid>
          </SimpleGrid>
          {/* 테이블 달력 */}
          <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
            <ComplexTable
              columnsData={columnsDataComplex}
              tableData={tableDataComplex}
            />
            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
              <Tasks />
              <MiniCalendar h="100%" minW="100%" selectRange={false} />
            </SimpleGrid>
          </SimpleGrid>
        </Box>
      )}
    </>
  );
}
