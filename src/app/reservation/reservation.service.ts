import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];
  //crud

  constructor() {
    if (this.isBrowser()) {
      const savedReservations = localStorage.getItem('reservations');
      this.reservations = savedReservations
        ? JSON.parse(savedReservations)
        : [];
    }
  }
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }
  getReservation(id: string): Reservation | undefined {
    return this.reservations.find((res) => res.id === id);
  }
  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
  deleteReservation(id: string): void {
    let index = this.reservations.findIndex((res) => res.id === id);
    if (index !== -1) {
      this.reservations.splice(index, 1);
      localStorage.setItem('reservations', JSON.stringify(this.reservations));
    }
  }

  updateReservation(id: string, updateReservation: Reservation): void {
    let index = this.reservations.findIndex((res) => res.id === id);
    updateReservation.id = id;
    this.reservations[index] = updateReservation;
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
    console.log(this.reservations, id);
  }
}
