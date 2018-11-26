package com.example.androidtp3form;

import com.example.androidtp3form.TableData.TableInfo;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteDatabase.CursorFactory;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

public class DatabaseOperations extends SQLiteOpenHelper {
	public static final int database_version=1;
	public String CREATE_QUERY="CREATE TABLE "+TableInfo.TABLE_NAME+" ("+TableInfo.USER_NAME+
			" TEXT, "+TableInfo.USER_PASS+" TEXT);";
	
	public DatabaseOperations(Context context) {
		super(context, TableInfo.DATABASE_NAME, null, database_version);
		Log.d("Database Operation", "Database created");
	}

	@Override
	public void onCreate(SQLiteDatabase sdb) {
		// TODO Auto-generated method stub
		sdb.execSQL(CREATE_QUERY);
		Log.d("Database Operation", "Table created");

	}

	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
		// TODO Auto-generated method stub

	}

	public  void  putInformation(DatabaseOperations dop,String name,String pass) {
		SQLiteDatabase SQ=dop.getWritableDatabase();
		ContentValues cv=new 		ContentValues();
		cv.put(TableInfo.USER_NAME, name);
		cv.put(TableInfo.USER_PASS, pass);
		long k=SQ.insert(TableInfo.TABLE_NAME,null,cv);
		Log.d("Database Operation", "One raw inserted");
	}
	
	public Cursor getInformation(DatabaseOperations dop){
		SQLiteDatabase SQ=dop.getReadableDatabase();
		String[] coloumns={TableInfo.USER_NAME,TableInfo.USER_PASS};
		Cursor CR=SQ.query(TableInfo.TABLE_NAME,coloumns,null,null,null,null,null);
		return CR;
		}


	public Cursor getUserPass(DatabaseOperations DOP,String user)
	{
		SQLiteDatabase SQ=DOP.getReadableDatabase();
		String selection = TableInfo.USER_NAME +" LIKE ?";
		String coloumns[]={TableInfo.USER_PASS};
		String args[]={user};
		Cursor CR=SQ.query(TableInfo.TABLE_NAME,coloumns,selection,args,null,null,null);
		return CR;
	}
	
	public void deleteUser(DatabaseOperations DOP,String user,String pass)
	{
	String selection= TableInfo.USER_NAME+" LIKE ? AND "+TableInfo.USER_PASS+" LIKE ?";
	//String coloumns[]={TableInfo.USER_PASS};
	String[] args={user,pass};
	SQLiteDatabase SQ=DOP.getWritableDatabase();
	SQ.delete(TableInfo.TABLE_NAME,selection,args);
	}

	public void updateUserInfo(DatabaseOperations DOP,String user_name,String user_pass,String new_user_name)
	{
	  SQLiteDatabase SQ=DOP.getWritableDatabase();
	  String selection=TableInfo.USER_NAME+" LIKE ? AND "+TableInfo.USER_PASS+ " LIKE ?";
	  String args[]={user_name,user_pass};
	  ContentValues values=new ContentValues();
	  values.put(TableInfo.USER_NAME,new_user_name);
	  SQ.update(TableInfo.TABLE_NAME,values,selection,args);

	}
}
