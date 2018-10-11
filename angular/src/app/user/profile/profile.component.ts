import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';

import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { FileSelectDirective, FileDropDirective, FileUploader  } from 'ng2-file-upload/ng2-file-upload';
import {saveAs} from 'file-saver';

import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';


const uri = 'http://localhost:3000/file/upload';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

 @Input('user') user: User ;
    uploader: FileUploader = new FileUploader({url: uri});
    attachmentList: any = [];

  constructor( private userService: UserService, private formBuilder: FormBuilder  ) {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        return this.attachmentList.push(JSON.parse(response));
    };

  }

  ngOnInit() {  }

  download(index) {
      const filename = this.attachmentList[index].uploadname;

      this.userService.downloadFile(filename)
      .subscribe(
          data => saveAs(data, filename),
          error => console.error(error)
      );
  }


// get user details
getUserProfile() {
    this.userService.getUserList().subscribe(
      data => {
        // debugger;
        alert(data);
        console.log(data);
        // this.user = this.data;
      },
      error => {
        return console.log(error);
      }
    );
  }






}

