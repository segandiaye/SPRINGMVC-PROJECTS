package montre;

import java.util.ArrayList;
import java.util.Calendar;
import observer.Observable;
import observer.Observateur;

public class Horloge implements Observable
{
	  
	  private Calendar cal;
	  private String hour = "";
	  private ArrayList<Observateur> listObservateur = new ArrayList<Observateur>();
	 
	  public void run()
	        {
			    while(true)
			    {
			      this.cal = Calendar.getInstance();
			      this.hour = this.cal.get(Calendar.HOUR_OF_DAY) + " : "  
			               + (this.cal.get(Calendar.MINUTE) < 10 ? "0" 
			               + this.cal.get(Calendar.MINUTE)
			               : this.cal.get(Calendar.MINUTE)
			               )
			               + " : " 
			               +
			               ( 
			                 (this.cal.get(Calendar.SECOND)< 10) 
			                 ? "0"+this.cal.get(Calendar.SECOND) 
			                 : this.cal.get(Calendar.SECOND)
			               );
			            this.updateObservateur();
		          
		             try 
			            {
		            	 Thread.sleep(1000);
			             } 
			             catch (InterruptedException e) {e.printStackTrace();}
				 }
			 }
			        
					public void addObservateur(Observateur obs) 
				    {
				      this.listObservateur.add(obs);
				     }
			         
			         public void delObservateur() 
			         {
			           this.listObservateur = new ArrayList<Observateur>();
			         }
			        
			         public void updateObservateur() 
			         {
			           for(Observateur obs : this.listObservateur )
			             obs.update(this.hour);
		             }
	}
