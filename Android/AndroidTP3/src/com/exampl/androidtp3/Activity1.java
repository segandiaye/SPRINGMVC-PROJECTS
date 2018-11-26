package com.exampl.androidtp3;

import android.support.v7.app.ActionBarActivity;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.exampl.androidtp3.Activity2;

public class Activity1 extends Activity  {

			EditText login;
			EditText mdp;
			Button button1;
			
			protected void onCreate(Bundle savedInstanceState) {
			super.onCreate(savedInstanceState);
			//On charge l'interface (layout) activity_1
			setContentView(R.layout.activity_1);
			//récupération des composants  grâce à les ID
			login=(EditText)findViewById(R.id.login);
			mdp=(EditText)findViewById(R.id.mdp);
			button1=(Button)findViewById(R.id.button1);
			//on applique un ecouteur d'évenemnt au clique sur les 2 boutons
			button1.setOnClickListener(new  View.OnClickListener() { 
		   public void onClick(View arg0) {

		    switch (arg0.getId()) {
		    //selon le bouton :
		    case R.id.button1:
		    	if((login.getText().toString().equals(""))&&(mdp.getText().toString().equals(""))){
		    		Toast.makeText (getBaseContext() , "Vous n'avez rien saisi" ,
		    				  Toast.LENGTH_LONG) .show ();
		    	}
		    	else if((login.getText().toString().equals(""))&&(mdp.getText().toString()!=(""))){
		    		Toast.makeText (getBaseContext() , "Login n'ont renseigné" ,
		    				  Toast.LENGTH_LONG) .show ();
		    	}
		    	else if((mdp.getText().toString().equals(""))&&(login.getText().toString()!=(""))){
		    		Toast.makeText (getBaseContext() , "Mot de passe n'ont renseigné" ,
		    				  Toast.LENGTH_LONG) .show ();
		    	}
		    	else{
					    Intent i=new Intent(Activity1.this,Activity2.class);
					    i.putExtra("Log", login.getText().toString());
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
		getMenuInflater().inflate(R.menu.activity1, menu);
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
}
