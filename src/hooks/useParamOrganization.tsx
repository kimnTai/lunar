import { useParams } from "react-router";
import { useAppSelector } from "./useAppSelector";
import { selectOrganization } from "@/redux/organizationSlice";

export const useParamOrganization = () => {
  const organizationId = useParams().workSpaceId;

  return useAppSelector(selectOrganization).find(
    ({ _id }) => organizationId && _id === organizationId
  );
};
