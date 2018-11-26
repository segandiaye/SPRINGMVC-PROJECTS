package com.example.androidtp3form;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class LoginActivity extends Activity {
  Button Login;
  EditText USERNAME,USERPASS;
  String username,userpass;
  Context ctx=this;
  
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.login_layout);
		Login =(Button)findViewById(R.id.b_login);
		USERNAME =(EditText)findViewById(R.id.user_name);
		USERPASS =(EditText)findViewById(R.id.user_pass);
		Login.setOnClickListener(new View.OnClickListener() {
			
			@Override
			public void onClick(View v) {
				Bundle b= getIntent().getExtras();
				int status=b.getInt("status");
				username=USERNAME.getText().toString();
				userpass=USERPASS.getText().toString();
				if(username.equals("")&&userpass.equals("")){
					Toast.makeText(getBaseContext(),"Vous n'avez rien saisi",Toast.LENGTH_LONG).show();
				}
				else if(username.equals("")&&userpass!=("")){
					Toast.makeText(getBaseContext(),"Username n'ont renseigné",Toast.LENGTH_LONG).show();
				}
				else if(username!=("")&&userpass.equals("")){
					Toast.makeText(getBaseContext(),"Password n'ont renseigné",Toast.LENGTH_LONG).show();
				}
				else{
					
				
				if(status==1)
				{
				Toast.makeText(getBaseContext(),"Please wait...",Toast.LENGTH_LONG).show();
				DatabaseOperations DB= new DatabaseOperations(ctx);
				Cursor CR=DB.getInformation(DB);
				CR.moveToFirst();
				String NAME="";
				boolean loginstatus=false;
				do{
					if(username.equals(CR.getString(0))&&userpass.equals(CR.getString(1))){
						loginstatus=true;
						NAME=CR.getString(0);
						}
						
				}while(CR.moveToNext());
				if(loginstatus){
					Toast.makeText(getBaseContext(),"Login success----\n Welcome "+NAME,Toast.LENGTH_LONG).show();
					finish();
					}
					else{
					Toast.makeText(getBaseContext(),"Login Failed----",Toast.LENGTH_LONG).show();
					finish();
					}
				
				}
				else if(status==2){
					Toast.makeText(getBaseContext(),"Please wait...",Toast.LENGTH_LONG).show();
					DatabaseOperations DB= new DatabaseOperations(ctx);
					Cursor CR=DB.getInformation(DB);
					CR.moveToFirst();
					String NAME="";
					boolean loginstatus=false;
					do{
						if(username.equals(CR.getString(0))&&userpass.equals(CR.getString(1))){
							loginstatus=true;
							NAME=CR.getString(0);
							}
							
					}while(CR.moveToNext());
					if(loginstatus){
						Toast.makeText(getBaseContext(),"Login success----\n Welcome "+NAME,Toast.LENGTH_LONG).show();

						Intent i=new Intent("update_filter",null,LoginActivity.this,UpdateActivity.class);
						Bundle BN=new Bundle();
						BN.putString("user_name",NAME);
						BN.putString("user_pass",userpass);
						i.putExtras(BN);
						startActivity(i);
						
						finish();
						}
						else{
						Toast.makeText(getBaseContext(),"Login Failed----",Toast.LENGTH_LONG).show();
						finish();
						}
				}
				else if(status==3){
					Toast.makeText(getBaseContext(),"Please wait...",Toast.LENGTH_LONG).show();
					DatabaseOperations DB= new DatabaseOperations(ctx);
					Cursor CR=DB.getInformation(DB);
					CR.moveToFirst();
					String NAME="";
					boolean loginstatus=false;
					do{
						if(username.equals(CR.getString(0))&&userpass.equals(CR.getString(1))){
							loginstatus=true;
							NAME=CR.getString(0);
							}
							
					}while(CR.moveToNext());
					if(loginstatus){
						Toast.makeText(getBaseContext(),"Login success----\n Welcome "+NAME,Toast.LENGTH_LONG).show();				
						Intent i=new Intent("delete_filter",null,LoginActivity.this,DeleteActivity.class);
						startActivity(i);
						finish();
						}
						else{
						Toast.makeText(getBaseContext(),"Login Failed----",Toast.LENGTH_LONG).show();
						finish();
						}
				}
				}
			}
		});
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.login, menu);
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
