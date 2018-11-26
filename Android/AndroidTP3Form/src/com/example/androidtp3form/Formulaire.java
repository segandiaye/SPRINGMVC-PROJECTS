package com.example.androidtp3form;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;

public class Formulaire extends Activity {
	public  final  static  int CHOOSE_BUTTON_REQUEST = 0;
	Button Login,Register,Delete,Update;
	int status=0;
	

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.formulaire);
		
		Login =(Button)findViewById(R.id.user_reg);
		Register =(Button)findViewById(R.id.user_reg1);
		Delete =(Button)findViewById(R.id.user_reg3);
		Update =(Button)findViewById(R.id.user_reg2);
		Register.setOnClickListener(new  View.OnClickListener() {
			 @Override
			 public  void onClick(View v) {
				 Intent s = new  Intent("register_filter",null, Formulaire.this, RegisterActivity.class);
				 startActivity(s);//"register_filter"
				 }
				 });
		Login.setOnClickListener(new  View.OnClickListener() {
			 @Override
			 public  void onClick(View v) {
				 status=1;
				 Bundle b=new Bundle();
				 b.putInt("status", status);
				 Intent s = new  Intent("login_filter",null,Formulaire.this,LoginActivity.class);//"login_filter"
				 s.putExtras(b);
				 startActivity(s);
				 }
				 });
		
		Update.setOnClickListener(new  View.OnClickListener() {
			 @Override
			 public  void onClick(View v) {
				 status=2;
				 Bundle b=new Bundle();
				 b.putInt("status", status);
				 Intent s = new  Intent("update_filter",null,Formulaire.this,LoginActivity.class);//"update_filter"
				 s.putExtras(b);
				 startActivity(s);
				 }
				 });
		
		Delete.setOnClickListener(new  View.OnClickListener() {
			 @Override
			 public  void onClick(View v) {
				 status=3;
				 Bundle b=new Bundle();
				 b.putInt("status", status);
				 Intent s = new  Intent("delete_filter",null,Formulaire.this,LoginActivity.class);//"delete_filter"
				 s.putExtras(b);
				 startActivity(s);
				 }
				 });
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.formulaire, menu);
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
