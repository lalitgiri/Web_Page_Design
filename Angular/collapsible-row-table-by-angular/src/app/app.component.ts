import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.intialiseData();
  }
  title = 'collapsible-row-table-by-angular';

  mockData:{field1:string,field2:string,field3:string,field4:string,flag:boolean}[]=[];
  mockChildData:{field1:string,field2:string,field3:string,field4:string}[]=[];
  intialiseData(){
    let i=0;

    while(i<7){
      this.mockData.push({field1:"Field1",field2:"Field2",field3:"Field3",field4:"Field4",flag:false});
      this.mockChildData.push({field1:"Child1",field2:"Child2",field3:"Child3",field4:"Child4"});
      i++;
    }
  }
}
