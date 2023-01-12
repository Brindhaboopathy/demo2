import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CostingReportInput } from '../models/report/costingReport';
import { Validator } from '../utility-classes/validator';
import { SnackBarService } from '../services/snackBar.service';
import { DateFormatter } from '../utility-classes/date-formatter';
import { CostingreportService } from '../services/costingreport.service';
import { CostingReportOutput } from '../models/report/costingReportOutput';
import { numbers } from '@material/snackbar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
import { idLocale } from 'ngx-bootstrap/chronos';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-costing-reports',
  templateUrl: './costing-reports.component.html',
  styleUrls: ['./costing-reports.component.css']
})
export class CostingReportsComponent implements OnInit {
  
  id:string='';
 
  d: any[] = [];
  fields = {
    refNo: '',
    trimType: '',
    productName: '',
    customerName: '',
    entryDate: '',
    status: '',
  };
  filter1 = {};
  filter = {};

  updateFilters() {
    Object.keys(this.fields).forEach(key => this.fields[key] === '' ? delete this.fields[key] : key);
    this.filter = Object.assign({}, this.fields);
  }
    accordion(ids:any){
      console.log(ids);
      if(this.id ==ids){
        this.id='';
      }else{
        this.id =ids;
      }
    }

  p: number=1;
date1 =new Date();
date2 =new Date();
currentYear =this.date1.getUTCFullYear();
currentMonth =this.date1.getUTCMonth()+1;
currentDay =this.date1.getUTCDate();


currentYear2 =this.date2.getUTCFullYear();
currentMonth2 =this.date2.getUTCMonth()+1;
currentDay2 =this.date2.getUTCDate();

 
  FinalMonth :any;
  FinalDay :any;

  FinalMonth2 :any;
  FinalDay2 :any;
  public costingReport = new CostingReportInput();
  validator = new Validator();
  @ViewChild('loadingModalTemplate') loadingModalTemplate: TemplateRef<any>;

  data: CostingReportOutput[];
  

  constructor(
    private snackBarService: SnackBarService,
    private costingReportService: CostingreportService,
    private modalService: NgbModal,
    private formBuilder : FormBuilder,
    
  ) { }

  
  //allSelected=false;
  // trimTypeList: any[] = [
  //   {value: 'woven-0', viewValue: 'Woven'},
  //   {value: 'tag-1', viewValue: 'Pizza'},
  //   {value: 'printed-2', viewValue: 'Printed'},
  //   {value: 'sticker_flexo-3', viewValue: 'Sticker-Flexo'},
  //   {value: 'sticker_offset-4', viewValue: 'Sticker-Offset'}
    
   
  // ];
  // toggleAllSelection() {
  //   if (this.allSelected) {
  //     this.select.options.forEach((item: MatOption) => item.select());
  //   } else {
  //     this.select.options.forEach((item: MatOption) => item.deselect());
  //   }
  // }

  // optionClick() {
  //   let newStatus = true;
  //   this.select.options.forEach((item: MatOption) => {
  //     if (!item.selected) {
  //       newStatus = false;
  //     }
  //   });
  //   this.allSelected = newStatus;
  // }


  ngOnInit(): void {
    this.dataClearer();
     this.data;
    
    
    
     if(this.currentMonth < 10){
      this.FinalMonth="0" + this.currentMonth;
     }else{
      this.FinalMonth =this.currentMonth
     }
     if(this.currentDay < 10){
      this.FinalDay="0" + this.currentDay;
     }else{
      this.FinalDay =this.currentDay
     }

     this.startDate =this.currentYear + "-" + this.FinalMonth + "-" +this.FinalDay;


     if(this.currentMonth2 < 10){
      this.FinalMonth2="0" + this.currentMonth2;
     }else{
      this.FinalMonth2 =this.currentMonth2
     }
     if(this.currentDay2 < 10){
      this.FinalDay2="0" + this.currentDay2;
     }else{
      this.FinalDay2 =this.currentDay2
     }
     this.endDate =this.currentYear2 + "-" + this.FinalMonth2 + "-" +this.FinalDay2;
     
  }
  escapeToken: string = '~~~';
  startDate: string;
  endDate: string;
  sort: string;

  //TODO::
  //Costing Summary
  woven: number;
  tag: number;
  printed: number;
  sticker_flexo: number;
  sticker_offset: number;
  newNum: number;
  samplehead1Approved: number;
  samplehead2Approved: number;
  adminApproved: number;
  adminRejected: number;
  customerApproved: number;
  customerRejected: number;
  draftorderCreated: number;


  


  trimTypeList: string[] = ['Woven', 'Tag', 'Printed', 'Sticker-Flexo', 'Sticker-Offset'];
  statusList: string[] = ['New', 'Sample Head 1 Approved', 'Sample Head 2 Approved', 'Admin Approved', 'Customer Approved', 'Draft Order Created'];
  // statusList1: Object[] = [
  //   { statusKey: 0, statusName: 'New' },
  //   { statusKey: 9, statusName: 'Sample Head 1' },
  //   { statusKey: 11, statusName: 'Sample Head 2' },
  //   { statusKey: 1, statusName: 'Admin' },
  //   { statusKey: 5, statusName: 'Customer' },
  //   { statusKey: 7, statusName: 'Draft Order' },
  // ];

  statusList1: Object[] = [
    { statusKey: 0, statusName: 'New' },
    { statusKey: 9, statusName: 'Sample Head 1 Approved' },
    { statusKey: 1, statusName: 'Sample Head 2 Approved' },
    { statusKey: 2, statusName: 'Admin Approved' },
    { statusKey: 3, statusName: 'Admin Rejected' },
    // { statusKey: 4, statusName: 'Waiting for Customer Approval'},
    { statusKey: 5, statusName: 'Customer Approved' },
    { statusKey: 6, statusName: 'Customer Rejected' },
    { statusKey: 7, statusName: 'Draft Order Created' },
    // { statusKey: 8, statusName: 'Waiting for Sample Head1 Approval'},

    // { statusKey: 10, statusName: 'Waiting for Sample Head2 Approval'},
    // { statusKey: 11, statusName: 'Approved by Sample Head2'}
  ];


 
  // Search(){
  //   if(this.trimType ==""){
  //      this.ngOnInit();
  //   }else{
  //     this.data= this.data.filter(res =>{
  //       return res.trimType.toLocaleLowerCase().match(this.trimType.toLocaleLowerCase());
  //     });
    
  //   }
  // }

  // SearchProduct(){
  //   if(this.productName ==""){
  //     this.ngOnInit();
  //   }else{
  //     this.data= this.data.filter(res =>{
  //       return res.productName.toLocaleLowerCase().match(this.productName.toLocaleLowerCase());
  //     });
  //   }
  // }

  // SearchCustomername(){
  //   if(this.customerName ==""){
  //     this.ngOnInit();
  //   }else{
  //     this.data= this.data.filter(res =>{
  //       return res.customerName.toLocaleLowerCase().match(this.customerName.toLocaleLowerCase());
  //     });
  //   }
  // }

  // Searchentryname(){
  //   if(this.entryDate ==""){
  //     this.ngOnInit();
  //   }else{
  //     this.data= this.data.filter(res =>{
  //       return res.entryDate.toLocaleLowerCase().match(this.entryDate.toLocaleLowerCase());
  //     });
  //   }
  // }

  // SearchStatus(){
  //   if(this.status ==""){
  //     this.ngOnInit();
  //   }else{
  //     this.data= this.data.filter(res =>{
  //       return res.status.toLocaleLowerCase().match(this.status.toLocaleLowerCase());
  //     });
  //   }
  // }
  // SearchrefNo(){
  //   if(this.refNo ==""){
  //     this.ngOnInit();
  //   }else{
  //     this.data= this.data.filter(res =>{
  //       return res.refNo.toLocaleLowerCase().match(this.refNo.toLocaleLowerCase());
  //     });
  //   }
  // }
   
  
  onView() {
   
    this.dataClearer();
    // this.Search();
    this.data = null;
    let flag = true;

    //validation
    if (this.validator.isEmptyString(this.endDate)) {
      this.snackBarService.showWarningSnack('Please select the end date');
      flag = false;
    } else {
      this.costingReport.endDate = DateFormatter.getDate_ddMMyyyy(
        new Date(this.endDate)
      );
    }

    if (this.validator.isEmptyString(this.startDate)) {
      this.snackBarService.showWarningSnack('Please select the start date');
      flag = false;
    } else {
      this.costingReport.startDate = DateFormatter.getDate_ddMMyyyy(
        new Date(this.startDate)
      );
    }
    this.costingReport.sort = Number(this.sort ? this.sort : 1);
    console.log(this.costingReport);

    if (flag) {
      this.costingReportService.getCostingReport(this.costingReport).subscribe(
        (data: CostingReportOutput[]) => {
          console.log(data);
          if (data.length < 1) {
            this.snackBarService.showWarningSnack(
              'No data found for the given data'
            );
          } else {
            this.data = data;
            this.data.forEach(element => {
              if (element.trimType == "Woven") { this.woven++ }
              if (element.trimType == "Tag") { this.tag++ }
              if (element.trimType == "Printed") { this.printed++ }
              if (element.trimType == "Sticker-Flexo") { this.sticker_flexo++ }
              if (element.trimType == "Sticker-Offset") { this.sticker_flexo++ }
            });
            this.data.forEach(element => {
              if (element.status == "0") { this.newNum++ }
              if (element.status == "9") { this.samplehead1Approved++ }
              if (element.status == "1") { this.samplehead2Approved++ }
              if (element.status == "2") { this.adminApproved++ }
              if (element.status == "3") { this.adminRejected++ }
              if (element.status == "5") { this.customerApproved++ }
              if (element.status == "6") { this.customerRejected++ }
              if (element.status == "7") { this.draftorderCreated++ }
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
     
    } else {
      console.log("Test Log");
    }


  }

  openLoadingModal() {
    this.modalService
      .open(this.loadingModalTemplate, {
        backdrop: 'static',
        size: 'lg',
        centered: true,
        ariaLabelledBy: 'modal-basic-title',
      })
      .result.then(
        (result) => {
          console.log('loading modal closed');
        },
        (reason) => {
          console.log('loading modal closed');
        }
      );
  }

  onExport() {
    this.data = null;
    this.openLoadingModal();

    let flag = true;

    //validation
    if (this.validator.isEmptyString(this.endDate)) {
      this.snackBarService.showWarningSnack('Please select the end date');
      flag = false;
    } else {
      this.costingReport.endDate = DateFormatter.getDate_ddMMyyyy(
        new Date(this.endDate)
      );
    }

    if (this.validator.isEmptyString(this.startDate)) {
      this.snackBarService.showWarningSnack('Please select the start date');
      flag = false;
    } else {
      this.costingReport.startDate = DateFormatter.getDate_ddMMyyyy(
        new Date(this.startDate)
      );
    }

    //if empty setting it to 1 (for ascending sorting)
    this.costingReport.sort = Number(this.sort ? this.sort : 1);

    console.log(this.costingReport);

    if (flag) {
      this.costingReportService.getCostingReport(this.costingReport).subscribe(
        (data: CostingReportOutput[]) => {
          console.log(data);
          if (data.length < 1) {
            this.closeLoadingModalTemplate();
            this.snackBarService.showWarningSnack(
              'No data found for the given data'
            );
          } else {

            data.forEach(element => {
              if (element.status == "0") { element.status = "New" }
              else if (element.status == "1") { element.status = "Waiting for Admin Approval" }
              else if (element.status == "2") { element.status = "Approved by Admin" }
              else if (element.status == "3") { element.status = "Rejected" }
              else if (element.status == "4") { element.status = "Waiting for Customer Approval" }
              else if (element.status == "5") { element.status = "Approved by Customer" }
              else if (element.status == "6") { element.status = "Rejected by Customer" }
              else if (element.status == "7") { element.status = "Draft Order Created" }
              else if (element.status == "8") { element.status = "Waiting for Sample Head1 Approval" }
              else if (element.status == "9") { element.status = "Approved by Sample Head 1" }
              else if (element.status == "10") { element.status = "Waiting for Sample Head2 Approval" }
              else if (element.status == "11") { element.status = "Approved by Sample Head2" }
            });
            console.log(data);
            this.data = data;
            this.csvdownload();
          }
        },
        (err) => {
          console.log(err);
          this.closeLoadingModalTemplate();
        }
      );
    } else {
      this.closeLoadingModalTemplate();
    }
  }

  csvdownload() {
    //escape commas in data
    this.escapeCommas();

    //getting all the object's values as arrays
    let csv = this.data.map((row) => Object.values(row));

    //inserting headings
    // csv.unshift(Object.keys(this.data[0]));
    csv.unshift([
      'Reference No',
      'Entry Date',
      'Product Name',
      'Customer Name',
      'Trim Type',
      'Status'
    ]);

    //updating csv with quotes and commas
    let csvString = this.unescapeCommas(
      `"${csv.join('"\n"').replace(/,/g, '","')}"`
    );

    this.downloadFile(csvString);
  }

  escapeCommas() {
    for (let i = 0; i < this.data.length; i++) {
      let keys = Object.keys(this.data[i]);
      for (let j = 0; j < keys.length; j++) {
        this.data[i][keys[j]] = String(this.data[i][keys[j]]).replace(
          /,/g,
          this.escapeToken
        );
        if (this.data[i][keys[j]] == 'null') this.data[i][keys[j]] = '';
      }
    }
  }

  unescapeCommas(csvString) {
    return csvString.replace(new RegExp(`${this.escapeToken}`, 'g'), ',');
  }

  downloadFile(csvString) {
    let filename =
      'Report-' +
      DateFormatter.getDate_ddMMyyyy() +
      '-' +
      DateFormatter.getTime_HHMMSS();
    let blob = new Blob(['\ufeff' + csvString], {
      type: 'text/csv;charset=utf-8;',
    });
    let dwldLink = document.createElement('a');
    let url = URL.createObjectURL(blob);
    let isSafariBrowser =
      navigator.userAgent.indexOf('Safari') != -1 &&
      navigator.userAgent.indexOf('Chrome') == -1;

    //if Safari open in new window to save file with random filename.
    if (isSafariBrowser) {
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename + '.csv');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
    this.closeLoadingModalTemplate();
  }

  closeLoadingModalTemplate() {
    document.getElementById('closeLoadingModal').click();
    console.log('loading modal closed');
  }

  dataClearer() {
    this.woven = 0;
    this.tag = 0;
    this.printed = 0;
    this.sticker_flexo = 0;
    this.sticker_offset = 0;
    this.newNum = 0;
    this.samplehead1Approved = 0;
    this.samplehead2Approved = 0;
    this.adminApproved = 0;
    this.adminRejected = 0;
    this.customerApproved = 0;
    this.customerRejected = 0;
    this.draftorderCreated = 0;
  }


}
