import React, { Component } from "react";
import { NativeBaseProvider,
		Container,
		Box,
		HStack,
		CheckIcon,
		Text} from "native-base";

export default class Operator extends Component {
  render() {
    return (
	<NativeBaseProvider>
      <Container>
          <Box>
		    <HStack space={2}>
			  <CheckIcon size="5" mt="0.5" color="emerald.500" />
			  <Text color="emerald.500" fontSize="md">
				Welcome to the operator page
			  </Text>
			</HStack>
          </Box>
      </Container>
	</NativeBaseProvider>
    );
  }
}