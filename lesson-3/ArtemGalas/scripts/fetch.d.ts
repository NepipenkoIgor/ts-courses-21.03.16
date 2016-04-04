/**
 * Created by igor on 3/31/16.
 */
interface Headers {
    append:(name:string, value:string)=>void;
    delete:(name:string)=>void;
    get:(name:string)=>string;
    set:(name:string, value:string)=>void;
}

declare var Headers:{
    prototype:Headers;
    new():Headers;
}


interface InitRequest {
    method:string;
    headers:typeof Headers;
    redirect:string;
}

interface Request {
    method:string;
    headers:typeof Headers;
    cashe:string;
    clone:()=>Request;
}


declare var Request:{
    prototype:Request;
    new(input:string|Request, init?:InitRequest):Request;
}

interface InitResponse {
    status:string;
    statusText:string;
    headers:string| typeof Headers;
}

interface ResponseBody {
    blob:Blob;
    FormData:FormData;
    BufferSource:any;
    size:any;
}


interface Response {
    arrayBuffer:()=>PromiseLike<ArrayBuffer>;
    blob:()=>PromiseLike<Blob>;
    /** описались FormData вметсто formData*/
    formData:()=>PromiseLike<FormData>;
    json:()=>any;
    text:()=>PromiseLike<string>
}

declare var Response:{
    prototype:Response;
    new(input:ResponseBody, init:InitResponse):Response;
}

declare function fetch(input:string|Request):PromiseLike<Response>


