import { Fade, Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "100vh",
};

const slideImages = [
  {
    url: "/slides/slide1.jpg",
    caption: "Helping join!",
    subtitle: "Sonrisas a quien más lo necesita",
  },
  {
    url: "/slides/slide2.jpg",
    caption: "Helping join!",
    subtitle:
      "Conecta con organizaciones de beneficencia y ayuda a los que más lo necesitan",
  },
  {
    url: "/slides/slide3.jpg",
    caption: "Helping join!",
    subtitle: "Participa en eventos y actividades de beneficencia",
  },
  {
    url: "/slides/slide4.jpg",
    caption: "Helping join!",
    subtitle: "Conoce a personas que comparten tus mismos intereses",
  },
];

interface SlideshowProps {
  objetivoRef: React.RefObject<HTMLDivElement>;
}

const Slideshow = (props: SlideshowProps) => {
  const navigate = useNavigate();

  return (
    <Box>
      <div className="slide-container">
        <Fade>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <div
                style={{
                  ...divStyle,
                  backgroundImage: `url(${slideImage.url})`,
                }}
              >
                <Box
                  backgroundColor={"#00000066"}
                  flex={1}
                  width={"100vw"}
                  height={"100vh"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Text fontSize="6xl" fontWeight="bold" color="white">
                      {slideImage.caption}
                    </Text>
                    <Text fontSize="3xl" fontWeight="bold" color="white" my={4}>
                      {slideImage.subtitle}
                    </Text>
                    <HStack spacing={4} mt={4}>
                      <Button
                        colorScheme="orange"
                        size="lg"
                        onClick={() => navigate("/signin")}
                      >
                        Comenzar
                      </Button>
                      <Button
                        color="white"
                        _hover={{ color: "white" }}
                        size="lg"
                        variant="outline"
                        onClick={() =>
                          props.objetivoRef.current?.scrollIntoView({
                            behavior: "smooth",
                          })
                        }
                      >
                        Conoce más
                      </Button>
                    </HStack>
                  </Box>
                </Box>
                {/* <span style={spanStyle}>{slideImage.caption}</span> */}
              </div>
            </div>
          ))}
        </Fade>
      </div>
    </Box>
  );
};

export default Slideshow;
