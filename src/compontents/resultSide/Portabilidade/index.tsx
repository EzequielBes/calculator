import { useInbursaContextHook } from "@/Context/InbursaContext";
import { FormatedNumber } from "@/utils/formatNumbersFunction/formatNumbers";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  color,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import qualiconsi from '../../../../public/qualiconsi.png'

export const Portabilidade = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)"); 
  const { inbursatax } = useInbursaContextHook();
  const [ordenedList, setOrdenedList] = useState<any[]>([]); 
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();


  useEffect(() => {
    if (inbursatax) { 
      const inbursa = inbursatax?.InbursaResponse;
      const pagbank = inbursatax?.PagBankResponse;
      const c6 = inbursatax?.C6Response;

      const allbank = [inbursa, pagbank, c6].filter(Boolean); 

      const formattedData: any[] = [];
      allbank.forEach((element: any) => {
        const tax = element.taxas || [];
        for (let i = 0; i < tax.length; i++) {
          const obj = {
            nameBank: element.nameBank,
            tax: tax[i],
            pmt: element.pmt[i],
            parcelaAtual: element.parcelaAtual,
            parcelaRestante: element.parcelaRestante,
            saldoDevedor: element.SaldoDevedor
          };
          formattedData.push(obj);
        }
      });

      formattedData.sort((a, b) => a.tax - b.tax); 

      setOrdenedList(formattedData);
      console.log('this', formattedData)
    }
  }, [inbursatax]);

  const getRowColor = (nameBank: string) => {
    switch (nameBank) {
      case "Pagbank": return "green";
      case "Inbursa": return "purple";
      case "C6": return "black";
      default: return color;
    }
  };

  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  const handleBankSelect = (bank: string | null) => {
    setSelectedBank(bank);
  };

  const handleRowClick = (row: any) => {
    setSelectedRow(row);
    onOpen();
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  return (
    <Flex flex={2} flexDir={"column"} bg={"#98ABEE"} color={"white"} p={4}>
      <Box>Portabilidade</Box>
      <Flex>
        <List display={"flex"} gap={5} w={"100%"} justifyContent={"center"}>
          <ListItem
            color={!selectedBank ? "blue.400" : "white"}
            cursor="pointer"
            onClick={() => handleBankSelect(null)}
          >
            Todos
          </ListItem>
          <ListItem
            color={selectedBank === "Inbursa" ? "purple" : "white"}
            cursor="pointer"
            onClick={() => handleBankSelect("Inbursa")}
          >
            Inbursa
          </ListItem>
          <ListItem
            color={selectedBank === "Pagbank" ? "green.400" : "white"}
            cursor="pointer"
            onClick={() => handleBankSelect("Pagbank")}
          >
            Pagbank
          </ListItem>
          <ListItem
            color={selectedBank === "C6" ? "black" : "white"}
            cursor="pointer"
            onClick={() => handleBankSelect("C6")}
          >
            C6
          </ListItem>
        </List>
      </Flex>
      <Table
        variant="simple"
        mt={4}
        borderRadius={5}
        bg={"white"}
        color={"#201658"}
        shadow={"md"}
      >
        <Thead>
          <Tr>
            <Th color={"white"} bg={"#201658"}>
              Bancos
            </Th>
            <Th color={"white"} bg={"#201658"}>
              Nova taxa
            </Th>
            <Th color={"white"} bg={"#201658"}>
              Nova parcela
            </Th>
            <Th color={"white"} bg={"#201658"}>
              Economia Mensal Cliente
            </Th>
            <Th color={"white"} bg={"#201658"}>
              Economia Total periodo
            </Th>
          </Tr>
        </Thead>
        {inbursatax?.InbursaResponse.pmt[0] > 0 &&
        <Tbody>
          {ordenedList!.map((item, index) => (
            <Tr
              key={index}
              cursor="pointer"
              onClick={() => handleRowClick(item)}
            >
              <Td>{item.nameBank}</Td>
              <Td>{item.tax}</Td>
              <Td>{item.pmt}</Td>
              <Td>{FormatedNumber(item.parcelaAtual - item.pmt)}</Td>
              <Td>{FormatedNumber((item.parcelaAtual - item.pmt) * item.parcelaRestante )}</Td>
            </Tr>
          ))}
        </Tbody>
        }
      </Table>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent
          borderRadius={"14px"}
          boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
          bgGradient="linear(to-r, #87CEEB ,#1E90FF )"
        >
          <Box
            borderRadius={"14px"}
            bgGradient="linear(to-r, #87CEEB ,#1E90FF )"
          >
            <ModalHeader
              fontSize="2xl"
              fontWeight="bold"
              color="cyan.500"
              textAlign="center"
            >
              <Box w={"200px"} h={"100px"} mx="left" mb={10}>
                <Image src={qualiconsi} alt="Logo" width={10} height={10} />
              </Box>
              <Text color={"blue.800"}>Detalhes da Parcela</Text>
            </ModalHeader>
            <ModalCloseButton color="gray.500" />
            <ModalBody>
              <Grid templateColumns={'gridColumns'} gap={6}>
                <GridItem>
                  <VStack alignItems="flex-start">
                    <Text fontSize="lg" fontWeight="bold">
                      Contrato Atual
                    </Text>
                    <Text fontSize="lg">{selectedRow?.parcelaAtual}</Text>
                    <Text fontSize="lg" fontWeight="bold">
                      Parcela Atual
                    </Text>
                    <Text fontSize="lg">{(selectedRow?.parcelaAtual)}</Text>
                    <Text fontSize="lg" fontWeight="bold">
                      Saldo Devedor
                    </Text>
                    <Text fontSize="lg">{(selectedRow?.saldoDevedor)}</Text>
                    <Text fontSize="lg" fontWeight="bold">
                      Saldo Devedor Aprox.
                    </Text>
                    <Text fontSize="lg">{(selectedRow?.saldoDevedor)}</Text>
                  </VStack>
                </GridItem>
                <GridItem>
                  <VStack alignItems="flex-start">
                    <Text fontSize="lg" fontWeight="bold">
                      Nova Taxa
                    </Text>
                    <Text fontSize="lg">{selectedRow?.tax}</Text>
                    <Text fontSize="lg" fontWeight="bold">
                      Nova Parcela
                    </Text>
                    <Text fontSize="lg">{(selectedRow?.pmt)}</Text>
                    <Text fontSize="lg" fontWeight="bold">
                      Parcela restante:
                    </Text>
                    <Text fontSize="lg">{selectedRow?.parcelaRestante}</Text>
                  </VStack>
                </GridItem>
                <GridItem>
                  <VStack alignItems="flex-start">
                    <Text fontSize="lg" fontWeight="bold">
                      Economia do cliente
                    </Text>
                    <Text fontSize="lg" fontWeight="bold">
                      Economia Mensal:
                    </Text>
                    <Text fontSize="lg" color={"#fff"} fontWeight={"bold"}>
                      R${" "}
                      {(
                        (selectedRow?.parcelaAtual - selectedRow?.pmt).toFixed(2)
                      )}
                    </Text>
                    <Text fontSize="lg" fontWeight="bold">
                      Economia Total:
                    </Text>
                    <Text fontSize="lg" color={"#fff"} fontWeight={"bold"}>
                      R${" "}
                      {(
                        (
                          (selectedRow?.parcelaAtual - selectedRow?.pmt) *
                          selectedRow?.parcelaRestante
                        ).toFixed(2)
                      )}
                    </Text>
                  </VStack>
                </GridItem>
              </Grid>
            </ModalBody>
            <ModalFooter justifyContent="center">
              <Flex></Flex>
             

              <Button
                ml={4}
                bg="gray.500"
                _hover={{ bg: "gray.600" }}
                onClick={handleModalClose}
               
                size="lg"
              >
                Fechar
              </Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
