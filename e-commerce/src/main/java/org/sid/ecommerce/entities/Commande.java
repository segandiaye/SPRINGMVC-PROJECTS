package org.sid.ecommerce.entities;

import java.io.Serializable;
import java.util.*;

import javax.persistence.*;
@Entity
public class Commande implements Serializable {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long idCommande;
	private Date dateCommande;
	@OneToMany(mappedBy="commande")
	private Collection<LigneCommande> ligneCommandes;
	@ManyToOne
	@JoinColumn(name="idClient")
	private Client client;
	// Getters et Setters
	// Cosntructeur sans paramètre
	// Cosntructeur avec paramètres
	public Long getIdCommande() {
		return idCommande;
	}
	public void setIdCommande(Long idCommande) {
		this.idCommande = idCommande;
	}
	public Date getDateCommande() {
		return dateCommande;
	}
	public void setDateCommande(Date dateCommande) {
		this.dateCommande = dateCommande;
	}
	public Client getClient() {
		return client;
	}
	public void setClient(Client client) {
		this.client = client;
	}
	public Collection<LigneCommande> getLigneCommandes() {
		return ligneCommandes;
	}
	public void setLigneCommandes(Collection<LigneCommande> ligneCommandes) {
		this.ligneCommandes = ligneCommandes;
	}
	public Commande() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Commande(Date dateCommande, Client client) {
		super();
		this.dateCommande = dateCommande;
		this.client = client;
	}
	
}