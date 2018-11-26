package com.example.androidtp3form;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class RegisterActivity extends Activity{
	EditText USER_NAME,USER_PASS,CON_PASS;
	String user_name,user_pass,con_pass;
	Button REG;
	Context ctx=this;

	@Override
	protected void onCreate(Bundle savedInstanceState){
	super.onCreate(savedInstanceState);
	setContentView(R.layout.register_layout);
	USER_NAME =(EditText)findViewById(R.id.reg_user);
	USER_PASS =(EditText)findViewById(R.id.reg_pass);
	CON_PASS =(EditText)findViewById(R.id.con_pass);
	REG =(Button)findViewById(R.id.user_reg);
	REG.setOnClickListener(new View.OnClickListener() {
		
		@Override
		public void onClick(View v) {
			// TODO Auto-generated method stub
			user_name=USER_NAME.getText().toString();
			user_pass=USER_PASS.getText().toString();
			con_pass=CON_PASS.getText().toString();
			
			if(user_name.equals("")&&user_pass.equals("")&&con_pass.equals(""))
			{
				Toast.makeText(getBaseContext(),"Les champs sont vides",Toast.LENGTH_LONG).show();
			}
			else if(!(user_pass.equals(con_pass))){
				Toast.makeText(getBaseContext(),"Les mots de passe ne sont pas identiques",Toast.LENGTH_LONG).show();
				USER_NAME.setText("");
				USER_PASS.setText("");
				CON_PASS.setText("");
				}
			else if(user_pass.equals("")&&con_pass.equals("")){
				Toast.makeText(getBaseContext(),"Vous n'avez pas saisi de mots de passe",Toast.LENGTH_LONG).show();
			}
			else if(user_name.equals("")&&!(user_pass.equals(""))){
				Toast.makeText(getBaseContext(),"Vous n'avez pas saisi de nom d'utilisateur",Toast.LENGTH_LONG).show();
			}
			else{
				DatabaseOperations DB= new DatabaseOperations(ctx);
				DB.putInformation(DB,user_name,user_pass);
				Toast.makeText(getBaseContext(),"Registration success",Toast.LENGTH_LONG).show();
				finish();
			}
		}
	   });
	}
}