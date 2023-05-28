import { useParams } from "react-router";
import { useAppSelector } from "./useAppSelector";

export const useParamOrganization = () => {
  const organizationId = useParams().workSpaceId;

  return useAppSelector((state) => state.user.organization).find(
    ({ _id }) => organizationId && _id === organizationId
  );
};
