package com.exampl.androidtp3;

import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TextView;
import android.widget.Toast;

public class Activity2 extends ActionBarActivity {
	TextView textView1;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_2);
		String e="";
	     String s1 = null;
	     if (this.getIntent().getExtras()!=null){ 
	//recuperer le nom grace à l'identifiant cleNom                            
	 s1=this.getIntent().getExtras().getString("Log");
	 TextView text = (TextView)findViewById(R.id.textView1);

	 Toast.makeText (getBaseContext() , "Connexion réussie avec succés" ,
			  Toast.LENGTH_LONG) .show ();
	 
	 text.setText("Connexion "+s1+" Réussie");
	 /*Toast msg=Toast.makeText(Activity2.this.getApplicationContext(),
			 "Bienvenue "+s1, Toast.LENGTH_LONG);                                                                    
			msg.show();*/
	}
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.activity2, menu);
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
