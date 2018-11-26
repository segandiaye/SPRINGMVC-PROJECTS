package com.exampl2.androidtp31;
import com.exampl2.androidtp31.Calcul;

import android.support.v7.app.ActionBarActivity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

public class Somme extends ActionBarActivity {
	TextView textView1;
	Button button;
	public  final  static  int CHOOSE_BUTTON_REQUEST = 0;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.somme);
		//button1.setOnClickListener(this);
	     String s1 = null;
	     String s2 = null;
	     Float somme=0.0f;
	     if (this.getIntent().getExtras()!=null){ 
	//recuperer le nom grace à l'identifiant cleNom                            
	 s1=this.getIntent().getExtras().getString("Nb1");
	 s2=this.getIntent().getExtras().getString("Nb2");
	 somme=(Float.parseFloat(s1)+Float.parseFloat(s2))/2;
	 TextView text = (TextView)findViewById(R.id.textView1);
	 text.setText("La moyenne est "+somme);
	 
	 Toast.makeText (getBaseContext() , "Calcul effectué avec succés" ,
			  Toast.LENGTH_LONG) .show ();
	 /* Toast msg=Toast.makeText(Somme.this.getApplicationContext(),
				 "Syntaxe Error ", Toast.LENGTH_LONG);                                                                    
				msg.show();*/
	 button  = (Button)findViewById(R.id.button);
	 button.setOnClickListener(new  View.OnClickListener() {
		 @Override
		 public  void onClick(View v) {
			 Intent secondeActivite = new  Intent(Somme.this,
			 Calcul.class);
			 // On associe l'identifiant à notre intent
			 startActivityForResult(secondeActivite,
			 CHOOSE_BUTTON_REQUEST);
			 }
			 });
	 }
	 /*Toast msg=Toast.makeText(Activity2.this.getApplicationContext(),
			 "Bienvenue "+s1, Toast.LENGTH_LONG);                                                                    
			msg.show();*/
	/* button.setOnClickListener(new View.OnClickListener() {
     	public void onClick(View v) {
     		
     		switch (v.getId()) {
    	    //selon le bouton :
    	    case R.id.button1:
    	    // bouton Enregister
    	    //On crée un nouveau Intent
    	    	setContentView(R.layout.calcul);
    	    break;

    	    default:
    	    //  bouton annuler
    	    //fermer l'app
    	    finish();
    	    break;
    	    }
     	}
     }); */
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.somme, menu);
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

	/*@Override
	public void onClick(View v) {
		switch (v.getId()) {
	    //selon le bouton :
	    case R.id.button1:
	    // bouton Enregister
	    //On crée un nouveau Intent
	    	Intent i= new Intent().setClass(this, Calcul.class);;
	    	// envoyer les données vers l'autre activité
	    	this.startActivityForResult(i, 1000);
	    break;

	    default:
	    //  bouton annuler
	    //fermer l'app
	    finish();
	    break;
	    }
	    }*/
}
