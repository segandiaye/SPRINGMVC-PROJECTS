package com.exampl2.androidtp31;

import com.exampl2.androidtp31.Somme;

import android.support.v7.app.ActionBarActivity;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Toast;

public class Calcul extends Activity implements OnClickListener {

	EditText nobr1;
	EditText nobr2;
	Button button1;
	
	protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	//On charge l'interface (layout) activity_1
	setContentView(R.layout.calcul);
	//récupération des composants  grâce à les ID
	nobr1=(EditText)findViewById(R.id.login);
	nobr2=(EditText)findViewById(R.id.mdp);
	button1=(Button)findViewById(R.id.button1);
	LinearLayout l = (LinearLayout)findViewById(R.id.accueilid);
	l.setBackgroundColor(Color.BLACK);
	nobr1.setBackgroundColor(Color.WHITE);
	nobr2.setBackgroundColor(Color.WHITE);
	//on applique un ecouteur d'évenemnt au clique sur les 2 boutons
	button1.setOnClickListener(new View.OnClickListener(){
		@Override
		public void onClick(View arg0) {
			switch (arg0.getId()) {
		    //selon le bouton :
		    case R.id.button1:
		    // bouton Enregister
		    //On crée un nouveau Intent
		    	if((nobr2.getText().toString().equals(""))&&(nobr1.getText().toString().equals("")))
		    	{
				    		Toast.makeText (getBaseContext() , "Vous n'avez rien saisi" ,
				    				  Toast.LENGTH_LONG) .show ();	
		    	} 
		    	else if((nobr2.getText().toString().equals(""))&&(nobr1.getText().toString()!=(""))){
		    		Toast.makeText (getBaseContext() , "Vous avez rien saisi pour le nombre 2" ,
		    				  Toast.LENGTH_LONG) .show ();
		    	}
		    	else if((nobr1.getText().toString().equals(""))&&(nobr2.getText().toString()!=(""))){
		    		Toast.makeText (getBaseContext() , "Vous avez rien saisi pour le nombre 1" ,
		    				  Toast.LENGTH_LONG) .show ();
		    	}
		    	 else{
		    		 Intent i= new Intent(Calcul.this,Somme.class);
		 	    	// envoyer les données vers l'autre activité
		 	    	i.putExtra("Nb1", nobr1.getText().toString());
		 	    	i.putExtra("Nb2", nobr2.getText().toString());
		 	    	startActivityForResult(i, 1000);
		    	}
		    break;

		    default:
			    //  bouton annuler
			    //fermer l'app
			    finish();
			    break;
			}
		}
	});
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.calcul, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		int id = item.getItemId();
		if (id == R.id.action_settings) {
			return true;
		}
		return super.onOptionsItemSelected(item);
	}
	
	@Override
	public void onClick(View arg0) {
		switch (arg0.getId()) {
	    //selon le bouton :
	    case R.id.button1:
	    // bouton Enregister
	    //On crée un nouveau Intent
	    	if(nobr2.getText().toString()==null||
	    	nobr2.getText().toString().equals(""))
	    	{
	    		
	    		if(nobr1.getText().toString()!=null||
		    	   nobr1.getText().toString()!=("")){
	    		Toast.makeText (getBaseContext() , "Syntaxe Error" ,
	    				  Toast.LENGTH_LONG) .show ();	
	    		}
	    		else{
			    		Toast.makeText (getBaseContext() , "Vous n'avez rien saisi" ,
			    				  Toast.LENGTH_LONG) .show ();	
			    	}
	    	}
	    	 else{
	    		 Intent i= new Intent(this, Somme.class);;
	 	    	// envoyer les données vers l'autre activité
	 	    	i.putExtra("Nb1", nobr1.getText().toString());
	 	    	i.putExtra("Nb2", nobr2.getText().toString());
	 	    	this.startActivityForResult(i, 1000);
	    	}
	    break;

	    default:
		    //  bouton annuler
		    //fermer l'app
		    finish();
		    break;
		}
	}
}
