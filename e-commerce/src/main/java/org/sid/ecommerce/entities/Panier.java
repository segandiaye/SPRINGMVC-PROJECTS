package org.sid.ecommerce.entities;

import java.io.Serializable;
import java.util.*;
public class Panier implements Serializable {
private Map<Long, LigneCommande>  items=new HashMap<Long, LigneCommande>();
		public void addItem(Produit p, int quantite){
		LigneCommande lc=items.get(p.getIdProduit());
		if(lc==null){
		LigneCommande art=new LigneCommande();
		art.setProduit(p); art.setProduit(p);
		art.setQuantite(quantite);
		art.setPrix(p.getPrix());
		items.put(p.getIdProduit(), art);
		}
		else{
		lc.setQuantite(lc.getQuantite()+quantite);
		}
     }
		public Collection<LigneCommande> getItems(){
			return items.values();
			}
			public int getSize(){
				return items.size();
			}
			public double getTotal(){
				double total=0;
				for(LigneCommande lc:items.values()){
				total+=lc.getPrix()*lc.getQuantite();
			   }
				return total;
			}
			public void deleteItem(Long idproduit){
				items.remove(idproduit);
			}
}
