export class CostingReportInput{
  startDate: string;
  endDate: string;
  trimType: string[];
  status: number[];
  sort: number;

  constructor(){
    this.startDate = "",
    this.endDate = "",
    this.trimType = ["Woven","Tag","Printed","Sticker-Flexo","Sticker-Offset"],
    this.status = [0,1,2,3,4,5,6,7,8,9,10,11],
    this.sort = 1
  }
}

