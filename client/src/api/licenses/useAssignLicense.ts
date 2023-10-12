import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "..";
import { AssignLicenseRequest } from "../generated";
import { LICENSES_QUERY_KEY } from "./const";

const useAssignLicense = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (params: AssignLicenseRequest) =>
      apiClient.licensesApi.licensesControllerAssign(params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([LICENSES_QUERY_KEY]);
      },
    }
  );
};

export { useAssignLicense };
