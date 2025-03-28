import { Avatar, Box, Flex, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SuggestedUser = ({ user }) => {
	return (
		<Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
			<Flex alignItems={"center"} gap={2}>
				<Link to={`/${user.username}`}>
					<Avatar src={user.profilePicURL} size={"md"} />
				</Link>
				<VStack spacing={2} alignItems={"flex-start"}>
					<Link to={`/${user.username}`}>
						<Box fontSize={12} fontWeight={"bold"}>
							{user.fullName}
						</Box>
					</Link>
				</VStack>
			</Flex>
		</Flex>
	);
};

export default SuggestedUser;