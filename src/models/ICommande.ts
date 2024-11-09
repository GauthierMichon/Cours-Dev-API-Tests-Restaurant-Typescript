export interface ICommande {
  commande_id?: number;
  reservation_id?: number;
  employe_id: number;
  date_commande: string;
  heure_commande: string;
  statut: string;
}
