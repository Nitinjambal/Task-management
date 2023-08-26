import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/AppContextProvider";
import Loader from "../components/Loader";

import { Navigate } from "react-router-dom";

import { Card, CardBody,Stack,Heading,Text} from "@chakra-ui/react";

function Profile() {
  const { user,  isAuth,loading } = useContext(AppContext);

  if (!isAuth) return <Navigate to="/login" />;

  return loading ? (
    <Loader />
  ) : (
    <Card maxW="sm" m="auto" p={"2rem"} mt={"2rem"}>
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md">{user?.name}</Heading>

          <Text color="blue.600" fontSize="2xl">
            {user?.email}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default Profile;
