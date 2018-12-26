import SigUtils from './sig-utils';
import Admin from './admin';
import Socialize from './socialize';
import Accounts from './accounts';
import DS from './ds';
import GM from './gm';
import Fidm from './fidm';
import Reports from './reports';
import IDX from './idx';
import GigyaError from './gigya-error';
import GigyaResponse from './interfaces/gigya-response';
import ProxyHttpRequest from './interfaces/proxy-http-request';
import BaseParams from './interfaces/base-params';
export * from './sig-utils';
export * from './admin';
export * from './socialize';
export * from './accounts';
export * from './ds';
export * from './gm';
export * from './fidm';
export * from './reports';
export * from './idx';
export * from './gigya-error';
export * from './interfaces/gigya-response';
export * from './interfaces/error-code';
export * from './interfaces/proxy-http-request';
export * from './interfaces/base-params';
export declare class Gigya {
    protected static readonly RATE_LIMIT_SLEEP: number;
    protected static readonly RETRY_LIMIT: number;
    protected static readonly RETRY_DELAY: number;
    protected apiKey: string | undefined;
    protected dataCenter: string | undefined;
    protected userKey: string | undefined;
    protected secret: string | undefined;
    protected httpRequest: ProxyHttpRequest;
    readonly sigUtils: SigUtils;
    readonly admin: Admin;
    readonly socialize: Socialize;
    readonly accounts: Accounts;
    readonly ds: DS;
    readonly gm: GM;
    readonly fidm: Fidm;
    readonly reports: Reports;
    readonly idx: IDX;
    /**
     * Initialize new instance of Gigya.
     */
    constructor();
    constructor(proxyHttpRequest: ProxyHttpRequest);
    constructor(apiKey: string, dataCenter: string, proxy: ProxyHttpRequest);
    constructor(apiKey: string, dataCenter: string, secret: string);
    constructor(apiKey: string, dataCenter: string, userKey: string, secret?: string);
    /**
     * Make request to Gigya. Typically, you'll want to use the defined interface (for example gigya.accounts.getAccountInfo) instead of calling request directly.
     *
     * If a method is not available, create an issue or pull request at: https://github.com/scotthovestadt/gigya
     */
    request<R>(endpoint: string, userParams?: any): Promise<GigyaResponse & R>;
    /**
     * Internal handler for requests.
     */
    protected _request<R>(endpoint: string, userParams: BaseParams & {
        [key: string]: any;
    }, retries?: number): Promise<GigyaResponse & R>;
    /**
     * Create GigyaError from response.
     */
    protected createErrorFromResponse(response: GigyaResponse, endpoint: string, params: BaseParams & Object): GigyaError;
}
export default Gigya;
