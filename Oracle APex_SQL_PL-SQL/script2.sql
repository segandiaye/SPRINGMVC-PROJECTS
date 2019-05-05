--------------------------PROCEDURE OF SECURITY----------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------
Create Or Replace Package Pkg_Security_DFC Is
 
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
						 
End Pkg_Security_DFC;
/

Create Or Replace Package Body Pkg_Security_DFC Is
-------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------- 
-------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------
  Function Authenticate_User(p_User_Name Varchar2
                            ,p_Password  Varchar2) Return Boolean As
     v_Password  USER_ACCOUNT_DFC.Password%Type;
     v_Active    USER_ACCOUNT_DFC.Active%Type;
     v_Email     USER_ACCOUNT_DFC.Email%Type;
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
        From    USER_ACCOUNT_DFC u
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
     v_Password  USER_ACCOUNT_DFC.Password%Type;
     v_Active    USER_ACCOUNT_DFC.Active%Type;
     v_Email     USER_ACCOUNT_DFC.Email%Type;
     v_Username     USER_ACCOUNT_DFC.USER_NAME%Type;
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
        From    USER_ACCOUNT_DFC u
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
  
 
End Pkg_Security_DFC;
/
--------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------
