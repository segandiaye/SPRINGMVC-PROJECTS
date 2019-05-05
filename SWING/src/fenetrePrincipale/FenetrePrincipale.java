package fenetrePrincipale;

import observer.Observateur;
import montre.Horloge;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;

import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.border.EmptyBorder;

import org.jdom.Attribute;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.ResultSet;
import com.mysql.jdbc.ResultSetMetaData;
import com.mysql.jdbc.Statement;

public class FenetrePrincipale extends JFrame 
{
	private static final long serialVersionUID = 1L;
	
	
	static Connection con;
	static Statement st;
	static ResultSet rs;

	private Horloge horloge;
	JTable tableau;
	 JButton btnNewButton;
	 JTextField textField;
	 JTextField textField_1;
	 JTextField textField_2;
	 JTextField textField_3;
	 JTextField textField_4;
	 JTextField textField_5;
	 JTextField textField_6;
	 JTextField textFieldve;
	 JTextField textFieldve_1;
	 JTextField textFieldve_2;
	 JTextField  textFieldve_3;
	 JLabel lblIlAPour;
	 JLabel lblPourPrnom ;
	 JLabel lblNumroDeCarte;
	 JLabel lblVeuillezRemplirToutes;
	 JTextField textFieldB;
	 JLabel lblEntrerUnNumro;
	 JLabel lblNewLabel ;
	 JPanel contentPane;
	 JButton btnBibliothque;
     JLabel lblProjetImportationDes;
	 JDialog  dialog;
	 JDialog  dialog2;
	 JDialog  dialog3;
	 JDialog  dialog4;
	 JDialog  dialog5;
	 JPanel panel_1;
	 JPanel panel;
	 JButton btnVrifier;
	 JLabel lblEntrezUnNumro;
	 JButton btnVoirLaListe;
	 JButton btnVoirLaListe_1;
	 JLabel lblFacult ;
	 JLabel lblNom;
	 JLabel lblEntrezUnNumero;
	 JLabel lblNo ;
	 JLabel lblPrnom;
	 JLabel lblLieuDeNaissance;
	 JButton btnEnregistrer;
	 JLabel lblNumroExisteDj;
	 JLabel labelv;
	 JLabel labelv_1;
	 JLabel labelv_2;
	 private JLabel label = new JLabel();
	public  FenetrePrincipale(String title) 
	{
		this.setTitle(title);
		setAlwaysOnTop(true);
		setIconImage(Toolkit.getDefaultToolkit().getImage("C:\\Users\\Public\\Pictures\\Sample Pictures\\youclip.MP4_000015200.jpg"));
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(0, 0, 600,400);
		contentPane = new JPanel();
		contentPane.setBackground(Color.PINK);
		
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		btnNewButton = new JButton("Scolarité");
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try
				{
				lanceDialogSCO();
				}catch(Exception er){System.out.println("Erreur "+er.getMessage());}
				
			}
		});
		
		btnNewButton.setFont(new Font("Tahoma", Font.PLAIN, 16));
		btnNewButton.setBackground(Color.BLUE);
		btnNewButton.setForeground(Color.GREEN);
		btnNewButton.setBounds(62, 202, 173, 65);
		contentPane.add(btnNewButton);
		
		btnBibliothque = new JButton("Bibliothéque");
		btnBibliothque.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try
				{
				lanceDialogBU();
				
				}catch(Exception er){System.out.println("Erreur "+er.getMessage());}	
			}
		});
		
		btnBibliothque.setFont(new Font("Tahoma", Font.PLAIN, 16));
		btnBibliothque.setBackground(Color.BLUE);
		btnBibliothque.setForeground(Color.GREEN);
		btnBibliothque.setBounds(354, 202, 164, 65);
		contentPane.add(btnBibliothque);
		
		lblProjetImportationDes = new JLabel("Projet: Importation des données d'une base vers autre");
		lblProjetImportationDes.setFont(new Font("Tahoma", Font.PLAIN, 16));
		lblProjetImportationDes.setBackground(Color.BLUE);
		lblProjetImportationDes.setForeground(Color.BLUE);
		lblProjetImportationDes.setBounds(60, 105, 432, 39);
		contentPane.add(lblProjetImportationDes); 
		
	    
	    this.horloge = new Horloge();
	    this.horloge.addObservateur(new Observateur()
	    {
	        public void update(String hour) 
	        {
	          label.setText(hour);
	        }
	     });
	    
	      Font police = new Font("DS-digital", Font.TYPE1_FONT, 40);
	      this.label.setBackground(Color.WHITE);
	      this.label.setFont(police);
	      label.setBounds(150, 30, 300, 40);
	      this.label.setHorizontalAlignment(JLabel.CENTER);
	       
	      contentPane.add(label);
	      
	      this.setVisible(true);
	      this.horloge.run();
	      
	      
	    }
		
		
	
	  public static void main(String[] args) 
	    {
	        new FenetrePrincipale(" Séga NDIAYE ").setVisible(true);
	    }

	  
	  
	  
	 public void lanceDialogSCO( )
	   	 { 
		 
		 dialog = new JDialog( this," Scolarité ",true);
	   	 
		    dialog.setBackground(Color.LIGHT_GRAY);
		    dialog.setBounds(100, 100, 450, 500);
			dialog .setLayout(null);
			
			JLabel lblEntrezUnNumero = new JLabel("Numéro de Carte");
			lblEntrezUnNumero.setFont(new Font("Traditional Arabic", Font.PLAIN, 14));
			lblEntrezUnNumero.setBounds(0, 7, 171, 35);
			dialog .add(lblEntrezUnNumero);
			
			textField = new JTextField();
			textField.setBounds(173, 11, 191, 26);
			dialog .add(textField);
			textField.setColumns(10);
			
			
			
			JLabel lblNo = new JLabel("Entrez un numero de Tel");
			lblNo.setFont(new Font("Tahoma", Font.PLAIN, 14));
			lblNo.setBounds(0, 53, 159, 20);
			dialog.add(lblNo);
			
			textField_1 = new JTextField();
			textField_1.setBounds(173, 48, 191, 26);
			dialog .add(textField_1);
			textField_1.setColumns(10);
			
			textField_2 = new JTextField();
			textField_2.setBounds(173, 85, 191, 26);
			dialog.add(textField_2);
			textField_2.setColumns(10);
			
			textField_3 = new JTextField();
			textField_3.setBounds(173, 118, 191, 26);
			dialog.add(textField_3);
			textField_3.setColumns(10);
			
			textField_4 = new JTextField();
			textField_4.setBounds(173, 154, 191, 26);
			dialog.add(textField_4);
			textField_4.setColumns(10);
			
			textField_5 = new JTextField();
			textField_5.setBounds(173, 191, 191, 26);
			dialog.add(textField_5);
			textField_5.setColumns(10);
			
			JLabel lblNom = new JLabel("Nom");
			lblNom.setFont(new Font("Tahoma", Font.PLAIN, 14));
			lblNom.setBounds(0, 84, 66, 26);
			dialog.add(lblNom);
			
			JLabel lblPrnom = new JLabel("Prénom");
			lblPrnom.setFont(new Font("Tahoma", Font.PLAIN, 14));
			lblPrnom.setBounds(0, 124, 66, 20);
			dialog.add(lblPrnom);
			
			JLabel lblLieuDeNaissance = new JLabel("Lieu de naissance");
			lblLieuDeNaissance.setFont(new Font("Tahoma", Font.PLAIN, 14));
			lblLieuDeNaissance.setBounds(0, 161, 139, 20);
			dialog.add(lblLieuDeNaissance);
			
			JLabel lblFacult = new JLabel("Faculté");
			lblFacult.setFont(new Font("Tahoma", Font.PLAIN, 14));
			lblFacult.setBounds(0, 197, 66, 20);
			dialog.add(lblFacult);
			
			JButton btnVoirLaListe = new JButton("Voir La Liste SCO");
			btnVoirLaListe.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e) {
					try{
					lanceDialogVoirList();
					dialog3.dispose();
					}catch(Exception er){er.getMessage();}
				}
			});
			btnVoirLaListe.setForeground(Color.RED);
			btnVoirLaListe.setBackground(Color.MAGENTA);
			btnVoirLaListe.setBounds(208, 399, 139, 23);
			dialog .add(btnVoirLaListe);
			
			JButton btnEnregistrerLaBase = new JButton("Ajoutez et Enrégistrer dans le fichier XML");
			btnEnregistrerLaBase.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e) {
					
					try {  
						Class.forName("com.mysql.jdbc.Driver").newInstance ( ) ;
						}
						catch (Exception er){System.out .println("Erreur driver:  "+er.getMessage ( ) ) ;}
						
							
							try {con = (Connection) DriverManager.getConnection ("jdbc:mysql://
							/Scolarite", "user","") ;
							}
							catch (Exception ez ){System.out.println("Erreur de connexion "+ ez.getMessage ( ));}
						
						
						try {  
							  st = (Statement) con.createStatement() ;
						     }
						catch (SQLException t){System.out.println ("Erreur de Statement "+t.getMessage());}
						
							try {
									rs = (ResultSet) st.executeQuery("select * from etudiants") ;
									
									
									while(rs.next())
									{
										if((textField).equals(rs.getString(1)))
										{lblNumroExisteDj.setText("Numéro déjà attribué");}
										else{lanceDialogEnXML();}
										
									}
									
						}
							catch (Exception er)  {System.out .println("Erreur ResultSet "+er.getMessage ( ) ); }
						
						finally {
							   try {
									rs.close ( ) ;       
									st.close ( );       
									con.close ( );
								   }
							      catch (Exception er) { }
							    }
					
					}
			});
			btnEnregistrerLaBase.setBackground(Color.PINK);
			btnEnregistrerLaBase.setForeground(Color.RED);
			btnEnregistrerLaBase.setBounds(146, 250, 244, 35);
			dialog .add(btnEnregistrerLaBase);
			
			JLabel lblVoirLaListe = new JLabel("Voir la liste BD Scolarité clic ici");
			lblVoirLaListe.setBounds(40, 403, 154, 14);
			dialog .add(lblVoirLaListe);
			
			lblNumroExisteDj = new JLabel("");
			lblNumroExisteDj.setForeground(Color.BLUE);
			lblNumroExisteDj.setBackground(Color.LIGHT_GRAY);
			lblNumroExisteDj.setFont(new Font("Tahoma", Font.PLAIN, 14));
			lblNumroExisteDj.setBounds(103, 338, 233, 26);
			dialog .add(lblNumroExisteDj);
			
			lblVeuillezRemplirToutes = new JLabel("");
			lblVeuillezRemplirToutes.setForeground(Color.RED);
			lblVeuillezRemplirToutes.setFont(new Font("Tahoma", Font.PLAIN, 13));
			lblVeuillezRemplirToutes.setBounds(69, 313, 257, 14);
			dialog.add(lblVeuillezRemplirToutes);
			
			
			dialog.setVisible(true);
	   	 }
	  
	  public void lanceDialogBU( )
	   	 { 
		  
		  dialog2 = new JDialog( this," Bibliotheque ",true);
		  dialog2.setBounds(100, 100, 450, 500);
		
			dialog2.setLayout(null);
			
			JPanel panel_1 = new JPanel();
			panel_1.setBounds(174, 20, 0, 0);
			dialog2.add(panel_1);
			panel_1.setLayout(new GridLayout(1, 0, 0, 0));
			
			JPanel panel = new JPanel();
			panel.setBounds(179, 19, 1, 1);
			dialog2.add(panel);
			panel.setLayout(null);
			
			JLabel lblVrification = new JLabel("Vérifier ou Importer tout");
			lblVrification.setBackground(Color.BLUE);
			lblVrification.setBounds(153, 10, 183, 20);
			lblVrification.setForeground(Color.BLUE);
			lblVrification.setFont(new Font("Tahoma", Font.PLAIN, 16));
			dialog2.add(lblVrification);
			
			lblEntrerUnNumro = new JLabel("");
			lblEntrerUnNumro.setForeground(Color.RED);
			lblEntrerUnNumro.setBackground(Color.RED);
			lblEntrerUnNumro.setFont(new Font("Tahoma", Font.PLAIN, 14));
			lblEntrerUnNumro.setBounds(98, 194, 297, 23);
			dialog2.add(lblEntrerUnNumro);
			
			textFieldB = new JTextField();
			textFieldB.setBounds(208, 100, 198, 34);
			dialog2.add(textFieldB);
			textFieldB.setColumns(10);
			
			JButton btnVrifier = new JButton("Choisir qui importé");
			btnVrifier.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e) {
					 try{
	                	 
		 					
	                	 try {  
	         				Class.forName("com.mysql.jdbc.Driver").newInstance ( ) ;
	         				}
	         				catch (Exception es){System.out .println("Erreur driver:  "+es.getMessage ( ) ) ;}
	         				
	         					
	         					try
	         					{
	         						con = (Connection) DriverManager.getConnection ("jdbc:mysql://localhost/Scolarite", "user","cccccc") ;
	         					}
	         					catch (Exception ez ){System.out.println("Erreur de connexion "+ ez.getMessage ( ));}
	         				
	         				
	         				try {  
	         					  st = (Statement) con.createStatement() ;
	         				     }
	         				catch (SQLException t){System.out.println ("Erreur de Statement "+t.getMessage());}
	         				
	         					try {
	 	
	         							rs = (ResultSet) st.executeQuery("select * from etudiants") ;
	         							
	         							String numC=textFieldB.getText();
	         							
	         							while(rs.next())
	         							{
	         								
	         								if(numC.equals(rs.getString(1)))
	         								{	         									
	         									lanceDialogVerifier();
	         									dialog5.dispose();
	         								}
	         								else if(numC.equals("")){lblEntrerUnNumro.setText("Vous n'avez pas saisi de Numéro de carte"); }
		         								else
		         								{
		         									lblEntrerUnNumro.setText("Désoler impossible d'importer car l'étudiant nexiste pas dans Scolarité");
		         								}
	         							}      							
	         				}
	         					catch (Exception er)  {System.out .println("Erreur ResultSet "+er.getMessage ( ) ); }
	         				
	         				finally {
	         					   try {
	         							rs.close ( ) ;       
	         							st.close ( );       
	         							con.close ( );
	         						   }
	         					      catch (Exception es) { }
	         				}
							
						}catch(Exception er){er.getMessage();}
						
				}
			});
			btnVrifier.setBackground(Color.CYAN);
			btnVrifier.setForeground(Color.RED);
			btnVrifier.setFont(new Font("Tahoma", Font.PLAIN, 16));
			btnVrifier.setBounds(208, 145, 198, 23);
			dialog2.add(btnVrifier);
			
			JButton btnParcourirToutLe = new JButton("Parcourir tout le fichier XML de la Scolarit\u00E9 et Importer tout");
			btnParcourirToutLe.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e) {
					
					try 
					{  
						Class.forName("com.mysql.jdbc.Driver").newInstance ( ) ;
					}
					catch (Exception er)
					{
						System.out .println("Erreur driver:  "+er.getMessage ( ) ) ;
					}
					try 
					{
						con =(Connection) DriverManager.getConnection ("jdbc:mysql://localhost/Bibliotheque","user","cccccc") ;
					}
					catch (Exception ez )
					{
						System.out.println("Erreur de connexion "+ ez.getMessage ( ));
					}
					try 
					{  
						st = (Statement) con.createStatement() ;
					}
					catch (SQLException t)
					{	
						System.out.println ("Erreur de Statement "+t.getMessage());
					}
					try 
					{ 
				           
						
						SAXBuilder builder = new SAXBuilder(); 
						builder.setIgnoringElementContentWhitespace(true); 
						Document document = builder.build(new File("C:/workspace/ProjetScoBu/Scolarite.xml")); 
						Element Racine = document.getuserElement(); 	
						Element etudiants=Racine.getChild("etudiants");
						
						List<?> etudiant = etudiants.getChildren();
						Iterator<?> iterator1 = etudiant.iterator();
						int a=etudiant.size();
						for(int i=0;i<a;i++)
						{
							Element elementFils1 = (Element) iterator1.next();
							List<?> fils2 = elementFils1.getChildren();
							Iterator<?> iterator2 = fils2.iterator();
							int b=fils2.size();
							String id = null,nom = null,prenom = null,Faculte = null;
							for(int j=0;j<b;j++)
							{ 					
								Element elementFils2 = (Element) iterator2.next(); 
								if(j==1)
									id=elementFils2.getText();
								if(j==2)
									nom=elementFils2.getText();
								if(j==3)
									prenom=elementFils2.getText();
								if(j==5)
									Faculte=elementFils2.getText();
							}
							
							try 
							{
								
								
								StringBuilder c = new StringBuilder(""+id);
									
								st.executeUpdate("INSERT INTO etudiant  VALUES ('"+c.append(2014)+"', '"+nom+"', '"+prenom+"', '"+Faculte+"')");
								
							}
							catch (Exception er)  
							{
								System.out .println("Erreur ResultSet "+er.getMessage ( ) ); 
							}
						}
					} 
					catch (JDOMException er) 
					 {er.printStackTrace(System.out); } 
					catch (IOException er) 
					{	 er.printStackTrace(System.out); } 
				}
			});
			btnParcourirToutLe.setBackground(Color.RED);
			btnParcourirToutLe.setForeground(Color.BLUE);
			btnParcourirToutLe.setFont(new Font("Tahoma", Font.PLAIN, 12));
			btnParcourirToutLe.setBounds(40, 324, 370, 45);
			dialog2.add(btnParcourirToutLe);
			
			JLabel lblEntrezUnNumro = new JLabel("Entrez un num\u00E9ro de Carte");
			lblEntrezUnNumro.setFont(new Font("Tahoma", Font.PLAIN, 13));
			lblEntrezUnNumro.setBounds(10, 100, 188, 34);
			dialog2.add(lblEntrezUnNumro);
			
			JButton btnVoirLaListe = new JButton("Voir la Liste BU");
			btnVoirLaListe.setBounds(10, 228, 58, 0);
			dialog2.add(btnVoirLaListe);
			
			JButton btnVoirLaListe_1 = new JButton("Voir la liste BU");
			btnVoirLaListe_1.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e) {
					try{
						lanceDialogVoirListBU();
						dialog4.dispose();
					}catch(Exception er){er.getMessage();}
				}
			});
			btnVoirLaListe_1.setFont(new Font("Tahoma", Font.PLAIN, 13));
			btnVoirLaListe_1.setForeground(Color.BLUE);
			btnVoirLaListe_1.setBackground(Color.RED);
			btnVoirLaListe_1.setBounds(20, 217, 132, 23);
			dialog2.add(btnVoirLaListe_1);
			
			lblNewLabel = new JLabel("");
			lblNewLabel.setForeground(Color.RED);
			lblNewLabel.setFont(new Font("Tahoma", Font.PLAIN, 13));
			lblNewLabel.setBounds(0, 61, 434, 20);
			dialog2.add(lblNewLabel);
			
			
			dialog2.setVisible(true);
	   	 }
	  public void lanceDialogVoirList()
	   	 { 
		  setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		  dialog3 = new JDialog( this," Liste des étudiants dans la base Scolarité ",true);
		  dialog3.setSize(600,900);
		  
			try {  
				Class.forName("com.mysql.jdbc.Driver").newInstance ( ) ;
				}
				catch (Exception es){System.out .println("Erreur driver:  "+es.getMessage ( ) ) ;}
				
					
					try
					{
						con = (Connection) DriverManager.getConnection ("jdbc:mysql://localhost/Scolarite", "user","cccccc") ;
					}
					catch (Exception ez ){System.out.println("Erreur de connexion "+ ez.getMessage ( ));}
				
				
				try {  
					  st = (Statement) con.createStatement() ;
				     }
				catch (SQLException t){System.out.println ("Erreur de Statement "+t.getMessage());}
				
					try {
							rs = (ResultSet) st.executeQuery("select * from etudiants") ;
							ResultSetMetaData resultMeta = (ResultSetMetaData) rs.getMetaData();
							
							Object[] column = new  Object[resultMeta.getColumnCount()];
							for(int i = 1 ; i <= resultMeta.getColumnCount(); i++)
							column[i-1] = resultMeta.getColumnName(i);
							
							rs.last();
							@SuppressWarnings("unused")
							int rowCount = rs.getRow();
							Object[][] data = new  Object[rs.getRow()][resultMeta.getColumnCount()];
						
							rs.beforeFirst();
							
							int j = 1;
							while(rs.next())
							{
								
								
								
						        for(int i = 1 ; i <= resultMeta.getColumnCount(); i++)
						        	data[j-1][i-1] = rs.getObject(i);
						        	j++;
						        	
						        	tableau = new JTable(data,column);
								    tableau.setRowHeight(30);
								    tableau.setBackground(Color.orange);							    
								    
								    dialog3.add(tableau.getTableHeader(), BorderLayout.NORTH);
								    dialog3.add(tableau, BorderLayout.CENTER);
								    
							}
							
						    dialog3.setVisible(true);	pack();		
				}
					catch (Exception er)  {System.out .println("Erreur ResultSet "+er.getMessage ( ) ); }
				
				finally {
					   try {
							rs.close ( ) ;       
							st.close ( );       
							con.close ( );
						   }
					      catch (Exception es) { }
				}
		  
	   	 }
	  
	  @SuppressWarnings("static-access")
	public void lanceDialogEnXML( )
	   	 { 
		  
		  try 
			{  
				Class.forName("com.mysql.jdbc.Driver").newInstance ( ) ;
			}
			catch (Exception e)
			{	System.out .println("Erreur driver:  "+e.getMessage ( ) ) ;	}
			try 
			{
				con =(Connection) DriverManager.getConnection ("jdbc:mysql://localhost/Scolarite","user","cccccc") ;
			}
			catch (Exception ez )
			{	System.out.println("Erreur de connexion "+ ez.getMessage ( ));	}
			try 
			{  

				st = (Statement) con.createStatement() ;
				if(
						textField.getText().equals("")||
						textField_1.getText().equals("")||
						textField_2.getText().equals("")||
						textField_3.getText().equals("")||
						textField_4.getText().equals("")||
						textField_5.getText().equals(""))
						{
						lblVeuillezRemplirToutes.setText("Veuillez remplir tous les champs");
						}
				     else{
						
				st.executeUpdate("INSERT INTO etudiants  VALUES ('"+textField.getText()+"', '"
      					+textField_1.getText()+"','"+textField_2.getText()+"','"+textField_3.getText()+"',"+
      					" '"+textField_4.getText()+"','"+textField_5.getText()+"')");}
			}
			catch (SQLException t)			
			{	System.out.println ("Erreur de Statement "+t.getMessage());	}
			
			try 
			{
				Element Scolarite = new Element("Scolarite"); 
				Document document = new Document(Scolarite); 
				Element etudiants = new Element("etudiants"); 
				Scolarite.addContent(etudiants); 
				rs = (ResultSet) st.executeQuery("select * from etudiants") ;

				while (rs.next() )
				{										
					Element etudiant = new Element("etudiant"); 
					etudiants.addContent(etudiant);
					
					String s= (String) rs.getObject(1);
					Attribute id = new Attribute("id",""+s);
					etudiant.setAttribute(id);
			
					Element numero_carte_etudiant = new Element("num_carte_etudiant").setText(""+rs.getObject (1)); 
					Element numero_tel_etudiant = new Element("num_tel_etudiant").setText(""+rs.getObject (2));
					Element nom_etudiant = new Element("nom_etudiant").setText(""+rs.getObject (3)); 
					Element prenom_etudiant = new Element("prenom_etudiant").setText(""+rs.getObject (4));
					Element lieu_de_naissance_etudiant = new Element("lieu_de_naissance_etudiant").setText(""+rs.getObject (5));
					Element Faculte = new Element("Faculte").setText(""+rs.getObject (6));
					etudiant.addContent(numero_carte_etudiant); 
					etudiant.addContent(numero_tel_etudiant);
					etudiant.addContent(nom_etudiant); 
					etudiant.addContent(prenom_etudiant); 
					etudiant.addContent(lieu_de_naissance_etudiant);
					etudiant.addContent(Faculte);
					Format format = Format.getPrettyFormat(); 
					format.setEncoding("UTF-8"); 
					XMLOutputter sortie = new XMLOutputter(format);
					
					                                        sortie.output(document, System.out);
					
					FileOutputStream fic = null; 
					try 
					{ 
						fic = new FileOutputStream("Scolarite.xml"); 
						OutputStreamWriter out = new OutputStreamWriter(fic, "UTF-8"); 
						sortie.output(document, out); 
					} 
					catch (IOException e) {e.printStackTrace(); }
					
					
					finally 
					{ 
						if (fic!= null) 
						{ 
							try 
							{ 
								fic.close();  
							}
							catch (IOException e) 
							{e.printStackTrace(); } 
						 } 					
					}					
				}
			}		   
			catch (Exception er)  
			{	System.out .println("Erreur ResultSet "+er.getMessage ( ) ); }
			try 
			{
				rs.close ( ) ;
				st.close ( );       
				con.close ( );
			}
			catch (Exception d) {}
		 }
	  public void lanceDialogVoirListBU()
	   	 { 
		  setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		  dialog4 = new JDialog( this," Liste des étudiants dans la base Scolarité ",true);
		  dialog4.setSize(600,900);
		  
			try {  
				Class.forName("com.mysql.jdbc.Driver").newInstance ( ) ;
				}
				catch (Exception es){System.out .println("Erreur driver:  "+es.getMessage ( ) ) ;}
				
					
					try
					{
						con = (Connection) DriverManager.getConnection ("jdbc:mysql://localhost/Bibliotheque", "user","cccccc") ;
					}
					catch (Exception ez ){System.out.println("Erreur de connexion "+ ez.getMessage ( ));}
				
				
				try {  
					  st = (Statement) con.createStatement() ;
				     }
				catch (SQLException t){System.out.println ("Erreur de Statement "+t.getMessage());}
				
					try {
							rs = (ResultSet) st.executeQuery("select * from etudiant") ;
							ResultSetMetaData resultMeta = (ResultSetMetaData) rs.getMetaData();
							
							Object[] column = new  Object[resultMeta.getColumnCount()];
							for(int i = 1 ; i <= resultMeta.getColumnCount(); i++)
							column[i-1] = resultMeta.getColumnName(i);
							
							rs.last();
							@SuppressWarnings("unused")
							int rowCount = rs.getRow();
							Object[][] data = new  Object[rs.getRow()][resultMeta.getColumnCount()];
						
							rs.beforeFirst();
							
							int j = 1;
							while(rs.next())
							{
								
								
								
						        for(int i = 1 ; i <= resultMeta.getColumnCount(); i++)
						        	data[j-1][i-1] = rs.getObject(i);
						        	j++;
						        	
						        	tableau = new JTable(data,column);
								    tableau.setRowHeight(30);
								    tableau.setBackground(Color.orange);							    
								    
								    dialog4.add(tableau.getTableHeader(), BorderLayout.NORTH);
								    dialog4.add(tableau, BorderLayout.CENTER);
								    pack();
							}
							
						    dialog4.setVisible(true);
				}
					catch (Exception er)  {System.out .println("Erreur ResultSet "+er.getMessage ( ) ); }
				
				finally {
					   try {
							rs.close ( ) ;       
							st.close ( );       
							con.close ( );
						   }
					      catch (Exception es) { }
				}
		  
	   	 }
	 
	  public void lanceDialogVerifier()
	   	 { 
		     dialog5 = new JDialog( this," Importation",true);
		     dialog5.setBounds(100, 100, 450, 300);
		     dialog5.setLayout(null);
				
		     JLabel lblVoulezvousLexporter = new JLabel("Voulez-vous l'importer?");
				lblVoulezvousLexporter.setForeground(Color.RED);
				lblVoulezvousLexporter.setFont(new Font("Tahoma", Font.PLAIN, 14));
				lblVoulezvousLexporter.setBounds(170, 176, 164, 14);
				dialog5.add(lblVoulezvousLexporter);
				
				JLabel lblLtudiantExisteIl = new JLabel("L'\u00E9tudiant existe il a:");
				lblLtudiantExisteIl.setForeground(Color.RED);
				lblLtudiantExisteIl.setBackground(Color.LIGHT_GRAY);
				lblLtudiantExisteIl.setFont(new Font("Tahoma", Font.PLAIN, 14));
				lblLtudiantExisteIl.setBounds(153, 24, 144, 21);
				dialog5.add(lblLtudiantExisteIl);
				
				JLabel lblIlAPourTel = new JLabel("pour Téléphone");
				lblIlAPourTel.setFont(new Font("Tahoma", Font.PLAIN, 13));
				lblIlAPourTel.setBounds(10, 56, 91, 14);
				dialog5.add(lblIlAPourTel);
				
				JLabel lblPournom = new JLabel("Pour nom");
				lblPournom.setFont(new Font("Tahoma", Font.PLAIN, 12));
				lblPournom.setBounds(10, 81, 82, 14);
				dialog5.add(lblPournom);
				
				JLabel lblPourPrnom = new JLabel("Pour prenom");
				lblPourPrnom.setFont(new Font("Tahoma", Font.PLAIN, 12));
				lblPourPrnom.setBounds(10, 120, 109, 14);
				dialog5.add(lblPourPrnom);
				
				JButton btnOui = new JButton("Oui");
				btnOui.addActionListener(new ActionListener() {
					public void actionPerformed(ActionEvent e) {
						
						try 
						{  
							Class.forName("com.mysql.jdbc.Driver").newInstance ( ) ;
						}
						catch (Exception er)
						{
							System.out .println("Erreur driver:  "+er.getMessage ( ) ) ;
						}
						try 
						{
							con =(Connection) DriverManager.getConnection ("jdbc:mysql://localhost/Bibliotheque","user","cccccc") ;
						}
						catch (Exception ez )
						{
							System.out.println("Erreur de connexion "+ ez.getMessage ( ));
						}
						try 
						{  
							st = (Statement) con.createStatement() ;
						}
						catch (SQLException t)
						{	
							System.out.println ("Erreur de Statement "+t.getMessage());
						}
						try 
						{ 
					           
							
						
								try 
								{
									StringBuilder c = new StringBuilder(""+textFieldve.getText());
										
						st.executeUpdate("INSERT INTO etudiant  VALUES ('"+c.append(2014)+"', " +
								"'"+textFieldve_1.getText()+"', '"+textFieldve_2.getText()+"', '"+textFieldve_3.getText()+"')");
									
								}
								catch (Exception er)  
								{
									System.out .println("Erreur ResultSet "+er.getMessage ( ) ); 
								}
							
						} 
						catch (Exception er) 
						 {er.printStackTrace(System.out); } 
						dialog5.dispose();
					}
				});
				btnOui.setBackground(Color.BLUE);
				btnOui.setForeground(Color.WHITE);
				btnOui.setFont(new Font("Tahoma", Font.PLAIN, 16));
				btnOui.setBounds(106, 213, 71, 23);
				dialog5.add(btnOui);
				
				JButton btnNon = new JButton("Non");
				btnNon.addActionListener(new ActionListener() {
					public void actionPerformed(ActionEvent e) {
						dialog5.dispose();
					}
				});
				btnNon.setBackground(Color.BLUE);
				btnNon.setForeground(Color.WHITE);
				btnNon.setFont(new Font("Tahoma", Font.PLAIN, 16));
				btnNon.setBounds(262, 213, 89, 23);
				dialog5.add(btnNon);
				
				textFieldve = new JTextField();
				textFieldve.setBounds(130, 54, 167, 20);
				dialog5.add(textFieldve);
				textFieldve.setColumns(10);
				
				textFieldve_1 = new JTextField();
				textFieldve_1.setBounds(133, 79, 164, 20);
				dialog5.add(textFieldve_1);
				textFieldve_1.setColumns(10);
				
				textFieldve_2 = new JTextField();
				textFieldve_2.setBounds(129, 114, 167, 20);
				dialog5.add(textFieldve_2);
				textFieldve_2.setColumns(10);
				
				JLabel lblPourFaculté = new JLabel("Pour Faculté");
				lblPourFaculté.setFont(new Font("Tahoma", Font.PLAIN, 12));
				lblPourFaculté.setBounds(10, 147, 99, 14);
				dialog5.add(lblPourFaculté);
				
				textFieldve_3 = new JTextField();
				textFieldve_3.setBounds(130, 145, 167, 20);
				dialog5.add(textFieldve_3);
				textFieldve_3.setColumns(10);
				
				
				
				
				
				try{
	               	 try {  
	        				Class.forName("com.mysql.jdbc.Driver").newInstance ( ) ;
	        				}
	        				catch (Exception es){System.out .println("Erreur driver:  "+es.getMessage ( ) ) ;}
	        				
	        					
	        					try
	        					{
	        						con = (Connection) DriverManager.getConnection ("jdbc:mysql://localhost/Scolarite", "user","cccccc") ;
	        					}
	        					catch (Exception ez ){System.out.println("Erreur de connexion "+ ez.getMessage ( ));}
	        				
	        				
	        				try {  
	        					  st = (Statement) con.createStatement() ;
	        				     }
	        				catch (SQLException t){System.out.println ("Erreur de Statement "+t.getMessage());}
	        				
	        					try {
	        							rs = (ResultSet) st.executeQuery("select * from etudiants") ;
	        							
	        							String numTel=textFieldB.getText();
	        							
	        							while(rs.next())
	        							{
	        								if(numTel.equals(rs.getString(1)))
	        								{    
	        									if(textFieldB!=null)
	        									{
	        									 textFieldve.setText(rs.getString(2));
		       									 textFieldve_1.setText(rs.getString(3));
		       									 textFieldve_2.setText(rs.getString(4));
		       									textFieldve_3.setText(rs.getString(6));
		       									 }	
	        								}
	        							}
	        							dialog5.setVisible(true);
	        				}
	        					catch (Exception er)  {System.out .println("Erreur ResultSet "+er.getMessage ( ) ); }
	        				
	        				finally {
	        					   try {
	        							rs.close ( ) ;       
	        							st.close ( );       
	        							con.close ( );
	        						   }
	        					      catch (Exception es) { }
	        				}
							
						}catch(Exception er){er.getMessage();}
					}				
				
 }



