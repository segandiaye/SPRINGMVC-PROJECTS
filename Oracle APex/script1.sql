--------------------------CELLULE JURIDIQUE-------------------------------------
    
-----------------------------TABLE AVIS-----------------------------------------
CREATE TABLE CJ_AVIS(
  ID_AVIS NUMBER(38) NOT NULL,
  ID_DIRECTION NUMBER(38),
  DIRECTION VARCHAR2(50) NOT NULL,
  ETAT_AVIS VARCHAR2(50) NOT NULL,
  NOM_AVIS VARCHAR2(50) NOT NULL,
  DESCRIPTION_AVIS  VARCHAR2(50)  NOT NULL,
  AVIS_FICHIER_ATTACHE	BLOB,
  MIMETYPE	VARCHAR2(255),
  NOM_FICHIER	VARCHAR2(400),
  FICHIER_LAST_UPDATE	TIMESTAMP(6) WITH LOCAL TIME ZONE,
  DATE_AVIS DATE
);

ALTER TABLE CJ_AVIS ADD (
  CONSTRAINT av_pk PRIMARY KEY (ID_AVIS));

ALTER TABLE CJ_AVIS ADD (
  CONSTRAINT av_pk_f  FOREIGN KEY (ID_DIRECTION));

CREATE SEQUENCE av_seq
	START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER av_bir 
BEFORE INSERT ON CJ_AVIS 
FOR EACH ROW
BEGIN
  SELECT av_seq.NEXTVAL
  INTO   :new.id_avis
  FROM   dual;
END;
/

--------------------TABLE PROCES GAGNES-----------------------------------------
	
CREATE TABLE CJ_PROCES(
  ID_PROCES NUMBER(38) NOT NULL,
  INIT_PROCES VARCHAR2(50) NOT NULL,
  ETAT_PROCES VARCHAR2(50) NOT NULL,
  NOM_PROCES VARCHAR2(50) NOT NULL,
  DESCRIPTION_PROCES  VARCHAR2(50)  NOT NULL,
  DATE_PROCES DATE
);

ALTER TABLE CJ_PROCES ADD (
  CONSTRAINT pg_pk PRIMARY KEY (ID_PROCES));

CREATE SEQUENCE pg_seq
	START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE TRIGGER pg_bir 
BEFORE INSERT ON CJ_PROCES 
FOR EACH ROW
BEGIN
  SELECT pg_seq.NEXTVAL
  INTO   :new.id_proces
  FROM   dual;
END;
/
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
---------------SECURITE AUTHENTIFICATION-------------------------------------------
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
---------------------------NEW USER------------------------------------------------
-----------------------------------------------------------------------------------
create table USER_ACCOUNT
(
  USER_NAME VARCHAR2(30) not null,
  PASSWORD  VARCHAR2(30) not null,
  USER_TYPE VARCHAR2(30) not null,
  ACTIVE    VARCHAR2(60) not null,
  EMAIL     VARCHAR2(64) not null,
  FULL_NAME VARCHAR2(64) not null
) ;
  
alter table USER_ACCOUNT
  add constraint USER_ACCOUNT_PK primary key (USER_NAME) ;
alter table USER_ACCOUNT
  add constraint USER_ACCOUNT_UK unique (EMAIL) ;
 
insert into user_account (USER_NAME, PASSWORD, USER_TYPE,
 ACTIVE, EMAIL, FULL_NAME)
values ('admin', 'admin', 'admin', 'ADMIN', 'admin@lonase.sn', 'Admin');

 
Commit;


CREATE OR REPLACE TRIGGER admin_trigger_IU
BEFORE INSERT OR UPDATE ON USER_ACCOUNT
FOR EACH ROW
DECLARE
BEGIN
  IF :old.USER_NAME = 'admin' and :new.USER_NAME <> 'admin'
   THEN
	RAISE_APPLICATION_ERROR (-20101, 'Vous ne pouvez pas modifier le champ admin.');
  END IF;
END;
/

CREATE OR REPLACE TRIGGER admin_trigger_D
BEFORE DELETE ON USER_ACCOUNT
FOR EACH ROW
DECLARE
BEGIN
  IF :old.USER_NAME = 'admin'
   THEN
	RAISE_APPLICATION_ERROR (-20102, 'Vous ne pouvez pas supprimer un administrateur.');
  END IF;
END;
/

--------------------------PROCEDURE OF SECURITY----------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------
Create Or Replace Package Pkg_Security Is
 
  Function Authenticate_User(p_User_Name Varchar2
                            ,p_Password  Varchar2) Return Boolean;
 
  Procedure Process_Login(p_User_Name Varchar2
                         ,p_Password  Varchar2
                         ,p_App_Id    Number);
						 
  Function Authenticate_User2(p_User_Name Varchar2
                            ,p_Password  Varchar2) Return Boolean;
 
  Procedure Process_Login2(p_User_Name Varchar2
                         ,p_Password  Varchar2
                         ,p_App_Id    Number);
						 
End Pkg_Security;
/

Create Or Replace Package Body Pkg_Security Is
-------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------- 
-------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------
  Function Authenticate_User(p_User_Name Varchar2
                            ,p_Password  Varchar2) Return Boolean As
     v_Password User_Account.Password%Type;
     v_Active   User_Account.Active%Type;
     v_Email    User_Account.Email%Type;
  Begin
     If p_User_Name Is Null Or p_Password Is Null Then
  
        -- Write to Session, Notification must enter a username and password
        Apex_Util.Set_Session_State('LOGIN_MESSAGE'
                                   ,'Veuillez entrer les bons identifiants.');
        Return False;
     End If;
     ----
     Begin
        Select u.Active
              ,u.Password
              ,u.Email
        Into   v_Active
              ,v_Password
              ,v_Email
        From   User_Account u
        Where  u.User_Name = p_User_Name;
     Exception
        When No_Data_Found Then
      
           -- Write to Session, User not found.
           Apex_Util.Set_Session_State('LOGIN_MESSAGE'
                                      ,'Utilisateur inconnu.');
           Return False;
     End;
     If v_Password <> p_Password Then
    
        -- Write to Session, Password incorrect.
        Apex_Util.Set_Session_State('LOGIN_MESSAGE'
                                   ,'Password incorrect');
        Return False;
     End If;
     ---
     -- Write user information to Session.
     --
     Apex_Util.Set_Session_State('SESSION_USER_NAME'
                                ,p_User_Name);
     Apex_Util.Set_Session_State('SESSION_EMAIL'
                                ,v_Email);
     ---
     ---
     Return True;
  End;
  ------------------------------------------------------------------------------
  Procedure Process_Login(p_User_Name Varchar2
                         ,p_Password  Varchar2
                         ,p_App_Id    Number) As
     v_Result Boolean := False;
  Begin
     v_Result := Authenticate_User(p_User_Name
                                  ,p_Password);
     If v_Result = True Then
        -- Redirect to Page 1 (Home Page).
        Wwv_Flow_Custom_Auth_Std.Post_Login(p_User_Name -- p_User_Name
                                           ,p_Password -- p_Password
                                           ,v('APP_SESSION') -- p_Session_Id
                                           ,p_App_Id || ':1' -- p_Flow_page
                                            );
     Else
        -- Login Failure, redirect to page 101 (Login Page).
        Owa_Util.Redirect_Url('f?p=&APP_ID.:101:&SESSION.');
     End If;
  End;
------------------------------------------------------------------------------------------------------------------------------2
------------------------------------------------------------------------------------------------------------------------------2
------------------------------------------------------------------------------------------------------------------------------2
------------------------------------------------------------------------------------------------------------------------------2
 Function Authenticate_User2(p_User_Name Varchar2
                            ,p_Password  Varchar2) Return Boolean As
     v_Password User_Account.Password%Type;
     v_Active   User_Account.Active%Type;
     v_Email    User_Account.Email%Type;
     v_Username    User_Account.USER_NAME%Type;
  Begin
     If p_User_Name Is Null Or p_Password Is Null Then
  
        -- Write to Session, Notification must enter a username and password
        Apex_Util.Set_Session_State('LOGIN_MESSAGE2'
                                   ,'Veuillez entrer vos identifiants.');
        Return False;
     End If;
     ---------------------------------------------------------------------------
    
     ---------------------------------------------------------------------------
     ----
     Begin
        Select u.Active
              ,u.Password
              ,u.Email
        Into   v_Active
              ,v_Password
              ,v_Email
        From   User_Account u
        Where  u.User_Name = p_User_Name;
     Exception
        When No_Data_Found Then
      
           -- Write to Session, User not found.
           Apex_Util.Set_Session_State('LOGIN_MESSAGE2'
                                      ,'Utilisateur inconnu.');
           Return False;
     End;
     If v_Password <> p_Password Then
    
        -- Write to Session, Password incorrect.
        Apex_Util.Set_Session_State('LOGIN_MESSAGE2'
                                   ,'Password incorrect');
        Return False;
     End If;
     ---
     -- Write user information to Session.
     --
     Apex_Util.Set_Session_State('SESSION_USER_NAME2'
                                ,p_User_Name);
     Apex_Util.Set_Session_State('SESSION_EMAIL2'
                                ,v_Email);
     ---
     ---
     Return True;
  End;
  ------------------------------------------------------------------------------
  Procedure Process_Login2(p_User_Name Varchar2
                         ,p_Password  Varchar2
                         ,p_App_Id    Number) As
     v_Result Boolean := False;
  Begin
     v_Result := Authenticate_User2(p_User_Name
                                  ,p_Password);
     If v_Result = True and p_User_Name='admin' then
        -- Redirect to Page 1 (Home Page).
        Wwv_Flow_Custom_Auth_Std.Post_Login(p_User_Name -- p_User_Name
                                           ,p_Password -- p_Password
                                           ,v('APP_SESSION') -- p_Session_Id
                                           ,p_App_Id || ':1' -- p_Flow_page
                                            );
     Else
        -- Login Failure, redirect to page 101 (Login Page).
        Owa_Util.Redirect_Url('f?p=&APP_ID.:101:&SESSION.');
     End If;
     ---------------------------------------------------------------------------
  End;
  
 
End Pkg_Security;
/
--------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------