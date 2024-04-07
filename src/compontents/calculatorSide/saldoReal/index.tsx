import { useInbursaContextHook } from "@/Context/InbursaContext";
import { CalculadoraC6, CalculadoraInbursa, CalculadoraPagBank } from "@/compontents/AllBanksCalc/calculated";
import { saldoReal } from "@/types/SaldoReal/saldoReal";
import { BoxInput, TextInput } from "@/utils/formBox/boxInput";
import { FormBox } from "@/utils/formBox/formBox";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const RealBalance = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const {inbursatax, setInbursaTax} = useInbursaContextHook()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const [formData, setFormData] = useState<saldoReal>();

  const onSubmit: SubmitHandler<any> = async (data:saldoReal) => {
    setFormData(data);

  };

  const FormReceived = () => {
    const InbursaResponse = CalculadoraInbursa(formData?.ValorParcelaAtual, formData?.PrazoRestante, formData?.VlEmprestimo)
    const PagBankResponse = CalculadoraPagBank(formData?.ValorParcelaAtual, formData?.PrazoRestante, formData?.VlEmprestimo)
    const C6Response = CalculadoraC6(formData?.ValorParcelaAtual, formData?.PrazoRestante, formData?.VlEmprestimo)
    setInbursaTax({InbursaResponse, PagBankResponse, C6Response})
    
  }

  useEffect(()=> {
    FormReceived()
  },[formData])

  return (
    <Flex
      flexDir={"column"}
      justify={"center"}
      align={"center"}
      flex={1}
      h={isMobile ? "auto" : "100vh"}
      bg={"#F5F5F5"}
      p={4}
    >
      <Box mb={5}>
        <Text fontWeight={"600"} fontSize={["17px"]}>
          Simulação calculadora
        </Text>
        <Text>Preencher dados somente em amarelo</Text>
      </Box>
      <Flex mb={20} justify={"center"} gap={10}>
        <Link href="/saldoReal">
          <Button bg={"#201658"} color={"white"} _hover={{ bg: "#3F3D56" }}>
            Saldo Real
          </Button>
        </Link>
        <Link href="/dadoSistema">
          <Button bg={"#201658"} color={"white"} _hover={{ bg: "#3F3D56" }}>
            Dados Sistema
          </Button>
        </Link>
      </Flex>
      <Box bg={"#FFFFFF"} p={10} borderRadius={10} boxShadow={"md"} w={"100%"}>
        <Flex justify={"center"} align={"center"}>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormBox>
              <BoxInput>
                <TextInput>Valor parcela atual</TextInput>
                <Input
                  bg={"yellow.100"}
                  type="number"
                  placeholder="Valor parcela atual"
                  borderRadius={5}
                  {...register('ValorParcelaAtual')}
                />
              </BoxInput>
              <BoxInput>
                <TextInput>Prazo Restante</TextInput>
                <Input
                  bg={"yellow.100"}
                  type="number"
                  placeholder="Prazo restante"
                  borderRadius={5}
                  {...register('PrazoRestante')}
                />
              </BoxInput>
              <BoxInput>
                <TextInput>Vl emprestimo</TextInput>
                <Input
                  bg={"yellow.100"}
                  type="number"
                  placeholder="Vl emprestimo"
                  borderRadius={5}
                  {...register('VlEmprestimo')}
                />
              </BoxInput>
              <BoxInput>
                <TextInput>Taxa atual</TextInput>
                <Flex
                  justify={"center"}
                  align={"center"}
                  bg={"blue.200"}
                  h={"40px"}
                  borderRadius={5}
                  {...register('TaxaAtual')}
                >
                  taxa
                </Flex>
              </BoxInput>
              <Button type="submit">Calcular</Button>
            </FormBox>
          </form>

        </Flex>
      </Box>
    </Flex>
  );
};
