export  interface  Student{
  id: string,
  code:string,
  firstName:string,
  lastName:string,
  programId:string,
  photo:string
}
export interface Payment{
  id : number,
  date:string,
  amount:number,
  type:string,
  status:string,
  file : string,
  student:Student
}
export enum paymentType{
  CASH ,
  CHECK ,
  TRANSFER,
  DEPOSIT
}
export enum PayementStatus{
  CREATED,
  VALIDATED,
  REJECTED
}
