/* tslint:disable */
/* eslint-disable */
/**
 * Licenses API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { AssignLicenseRequest } from '../models';
// @ts-ignore
import { LicensesDto } from '../models';
/**
 * LicensesApi - axios parameter creator
 * @export
 */
export const LicensesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {AssignLicenseRequest} assignLicenseRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        licensesControllerAssign: async (assignLicenseRequest: AssignLicenseRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'assignLicenseRequest' is not null or undefined
            assertParamExists('licensesControllerAssign', 'assignLicenseRequest', assignLicenseRequest)
            const localVarPath = `/api/licenses/assign`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(assignLicenseRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} [pageIndex] 
         * @param {number} [pageSize] 
         * @param {string} [search] 
         * @param {string} [sortBy] 
         * @param {string} [lastSeenGe] 
         * @param {string} [lastSeenLe] 
         * @param {Array<string>} [product] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        licensesControllerGetLicenses: async (pageIndex?: number, pageSize?: number, search?: string, sortBy?: string, lastSeenGe?: string, lastSeenLe?: string, product?: Array<string>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/licenses`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (pageIndex !== undefined) {
                localVarQueryParameter['pageIndex'] = pageIndex;
            }

            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }

            if (search !== undefined) {
                localVarQueryParameter['search'] = search;
            }

            if (sortBy !== undefined) {
                localVarQueryParameter['sortBy'] = sortBy;
            }

            if (lastSeenGe !== undefined) {
                localVarQueryParameter['lastSeenGe'] = lastSeenGe;
            }

            if (lastSeenLe !== undefined) {
                localVarQueryParameter['lastSeenLe'] = lastSeenLe;
            }

            if (product) {
                localVarQueryParameter['product'] = product;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * LicensesApi - functional programming interface
 * @export
 */
export const LicensesApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = LicensesApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {AssignLicenseRequest} assignLicenseRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async licensesControllerAssign(assignLicenseRequest: AssignLicenseRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.licensesControllerAssign(assignLicenseRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {number} [pageIndex] 
         * @param {number} [pageSize] 
         * @param {string} [search] 
         * @param {string} [sortBy] 
         * @param {string} [lastSeenGe] 
         * @param {string} [lastSeenLe] 
         * @param {Array<string>} [product] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async licensesControllerGetLicenses(pageIndex?: number, pageSize?: number, search?: string, sortBy?: string, lastSeenGe?: string, lastSeenLe?: string, product?: Array<string>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<LicensesDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.licensesControllerGetLicenses(pageIndex, pageSize, search, sortBy, lastSeenGe, lastSeenLe, product, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * LicensesApi - factory interface
 * @export
 */
export const LicensesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = LicensesApiFp(configuration)
    return {
        /**
         * 
         * @param {AssignLicenseRequest} assignLicenseRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        licensesControllerAssign(assignLicenseRequest: AssignLicenseRequest, options?: any): AxiosPromise<void> {
            return localVarFp.licensesControllerAssign(assignLicenseRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} [pageIndex] 
         * @param {number} [pageSize] 
         * @param {string} [search] 
         * @param {string} [sortBy] 
         * @param {string} [lastSeenGe] 
         * @param {string} [lastSeenLe] 
         * @param {Array<string>} [product] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        licensesControllerGetLicenses(pageIndex?: number, pageSize?: number, search?: string, sortBy?: string, lastSeenGe?: string, lastSeenLe?: string, product?: Array<string>, options?: any): AxiosPromise<Array<LicensesDto>> {
            return localVarFp.licensesControllerGetLicenses(pageIndex, pageSize, search, sortBy, lastSeenGe, lastSeenLe, product, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * LicensesApi - object-oriented interface
 * @export
 * @class LicensesApi
 * @extends {BaseAPI}
 */
export class LicensesApi extends BaseAPI {
    /**
     * 
     * @param {AssignLicenseRequest} assignLicenseRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LicensesApi
     */
    public licensesControllerAssign(assignLicenseRequest: AssignLicenseRequest, options?: AxiosRequestConfig) {
        return LicensesApiFp(this.configuration).licensesControllerAssign(assignLicenseRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {number} [pageIndex] 
     * @param {number} [pageSize] 
     * @param {string} [search] 
     * @param {string} [sortBy] 
     * @param {string} [lastSeenGe] 
     * @param {string} [lastSeenLe] 
     * @param {Array<string>} [product] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LicensesApi
     */
    public licensesControllerGetLicenses(pageIndex?: number, pageSize?: number, search?: string, sortBy?: string, lastSeenGe?: string, lastSeenLe?: string, product?: Array<string>, options?: AxiosRequestConfig) {
        return LicensesApiFp(this.configuration).licensesControllerGetLicenses(pageIndex, pageSize, search, sortBy, lastSeenGe, lastSeenLe, product, options).then((request) => request(this.axios, this.basePath));
    }
}

