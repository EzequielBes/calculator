import { RealBalance } from "@/compontents/calculatorSide/saldoReal";
import { Portabilidade } from "@/compontents/resultSide/Portabilidade";
import { Box, Flex, Text } from "@chakra-ui/react";

export default function Calculator () {


    return (
        <Box>
            <Flex flexDir={['column', 'column','column', 'row']}>
                
                <RealBalance/>
                
                <Portabilidade/>
            </Flex>
        </Box>
    )
}