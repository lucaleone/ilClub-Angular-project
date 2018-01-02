import {IlClubUser} from './ilClubUser';
import {Library} from './library';

export class IlClubEvent {
  public $key: string;
  public title: string;
  public description: string;
  public imgPath = './assets/type-event/default.jpg';
  public date: string;
  public time: string;
  public library: string;
  public owner: string;
  public going: string[];
}
