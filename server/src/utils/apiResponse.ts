export class ApiResponse<T> {
    public success:boolean;
    constructor(public statusCode:number, public message:string, public data: T) {
        this.statusCode = statusCode;
        this.data =data;
        this.message = message;
        this.success = statusCode < 400;
    }
}