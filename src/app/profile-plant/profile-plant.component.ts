import { Component, OnInit } from '@angular/core';
import { NgMultiSelectDropDownModule,IDropdownSettings } from 'ng-multiselect-dropdown';
import { HttpClient } from '@angular/common/http';
import { Router, CanActivate } from '@angular/router';
import { Substance } from '../models/substance.model';

@Component({
  selector: 'app-profile-plant',
  templateUrl: './profile-plant.component.html',
  styleUrls: ['./profile-plant.component.css']
})
export class ProfilePlantComponent implements OnInit {

  loginId=localStorage.getItem("username")! || "DFDFEE343";
  saveDataFlag=false;
  saveDataSuccessFlag=false;
  saveDataMsg="";
  plantName="";
  address="";
  drugLicense="";
  drugLicenseFile="";
  validityFromDate='01-01-1970';
  validityToDate='01-01-1970';
  renewalFile="";
  psychotropicSubstance="Psychotropics";
  narcoticsSubstance="Narcotics";
  controlledSubstance="Controlled Substances";
  isPsychoSubPresent=false;
  isNarcoSubPresent=false;
  isContrSubPresent=false;

  pyschoSubList:Substance[]=[];
  selectedPyschoSubList:Substance[]=[];
  narcoSubList:Substance[]=[];
  selectedNarcoSubList:Substance[]=[];
  contrSubList:Substance[]=[];
  selectedContrSubList:Substance[]=[];

  plantId="";

  emptyFields=false;

  constructor(private http: HttpClient, public router: Router) {
   }

  ngOnInit(): void {

     // Fetch API Calling
    // ($('#example-getting-started')as any).multiselect();

     this.http.get<any>('http://localhost:9090/api/v1/profile/fetch/substance/data', {
    }).subscribe({
        next: data => {
          this.pyschoSubList= data.psychotropicSubstancesEntities;
          this.narcoSubList= data.narcoticsSubstancesEntities;
          this.contrSubList= data.controlledSubstancesEntities;
        },
        error: error => {
            console.error('There was an error!', error);
        }
    });
    

  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  enableDisablePsychoPopup(event:any)
  {
    if(event.currentTarget.parentElement.children[1].disabled==false)
    {
        event.currentTarget.parentElement.children[1].disabled=true;
        event.currentTarget.parentElement.children[1].style.opacity='0.5';
    }
    else
    {
        event.currentTarget.parentElement.children[1].disabled=false;
        event.currentTarget.parentElement.children[1].style.opacity='1';
    }
  }

  enableDisableNarcoPopup(event:any)
  {
    if(event.currentTarget.parentElement.children[1].disabled==false)
    {
        event.currentTarget.parentElement.children[1].disabled=true;
        event.currentTarget.parentElement.children[1].style.opacity='0.5';
    }
    else
    {
        event.currentTarget.parentElement.children[1].disabled=false;
        event.currentTarget.parentElement.children[1].style.opacity='1';
    }
  }


  enableDisableContrPopup(event:any)
  {
    if(event.currentTarget.parentElement.children[1].disabled==false)
    {
        event.currentTarget.parentElement.children[1].disabled=true;
        event.currentTarget.parentElement.children[1].style.opacity='0.5';
    }
    else
    {
        event.currentTarget.parentElement.children[1].disabled=false;
        event.currentTarget.parentElement.children[1].style.opacity='1';
    }
  }

  showHidePsySubSubstances()
  {
    var checkList = document.getElementById('list1')!;
    let element: HTMLElement=checkList.getElementsByClassName('anchor')[0] as HTMLElement;
    if (checkList.classList.contains('visible'))
      checkList.classList.remove('visible');
    else
      checkList.classList.add('visible');
  }

  showHideNarcoSubSubstances()
  {
    var checkList = document.getElementById('list2')!;
    let element: HTMLElement=checkList.getElementsByClassName('anchor')[0] as HTMLElement;
    if (checkList.classList.contains('visible'))
      checkList.classList.remove('visible');
    else
      checkList.classList.add('visible');
  }

  showHideControlledSubSubstances()
  {
    var checkList = document.getElementById('list3')!;
    let element: HTMLElement=checkList.getElementsByClassName('anchor')[0] as HTMLElement;
    if (checkList.classList.contains('visible'))
      checkList.classList.remove('visible');
    else
      checkList.classList.add('visible');
  }


  addPsychoSubToSelectedList(event:any)
  {
    event.currentTarget.disabled=true;
    console.log("disabled!");
    // add to selectedList
    var selectedPsychoSub=event.currentTarget.parentElement.textContent;
    for(var i=0;i<this.pyschoSubList.length;i++)
    {
      if(this.pyschoSubList[i].substanceName==selectedPsychoSub)
      {
        this.selectedPyschoSubList.push(this.pyschoSubList[i]);
        break;
      }
    }
    var element=$("#psycho-substance-show-id")[0] as HTMLInputElement | null;
    if(element!=null)
    {
      element.value=this.selectedPyschoSubList[0].substanceName;
      for(var i=1;i<this.selectedPyschoSubList.length;i++)
      {
        element.value=element.value+", "+this.selectedPyschoSubList[i].substanceName;
      }
    }
  }


  addNarcoSubToSelectedList(event:any)
  {
    event.currentTarget.disabled=true;
    console.log("disabled!");
    // add to selectedList
    var selectedNarcoSub=event.currentTarget.parentElement.textContent;
    for(var i=0;i<this.narcoSubList.length;i++)
    {
      if(this.narcoSubList[i].substanceName==selectedNarcoSub)
      {
        this.selectedNarcoSubList.push(this.narcoSubList[i]);
        break;
      }
    }
    var element=$("#narco-substance-show-id")[0] as HTMLInputElement | null;
    if(element!=null)
    {
      element.value=this.selectedNarcoSubList[0].substanceName;
      for(var i=1;i<this.selectedNarcoSubList.length;i++)
      {
        element.value=element.value+", "+this.selectedNarcoSubList[i].substanceName;
      }
    }
  }

  addContrlSubToSelectedList(event:any)
  {
    event.currentTarget.disabled=true;
    console.log("disabled!");
    // add to selectedList
    var selectedContrlSub=event.currentTarget.parentElement.textContent;
    for(var i=0;i<this.contrSubList.length;i++)
    {
      if(this.contrSubList[i].substanceName==selectedContrlSub)
      {
        this.selectedContrSubList.push(this.contrSubList[i]);
        break;
      }
    }
    var element=$("#contrl-substance-show-id")[0] as HTMLInputElement | null;
    if(element!=null)
    {
      element.value=this.selectedContrSubList[0].substanceName;
      for(var i=1;i<this.selectedContrSubList.length;i++)
      {
        element.value=element.value+", "+this.selectedContrSubList[i].substanceName;
      }
    }
  }


  deletePsychoSub(event:any)
  {
    var selectedPsychoSub=event.currentTarget.parentElement.children[1].textContent;
    var selectedPsychoSubId="psy-";
    // removing from selectedList
    this.selectedPyschoSubList.forEach((element,index)=>{
      if(element.substanceName==selectedPsychoSub) 
      { 
        this.selectedPyschoSubList.splice(index,1);
        selectedPsychoSubId+=element.serialNo;
      }
    });

    // removing disabled
    var element=$("#"+selectedPsychoSubId)[0] as HTMLInputElement | null;
    if(element!=null)
    {
      element.disabled=false;
      element.checked=false;
    }
    console.log("deleted!");

    var element=$("#psycho-substance-show-id")[0] as HTMLInputElement | null;
    if(element!=null)
    {
      if(this.selectedPyschoSubList.length!=0)
      {
        element.value=this.selectedPyschoSubList[0].substanceName;
        for(var i=1;i<this.selectedPyschoSubList.length;i++)
        {
          element.value=element.value+", "+this.selectedPyschoSubList[i].substanceName;
        }
      }
      else
          element.value="Substances selected so far";
    }
  }


  deleteNarcoSub(event:any)
  {
    var selectedNarcoSub=event.currentTarget.parentElement.children[1].textContent;
    var selectedNarcoSubId="nar-";
    // removing from selectedList
    this.selectedNarcoSubList.forEach((element,index)=>{
      if(element.substanceName==selectedNarcoSub) 
      { 
        this.selectedNarcoSubList.splice(index,1);
        selectedNarcoSubId+=element.serialNo;
      }
    });

    // removing disabled
    var element=$("#"+selectedNarcoSubId)[0] as HTMLInputElement | null;
    if(element!=null)
    {
      element.disabled=false;
      element.checked=false;
    }
    console.log("deleted!");

    var element=$("#narco-substance-show-id")[0] as HTMLInputElement | null;
    if(element!=null)
    {
      if(this.selectedNarcoSubList.length!=0)
      {
        element.value=this.selectedNarcoSubList[0].substanceName;
        for(var i=1;i<this.selectedNarcoSubList.length;i++)
        {
          element.value=element.value+", "+this.selectedNarcoSubList[i].substanceName;
        }
      }
      else
          element.value="Substances selected so far";
    }
  }

  deleteContrlSub(event:any)
  {
    var selectedContrlSub=event.currentTarget.parentElement.children[1].textContent;
    var selectedContrlSubId="ctr-";
    // removing from selectedList
    this.selectedContrSubList.forEach((element,index)=>{
      if(element.substanceName==selectedContrlSub) 
      { 
        this.selectedContrSubList.splice(index,1);
        selectedContrlSubId+=element.serialNo;
      }
    });

    // removing disabled
    var element=$("#"+selectedContrlSubId)[0] as HTMLInputElement | null;
    if(element!=null)
    {
      element.disabled=false;
      element.checked=false;
    }
    console.log("deleted!");

    var element=$("#contrl-substance-show-id")[0] as HTMLInputElement | null;
    if(element!=null)
    {
      if(this.selectedContrSubList.length!=0)
      {
        element.value=this.selectedContrSubList[0].substanceName;
        for(var i=1;i<this.selectedContrSubList.length;i++)
        {
          element.value=element.value+", "+this.selectedContrSubList[i].substanceName;
        }
      }
      else
          element.value="Substances selected so far";
    }
  }


  saveUserPlantSubstanceDetails()
  {
    // Calling API to save plant substance details
    var element=$("#addDeletePlantButtonId")[0] as HTMLInputElement | null;
    if(element!=null)
    {
      element.disabled=true;
      element.style.opacity='0.5';
    }
    this.saveDataFlag=false;
    if(this.plantName=="" || this.address=="" || this.drugLicense=="" || this.validityFromDate=='01-01-1970' || 
    this.validityToDate=='01-01-1970')
    {
      this.saveDataFlag=true;
      this.saveDataMsg="Please enter all entries & upload all required files!";
    }
    else
    {
    if(this.selectedPyschoSubList.length!=0)
      this.isPsychoSubPresent=true;
    if(this.selectedNarcoSubList.length!=0)
      this.isNarcoSubPresent=true;
    if(this.selectedContrSubList.length!=0)
      this.isContrSubPresent=true;
    const drugElement= <HTMLInputElement>$("#drug-license-file-id")[0];
    const drugElementFile=drugElement?.files![0];

    const formData = new FormData();
    formData.append('file', drugElementFile);
    formData.append('requestDTO', new Blob([JSON.stringify({
      "loginId": this.loginId,
      "plantName": this.plantName,
      "plantAddress": this.address,
      "drugLicenseNo":  this.drugLicense,
      "validityFrom": this.validityFromDate,
      "validityTo": this.validityToDate,
      "isPsychoSubPresent": this.isPsychoSubPresent,
      "isNarcoSubPresent": this.isNarcoSubPresent,
      "isContrSubPresent": this.isContrSubPresent,
      "psychotropicSubstancesEntities": this.selectedPyschoSubList,
      "narcoticsSubstancesEntities": this.selectedNarcoSubList,
      "controlledSubstancesEntities": this.selectedContrSubList
      })], {
              type: "application/json"
      }));

      this.http.post<any>('http://localhost:9090/api/v1/profile/save/plant/data', formData
      ).subscribe({
        next: data => {
          console.log("Data Saved successfully!");
          console.log("Hi");
          this.saveDataFlag=true;
          this.saveDataMsg="Profile Data saved Sucessfully!";
          this.plantId=data.plantId;
          var element=$("#addDeletePlantButtonId")[0] as HTMLInputElement | null;
          if(element!=null)
          {
            element.disabled=false;
            element.style.opacity='1';
          }
          var element2=$("#profile-update-button")[0] as HTMLInputElement | null;
          if(element2!=null)
          {
            element2.disabled=false;
            element2.style.opacity='1';
          }
        },
        error: error => {
          console.error('There was an error!', error);
          this.saveDataFlag=true;
          this.saveDataMsg="Profile Data saving failed!";
        }
      });
    }
  }


  addNewPlantDetails()
  {
    this.plantName="";
    this.address="";
    this.drugLicense="";
    this.drugLicenseFile="";
    this.validityFromDate='01-01-1970';
    this.validityToDate='01-01-1970';
    this.renewalFile="";
    var element1=$("#psycho-checkbox-id")[0] as HTMLInputElement | null;
    if(element1!=null)
      element1.checked=false;
    var element2=$("#narcotics-checkbox-id")[0] as HTMLInputElement | null;
    if(element2!=null)
      element2.checked=false;
    var element3=$("#controlled-checkbox-id")[0] as HTMLInputElement | null;
    if(element3!=null)
      element3.checked=false;
    
    var element4=$("#psycho-button-id")[0] as HTMLInputElement | null;
    if(element4!=null)
      element4.disabled=true;
    var element5=$("#narcotics-button-id")[0] as HTMLInputElement | null;
    if(element5!=null)
      element5.disabled=true;
    var element6=$("#controlled-button-id")[0] as HTMLInputElement | null;
    if(element6!=null)
      element6.disabled=true;
    
    this.saveDataFlag=false;

    var element=$("#addDeletePlantButtonId")[0] as HTMLInputElement | null;
    if(element!=null)
    {
      element.disabled=true;
      element.style.opacity='0.5';
    }
    var element2=$("#profile-update-button")[0] as HTMLInputElement | null;
    if(element2!=null)
    {
      element2.disabled=true;
      element2.style.opacity='0.5';
    }
    
  }

  updateUserPlantSubstanceDetails()
  {
    // Calling API to update plant substance details
    var element=$("#addDeletePlantButtonId")[0] as HTMLInputElement | null;
    if(element!=null)
    {
      element.disabled=true;
      element.style.opacity='0.5';
    }
    this.saveDataFlag=false;
    if(this.selectedPyschoSubList.length!=0)
      this.isPsychoSubPresent=true;
    if(this.selectedNarcoSubList.length!=0)
      this.isNarcoSubPresent=true;
    if(this.selectedContrSubList.length!=0)
      this.isContrSubPresent=true;
    const drugElement= <HTMLInputElement>$("#drug-license-file-id")[0];
    const drugElementFile=drugElement?.files![0];

    const formData = new FormData();
    formData.append('file', drugElementFile);
    formData.append('requestDTO', new Blob([JSON.stringify({
      "plantId": this.plantId,
      "loginId": this.loginId,
      "plantName": this.plantName,
      "plantAddress": this.address,
      "drugLicenseNo":  this.drugLicense,
      "validityFrom": this.validityFromDate,
      "validityTo": this.validityToDate,
      "isPsychoSubPresent": this.isPsychoSubPresent,
      "isNarcoSubPresent": this.isNarcoSubPresent,
      "isContrSubPresent": this.isContrSubPresent,
      "psychotropicSubstancesEntities": this.selectedPyschoSubList,
      "narcoticsSubstancesEntities": this.selectedNarcoSubList,
      "controlledSubstancesEntities": this.selectedContrSubList
      })], {
              type: "application/json"
      }));

      this.http.post<any>('http://localhost:9090/api/v1/profile/update/plant/data', formData
      ).subscribe({
        next: data => {
          console.log("Data Updated successfully!");
          console.log("Hi");
          this.saveDataFlag=true;
          this.saveDataMsg="Profile Data updated Sucessfully!";
          var element=$("#addDeletePlantButtonId")[0] as HTMLInputElement | null;
          if(element!=null)
          {
            element.disabled=false;
            element.style.opacity='1';
          }
          var element2=$("#profile-update-button")[0] as HTMLInputElement | null;
          if(element2!=null)
          {
            element2.disabled=false;
            element2.style.opacity='1';
          }
        },
        error: error => {
          console.error('There was an error!', error);
          this.saveDataFlag=true;
          this.saveDataMsg="Profile Data updating failed!";
        }
      });
  }
  

  changeFileName(event:any)
  {
    const fileList: FileList = event.target.files;
    const file = fileList[0];
    this.drugLicenseFile=file.name;
  }


}
