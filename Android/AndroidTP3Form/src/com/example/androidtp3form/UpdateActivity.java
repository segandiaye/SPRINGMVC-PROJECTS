package com.example.androidtp3form;

import android.support.v7.app.ActionBarActivity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class UpdateActivity extends ActionBarActivity {
	String user_name,user_pass,New_user_name;
	Button b_update;
	EditText newuser;
	Context ctx=this;
	DatabaseOperations DOP;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.update_layout);
		
		Bundle BN=getIntent().getExtras();
		user_name=BN.getString("user_name");
		user_pass=BN.getString("user_pass");
		b_update=(Button)findViewById(R.id.b_update);
		newuser=(EditText)findViewById(R.id.new_user_name);
		b_update.setOnClickListener(new  View.OnClickListener() {
			 @Override
			 public  void onClick(View v) {
				 New_user_name =newuser.getText().toString();
				 if(New_user_name.equals(""))
				 {
					 Toast.makeText(getBaseContext(),"Vous n'avez pas saisi un nouveau nom",Toast.LENGTH_LONG).show();
				 }
				 else
				 {
				 DOP=new DatabaseOperations(ctx);
				 DOP.updateUserInfo(DOP,user_name,user_pass,New_user_name);
				 Toast.makeText(getBaseContext(),"Update Succes.....",Toast.LENGTH_LONG).show();
				 finish();
				 }
				 }
				 });

	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.update, menu);
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
