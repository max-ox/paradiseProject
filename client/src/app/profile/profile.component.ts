import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  editUser: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isEditNow: boolean = false;
  defaultAvatar= '';

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    this.editUser = new User();
    // let id = this.actRoute.snapshot.paramMap.get('id');
    // this.authService.getUserProfile(id).subscribe(res => {
    //   this.currentUser = res.user;
    // })
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log('this.croppedImage', this.croppedImage)
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    console.log('cropperReady')
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser = res.user;
    })
  }

  startEdit() :void {
    this.isEditNow = true;
  }

  dataURItoBlob(dataURI): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  uploadAttachmentToServer(dataURI) {
    let yourCroppedImage = this.dataURItoBlob(dataURI);
    const fileToUpload: File = new File([this.dataURItoBlob(yourCroppedImage)], 'filename.png');
    // this.attachmentService.postAttachment(fileToUpload).subscribe(data => {
    //   // success, do something
    // }, error => {
    //   // failure, do something
    // });
  }

  cancelEdit() {
    this.isEditNow = false;
  }

  saveEdit() {
    console.log(this.editUser);
  }

  deleteProfile() {
    // TODO: modal are you sure
  }

}
