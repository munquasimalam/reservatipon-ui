import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';
import { ReservationService, ReservationRequest, Reservation} from './reservation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private reservationmService:ReservationService){
    this.getReservations();
  }

  title = 'reservation-app';
rooms:Room[];
roomSearchForm:FormGroup;
currentCheckInVal:string;
currentCheckOutVal:string;
currentRoomNumber:number;
currentPrice:number;
currentReservations:Reservation[];


createReservation(){
  this.reservationmService.createReservation(
    new ReservationRequest( this.currentRoomNumber, this.currentCheckInVal,this.currentCheckOutVal, this.currentPrice)
  ).subscribe(postResult=>{
    console.log(postResult);
    this.getReservations();
  })

}

getReservations(){
  this.reservationmService.getAllReservation().subscribe(result=>{
    console.log(result);
    this.currentReservations = result;
  });
}

ngOnInit(){
  this.roomSearchForm = new FormGroup({
 checkin:new FormControl(''),
 checkout:new FormControl(''),
 roomNumber:new FormControl('')
  });
  this.roomSearchForm.valueChanges.subscribe(form=>{
    this.currentCheckInVal=form.checkin;
    console.log(form.checkin);
    this.currentCheckOutVal=form.checkout;
    console.log(form.checkout);
    if(form.roomNumber){
      let roomValues :string[] = form.roomNumber.split('|');
      this.currentRoomNumber= Number(roomValues[0]);
      this.currentPrice = Number(roomValues[1]);
      console.log(roomValues);
    }
    
  });

  this.rooms=[new Room("1","100","10000"),
  new Room("2","200","20000"),
  new Room("3","300","30000")];
}

  
} 

export class Room {
  id:string;
  roomNumber:string;
  price:string

  constructor( id:string, roomNumber:string,price:string){
    this.id=id;
    this.roomNumber=roomNumber;
    this.price= price

  }
}
