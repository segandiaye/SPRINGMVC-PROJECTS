package org.sid.ecommerce.metier;

import org.sid.ecommerce.entities.*;
public interface IAdminCategoriesMetier extends IAdminProduitMetier {
	public Long ajouterCategorie(Categorie c);
	public void supprimerCategrorie(Long idcat);
	public void modifierCategorie(Categorie c);
	public void ajouterUser(User u);
	public void attribuerRole(Role r,Long userID);
}
