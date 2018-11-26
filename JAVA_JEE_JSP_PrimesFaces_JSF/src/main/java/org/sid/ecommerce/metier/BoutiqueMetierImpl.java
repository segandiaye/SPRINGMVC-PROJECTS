package org.sid.ecommerce.metier;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.sid.ecommerce.dao.*;
import org.sid.ecommerce.entities.*;

@Transactional
public class BoutiqueMetierImpl implements IAdminCategoriesMetier{
	private IBoutiqueDao dao;
	
	public void setDao(IBoutiqueDao dao) {
		this.dao = dao;
	}
	
	@Override
	public Long ajouterProduit(Produit p, Long idCat) {
		return dao.ajouterProduit(p, idCat);
	}
	
	@Override
	public void supprimerProduit(Long idP) {
		dao.supprimerProduit(idP);
	}
	
	@Override
	public void modifierProduit(Produit p) {
		dao.modifierProduit(p);
	}
	
	@Override
	public List<Categorie> listCategories() {
		return dao.listCategories();
	}
	
	@Override
	public Categorie getCategorie(Long idCat) {
		return dao.getCategorie(idCat);
	}
	
	@Override
	public List<Produit> listproduits() {
		return dao.listproduits();
	}
	
	@Override
	public List<Produit> produitsParMotCle(String mc) {
		return dao.produitsParMotCle(mc);
	}
	
	@Override
	public List<Produit> produitsParCategorie(Long idCat) {
		return dao.produitsParCategorie(idCat);
	}
	
	@Override
	public List<Produit> produitsSelectionnes() {
		return dao.produitsSelectionnes();
	}
	
	@Override
	public Produit getProduit(Long idP) {
		return dao.getProduit(idP);
	}
	
	@Override
	public Commande enregistrerCommande(Panier p, Client c) {
		return dao.enregistrerCommande(p, c);
	}
	
	@Override
	public Long ajouterCategorie(Categorie c) {
		return dao.ajouterCategorie(c);
	}
	
	@Override
	public void supprimerCategrorie(Long idcat) {
		dao.supprimerCategrorie(idcat);
	}
	
	@Override
	public void modifierCategorie(Categorie c) {
		dao.modifierCategorie(c);
	}
	
	@Override
	public void ajouterUser(User u) {
		dao.ajouterUser(u);
	}
	
	@Override
	public void attribuerRole(Role r, Long userID) {
		dao.attribuerRole(r, userID);
	}
}