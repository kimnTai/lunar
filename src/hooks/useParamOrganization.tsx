import { useParams } from "react-router";
import { selectOrganization } from "@/redux/organizationSlice";
import { useAppSelector } from "./";

export const useParamOrganization = () => {
  const organizationId = useParams().workSpaceId;

  return useAppSelector(selectOrganization).find(
    ({ _id }) => organizationId && _id === organizationId
  );
};
