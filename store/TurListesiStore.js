import { observable, action, configure, runInAction, computed } from "mobx";
import data from '../data.json';
configure({
  enforceActions: "observed"
});

class TurListesiStore {

  @observable liste = [];
  @observable loading = false;
  @action loadList = () => {
    runInAction(() => {


      this.liste = data.data;
      console.log(data.data);
      this.loading = true;
    })
  }
  @action async turListBTN(id, value, x) {
    ////console.log(this.liste);
    for (let e of this.liste) {
      for (let item of e.data) {
        if (item.kod == id) {
          item.btnLevel = value;
          item.tursayi = x;
          break;
        }
      }

    }
  }
  @action async seciliTurAdd(value, turadi) {
    console.log("xqfqxsxs");
    this.turListBTN(value, 1, "G");
  }
  @action async seciliTurDelete(id) {
    this.turListBTN(id, 0);
  }
  @computed get filteredx() {

    return this.liste.map((v) => {
      return {
        title: v.title,
        data: v.data.slice(),//You need to slice data
      }
    }).slice(0,40);// And slice the listData


  }
}

export default new TurListesiStore();