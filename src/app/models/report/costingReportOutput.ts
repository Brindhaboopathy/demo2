export class CostingReportOutput {
  id: string;
  refNo: string;
  entryDate: string;
  productName: string;
  customerName: string;
  status: string;
  quantity: string;
  trimType: string;
  
  constructor() {
    this.id = "";
    this.refNo = "";
    this.entryDate = "";
    this.productName = "";
    this.customerName = "";
    this.status = "";
    this.quantity = "";
    this.trimType = "";
    
  }
}
