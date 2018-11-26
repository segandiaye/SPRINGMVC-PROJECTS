package com.app.appareilcam;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import android.app.Activity;
import android.content.ContentValues;

import android.graphics.PixelFormat;
import android.hardware.Camera;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore.Images.Media;

import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

public class MainActivity extends Activity implements SurfaceHolder.Callback {
	
	
	
	private Camera camera;
	private SurfaceView surfaceCamera;
	private Boolean isPreview;
	protected Object stream;

	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		// On met l'application en plein écran et sans barre de titre
		getWindow().setFormat(PixelFormat.TRANSLUCENT);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,WindowManager.LayoutParams.FLAG_FULLSCREEN);
	    isPreview = false;
		// On applique notre layout
		setContentView(R.layout.activity_main);
		// On récupère notre surface pour le preview
		surfaceCamera = (SurfaceView) findViewById(R.id.surfaceViewCamera);
		// Méthode d'initialisation de la caméra
		InitializeCamera();
		// Quand on clique sur notre surface
				surfaceCamera.setOnClickListener(new View.OnClickListener() {
					public void onClick(View v) {
						// On prend une photo
						if (camera != null) {
							SavePicture();
						}
					}
				});
	}
	
	public void InitializeCamera() {
		// On attache nos retour du holder à notre activite
		surfaceCamera.getHolder().addCallback(this);
		// On spécifie le type du holder en mode SURFACE_TYPE_PUSH_BUFFERS
		surfaceCamera.getHolder().setType(
				SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);
	}
	
	public void surfaceDestroyed(SurfaceHolder holder) {
		// On arrête la camera et on rend la main
		if (camera != null) {
			camera.stopPreview();
			isPreview = false;
			camera.release();
		}
	}
	
	public void surfaceCreated(SurfaceHolder holder) {
		// On prend le controle de la camera
		if (camera == null)
			camera = Camera.open();
	}
	
	// Quand la surface change
	public void surfaceChanged(SurfaceHolder holder, int format, int width,int height) {
		// Si le mode preview est lancé alors on le stop
		if (isPreview) {
			camera.stopPreview();
		}
		// On récupère les parametres de la camera
		Camera.Parameters parameters = camera.getParameters();
		// On change la taille
		parameters.setPreviewSize(width, height);
		// On applique nos nouveaux parametres
		camera.setParameters(parameters);
		try {
			// On attache notre previsualisation de la camera au holder de la
			// surface
			camera.setPreviewDisplay(surfaceCamera.getHolder());
		} catch (IOException e) {
		}
		// On lance la previeuw
		camera.startPreview();
		isPreview = true;
	}
	
	// Retour sur l'application
	@Override
	public void onResume() {
		super.onResume();
		camera = Camera.open();
	}
	 
	// Mise en pause de l'application
	@Override
	public void onPause() {
		super.onPause();
		if (camera != null) {
			camera.release();
			camera = null;
		}
	}
	
	private void SavePicture() {
		try {
			SimpleDateFormat timeStampFormat = new SimpleDateFormat("yyyy-MM-dd-HH.mm.ss");
			String fileName = "photo_" + timeStampFormat.format(new Date())+ ".jpg";
			// Metadata pour la photo
			ContentValues values = new ContentValues();
			values.put(Media.TITLE, fileName);
			values.put(Media.DISPLAY_NAME, fileName);
			values.put(Media.DESCRIPTION, "Image prise par FormationCamera");
			values.put(Media.DATE_TAKEN, new Date().getTime());
			values.put(Media.MIME_TYPE, "image/jpeg");
			// Support de stockage
			Uri taken = getContentResolver().insert(Media.EXTERNAL_CONTENT_URI,values);
			// Ouverture du flux pour la sauvegarde
			stream = (FileOutputStream) getContentResolver().openOutputStream(taken);
			camera.takePicture(null, pictureCallback, pictureCallback);
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
	
	// Callback pour la prise de photo
	Camera.PictureCallback pictureCallback = new Camera.PictureCallback() {
		public void onPictureTaken(byte[] data, Camera camera) {
			if (data != null) {
				// Enregistrement de votre image
				try {
					if (stream != null) {
						  ((FileOutputStream) stream).write(data);
						  ((OutputStream) stream).flush();
						  ((FileOutputStream) stream).close();
					}
				} catch (Exception e) {
					// TODO: handle exception
				}
				// On redémarre la prévisualisation
				camera.startPreview();
			}
		}
	};
	
}
