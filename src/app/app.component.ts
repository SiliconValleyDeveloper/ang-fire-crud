import { Component } from '@angular/core';
import { Firestore,collection,addDoc,collectionData, doc, updateDoc, deleteDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { __values } from 'tslib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang-fire';
  userData! :  Observable<any>;

  constructor(private firestore: Firestore) {
    this.getData();
  }


  addData (f:any){
    const collectionInstance =  collection(this.firestore,'users')
    addDoc(collectionInstance,f.value).then(() =>{
      console.log('Data added successfully');
    }).catch((err) =>{
      console.log(err);

    });



  }


  getData (){
    const collectionInstance = collection(this.firestore,'users');
    collectionData(collectionInstance, {idField: 'id'}).subscribe(value =>{
      console.log(value);

    })
    this.userData = collectionData(collectionInstance, {idField: 'id'});
  }


  updateData(id:string){
    const docInstance = doc(this.firestore,'users', id);
    const updateData={
      name: 'updated name'
    }

    updateDoc(docInstance,updateData).then(() =>{
      console.log('Data updated successfully');
    }).catch((err) =>{
      console.log(err); 
    });


  }

  deleteData(id:string){
    const docInstance = doc(this.firestore,'users', id);
    deleteDoc(docInstance).then(() =>{

      console.log('Data deleted successfully');
    }).catch((err) =>{
      console.log(err);
    });

  }

}
