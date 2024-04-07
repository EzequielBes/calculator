import { Box, Flex, FormControl, Input } from "@chakra-ui/react"

export const DataSystem = () => {

    return (
        <Box>
            <Box>
                <Flex>
                    <FormControl>
                        <Input type="Number" />
                    </FormControl>
                </Flex>
            </Box>
        </Box>
    )
}