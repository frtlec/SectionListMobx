  
import { observable, action, configure, runInAction, computed } from "mobx";
import data from './data.json'

configure({
    enforceActions: "observed"
  });

class TurListesiStore {

    @observable liste = [];

    @computed get filteredx() {
        //console.time("sort");
        //console.log(this.liste);
     
        let filteredList = [];
        let searchSTR = this.filterTermValuex;
        if (this.filterTermValuex != "") {
          for (let e of this.liste) {
            for (let item of e.data) {
              if (
                this.turkceKarakter(item.trX.toLowerCase()).indexOf(this.turkceKarakter(this.filterTermValuex)) != -1 ||
                this.turkceKarakter(item.ltX.toLowerCase()).indexOf(this.turkceKarakter(this.filterTermValuex)) != -1 ||
                this.turkceKarakter(item.enX.toLowerCase()).indexOf(this.turkceKarakter(this.filterTermValuex)) != -1
                ) {
                filteredList.push(item);
              }
    
            }
           
          }
        }
        if (filteredList.length > 0) {
         
          //this.searchCtrlChange(true);
          // filteredList = filteredList.sort(function (a, b) {
          //   if (a.trX < b.trX) { return -1; }
          //   if (a.trX > b.trX) { return 1; }
          //   return 0;
          // });
    
          //  filteredList = filteredList.filter((x, i, a) => a.indexOf(x) == i);
          //   console.log("filteredList",filteredList);
          // let q=[];
          // for(let ee of filteredList){
          //   for(let kk of ee.data){
          //     if(
          //       this.turkceKarakter(kk.trX.toLowerCase()).startsWith(this.turkceKarakter(this.filterTermValuex)) == true ||
        
          //       this.turkceKarakter(kk.enX.toLowerCase()).startsWith(this.turkceKarakter(this.filterTermValuex)) == true
    
          //     ){
          //       q.push(kk);
          //     }
             
          //   }
          // }
    
    
         //console.log(filteredList);
          return {"search":true,"liste":filteredList};
        }
        //console.timeEnd("sort");
        this.loadMoreLoading = false;
        //console.log(this.liste.slice(0, 25 * this.page));
        
        return  {"search":false,"liste":this.liste.slice(0, 20 * this.page)};
      }


}