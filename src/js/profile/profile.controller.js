class ProfileCtrl {
  constructor(profile, User) {
    'ngInject';

    // The profile for this page, resolved by UI Router
    this.profile = profile;

    if(User.current) {
      this.isUser = (User.current.username === this.profile.username);
    } else {
      this.isUser = false;
    }

  }
}


export default ProfileCtrl;
