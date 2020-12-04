import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AuthService } from '../auth/auth.service';
import { FactionService } from '../services/faction.service';
import { HelpersService } from '../_helpers/helpers.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  editUser: User;
  factionList: Array<any>;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isEditNow: boolean = false;
  isError: boolean = false;
  isCurrent: boolean = false;
  defaultAvatar= '';
  errorMessage= '';

  constructor(
    public authService: AuthService,
    public factionService: FactionService,
    public helpersService: HelpersService,
    public userService: UserService,
    private actRoute: ActivatedRoute
  ) {
    this.editUser = new User();
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
    let nickname = this.actRoute.snapshot.paramMap.get('nickname');
    this.authService.getUserProfile(nickname).subscribe(res => {
      this.currentUser = res.user;
      this.isCurrent = res.isCurrent;
      if(this.currentUser && !this.currentUser.isActive && this.isCurrent) {
        this.factionService.getFactions().subscribe(res => {
          this.factionList = res.factions;
          this.isEditNow = true;
          Object.assign(this.editUser, this.currentUser);
        })
      }
    })
  }

  startEdit() :void {
    this.factionService.getFactions().subscribe(res => {
      this.factionList = res.factions;
      this.isEditNow = true;
      Object.assign(this.editUser, this.currentUser)
    })
  }

  cancelEdit() {
    this.isEditNow = false;
  }

  saveEdit() {
    if(this.editUser.itsPIN !='' && this.editUser.faction && this.editUser.contactLink) {
      this.editUser.isActive = true;
    }
    this.userService.updateUser(this.editUser)
       .subscribe(
        (response) => {
          Object.assign(this.currentUser, this.editUser)
          this.isEditNow = false;
        },
        (error) => {
          if(error) {
            this.errorMessage = 'User with this '
            if(error.isNicknameInvalid) {
              this.errorMessage += 'nickname'
            }
            if(error.isNicknameInvalid && error.error.isItsPINInvalid) {
              this.errorMessage += ' and '
            }
            if(error.isItsPINInvalid) {
              this.errorMessage += 'ITS_PIN'
            }
            this.errorMessage += ' has already exist.'
          }
        }
      );
  }

  changeUserFaction(faction) {
    this.editUser.faction=faction
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

  deleteProfile() {
    // TODO: modal are you sure
  }

}
