package com.calc.androidtpcalc;

import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Toast;
 
public class MainActivity extends Activity {
 
	//On déclare toutes les variables dont on aura besoin
	Button button0;
	Button button1;
	Button button2;
	Button button3;
	Button button4;
	Button button5;
	Button button6;
	Button button7;
	Button button8;
	Button button9;
	Button buttonPlus;
	Button buttonMoins;
	Button buttonDiv;
	Button buttonMul;
	Button buttonC;
	Button buttonEgal;
	Button buttonPoint;
	EditText ecran;
 
	private double chiffre1;
	private boolean clicOperateur = false;
	private boolean update = false;
	private String operateur = "";
 
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        //On récupère tout les éléments de notre interface graphique grâce aux ID
        button0 = (Button) findViewById(R.id.button0);
        button1 = (Button) findViewById(R.id.button1);
        button2 = (Button) findViewById(R.id.button2);
        button3 = (Button) findViewById(R.id.button3);
        button4 = (Button) findViewById(R.id.button4);
        button5 = (Button) findViewById(R.id.button5);
        button6 = (Button) findViewById(R.id.button6);
        button7 = (Button) findViewById(R.id.button7);
        button8 = (Button) findViewById(R.id.button8);
        button9 = (Button) findViewById(R.id.button9);
        buttonPoint = (Button) findViewById(R.id.buttonPoint);
        buttonPlus = (Button) findViewById(R.id.buttonPlus);
        buttonMoins = (Button) findViewById(R.id.buttonMoins);
        buttonDiv = (Button) findViewById(R.id.buttonDivision);
        buttonMul = (Button) findViewById(R.id.buttonMultiplier);
        buttonC = (Button) findViewById(R.id.buttonC);
        buttonEgal = (Button) findViewById(R.id.buttonEgal);
        LinearLayout l = (LinearLayout)findViewById(R.id.linear);
    	l.setBackgroundColor(Color.BLACK);
 
        ecran = (EditText) findViewById(R.id.EditText01);
 
        //On attribut un écouteur d'évènement à tout les boutons
        buttonPlus.setOnClickListener(new View.OnClickListener() {
        	public void onClick(View v) {
        		plusClick();
        	}
        });
 
        buttonMoins.setOnClickListener(new View.OnClickListener() {
        	public void onClick(View v) {
        		moinsClick();
        	}
        });
 
        buttonDiv.setOnClickListener(new View.OnClickListener() {
        	public void onClick(View v) {
        		divClick();
        	}
        });
 
        buttonMul.setOnClickListener(new View.OnClickListener() {
        	public void onClick(View v) {
        		mulClick();
        	}
        });
 
        buttonC.setOnClickListener(new View.OnClickListener() {
        	public void onClick(View v) {
        		resetClick();
        	}
        });
 
        buttonEgal.setOnClickListener(new View.OnClickListener() {
        	public void onClick(View v) {
        		egalClick();
        	}
        });
 
        buttonPoint.setOnClickListener(new View.OnClickListener() {
        	public void onClick(View v) {
        		chiffreClick(".");
        	}
        });
 
        button0.setOnClickListener(new View.OnClickListener() {
        	public void onClick(View v) {
        		chiffreClick("0");
        	}
        });
 
        button1.setOnClickListener(new View.OnClickListener() {
        	public void onClick(View v) {
        		chiffreClick("1");
        	}
        });
 
        button2.setOnClickListener(new View.OnClickListener() {
        	public void onClick(View v) {
        		chiffreClick("2");
        	}
        });
 
        button3.setOnClickListener(new View.OnClickListener() {
        	public void onClick(View v) {
        		chiffreClick("3");
        	}
        });
 
        button4.setOnClickListener(new View.OnClickListener() {
        	public void onClick(View v) {
        		chiffreClick("4");
        	}
        });
 
        button5.setOnClickListener(new View.OnClickListener() {
        	public void onClick(View v) {
        		chiffreClick("5");
        	}
        });
 
        button6.setOnClickListener(new View.OnClickListener() {
        	public void onClick(View v) {
        		chiffreClick("6");
        	}
        });
 
        button7.setOnClickListener(new View.OnClickListener() {
        	public void onClick(View v) {
        		chiffreClick("7");
        	}
        });
 
        button8.setOnClickListener(new View.OnClickListener() {
        	public void onClick(View v) {
        		chiffreClick("8");
        	}
        });
 
        button9.setOnClickListener(new View.OnClickListener() {
        	public void onClick(View v) {
        		chiffreClick("9");
        	}
        });
 
    }
 
    //voici la méthode qui est exécutée lorsque l'on clique sur un bouton chiffre
    public void chiffreClick(String str) {
        if(update){
                update = false;
        }else{
            if(!ecran.getText().equals("0"))
            	str = ecran.getText() + str;
        }
        ecran.setText(str);
    }
 
    //voici la méthode qui est  exécutée lorsque l'on clique sur le bouton +
    public void plusClick(){
 
    	if(clicOperateur){
    		calcul();
            ecran.setText(String.valueOf(chiffre1));
        }else{
            chiffre1 = Double.valueOf(ecran.getText().toString()).doubleValue();
            clicOperateur = true;
        }
        operateur = "+";
        update = true;
    }
 
    //voici la méthode qui est  exécutée lorsque l'on clique sur le bouton -
    public void moinsClick(){
    	if(clicOperateur){
    		calcul();
            ecran.setText(String.valueOf(chiffre1));
        }else{
            chiffre1 = Double.valueOf(ecran.getText().toString()).doubleValue();
            clicOperateur = true;
        }
        operateur = "-";
        update = true;
    }
 
    //voici la méthode qui est  exécutée lorsque l'on clique sur le bouton *
    public void mulClick(){
    	if(clicOperateur){
    		calcul();
    		ecran.setText(String.valueOf(chiffre1));
        }else{
            chiffre1 = Double.valueOf(ecran.getText().toString()).doubleValue();
            clicOperateur = true;
        }
        operateur = "*";
        update = true;
    }
 
    //voici la méthode qui est  exécutée lorsque l'on clique sur le bouton /
    public void divClick(){
    	 if(clicOperateur){
    		 calcul();
    		 ecran.setText(String.valueOf(chiffre1));
         }else{
        	 chiffre1 = Double.valueOf(ecran.getText().toString()).doubleValue();
        	 clicOperateur = true;
         }
         operateur = "/";
         update = true;
    }
 
    //voici la méthode qui est  exécutée lorsque l'on clique sur le bouton =
    public void egalClick(){
    	calcul();
        update = true;
        clicOperateur = false;
    }
 
    //voici la méthode qui est  exécutée lorsque l'on clique sur le bouton C
    public void resetClick(){
    	 clicOperateur = false;
         update = true;
         chiffre1 = 0;
         operateur = "";
         ecran.setText("");
    }
 
    //Voici la méthode qui fait le calcul qui a été demandé par l'utilisateur
    private void calcul(){
        if(operateur.equals("+")){
        	chiffre1 = chiffre1 + Double.valueOf(ecran.getText().toString()).doubleValue();
            ecran.setText(String.valueOf(chiffre1));
        }
 
        if(operateur.equals("-")){
        	chiffre1 = chiffre1 - Double.valueOf(ecran.getText().toString()).doubleValue();
            ecran.setText(String.valueOf(chiffre1));
        }
 
        if(operateur.equals("*")){
                chiffre1 = chiffre1 * Double.valueOf(ecran.getText().toString()).doubleValue();
                ecran.setText(String.valueOf(chiffre1));
        }
 
        if(operateur.equals("/")){
        	try{
        		chiffre1 = chiffre1 / Double.valueOf(ecran.getText().toString()).doubleValue();
        		if(Double.valueOf(ecran.getText().toString()).doubleValue()==0.0)
        		{
        			Toast.makeText (getBaseContext() , "Le dénominateur doit être différent de zéro " ,
		    				  Toast.LENGTH_LONG) .show ();
        			clicOperateur = false;
        	         update = true;
        	         chiffre1 = 0;
        	         operateur = "";
        	         ecran.setText("");
        		}else{
                ecran.setText(String.valueOf(chiffre1));
        		}
            }catch(ArithmeticException e){
                ecran.setText("0");
            }
        }

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
