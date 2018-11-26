package com.example.androidtp3form3;


import android.app.Activity;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.Color;
import android.os.Bundle;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
 
public class SQLiteExample extends Activity {
 
    LinearLayout Linear;
    SQLiteDatabase mydb;
    private static String DBNAME = "PERSONS.db";    // THIS IS THE SQLITE DATABASE FILE NAME.
    private static String TABLE = "MY_TABLE";       // THIS IS THE TABLE NAME
 
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
 
        Linear  = (LinearLayout)findViewById(R.id.linear);
        Toast.makeText(getApplicationContext(), "Creating table.", Toast.LENGTH_SHORT).show();
 
        dropTable();        // DROPPING THE TABLE.
        createTable();
        TextView t0 = new TextView(this);
        t0.setText("This tutorial covers CREATION, INSERTION, UPDATION AND DELETION USING SQLITE DATABASES.                                                Creating table complete........");
        Linear.addView(t0);
        Toast.makeText(getApplicationContext(), "Creating table complete.", Toast.LENGTH_SHORT).show();
        insertIntoTable();
        TextView t1 = new TextView(this);
        t1.setText("Insert into table complete........");
        Linear.addView(t1);
        Toast.makeText(getApplicationContext(), "Insert into table complete", Toast.LENGTH_SHORT).show();
        TextView t2 = new TextView(this);
        t2.setText("Showing table values............");
        Linear.addView(t2);
        showTableValues();
        Toast.makeText(getApplicationContext(), "Showing table values", Toast.LENGTH_SHORT).show();
        updateTable();
        TextView t3 = new TextView(this);
        t3.setText("Updating table values............");
        Linear.addView(t3);
        Toast.makeText(getApplicationContext(), "Updating table values", Toast.LENGTH_SHORT).show();
        TextView t4 = new TextView(this);
        t4.setText("Showing table values after updation..........");
        Linear.addView(t4);
        Toast.makeText(getApplicationContext(), "Showing table values after updation.", Toast.LENGTH_SHORT).show();
        showTableValues();
        deleteValues();
        TextView t5 = new TextView(this);
        t5.setText("Deleting table values..........");
        Linear.addView(t5);
        Toast.makeText(getApplicationContext(), "Deleting table values", Toast.LENGTH_SHORT).show();
        TextView t6 = new TextView(this);
        t6.setText("Showing table values after deletion.........");
        Linear.addView(t6);
        Toast.makeText(getApplicationContext(), "Showing table values after deletion.", Toast.LENGTH_SHORT).show();
        showTableValues();
        setColor(t0);
        setColor(t1);
        setColor(t2);
        setColor(t3);
        setColor(t4);
        setColor(t5);
        setColor(t6);
    }
    // THIS <span class="IL_AD" id="IL_AD2">FUNCTION</span> SETS COLOR AND PADDING FOR THE TEXTVIEWS 
    public void setColor(TextView t){
        t.setTextColor(Color.BLACK);
        t.setPadding(20, 5, 0, 5);
        t.setTextSize(1, 15);
    }
 
    // CREATE TABLE IF NOT EXISTS 
    public void createTable(){
        try{
        mydb = openOrCreateDatabase(DBNAME, Context.MODE_PRIVATE,null);
        mydb.execSQL("CREATE TABLE IF  NOT EXISTS "+ TABLE +" (ID INTEGER PRIMARY KEY, NAME TEXT, PLACE TEXT);");
        mydb.close();
        }catch(Exception e){
            Toast.makeText(getApplicationContext(), "Error in creating table", Toast.LENGTH_LONG);
        }
    }
    // THIS FUNCTION INSERTS DATA TO THE DATABASE
    public void insertIntoTable(){
        try{
            mydb = openOrCreateDatabase(DBNAME, Context.MODE_PRIVATE,null);
            mydb.execSQL("INSERT INTO " + TABLE + "(NAME, PLACE) VALUES('CODERZHEAVEN','GREAT INDIA')");
            mydb.execSQL("INSERT INTO " + TABLE + "(NAME, PLACE) VALUES('ANTHONY','USA')");
            mydb.execSQL("INSERT INTO " + TABLE + "(NAME, PLACE) VALUES('SHUING','JAPAN')");
            mydb.execSQL("INSERT INTO " + TABLE + "(NAME, PLACE) VALUES('JAMES','INDIA')");
            mydb.execSQL("INSERT INTO " + TABLE + "(NAME, PLACE) VALUES('SOORYA','INDIA')");
            mydb.execSQL("INSERT INTO " + TABLE + "(NAME, PLACE) VALUES('MALIK','INDIA')");
            mydb.close();
        }catch(Exception e){
            Toast.makeText(getApplicationContext(), "Error in inserting into table", Toast.LENGTH_LONG);
        }
    }
    // THIS FUNCTION SHOWS DATA FROM THE DATABASE 
    public void showTableValues(){
        try{
            mydb = openOrCreateDatabase(DBNAME, Context.MODE_PRIVATE,null);
            Cursor allrows  = mydb.rawQuery("SELECT * FROM "+  TABLE, null);
            System.out.println("COUNT : " + allrows.getCount());
            Integer cindex = allrows.getColumnIndex("NAME");
            Integer cindex1 = allrows.getColumnIndex("PLACE");
 
            TextView t = new TextView(this);
            t.setText("========================================");
            //Linear.removeAllViews();
            Linear.addView(t);
 
            if(allrows.moveToFirst()){
                do{
                    LinearLayout id_row   = new LinearLayout(this);
                    LinearLayout name_row = new LinearLayout(this);
                    LinearLayout place_row= new LinearLayout(this);
 
                    final TextView id_  = new TextView(this);
                    final TextView name_ = new TextView(this);
                    final TextView place_ = new TextView(this);
                    final TextView   sep  = new TextView(this);
 
                    String ID = allrows.getString(0);
                    String NAME= allrows.getString(1);
                    String PLACE= allrows.getString(2);
 
                    id_.setTextColor(Color.RED);
                    id_.setPadding(20, 5, 0, 5);
                    name_.setTextColor(Color.RED);
                    name_.setPadding(20, 5, 0, 5);
                    place_.setTextColor(Color.RED);
                    place_.setPadding(20, 5, 0, 5);
 
                    System.out.println("NAME " + allrows.getString(cindex) + " PLACE : "+ allrows.getString(cindex1));
                    System.out.println("ID : "+ ID  + " || NAME " + NAME + "|| PLACE : "+ PLACE);
 
                    id_.setText("ID : " + ID);
                    id_row.addView(id_);
                    Linear.addView(id_row);
                    name_.setText("NAME : "+NAME);
                    name_row.addView(name_);
                    Linear.addView(name_row);
                    place_.setText("PLACE : " + PLACE);
                    place_row.addView(place_);
                    Linear.addView(place_row);
                    sep.setText("---------------------------------------------------------------");
                    Linear.addView(sep);
                }
                while(allrows.moveToNext());
            }
            mydb.close();
         }catch(Exception e){
            Toast.makeText(getApplicationContext(), "Error encountered.", Toast.LENGTH_LONG);
        }
    }
    // THIS FUNCTION UPDATES THE DATABASE ACCORDING TO THE CONDITION 
    public void updateTable(){
        try{
            mydb = openOrCreateDatabase(DBNAME, Context.MODE_PRIVATE,null);
            mydb.execSQL("UPDATE " + TABLE + " SET NAME = 'MAX' WHERE PLACE = 'USA'");
            mydb.close();
        }catch(Exception e){
            Toast.makeText(getApplicationContext(), "Error encountered", Toast.LENGTH_LONG);
        }
    }
    // THIS FUNCTION DELETES VALUES FROM THE DATABASE ACCORDING TO THE CONDITION
    public void deleteValues(){
        try{
            mydb = openOrCreateDatabase(DBNAME, Context.MODE_PRIVATE,null);
            mydb.execSQL("DELETE FROM " + TABLE + " WHERE PLACE = 'USA'");
            mydb.close();
        }catch(Exception e){
            Toast.makeText(getApplicationContext(), "Error encountered while deleting.", Toast.LENGTH_LONG);
        }
    }
    // THIS FUNTION DROPS A TABLE 
    public void dropTable(){
        try{
            mydb = openOrCreateDatabase(DBNAME, Context.MODE_PRIVATE,null);
            mydb.execSQL("DROP TABLE " + TABLE);
            mydb.close();
        }catch(Exception e){
            Toast.makeText(getApplicationContext(), "Error encountered while dropping.", Toast.LENGTH_LONG);
        }
    }
}