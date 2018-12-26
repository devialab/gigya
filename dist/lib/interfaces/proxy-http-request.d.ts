import GigyaResponse from '../interfaces/gigya-response';
export declare type ProxyHttpRequest = <R>(endpoint: string, dataCenter: string, requestParams: {
    [key: string]: string | null | number | boolean;
}) => Promise<GigyaResponse & R>;
export default ProxyHttpRequest;
