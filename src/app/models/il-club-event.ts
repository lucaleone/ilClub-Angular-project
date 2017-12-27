import {IlClubUser} from './ilClubUser';
import {Library} from './library';

export class IlClubEvent {
  public id: number;
  public title: string;
  public description: string;
  public impPath = './assets/type-event/default.jpg';
  public date: string;
  public time: string;
  public library: Library;
  public owner: IlClubUser;
  public going: IlClubUser[];
}
