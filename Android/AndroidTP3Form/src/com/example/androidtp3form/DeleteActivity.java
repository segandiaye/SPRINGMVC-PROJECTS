package com.example.androidtp3form;

import android.support.v7.app.ActionBarActivity;
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

public class DeleteActivity extends ActionBarActivity {

	Bundle bn;
	String USERNAME;
    Button Del;
    EditText PASS;
    String Pass;
    DatabaseOperations DOP;
    Context ctx=this;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.delete_layout);
		Del =(Button)findViewById(R.id.b_delete);
		PASS =(EditText)findViewById(R.id.del_pass);
		
		 bn=getIntent().getExtras();
		 USERNAME=bn.getString("user_name");
		 Pass=PASS.getText().toString();
		 DOP=new DatabaseOperations(ctx);
		Del.setOnClickListener(new  View.OnClickListener() {
			 @Override
			 public  void onClick(View v) {
				
				 Cursor CR=DOP.getUserPass(DOP,USERNAME);
				 CR.moveToFirst();
				 boolean login_status=false;
				 do
				 {
				 if(Pass.equals(CR.getString(0)))
				 {
				 login_status=true;
				 }
				 }while(CR.moveToNext());
				 if(login_status)
				 {
                   //Delete user here
					 DOP.deleteUser(DOP,USERNAME,Pass);
					 Toast.makeText(getBaseContext(),"User Removed successfully.....",Toast.LENGTH_LONG).show();
					 finish();
				 }
				 else
				 {
					 Toast.makeText(getBaseContext(),"Invalid user-----Try later",Toast.LENGTH_LONG).show();
					 finish();
				 }
				 }
				 });
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.delete, menu);
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
