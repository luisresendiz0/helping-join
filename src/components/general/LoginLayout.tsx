import {
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { FunctionComponent, PropsWithChildren } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";

const LoginLayout: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <Grid
      w="100vw"
      h="100vh"
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(12, 1fr)"
    >
      <GridItem colSpan={12} borderBottom="1px solid" borderColor="pink.300">
        <Flex
          direction="row"
          justify="flex-start"
          align="center"
          w="full"
          h="full"
          paddingLeft={4}
        >
          <IconButton aria-label="Open drawer" icon={<HamburgerIcon />} />
          <Heading pl={4}>Helping Join</Heading>
        </Flex>
      </GridItem>
      <GridItem
        rowSpan={11}
        colSpan={6}
        borderRight="1px solid"
        borderColor="pink.300"
        bg="pink.100"
      >
        {/* <Image
          src={pattern}
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
          }}
        /> */}
      </GridItem>
      <GridItem rowSpan={11} colSpan={6} bg="white" p={8}>
        {props.children}
      </GridItem>
    </Grid>
  );
};

export default LoginLayout;
