import { LicensesApi } from "./generated";

const BASE_PATH = window.location.origin;

class ApiClient {
  public licensesApi: LicensesApi;

  constructor() {
    this.licensesApi = new LicensesApi(undefined, BASE_PATH);
  }
}

const apiClient = new ApiClient();

export { apiClient };
