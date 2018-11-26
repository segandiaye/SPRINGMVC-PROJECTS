package com.sms.androidtpsms;

import android.telephony.SmsManager;
import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class Sms1 extends  Activity {
	int i=0;
	boolean clickable=false;
	public  void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		//On récupère le bouton créé en XML grâce à son id
		Button btnEnvoie = (Button)findViewById(R.id.envoyer);
		//On récupère les deux EditText correspondant aux champs pour entrer le 
		
		final  EditText numero =(EditText)findViewById(R.id.numero);
		final  EditText message = (EditText)findViewById(R.id.message);
		numero.setText("5556");
		message.setText("Bonjour");
		//clickable=true;
		//On affecte un écouteur d'évènement au bouton
		//btnEnvoie.setClickable(clickable);
		{
			
		
		//On récupère ce qui a été entré dans les EditText
		String num = numero.getText().toString();
		String msg = message.getText().toString();
		//Si le numéro est supérieur à 4 caractères et que le message n'est pas 
	
		if(num.length()>= 4 && msg.length() > 0){
		//Grâce à l'objet de gestion de SMS (SmsManager) que l'on récupère via la 
		//On envoie le SMS à l'aide de la méthode sendTextMessage
		SmsManager.getDefault().sendTextMessage(num, null, msg, null, null);
		//On efface les deux EditText
		numero.setText("");
		message.setText("");
		}else{
		//On affiche un petit message 
		
		Toast.makeText(Sms1.this, "Enter le numero et/ou le message", Toast.LENGTH_SHORT).show();
		}
		}		
}
		

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.sms1, menu);
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
