package org.sid.ecommerce;

import static org.junit.Assert.*;

import java.util.List;

import javax.validation.constraints.AssertTrue;

import org.sid.ecommerce.entities.Categorie;
import org.sid.ecommerce.entities.Produit;
import org.sid.ecommerce.metier.*;
import org.junit.*; 
import org.springframework.context.support.*;

public class TestDAO {
	
	ClassPathXmlApplicationContext context;
		
		@Before
		public void setUp() throws Exception { 
			context=new ClassPathXmlApplicationContext(new String[]{"applicationContext.xml"});
		}
		
		@Test
		public void test1(){
					try {
					//assertTrue(true);
					IAdminCategoriesMetier metier=(IAdminCategoriesMetier) context.getBean("metier");
					List<Categorie> cats1=metier.listCategories();
					metier.ajouterCategorie(new Categorie("Ordinateurs", "Ordinateurs", null, "image.jpg"));
					metier.ajouterCategorie(new Categorie("Imprimantes", "Imprimantes", null, "image1.jpg"));
					List<Categorie> cats2=metier.listCategories();
					assertTrue(cats1.size()+2==cats2.size()); 
		} catch (Exception e) { assertTrue(e.getMessage(),false);}}
		
		@Test
		public void test2(){
					try {
					//assertTrue(true);
					IAdminCategoriesMetier metier=(IAdminCategoriesMetier) context.getBean("metier");
					List<Produit> prod1=metier.listproduits();
					metier.ajouterProduit(new Produit("HP45ERT", "HP7890", 6000,true,"image1.jpg", 50),1L);
					metier.ajouterProduit(new Produit("AZERTY", "HP7890", 6000,true,"image1.jpg", 50),2L);
					List<Produit> prod2=metier.listproduits();
					assertTrue(prod1.size()+2==prod2.size()); 
		} catch (Exception e) { assertTrue(e.getMessage(),false);}}
}