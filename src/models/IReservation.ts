export interface IReservation {
  reservation_id?: number;
  client_id: number;
  table_id: number;
  date_reservation: string;
  heure_reservation: string;
  nombre_personnes: number;
}
