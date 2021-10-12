export interface RentalDetail{
  Id:number;
  carInfoId:number;
  brandName:string;
  modelName:string;
  customerInfoId:number;
  firstName:string;
  lastName:string;
  rentDate:Date;
  rentEndDate:Date;
  returnDate:Date;
  deliveryStatus:boolean;
}
