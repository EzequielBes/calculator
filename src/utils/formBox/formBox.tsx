import { Box, Flex, Grid } from "@chakra-ui/react"

export const FormBox = ({children}:any) => {

    return (
        <Grid
            templateColumns="repeat(2, 1fr)" 
            gap={4} 
            p={4} 
    >
      {children}
    </Grid>
    )
}