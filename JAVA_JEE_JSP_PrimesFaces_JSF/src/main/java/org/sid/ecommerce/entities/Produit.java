package org.sid.ecommerce.entities;

import java.io.Serializable; 

import javax.persistence.*;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;
@Entity
@Table(name="produits")
public class Produit implements Serializable {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long idProduit;
	@NotEmpty
	@Size(min=4,max=15)
	private String designation ; 
	private String description;
	private double prix; 
	private boolean selectionne;
	private String photo;
	private int quantite;  
	@ManyToOne()
	@JoinColumn(insertable=false,updatable=false,name="idCategorie")
	private Categorie categorie;
	// Getters et Setters
	// Cosntructeur sans param�tre
	// Cosntructeur avec param�tres
	public Long getIdProduit() {
		return idProduit;
	}
	public void setIdProduit(Long idProduit) {
		this.idProduit = idProduit;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public double getPrix() {
		return prix;
	}
	public void setPrix(double prix) {
		this.prix = prix;
	}
	public boolean isSelectionne() {
		return selectionne;
	}
	public void setSelectionne(boolean selectionne) {
		this.selectionne = selectionne;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public int getQuantite() {
		return quantite;
	}
	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}
	public Categorie getCategorie() {
		return categorie;
	}
	public void setCategorie(Categorie categorie) {
		this.categorie = categorie;
	}
	public Produit() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Produit(String designation, String description, double prix,
			boolean selectionne, String photo, int quantite) {
		super();
		this.designation = designation;
		this.description = description;
		this.prix = prix;
		this.selectionne = selectionne;
		this.photo = photo;
		this.quantite = quantite;
	}
	
	
}
