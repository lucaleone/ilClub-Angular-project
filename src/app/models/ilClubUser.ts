import {auth} from 'firebase';

export class IlClubUser {
  constructor(public email: string,
              public username: string = null,
              private imgPath: string = null,
              public description: string = '') {
  }

  public getImgPath() {
    console.log('photoURL: ' + auth().currentUser.photoURL);
    return this.imgPath ? this.imgPath : auth().currentUser ? auth().currentUser.photoURL : '';
  }
  public setImgPath(imgPath) {
    // do the upload?
    this.imgPath = imgPath;
  }
}
