import { orderdetail } from "./orderdetail";
import { user } from "./user";

export class order{

    public orderid!:number;
    public firstname!:string;
    public lastname!:string;
    public address!:string;
    public phone!:string;
    public email!:string;
    public orderdate!:Date;
    public shipdate!:Date;
    public orderStatus!:string;
    public listDetail!:orderdetail[];
    public username!:user;
}