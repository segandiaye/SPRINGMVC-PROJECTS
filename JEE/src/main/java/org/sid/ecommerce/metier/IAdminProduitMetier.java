package org.sid.ecommerce.metier;

import org.sid.ecommerce.entities.Produit;
public interface IAdminProduitMetier extends InternauteBoutiqueMetier {
	public Long ajouterProduit(Produit  p, Long idCat);
	public void supprimerProduit(Long idP); 
	public void modifierProduit(Produit p); 
}