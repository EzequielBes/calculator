import Image from "next/image";
import { Inter } from "next/font/google";
import { Box, Button, Flex } from "@chakra-ui/react";
import qualiconsig from "../../public/qualiconsig.jpg";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Flex h={"100vh"} bg={"blue.600"} align={"center"}>
      <Box position={"absolute"}>
        <Image
          alt="fundo"
          src={qualiconsig}
          style={{
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100vw",
          }}
        />
      </Box>
      <Flex margin={"0 auto"} mt={60} gap={10} zIndex={999}>
        <Button bg={'blue.500'} border={0} p={2} h={20} w={40} transition={'all ease 0.4s'} _hover={{
          background: 'blue.600',
          color:'gray.700'
        }}>
          <Link href={'/calculator'}>Calculadora</Link>
        </Button>
      </Flex>
    </Flex>
    </>
  );
}
