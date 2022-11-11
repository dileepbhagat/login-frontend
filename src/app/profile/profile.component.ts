import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, CanActivate } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  entityName=localStorage.getItem("firmName")!;
  entityType="";
  address="";
  pincode="";
  state="";
  city="";
  designatedPerson="";
  designatedPersonName="";
  designatedPersonTelephoneNo="";
  designatedPersonFaxNo="";
  addAddlDesgnPerson=false;
  profileFile="";
  salesTaxNo="";
  salesTaxFile="";
  panNo=localStorage.getItem("username")!;
  panNoFile="";
  centralExciseNo="";
  centralExciseFile="";
  balanceSheetFile="";
  commissionerateName="";
  commissionerateCity="";
  amountOfExciseDuties="";
  gstNo="";
  gstFile="";
  iecCode="";
  iecFile="";
  importExportFile="";
  authorityFile="";
  ncbUrnNo="";
  ncbUrnFile="";

  emptyFields=false;
  selectedUsername="";
  token="";

  // file upload variables
  form: FormGroup;
  //file: File;
  constructor(private fb: FormBuilder, private http: HttpClient, public router: Router) {
    this.form = this.fb.group({
      profileFile: null
    });
   }

  ngOnInit(): void {
    $("#home-li").removeClass("active");
    $("#dashboard-li").removeClass("active");
    $("#profile-li").addClass("active");

    this.selectedUsername=localStorage.getItem("username")!;
    $('#login-user-details').css('display','block');
    $('#cbn-text').css('width','40%');
    $('#cursor-li').hide();
    
  }

  addDesgnPerson()
  {
    this.designatedPerson='';
    this.designatedPersonName='';
    this.designatedPersonTelephoneNo='';
    this.designatedPersonFaxNo='';
  }

  selectFiles(event:any,type:any)
  {
    const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            const file = fileList[0];

            const formData = new FormData();
            //formData.append('file', file, file.name);
            formData.append('file', file);
            formData.append('requestDTO', new Blob([JSON.stringify({
              "entityName": this.entityName,
              "panNo": this.panNo,
              "docShortCode":"CP"
            })], {
                  type: "application/json"
              }));
            const headers = new Headers();
            
            // It is very important to leave the Content-Type empty
            // do not use headers.append('Content-Type', 'multipart/form-data');
            this.token=localStorage.getItem("token")!;
            const options = {
              headers: new HttpHeaders().append('Authorization', this.token)
            };
            this.http.post<any>('http://localhost:9090/api/v1/uploadfile', formData, options
            ).subscribe({
              next: response => {
                console.log("email sent successfully ", response);
                this.router.navigate(['process-register']);
              },
                error: error => {
                  console.log("email sending failed", error);
                }
              })

        }
  }

  saveProfileData(status:string)
  {
    this.emptyFields=false;
    // validation for required fields
    if(this.entityName=='' || this.entityType== '' || this.address== '' || this.pincode== '' || this.state== '' ||
    this.city== '' || this.designatedPerson== '' || this.designatedPersonName== '' || this.panNo== '' || this.commissionerateCity== '' ||
    this.commissionerateName== '' || this.amountOfExciseDuties== '' || this.gstNo== '' || this.iecCode== '' ||
    this.profileFile== '' || this.panNoFile== '' || this.balanceSheetFile== '' || this.gstFile== '' || this.iecFile== '' || 
    this.importExportFile=='')
    {
      this.emptyFields=true;
    }
    else
    {
    const profileElement= <HTMLInputElement>$("#company-profile-id")[0];
    const profileFile=profileElement?.files![0];
    const panElement= <HTMLInputElement>$("#pan-no-id")[0];
    const panFile=panElement?.files![0];
    const balanceSheetElement= <HTMLInputElement>$("#balance-sheet-id")[0];
    const balanceSheetFile=balanceSheetElement?.files![0];
    const gstElement= <HTMLInputElement>$("#gst-no-id")[0];
    const gstFile=gstElement?.files![0];
    const iecElement= <HTMLInputElement>$("#iec-code-id")[0];
    const iecFile=iecElement?.files![0];
    const imexElement= <HTMLInputElement>$("#import-export-id")[0];
    const imexFile=imexElement?.files![0];
    const dtList = new DataTransfer();
    dtList.items.add(profileFile);
    dtList.items.add(panFile);
    dtList.items.add(balanceSheetFile);
    dtList.items.add(gstFile);
    dtList.items.add(iecFile);
    dtList.items.add(imexFile);
    const formData = new FormData();
    const files:FileList=dtList.files;
    formData.append('files', files[0]);
    formData.append('files', files[1]);
    formData.append('files', files[2]);
    formData.append('files', files[3]);
    formData.append('files', files[4]);
    formData.append('files', files[5]);

    formData.append('requestDTO', new Blob([JSON.stringify({
      "entityType":this.entityType,
      "entityName": this.entityName,
      "address":this.address,
      "pinCode":this.pincode,
      "state":this.state,
      "city":this.city,
      "designatedPerson":this.designatedPerson,
      "designatedPersonName":this.designatedPersonName,
      "panNo": this.panNo,
      "jurisCommissName":this.commissionerateName,
      "jurisCommissCity":this.commissionerateCity,
      "gstNo":this.gstNo,
      "iecCode":this.iecCode,
      "amountOfExciseDuties":this.amountOfExciseDuties
    })], {
          type: "application/json"
      }));

      formData.append("status",status);
      this.token=localStorage.getItem("token")!;
      const options = {
        headers: new HttpHeaders().append('Authorization', this.token)
      };
      this.http.post<any>('http://localhost:9090/api/v1/saveAndUploadfiles', formData, options
      ).subscribe({
        next: response => {
          console.log("email sent successfully ", response);
          this.router.navigate(['process-register']);
        },
          error: error => {
            console.log("email sending failed", error);
          }
        })
  }
}

nextProfilePage()
{
  console.log("Navigating to next profile page! ");
  this.router.navigate(['profile/2']);
}

}
