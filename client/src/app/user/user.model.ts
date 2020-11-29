export class User {
  constructor(data?){
    if(data && data.user) {
      let user = data.user
      this.email = user.email;
      // this.password = ;
      // this.confirmPassword = '';
      this.nickname = user.nickname;
      this.itsPIN = user.itsPIN;
      this.faction = user.faction;
      this.avatar = user.avatar;
      // this.rank = '';
      this.isActive = user.isActive;
      this.contactLink = user.contactLink;
      this.achievements = user.achievements;
      this.token = user.token;
      this.isCurrent = user.isCurrent;
    }else {
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.nickname = '';
      this.itsPIN = '';
      this.faction = {};
      this.avatar = '';
      // this.rank = '';
      this.isActive = '';
      this.contactLink = '';
      this.token = '';
      this.achievements = [];
      this.isCurrent = false;
    }

  }
  public email;
  public password;
  public confirmPassword;
  public nickname;
  public itsPIN;
  public faction;
  public contactLink;
  public achievements;
  public avatar;
  public isActive;
  public token;
  public isCurrent;
  // public rank;
}
