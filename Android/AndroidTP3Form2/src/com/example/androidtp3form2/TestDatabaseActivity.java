package com.example.androidtp3form2;

import java.util.List;
import java.util.Random;

import android.app.ListActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;

public class TestDatabaseActivity extends ListActivity {
	  private CommentsDataSource datasource;

	  @Override
	  public void onCreate(Bundle savedInstanceState) {
	    super.onCreate(savedInstanceState);
	    setContentView(R.layout.activity_my_sqlite_helper);

	    datasource = new CommentsDataSource(this);
	    datasource.open();

	    List<Comment> values = datasource.getAllComments();

	    // utilisez SimpleCursorAdapter pour afficher les
	    // éléments dans une ListView
	    ArrayAdapter<Comment> adapter = new ArrayAdapter<Comment>(this,
	        android.R.layout.simple_list_item_1, values);
	    setListAdapter(adapter);
	  }

	  // Sera appelée par l'attribut onClick 
	  // des boutons déclarés dans main.xml
	  public void onClick(View view) {
	    @SuppressWarnings("unchecked")
	    ArrayAdapter<Comment> adapter = (ArrayAdapter<Comment>) getListAdapter();
	    Comment comment = null;
	    switch (view.getId()) {
	    case R.id.add:
	      String[] comments = new String[] { "Cool", "Very nice", "Hate it" };
	      int nextInt = new Random().nextInt(3);
	      // enregistrer le nouveau commentaire dans la base de données
	      comment = datasource.createComment(comments[nextInt]);
	      adapter.add(comment);
	      break;
	    case R.id.delete:
	      if (getListAdapter().getCount() > 0) {
	        comment = (Comment) getListAdapter().getItem(0);
	        datasource.deleteComment(comment);
	        adapter.remove(comment);
	      }
	      break;
	    }
	    adapter.notifyDataSetChanged();
	  }

	  @Override
	  protected void onResume() {
	    datasource.open();
	    super.onResume();
	  }

	  @Override
	  protected void onPause() {
	    datasource.close();
	    super.onPause();
	  }
}
