//$.getScript("appli.js");
$.getScript("app.url.js");
'use strict';

angular.module('app').controller('AppCtrl', ['$scope', '$rootScope', '$uibModal', '$log', '$state', '$location', '$http', '$timeout', '$interval', '$window', '$templateCache', 'deconnectApi', function($scope, $rootScope, $modal, $log, $state, $location, $http, $timeout, $interval, $window, $templateCache, deconnectApi) {
    var menufold = false;
    var screenWidth = window.innerWidth;
    var nb_confirm = 0;
    $scope.authError = true;
    $scope.isActive = false;
    $scope.isInvalidToken = true;
    $scope.isMaxToken = true;
    $scope.dateChamp = null;
    $scope.miniDate = null;
    $scope.heure = null;
    $scope.minute = null;
    $scope.today = null;
    $scope.token = null;
    $scope.userId = 0;
    $scope.suivreDateDebToken = 0;
    $scope.suivreDateSuiviToken = 0;
    $scope.tokenLive = true;
    $scope.messageToken = '';
    $scope.messageLogin = '';
    $scope.suivrePath = ''
    // var comptNbOffline = 0;
    // $rootScope.online = navigator.onLine;
    // $scope.preventBack=null;                           
    var cptTokenSucess = 0;
    // var cptSucess = 0;
    var myIdentity = '';
    $scope.email_V = '';

    if (screenWidth < 767) {
        menufold = true;
    }

    // //console.log("sessionStorage.getItem ",sessionStorage.getItem("iduser"));
    // $scope.$on('event_', function(event, opt) {
    // //console.log("aaSé ",opt.a);
    // //console.log("bbS ",opt.b);
    // });
    /*OBTENIR LA DATE D'AUJOURD'HUI*/
    var today = new Date();
    $scope.aujourdhui = today;
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var mns = today.getMinutes();
    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = dd + '/' + mm + '/' + yyyy;
    // //////console.log($scope.today.split("/")[1]);
    $scope.miniDate = today;
    // $scope.miniDate.substr
    $scope.heure = hh;
    $scope.minute = mns;

    $scope.preventBack = function() {
        window.history.forward();
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function() {
            history.pushState(null, null, document.URL);
        });
    };

    function disconnApi(a) {
        // console.log("sssssssssss ",a==null);
        var objectDeconnect = {
            "idUser": parseInt(a)
        };
        // clearAllStorage();
        // cptTokenSucess = 0;
        // $location.path('/access/login');
        // $state.go('access.login');
        // $scope.$emit('logout');
        // $scope.preventBack();
        if (a != null && a != undefined && a != '') {
            $http.post(baseUrl + 'login/logout', objectDeconnect, { headers: { 'Authorization': 'Bearer ' + myIdentity } })
                .then(function(response) {
                    // console.log("Bye!!!!!!!!! ",response);
                    if (response.data.status == 0) {
                        if ($scope.separatorConnect != '' && $scope.separatorConnect != undefined && $scope.separatorConnect != null) {
                            cptTokenSucess = 0;
                            $location.path('/access/login');
                            $state.go('access.login');
                            $scope.$emit('logout');
                            $scope.preventBack();
                        };
                        // if($scope.separatorConnect!='' && $scope.separatorConnect!=undefined && $scope.separatorConnect!=null){
                        // switch($scope.separatorConnect){
                        // case 'LOGOUT' :
                        // cptTokenSucess=0;
                        // $location.path('/access/login');
                        // $state.go('access.login');
                        // $scope.$emit('logout');
                        // $scope.preventBack();
                        // break;
                        // case 'status-2' :
                        // break;
                        // };
                        // };
                    } else {
                        clearAllStorage();
                        $location.url('/access/login');
                        $state.go('access.login');
                        $scope.preventBack();
                    };
                }), (function(err) {
                    // clearAllStorage();
                    // $location.url('/access/login');
                    // $state.go('access.login');
                    // $scope.preventBack();
                });
        };
    };

    // function backPreviousP1() {
        // window.history.go(-1);
        // return false;
    // };

    // function backNextP1() {
        // window.history.go(1);
        // return false;
    // };

    function clearAllStorage() {
        localStorage.setItem('login', '');
        localStorage.setItem('nav', '');
        localStorage.setItem('profile', '');
        localStorage.setItem('username', '');
        localStorage.setItem('username_2', '');
        localStorage.setItem('email', '');
        localStorage.setItem('tel1', '');
        localStorage.setItem('pagetitle', '');
        //localStorage.setItem('token', '');
        localStorage.setItem('jeton', '');
        localStorage.setItem('url', '');
        localStorage.setItem('success', 0);
        localStorage.setItem('pagetitle', '');
        sessionStorage.setItem("iduser", '');
        sessionStorage.setItem("ND_qs", '');
        sessionStorage.setItem("idInstitution", '');
        sessionStorage.setItem("idGrp", '');
        sessionStorage.setItem("idloc", '');
        sessionStorage.setItem("nomInstitution", '');
        // remove items
        localStorage.removeItem('login');
        localStorage.removeItem('nav');
        localStorage.removeItem('profile');
        localStorage.removeItem('username');
        localStorage.removeItem('username_2');
        localStorage.removeItem('email');
        localStorage.removeItem('tel1');
        localStorage.removeItem('pagetitle');
        //localStorage.removeItem('token');
        localStorage.removeItem('jeton');
        localStorage.removeItem('url');
        localStorage.removeItem('success');
        localStorage.removeItem('pagetitle');
        sessionStorage.removeItem("iduser");
        sessionStorage.removeItem("ND_qs");
        sessionStorage.removeItem("idInstitution");
        sessionStorage.removeItem("idGrp");
        sessionStorage.removeItem("idloc");
        sessionStorage.removeItem("nomInstitution");

    };
    $scope.clearCache = function() {
        $templateCache.removeAll();
    };
    // var currentState = history.state;
    // //////console.log(currentState);document.URL.split("#!")[1];
    window.onpopstate = function(event) {
        // //console.log("aaaaa");
        var url = $location.path();
        if (localStorage.getItem('jeton') == '' ||
            localStorage.getItem('jeton') == null ||
            localStorage.getItem('jeton') == undefined &&
            url != '/access/forgotpwd') {
            // $window.location.href = '/app';
            disconnApi(sessionStorage.getItem("iduser"));
            clearAllStorage();
            // $location.url('/access/login');
            // $state.go('access.login');
            // $state.relod();
            // window.location.reload();
            // //localStorage.setItem('token',null);
            $scope.preventBack();
        };

        if (localStorage.getItem('success') == 1 && ((url === '/access/login') || (url === '/') || (url === '/access/access_confirmation')) && (localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined && localStorage.getItem('jeton') != '')) {
            switch (localStorage.getItem('profile')) {
                case 'ROLE_SUPER_ADMIN':
                    // $location.url('/eTreasury/tables/entreprise/entreprise');
                    $state.go('app.statut');
                    $scope.preventBack();
                    break;

                case 'ADMIN_ENTREPRISE':
                    //$location.url('/eTreasury/entreprise/adminent_op_cr_spot');
                    $state.go('app.statut');
                    $scope.preventBack();
                    break;

                case 'ADMIN_BANQUE':
                    //$state.go('app.nos-taux');
                    $state.go('app.statut');
                    $scope.preventBack();
                    break;

                case 'USER_HABILITY_BA':
                    //$state.go('app.nos-taux');
                    $state.go('app.statut');
                    $scope.preventBack();
                    break;

                case 'USER_HABILITY_EN':
                    //$location.url('/eTreasury/entreprise/adminent_op_cr_spot');
                    $state.go('app.statut');
                    $scope.preventBack();
                    break;
            };
        };

        if ((localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined && localStorage.getItem('jeton') != '') && localStorage.getItem('success') != 1 &&
            (sessionStorage.getItem("ND_qs") != null && sessionStorage.getItem("ND_qs") != undefined && sessionStorage.getItem("ND_qs") != '')) {
            $location.url('/access/access_confirmation');
            $scope.preventBack();
        };

        if ((localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined && localStorage.getItem('jeton') != '') &&
            (sessionStorage.getItem("ND_qs") == null || sessionStorage.getItem("ND_qs") == undefined || sessionStorage.getItem("ND_qs") == '')) {
            $location.url('/access/login');
            $state.go('access.login');
            clearAllStorage();
            $scope.preventBack();
        };
        // $timeout(function () {
        // if(localStorage.getItem('success')!=0&&localStorage.getItem('success')!=''&&
        // localStorage.getItem('success')!=undefined&&localStorage.getItem('success')!=null){
        // if(url==='/access/access_confirmation'){
        // backNextP1();
        // };
        // if(url==='/access/login'){
        // backPreviousP1();
        // };
        // if(url==='/access/forgotpwd'){
        // $location.url('/access/forgotpwd');
        // $state.go('access.forgotpwd');
        // };
        // };
        // if(localStorage.getItem('jeton')!=''&&localStorage.getItem('jeton')!=undefined&&
        // (localStorage.getItem('success')==0||localStorage.getItem('success')==null||localStorage.getItem('success')==undefined)&&(url!='/access/forgotpwd')){
        // backNextP1();
        // };
        // },0);

        switch (localStorage.getItem('nav')) {
            case 'general':
                if (url.split("/")[1] == 'eTreasury' &&
                    (url.split("/")[2] == 'entreprise' ||
                        url.split("/")[2] == 'banque' ||

                        url.split("/")[2] == '') && url != '/eTreasury/info/profile' && url != '/eTreasury/user/statut' && url != '/eTreasury/charts/dashboard' && url != '/eTreasury/admin/notifications') {
                    disconnApi(sessionStorage.getItem("iduser"));
                    clearAllStorage();
                    // $location.url('/access/login');
                    // $state.go('access.login');
                }
                break;
            case 'blog':
                if (url.split("/")[1] == 'eTreasury' && url.split("/")[2] != 'entreprise' && url != '/eTreasury/user/statut' && url != '/eTreasury/info/profile' && url != '/eTreasury/admin/notifications') {
                    disconnApi(sessionStorage.getItem("iduser"));
                    clearAllStorage();
                    // $location.url('/access/login');
                    // $state.go('access.login');
                }
                break;
            case 'hospital':
                if (url.split("/")[1] == 'eTreasury' && url.split("/")[2] != 'banque' && url != '/eTreasury/user/statut' && url != '/eTreasury/info/profile' && url != '/eTreasury/admin/notifications') {
                    disconnApi(sessionStorage.getItem("iduser"));
                    clearAllStorage();
                    // $location.url('/access/login');
                    // $state.go('access.login');
                }
                break;
            default:
                if (url === '/access/forgotpwd' && (localStorage.getItem('jeton') == null || localStorage.getItem('jeton') == undefined || localStorage.getItem('jeton') === '')) {
                    // disconnApi(sessionStorage.getItem("iduser"));
                    // clearAllStorage();
                    $location.url('/access/forgotpwd');
                    $state.go('access.forgotpwd');
                } else {
                    disconnApi(sessionStorage.getItem("iduser"));
                    clearAllStorage();
                    // $location.url('/access/login');
                    // $state.go('access.login');
                };
                break;
        };
    };

    // window.addEventListener('popstate', function () {
    // history.pushState(null, null, 'http://localhost:8000/app/#!/access/access_confirmation');
    // history.replaceState(null, null, '/app/#!/access/access_confirmation');
    // });
    $scope.loadLog = false;
    $scope.login = function(a, b) {
        $scope.loadLog = true;
        $http({
            method: "POST",
            url: baseUrlLogin + 'login',
            data: {
                login: '' + a,
                password: '' + b
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function(response) {
            // console.log("Connexion success ",response.data);
            var acces = '';
            if (response.data.jeton != null && response.data.jeton != undefined) {
                acces = response.data.jeton.split(" ")[1];
                myIdentity = acces;
            };

            if (response.data.status == 0) {
                $scope.email_V = response.data.user.email;
                $scope.isExpiredToken = false;
                localStorage.setItem('login', a);
                localStorage.setItem('username', '' + response.data.user.nom);
                localStorage.setItem('username_2', '' + response.data.user.prenom);
                sessionStorage.setItem("iduser", response.data.user.idUtilisateur);
                sessionStorage.setItem("ND_qs", '2018');
                //localStorage.setItem('token', '' + response.data.token);
                localStorage.setItem('jeton', '' + acces);
                localStorage.setItem('email', '' + response.data.user.email);
                localStorage.setItem('tel1', '' + response.data.user.telephone);
                localStorage.setItem('profile', '' + response.data.user.profilIdProfil.type);
                // sessionStorage.setItem("iduser", response.data.user.idUtilisateur);
                sessionStorage.setItem("idInstitution", response.data.user.groupeIdGroupe.institution.idInstitution);
                sessionStorage.setItem("idloc", response.data.user.groupeIdGroupe.institution.localityIdLocalite.idLocalite);
                sessionStorage.setItem("nomInstitution", response.data.user.groupeIdGroupe.institution.nom);
                sessionStorage.setItem("idGrp", response.data.user.groupeIdGroupe.idGroupe);
                $scope.userId = response.data.user.idUtilisateur;
                var d = new Date();
                $scope.suivreDateDebToken = d.getMinutes();
                if (!response.data.user.isActive) {
                    $scope.loadLog = false;
                    $scope.isActive = true;
                    $scope.authError = false;
                    $scope.messageLogin = response.data.message;
                } else {
                    switch (response.data.user.profilIdProfil.type) {
                        case 'ROLE_SUPER_ADMIN':
                            localStorage.setItem('nav', 'general');
                            // localStorage.setItem('profile', 'ADMIN_GÉNÉRAL');
                            $state.go('access.token_validation');
                            break;
                        case 'ADMIN_ENTREPRISE':
                            localStorage.setItem('nav', 'blog');
                            // localStorage.setItem('profile', 'ADMIN_ENTREPRISE');
                            $state.go('access.token_validation');
                            break;
                        case 'ADMIN_BANQUE':
                            localStorage.setItem('nav', 'hospital');
                            // localStorage.setItem('profile', 'ADMIN_BANK');
                            $state.go('access.token_validation');
                            break;
                        case 'USER_HABILITY':
                            if (response.data.type == 'BA') {
                                localStorage.setItem('nav', 'hospital');
                                localStorage.setItem('profile', '' + response.data.user.profilIdProfil.type + '_BA');
                                $state.go('access.token_validation');
                            } else if (response.data.type == 'EN') {
                                localStorage.setItem('nav', 'blog');
                                localStorage.setItem('profile', '' + response.data.user.profilIdProfil.type + '_EN');
                                $state.go('access.token_validation');
                            } //else {

                            //}
                            break;
                            // default :
                            // $scope.authError=false;
                            // $scope.log_in='';
                            // $scope.pwd='';
                            // break;
                    }
                }
            } else {
                $scope.loadLog = false;
                if (response.data.status == -2) {
                    $scope.separatorConnect = 'status-2';
                    $scope.messageToken = response.data.message;
                    if ($scope.messageToken.indexOf("déjà une session ouverte") != -1) {
                        $scope.messageToken = 'Cet utilisateur avait une session ouverte, nous venons de le déconnecter automatiquement, veuillez réessayer à présent.';
                    };
                    disconnApi(response.data.idUser);
                    tokenPop(false);
                    $scope.authError = false;
                    $scope.log_in = '';
                    $scope.pwd = '';
                } else {
                    $scope.authError = false;
                    $scope.log_in = '';
                    $scope.pwd = '';
                    $scope.messageLogin = response.data.message;
                };
            }
        }).catch(function(err) {
            // console.log("Erreur ",err); 
            $scope.loadLog = false;
            window.location.reload();
            $scope.preventBack();
        });
    };

    $scope.myFunc = function() {
        $scope.loadLog = false;
        $scope.loadConfLog = false;
        $scope.isExpiredToken = false;
        $scope.authError = true;
        $scope.isInvalidToken = true;
        $scope.isMaxToken = true;
        $scope.isActive = false;
        $scope.isVAlidEmail = false;
        $scope.isInvalidEmail = false;
        $scope.messageToken = '';
        $scope.messageLogin = '';
    };

    //RESET PASSWORD
    $scope.isVAlidEmail = false;
    $scope.isInvalidEmail = false;
    $scope.forgotPassword = function(email) {
        $http.post(baseUrl + 'admin/user/resetPassword', { "username": "" + email }).then(function(response) {
            if (response.data.status == 0) {
                $scope.isVAlidEmail = true;
            } else {
                $scope.isInvalidEmail = true;
            };
            // console.log("E-mail rep ",response);
            $scope.email_ = "";
        }), (function(err) {
            // console.log("E-mail err ",response);
        });
    };
    //FIN RESET PASSWORD

    // $rootScope.$on('', function() {
    // });
    $scope.isLogOut = false;
    $scope.logout = function() {
        $scope.separatorConnect = 'LOGOUT';
        // $scope.clearCache();
        // window.location.reload();
        disconnApi(sessionStorage.getItem("iduser"));
        // cptTokenSucess=0;
        // $location.path('/access/login');
        // $state.go('access.login');
        // $scope.$emit('logout');
        // $scope.preventBack();
    };

    $scope.dateName = '';
    // $scope.$watch("da",function( newValue, oldValue ) { 
    // //////console.log("newValue ",newValue);
    // //////console.log("oldValue ",oldValue);
    // });

    // $scope.showErrorNumb = function(data){
    // $scope.isErrorNumb=false;
    // if(data==0)
    // $scope.isErrorNumb=true;
    // };
    // $scope.showErrorTaux = function(data){
    // $scope.isErrorTaux=false;
    // if(data==0)
    // $scope.isErrortaux=true;
    // };
    // $scope.showErrorCourMax = function(data){
    // $scope.isErrorCourMax=false;
    // if(data==0)
    // $scope.isErrorCourMax=true;
    // };
    // $scope.showErrorCourMin = function(data){
    // $scope.isErrorCourMin=false;
    // if(data==0)
    // $scope.isErrorCourMin=true;
    // };
    // $window.onunload = function () {
    // //console.log("Hé tu fermes le navigateur");
    // };
    // $scope.onExit = function() {
    // disconnApi();
    // clearAllStorage();
    // };
    // $window.onbeforeunload =  $scope.onExit;
    // $scope.$on('onBeforeUnload', function (e, confirmation) {
    // disconnApi();
    // clearAllStorage();
    // });
    // $scope.$on('onUnload', function (e) {
    // disconnApi();
    // clearAllStorage();
    // });

    $scope.showErrorRefCourse = function(data) {
        $scope.isErrorRefCourse = false;
        if (data == 0)
            $scope.isErrorRefCourse = true;
    };
    /*RElOAD TIME*/
    function timeToWaitReload() {
        $timeout(function() {
            nb_confirm = 0;
            cptTokenSucess = 0;
            // localStorage.setItem('login','');
            // localStorage.setItem('nav','');
            // localStorage.setItem('profile','');  
            // localStorage.setItem('username','');
            // localStorage.setItem('username_2','');
            // localStorage.setItem('email','');
            // localStorage.setItem('tel1','');
            // localStorage.setItem('pagetitle','');
            // //localStorage.setItem('token','');
            // localStorage.setItem('url','');
            // localStorage.setItem('success',0)
            // sessionStorage.setItem("iduser",'');
            // sessionStorage.setItem("idInstitution",'');
            // $window.location.href = '/app';
            // $state.relod();
            // window.location.reload();
            $scope.logout();
            $scope.preventBack();
            // $scope.logout();
        }, 3000);
    };
    /*FIN RElOAD TIME*/

    /*TOKEN POPUP*/
    function tokenPop(bool) {
        if (bool != undefined) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/tokenpop.html',
                controller: 'tokenPopCtrl',
                resolve: {
                    items: function() {
                        return bool;
                    },
                    messenger: function() {
                        // if($scope.suivrePath==='/access/login' && ($scope.messageToken.indexOf("essais restant")!=-1 || $scope.messageToken.indexOf("déjà une session ouverte")!=-1
                        // || $scope.messageToken.indexOf("Oups une erreur est survenue,")!=-1
                        // || $scope.messageToken.indexOf("Cet utilisateur avez une session ouverte,")!=-1)){
                        // $scope.messageToken='Oups une erreur d\'internet, veuillez réessayer.';
                        // };
                        return $scope.messageToken;
                    }
                }
            });
        };

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    /*FIN TOKEN POPUP*/
    /*BACK LOGIN*/
    $scope.backHeader = function(data) {
        disconnApi(sessionStorage.getItem("iduser"));
        clearAllStorage();
        $location.url('/access/login');
    };
    /*FIN BACK LOGIN*/
    /*MESSAGES */
    $scope.$on('message_err', function(events, args) {
        var statut = args.statut;
        var msn = args.message;
        var isSuccess = false;
        if (statut == 0) {
            isSuccess = true;
            $rootScope.$broadcast('message_err_affich', { isSuccess: isSuccess, statut: statut, msn: msn });
        } else {
            isSuccess = false;
            $rootScope.$broadcast('message_err_affich', { isSuccess: isSuccess, statut: statut, msn: msn });
        };
    });

    function internetProblems(x) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/notificationsnet.html',
            controller: 'deletionConfirmEnCtrl',
            resolve: {
                x: function() {
                    return x;
                }
            }
        });
    };
    $scope.$on('message_internet', function(events, args) {
        //console.log("Internet parti ",args.x);
        var x = args.x;
        internetProblems(x);
    });
    $scope.$watch('suivicomptNbOffline2', function(a, b) {

    });
    $scope.$watch('online', function(a, b) {
        // //console.log("Network.. ",a);
        var path_ = $location.path();
        // comptNbOffline++;
        var x = 'Oups problème d\'internet.';
        // $rootScope.$broadcast('internet', {message_net});
        if (!a && (path_ === '/access/login' || path_ === '/access/forgotpwd' || path_ === '/access/access_confirmation')) {
            internetProblems(x);
        };
    });
    /*FIN MESSAGES */

    $scope.app = {
        prenom: 'Séga',
        photo: "data/profile/profile-blog.jpg",
        name: 'NDIAYE',
        email: 'segadembandiaye2007@gmail.com',
        tel1: 777091513,
        version: '4.0.1',
        profile: '',
        type: '', // general,hospital,university,music,crm,blog,socialmedia,freelancing,ecommerce
        color: {
            primary: '#673AB7',
            accent: '#FF6E40',
            info: '#26C6DA',
            success: '#46be8a',
            warning: '#fdb45d',
            danger: '#F44336',
            secondary: '#a9a9a9',
            text: '#767676'
        },
        settings: {
            menuProfile: true,
            menuFolded: menufold,
            chatFolded: true,
            layoutBoxed: false,
            searchFocus: false,
            pagetitle: '' + localStorage.getItem('pagetitle')
        }
    }

    $scope.loadConfLog = false;
    $scope.confirmToken = function(token) {
        $scope.loadConfLog = true;
        var objectToken = {
            "idUser": sessionStorage.getItem("iduser"),
            "token": "" + token
        };
        var configuAut = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jeton')
            }
        };
        // $scope.preventBack();
        nb_confirm++;
        // //////console.log("$scope.userId ",$scope.userId);

        $scope.app.type = '' + localStorage.getItem('nav');
        $scope.app.profile = '' + localStorage.getItem('profile');
        // $scope.app.profileid=''+localStorage.getItem('profileid');
        $scope.app.name = '' + localStorage.getItem('username');
        $scope.app.prenom = '' + localStorage.getItem('username_2');
        $scope.app.email = '' + localStorage.getItem('email');
        $scope.app.tel1 = '' + localStorage.getItem('tel1');

        if (localStorage.getItem('login') != '' && nb_confirm == 4 && token != localStorage.getItem('jeton')) {
            $scope.isInvalidToken = true;
            $scope.isMaxToken = false;
            $scope.loadConfLog = false;
            $scope.loadLog = false;
            disconnApi(sessionStorage.getItem("iduser"));
            tokenPop(true);
            $timeout(function() {
                // timeToWaitReload();
                clearAllStorage();
                $location.url('/access/login');
                $state.go('access.login');
                $scope.preventBack();
            }, 0);
        } else {
            $http({
                method: "POST",
                url: baseUrl + 'login/token/validation',
                data: objectToken,
                headers: configuAut.headers
            }).then(function(response) {
                // nb_confirm++;
                // console.log("Validation Token ",response);
                // //console.log("localStorage.getItem ",localStorage.getItem('jeton'));
                if (response.data.status == 0) {
                    nb_confirm = 0;
                    cptTokenSucess++;
                    switch (localStorage.getItem('profile')) {
                        case 'ROLE_SUPER_ADMIN':
                            localStorage.setItem('success', 1);
                            //$location.url('/eTreasury/tables/entreprise/entreprise');
                            $state.go('app.statut');
                            $scope.preventBack();
                            break;
                        case 'ADMIN_ENTREPRISE':
                            localStorage.setItem('success', 1);
                            //$location.url('/eTreasury/entreprise/adminent_op_cr_spot');
                            $state.go('app.statut');
                            $scope.preventBack();
                            break;
                        case 'ADMIN_BANQUE':
                            localStorage.setItem('success', 1);
                            //$state.go('app.nos-taux');
                            $state.go('app.statut');
                            $scope.preventBack();
                            break;
                        case 'USER_HABILITY_BA':
                            localStorage.setItem('success', 1);
                            //$state.go('app.nos-taux');
                            $state.go('app.statut');
                            $scope.preventBack();
                            break;
                        case 'USER_HABILITY_EN':
                            localStorage.setItem('success', 1);
                            // $location.url('/eTreasury/entreprise/adminent_op_esp_mesdoc');
                            //$location.url('/eTreasury/entreprise/adminent_op_cr_spot');
                            $state.go('app.statut');
                            $scope.preventBack();
                            break;
                            // default :
                            // $scope.isInvalidToken=false;
                            // $scope.token='';
                            // break;
                    }
                } else {
                    /****30012018*************/
                    $scope.token = '';
                    $scope.isInvalidToken = false;
                    $scope.loadConfLog = false;
                    $scope.messageToken = response.data.message;
                    if ($scope.messageToken.indexOf("déjà une session ouverte") != -1) {
                        $scope.messageToken = 'Cet utilisateur avait une session ouverte, nous venons de le déconnecter automatiquement, veuillez réessayer à présent.';
                    };
                    if ($scope.messageToken.indexOf("expiré") != -1) {
                        disconnApi(sessionStorage.getItem("iduser"));
                        tokenPop(false);
                        clearAllStorage();
                        $location.url('/access/login');
                        $state.go('access.login');
                        $scope.preventBack();
                    };
                    if (nb_confirm == 3) {
                        nb_confirm = 0;
                        $scope.isInvalidToken = true;
                        $scope.isMaxToken = false;
                        $scope.loadConfLog = false;
                        $scope.loadLog = false;
                        disconnApi(sessionStorage.getItem("iduser"));
                        tokenPop(true);
                        $timeout(function() {
                            clearAllStorage();
                            $location.url('/access/login');
                            $state.go('access.login');
                            $scope.preventBack();
                        }, 0);
                    };
                    /****30012018*************/
                    // if($scope.messageToken.indexOf("essais restant")!=-1){
                    // $scope.messageToken='Oups une erreur est survenue, veuillez réessayer.';
                    // };
                    // //console.log("oups hé2 ",response.data);
                    /****30012018*************/
                    if ($scope.messageToken.indexOf("La session a expiré") == -1 && $scope.messageToken.indexOf("déjà une session ouverte") == -1 && nb_confirm != 3) {
                        // $scope.isExpiredToken = true;
                        // disconnApi(sessionStorage.getItem("iduser"));
                        tokenPop(false);
                    };
                    $scope.isExpiredToken = true;
                    /****30012018*************/
                    // $timeout(function () {
                    // clearAllStorage();
                    // $location.url('/access/login');
                    // $state.go('access.login');
                    // $scope.preventBack();
                    // },0);
                    // else{
                    // $scope.messageToken=response.data.message;
                    // if($scope.messageToken.indexOf("déjà une session ouverte")!=-1){
                    // $scope.messageToken='Cet utilisateur avait une session ouverte, nous venons de le déconnecter automatiquement, veuillez réessayer à présent.';
                    // disconnApi(sessionStorage.getItem("iduser"));
                    // tokenPop(false);
                    // $timeout(function () {
                    // clearAllStorage();
                    // $location.url('/access/login');
                    // $state.go('access.login');
                    // $scope.preventBack();
                    // },0);
                    // };
                    // };
                };
            }).catch(function(err) {
                // nb_confirm++;
                // console.log("Error Validation Token ",err);
                $scope.loadConfLog = false;

                if (err.status == 500) {
                    nb_confirm = 0;
                    disconnApi(sessionStorage.getItem("iduser"));
                    $location.url('/access/login');
                    $state.go('access.login');
                    $timeout(function() {
                        window.location.reload();
                    }, 2000);
                    $scope.preventBack();
                };
            });
        };

        $(window).bind("popstate", function() {
            $.getScript(location.href);
        });

        $(window).bind("popstate", function(e) {
            var state = e.originalEvent.state;
            if (state === null) {
                // //console.log("step one");
            } else {
                // //console.log(state.foo);
            }
        });

        // nb_confirm=0;
    };

    $scope.menuSelectAfterAdd = function(a) {
        // $scope.app.settings.pagetitle=''+localStorage.getItem('menu');
    };

    $scope.$watch("app.settings.pagetitle", function(newValue, oldValue) {
        localStorage.setItem('pagetitle', newValue);
    });

    // //////console.log(localStorage.getItem('pagetitle'));
    $scope.path == null;
    $interval(function() {
        var path = $location.path();
        $scope.path = path;
        // var d = new Date();
        if (localStorage.getItem('jeton') != null || localStorage.getItem('jeton') != undefined || localStorage.getItem('jeton') != '') {
            var d = new Date();
            $scope.suivreDateSuiviToken = d.getMinutes();
        };
    }, 1);

    $scope.diffDateTokenLive = 0;

    $scope.$watch("suivreDateSuiviToken", function(newValue, oldValue) {
        switch ($scope.suivreDateDebToken) {
            case 59:
                if ($scope.suivreDateSuiviToken == 4) {
                    $scope.diffDateTokenLive = 5;
                }
                break;
            case 58:
                if ($scope.suivreDateSuiviToken == 3) {
                    $scope.diffDateTokenLive = 5;
                }
                break;
            case 57:
                if ($scope.suivreDateSuiviToken == 2) {
                    $scope.diffDateTokenLive = 5;
                }
                break;
            case 56:
                if ($scope.suivreDateSuiviToken == 1) {
                    $scope.diffDateTokenLive = 5;
                }
                break;
            default:
                $scope.diffDateTokenLive = $scope.suivreDateSuiviToken - $scope.suivreDateDebToken;
                break;
        };
    });

    $scope.$watch("diffDateTokenLive", function(newValue, oldValue) {
        var path = $location.path();
        if (newValue == 5 && cptTokenSucess == 0 && path.split("/")[2] == 'access_confirmation' && (localStorage.getItem('success') == 0 || localStorage.getItem('success') == undefined || localStorage.getItem('success') == null)) {
            // $scope.separatorConnect='max5';
            $scope.loadLog = false;
            $scope.messageToken = 'Vous avez fait 5 mns sans avoir confirmé votre token, veuillez-vous réauthentifier.';
            $scope.isInvalidToken = false;
            disconnApi(sessionStorage.getItem("iduser"));
            tokenPop(false);
            $timeout(function() {
                clearAllStorage();
                $location.url('/access/login');
                $state.go('access.login');
                $scope.preventBack();
            }, 0);
        };
    });

    // $scope.suivrePath=''
    /*SUIVRE PATH*/
    // $scope.$watch("path",function( newValue, oldValue ) { 
    // localStorage.setItem('url',newValue);
    // newValue=localStorage.getItem('url');
    // });
    /*FIN SUIVIE PATH*/
    $scope.suiviToken_ = localStorage.getItem('jeton');
    $interval(function() {
        // //console.log("suiviToken_ ",localStorage.getItem('jeton'));
        $scope.suivrePath = $location.path();
        $scope.suiviToken_ = localStorage.getItem('jeton');
        // if(($scope.suiviToken_=='' || $scope.suiviToken_==null || $scope.suiviToken_==undefined || sessionStorage.getItem("iduser")=='' || sessionStorage.getItem("iduser")==null || sessionStorage.getItem("iduser")==undefined) && $scope.suivrePath!='/access/login' && $scope.suivrePath!='/access/forgotpwd'){
        // disconnApi();
        // clearAllStorage();
        // $location.url('/access/login');
        // $state.go('access.login');
        // $scope.preventBack();
        // };
    }, 1000);
    $scope.$watch('suivrePath', function(a, b) {
        $scope.preventBack();
        $scope.suivrePath = $location.path();
        $scope.suiviToken_ = localStorage.getItem('jeton');
        if (($scope.suiviToken_ == '' || $scope.suiviToken_ == null || $scope.suiviToken_ == undefined || sessionStorage.getItem("ND_qs") == '' || sessionStorage.getItem("ND_qs") == null || sessionStorage.getItem("ND_qs") == undefined) && $scope.suivrePath != '/access/login' && $scope.suivrePath != '/access/forgotpwd') {
            disconnApi(sessionStorage.getItem("iduser"));
            clearAllStorage();
            $scope.loadLog = false;
            $location.url('/access/login');
            $state.go('access.login');
            $scope.preventBack();
        };

        if (a === '/access/login' && ($scope.messageToken.indexOf("déjà une session ouverte") != -1 ||
                $scope.messageToken.indexOf("Oups une erreur est survenue,") != -1 ||
                $scope.messageToken.indexOf("Cet utilisateur avez une session ouverte,") != -1)) {
            // $scope.messageToken='Tentative de connexion échouée, veuillez réessayer.';
            disconnApi(sessionStorage.getItem("iduser"));
            $scope.clearCache();
            $timeout(function() {
                window.location.reload();
                $scope.preventBack();
            }, 5000);
        };
    });
    $scope.$watch('suiviToken_', function(a, b) {
        if ((b != '' && b != null && b != undefined) && (a == '' || a === '' || a == undefined || a == null)) {
            var x = 'Déconnexion';
            myIdentity = b;
            // $rootScope.$broadcast('fermPopNotif', {x});
            // localStorage.setItem('login','');
            // localStorage.setItem('nav','');
            // localStorage.setItem('profile','');  
            // localStorage.setItem('username','');
            // localStorage.setItem('username_2','');
            // localStorage.setItem('email','');
            // localStorage.setItem('tel1','');
            // localStorage.setItem('pagetitle','');
            // //localStorage.setItem('token','');
            // localStorage.setItem('url','');
            // localStorage.setItem('success',0)
            // sessionStorage.setItem("iduser",'');
            // sessionStorage.setItem("idInstitution",'');
            // sessionStorage.setItem("isIn",'');
            // $window.location.href = '/app';
            // $location.url('/access/login');
            // $state.go('access.login');
            // $scope.clearCache();
            // $location.url('/access/login');
            // $state.go('access.login');
            // $state.reload();
            // window.location.reload();
            // disconnApi();
            $scope.loadLog = false;
            nb_confirm = 0;
            cptTokenSucess = 0;
            $scope.preventBack();
            $scope.logout();
        };

        if ((localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined && localStorage.getItem('jeton') != '') && localStorage.getItem('success') != 1 &&
            (sessionStorage.getItem("ND_qs") != null && sessionStorage.getItem("ND_qs") != undefined && sessionStorage.getItem("ND_qs") != '')) {
            $location.url('/access/access_confirmation');
            $scope.preventBack();
        };

        if ((localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined && localStorage.getItem('jeton') != '') &&
            (sessionStorage.getItem("ND_qs") == null || sessionStorage.getItem("ND_qs") == undefined || sessionStorage.getItem("ND_qs") == '')) {
            disconnApi(sessionStorage.getItem("iduser"));
            clearAllStorage();
            $location.url('/access/login');
            $state.go('access.login');
            $scope.preventBack();
        };
    });

    // document.addEventListener("mouseover", function(evt){
    // var mouseX = evt.clientX;
    // var mouseY = evt.clientY;
    // }, false);

    function warning() {
        // //console.log("warning");
        $scope.app.type = '' + localStorage.getItem('nav');
        var path = $location.path();
        if (localStorage.getItem('nav') != null) {
            $scope.app.type = '' + localStorage.getItem('nav');
            $scope.app.profile = '' + localStorage.getItem('profile');
            $scope.app.name = '' + localStorage.getItem('username');
            $scope.app.prenom = '' + localStorage.getItem('username_2');
        };

        if (localStorage.getItem('login') == '' || localStorage.getItem('login') == null ||
            localStorage.getItem('nav') == '' || localStorage.getItem('nav') == null && (path != '/access/forgotpwd')) {
            // $window.location.href = '/app';
            // $scope.clearCache();
            disconnApi(sessionStorage.getItem("iduser"));
            clearAllStorage();
            $location.url('/access/login');
            $state.go('access.login');
            // window.location.reload();
            nb_confirm = 0;
            cptTokenSucess = 0;
            $scope.preventBack();
        };

        if (localStorage.getItem('success') == 1 && ((path === '/access/login') || (path === '/') || (path === '/access/access_confirmation')) && (localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined && localStorage.getItem('jeton') != '')) {
            switch (localStorage.getItem('profile')) {
                case 'ROLE_SUPER_ADMIN':
                    $location.url('/eTreasury/tables/entreprise/entreprise');
                    $scope.preventBack();
                    break;

                case 'ADMIN_ENTREPRISE':
                    $location.url('/eTreasury/entreprise/adminent_op_cr_spot');
                    $scope.preventBack();
                    break;

                case 'ADMIN_BANQUE':
                    $state.go('app.nos-taux');
                    $scope.preventBack();
                    break;

                case 'USER_HABILITY_BA':
                    $state.go('app.nos-taux');
                    $scope.preventBack();
                    break;

                case 'USER_HABILITY_EN':
                    $location.url('/eTreasury/entreprise/adminent_op_cr_spot');
                    $scope.preventBack();
                    break;
            };
        };

        if ((localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined && localStorage.getItem('jeton') != '') && localStorage.getItem('success') != 1 &&
            (sessionStorage.getItem("ND_qs") != null && sessionStorage.getItem("ND_qs") != undefined && sessionStorage.getItem("ND_qs") != '')) {
            $location.url('/access/access_confirmation');
            $scope.preventBack();
        };

        if ((localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined && localStorage.getItem('jeton') != '') &&
            (sessionStorage.getItem("ND_qs") == null || sessionStorage.getItem("ND_qs") == undefined || sessionStorage.getItem("ND_qs") == '')) {
            disconnApi(sessionStorage.getItem("iduser"));
            clearAllStorage();
            $location.url('/access/login');
            $state.go('access.login');
            $scope.preventBack();
        };

        if ($scope.$root && !$scope.$root.$$phase) {
            $scope.$apply();
        };
        // $state.reload();
        // $state.forceReload();
    }
    window.onbeforeunload = warning;

    $(window).unload(function() {
        // //console.log("window.unload");
    });
    $scope.$watch('app.type', function(a, b) {
        $scope.app.type = '' + localStorage.getItem('nav');
        $scope.app.type = '' + localStorage.getItem('nav');
        $scope.app.profile = '' + localStorage.getItem('profile');
        $scope.app.name = '' + localStorage.getItem('username');
        $scope.app.prenom = '' + localStorage.getItem('username_2');

        if (a != null && a != undefined && a != '' && a != 'null' && a != 'undefined') {
            $state.reload();
        };
        if ($scope.$root && !$scope.$root.$$phase) {
            $scope.$apply();
        };
    });
    // if(window.event==undefined){
    // if(localStorage.getItem('jeton')==null && localStorage.getItem('jeton')==undefined && localStorage.getItem('jeton')=='' ||
    // localStorage.getItem('success')==0&&localStorage.getItem('success')==''&&localStorage.getItem('success')==undefined){
    // disconnApi();
    // window.location.reload();
    // $scope.preventBack();
    // };
    // };
    if (window.event) {
        // //console.log("window.event");
        // //console.log("Event");
        // //////console.log(history.length);
        // var absUrl = $location.absUrl();
        // var url = $location.url();
        // var protocol = $location.protocol();
        // var host = $location.host();
        $scope.app.type = '' + localStorage.getItem('nav');
        var path = $location.path();
        // if(localStorage.getItem('success')!=0&&localStorage.getItem('success')!=''&&localStorage.getItem('success')!=undefined){
        // if(path==='/access/access_confirmation'){
        // backNextP1();
        // };
        // if(path==='/access/login'){
        // backPreviousP1();
        // };
        // if(path==='/access/forgotpwd'){
        // $location.url('/access/forgotpwd');
        // $state.go('access.forgotpwd');
        // }
        // };

        // if(localStorage.getItem('jeton')!=''&&localStorage.getItem('jeton')!=undefined&&
        // (localStorage.getItem('success')==0||localStorage.getItem('success')==null||localStorage.getItem('success')==undefined)){			
        // backNextP1();
        // };

        if (localStorage.getItem('nav') != null) {
            $scope.app.type = '' + localStorage.getItem('nav');
            $scope.app.profile = '' + localStorage.getItem('profile');
            $scope.app.name = '' + localStorage.getItem('username');
            $scope.app.prenom = '' + localStorage.getItem('username_2');
        };

        if (localStorage.getItem('login') == '' || localStorage.getItem('login') == null ||
            localStorage.getItem('nav') == '' || localStorage.getItem('nav') == null && (path != '/access/forgotpwd')) {
            // $location.url('/access/login');
            // $window.location.href = '/app';
            // $scope.clearCache();
            disconnApi(sessionStorage.getItem("iduser"));
            $location.url('/access/login');
            $state.go('access.login');
            // window.location.reload();
            $scope.preventBack();
        };

        if ((localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined && localStorage.getItem('jeton') != '') && localStorage.getItem('success') != 1 &&
            (sessionStorage.getItem("ND_qs") != null && sessionStorage.getItem("ND_qs") != undefined && sessionStorage.getItem("ND_qs") != '')) {
            $location.url('/access/access_confirmation');
            $scope.preventBack();
        };

        if ((localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined && localStorage.getItem('jeton') != '') &&
            (sessionStorage.getItem("ND_qs") == null || sessionStorage.getItem("ND_qs") == undefined || sessionStorage.getItem("ND_qs") == '')) {
            disconnApi(sessionStorage.getItem("iduser"));
            clearAllStorage();
            $location.url('/access/login');
            $state.go('access.login');
            $scope.preventBack();
        };

        if ($scope.$root && !$scope.$root.$$phase) {
            $scope.$apply();
        };
    };

    $scope.menuChatToggle = function(type, value) {
        if (type == "menu" && !value) {
            $scope.app.settings.chatFolded = true;
        }
        if (type == "chat" && !value) {
            $scope.app.settings.menuFolded = true;
        }
    }
    $scope.changeMenuHeight = function() {
        ////console.log($scope.settings.menuProfile);
        if ($scope.app.settings.menuFolded == true) {
            var navHeight = angular.element("#main-content section.wrapper .content-wrapper").innerHeight() + 90;
        } else {
            var navHeight = $(window).innerHeight() - 60;
        }
        ////console.log(navHeight);
        angular.element("#main-menu-wrapper").height(navHeight);
    }
    $scope.$watch('app.settings.menuFolded', function() {
        $scope.changeMenuHeight();
    });
    $scope.$on('$viewContentLoaded', function(next, current) {
        angular.element(document).ready(function() {
            $scope.changeMenuHeight();
        });
    });
    $scope.ElementInView = function(inview, event, addclass, removeclass) {
        var id = event.inViewTarget.id;
        /*//console.log(event);  */
        if (inview && id != "") {
            if (addclass != "") {
                $("#" + id).addClass(addclass);
            } else {
                $("#" + id).removeClass(removeclass);
            }
        }
        return false;
    }
    $scope.testLines = [];
    for (var i = 20; i >= 0; i--) {
        $scope.testLines.push(i);
    };
    $scope.lineInView = function(index, inview, inviewpart, event) {
        /*//console.log(inview+" "+index+" "+inviewpart+" "+event);    */
        /*//console.log(event.inViewTarget.id);  */
        return false;
    };

    
}]);

app.controller('LogoutFormController', ['$scope', '$rootScope', '$http', '$location', '$state', '$timeout', '$templateCache', '$window', function($scope, $rootScope, $http, $location, $state, $timeout, $templateCache, $window) {
    function preventBack() {
        window.history.forward();
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function() {
            history.pushState(null, null, document.URL);
        });
    };
    // //console.log("Time is up.");
    $rootScope.$on('logout', function() {
        $scope.clearCache = function() {
            $templateCache.removeAll();
        };
        $scope.clearCache();
        localStorage.setItem('login', '');
        localStorage.setItem('nav', '');
        localStorage.setItem('profile', '');
        localStorage.setItem('username', '');
        localStorage.setItem('username_2', '');
        localStorage.setItem('email', '');
        localStorage.setItem('tel1', '');
        localStorage.setItem('pagetitle', '');
        //localStorage.setItem('token', '');
        localStorage.setItem('jeton', '');
        localStorage.setItem('url', '');
        localStorage.setItem('success', 0);
        localStorage.setItem('pagetitle', '');
        sessionStorage.setItem("iduser", '');
        sessionStorage.setItem("ND_qs", '');
        sessionStorage.setItem("idInstitution", '');
        // sessionStorage.setItem("isIn",'');
        sessionStorage.setItem("idGrp", '');
        sessionStorage.setItem("idloc", '');
        sessionStorage.setItem("nomInstitution", '');
        // remove items
        localStorage.removeItem('login');
        localStorage.removeItem('nav');
        localStorage.removeItem('profile');
        localStorage.removeItem('username');
        localStorage.removeItem('username_2');
        localStorage.removeItem('email');
        localStorage.removeItem('tel1');
        localStorage.removeItem('pagetitle');
        //localStorage.removeItem('token');
        localStorage.removeItem('jeton');
        localStorage.removeItem('url');
        localStorage.removeItem('success');
        localStorage.removeItem('pagetitle');
        sessionStorage.removeItem("iduser");
        sessionStorage.removeItem("ND_qs");
        sessionStorage.removeItem("idInstitution");
        sessionStorage.removeItem("idGrp");
        sessionStorage.removeItem("idloc");
        sessionStorage.removeItem("nomInstitution");
        // $location.path('/access/login');
        // $state.go('access.login');
        // $scope.clearCache();
        // $state.relod();
        // window.location.reload();
        // $window.location.href = '/access/login';
        // $scope.clearCache();
        // window.location.reload();
        $timeout(function() {
            window.location.reload();
            preventBack();
        }, 3000);
        // $scope.clearCache = function() { 
        // $templateCache.removeAll();
        // };
    });
}]);


/* CONTROLE FILE OPERATION */
angular.module('app').controller('ctrlFile', function($scope) {
    $scope.name = '';
    $scope.isPdf = false;
    var cntrl = this;

    $scope.setFile = function(element) {
        // //////console.log("ssss ",element);
        $scope.$apply(function($scope) {
            $scope.theFile = element.files[0];
            $scope.FileMessage = '';
            var filename = $scope.theFile.name;
            // //////console.log(filename.length)
            var index = filename.lastIndexOf(".");
            var strsubstring = filename.substring(index, filename.length);
            if (strsubstring == '.pdf') {
                $scope.isPdf = false;
                //////console.log('Fichier chargé avec succès');
            } else {
                $scope.isPdf = true;
                $scope.theFile = '';
                $scope.FileMessage = 'Fichier non .pdf';
            }
        });
    };

    cntrl.submitForm = function() {
        var file = cntrl.form.payloadFile;
        if ($scope.uploadedFileType === undefined) {
            return;
        }
        if ($scope.uploadedFileType != 'pdf') {
            $scope.isPdf = true;
            document.getElementById('payloadFile').setCustomValidity('Seulement les fichiers pdf sont supportés *.pdf');

        } else {
            // $scope.$emit('closemodal');
            //////console.log("Cooooooooo");
            $scope.ok();
            // $rootScope.$broadcast('a');
            document.getElementById('payloadFile').setCustomValidity('');
        }
    };
});
/*FIN CONTROLE FILE OPERATION */
//FILES VALIDATION DIRECTIVE
app.directive('validFile', function validFile($parse) {

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {

            ngModelCtrl.$validators.validFile = function() {

                element.on('change', function() {

                    var value = element.val(),
                        model = $parse(attrs.ngModel),
                        modelSetter = model.assign;

                    scope.uploadedFileType = null;

                    if (!value) {

                        modelSetter(scope, '');

                    } else {

                        var ext = value.substring(value.lastIndexOf('.') + 1).toLowerCase();

                        if (attrs.validFile.indexOf(ext) !== -1) {

                            scope.uploadedFileType = ext;
                            modelSetter(scope, element[0].files[0]);
                        } else {

                            scope.uploadedFileType = 'other';
                            modelSetter(scope, '');
                        }
                    }
                });
            };
        }
    };
});

app.controller('tokenPopCtrl', ['$scope', '$rootScope', '$uibModalInstance', 'items', 'messenger', function($scope, $rootScope, $modalInstance, items, messenger) {
    $scope.tokenState = items;
    $scope.messageToken = messenger;
    //////console.log($scope.tokenState);
    $scope.Ok = function() {
        $modalInstance.close();
        // window.location.reload();
    };
}]);




/***
 * ****************************************************************************************************
 * *********************************************ADMIN CONTROLLER*************************************** 
 * ****************************************************************************************************
 */

angular.module('app').controller('eTEnController', ['$scope', '$http', '$uibModal', '$log', '$rootScope', '$state', '$location', '$timeout', 'deconnectApi',
    function($scope, $http, $modal, $log, $rootScope, $state, $location, $timeout, deconnectApi) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        $scope.isuserInsessionLine = 0;

        /**
         * ******************ETREASURY LOCALITY************************
         */
        $scope.etreasuryLocalities = [];
        $scope.errorMessage = null;
        $scope.sucessMessage = null;
        $scope.idStatus = null;

        $scope.addLocalite = function() {
            //$scope.idLocalite=-1;
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/registerl.html',
                controller: 'popUpController',
                resolve: {
                    selectedRow: function() {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.editLocality = function(locality) {
            $scope.idLocality = locality.idLocalite;
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/registerl.html',
                controller: 'popUpController',
                resolve: {
                    selectedRow: function() {
                        return locality;
                    }
                }
            });

        };

        $rootScope.$on("CallParentMethod", function() {
            $scope.ListLocality();
        });

        $scope.ListLocality = function() {
            //$scope.isDataReadyEtLocalities=false;
            $http({
                method: 'GET',
                url: baseUrl + 'locality/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.etreasuryLocalities = response.data.locality_list;
                //$scope.isDataReadyEtLocalities=true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        /*list of locality*/
        function ListLocalityses() {
            $scope.isDataReadyEtLocalities = false;
            $http({
                method: 'GET',
                url: baseUrl + 'locality/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.etreasuryLocalities = response.data.locality_list;
                $scope.isDataReadyEtLocalities = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        ListLocalityses();

        function _error(response) {
            //console.log(response.statusText);
        }

        $scope.suppLocality = function(localite) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/deleteConfirmeLocalite.html',
                controller: 'suppressionController',
                resolve: {
                    selectedRow: function() {
                        return localite;
                    }
                }
            });

        };

        /********************FIN ETREASURY LOCALITY*******************************/

        /**
         * ******************ETREASURY GROUP************************
         */
        $scope.etreasuryGroupes = [];
        $scope.addGroupEt = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/registergr.html',
                controller: 'popUpController',
                resolve: {
                    selectedRow: function() {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        /*list of Group etreasury*/
        function etreasuryGroup() {
            $scope.isDataReadyEtGroupes = false;
            $http({
                method: 'GET',
                url: baseUrl + 'admin/groupe/admin_general/etreasury/list/' + idADmin,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.etreasuryGroupes = response.data.group_list_ET;
                $scope.isDataReadyEtGroupes = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        etreasuryGroup();

        $scope.editEtreasuryGroup = function(groupe) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/registergr.html',
                controller: 'popUpController',
                resolve: {
                    selectedRow: function() {
                        return groupe;
                    }
                }
            });
        };

        $scope.suppEtgroup = function(groups) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/deleteConfirmeEtGroupe.html',
                controller: 'suppressionController',
                resolve: {
                    selectedRow: function() {
                        return groups;
                    }
                }
            });

        };

        /***************************FIN ETREASURY GROUP***********************************/

        /**
         * ********************************ETREASURY USERS********************************/
        $scope.etreasuryUsers = [];
        $scope.addEtUser = function() {
            $scope.idEtreasuryUSER = -1;
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/registeru.html',
                controller: 'popUpController',
                resolve: {
                    selectedRow: function() {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        /*list of Group etreasury*/
        function etreasuryUsersAdmin() {
            $scope.isDataReadyEtUsers = false;
            $http({
                method: 'GET',
                url: baseUrl + 'admin/user_admin/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.etreasuryUsers = response.data.admin_list;
                for (var i = 0; i < $scope.etreasuryUsers.length; i++) {
                    if ($scope.etreasuryUsers[i].idUtilisateur == sessionStorage.getItem("iduser")) {
                        $scope.isuserInsessionLine = i;
                        break;
                    };
                };
                $scope.isDataReadyEtUsers = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        etreasuryUsersAdmin();
        $scope.message = '';

        $scope.editEtreasuryUSER = function(users) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/registeru.html',
                controller: 'popUpController',
                resolve: {
                    selectedRow: function() {
                        return users;
                    }
                }
            });

        };

        $scope.suppEtreasuryUSER = function(users) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/deleteConfirmEtUsers.html',
                controller: 'suppressionController',
                resolve: {
                    selectedRow: function() {
                        return users;
                    }
                }
            });

        };

        $scope.activeUSER = function(users) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/activeUser.html',
                controller: 'suppressionController',
                resolve: {
                    selectedRow: function() {
                        return users;
                    }
                }
            });

        };

        $scope.desactiveUSER = function(users) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/desactiveUser.html',
                controller: 'suppressionController',
                resolve: {
                    selectedRow: function() {
                        return users;
                    }
                }
            });

        };
        /***************************FIN ETREASURY GROUP***********************************/
        /**
         * *************************ENTREPRISE-ENTREPRISE********************************/

        $scope.addEtEntreprise = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/entreprise/registeret.html',
                controller: 'popUpController',
                resolve: {
                    selectedRow: function() {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.entrepriseList = [];

        function listEntreprise() {
            $scope.isReadyDataEnEn = false;
            $http({
                method: 'GET',
                url: baseUrl + 'admin/entreprise/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.entrepriseList = response.data.entreprise_list;
                $scope.isReadyDataEnEn = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        listEntreprise();
        $scope.editEntreprise = function(entrepris) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/entreprise/registeret.html',
                controller: 'popUpController',
                resolve: {
                    selectedRow: function() {
                        return entrepris;
                    }
                }
            });

        };

        $scope.suppEntreprise = function(entrepris) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/entreprise/deleteConfirmEnt.html',
                controller: 'suppressionController',
                resolve: {
                    selectedRow: function() {
                        return entrepris;
                    }
                }
            });

        };

        /**************************FIN ENTREPRISE-ENTREPRISE*********************************/


        /**
         * *************************ENTREPRISE GROUP*********************************/

        $scope.entrepriseGroupes = [];
        $scope.groupeENTRP = { nom: "", description: "", idGroupe: -1, institution: null };

        /*Add & Update Etreasury Users */
        $scope.submitGroupEntreprise = function() {
            $scope.disabl = true;
            $scope.groupeENTRP.nom = $scope.code;
            $scope.groupeENTRP.description = $scope.libelle;
            $scope.groupeENTRP.institution = $scope.entrepriseINS;
            $scope.groupeENTRP.idGroupe = $scope.idGroupEntreprise;
            var method = "";
            var url = "";
            if ($scope.idGroupEntreprise === -1) {
                //console.log("add success..............................");
                method = "POST";
                url = baseUrl + "admin/groupe/admin_general/add/" + idADmin;
            } else {
                //console.log("update success................................"+$scope.idGroupEntreprise);
                method = "PUT";
                url = baseUrl + "admin/groupe/admin_general/update/" + idADmin;
            }
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.groupeENTRP),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jeton')
                }
            }).then(reloadListEntGrp).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        listEntrepriseGroup();

        function reloadListEntGrp(response) {
            $scope.idStatus = response.data.status;
            if ($scope.idStatus === 0) {
                $scope.errorMessage = null;
                $scope.sucessMessage = response.data.message;
                //clear();
                listEntrepriseGroup();
                $state.reload();
            } else {
                $scope.sucessMessage = null;
                $scope.errorMessage = response.data.message;
            }
        }

        function listEntrepriseGroup() {
            $scope.isReadyDataGrEn = false;
            $http({
                method: 'GET',
                url: baseUrl + 'admin/groupe/admin_general/entreprise/list/' + idADmin,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.entrepriseGroupes = response.data.group_list_ET;
                $scope.isReadyDataGrEn = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        $scope.editGroupEntreprise = function(groupE) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/entreprise/registergr.html',
                controller: 'popUpController',
                resolve: {
                    selectedRow: function() {
                        return groupE;
                    }
                }
            });

        };

        $scope.suppEntrepriseGroup = function(groupE) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/entreprise/deleteConfirmEntGroup.html',
                controller: 'suppressionController',
                resolve: {
                    selectedRow: function() {
                        return groupE;
                    }
                }
            });

        };

        /**************************FIN ENTREPRISE GROUP*********************************/
        /**
         * *************************ENTREPRISE-USERS*********************************/
        $scope.addETUserEntreprise = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/entreprise/registeru.html',
                controller: 'popUpController',
                resolve: {
                    selectedRow: function() {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.id_user_admin = -1;
        $scope.allProfil = [];
        $scope.bankProfil = [];
        $scope.entrepriseProfil = [];

        listProfil();

        function listProfil() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/profile/list/' + idADmin,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.allProfil = response.data.profile_list;
                ////console.log($scope.allProfil);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.entrepriseUsers = [];

        function listEntrepriseUsers() {
            $scope.isReadyDataUserEn = false;
            $http({
                method: 'GET',
                url: baseUrl + 'admin/user_entreprise/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.entrepriseUsers = response.data.user_list;
                $scope.isReadyDataUserEn = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        listEntrepriseUsers();

        $scope.editUserEntreprise = function(entrepriseUse) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/entreprise/registeru.html',
                controller: 'popUpController',
                resolve: {
                    selectedRow: function() {
                        return entrepriseUse;
                    }
                }
            });

        };

        $scope.suppUserEntreprise = function(entrepriseUse) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/entreprise/deleteConfirmEntUser.html',
                controller: 'suppressionController',
                resolve: {
                    selectedRow: function() {
                        return entrepriseUse;
                    }
                }
            });

        };

        /**************************FIN ENTREPRISE-USERS*********************************/

        /**********************************ETREASURY PRODUIT******************************/

        $scope.etreasuryProduit = [];

        $scope.addProduit = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/registerpr.html',
                controller: 'popUpController',
                resolve: {
                    selectedRow: function() {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        function listProduits() {
            $scope.isDataReadyEtProduit = false;
            $http({
                method: 'GET',
                url: baseUrl + 'admin/product/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.etreasuryProduit = response.data.list_products;
                $scope.isDataReadyEtProduit = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        listProduits();

        $scope.editProduit = function(produit) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/registerpr.html',
                controller: 'popUpController',
                resolve: {
                    selectedRow: function() {
                        return produit;
                    }
                }
            });
        };

        $scope.detailProduit = function(produit) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/detailProduit.html',
                controller: 'popUpController',
                resolve: {
                    selectedRow: function() {
                        return produit;
                    }
                }
            });
        };

        $scope.suppProduit = function(produit) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/deleteConfirmeProduit.html',
                controller: 'suppressionController',
                resolve: {
                    selectedRow: function() {
                        return produit;
                    }
                }
            });

        };

        /**********************************FIN ETREASURY PRODUIT******************************/

    }
]);

/*******************************************************************************/
/********************************POPUP CONTROLLER******************************/
/*****************************************************************************/
app.controller('popUpController', ['$scope', '$rootScope', '$uibModal', '$uibModalInstance', '$http', '$state', '$filter', '$interval', 'selectedRow', 'deconnectApi',
    function($scope, $rootScope, $modal, $modalInstance, $http, $state, $filter, $interval, selectedRow, deconnectApi) {

        $scope.selectedRow = selectedRow;
        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        $scope.isuserInsessionLine = 0;
        $scope.errorMessage = null;
        $scope.phoneNumbr = /^\+?\d{1,15}$/;
        //$scope.phoneNumbr = '/^[+].*$/'; 
        //+91-036-78658

        //$scope.selected2=selectedRow;
        $scope.selected5 = selectedRow;
        $scope.code = $scope.selected5.nom;
        $scope.libelle = $scope.selected5.description;

        $scope.entrepriseINS = $scope.selected5.institution;
        $scope.idGroupEntreprise = $scope.selected5.idGroupe;
        ////////console.log($scope.idGroupEntreprise);

        /****************SUBMIT LOCALITE********************/
        $scope.locality = { ville: "", pays: "", idLocalite: -1, code: "" };
        $scope.etreasuryLocalities = [];
        $scope.selectedLocal = selectedRow;

        $scope.codel = $scope.selectedLocal.code;
        $scope.ville = $scope.selectedLocal.ville;
        $scope.pays = $scope.selectedLocal.pays;
        $scope.idLocalite = $scope.selectedLocal.idLocalite;
        $scope.submitLocality = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $scope.locality.ville = $scope.ville;
            $scope.locality.pays = $scope.pays;
            $scope.idStatus = -1;
            var method = "";
            var url = "";
            if ($scope.selectedLocal.idLocalite === undefined) {
                method = "POST";
                url = baseUrl + 'locality/add/' + idADmin;
            } else {
                $scope.locality.code = $scope.codel;
                method = "PUT";
                url = baseUrl + 'locality/update/' + $scope.idLocalite + '/' + idADmin;
            }
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.locality),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jeton')
                }
            }).then(reloadLocality).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        $scope.spinner = "img/loading.gif";

        function reloadLocality(response) {
            $scope.idStatus = response.data.status;
            if ($scope.idStatus === 0) {
                $scope.loading = false;
                $scope.errorMessage = null;
                $rootScope.$emit("CallParentMethod", {});
                $scope.ok();
                //ListLocality();
                //$state.reload();
            } else {
                $scope.sucessMessage = null;
                $scope.errorMessage = response.data.message;
            }
        };

        function ListLocality() {
            $http({
                method: 'GET',
                url: baseUrl + 'locality/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.etreasuryLocalities = response.data.locality_list;
                // ////console.log("$scope.localityList ",$scope.localityList);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        /****************FIN SUBMIT LOCALITE********************/

        /*************GROUP ETREASURY SUBMIT**************/
        $scope.groupeET = { idGroupe: -1, nom: "", description: "", institution: -1 };
        $scope.selectedEtGroup = selectedRow;

        $scope.nomEtG = $scope.selectedEtGroup.nom;
        $scope.descriptionEtG = $scope.selectedEtGroup.description;
        $scope.idGroupeEtG = $scope.selectedEtGroup.idGroupe;

        $scope.submitEtreasuryGroup = function() {
            $scope.disabl = true;
            $scope.groupeET.nom = $scope.nomEtG;
            $scope.groupeET.description = $scope.descriptionEtG;
            $scope.groupeET.institution = parseInt(idInstitution);
            $scope.groupeET.idGroupe = $scope.idGroupeEtG;
            var method = "";
            var url = "";
            if ($scope.selectedLocal.idGroupe === undefined) {
                method = "POST";
                url = baseUrl + "admin/groupe/admin_general/add/" + idADmin;
            } else {
                method = "PUT";
                url = baseUrl + "admin/groupe/admin_general/update/" + idADmin;
            }
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.groupeET),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jeton')
                }
            }).then(reloadGroupEt).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function etreasuryGroup() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/groupe/admin_general/etreasury/list/' + idADmin,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.etreasuryGroupes = response.data.group_list_ET;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function reloadGroupEt(response) {
            $scope.idStatus = response.data.status;
            if ($scope.idStatus === 0) {
                $scope.errorMessage = null;
                $scope.sucessMessage = response.data.message;
                $scope.ok();
                etreasuryGroup();
                $state.reload();
            } else {
                $scope.sucessMessage = null;
                $scope.errorMessage = response.data.message;
            }
        }
        /***************FIN GROUP ETREASURY SUBMIT****************/

        /***************SUBMIT USER ETREASURY*********************/

        $scope.user_admin = { idUtilisateur: -1, nom: "", prenom: "", login: "", email: "", telephone: "", telephoneFixe: "" };
        $scope.selectedEtUsers = selectedRow;

        $scope.nom = $scope.selectedEtUsers.nom;
        $scope.prenom = $scope.selectedEtUsers.prenom;
        $scope.mail = $scope.selectedEtUsers.email;
        $scope.telmobil = parseInt($scope.selectedEtUsers.telephone);
        $scope.telfix = parseInt($scope.selectedEtUsers.telephoneFixe);
        $scope.login_ = $scope.selectedEtUsers.login;
        //$scope.groupeIdGroupe=$scope.selectedEtUsers.groupeIdGroupe;
        $scope.idEtreasuryUSER = $scope.selectedEtUsers.idUtilisateur;
        //$scope.idLocalite=$scope.selectedLocal.idLocalite;
        $scope.stat = null;
        $scope.submitEtreasuryUSERS000 = function() {
            $scope.user_admin.nom = $scope.nom;
            $scope.user_admin.prenom = $scope.prenom;
            $scope.user_admin.email = $scope.mail;
            $scope.user_admin.telephone = parseInt($scope.telmobil);
            $scope.user_admin.telephoneFixe = parseInt($scope.telfix);
            $scope.user_admin.login = $scope.login_;
            $http({
                method: "POST",
                url: baseUrl + "admin/user_admin/add/" + idADmin,
                data: $scope.user_admin,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function(data) {
                $scope.stat = data.data.status;
                //console.log(data);
                if ($scope.stat === 0) {
                    $scope.errorMessage = null;
                    //reloadGrpBank();
                    $modalInstance.dismiss('cancel');
                } else {
                    $scope.errorMessage = data.data.message;
                    //console.log($scope.errorMessage);
                }
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.submitEtreasuryUSERS = function() {
            ////console.log("submit.......");
            $scope.disabl = true;
            $scope.loading = true;
            $scope.user_admin.nom = $scope.nom;
            $scope.user_admin.prenom = $scope.prenom;
            $scope.user_admin.email = $scope.mail;
            if ($scope.telmobil.toString().indexOf('+') != -1) {
                $scope.user_admin.telephone = $scope.telmobil;
            } else {
                $scope.user_admin.telephone = "+" + $scope.telmobil;
            }
            if ($scope.telfix.toString().indexOf('+') != -1) {
                $scope.user_admin.telephoneFixe = $scope.telfix;
            } else {
                if ($scope.telfixe.toString().indexOf('NaN') != -1) {
                    $scope.user_admin.telephoneFixe = null;
                } else {
                    $scope.user_admin.telephoneFixe = "+" + $scope.telfix;
                }
            }
            $scope.user_admin.login = $scope.login_;
            //$scope.user_admin.groupeIdGroupe=$scope.groupeIdGroupe;

            var method = "";
            var url = "";
            if ($scope.selectedEtUsers.idUtilisateur === undefined) {
                method = "POST";
                url = baseUrl + "admin/user_admin/add/" + idADmin;
            } else {
                $scope.user_admin.idUtilisateur = $scope.idEtreasuryUSER;
                method = "PUT";
                url = baseUrl + "admin/user_admin/update/" + idADmin;
            }
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.user_admin),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jeton')
                }
            }).then(reloadUserAdminEt).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function reloadUserAdminEt(response) {
            $scope.idStatus = response.data.status;
            if ($scope.idStatus === 0) {
                $scope.errorMessage = null;
                $scope.ok();
                etreasuryUsersAdmin();
                $state.reload();
            } else {
                $scope.errorMessage = response.data.message;
            }
        };
        etreasuryGroup();

        function etreasuryUsersAdmin() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/user_admin/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.etreasuryUsers = response.data.admin_list;
                $scope.cancel();
                for (var i = 0; i < $scope.etreasuryUsers.length; i++) {
                    if ($scope.etreasuryUsers[i].idUtilisateur == sessionStorage.getItem("iduser")) {
                        $scope.isuserInsessionLine = i;
                        break;
                    };
                };
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        /****************FIN SUBMIT USER ETRASURY************************/

        /******************SUBMIT PRODUIT********************************/
        $scope.nomProduits = ["ESCOMPTE", "TRANSFERT", "DEPOT A TERME", "CHANGE", "SPOT"];
        $scope.produit = { idProduits: -1, nom: "", description: "", avantages: "", inconvenients: "", motsCles: "", isAttachedFile: "" };
        $scope.selectedProduit = selectedRow;

        $scope.nomProd = $scope.selectedProduit.nom;
        $scope.motCle = $scope.selectedProduit.motsCles;
        $scope.avantage = $scope.selectedProduit.avantages;
        $scope.inconvenient = $scope.selectedProduit.inconvenients;
        $scope.descriptionProd = $scope.selectedProduit.description;
        $scope.idProduits = $scope.selectedProduit.idProduits;

        $scope.submitProduit = function() {
            $scope.disabl = true;
            $scope.produit.nom = $scope.nomProd;
            $scope.produit.description = $scope.descriptionProd;
            $scope.produit.avantages = $scope.avantage;
            $scope.produit.inconvenients = $scope.inconvenient;
            $scope.produit.motsCles = $scope.motCle;
            $scope.produit.isAttachedFile = $scope.doc_attach;
            var method = "";
            var url = "";
            if ($scope.selectedProduit.idProduits === undefined) {
                method = "POST";
                url = baseUrl + 'admin/product/add/' + idADmin;
            } else {
                //console.log("update......ok");
                $scope.produit.idProduits = $scope.idProduits;
                method = "PUT";
                url = baseUrl + "admin/product/update/" + $scope.idProduits + '/' + idADmin;
            }
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.produit),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jeton')
                }
            }).then(reloadProduit).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function reloadProduit(response) {
            $scope.idStatus = response.data.status;
            if ($scope.idStatus === 0) {
                $scope.errorMessage = null;
                listProduits
                $state.reload();
                $scope.ok();
            } else {
                $scope.errorMessage = response.data.message;
            }
        };

        function listProduits() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/product/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.etreasuryProduit = response.data.list_products;
                $scope.cancel();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        /****************FIN SUBMIT PRODUIT*****************************/
        /****************SUBMIT ENTREPRISE-ENTREPRISE*******************/

        $scope.entreprise = { idInstitution: -1, nom: "", telmobile: "", telfixe: "", nb_agence: null, capital: null, localite: -1 };

        $scope.selectedEnt = selectedRow;
        $scope.nom = $scope.selectedEnt.nom;
        $scope.nb_agence = parseInt($scope.selectedEnt.nombreAgence);
        $scope.telmobile = parseInt($scope.selectedEnt.telephone1);
        $scope.telfixe = parseInt($scope.selectedEnt.telephone2);
        $scope.capital = parseInt($scope.selectedEnt.capital);
        $scope.localite = $scope.selectedEnt.localityIdLocalite;
        $scope.idEntreprise = $scope.selectedEnt.idInstitution;

        $scope.disabl = false;
        $scope.submitEntreprise = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $scope.entreprise.nom = $scope.nom;
            $scope.entreprise.nombreAgence = $scope.nb_agence;
            if ($scope.telmobile.toString().indexOf('+') != -1) {
                $scope.entreprise.telephone1 = $scope.telmobile;
            } else {
                $scope.entreprise.telephone1 = "+" + $scope.telmobile;
            }
            //$scope.entreprise.telephone2=$scope.telfixe;
            $scope.entreprise.capital = $scope.capital;
            if ($scope.telfixe.toString().indexOf('+') != -1) {
                $scope.entreprise.telephone2 = $scope.telfixe;
            } else {
                if ($scope.telfixe.toString().indexOf('NaN') != -1) {
                    $scope.entreprise.telephone2 = null;
                } else {
                    $scope.entreprise.telephone2 = "+" + $scope.telfixe;
                }
            }
            $scope.entreprise.localityIdLocalite = $scope.localite;
            $scope.entreprise.idInstitution = $scope.idEntreprise;
            var method = "";
            var url = "";
            if ($scope.selectedEnt.idInstitution === undefined) {
                method = "POST";
                url = baseUrl + "admin/entreprise/add/groupes/" + idADmin;
            } else {
                method = "PUT";
                url = baseUrl + "admin/entreprise/update/" + $scope.idEntreprise + '/' + idADmin;
            }
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.entreprise),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jeton')
                }
            }).then(reloadListEnt).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        ListLocality();

        function reloadListEnt(response) {
            //console.log(response.data);
            $scope.idStatus = response.data.status;
            if ($scope.idStatus === 0) {
                $scope.loading = false;
                $scope.errorMessage = null;
                $scope.ok();
                listEntreprise();
                $state.reload();
            } else {
                $scope.errorMessage = response.data.message;
            }
        };

        function listEntreprise() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/entreprise/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.entrepriseList = response.data.entreprise_list;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        /****************FIN SUBMIT ENTREPRISE-ENTREPRISE*******************/

        /******************* SUBMIT USER-ENTREPRISE************************/
        $scope.userEntreprise = {
            idUtilisateur: -1,
            email: "",
            login: "",
            nom: "",
            prenom: "",
            telephone: "",
            telephoneFixe: ""
        };
        //$scope.telfixeU = null;
        $scope.selectedUserEnt = selectedRow;
        $scope.nomU = $scope.selectedUserEnt.nom;
        $scope.prenomU = $scope.selectedUserEnt.prenom;
        $scope.mailU = $scope.selectedUserEnt.email;
        $scope.telmobileU = parseInt($scope.selectedUserEnt.telephone);
        $scope.telfixeU = parseInt($scope.selectedUserEnt.telephoneFixe);
        $scope.login_U = $scope.selectedUserEnt.login;
        //$scope.profil=$scope.selectedUserEnt.profilIdProfil;
        if ($scope.selectedUserEnt.idUtilisateur != undefined) {
            $scope.entrepriseU = $scope.selectedUserEnt.groupeIdGroupe.institution;
        }
        $scope.idUserEntreprise = $scope.selectedUserEnt.idUtilisateur;

        $scope.submitUsersEntreprise = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $scope.userEntreprise.nom = $scope.nomU;
            $scope.userEntreprise.email = $scope.mailU;
            $scope.userEntreprise.prenom = $scope.prenomU;
            if ($scope.telmobileU.toString().indexOf('+') != -1) {
                $scope.userEntreprise.telephone = $scope.telmobileU;
            } else {
                $scope.userEntreprise.telephone = "+" + $scope.telmobileU;
            }
            if ($scope.telfixeU.toString().indexOf('+') != -1) {
                $scope.userEntreprise.telephoneFixe = $scope.telfixeU;
            } else {
                if ($scope.telfixeU.toString().indexOf('NaN') != -1) {
                    $scope.userEntreprise.telephoneFixe = null;
                } else {
                    $scope.userEntreprise.telephoneFixe = "+" + $scope.telfixeU;
                }
            }

            //$scope.userEntreprise.telephone=$scope.telmobileU;
            //$scope.userEntreprise.telephoneFixe=$scope.telfixeU;
            $scope.userEntreprise.login = $scope.login_U;
            $scope.userEntreprise.idUtilisateur = $scope.idUserEntreprise;
            //$scope.userEntreprise.profilIdProfil=$scope.profil;

            var method = "";
            var url = "";
            if ($scope.selectedUserEnt.idUtilisateur === undefined) {
                method = "POST";
                url = baseUrl + 'admin/user_admin/add/entreprise/' + idADmin + '/' + $scope.entrepriseU.idInstitution;
            } else {
                method = "PUT";
                url = baseUrl + 'admin/user_admin/update/entreprise/' + idADmin;
            }
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.userEntreprise),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jeton')
                }
            }).then(reloadListEntUser).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function reloadListEntUser(response) {
            $scope.idStatus = response.data.status;
            //console.log(response.data);
            if ($scope.idStatus === 0) {
                $scope.loading = false;
                $scope.errorMessage = null;
                listEntrepriseUsers();
                $state.reload();
                $scope.ok();
            } else {
                $scope.errorMessage = response.data.message;
            }
        };
        listEntreprise();

        function listEntrepriseUsers() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/user_entreprise/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.entrepriseUsers = response.data.user_list;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        /****************FIN SUBMIT USER-ENTREPRISE************************/

        function _error(response) {
            //console.log(response.statusText);
        }
        $scope.ok = function() {
            $scope.selectedRow = null;
            $modalInstance.close();
        };
        $scope.cancel = function() {
            $scope.selectedRow = null;
            $modalInstance.dismiss('cancel');
        };
    }
]);

/****************FIN POPUP CONTROLLER***********************/
/**********************************************************/
/*********************************************************/


angular.module('app').controller('eTBkCtrl', ['$scope', '$http', '$uibModal', '$log', '$rootScope', '$state', '$location', '$timeout', 'deconnectApi',
    function($scope, $http, $modal, $log, $rootScope, $state, $location, $timeout, deconnectApi) {
        $scope.separateurdel = '';
        $scope.separator = '';
        $scope.bankList = [];
        $scope.bankUsers = [];
        $scope.bankGroupes = [];
        $scope.localityList = [];
        $scope.listProfils = [];
        var idInstitution = 0;
        var idUtilisateur = 0;
        var idGroupe = 0;
        var positionLine = 0;
        $scope.isBkOp = false;
        $scope.isGrBkOp = false;
        $scope.isUserBkOp = false;
        $scope.isCtBkOP = false;
        $scope.isJrBkOp = false;
        // $scope.isDataReady=false;
        var statut = 0;
        var message = '';
        var idAdminSession = sessionStorage.getItem("iduser");
        var configs = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jeton')
            }
        };
        // var idInstUserAdminSession=sessionStorage.getItem("idInstitution");
        $scope.dataTables = document.getElementById('dataTable');
        $scope.$watch("dataTables", function(newValue, oldValue) {
            if (newValue != null && newValue != '' && newValue != undefined) {
                // angular.element(document).ready( function () {
                // var dTable = $('#dataTable');
                // dTable.DataTable();
                // });
            };
        });
        /***************************FIN POP UP DES ACTIONS BANK-BANK**************************/
        function popUpconfirmation(x) {
            if (x != undefined) {
                var modalInstance = $modal.open({
                    templateUrl: 'partials/deletionConfirm.html',
                    controller: 'deletionConfirmCtrl',
                    resolve: {
                        x: function() {
                            return x;
                        }
                    }
                });
            };

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };

        function templatepop(profils, items, ojectedit, idedit, objet, submenu, bool, x) {
            if (x != '' && x != null && x != undefined) {
                var modalInstance = $modal.open({
                    templateUrl: x,
                    controller: 'popAddEditeTbKCtrl',
                    resolve: {
                        profils: function() {
                            return profils;
                        },
                        items: function() {
                            return items;
                        },
                        ojectedit: function() {
                            return ojectedit;
                        },
                        idedit: function() {
                            return idedit;
                        },
                        objet: function() {
                            return objet;
                        },
                        submenu: function() {
                            return submenu;
                        },
                        bool: function() {
                            return bool;
                        }
                    }
                });
            };

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };

        function popAddEditAdminBk(list, x, submenu, bool) {
            if (submenu != null && submenu != undefined) {
                switch (submenu) {
                    case 'BANK-BANK':
                        templatepop($scope.listProfils, list, null, 0, null, submenu, bool, 'partials/admin_etreasury/banque/registerbk.html');
                        break;
                    case 'BANK-USER':
                        templatepop($scope.listProfils, list, null, 0, null, submenu, bool, 'partials/admin_etreasury/banque/registeru.html');
                        break;
                    case 'BANK-CONTACT':
                        templatepop($scope.listProfils, list, null, 0, null, submenu, bool, 'partials/admin_etreasury/banque/registerc.html');
                        break;
                    case 'BANK-GROUPE':
                        templatepop($scope.listProfils, list, null, 0, null, submenu, bool, 'partials/admin_etreasury/banque/registergr.html');
                        break;
                    case 'BANK-BANK_edit':
                        templatepop($scope.listProfils, list, $scope.bankList, x, null, submenu, bool, 'partials/admin_etreasury/banque/registerbk.html');
                        break;
                    case 'BANK-USER_edit':
                        templatepop($scope.listProfils, list, $scope.bankUsers, x, null, submenu, bool, 'partials/admin_etreasury/banque/registeru.html');
                        break;
                    case 'BANK-CONTACT_edit':
                        templatepop($scope.listProfils, list, $scope.bankUsers, x, null, submenu, bool, 'partials/admin_etreasury/banque/registerc.html');
                        break;
                    case 'BANK-GROUPE_edit':
                        templatepop($scope.listProfils, list, $scope.bankGroupes, x, null, submenu, bool, 'partials/admin_etreasury/banque/registergr.html');
                        break;
                };
            };
        };
        /***************************FIN POP UP DES ACTIONS BANK-BANK**************************/

        /**
         * *************************BANK-BANK*********************************/
        //Liste name bank_users_log_list
        $scope.listLogUbk = [];
        $scope.islistLogUbk = false;

        function ListLogUserBk() {
            $scope.islistLogUbk = false;
            $http({
                method: 'GET',
                url: baseUrl + 'log/admin/user/bank_logs/' + idAdminSession,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                // console.log("LOggggg ",response.data.bank_users_log_list);
                $scope.listLogUbk = response.data.bank_users_log_list;
                $scope.islistLogUbk = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        ListLogUserBk();
        //FIN Liste name bank_users_log_list
        //LIST DES LOCALIES
        function ListLocality() {
            $http({
                method: 'GET',
                url: baseUrl + 'locality/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.localityList = response.data.locality_list;
                // ////console.log("$scope.localityList ",$scope.localityList);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        ListLocality();
        //FIN LISTE DES LOCALIES
        //LIST DES PROFILES BANQUES
        function listProfiles() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/profile/list/' + idAdminSession,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                for (var i = 0; i < response.data.profile_list.length; i++) {
                    if (response.data.profile_list[i].type === 'ADMIN_BANQUE' || response.data.profile_list[i].type === 'USER_HABILITY') {
                        $scope.listProfils.push(response.data.profile_list[i]);
                    };
                };
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        listProfiles();
        //FIN LISTE DES PROFILES BANQUES
        //BANQUE BANK-BANK

        function listBank() {
            $scope.isDataBkReady = false;
            $http({
                method: 'GET',
                url: baseUrl + 'admin/bank/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.bankList = response.data.bank_list;
                $scope.isDataBkReady = true;
                // ////console.log("$scope.bankList ",$scope.bankList);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        listBank();

        $scope.deleteOneBk = function(x) {
            $scope.separateurdel = 'BANK-BANK';
            popUpconfirmation(x);
        };

        function deleteOneBkConfirm(x) {
            $http({
                method: 'DELETE',
                url: baseUrl + 'admin/bank/delete/' + $scope.bankList[x].idInstitution + '/' + idAdminSession,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.bankList.splice(x, 1);
                $state.reload();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.addeTbKbK = function() {
            $scope.isBkOp = true;
            $scope.separator = 'BANK-BANK';
            if ($scope.localityList != null) {
                popAddEditAdminBk($scope.localityList, 0, $scope.separator, $scope.isBkOp);
            };
        };

        function addBkbk(bank) {
            switch ($scope.separator) {
                case 'BANK-BANK':
                    $http({
                        method: "POST",
                        url: baseUrl + 'admin/bank/add/groupes/' + idAdminSession,
                        data: bank,
                        headers: configs.headers
                    }).then(function(response) {
                        // $scope.bankList.push(response.data.bank);
                        statut = response.data.status;
                        message = response.data.message;
                        if (response.data.status == 0) {
                            $rootScope.$broadcast('message_err', { statut: statut, message: message });
                        } else {
                            $rootScope.$broadcast('message_err', { statut: statut, message: message });
                        };
                        listBank();
                        $state.reload();
                    }).catch(function(err) {
                        if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                            deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                                $location.url('/access/login');
                                $state.go('access.login');
                            }).catch(function(response) {});
                        };
                    });
                    break;
                case 'BANK-BANK_edit':
                    $http({
                        method: "PUT",
                        url: baseUrl + 'admin/bank/update/' + idInstitution + '/' + idAdminSession,
                        data: bank,
                        headers: configs.headers
                    }).then(function(response) {
                        ////console.log("BANQUE mise à jour",response);
                        statut = response.data.status;
                        message = response.data.message;
                        if (response.data.status == 0) {
                            $rootScope.$broadcast('message_err', { statut: statut, message: message });
                        } else {
                            $rootScope.$broadcast('message_err', { statut: statut, message: message });
                        };
                        listBank();
                        $state.reload();
                    }).catch(function(err) {
                        if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                            deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                                $location.url('/access/login');
                                $state.go('access.login');
                            }).catch(function(response) {});
                        };
                    });
                    break;
            };
        };

        $scope.editOneBk = function(x) {
            $scope.isBkOp = false;
            positionLine = x;
            idInstitution = $scope.bankList[x].idInstitution;
            $scope.separator = 'BANK-BANK_edit';
            if ($scope.localityList != null) {
                popAddEditAdminBk($scope.localityList, x, $scope.separator, $scope.isBkOp);
            };
        };
        //FIN BANQUE BANK-BANK

        //UTILISATEUR BANK-BANK ET CONTACT
        function listUsers() {
            $scope.isDataUserReady = false;
            $http({
                method: 'GET',
                url: baseUrl + 'admin/user_bank/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.bankUsers = response.data.bank_list;
                $scope.isDataUserReady = true;
                // //console.log("$scope.bankUsers ",$scope.bankUsers);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        listUsers();

        $scope.deleteOneUserBk = function(x) {
            $scope.separateurdel = 'BANK-USER';
            popUpconfirmation(x);
        };

        $scope.deleteOneCtBk = function(x) {
            $scope.separateurdel = 'BANK-CONTACT';
            popUpconfirmation(x);
        };

        function deleteOneUserBkConfirm(x) {
            $http({
                method: 'DELETE',
                url: baseUrl + 'admin/user_admin/delete/' + idAdminSession + '/' + $scope.bankUsers[x].idUtilisateur,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.bankUsers.splice(x, 1);
                $state.reload();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        $scope.addeTbKu = function() {
            $scope.isUserBkOp = true;
            $scope.separator = 'BANK-USER';
            if ($scope.bankList != null) {
                popAddEditAdminBk($scope.bankList, 0, $scope.separator, $scope.isUserBkOp);
            };
        };
        $scope.addeTbKc = function() {
            $scope.isCtBkOP = true;
            $scope.separator = 'BANK-CONTACT';
            if ($scope.bankList != null) {
                popAddEditAdminBk($scope.bankList, 0, $scope.separator, $scope.isCtBkOP);
            };
        };

        function addUserBk(id, user) {
            //console.log("Userrr ",user);
            switch ($scope.separator) {
                case 'BANK-USER':
                    $http({
                        method: "POST",
                        url: baseUrl + 'admin/user_admin/add/bank/' + idAdminSession + '/' + id,
                        data: user,
                        headers: configs.headers
                    }).then(function(response) {
                        // $scope.bankUsers.push(response.data.userBank);
                        statut = response.data.status;
                        message = response.data.message;
                        if (response.data.status == 0) {
                            $rootScope.$broadcast('message_err', { statut: statut, message: message });
                        } else {
                            $rootScope.$broadcast('message_err', { statut: statut, message: message });
                        };
                        listUsers();
                        $state.reload();
                    }).catch(function(err) {
                        if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                            deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                                $location.url('/access/login');
                                $state.go('access.login');
                            }).catch(function(response) {});
                        };
                    });
                    break;
                case 'BANK-CONTACT':
                    $http({
                        method: "POST",
                        url: baseUrl + 'admin/user_admin/add/bank/' + idAdminSession + '/' + id,
                        data: user,
                        headers: configs.headers
                    }).then(function(response) {
                        // $scope.bankUsers.push(response.data.userBank);
                        statut = response.data.status;
                        message = response.data.message;
                        if (response.data.status == 0) {
                            $rootScope.$broadcast('message_err', { statut: statut, message: message });
                        } else {
                            $rootScope.$broadcast('message_err', { statut: statut, message: message });
                        };
                        listUsers();
                        $state.reload();
                    }).catch(function(err) {
                        if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                            deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                                $location.url('/access/login');
                                $state.go('access.login');
                            }).catch(function(response) {});
                        };
                    });
                    break;
                case 'BANK-USER_edit':
                    $http({
                        method: "PUT",
                        url: baseUrl + 'admin/user_admin/update/bank/' + idAdminSession,
                        data: user,
                        headers: configs.headers
                    }).then(function(response) {
                        ////console.log("UTILISATEUR mise à jour",response);
                        statut = response.data.status;
                        message = response.data.message;
                        if (response.data.status == 0) {
                            $rootScope.$broadcast('message_err', { statut: statut, message: message });
                        } else {
                            $rootScope.$broadcast('message_err', { statut: statut, message: message });
                        };
                        listUsers();
                        $state.reload();
                    }).catch(function(err) {
                        if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                            deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                                $location.url('/access/login');
                                $state.go('access.login');
                            }).catch(function(response) {});
                        };
                    });
                    break;
                case 'BANK-CONTACT_edit':
                    $http({
                        method: "PUT",
                        url: baseUrl + 'admin/user_admin/update/bank/' + idAdminSession,
                        data: user,
                        headers: configs.headers
                    }).then(function(response) {
                        ////console.log("CONTACT mise à jour",response);
                        statut = response.data.status;
                        message = response.data.message;
                        if (response.data.status == 0) {
                            $rootScope.$broadcast('message_err', { statut: statut, message: message });
                        } else {
                            $rootScope.$broadcast('message_err', { statut: statut, message: message });
                        };
                        listUsers();
                        $state.reload();
                    }).catch(function(err) {
                        if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                            deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                                $location.url('/access/login');
                                $state.go('access.login');
                            }).catch(function(response) {});
                        };
                    });
                    break;
            };
        };

        $scope.editOneUserBk = function(x) {
            $scope.isUserBkOp = false;
            positionLine = x;
            idUtilisateur = $scope.bankUsers[x].idUtilisateur;
            $scope.separator = 'BANK-USER_edit';
            if ($scope.bankList != null) {
                popAddEditAdminBk($scope.bankList, x, $scope.separator, $scope.isUserBkOp);
            };
        };
        $scope.editOneCtBk = function(x) {
            $scope.isCtBkOP = false;
            positionLine = x;
            idUtilisateur = $scope.bankUsers[x].idUtilisateur;
            $scope.separator = 'BANK-CONTACT_edit';
            if ($scope.bankList != null) {
                popAddEditAdminBk($scope.bankList, x, $scope.separator, $scope.isCtBkOP);
            };
        };
        //FIN UTILISATEUR BANK-BANK ET CONTACT
        //GROUPE BANK-BANK
        function listGroupes() {
            $scope.isDataGrReady = false;
            $http({
                method: 'GET',
                url: baseUrl + 'admin/groupe/admin_general/banque/list/' + idAdminSession,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.bankGroupes = response.data.group_list_ET;
                $scope.isDataGrReady = true;
                // ////console.log("$scope.bankGroupes ",$scope.bankGroupes);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        listGroupes();

        $scope.deleteOneGrBk = function(x) {
            $scope.separateurdel = 'BANK-GROUPE';
            popUpconfirmation(x);
        };

        function deleteOneGrBkConfirm(x) {
            $http({
                method: 'DELETE',
                url: baseUrl + 'admin/groupe/admin_general/delete/' + idAdminSession + '/' + $scope.bankGroupes[x].idGroupe,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.bankGroupes.splice(x, 1);
                $state.reload();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.addeTbKgr = function() {
            $scope.isGrBkOp = true;
            $scope.separator = 'BANK-GROUPE';
            if ($scope.bankList != null) {
                popAddEditAdminBk($scope.bankList, 0, $scope.separator, $scope.isGrBkOp);
            };
        };

        function addGrBk(groupe) {
            switch ($scope.separator) {
                case 'BANK-GROUPE':
                    $http({
                        method: "POST",
                        url: baseUrl + 'admin/groupe/admin_general/add/' + idAdminSession,
                        data: groupe,
                        headers: configs.headers
                    }).then(function(response) {
                        // $scope.bankGroupes.push(response.data.groupe);
                        statut = response.data.status;
                        message = response.data.message;
                        if (response.data.status == 0) {
                            $rootScope.$broadcast('message_err', { statut: statut, message: message });
                        } else {
                            $rootScope.$broadcast('message_err', { statut: statut, message: message });
                        };
                        listGroupes();
                        $state.reload();
                    }).catch(function(err) {
                        if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                            deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                                $location.url('/access/login');
                                $state.go('access.login');
                            }).catch(function(response) {});
                        };
                    });
                    break;
                case 'BANK-GROUPE_edit':
                    $http({
                        method: "PUT",
                        url: baseUrl + 'admin/groupe/admin_general/update/' + idAdminSession,
                        data: groupe,
                        headers: configs.headers
                    }).then(function(response) {
                        ////console.log("GROUPE mise à jour",response);
                        statut = response.data.status;
                        message = response.data.message;
                        if (response.data.status == 0) {
                            $rootScope.$broadcast('message_err', { statut: statut, message: message });
                        } else {
                            $rootScope.$broadcast('message_err', { statut: statut, message: message });
                        };
                        listGroupes();
                        $state.reload();
                    }).catch(function(err) {
                        if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                            deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                                $location.url('/access/login');
                                $state.go('access.login');
                            }).catch(function(response) {});
                        };
                    });
                    break;

            };
        };

        $scope.editOneGrBk = function(x) {
            $scope.isGrBkOp = false;
            positionLine = x;
            idGroupe = $scope.bankGroupes[x].idGroupe;
            $scope.separator = 'BANK-GROUPE_edit';
            if ($scope.bankList != null) {
                popAddEditAdminBk($scope.bankList, x, $scope.separator, $scope.isGrBkOp);
            };
        };
        //FIN GROUPE BANK-BANK
        /**************************FIN BANK-BANK*********************************/

        /*******************************************************************************
         ***************************TOUTES LES OPERATIONS DE CONFIRMATION DE DELETION****
         ********************************************************************************/
        $scope.$on('confirmdeletion', function(events, args) {
            switch ($scope.separateurdel) {
                case 'BANK-BANK':
                    deleteOneBkConfirm(args.x);
                    break;
                case 'BANK-USER':
                    deleteOneUserBkConfirm(args.x);
                    break;
                case 'BANK-CONTACT':
                    deleteOneUserBkConfirm(args.x);
                    break;
                case 'BANK-GROUPE':
                    deleteOneGrBkConfirm(args.x);
                    break;
            };
        });
        $scope.$on('addEditbk', function(events, args) {
            switch ($scope.separator) {
                case 'BANK-BANK':
                    addBkbk(args.objet);
                    break;
                case 'BANK-USER':
                    addUserBk(args.idInstitution, args.objet)
                    break;
                case 'BANK-CONTACT':
                    addUserBk(args.idInstitution, args.objet)
                    break;
                case 'BANK-GROUPE':
                    addGrBk(args.objet);
                    break;
                case 'BANK-BANK_edit':
                    addBkbk(args.objet);
                    break;
                case 'BANK-USER_edit':
                    addUserBk(args.idInstitution, args.objet)
                    break;
                case 'BANK-CONTACT_edit':
                    addUserBk(args.idInstitution, args.objet)
                    break;
                case 'BANK-GROUPE_edit':
                    addGrBk(args.objet);
                    break;
            };
        });
        $scope.activeUSER = function(user) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/activeUser.html',
                controller: 'suppressionController',
                resolve: {
                    selectedRow: function() {
                        return user;
                    }
                }
            });

        };
        $scope.desactiveUSER = function(user) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/desactiveUser.html',
                controller: 'suppressionController',
                resolve: {
                    selectedRow: function() {
                        return user;
                    }
                }
            });

        };
        /*******************************************************************************
         ***************************FIN DE TOUTES LES OPERATIONS DE CONFIRMATION DE DELETION****
         ********************************************************************************/

    }
]);

app.controller('deletionConfirmCtrl', ['$scope', '$rootScope', '$uibModalInstance', 'x', function($scope, $rootScope, $modalInstance, x) {

    $scope.confirmDelete = function() {
        $rootScope.$broadcast('confirmdeletion', { x: x });
        $modalInstance.close();
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);

app.controller('popAddEditeTbKCtrl', ['$scope', '$rootScope', '$uibModalInstance', 'profils', 'items', 'ojectedit', 'idedit', 'objet', 'submenu', 'bool', 'deconnectApi', function($scope, $rootScope, $modalInstance, profils, items, ojectedit, idedit, objet, submenu, bool, deconnectApi) {

    $scope.items = items;
    $scope.ojectedit = ojectedit;
    $scope.listProfils = profils;
    $scope.separator = submenu;
    $scope.isOperation = bool;
    var idInstitution = 0;
    var idInstitution2 = 0;
    var idLocality = 0;
    var idLocality2 = 0;
    var idProf = 0;
    var idProf2 = 0;
    var objet = null;
    $scope.message = '';
    $scope.isSuccess = false;
    $scope.loading = false;
    $scope.phoneNumbr = /^\+?\d{1,15}$/;
    var configs = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jeton')
        }
    };

    /* show telephones numbers */
    $scope.showErrorNumbTm = function(data) {
        $scope.isErrorTm = false;
        if (data == 0 || data < 0)
            $scope.isErrorTm = true;
    };
    $scope.showErrorNumbTf = function(data) {
        $scope.isErrorTf = false;
        if (data == 0 || data < 0)
            $scope.isErrorTf = true;
    };
    /*FIN show telephones numbers */
    $scope.changeNbagence = function(data) {
        if (data != 0 && data > 0) {
            $scope.nb_agence = data;
        };
    };
    $scope.changecapital = function(data) {
        if (data != 0 && data > 0) {
            $scope.capital = data;
        };
    };
    /*INIATILISATION MODEL*/
    $scope.today = function() {
        $scope.nb_agence = 0;
        $scope.capital = 0;
        $scope.telmobile = '';
        $scope.telfixe = '';
    };
    $scope.today();
    /*FIN INIATILISATION MODEL*/
    $scope.$on('selectindex', function(events, args) {
        if (args.index > 0) {
            idInstitution2 = $scope.items[args.index - 1].idInstitution;
        };
    });

    $scope.$on('selectindexl', function(events, args) {
        if (args.index > 0) {
            idLocality2 = $scope.items[args.index - 1].idLocalite;
        };
    });

    $scope.$on('selectindex_profil', function(events, args) {
        if (args.index > 0) {
            idProf2 = $scope.listProfils[args.index - 1].idProfil;
        };
    });

    $scope.changeBk = function(a) {
        if (idInstitution2 == 0) {
            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].idInstitution == $scope.ojectedit[idedit].groupeIdGroupe.institution.idInstitution) {
                    idInstitution = $scope.items[i].idInstitution;
                    break;
                }
            };
        } else {
            idInstitution = idInstitution2;
            idInstitution2 = 0;
        };
    };

    $scope.changeProfil = function(a) {
        // if(idProf2==0){
        // for(var i=0;i<$scope.listProfils.length;i++){
        // if($scope.listProfils[i].idProfil==$scope.ojectedit[idedit].profilIdProfil.idProfil){
        // idProf=idProf=$scope.listProfils[i].idProfil;
        // break;
        // }
        // };
        // }else{
        // idProf=idProf2;
        // idProf2=0;
        // };
    };

    $scope.changeLocality = function(a) {
        if (idLocality2 == 0) {
            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].idLocalite == $scope.ojectedit[idedit].localityIdLocalite.idLocalite) {
                    idLocality = $scope.items[i].idLocalite;
                    break;
                }
            };
        } else {
            idLocality = idLocality2;
            idLocality2 = 0;
        };
    };

    switch (submenu) {
        case 'BANK-BANK':
            $scope.addBkBk = function(nom, telmobile, telfixe, nb_agence, capital, localite) {
                $scope.loading = true;
                if (telfixe === undefined || telfixe === NaN || telfixe == null || telfixe === '') {
                    telfixe = null;
                };
                if (telfixe == null) {
                    objet = {
                        "nom": "" + nom,
                        "nombreAgence": "" + nb_agence,
                        "telephone1": "+" + telmobile,
                        "telephone2": telfixe,
                        "capital": "" + capital,
                        "localityIdLocalite": idLocality
                    };
                } else {
                    objet = {
                        "nom": "" + nom,
                        "nombreAgence": "" + nb_agence,
                        "telephone1": "+" + telmobile,
                        "telephone2": "+" + telfixe,
                        "capital": "" + capital,
                        "localityIdLocalite": idLocality
                    };
                };
                // idLocality=idLocality2;
                // idLocality2=0;
                $rootScope.$broadcast('addEditbk', { idLocality: idLocality, objet: objet });
            };
            break;
        case 'BANK-USER':
            $scope.addUserBk = function(prenom, nom, telmobile, telfixe, mail, login_, profil_u, banque) {
                $scope.loading = true;
                if (telfixe === undefined || telfixe === NaN || telfixe == null || telfixe === '') {
                    telfixe = null;
                };
                if (telfixe == null) {
                    objet = {
                        "email": "" + mail,
                        "login": "" + login_,
                        "nom": "" + nom,
                        "prenom": "" + prenom,
                        "telephone": "+" + telmobile,
                        "telephoneFixe": telfixe
                            // "profilIdProfil":idProf
                    };
                } else {
                    objet = {
                        "email": "" + mail,
                        "login": "" + login_,
                        "nom": "" + nom,
                        "prenom": "" + prenom,
                        "telephone": "+" + telmobile,
                        "telephoneFixe": "+" + telfixe
                            // "profilIdProfil":idProf
                    };
                };
                // idProf2=0;
                // idInstitution=idInstitution2;
                $rootScope.$broadcast('addEditbk', { idInstitution: idInstitution, objet: objet });
            };
            break;
        case 'BANK-CONTACT':
            $scope.addUserBk = function(prenom, nom, telmobile, telfixe, mail, login_, profil_u, banque) {
                $scope.loading = true;
                if (telfixe === undefined || telfixe === NaN || telfixe == null || telfixe === '') {
                    telfixe = null;
                };
                if (telfixe == null) {
                    objet = {
                        "email": "" + mail,
                        "login": "" + login_,
                        "nom": "" + nom,
                        "prenom": "" + prenom,
                        "telephone": "+" + telmobile,
                        "telephoneFixe": telfixe
                            // "profilIdProfil":idProf
                    };
                } else {
                    objet = {
                        "email": "" + mail,
                        "login": "" + login_,
                        "nom": "" + nom,
                        "prenom": "" + prenom,
                        "telephone": "+" + telmobile,
                        "telephoneFixe": "+" + telfixe
                            // "profilIdProfil":idProf
                    };
                };

                // idProf2=0;
                // idInstitution=idInstitution2;
                $rootScope.$broadcast('addEditbk', { idInstitution: idInstitution, objet: objet });
            };
            break;
        case 'BANK-GROUPE':
            $scope.addBkGr = function(banque, code, libelle) {
                $scope.loading = true;
                objet = {
                    "nom": "" + code,
                    "description": "" + libelle,
                    "institution": idInstitution
                };

                // idInstitution2=0;
                // idInstitution=idInstitution2;
                $rootScope.$broadcast('addEditbk', { idInstitution: idInstitution, objet: objet });
            };
            break;
        case 'BANK-BANK_edit':
            $scope.nom = $scope.ojectedit[idedit].nom;
            $scope.nb_agence = parseInt($scope.ojectedit[idedit].nombreAgence);
            $scope.telmobile = parseInt($scope.ojectedit[idedit].telephone1);
            if ($scope.ojectedit[idedit].telephone2 == null || $scope.ojectedit[idedit].telephone2 == undefined) {
                $scope.telfixe = '';
            } else {
                $scope.telfixe = parseInt($scope.ojectedit[idedit].telephone2);
            };
            $scope.capital = parseInt($scope.ojectedit[idedit].capital);
            $scope.localite = $scope.ojectedit[idedit].localityIdLocalite.ville;

            $scope.changeLocality($scope.localite);

            $scope.addBkBk = function(nom, telmobile, telfixe, nb_agence, capital, localite) {
                $scope.loading = true;
                if (telfixe === undefined || telfixe === NaN || telfixe == null || telfixe === '') {
                    telfixe = null;
                };
                if (telfixe == null) {
                    objet = {
                        "nom": "" + nom,
                        "nombreAgence": "" + nb_agence,
                        "telephone1": "+" + telmobile,
                        "telephone2": telfixe,
                        "capital": "" + capital,
                        "localityIdLocalite": idLocality
                    };
                } else {
                    objet = {
                        "nom": "" + nom,
                        "nombreAgence": "" + nb_agence,
                        "telephone1": "+" + telmobile,
                        "telephone2": "+" + telfixe,
                        "capital": "" + capital,
                        "localityIdLocalite": idLocality
                    };
                };

                $rootScope.$broadcast('addEditbk', { idLocality: idLocality, objet: objet });
            };
            break;
        case 'BANK-USER_edit':
            $scope.mail = $scope.ojectedit[idedit].email;
            $scope.login_ = $scope.ojectedit[idedit].login;
            $scope.nom = $scope.ojectedit[idedit].nom;
            $scope.prenom = $scope.ojectedit[idedit].prenom;
            $scope.telmobile = parseInt($scope.ojectedit[idedit].telephone);
            if ($scope.ojectedit[idedit].telephoneFixe == null || $scope.ojectedit[idedit].telephoneFixe == undefined) {
                $scope.telfixe = '';
            } else {
                $scope.telfixe = parseInt($scope.ojectedit[idedit].telephoneFixe);
            };
            // $scope.profil_u=$scope.ojectedit[idedit].profilIdProfil.type;
            $scope.banque = $scope.ojectedit[idedit].groupeIdGroupe.institution.nom;

            $scope.changeBk($scope.banque);
            // $scope.changeProfil($scope.ojectedit[idedit].profilIdProfil.type);

            $scope.addUserBk = function(prenom, nom, telmobile, telfixe, mail, login_, profil_u, banque) {
                $scope.loading = true;
                if (telfixe === undefined || telfixe === NaN || telfixe == null || telfixe === '') {
                    telfixe = null;
                };
                if (telfixe == null) {
                    objet = {
                        "idUtilisateur": $scope.ojectedit[idedit].idUtilisateur,
                        "email": "" + mail,
                        "login": "" + login_,
                        "nom": "" + nom,
                        "prenom": "" + prenom,
                        "telephone": "+" + telmobile,
                        "telephoneFixe": telfixe
                            // "profilIdProfil": idProf
                    };
                } else {
                    objet = {
                        "idUtilisateur": $scope.ojectedit[idedit].idUtilisateur,
                        "email": "" + mail,
                        "login": "" + login_,
                        "nom": "" + nom,
                        "prenom": "" + prenom,
                        "telephone": "+" + telmobile,
                        "telephoneFixe": "+" + telfixe
                            // "profilIdProfil": idProf
                    };
                };

                $rootScope.$broadcast('addEditbk', { idInstitution: idInstitution, objet: objet });
            };
            break;
        case 'BANK-CONTACT_edit':
            $scope.mail = $scope.ojectedit[idedit].email;
            $scope.login_ = $scope.ojectedit[idedit].login;
            $scope.nom = $scope.ojectedit[idedit].nom;
            $scope.prenom = $scope.ojectedit[idedit].prenom;
            $scope.telmobile = parseInt($scope.ojectedit[idedit].telephone);
            if ($scope.ojectedit[idedit].telephoneFixe == null || $scope.ojectedit[idedit].telephoneFixe == undefined) {
                $scope.telfixe = '';
            } else {
                $scope.telfixe = parseInt($scope.ojectedit[idedit].telephoneFixe);
            };
            // $scope.profil_u=$scope.ojectedit[idedit].profilIdProfil.type;
            $scope.banque = $scope.ojectedit[idedit].groupeIdGroupe.institution.nom;

            $scope.changeBk($scope.banque);
            // $scope.changeProfil($scope.ojectedit[idedit].profilIdProfil.type);

            $scope.addUserBk = function(prenom, nom, telmobile, telfixe, mail, login_, profil_u, banque) {
                $scope.loading = true;
                if (telfixe === undefined || telfixe === NaN || telfixe == null || telfixe === '') {
                    telfixe = null;
                };
                if (telfixe == null) {
                    objet = {
                        "idUtilisateur": $scope.ojectedit[idedit].idUtilisateur,
                        "email": "" + mail,
                        "login": "" + login_,
                        "nom": "" + nom,
                        "prenom": "" + prenom,
                        "telephone": "+" + telmobile,
                        "telephoneFixe": telfixe
                            // "profilIdProfil": idProf
                    };
                } else {
                    objet = {
                        "idUtilisateur": $scope.ojectedit[idedit].idUtilisateur,
                        "email": "" + mail,
                        "login": "" + login_,
                        "nom": "" + nom,
                        "prenom": "" + prenom,
                        "telephone": "+" + telmobile,
                        "telephoneFixe": "+" + telfixe
                            // "profilIdProfil": idProf
                    };
                };

                $rootScope.$broadcast('addEditbk', { idInstitution: idInstitution, objet: objet });
            };
            break;
        case 'BANK-GROUPE_edit':
            $scope.banque = $scope.ojectedit[idedit].institution.nom;
            $scope.code = $scope.ojectedit[idedit].nom;
            $scope.libelle = $scope.ojectedit[idedit].description;

            $scope.changeBk($scope.banque);

            $scope.addBkGr = function(banque, code, libelle) {
                $scope.loading = true;
                objet = {
                    "nom": "" + code,
                    "description": "" + libelle,
                    "idGroupe": $scope.ojectedit[idedit].idGroupe,
                    "institution": idInstitution
                };

                $rootScope.$broadcast('addEditbk', { idInstitution: idInstitution, objet: objet });
            };
            break;
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    /*MESSAGES */
    $scope.$on('message_err_affich', function(events, args) {
        if (args.statut == 0) {
            $scope.isSuccess = false;
            $modalInstance.close();
        } else {
            $scope.loading = false;
            $scope.isSuccess = true;
            $scope.message = args.msn;
        };
    });
    /*FIN MESSAGES */
}]);
/*************************SUPPRESSION CONTROLLER ENTREPRISE & ETREASURY**********************************/
app.controller('suppressionController', ['$scope', '$rootScope', '$state', '$http', '$uibModalInstance', 'selectedRow', 'deconnectApi',
    function($scope, $rootScope, $state, $http, $modalInstance, selectedRow, deconnectApi) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        $scope.spinner = "img/loading.gif";

        $scope.selectedRow = selectedRow;
        $scope.selectedActiv = selectedRow;

        $scope.userEtreasury = { idUtilisateur: -1, isActive: false };

        $scope.confirmActive = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $scope.userEtreasury.idUtilisateur = $scope.selectedActiv.idUtilisateur;
            $scope.userEtreasury.isActive = true;
            $http({
                method: "PUT",
                url: baseUrl + "admin/activate/user/" + idADmin + "/" + $scope.selectedActiv.idUtilisateur,
                data: $scope.userEtreasury,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function(data) {
                $scope.stat = data.data.status;
                listEntrepriseUsers();
                listUsers();
                etreasuryUsersAdmin();
                $state.reload();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        $scope.confirmDesactive = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $scope.userEtreasury.idUtilisateur = $scope.selectedActiv.idUtilisateur;
            $scope.userEtreasury.isActive = false;
            $http({
                method: "PUT",
                url: baseUrl + "admin/activate/user/" + idADmin + "/" + $scope.selectedActiv.idUtilisateur,
                data: $scope.userEtreasury,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function(data) {
                $scope.stat = data.data.status;
                listEntrepriseUsers();
                listUsers();
                etreasuryUsersAdmin();
                $state.reload();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function listUsers() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/user_bank/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.bankUsers = response.data.bank_list;
                // //console.log("$scope.bankUsers ",$scope.bankUsers);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        $scope.confirmSuppENT = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $http({
                method: 'DELETE',
                url: baseUrl + 'admin/entreprise/delete/' + $scope.selectedRow.idInstitution + '/' + idADmin,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(reloadListEnt).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function reloadListEnt() {
            listEntreprise();
            $state.reload();
        }

        $scope.entrepriseList = [];

        function listEntreprise() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/entreprise/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.entrepriseList = response.data.entreprise_list;
                $scope.cancel();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.confirmSuppEntGroup = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $http({
                method: 'DELETE',
                url: baseUrl + 'admin/groupe/admin_general/delete/' + idADmin + '/' + $scope.selectedRow.idGroupe,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(reloadListEntGrp).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.entrepriseGroupes = [];

        function reloadListEntGrp() {
            listEntrepriseGroup();
            $state.reload();
        }

        function listEntrepriseGroup() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/groupe/admin_general/entreprise/list/' + idADmin,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.entrepriseGroupes = response.data.group_list_ET;
                $scope.cancel();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        $scope.confirmSuppEntUser = function() {
            $scope.loading = true;
            $scope.disabl = true;
            //console.log($scope.selectedRow.idUtilisateur);
            $http({
                method: 'DELETE',
                url: baseUrl + 'admin/user_admin/delete/' + idADmin + '/' + $scope.selectedRow.idUtilisateur,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(reloadListEntUser).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.entrepriseUsers = [];

        function reloadListEntUser(response) {
            //console.log(response);
            listEntrepriseUsers();
            $state.reload();
        }

        function listEntrepriseUsers() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/user_entreprise/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.entrepriseUsers = response.data.user_list;
                $scope.cancel();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        $scope.confirmSuppEtLocalite = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $http({
                method: 'DELETE',
                url: baseUrl + 'locality/delete/' + $scope.selectedRow.idLocalite + '/' + idADmin,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(reloadListLoc).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.etreasuryLocalities = [];

        function reloadListLoc() {
            ListLocality();
            $state.reload();
        }

        function ListLocality() {
            $http({
                method: 'GET',
                url: baseUrl + 'locality/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.etreasuryLocalities = response.data.locality_list;
                $scope.cancel();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        $scope.confirmSuppEtGroup = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $http({
                method: 'DELETE',
                url: baseUrl + 'admin/groupe/admin_general/delete/' + idADmin + '/' + $scope.selectedRow.idGroupe,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(reloadListEtGR).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.etreasuryGroupes = [];

        function reloadListEtGR() {
            etreasuryGroup();
            $state.reload();
        }

        function etreasuryGroup() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/groupe/admin_general/etreasury/list/' + idADmin,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.etreasuryGroupes = response.data.group_list_ET;
                $scope.cancel();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        $scope.confirmSuppEtUser = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $http({
                method: 'DELETE',
                url: baseUrl + 'admin/user_admin/delete/' + idADmin + '/' + selectedRow.idUtilisateur,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(reloadListEtUser).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.etreasuryUsers = [];

        function reloadListEtUser() {
            etreasuryUsersAdmin();
            $state.reload();
        }

        function etreasuryUsersAdmin() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/user_admin/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.etreasuryUsers = response.data.admin_list;
                $scope.cancel();
                for (var i = 0; i < $scope.etreasuryUsers.length; i++) {
                    if ($scope.etreasuryUsers[i].idUtilisateur == sessionStorage.getItem("iduser")) {
                        $scope.isuserInsessionLine = i;
                        break;
                    };
                };
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        $scope.confirmSuppProduit = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $http({
                method: 'DELETE',
                url: baseUrl + 'admin/product/delete/' + selectedRow.idProduits + '/' + idADmin,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(reloadListProd).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.etreasuryProduit = [];

        function reloadListProd() {
            listProduits();
            $state.reload();
        }

        function listProduits() {
            /*******************************************************************
             ********************************************************************
             ***@GET(admin/product/list)***************
             ***********************************
             ***@return JsonParser***********************************************
             ********************************************************************
             ********************************************************************/
            $http({
                method: 'GET',
                url: baseUrl + 'admin/product/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.etreasuryProduit = response.data.list_products;
                $scope.cancel();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        $scope.confirmSuppBankCond = function() {
            /*******************************************************************
             ********************************************************************
             ***@DELETE(admin/bank_conditions/)***************
             ***@Params(@id Bank condition********************************
             ***@return JsonParser***********************************************
             ********************************************************************
             ********************************************************************/
            $http({
                method: 'DELETE',
                url: baseUrl + 'admin/bank_conditions/' + selectedRow.idConditionBanque,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(reloadListBankCond).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.etreasuryBankCondition = [];

        function reloadListBankCond() {
            listBankConditions();
            $state.reload();
        }

        function listBankConditions() {
            /*******************************************************************
             ********************************************************************
             ***@GET(admin/bank_conditions/list)***************
             *****************************************************************
             ***@return JsonParser***********************************************
             ********************************************************************
             ********************************************************************/
            $http({
                method: 'GET',
                url: baseUrl + 'admin/bank_conditions/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.etreasuryBankCondition = response.data.list_bankConditions;
                $scope.cancel();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        function _errorSup(response) {
            ////console.log(response.statusText);
        }

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

    }
]);
/************************* FIN SUPPRESSION CONTROLLER ENTREPRISE & ETREASURY**********************************/

/**************************INFOS USER CONTROLLER*************************************************/

app.controller('popUpinfosUserController', ['$scope', '$uibModal', '$uibModalInstance', '$http', '$state', '$filter', '$interval', 'items', 'deconnectApi',
    function($scope, $modal, $modalInstance, $http, $state, $filter, $interval, items, deconnectApi) {
        $scope.items = items;
        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        $scope.isuserInsessionLine = 0;
        $scope.errorMessage = null;
        $scope.stat = null;
        $scope.user = { idUser: -1, password: "", newPassword: "" };

        $scope.submitPassword = function() {
            $scope.user.idUser = idADmin;
            $scope.user.password = $scope.oldpassword;
            $scope.user.newPassword = $scope.newpass;
            /*******************************************************************
             ********************************************************************
             ***@POST(admin/user/updatePassword)***************
             ***@Params (objet utilisateur)*************************
             ***@return JsonParser***********************************************
             ********************************************************************
             ********************************************************************/
            $http({
                method: "POST",
                url: baseUrl + "admin/user/updatePassword",
                data: $scope.user,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function(data) {
                $scope.stat = data.data.status;
                if ($scope.stat === 0) {
                    $scope.ok();
                } else {
                    $scope.errorMessage = data.data.message;
                };
                ////console.log(data);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.userAdmin = {
            idUtilisateur: -1,
            nom: "",
            prenom: "",
            email: "",
            telephone: "",
            telephoneFixe: ""
        };
        $scope.prenomP = '' + localStorage.getItem('username_2');
        $scope.nomP = '' + localStorage.getItem('username');
        $scope.mailP = '' + localStorage.getItem('email');
        $scope.telP = '' + localStorage.getItem('tel1');
        $scope.telF = '' + localStorage.getItem('tel2');

        $scope.submitProfil = function() {
            $scope.userAdmin.idUtilisateur = idADmin;
            $scope.userAdmin.prenom = $scope.prenomP;
            $scope.userAdmin.email = $scope.mailP;
            $scope.userAdmin.nom = $scope.nomP;
            $scope.userAdmin.telephone = $scope.telP;
            $scope.userAdmin.telephoneFixe = $scope.telF;
            /*******************************************************************
             ********************************************************************
             ***@PUT(admin/product/list/)***************
             ***@Params(@id user en session**************************************
             ***@return JsonParser***********************************************
             ********************************************************************
             ********************************************************************/
            $http({
                method: "PUT",
                url: baseUrl + "admin/user_admin/update/" + idADmin,
                data: angular.toJson($scope.userAdmin),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jeton')
                }
            }).then(_success).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function _success(response) {
            $scope.stat = response.data.status;
            if ($scope.stat === 0) {
                $scope.errorMessage = null;
                //console.log(response.data);
                $state.reload();
                $scope.ok();
            } else {
                $scope.errorMessage = response.data.message;
            }
        }

        function _error(response) {
            //console.log(response.statusText);
        }
        $scope.ok = function() {
            $scope.selectedRow = null;
            $modalInstance.close();
        };
        $scope.cancel = function() {
            $scope.selectedRow = null;
            $modalInstance.dismiss('cancel');
        };
    }
]);
app.controller('infosUserController', ['$scope', '$http', '$log', '$rootScope', '$uibModal', 'deconnectApi',
    function($scope, $http, $log, $rootScope, $modal, deconnectApi) {

        $scope.updatePassword = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/updatePassword.html',
                controller: 'popUpinfosUserController',
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.updateProfil = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/updateProdfil.html',
                controller: 'popUpinfosUserController',
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


    }
]);
/************************* FIN INFOS USER CONTROLLER**********************************/


/*******************************************************************************************************************
 ********************************************************************************************************************
 *******************************ENTREPRISE ADMINISTRATION**************************************************************
 ********************************************************************************************************************/
angular.module('app').controller('eNOpCtrl', ['$scope', '$http', '$uibModal', '$log', '$rootScope', '$state', '$location', '$timeout', '$interval', 'deconnectApi',
    function($scope, $http, $modal, $log, $rootScope, $state, $location, $timeout, $interval, deconnectApi) {

        var idUserInSession = sessionStorage.getItem("iduser");
        var idinsInSession = sessionStorage.getItem("idInstitution");
        $scope.listProduits = [];
        $scope.listDocuments = [];
        $scope.listByProduitDemande = [];
        $scope.listValitionsUSER = [];
        $scope.listValitionsUSER2 = [];
        $scope.listOffreByReq = [];
        $scope.listNotifOffers = [];
        $scope.listDevises = [];
        $scope.menuseparator = '';
        $scope.separatorValidOffer = '';
        $scope.separateurdel = '';
        $scope.infoDemande = null;
        var message = '';
        var statut = 0;
        $scope.isExpiredreq = false;
        $scope.isDataReady = false;
        $scope.update = false;
        $scope.ajout = false;
        $scope.delet = false;
        $scope.validtion = false;
        $scope.validation_Offer = false;
        // $scope.erreurReady=false;
        var iniNotifOffersLen = 0;
        // $scope.suiviListvalidation=0;
        $scope.audjourdhui_ = new Date();
        $scope.audjourdhui2 = new Date($scope.audjourdhui_.getFullYear(), $scope.audjourdhui_.getMonth(), $scope.audjourdhui_.getDate());
        $scope.audjourdhui = $scope.audjourdhui2.getTime();
        var configs = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jeton')
            }
        };

        /***************************POP UP SUPPRESSION**************************/
        function popUpconfirmation(x) {
            if (x != undefined) {
                var modalInstance = $modal.open({
                    templateUrl: 'partials/deletionConfirm.html',
                    controller: 'deletionConfirmEnCtrl',
                    resolve: {
                        x: function() {
                            return x;
                        }
                    }
                });
            };

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };
        /***************************FIN POP UP SUPPRESSION**************************/

        //LISTER LES PRODUITS
        $scope.idProduit = 0;

        function listPrduits() {
            /*******************************************************************
             ********************************************************************
             ***@GET(admin/product/list/)***************
             *******************************************************************
             ***@return JsonParser***********************************************
             ********************************************************************
             ********************************************************************/
            $http({
                method: 'GET',
                url: baseUrl + 'admin/product/list/',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.listProduits = response.data.list_products;
                for (var i = 0; i < $scope.listProduits.length; i++) {
                    switch (localStorage.getItem('pagetitle')) {
                        case 'Crédit spot':
                            if ($scope.listProduits[i].nom.indexOf('SPOT') != -1 || $scope.listProduits[i].nom.indexOf('Spot') != -1 ||
                                $scope.listProduits[i].nom.indexOf('spot') != -1) {
                                $scope.idProduit = $scope.listProduits[i].idProduits;
                                break;
                            };
                            break;
                        case 'Change':
                            if ($scope.listProduits[i].nom.indexOf('CHANGE') != -1 || $scope.listProduits[i].nom.indexOf('Change') != -1 ||
                                $scope.listProduits[i].nom.indexOf('change') != -1) {
                                $scope.idProduit = $scope.listProduits[i].idProduits;
                                break;
                            };
                            break;
                        case 'Transfert':
                            if ($scope.listProduits[i].nom.indexOf('TRANSFERT') != -1 ||
                                $scope.listProduits[i].nom.indexOf('Transfert') != -1 ||
                                $scope.listProduits[i].nom.indexOf('transfert') != -1) {
                                $scope.idProduit = $scope.listProduits[i].idProduits;
                                // //console.log("TRANSFERT ", $scope.idProduit);
                                break;
                            };
                            break;
                        case 'Dépot à terme':
                            if ($scope.listProduits[i].nom.indexOf('DEPOT A TERME') != -1 ||
                                $scope.listProduits[i].nom.indexOf('depot a terme') != -1 ||
                                $scope.listProduits[i].nom.indexOf('Depot a terme') != -1

                                ||
                                $scope.listProduits[i].nom.split(" ")[2] === 'TERME' ||
                                $scope.listProduits[i].nom.split(" ")[2] === 'TermeE' ||
                                $scope.listProduits[i].nom.split(" ")[2] === 'terme'

                                ||
                                $scope.listProduits[i].nom.split(" ")[0] === 'DEPOT' ||
                                $scope.listProduits[i].nom.split(" ")[0] === 'depot' ||
                                $scope.listProduits[i].nom.split(" ")[0] === 'Depot'

                                ||
                                $scope.listProduits[i].nom.split(" ")[0] === 'DÉPOT' ||
                                $scope.listProduits[i].nom.split(" ")[0] === 'dépot' ||
                                $scope.listProduits[i].nom.split(" ")[0] === 'Dépot'

                                ||
                                $scope.listProduits[i].nom.split(" ")[0] === 'DÉPÔT' ||
                                $scope.listProduits[i].nom.split(" ")[0] === 'dépôt' ||
                                $scope.listProduits[i].nom.split(" ")[0] === 'Dépôt') {
                                $scope.idProduit = $scope.listProduits[i].idProduits;
                                break;
                            };
                            break;
                        case 'Escompte':
                            if ($scope.listProduits[i].nom.indexOf('ESCOMPTE') != -1 ||
                                $scope.listProduits[i].nom.indexOf('Escompte') != -1 ||
                                $scope.listProduits[i].nom.indexOf('escompte') != -1 ||
                                $scope.listProduits[i].nom.split(" ")[0] === 'ESCOMPTE' ||
                                $scope.listProduits[i].nom.split(" ")[0] === 'Escompte' ||
                                $scope.listProduits[i].nom.split(" ")[0] === 'escompte') {
                                $scope.idProduit = $scope.listProduits[i].idProduits;
                                break;
                            };
                            break;
                    };
                };
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listPrduits();
        //FIN LISTER LES PRODUITS

        $scope.menuCanges = localStorage.getItem('pagetitle');
        $scope.$watch("menuCanges", function(newValue, oldValue) {
            if (newValue != null && newValue != '' && newValue != undefined) {
                listPrduits();
            };
        });

        //LISTER LES UILISATEURS LOCALIES 
        $scope.idLocality = 0;

        function listLocality(userloc) {
            /*******************************************************************
             ********************************************************************
             ***@GET(locality/list)******************************************
             **********
             ***@return JsonParser***********************************************
             ********************************************************************
             ********************************************************************/
            $http({
                method: 'GET',
                url: baseUrl + 'locality/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.listLocalities = response.data.locality_list;
                for (var i = 0; i < $scope.listLocalities.length; i++) {
                    if ($scope.listLocalities[i].ville === '' + userloc) {
                        $scope.idLocality = $scope.listLocalities[i].idLocalite;
                        break;
                    };
                };
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        //FIN LISTER LES UILISATEURS LOCALIES
        //LISTER LES DEVISES 
        function listDevises() {
            /*******************************************************************
             ********************************************************************
             ***@GET(admin/devise/list)******************************************
             **********
             ***@return JsonParser***********************************************
             ********************************************************************
             ********************************************************************/
            $http({
                method: 'GET',
                url: baseUrl + 'admin/devise/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.listDevises = response.data.devise_list;
                //console.log("La liste de toutes les devises ",$scope.listDevises);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listDevises();
        //FIN LISTER LES DEVISES

        //LISTER LES BANK PAR LOCALITE 
        function listLocalityById(idLoc) {
            /*******************************************************************
             ********************************************************************
             ***@GET(admin/bank/locality/)**************************************
             ***@Params(@id Localité)********************************************
             ***@return JsonParser***********************************************
             ********************************************************************
             ********************************************************************/
            $http({
                method: 'GET',
                url: baseUrl + 'admin/bank/locality/' + idLoc,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.listBkByLoc = response.data.list_banks;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        //FIN LISTER LES BANK PAR LOCALITE

        //LISTER LES UILISATEURS ENTREPRISE
        $scope.uSerLocalite = null;

        function listEntrepriseUsers() {
            // //console.log("listEntrepriseUsers ");
            /*******************************************************************
             ********************************************************************
             ***@GET(admin/user_entreprise/list)***************
             **********
             ***@return JsonParser***********************************************
             ********************************************************************
             ********************************************************************/
            $http({
                method: 'GET',
                url: baseUrl + 'admin/user_entreprise/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.entrepriseUsers = response.data.user_list;
                for (var i = 0; i < $scope.entrepriseUsers.length; i++) {
                    if ($scope.entrepriseUsers[i].idUtilisateur == idUserInSession) {
                        $scope.uSerLocalite = $scope.entrepriseUsers[i].groupeIdGroupe.institution.localityIdLocalite.ville;
                        break;
                    };
                };
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listEntrepriseUsers();

        $scope.$watch("uSerLocalite", function(newValue, oldValue) {
            if (newValue != null && newValue != '' && newValue != undefined) {
                listLocality(newValue);
            };
        });

        $scope.$watch("idLocality", function(newValue, oldValue) {
            if (newValue != null && newValue != '' && newValue != undefined && newValue != 0) {
                listLocalityById(newValue);
            };
        });

        $interval(function() {
            $scope.audjourdhui_ = new Date();
        }, 1000);
        $scope.$watch("audjourdhui", function(newValue, oldValue) {
            // $scope.audjourdhui=$scope.audjourdhui_.getTime();
            $scope.audjourdhui2 = new Date($scope.audjourdhui_.getFullYear(), $scope.audjourdhui_.getMonth(), $scope.audjourdhui_.getDate());
            $scope.audjourdhui = $scope.audjourdhui2.getTime();
        });

        /*LISTE DES VALIDATIONS ET SUIVI*/
        var iniValidationLength = 0;
        var compteur = 0;
        var nb = 0;

        function listValidationsUser() {
            $scope.isDataReadyUserV = false;
            // //console.log("mes validations ");
            $scope.listValitionsUSER = [];
            /*******************************************************************
             ********************************************************************
             ***@GET(validation_request/list_notification_attente/)******************
             ***@Params(@id de user en session*******
             ***@return(@return JsonParser***************************************
             ********************************************************************
             ********************************************************************/
            $http({
                method: 'GET',
                url: baseUrl + 'validation_request/list_notification_attente/' + idUserInSession,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                //console.log("response.data.requestNotifyList ",response.data.requestNotifyList);
                // $scope.listValitionsUSER=response.data.requestNotifyList;
                for (var i = 0; i < response.data.requestNotifyList.length; i++) {
                    if (response.data.requestNotifyList[i].request != 'null' && response.data.requestNotifyList[i].request != 'undefined' && response.data.requestNotifyList[i].request != undefined) {
                        if (response.data.requestNotifyList[i].request.product.idProduits == $scope.idProduit) {
                            $scope.listValitionsUSER.push(response.data.requestNotifyList[i]);
                            // // //console.log("Je vois mes validationsp ",response.data.requestNotifyList[i].request.product);
                        };
                    } else {
                        if (response.data.requestNotifyList[i].offerModel != 'null' && response.data.requestNotifyList[i].offerModel != 'undefined' && response.data.requestNotifyList[i].offerModel != undefined) {
                            if (response.data.requestNotifyList[i].offerModel.offer.demandeIdDemande.product.idProduits == $scope.idProduit) {
                                $scope.listValitionsUSER2.push(response.data.requestNotifyList[i].offerModel.offer.demandeIdDemande);
                            };
                        };
                    };
                };
                // //console.log("$scope.idProduit ",$scope.idProduit);
                // //console.log("Verifier ",nb++);
                // //console.log("$scope.listValitionsUSER ",$scope.listValitionsUSER);
                $scope.isDataReadyUserV = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        // listValidationsUser();

        function listValidationsUserSuivi() {
            /*******************************************************************
             ********************************************************************
             ***@GET(validation_request/list_notification_attente/)******************
             ***@Params(@id de user en session*******
             ***@return(@return JsonParser***************************************
             ********************************************************************
             ********************************************************************/
            $http({
                method: 'GET',
                url: baseUrl + 'validation_request/list_notification_attente/' + idUserInSession,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                compteur++;
                if (compteur == 1) {
                    iniValidationLength = response.data.list_notification_attente.length;
                };
                $scope.suiviListvalidation = response.data.list_notification_attente.length;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        // listValidationsUserSuivi();
        /*FIN LISTE DES VALIDATIONS ET SUIVI*/

        /*LISTE DES VALIDATIONS PAR DEMANDE*/
        // function listValidationsByReq(){
        // $http({
        // method : 'GET',
        // url : baseUrl+'mon_espace/bank/request/offer/list_offer_by_request/'+11,
        // }).then(function successCallback(response) {
        // }, function errorCallback(response) {
        // });
        // };
        // listValidationsByReq(); 
        // $scope.issuivreOffre=false;
        // $scope.listOffreByReq=[];
        function listValidationsByReq() {
            // $scope.infoDemande
            /*******************************************************************
             ********************************************************************
             ***@GET(mes_operations/entreprise/request_has_bank/list_offer_entreprise/)******************
             ***@Params(@id de la demande, @id de user en session*******
             ***@return(@return JsonParser***************************************
             ********************************************************************
             ********************************************************************/
            $http({
                method: 'GET',
                url: baseUrl + 'mes_operations/entreprise/request_has_bank/list_offer_entreprise/' + $scope.infoDemande.request.idDemande + '/' + idinsInSession,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.listOffreByReq = response.data.list_offer_by_request;
                // //console.log("List Offres By Req ");
                if ($scope.separatorValidOffer === 'OFFER') {
                    popUpadminEn($scope.menuseparator, null, true, $scope.listOffreByReq, true);
                } else {
                    popUpadminEn($scope.menuseparator, null, true, $scope.listOffreByReq, true);
                };
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        var compteur2 = 0;

        function listNotifOffer() {
            /*******************************************************************
             ********************************************************************
             ***@GET(mes_operations/entreprise/request/list_notification_offer/)******************
             ***@Params(@id de l'utilisateur en session**************************
             ***@return(@return JsonParser***************************************
             ********************************************************************
             ********************************************************************/
            $http({
                method: 'GET',
                url: baseUrl + 'mes_operations/entreprise/request/list_notification_offer/' + idinsInSession + '/' + idUserInSession,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                // $scope.listNotifOffers=response.data;
                if (compteur2 == 1) {
                    iniNotifOffersLen = response.data.list_notification_attente.length;
                };
                // //console.log("List Notif Offre ",response.data);
                $scope.suiviListNotifOffers = response.data.list_offers_request;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        // listNotifOffer();
        // listValidationsByReq();
        /*FIN LISTE DES VALIDATIONS PAR DEMANDE*/
        // $timeout(function () {
        // listValidationsUserSuivi();
        // },0);
        // $timeout(function () {
        // },5000);

        // $interval(function () {
        // listValidationsUserSuivi();
        // listNotifOffer();
        // }, 2000);

        $scope.$watch("suiviOfferState", function(newValue, oldValue) {});

        $scope.$watch("suiviListvalidation", function(newValue, oldValue) {
            if ((newValue > iniValidationLength || newValue < iniValidationLength) && newValue != undefined) {
                //console.log("Hi vous avez une notification... ",newValue);
                var x = 'Vérifiez votre liste de validation en attente, voulez-vous rafraîchir la page?';
                var modalInstance = $modal.open({
                    templateUrl: 'partials/notificationspop.html',
                    controller: 'deletionConfirmEnCtrl',
                    resolve: {
                        x: function() {
                            return x;
                        }
                    }
                });

                modalInstance.result.then(function(selectedItem) {
                    $scope.selected = selectedItem;
                }, function() {
                    $log.info('Modal dismissed at: ' + new Date());
                });
                listValidationsUser();
                compteur = 0;
            };
        });

        $scope.$watch("suiviListNotifOffers", function(newValue, oldValue) {
            // //console.log("List Notif Offre ",newValue);
            if ((newValue > iniNotifOffersLen || newValue < iniNotifOffersLen) && newValue != undefined) {
                //console.log("Hi List Notif Offre ",newValue);
                var x = 'Une demande a une offre, voulez-vous rafraîchir la page?';
                var modalInstance = $modal.open({
                    templateUrl: 'partials/notificationspop.html',
                    controller: 'deletionConfirmEnCtrl',
                    resolve: {
                        x: function() {
                            return x;
                        }
                    }
                });

                modalInstance.result.then(function(selectedItem) {
                    $scope.selected = selectedItem;
                }, function() {
                    $log.info('Modal dismissed at: ' + new Date());
                });
                listValidationsUser();
                compteur2 = 0;
            };
        });
        //FIN LISTER LES UILISATEURS ENTREPRISE
        $scope.loading = true;
        $scope.$watch("idProduit", function(newValue, oldValue) {
            $scope.loading = true;
            var idEntrepr = sessionStorage.getItem('idInstitution');
            if (newValue != null && newValue != '' && newValue != undefined && newValue != 0) {
                $scope.isDataReady = false;
                // $scope.isDataReadyUserV=false;
                /*******************************************************************
                 ********************************************************************
                 ***@GET(mes_operations/entreprise/request/list/)******************
                 ***@Params(@id de la entreprise, @id de produit en session*******
                 ***@return(@return JsonParser***************************************
                 ********************************************************************
                 ********************************************************************/
                $http({
                    method: 'GET',
                    url: baseUrl + 'mes_operations/entreprise/request/list/' + idEntrepr + '/' + newValue,
                    data: {},
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
                }).then(function successCallback(response) {
                    $scope.loading = false;
                    $scope.listByProduitDemande = response.data.list_request_detail;
                    listValidationsUser();
                    //console.log("$scope.listByProduitDemande  ",$scope.listByProduitDemande );
                    $scope.isDataReady = true;
                    // $scope.isDataReadyUserV=true;
                    // //console.log("listByProduitDemande ",$scope.listByProduitDemande);
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
            };
        });
        //LISTE PAR DEMANDE DE PRODUIT
        // function listByDemandeProduct(){
        // //console.log("idProduit ",idProduit);
        // if(idEntreprise!=0&&idProduit!=0){
        // //console.log("$scope.listByProduitDemande");
        // $http({
        // method : 'GET',
        // url : baseUrl+'mes_operations/entreprise/request/list/'+localStorage.getItem('idInstitution')+'/'+idProduit,
        // }).then(function successCallback(response) {
        // //console.log("$scope.listByProduitDemande ",response.data);
        // $scope.listByProduitDemande = response.data;
        // }, function errorCallback(response) {
        // });
        // };
        // };
        // listByDemandeProduct();
        // listByDemandeProduct();
        //FIN LISTE PAR DEMANDE DE PRODUIT

        /*LISTE DES DOCUMENTS DE USER EN SESSION*/
        function listUserDocuments() {
            /*******************************************************************
             ********************************************************************
             ***@GET(mon_espace/documents/list_user/)******************
             ***@Params(@id de l'utilisateur en session**************************
             ***@return JsonParser***********************************************
             ********************************************************************
             ********************************************************************/
            $http({
                method: 'GET',
                url: baseUrl + 'mon_espace/documents/list_user/' + idUserInSession,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.listDocuments = response.data.document_list;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listUserDocuments();
        /*FIN LISTE DES DOCUMENTS DE USER EN SESSION**/
        //Popup ADMINISTRATION ENTREPRISE
        function templatepop(divises, infRequest, idPr, listBkByLocs, listDocs, listPr, template, menu, bool, bdetail, isOffer, isOffertrue, validation_Offer) {
            var modalInstance = $modal.open({
                templateUrl: template,
                controller: 'popUpadminEn',
                resolve: {
                    devises: function() {
                        return divises;
                    },
                    infRequest: function() {
                        return infRequest;
                    },
                    idPr: function() {
                        return idPr;
                    },
                    listBkByLocs: function() {
                        return listBkByLocs;
                    },
                    listDocs: function() {
                        return listDocs;
                    },
                    listPr: function() {
                        return listPr;
                    },
                    template: function() {
                        return template;
                    },
                    menu: function() {
                        return menu;
                    },
                    bool: function() {
                        return bool;
                    },
                    bdetail: function() {
                        return bdetail;
                    },
                    isOffer: function() {
                        return isOffer;
                    },
                    isOffertrue: function() {
                        return isOffertrue;
                    },
                    validation_Offer: function() {
                        return validation_Offer;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        function popUpadminEn(menu, bool, bdetail, offeris, isoffretrue) {
            switch (menu) {
                case 'ADD-CR-SPOT':
                    templatepop($scope.listDevises, null, $scope.idProduit, $scope.listBkByLoc, $scope.listDocuments, $scope.listProduits, 'partials/admin_entreprise/mes_operations/register_op_cr_spot.html', $scope.menuseparator, bool, bdetail, offeris, isoffretrue, $scope.validation_Offer);
                    break;
                case 'ADD-CHANGE':
                    templatepop($scope.listDevises, null, $scope.idProduit, $scope.listBkByLoc, $scope.listDocuments, $scope.listProduits, 'partials/admin_entreprise/mes_operations/register_op_ch.html', menu, bool, bdetail, offeris, isoffretrue, $scope.validation_Offer);
                    break;
                case 'ADD-TRANSFERT':
                    templatepop($scope.listDevises, null, $scope.idProduit, $scope.listBkByLoc, $scope.listDocuments, $scope.listProduits, 'partials/admin_entreprise/mes_operations/register_op_tr.html', menu, bool, bdetail, offeris, isoffretrue, $scope.validation_Offer);
                    break;
                case 'ADD-DEP-TERME':
                    templatepop($scope.listDevises, null, $scope.idProduit, $scope.listBkByLoc, $scope.listDocuments, $scope.listProduits, 'partials/admin_entreprise/mes_operations/register_op_dep.html', menu, bool, bdetail, offeris, isoffretrue, $scope.validation_Offer);
                    break;
                case 'ADD-ESCOMPTE':
                    templatepop($scope.listDevises, null, $scope.idProduit, $scope.listBkByLoc, $scope.listDocuments, $scope.listProduits, 'partials/admin_entreprise/mes_operations/register_op_esc.html', menu, bool, bdetail, offeris, isoffretrue, $scope.validation_Offer);
                    break;
                case 'INFO-CR-SPOT':
                    templatepop($scope.listDevises, $scope.infoDemande, $scope.idProduit, $scope.listBkByLoc, $scope.listDocuments, $scope.listProduits, 'partials/admin_entreprise/mes_operations/register_op_cr_spot.html', menu, bool, bdetail, offeris, isoffretrue, $scope.validation_Offer);
                    break;
                case 'INFO-CHANGE':
                    templatepop($scope.listDevises, $scope.infoDemande, $scope.idProduit, $scope.listBkByLoc, $scope.listDocuments, $scope.listProduits, 'partials/admin_entreprise/mes_operations/register_op_ch.html', menu, bool, bdetail, offeris, isoffretrue, $scope.validation_Offer);
                    break;
                case 'INFO-TRANSFERT':
                    templatepop($scope.listDevises, $scope.infoDemande, $scope.idProduit, $scope.listBkByLoc, $scope.listDocuments, $scope.listProduits, 'partials/admin_entreprise/mes_operations/register_op_tr.html', menu, bool, bdetail, offeris, isoffretrue, $scope.validation_Offer);
                    break;
                case 'INFO-DEP-TERME':
                    templatepop($scope.listDevises, $scope.infoDemande, $scope.idProduit, $scope.listBkByLoc, $scope.listDocuments, $scope.listProduits, 'partials/admin_entreprise/mes_operations/register_op_dep.html', menu, bool, bdetail, offeris, isoffretrue, $scope.validation_Offer);
                    break;
                case 'INFO-ESCOMPTE':
                    templatepop($scope.listDevises, $scope.infoDemande, $scope.idProduit, $scope.listBkByLoc, $scope.listDocuments, $scope.listProduits, 'partials/admin_entreprise/mes_operations/register_op_esc.html', menu, bool, bdetail, offeris, isoffretrue, $scope.validation_Offer);
                    break;
            };
        };
        //FIN Popup ADMINISTRATION ENTREPRISE 


        /*Function GLOBAL ADD DEMANDE PRODUIT*/
        // function addenTProduitDemande(idUser,objet){
        // //console.log("OBJECT_ADD ",objet);
        // $http.post(baseUrl+'mes_operations/entreprise/request/add/'+idUser,objet)
        // .then(function(response){
        // //listUserDocuments();
        // statut=response.data.status;
        // message=response.data.message;
        // if(response.data.status==0){
        // ////console.log("demande");
        // //console.log("Insertion success demande ",response);
        // $scope.ajout=true;
        // //$rootScope.$broadcast('ajoutreq', {message});
        // //$modalInstance.close();
        // //$rootScope.$broadcast('closereqmodal', {statut : statut,message : message});
        // //$rootScope.$broadcast('message_err', {statut : statut,message : message});
        // $rootScope.$broadcast('message_err_affich', {statut : statut,message : message});
        // }else{
        // $rootScope.$broadcast('message_err', {statut : statut,message : message});
        // };
        ////console.log("Insertion success demande ",message);
        ////console.log("Insertion success demande ",statut);
        ////console.log("Insertion success demande ",response);
        // $state.reload();
        // }),(function(err){
        // //console.log("Erreur ",err);
        // });
        // };
        /*FIN Function GLOBAL ADD DEMANDE PRODUIT*/
        /*Function GLOBAL VALIDATION*/
        // function validationsUser(objectReq){
        // //console.log("objectReq ",objectReq);
        // $http.post(baseUrl+'validation_request/add/'+idUserInSession,objectReq)
        // .then(function(response){
        // //listUserDocuments();
        // statut=response.data.status;
        // message=response.data.message;
        // if(response.data.status==0){
        // ////console.log("demande");
        // ////console.log("Insertion success demande ",response);
        // $scope.validtion=true;
        // $rootScope.$broadcast('message_err', {statut : statut,message : message});
        // }else{
        // $rootScope.$broadcast('message_err', {statut : statut,message : message});
        // };
        // //console.log("Validation success ",response);
        // $state.reload();
        // }),(function(err){
        // //console.log("Erreur ",err);
        // });
        // };
        /*FIN Function GLOBAL  VALIDATION*/
        /*FUNCTION GLOBAL SUPPRESSION D'UNE DEMANDE PAR PRODUIT*/
        $scope.delEnProduitDemande = function(x) {
            $scope.separateurdel = 'DEL-PRODUIT';
            popUpconfirmation(x.request.idDemande);
        };

        function delenTProduitDemande(id_Demande) {
            //console.log("Suppression Demande avec succès req ",id_Demande);
            /*******************************************************************
             ********************************************************************
             ***@DELETE(mes_operations/entreprise/request/delete/)***************
             ***@Params(@id de la demande, @id de l'utilisateur en session*******
             ***@return JsonParser***********************************************
             ********************************************************************
             ********************************************************************/
            $http({
                method: 'DELETE',
                url: baseUrl + 'mes_operations/entreprise/request/delete/' + id_Demande + '/' + idUserInSession,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                //console.log("Suppression Demande avec succès ",response);
                for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                    if ($scope.listByProduitDemande[i].request.idDemande == id_Demande) {
                        // //console.log("SuppressionOK ",response);
                        $scope.listByProduitDemande.splice(i, 1);
                        break;
                    };
                };
                $scope.delet = true;
                $state.reload();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        /*FIN FUNCTION GLOBAL SUPPRESSION D'UNE DEMANDE PAR PRODUIT*/
        /*FUNCTION GLOBAL UPDATE D'UNE DEMANDE PAR PRODUIT*/
        // function updateEnProduitDemande(idReq,idUser,objet){
        // //console.log("OBJECT_U ",objet);
        // $http.put(baseUrl+'mes_operations/entreprise/request/update/'+idReq+'/'+idUser,objet)
        // .then(function(response){
        // statut=response.data.status;
        // message=response.data.message;
        // if(response.data.status==0){
        // $scope.update=true;
        // $rootScope.$broadcast('message_err', {statut : statut,message : message});
        // }else{
        // $rootScope.$broadcast('message_err', {statut : statut,message : message});
        // };
        // //console.log("Demande update success. ",response);
        // $state.reload();
        // }),(function(err){
        // });
        // };
        /*FIN FUNCTION GLOBAL UPDATE D'UNE DEMANDE PAR PRODUIT*/
        /*FIN RESTART DETAIL */
        $scope.$on('$destroy', function() {
            // if (!tinyInstance) { tinyInstance = tinymce.get(attrs.id); }
            // if (tinyInstance) {
            // tinyInstance.remove();
            // tinyInstance = null;
            // }
            // //console.log("$destroy");
        });
        $scope.$on('offreclose', function(events, args) {
            if ($scope.$root && !$scope.$root.$$phase) {
                $scope.$apply();
            };
            switch (args.menu_start) {
                case 'INFO-CR-SPOT':
                    $scope.detailEnoPcRsPot(args.info_req_start);
                    break;
                case 'INFO-CHANGE':
                    $scope.detailEnoPcH(args.info_req_start);
                    break;
                case 'INFO-TRANSFERT':
                    $scope.detailEnoPtR(args.info_req_start);
                    break;
                case 'INFO-DEP-TERME':
                    $scope.detailEnoPdeP(args.info_req_start);
                    break;
                case 'INFO-ESCOMPTE':
                    $scope.detailEnoPesC(args.info_req_start);
                    break;
                default:
                    break;
            };
        });
        /*FIN  RESTART DETAIL */
        //CREDIT SPOT
        $scope.addenToPcRsPot = function() {
            $scope.menuseparator = 'ADD-CR-SPOT';
            popUpadminEn($scope.menuseparator, true, false, $scope.listOffreByReq, false);
        };

        $scope.detailEnoPcRsPot = function(request) {
            // //console.log("Info de la req ",request);
            $scope.infoDemande = request;
            $scope.menuseparator = 'INFO-CR-SPOT';
            // popUpadminEn($scope.menuseparator,null,true,false);
            listValidationsByReq();
        };

        $scope.editEnoPcRsPot = function(request) {
            if (request.idsBank == null || request.idsBank == 'null') {
                for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                    if (request.request.idDemande == $scope.listByProduitDemande[i].request.idDemande && ($scope.listByProduitDemande[i].idsBank != null && $scope.listByProduitDemande[i].idsBank != 'null')) {
                        request.idsBank = $scope.listByProduitDemande[i].idsBank;
                        break;
                    };
                };
            };
            if (request.documents == null || request.documents == 'null') {
                for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                    if (request.request.idDemande == $scope.listByProduitDemande[i].request.idDemande && ($scope.listByProduitDemande[i].documents != null && $scope.listByProduitDemande[i].documents != 'null')) {
                        request.documents = $scope.listByProduitDemande[i].documents;
                        break;
                    };
                };
            };
            $scope.infoDemande = request;
            $scope.menuseparator = 'INFO-CR-SPOT';
            popUpadminEn($scope.menuseparator, false, false, $scope.listOffreByReq, false);
        };

        $scope.validationCr = function(request) {
            for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                if ($scope.listByProduitDemande[i].request.idDemande == request.request.idDemande) {
                    $scope.infoDemande = $scope.listByProduitDemande[i];
                    break;
                }
            };
            $scope.separatorValidOffer = 'REQUEST';
            $scope.menuseparator = 'INFO-CR-SPOT';
            popUpadminEn($scope.menuseparator, null, false, $scope.listOffreByReq, false);
        };

        $scope.validationCr2 = function(request) {
            // //console.log("$scope.validationCr2");
            for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                if ($scope.listByProduitDemande[i].request.idDemande == request.idDemande) {
                    $scope.infoDemande = $scope.listByProduitDemande[i];
                    break;
                }
            };
            $scope.validation_Offer = true;
            $scope.separatorValidOffer = 'OFFER';
            $scope.menuseparator = 'INFO-CR-SPOT';
            listValidationsByReq();
        };

        function updateEnoPcRsPot() {};
        //FIN CREDIT SPOT
        //OFFRE PAR REQUEST

        //FIN OFFRE PAR REQUEST

        //CHANGE
        $scope.addenToPcH = function() {
            $scope.menuseparator = 'ADD-CHANGE';
            popUpadminEn($scope.menuseparator, true, false, $scope.listOffreByReq, false);
        };

        $scope.detailEnoPcH = function(request) {
            $scope.infoDemande = request;
            $scope.menuseparator = 'INFO-CHANGE';
            // popUpadminEn($scope.menuseparator,null,true,$scope.listOffreByReq,false);
            listValidationsByReq();
        };

        $scope.editEnoPcH = function(request) {
            if (request.idsBank == null || request.idsBank == 'null') {
                for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                    if (request.request.idDemande == $scope.listByProduitDemande[i].request.idDemande && ($scope.listByProduitDemande[i].idsBank != null && $scope.listByProduitDemande[i].idsBank != 'null')) {
                        request.idsBank = $scope.listByProduitDemande[i].idsBank;
                        break;
                    };
                };
            };
            if (request.documents == null || request.documents == 'null') {
                for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                    if (request.request.idDemande == $scope.listByProduitDemande[i].request.idDemande && ($scope.listByProduitDemande[i].documents != null && $scope.listByProduitDemande[i].documents != 'null')) {
                        request.documents = $scope.listByProduitDemande[i].documents;
                        break;
                    };
                };
            };
            $scope.infoDemande = request;
            $scope.menuseparator = 'INFO-CHANGE';
            popUpadminEn($scope.menuseparator, false, false, $scope.listOffreByReq, false);
        };

        $scope.validationCh = function(request) {
            for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                if ($scope.listByProduitDemande[i].request.idDemande == request.request.idDemande) {
                    $scope.infoDemande = $scope.listByProduitDemande[i];
                    break;
                }
            };
            $scope.separatorValidOffer = 'REQUEST';
            $scope.menuseparator = 'INFO-CHANGE';
            popUpadminEn($scope.menuseparator, null, false, $scope.listOffreByReq, false);
        };

        $scope.validationCh2 = function(request) {
            for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                if ($scope.listByProduitDemande[i].request.idDemande == request.idDemande) {
                    $scope.infoDemande = $scope.listByProduitDemande[i];
                    break;
                }
            };
            $scope.validation_Offer = true;
            $scope.separatorValidOffer = 'OFFER';
            $scope.menuseparator = 'INFO-CHANGE';
            listValidationsByReq();
        };

        function updateEnoPcH() {

        };
        // function addenToPcH(idUser,objet){
        // $http.post(baseUrl+'mes_operations/entreprise/request/add/'+idUser,objet)
        // .then(function(response){
        // //console.log("Insertion sans documents CH ",response);
        // $state.reload();
        // }),(function(err){
        // //console.log("Erreur ",err);
        // });
        // };
        //FIN CHANGE

        //TRANSFERT
        $scope.addenToPtR = function() {
            $scope.menuseparator = 'ADD-TRANSFERT';
            popUpadminEn($scope.menuseparator, true, false, $scope.listOffreByReq, false)
        };

        $scope.detailEnoPtR = function(request) {
            $scope.infoDemande = request;
            $scope.menuseparator = 'INFO-TRANSFERT';
            // popUpadminEn($scope.menuseparator,null,true,$scope.listOffreByReq,false);
            listValidationsByReq();
        };

        $scope.editEnoPtR = function(request) {
            if (request.idsBank == null || request.idsBank == 'null') {
                for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                    if (request.request.idDemande == $scope.listByProduitDemande[i].request.idDemande && ($scope.listByProduitDemande[i].idsBank != null && $scope.listByProduitDemande[i].idsBank != 'null')) {
                        request.idsBank = $scope.listByProduitDemande[i].idsBank;
                        break;
                    };
                };
            };
            if (request.documents == null || request.documents == 'null') {
                for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                    if (request.request.idDemande == $scope.listByProduitDemande[i].request.idDemande && ($scope.listByProduitDemande[i].documents != null && $scope.listByProduitDemande[i].documents != 'null')) {
                        request.documents = $scope.listByProduitDemande[i].documents;
                        break;
                    };
                };
            };
            $scope.infoDemande = request;
            $scope.menuseparator = 'INFO-TRANSFERT';
            popUpadminEn($scope.menuseparator, false, false, $scope.listOffreByReq, false);
        };

        $scope.validationTr = function(request) {
            for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                if ($scope.listByProduitDemande[i].request.idDemande == request.request.idDemande) {
                    $scope.infoDemande = $scope.listByProduitDemande[i];
                    break;
                }
            };
            $scope.separatorValidOffer = 'REQUEST';
            $scope.menuseparator = 'INFO-TRANSFERT';
            popUpadminEn($scope.menuseparator, null, false, $scope.listOffreByReq, false);
        };

        $scope.validationTr2 = function(request) {
            for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                if ($scope.listByProduitDemande[i].request.idDemande == request.idDemande) {
                    $scope.infoDemande = $scope.listByProduitDemande[i];
                    break;
                }
            };
            $scope.validation_Offer = true;
            $scope.separatorValidOffer = 'OFFER';
            $scope.menuseparator = 'INFO-TRANSFERT';
            listValidationsByReq();
        };

        function updateEnoPtR(idReq, idUser, objet) {

        };
        //FIN TRANSFERT

        //DEPOT A TERME
        $scope.addenToPdeP = function() {
            $scope.menuseparator = 'ADD-DEP-TERME';
            popUpadminEn($scope.menuseparator, true, false, $scope.listOffreByReq, false)
        };

        $scope.detailEnoPdeP = function(request) {
            $scope.infoDemande = request;
            $scope.menuseparator = 'INFO-DEP-TERME';
            // popUpadminEn($scope.menuseparator,null,true,$scope.listOffreByReq,false);
            listValidationsByReq();
        };

        $scope.editEnoPdeP = function(request) {
            if (request.idsBank == null || request.idsBank == 'null') {
                for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                    if (request.request.idDemande == $scope.listByProduitDemande[i].request.idDemande && ($scope.listByProduitDemande[i].idsBank != null && $scope.listByProduitDemande[i].idsBank != 'null')) {
                        request.idsBank = $scope.listByProduitDemande[i].idsBank;
                        break;
                    };
                };
            };
            if (request.documents == null || request.documents == 'null') {
                for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                    if (request.request.idDemande == $scope.listByProduitDemande[i].request.idDemande && ($scope.listByProduitDemande[i].documents != null && $scope.listByProduitDemande[i].documents != 'null')) {
                        request.documents = $scope.listByProduitDemande[i].documents;
                        break;
                    };
                };
            };
            $scope.infoDemande = request;
            $scope.menuseparator = 'INFO-DEP-TERME';
            popUpadminEn($scope.menuseparator, false, false, $scope.listOffreByReq, false);
        };

        $scope.validationDep = function(request) {
            for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                if ($scope.listByProduitDemande[i].request.idDemande == request.request.idDemande) {
                    $scope.infoDemande = $scope.listByProduitDemande[i];
                    break;
                }
            };
            $scope.separatorValidOffer = 'REQUEST';
            $scope.menuseparator = 'INFO-DEP-TERME';
            popUpadminEn($scope.menuseparator, null, false, $scope.listOffreByReq, false);
        };

        $scope.validationDep2 = function(request) {
            for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                if ($scope.listByProduitDemande[i].request.idDemande == request.idDemande) {
                    $scope.infoDemande = $scope.listByProduitDemande[i];
                    break;
                }
            };
            $scope.validation_Offer = true;
            $scope.separatorValidOffer = 'OFFER';
            $scope.menuseparator = 'INFO-DEP-TERME';
            listValidationsByReq();
        };

        // function addenToPdeP(idUser){
        // $http.post(baseUrl+'',idUser)
        // .then(function(response){
        // }),(function(err){
        // });
        // };

        function updateEnoPdeP() {

        };
        //FIN DEPOT A TERME

        //ESCOMPTE
        // $scope.addenToPdEs = function () {
        // $scope.menuseparator='ADD-ESCOMPTE';
        // popUpadminEn($scope.menuseparator)
        // };

        $scope.addenToPesC = function() {
            $scope.menuseparator = 'ADD-ESCOMPTE';
            popUpadminEn($scope.menuseparator, true, false, $scope.listOffreByReq, false)
        };

        $scope.detailEnoPesC = function(request) {
            // //console.log("requestD ",request);
            $scope.infoDemande = request;
            $scope.menuseparator = 'INFO-ESCOMPTE';
            listValidationsByReq();
        };

        $scope.editEnoPesC = function(request) {
            if (request.idsBank == null || request.idsBank == 'null') {
                for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                    if (request.request.idDemande == $scope.listByProduitDemande[i].request.idDemande && ($scope.listByProduitDemande[i].idsBank != null && $scope.listByProduitDemande[i].idsBank != 'null')) {
                        request.idsBank = $scope.listByProduitDemande[i].idsBank;
                        break;
                    };
                };
            };
            if (request.documents == null || request.documents == 'null') {
                for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                    if (request.request.idDemande == $scope.listByProduitDemande[i].request.idDemande && ($scope.listByProduitDemande[i].documents != null && $scope.listByProduitDemande[i].documents != 'null')) {
                        request.documents = $scope.listByProduitDemande[i].documents;
                        break;
                    };
                };
            };
            $scope.infoDemande = request;
            $scope.menuseparator = 'INFO-ESCOMPTE';
            popUpadminEn($scope.menuseparator, false, false, $scope.listOffreByReq, false);
        };

        $scope.validationEsc = function(request) {
            for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                if ($scope.listByProduitDemande[i].request.idDemande == request.request.idDemande) {
                    $scope.infoDemande = $scope.listByProduitDemande[i];
                    break;
                }
            };
            // //console.log("requestV_ ",$scope.infoDemande);
            $scope.menuseparator = 'INFO-ESCOMPTE';
            popUpadminEn($scope.menuseparator, null, false, $scope.listOffreByReq, false);
        };

        $scope.validationEsc2 = function(request) {
            for (var i = 0; i < $scope.listByProduitDemande.length; i++) {
                if ($scope.listByProduitDemande[i].request.idDemande == request.idDemande) {
                    $scope.infoDemande = $scope.listByProduitDemande[i];
                    break;
                }
            };
            $scope.validation_Offer = true;
            $scope.menuseparator = 'INFO-ESCOMPTE';
            listValidationsByReq();
        };

        // function addenToPdEs(idUser){
        // $http.post(baseUrl+'',idUser)
        // .then(function(response){
        // }),(function(err){
        // });
        // };
        //FIN ESCOMPTE

        //OPERATIONS ADMINISTRATION ENTREPRISE
        var docNotNull = false;
        $scope.$on('adminEnOp', function(events, args) {
            $state.reload();
            // switch($scope.menuseparator){
            // case 'INFO-CR-SPOT' :
            // if($scope.menuseparator!=''&&$scope.menuseparator!=null&&$scope.menuseparator!=undefined){
            // updateEnProduitDemande(args.idReq,idUserInSession,args.objet);
            // };
            // break;
            // case 'INFO-CHANGE' :
            // if($scope.menuseparator!=''&&$scope.menuseparator!=null&&$scope.menuseparator!=undefined){
            // updateEnProduitDemande(args.idReq,idUserInSession,args.objet);
            // };
            // break;
            // case 'INFO-TRANSFERT' :
            // if($scope.menuseparator!=''&&$scope.menuseparator!=null&&$scope.menuseparator!=undefined){
            // updateEnProduitDemande(args.idReq,idUserInSession,args.objet);
            // };
            // break;
            // case 'INFO-DEP-TERME' :
            // if($scope.menuseparator!=''&&$scope.menuseparator!=null&&$scope.menuseparator!=undefined){
            // updateEnProduitDemande(args.idReq,idUserInSession,args.objet);
            // };
            // break;
            // case 'INFO-ESCOMPTE' :
            // if($scope.menuseparator!=''&&$scope.menuseparator!=null&&$scope.menuseparator!=undefined){
            // updateEnProduitDemande(args.idReq,idUserInSession,args.objet);
            // };
            // break;
            // default :
            // if($scope.menuseparator!=''&&$scope.menuseparator!=null&&$scope.menuseparator!=undefined){
            // addenTProduitDemande(idUserInSession,args.objet);
            // };
            // break;
            // }
        });
        $scope.$on('adminEnV', function(events, args) {
            //console.log("var valider ",args.valider);
            if (args.valider === 'valider') {
                listValidationsUser();
            } else {
                $state.reload();
            };
            // switch($scope.menuseparator){
            // case 'INFO-CR-SPOT' :
            // if($scope.menuseparator!=''&&$scope.menuseparator!=null&&$scope.menuseparator!=undefined){
            // validationsUser(args.objet);
            // };
            // break;
            // case 'INFO-CHANGE' :
            // if($scope.menuseparator!=''&&$scope.menuseparator!=null&&$scope.menuseparator!=undefined){
            // validationsUser(args.objet);
            // };
            // break;
            // case 'INFO-TRANSFERT' :
            // if($scope.menuseparator!=''&&$scope.menuseparator!=null&&$scope.menuseparator!=undefined){
            // validationsUser(args.objet);
            // };
            // break;
            // case 'INFO-DEP-TERME' :
            // if($scope.menuseparator!=''&&$scope.menuseparator!=null&&$scope.menuseparator!=undefined){
            // validationsUser(args.objet);
            // };
            // break;
            // case 'INFO-ESCOMPTE' :
            // if($scope.menuseparator!=''&&$scope.menuseparator!=null&&$scope.menuseparator!=undefined){
            // validationsUser(args.objet);
            // };
            // break;
            // }
        });
        $scope.$on('confirmdeletionEn', function(events, args) {
            if ($scope.separateurdel != '' && $scope.separateurdel != null && $scope.separateurdel != undefined) {
                delenTProduitDemande(args.x);
            };
            // switch($scope.separateurdel){
            // case 'ADD-CR-SPOT' :
            // delEnoPcRsPot(args.x);
            // //console.log("SUPPRESSION ",args.x);
            // break;
            // case 'ADD-CHANGE' :
            // deleteOneUserBkConfirm(args.x);
            // break;
            // case 'ADD-TRANSFERT' :
            // deleteOneUserBkConfirm(args.x);
            // break;
            // case 'ADD-DEP-TERME' :
            // deleteOneGrBkConfirm(args.x);
            // break;
            // case 'ADD-ESCOMPTE' :
            // deleteOneGrBkConfirm(args.x);
            // break;
            // };
        });
        //FIN OPERATIONS ADMINISTRATION ENTREPRISE

        /********************Debut des juridictions poussées*************************/
        var idGrp = sessionStorage.getItem("idGrp");

        $scope.addSpot = false;
        $scope.editSpot = false;
        $scope.suppSpot = false;
        $scope.addChang = false;
        $scope.editChang = false;
        $scope.suppChang = false;
        $scope.addDepot = false;
        $scope.editDepot = false;
        $scope.suppDepot = false;
        $scope.addEscom = false;
        $scope.editEscom = false;
        $scope.suppEscom = false;
        $scope.addTrans = false;
        $scope.editTrans = false;
        $scope.suppTrans = false;

        function juridictionsUserSessionEntreprise() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/juridiction_groupe/list/groupe/' + idGrp,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                // //console.log(response.data.list_juridiction_groupe);
                for (var i = 0; i < response.data.list_juridiction_groupe.length; i++) {
                    // //console.log(response.data.list_juridiction_groupe[i]);
                    switch (response.data.list_juridiction_groupe[i].juridictionId) {
                        case 22:
                            $scope.addEscom = true;
                            break;
                        case 23:
                            $scope.editEscom = true;
                            break;
                        case 24:
                            $scope.suppEscom = true;
                            break;
                        case 25:
                            $scope.addChang = true;
                            break;
                        case 26:
                            $scope.editChang = true;
                            break;
                        case 27:
                            $scope.suppChang = true;
                            break;
                        case 28:
                            $scope.addDepot = true;
                            break;
                        case 29:
                            $scope.editDepot = true;
                            break;
                        case 30:
                            $scope.suppDepot = true;
                            break;
                        case 31:
                            $scope.addTrans = true;
                            break;
                        case 32:
                            $scope.editTrans = true;
                            break;
                        case 33:
                            $scope.suppTrans = true;
                            break;
                        case 34:
                            $scope.addSpot = true;
                            break;
                        case 35:
                            $scope.editSpot = true;
                            break;
                        case 36:
                            $scope.suppSpot = true;
                            break;
                    }

                };
                ////console.log($scope.idJuridiction);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        juridictionsUserSessionEntreprise();
        /********************Fin des juridictions poussées************************/
        $scope.$watch('addSpot', function(l1, l2) {
            $scope.addSpot = $scope.addSpot;
            $scope.editSpot = $scope.editSpot;
            $scope.suppSpot = $scope.suppSpot;
            $scope.addChang = $scope.addChang;
            $scope.editChang = $scope.editChang;
            $scope.suppChang = $scope.suppChang;
            $scope.addDepot = $scope.addDepot;
            $scope.editDepot = $scope.editDepot;
            $scope.suppDepot = $scope.suppDepot;
            $scope.addEscom = $scope.addEscom;
            $scope.editEscom = $scope.editEscom;
            $scope.suppEscom = $scope.suppEscom;
            $scope.addTrans = $scope.addTrans;
            $scope.editTrans = $scope.editTrans;
            $scope.suppTrans = $scope.suppTrans;
        });
    }
]);

app.controller('popUpadminEn', ['$scope', '$rootScope', '$timeout', '$state', '$filter', '$uibModal', '$uibModalInstance', '$http', 'devises', 'infRequest', 'idPr', 'listBkByLocs', 'listDocs', 'listPr', 'menu', 'bool', 'bdetail', 'isOffer', 'isOffertrue', 'validation_Offer', 'deconnectApi',
    function($scope, $rootScope, $timeout, $state, $filter, $modal, $modalInstance, $http, devises, infRequest, idPr, listBkByLocs, listDocs, listPr, menu, bool, bdetail, isOffer, isOffertrue, validation_Offer, deconnectApi) {
        var idUser_ = sessionStorage.getItem('iduser');
        // //console.log("1 devises ",devises); 
        // //console.log("2 infRequest ",infRequest); 
        // //console.log("3 idPr ",idPr); 
        // //console.log("4 listBkByLocs ",listBkByLocs); 
        // //console.log("5 listDocs ",listDocs);
        // //console.log("6 listPr ",listPr); 
        // //console.log("7 menu ",menu); 
        // //console.log("8 bool ",bool); 
        // //console.log("9 bdetail ",bdetail); 
        // //console.log("10 isOffer ",isOffer); 
        // //console.log("11 isOffertrue ",isOffertrue); 
        // //console.log("12 validation_Offer ",validation_Offer);
        $scope.isOperation = bool;
        $scope.listBksByLoc = listBkByLocs;
        //console.log("$scope.listBksByLoc ",listBkByLocs);
        $scope.listPrduits = listPr;
        $scope.listDocuments = listDocs;
        // console.log("isOffer ",isOffer);
        $scope.listOffres = isOffer;
        $scope.offerColor = '';
        $scope.back = '';
        $scope.listDevises = [];
        // $scope.listDevisesSDE=[];
        // $scope.listDevisesTr=[];
        // $scope.listDevisesCh=[];
        //console.log("DEVISEsssssss ",devises);
        // //console.log("$scope.idPro ",$scope.idPro);
        $scope.idPro = idPr;
        //console.log("List offer by reqLen ",$scope.listOffres);
        $scope.infoDemande = infRequest;
        //console.log("INFOS DEMANDE ",$scope.infoDemande);
        $scope.subMenu = '' + menu;
        $scope.transfert = 0;
        $scope.depaterm = 0;
        $scope.escompte = 0;
        $scope.idDetail = bdetail;
        // //console.log("$scope.idDetail ",$scope.idDetail);
        // //console.log("$scope.isOperation ",$scope.isOperation);
        $scope.isUpload = true;
        $scope.isToute = true;
        $scope.isEnchersm = false;
        $scope.isEnchersa = true;
        $scope.selection = [];
        $scope.selectionbk = [];
        var tabDocs = [];
        $scope.message = '';
        $scope.isSuccess = false;
        $scope.isOfferNull = false;
        $scope.isOfferTrue = isOffertrue;
        $scope.infoOffre = null;
        $scope.offreWin = false;
        $scope.loading = false;
        $scope.erreurReady = false;
        var statut = '';
        var message = '';
        $scope.validationOffer = validation_Offer;
        // //console.log("1 $scope.validationOffer ",validation_Offer);
        $scope.chexBoxAllow = false;
        var configs = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jeton')
            }
        };

        if ($scope.$root && !$scope.$root.$$phase) {
            $scope.$apply();
        };
        if ($scope.idDetail && $scope.isOperation == null || !$scope.idDetail && $scope.isOperation == null) {
            $scope.chexBoxAllow = true;
        };
        if (isOffer.length != 0) {
            $scope.isOfferNull = true;
        } else {
            $scope.isOfferNull = false;
        };

        $timeout(function() {
            $scope.erreurReady = true;
        }, 6000);
        $scope.$watch('erreurReady', function(l1, l2) {
            $scope.erreurReady = $scope.erreurReady;
        });

        //DEVISE BY PRODUCT
        var idDevis = [];
        // var nc_nc=0;
        for (var i = 0; i < devises.length; i++) {
            if (menu.indexOf("SPOT") != -1 || menu.indexOf("ESCOMPTE") != -1 || menu.indexOf("TERME") != -1) {
                if (devises[i].description === 'XOF' || devises[i].description === 'Xof' || devises[i].description === 'xof') {
                    $scope.listDevises.push(devises[i]);
                    idDevis.push(devises[i].description);
                };
            };
            if (menu.indexOf("TRANSFERT") != -1) {
                if (devises[i].description === 'EUR' || devises[i].description === 'Eur' || devises[i].description === 'eur') {
                    $scope.listDevises.push(devises[i]);
                    idDevis.push(devises[i].description);
                };
            };
            // if(menu.indexOf("ESCOMPTE")!=-1){
            // if(devises[i].description==='XOF'){
            // $scope.listDevises.push(devises[i]);
            // idDevis.push(devises[i].description);
            // };
            // };
            // if(menu.indexOf("TERME")!=-1){
            // if(devises[i].description==='XOF'){
            // $scope.listDevises.push(devises[i]);
            // idDevis.push(devises[i].description);
            // };
            // };
            if (menu.indexOf("SPOT") == -1 && menu.indexOf("TRANSFERT") == -1 && menu.indexOf("ESCOMPTE") == -1 && menu.indexOf("TERME") == -1) {
                if (devises[i].description != 'XOF' && devises[i].description != 'Xof' && devises[i].description != 'xof') {
                    $scope.listDevises.push(devises[i]);
                    idDevis.push(devises[i].description);
                };
            };
        };
        // FIN DEVISE BY PRODUCT
        /*Function GLOBAL ADD DEMANDE PRODUIT*/
        function addenTProduitDemande(idUserIn, object) {
            // //console.log("OBJECT_ADD ",object);
            $http({
                method: "POST",
                url: baseUrl + 'mes_operations/entreprise/request/add/' + idUserIn,
                data: object,
                headers: configs.headers
            }).then(function(response) {
                statut = response.data.status;
                message = response.data.message;
                if (response.data.status == 0) {
                    $modalInstance.close();
                    //console.log("Insertion success demande ",response);
                } else {
                    $rootScope.$broadcast('message_err', { statut: statut, message: message });
                };
                //console.log("Insertion success demande2 ",response);
                $state.reload();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        /*FIN Function GLOBAL ADD DEMANDE PRODUIT*/
        /*Function GLOBAL VALIDATION*/
        function validationsUser(objectReq) {
            //console.log("objectReq ",objectReq);
            $http({
                method: "POST",
                url: baseUrl + 'validation_request/add/' + idUser_,
                data: objectReq,
                headers: configs.headers
            }).then(function(response) {
                statut = response.data.status;
                message = response.data.message;
                if (response.data.status == 0) {
                    $modalInstance.close();
                    //console.log("Validation success ",response);
                } else {
                    $rootScope.$broadcast('message_err', { statut: statut, message: message });
                };
                //console.log("Validation success2 ",response);
                $state.reload();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        /*FIN Function GLOBAL  VALIDATION*/
        /*FUNCTION GLOBAL UPDATE D'UNE DEMANDE PAR PRODUIT*/
        function updateEnProduitDemande(idReq, idUser, object) {
            $http({
                method: "PUT",
                url: baseUrl + 'mes_operations/entreprise/request/update/' + idReq + '/' + idUser,
                data: object,
                headers: configs.headers
            }).then(function(response) {
                statut = response.data.status;
                message = response.data.message;
                if (response.data.status == 0) {
                    $modalInstance.close();
                    //console.log("Demande update success. ",response);
                    $rootScope.$broadcast('message_err_affich', { statut: statut, message: message });
                } else {
                    $rootScope.$broadcast('message_err', { statut: statut, message: message });
                };
                //console.log("Demande update success2. ",response);
                $state.reload();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        /*FIN FUNCTION GLOBAL UPDATE D'UNE DEMANDE PAR PRODUIT*/
        /***************************POP UP OFFRE**************************/
        function popUpoffre(menu_start, offre_start, info_req_start) {
            $modalInstance.close();
            if (info_req_start != undefined) {
                var modalInstance = $modal.open({
                    templateUrl: 'partials/admin_entreprise/mes_operations/offre.html',
                    controller: 'popUpadminEnOffer',
                    resolve: {
                        menu_start: function() {
                            return menu_start;
                        },
                        offre_start: function() {
                            return offre_start;
                        },
                        info_req_start: function() {
                            return info_req_start;
                        },
                        etat_offer: function() {
                            return $scope.offreWin;
                        },
                        etat_validationOffer: function() {
                            return $scope.validationOffer;
                        }
                    }
                });
            };

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.visualOffer = function(a) {
            $scope.infoOffre = a;
            popUpoffre(menu, a, $scope.infoDemande);
        };
        /***************************FIN POP UP OFFRE**************************/
        if (isOffer != null) {
            for (var i = 0; i < isOffer.length; i++) {
                // $scope.infoDemande.request.etat==4
                // $scope.infoDemande.request.etat==3 
                // $scope.infoDemande.request.etat==5
                // //console.log("ccc ",$scope.infoDemande);
                if ($scope.infoDemande != null && $scope.infoDemande != undefined && $scope.infoDemande != '') {
                    if (isOffer[i].offer.etat == 2 || isOffer[i].offer.etat == 3 || $scope.infoDemande.request.etat == 4 || $scope.infoDemande.request.etat == 5) {
                        $scope.offreWin = true;
                    };
                };
            };
        };
        /**********************SENDING OFFER******************************/
        $scope.offreSelected_ = function() {
            $http({
                method: "POST",
                url: baseUrl + 'mes_operations/entreprise/request/select_offer/' + idUser_ + '/' + $scope.infoDemande.request.idDemande + '/' + $scope.infoOffre.offer.idOffre,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function(response) {
                //console.log("Offre sélectionné avec success ",response);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        $scope.$on('offreclose', function(events, args) {
            //console.log("Hé vous avez sélectionné une offre.");
        });
        /**********************FIN SENDING OFFER******************************/
        $scope.$watch('listBksByLoc', function(l1, l2) {
            if (l1 != null && l1 != undefined && l1 != '') {
                $scope.listBksByLoc = listBkByLocs;
                $scope.listDocuments = listDocs;
                // toutesOrNo($scope.isToute);
            };
        });

        $scope.toutes = [{
                "id": 1,
                "reponse": "Oui"
            },
            {
                "id": 2,
                "reponse": "Non"
            }
        ];

        $scope.enchersm = [{
                "id": 3,
                "reponse": "Oui"
            },
            {
                "id": 4,
                "reponse": "Non"
            }
        ];

        $scope.enchersa = [{
                "id": 5,
                "reponse": "Oui"
            },
            {
                "id": 6,
                "reponse": "Non"
            }
        ];

        $scope.docus = [{
                "id": 7,
                "reponse": "Oui"
            },
            {
                "id": 8,
                "reponse": "Non"
            }
        ];

        $scope.sensop = [{
                "id": 9,
                "reponse": "Achat"
            },
            {
                "id": 10,
                "reponse": "Vente"
            }
        ];

        $scope.typechange = [{
                "id": 11,
                "reponse": "Au comptant"
            },
            {
                "id": 12,
                "reponse": "Forward"
            },
            {
                "id": 13,
                "reponse": "Flexiterm"
            }
        ];

        $scope.typecotation = [{
                "id": 14,
                "reponse": "Cours"
            },
            {
                "id": 15,
                "reponse": "Marge"
            }
        ];

        $scope.typeTaux = [{
                "id": 17,
                "reponse": "Fixe"
            },
            {
                "id": 16,
                "reponse": "Progressif"
            }
        ];

        $scope.refcours = [{
                "id": 18,
                "reponse": ""
            },
            {
                "id": 19,
                "reponse": "Reuters"
            },
            {
                "id": 20,
                "reponse": "fixing BCE"
            },
            {
                "id": 21,
                "reponse": "fixing BCEAO"
            }
        ];

        /*CHAMPS FORMULAIRES*/
        $scope.montant = 0;
        $scope.date_valeur = null;
        $scope.date_valeur2 = null;
        $scope.devise = 'XOF';
        $scope.date_echeance = null;
        $scope.date_negociation = null;
        $scope.toute_ = true;
        $scope.date_debut = null;
        $scope.banque_ = '';
        $scope.date_fin = null;
        $scope.encherem_ = false;
        $scope.encherea_ = true;
        $scope.docs = false;
        $scope.doc_attach = null;
        $scope.taux_max = 0;
        $scope.isErrorCourMax = false;
        $scope.isErrorCourMin = false;
        $scope.isSensop = '';
        $scope.isTypeCh = '';
        $scope.isTypeCotation = '';
        $scope.isCourMax = 0;
        $scope.isCourMin = 0;
        $scope.isTypeTaux = null;
        $scope.isrefCourse = null;
        $scope.isStateExpired = false;
        $scope.date_maturite = null;
        $scope.isTypeChTrue = false;
        $scope.isTypeCotationTrue = false;
        $scope.tireesc = '';
        $scope.tireuresc = '';
        $scope.dureeesc = '';
        $scope.nbduree_esc = '';
        var str = '';
        var str_val = '';
        var str_deb = '';
        var str_fin = '';
        var str_ech = '';
        var str_mat = '';
        var str_neg = '';
        var nb = 0;
        var nb1 = 0;
        var nb2 = 0;
        var nb3 = 0;
        var nb4 = 0;
        var nb5 = 0;
        var nb6 = 0;
        var nb7 = 0;
        var nb8 = 0;
        var nb9 = 0;
        var nb10 = 0;
        var nb11 = 0;

        /*CHAMPS FORMULAIRES*/
        function formatDate(a) {
            var mois = a.getMonth() + 1;
            var jour = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var seco = a.getSeconds();
            var mseco = a.getMilliseconds();
            if (mois < 10) {
                mois = '0' + mois;
            };
            if (jour < 10) {
                jour = '0' + jour;
            };
            if (hour < 10) {
                hour = '0' + hour
            };
            if (min < 10) {
                min = '0' + min;
            };
            if (seco < 10) {
                seco = '0' + seco;
            };
            if (mseco < 10) {
                mseco = '0' + mseco;
            }
            str = a.getFullYear() + '-' + mois + '-' + jour + 'T' + hour + ':' + min + ':' + seco + '.' + mseco + 'Z';
            str_val = a.getFullYear() + '-' + mois + '-' + jour + 'T' + hour + ':' + min + ':' + seco + '.' + mseco + 'Z';
            str_deb = a.getFullYear() + '-' + mois + '-' + jour + 'T' + hour + ':' + min + ':' + seco + '.' + mseco + 'Z';
            str_fin = a.getFullYear() + '-' + mois + '-' + jour + 'T' + hour + ':' + min + ':' + seco + '.' + mseco + 'Z';

            str_ech = a.getFullYear() + '-' + mois + '-' + jour + 'T' + hour + ':' + min + ':' + seco + '.' + mseco + 'Z';
            str_mat = a.getFullYear() + '-' + mois + '-' + jour + 'T' + hour + ':' + min + ':' + seco + '.' + mseco + 'Z';
            str_neg = a.getFullYear() + '-' + mois + '-' + jour + 'T' + hour + ':' + min + ':' + seco + '.' + mseco + 'Z';

        };

        $scope.changeMontant = function(data) {
            $scope.montant = data;
            $scope.isErrorNumb = false;
            if (data < 0 || data == 0 || data == undefined)
                $scope.isErrorNumb = true;
        };
        $scope.changeNbDuree = function(data) {
            $scope.nbduree_esc = data;
            $scope.isErrorNb_duree = false;
            if (data < 1 || data == undefined)
                $scope.isErrorNb_duree = true;
        };
        // var today = new Date();
        // $scope.aujourdhui=today;
        // $scope.$watch("aujourdhui",function( newValue, oldValue ) {
        // $scope.aujourdhui=$scope.audjourdhui_.getTime();
        // });
        $scope.audjourdhui_ = new Date();
        $scope.aujourdhui = $scope.audjourdhui_;
        $scope.aujourdhuiSup2 = new Date($scope.audjourdhui_.getFullYear(), $scope.audjourdhui_.getMonth(), $scope.audjourdhui_.getDate() + 2);
        $scope.aujourdhuiSup2_ = new Date(new Date($scope.aujourdhuiSup2));
        $scope.changeDate_valeur = function(a) {
            // //console.log("Date Vvv ",a);
            $scope.audjourdhui_ = new Date();
            $scope.aujourdhui = $scope.audjourdhui_;
            $scope.aujourdhuiSup2 = new Date($scope.audjourdhui_.getFullYear(), $scope.audjourdhui_.getMonth(), $scope.audjourdhui_.getDate() + 2);
            $scope.aujourdhuiSup2_ = new Date(new Date($scope.aujourdhuiSup2));
            // $scope.aujourdhuit=$scope.audjourdhui_.getTime();
            // //console.log("**********************************************************");
            // //console.log("Aujr Normal ",$scope.audjourdhui_);
            // //console.log("Datevaleur Normal ",a);
            // //console.log("$scope.aujourdhuiSup3 ",$scope.aujourdhuiSup2_);
            // //console.log("Aujr getTime ",$scope.aujourdhuit);
            // //console.log("Datevaleur getTime ",a.getTime());
            // //console.log("Diff Aujr-Datevaleur Normal ",($scope.audjourdhui_-a));
            // //console.log("Diff2 Aujr-Datevaleur getTime ",($scope.aujourdhuit-a.getTime()));
            // //console.log("**********************************************************");
            if (a != null && a != undefined) {
                $scope.date_valeur2 = a;
                formatDate(a);
                $scope.date_valeur = str;
            };
        };
        $scope.changeDevise = function(a) {
            // //console.log("$scope.changeDeviseDDDD ",a);
            if (idDevis.indexOf(a) != -1) {
                $scope.devise = $scope.listDevises[idDevis.indexOf(a)];
            };
            // $scope.devise=a;
        };
        $scope.changeDate_echeance = function(a) {
            if (a != null && a != undefined) {
                formatDate(a);
                $scope.date_echeance = str;
            };
        };
        $scope.changeDate_negociation = function(a) {
            if (a != null && a != undefined) {
                formatDate(a);
                $scope.date_negociation = str;
            };
        };
        $scope.choixToutes = function(a) {
            nb = 0;
            for (var i = 0; i < $scope.toutes.length; i++) {
                if ($scope.toutes[i].id == parseInt(a) && $scope.toutes[i].reponse === 'Oui') {
                    nb++;
                    break;
                }
            };

            if (menu.split("-")[0] == 'ADD') {
                $scope.selectionbk = [];
                toutesOrNo(true);
            };
            if (nb != 0) {
                // $scope.selectionbk=[];
                $scope.isToute = true;
                $scope.toute_ = true;
            } else {
                $scope.isToute = false;
                $scope.toute_ = false;
            }
            nb = 0;
        };
        $scope.choixSensOp = function(a) {
            nb1 = 0;
            for (var i = 0; i < $scope.sensop.length; i++) {
                if ($scope.sensop[i].id == parseInt(a) && $scope.sensop[i].reponse === 'Achat') {
                    nb1++;
                    break;
                }
            };
            if (nb1 != 0) {
                $scope.isSensop = 'Achat';
                // //console.log("Achat");
                $scope.isSensopTrue = true;
            } else {
                $scope.isSensop = 'Vente';
                // //console.log("Vente");
                $scope.isSensopTrue = false;
            }
            nb1 = 0;
        };
        $scope.choixTypeCh = function(a) {
            // //console.log("choixTypeCh ",a);
            nb2 = 0;
            nb3 = 0;
            for (var i = 0; i < $scope.typechange.length; i++) {
                if ($scope.typechange[i].id == parseInt(a) && $scope.typechange[i].reponse === 'Au comptant') {
                    nb2++;
                    break;
                }
                if ($scope.typechange[i].id == parseInt(a) && $scope.typechange[i].reponse === 'Forward') {
                    nb3++;
                    break;
                }
            };
            if (nb2 != 0) {
                $scope.isTypeCh = 'Au comptant';
                // //console.log("choixTypeCh2 ");
                $scope.isTypeChTrue = true;
            } else if (nb2 == 0 && nb3 != 0) {
                $scope.isTypeCh = 'Forward';
                $scope.isTypeChTrue = false;
            } else {
                $scope.isTypeCh = 'Flexiterm';
                $scope.isTypeChTrue = false;
            }
            nb2 = 0;
            nb3 = 0
        };
        $scope.choixTypeCotation = function(a) {
            nb4 = 0;
            for (var i = 0; i < $scope.typecotation.length; i++) {
                if ($scope.typecotation[i].id == parseInt(a) && $scope.typecotation[i].reponse === 'Cours') {
                    nb4++;
                    break;
                }
            };
            if (nb4 != 0) {
                $scope.isTypeCotation = 'Cours';
                $scope.isTypeCotationTrue = true;
                // //console.log("Cours OK");
            } else {
                $scope.isTypeCotation = 'Marge';
                $scope.isTypeCotationTrue = false;
            }
            nb4 = 0;
        };
        $scope.choixTypeTaux = function(a) {
            nb5 = 0;
            for (var i = 0; i < $scope.typeTaux.length; i++) {
                if ($scope.typeTaux[i].id == parseInt(a) && $scope.typeTaux[i].reponse === 'Fixe') {
                    nb5++;
                    break;
                }
            };
            if (nb5 != 0) {
                $scope.isTypeTaux = 'Fixe';
            } else {
                $scope.isTypeTaux = 'Progressif';
            }
            nb5 = 0;
        };
        $scope.changeDate_debut = function(a) {
            if (a != null && a != undefined) {
                formatDate(a);
                $scope.date_debut = str;
            };
        };
        $scope.changeDate_maturite = function(a) {
            if (a != null && a != undefined) {
                formatDate(a);
                $scope.date_maturite = str;
            };
        };
        $scope.changeBanque_ = function(a) {
            $scope.banque_ = a;
        };
        $scope.changeDate_fin = function(a) {
            // //console.log("changeDate_fin ",a);
            if (a != null && a != undefined) {
                formatDate(a);
                $scope.date_fin = str;
            };
        };
        $scope.choixEnchersm = function(a) {
            nb6 = 0;
            for (var i = 0; i < $scope.enchersm.length; i++) {
                if ($scope.enchersm[i].id == parseInt(a) && $scope.enchersm[i].reponse === 'Oui') {
                    nb6++;
                    break;
                }
            };
            if (nb6 != 0) {
                $scope.isEnchersm = true;
                $scope.encherem_ = true;
            } else {
                $scope.isEnchersm = false;
                $scope.encherem_ = false;
            }
            nb6 = 0;
        };
        $scope.choixEnchersa = function(a) {
            nb7 = 0;
            for (var i = 0; i < $scope.enchersa.length; i++) {
                if ($scope.enchersa[i].id == parseInt(a) && $scope.enchersa[i].reponse === 'Oui') {
                    nb7++;
                    break;
                }
            };
            if (nb7 != 0) {
                $scope.isEnchersa = true;
                $scope.encherea_ = true;
            } else {
                $scope.isEnchersa = false;
                $scope.encherea_ = false;
            }
            nb7 = 0;
        };
        $scope.ifDocUp = function(a) {
            nb8 = 0;
            for (var i = 0; i < $scope.docus.length; i++) {
                if ($scope.docus[i].id == parseInt(a) && $scope.docus[i].reponse === 'Oui') {
                    nb8++;
                    break;
                }
            };
            if (nb8 != 0) {
                $scope.isUpload = true;
                $scope.docs = true;
            } else {
                $scope.isUpload = false;
                $scope.docs = false;
            }
            nb8 = 0;
        };

        $scope.changeDoc_attach = function(a) {
            // tabDocs.push(parseInt(a));
            var idx = $scope.selection.indexOf(a);
            if (idx > -1) {
                $scope.selection.splice(idx, 1);
            } else {
                $scope.selection.push(parseInt(a));
            }
            $scope.doc_attach = a;
        };

        $scope.changeBkAttach = function(a) {
            // //console.log("changeBkAttach ",a);
            var idx = $scope.selectionbk.indexOf(a);
            if (idx > -1) {
                $scope.selectionbk.splice(idx, 1);
            } else {
                $scope.selectionbk.push(parseInt(a));
            }
            // //console.log("Sélection BKs ",$scope.selectionbk.length);
        };
        $scope.changeTaux = function(data) {
            // console.log("Spot taux maxA ",data);
            $scope.isErrorTaux = false;
            $scope.taux_max = data;
            if (data < 0 || data == undefined)
            // //console.log("Spot taux maxB ",data<0);
                $scope.isErrortaux = true;
            // $scope.taux_max=0;
        };
        $scope.$watch('isErrorTaux', function(l1, l2) {
            $scope.isErrortaux = $scope.isErrortaux;
        });
        $scope.showErrorCourMax = function(data) {
            $scope.isErrorCourMax = false;
            $scope.isCourMax = data;
            if (data < 0 || data == undefined)
                $scope.isErrorCourMax = true;
            // $scope.isCourMax=0;
        };
        $scope.$watch('isErrorCourMax', function(l1, l2) {
            $scope.isErrorCourMax = $scope.isErrorCourMax;
        });
        $scope.showErrorCourMin = function(data) {
            $scope.isErrorCourMin = false;
            $scope.isCourMin = data;
            if (data < 0 || data == undefined)
                $scope.isErrorCourMin = true;
            // $scope.isCourMin=0;
        };
        $scope.$watch('isErrorCourMin', function(l1, l2) {
            $scope.isErrorCourMin = $scope.isErrorCourMin;
        });
        $scope.changeRefcourse = function(a) {
            // $scope.isrefCourse=a;
            // //console.log("Ref cours_ ",a);
            nb9 = 0;
            nb10 = 0;
            nb11 = 0;
            for (var i = 0; i < $scope.refcours.length; i++) {
                if ($scope.refcours[i].id == parseInt(a) && $scope.refcours[i].reponse === 'Reuters') {
                    nb9++;
                    break;
                };
                if ($scope.refcours[i].id == parseInt(a) && $scope.refcours[i].reponse === 'fixing BCE') {
                    nb10++;
                    break;
                };
                if ($scope.refcours[i].id == parseInt(a) && $scope.refcours[i].reponse === 'fixing BCEAO') {
                    nb11++;
                    break;
                }
            };
            if (nb9 != 0 && nb10 == 0 && nb11 == 0) {
                // //console.log("Reuters");
                $scope.isrefCourse = 'Reuters';
            } else if (nb9 == 0 && nb11 == 0 && nb10 != 0) {
                // //console.log("fixing BCE");
                $scope.isrefCourse = 'fixing BCE';
            } else if (nb9 == 0 && nb10 == 0 && nb11 != 0) {
                // //console.log("fixing BCEAO");
                $scope.isrefCourse = 'fixing BCEAO';
            } else {
                $scope.isrefCourse = '';
            };
            nb9 = 0;
            nb10 = 0;
            nb11 = 0;
        };
        $scope.changeTireEsc = function(a) {
            // //console.log("1 ",a);
            $scope.tireesc = a;
        };
        $scope.changeTireurEsc = function(a) {
            // //console.log("2 ",a);
            $scope.tireuresc = a;
        };
        $scope.changeDureeEsc = function(a) {
            $scope.dureeesc = a;
        };
        /*FIN CHAMPS FORMULAIRES*/

        //INIATIALISATION MODEL
        $scope.today = function() {
            var dateToday = new Date();

            // $scope.montant_cr=0;
            // $scope.montant_ch=0;
            // $scope.montant_tr=0;
            // $scope.montant_dep=0;

            $scope.devise_cr = 'XOF';
            $scope.devise_etrangere_ch = 'EUR';
            $scope.devise_tr = 'EUR';
            $scope.devise_dep = 'XOF';
            $scope.devise_esc = 'XOF';

            $scope.taux_max_cr = 0;
            $scope.taux_max_tr = 0;
            $scope.taux_max_dep = 0;
            $scope.cours_min_ch = 0;
            $scope.cours_max_ch = 0;
            $scope.taux_max_esc = 0;

            $scope.tire_esc = '';
            $scope.tireur_esc = '';
            $scope.duree_esc = '';

            $scope.date_valeur_cr = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate());
            // //console.log("dateToday.getMonth() ",dateToday.getMonth());
            // $scope.date_echeance_cr=dateToday;
            // $scope.date_debut_cr=dateToday;
            // $scope.date_fin_cr=dateToday;

            $scope.date_valeur_ch = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate());
            // $scope.date_debut_ch=dateToday;
            // $scope.date_fin_ch=dateToday;
            // $scope.date_negociation_ch=dateToday;

            $scope.date_valeur_tr = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate());
            // $scope.date_debut_tr=dateToday;
            // $scope.date_fin_tr=dateToday;


            $scope.date_valeur_dep = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate());
            // $scope.date_maturite_dep=dateToday;
            // $scope.date_debut_dep=dateToday;
            // $scope.date_fin_dep=dateToday;

            $scope.date_escompte_esc = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate());
            // $scope.date_echeance_esc=dateToday;
            // $scope.date_debut_esc=dateToday;
            // $scope.date_fin_esc=dateToday;

            //CHANGEMENT SUIVI
            // $scope.changeMontant($scope.montant_cr);
            // $scope.changeMontant($scope.montant_ch);
            // $scope.changeMontant($scope.montant_tr);
            // $scope.changeMontant($scope.montant_dep);
            if (menu.indexOf("SPOT") != -1) {
                $scope.changeDevise($scope.devise_cr);
                $scope.changeTaux($scope.taux_max_cr);
            } else if (menu.indexOf("CHANGE") != -1) {
                $scope.changeDevise($scope.devise_etrangere_ch);
            } else if (menu.indexOf("TRANSFERT") != -1) {
                $scope.changeDevise($scope.devise_tr);
                $scope.changeTaux($scope.taux_max_tr);
            } else if (menu.indexOf("TERME") != -1) {
                $scope.changeDevise($scope.devise_dep);
                $scope.changeTaux($scope.taux_max_dep);
            } else if (menu.indexOf("ESCOMPTE") != -1) {
                $scope.changeDevise($scope.devise_esc);
                $scope.changeTaux($scope.taux_max_esc);
            };

            // $scope.changeDevise($scope.devise_cr);
            // $scope.changeDevise($scope.devise_etrangere_ch);
            // $scope.changeDevise($scope.devise_tr);
            // $scope.changeDevise($scope.devise_dep);
            // $scope.changeDevise($scope.devise_esc);

            // $scope.changeTaux($scope.taux_max_cr);
            // $scope.changeTaux($scope.taux_max_tr);
            // $scope.changeTaux($scope.taux_max_dep);
            // $scope.changeTaux($scope.taux_max_esc);

            $scope.showErrorCourMax($scope.cours_max_ch);
            $scope.showErrorCourMin($scope.cours_min_ch);

            $scope.changeDate_valeur(new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate()));
            // $scope.changeDate_echeance(dateToday);
            // $scope.changeDate_maturite(dateToday);
            // $scope.changeDate_debut(dateToday);
            // $scope.changeDate_fin(dateToday);
            // $scope.changeDate_negociation(dateToday);
            // $scope.changeDate_negociation(dateToday);

            $scope.changeTireEsc($scope.tire_esc);
            $scope.changeTireurEsc($scope.tireur_esc);
            $scope.changeDureeEsc($scope.duree_esc);
            //FIN CHANGEMENT SUIVI
        };
        $scope.today();
        //FIN INIATIALISATION MODEL

        //TOUES LES BANQUES DU USER
        function toutesOrNo(bool) {
            if (bool) {
                $scope.selectionbk = [];
                if ($scope.listBksByLoc != null) {
                    if ($scope.listBksByLoc.length != 0) {
                        for (var i = 0; i < $scope.listBksByLoc.length; i++) {
                            $scope.selectionbk.push(parseInt($scope.listBksByLoc[i].idInstitution));
                        };
                    };
                };
            };
        };

        function toutesDocs(bool) {
            if (bool) {
                $scope.selection = [];
                if ($scope.listDocuments != null) {
                    if ($scope.listDocuments.length != 0) {
                        for (var i = 0; i < $scope.listDocuments.length; i++) {
                            $scope.selection.push(parseInt($scope.listDocuments[i].idDocuments));
                        };
                    };
                };
            };
        };
        //FIN TOUES LES BANQUES DU USER
        switch (menu) {
            case 'ADD-CR-SPOT':
                $scope.addenToPcRsPot = function() {
                    $scope.loading = true;
                    // var docNotNull=$scope.isUpload;
                    var objet = {
                        "request": {
                            "dateValeur": "" + $scope.date_valeur,
                            "montant": "" + $scope.montant,
                            "devise": $scope.devise,
                            "dateDebutDemande": "" + $scope.date_debut,
                            "dateFinDemande": "" + $scope.date_fin,
                            "isEnchereAnonyme": $scope.encherea_,
                            "isEnchereMultiple": $scope.encherem_,
                            "dateEcheance": "" + $scope.date_echeance,
                            "tauxMax": "" + $scope.taux_max,
                            "nombreDocument": $scope.selection.length,
                            "product": $scope.idPro
                        },

                        "documents": $scope.selection,
                        "idsBank": $scope.selectionbk
                    };

                    // //console.log("$scope.taux_max ",$scope.taux_max);
                    addenTProduitDemande(idUser_, objet);
                    $rootScope.$broadcast('adminEnOp', { objet: objet });
                };
                break;
            case 'ADD-CHANGE':
                $scope.addenToPcH = function() {
                    $scope.loading = true;
                    // var docNotNull=$scope.isUpload;
                    var objet = {
                        "request": {
                            "dateValeur": "" + $scope.date_valeur,
                            "montant": "" + $scope.montant,
                            "devise": $scope.devise,
                            "dateDebutDemande": "" + $scope.date_debut,
                            "dateFinDemande": "" + $scope.date_fin,
                            "isEnchereAnonyme": $scope.encherea_,
                            "isEnchereMultiple": $scope.encherem_,
                            "dateNegociation": "" + $scope.date_negociation,
                            "typeCotation": "" + $scope.isTypeCotation,
                            "typeChange": "" + $scope.isTypeCh,
                            "coursMax": "" + $scope.isCourMax,
                            "coursMin": "" + $scope.isCourMin,
                            "sens": "" + $scope.isSensop,
                            "nombreDocument": $scope.selection.length,
                            "refCours": "" + $scope.isrefCourse,
                            "product": $scope.idPro
                        },
                        "documents": $scope.selection,
                        "idsBank": $scope.selectionbk
                    };
                    addenTProduitDemande(idUser_, objet);
                    $rootScope.$broadcast('adminEnOp', { objet: objet });
                };
                break;
            case 'ADD-TRANSFERT':
                $scope.addenToPtR = function() {
                    $scope.loading = true;
                    // var docNotNull=$scope.isUpload;
                    var objet = {
                        "request": {
                            "montant": "" + $scope.montant,
                            "dateValeur": "" + $scope.date_valeur,
                            "devise": $scope.devise,
                            "sens": "" + $scope.isSensop,
                            "dateDebutDemande": "" + $scope.date_debut,
                            "dateFinDemande": "" + $scope.date_fin,
                            "isEnchereAnonyme": $scope.encherea_,
                            "isEnchereMultiple": $scope.encherem_,
                            "tauxMax": "" + $scope.taux_max,
                            "nombreDocument": $scope.selection.length,
                            "product": $scope.idPro
                        },

                        "documents": $scope.selection,
                        "idsBank": $scope.selectionbk
                    };
                    addenTProduitDemande(idUser_, objet);
                    $rootScope.$broadcast('adminEnOp', { objet: objet });
                };
                break;
            case 'ADD-DEP-TERME':
                $scope.addenToPdeP = function() {
                    $scope.loading = true;
                    // var docNotNull=$scope.isUpload;
                    //console.log("$scope.idPro ",$scope.idPro);
                    var objet = {
                        "request": {
                            "montant": "" + $scope.montant,
                            "dateValeur": "" + $scope.date_valeur,
                            "devise": $scope.devise,
                            "dateMaturite": $scope.date_maturite,
                            "dateDebutDemande": "" + $scope.date_debut,
                            "dateFinDemande": "" + $scope.date_fin,
                            "isEnchereMultiple": $scope.encherem_,
                            "isEnchereAnonyme": $scope.encherea_,
                            "typeTaux": $scope.isTypeTaux,
                            "tauxMin": "" + $scope.taux_max,
                            "nombreDocument": $scope.selection.length,
                            "product": $scope.idPro
                        },

                        "documents": $scope.selection,
                        "idsBank": $scope.selectionbk
                    };
                    addenTProduitDemande(idUser_, objet);
                    $rootScope.$broadcast('adminEnOp', { objet: objet });
                };
                break;
            case 'ADD-ESCOMPTE':
                $scope.addenToPesC = function() {
                    $scope.loading = true;
                    var objet = {
                        "request": {
                            // "dateValeur": ""+$scope.date_valeur,
                            "dateEscompte": "" + $scope.date_valeur,
                            "montant": "" + $scope.montant,
                            "devise": $scope.devise,
                            "dateDebutDemande": "" + $scope.date_debut,
                            "dateFinDemande": "" + $scope.date_fin,
                            "isEnchereAnonyme": $scope.encherea_,
                            "isEnchereMultiple": $scope.encherem_,
                            "dateMaturite": $scope.date_maturite,
                            "tauxMax": "" + $scope.taux_max,
                            "tire": "" + $scope.tireesc,
                            "tireur": "" + $scope.tireuresc,
                            "duree": $scope.nbduree_esc + " " + $scope.dureeesc,
                            "nombreDocument": $scope.selection.length,
                            "product": $scope.idPro
                        },

                        "documents": $scope.selection,
                        "idsBank": $scope.selectionbk
                    };
                    // //console.log("$scope.idPro2 ",$scope.idPro);
                    //console.log("ObjetDure ",objet);
                    addenTProduitDemande(idUser_, objet);
                    $rootScope.$broadcast('adminEnOp', { objet: objet });
                };
                break;
            case 'INFO-CR-SPOT':
                // toutesOrNo($scope.isToute);
                // toutesDocs($scope.isUpload);
                // $scope.toutes=[];
                // $scope.enchersm = [];
                // $scope.enchersa = [];
                // $scope.docus = [];
                // $scope.selectionbk=[];
                // $scope.selection=[];

                if ($scope.infoDemande.idsBank != null) {
                    if ($scope.infoDemande.idsBank.length != 0) {
                        if ($scope.infoDemande.idsBank.length == $scope.listBksByLoc.length) {
                            $scope.selectionbk = [];
                            $scope.toutes = [{
                                    "id": 1,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 2,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.choixToutes(2);
                            for (var i = 0; i < $scope.infoDemande.idsBank.length; i++) {
                                // $scope.selectionbk.push($scope.infoDemande.idsBank[i].idInstitution);
                                $scope.changeBkAttach($scope.infoDemande.idsBank[i].idInstitution);
                            };
                        } else if ($scope.infoDemande.idsBank.length < $scope.listBksByLoc.length) {
                            $scope.selectionbk = [];
                            $scope.toutes = [{
                                    "id": 2,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 1,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.choixToutes(2);
                            for (var i = 0; i < $scope.infoDemande.idsBank.length; i++) {
                                // $scope.selectionbk.push($scope.infoDemande.idsBank[i].idInstitution);
                                $scope.changeBkAttach($scope.infoDemande.idsBank[i].idInstitution);
                            };
                        }
                    } else {
                        $scope.selectionbk = [];
                        $scope.toutes = [{
                                "id": 2,
                                "reponse": "Oui"
                            },
                            {
                                "id": 1,
                                "reponse": "Non"
                            }
                        ];
                    };
                } else {
                    $scope.selectionbk = [];
                    $scope.toutes = [{
                            "id": 2,
                            "reponse": "Oui"
                        },
                        {
                            "id": 1,
                            "reponse": "Non"
                        }
                    ];
                };


                if ($scope.infoDemande.documents != null) {
                    if ($scope.infoDemande.documents.length != 0) {
                        if ($scope.infoDemande.documents.length == $scope.listDocuments.length) {
                            $scope.selection = [];
                            $scope.docus = [{
                                    "id": 8,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 7,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.ifDocUp(8);
                            for (var i = 0; i < $scope.infoDemande.documents.length; i++) {
                                // $scope.selectionb.push($scope.infoDemande.documents[i].idDocuments);
                                $scope.changeDoc_attach($scope.infoDemande.documents[i].idDocuments);
                            };
                        } else if ($scope.infoDemande.documents.length < $scope.listDocuments.length) {
                            $scope.selection = [];
                            $scope.docus = [{
                                    "id": 8,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 7,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.ifDocUp(7);
                            for (var i = 0; i < $scope.infoDemande.documents.length; i++) {
                                // $scope.selectionb.push($scope.infoDemande.documents[i].idDocuments);
                                $scope.changeDoc_attach($scope.infoDemande.documents[i].idDocuments);
                            };
                        }
                    } else {
                        $scope.selection = [];
                        $scope.docus = [{
                                "id": 7,
                                "reponse": "Oui"
                            },
                            {
                                "id": 8,
                                "reponse": "Non"
                            }
                        ];
                        // $scope.ifDocUp(8);
                    };
                } else {
                    $scope.selection = [];
                    $scope.docus = [{
                            "id": 7,
                            "reponse": "Oui"
                        },
                        {
                            "id": 8,
                            "reponse": "Non"
                        }
                    ];
                    // $scope.ifDocUp(8);
                };

                if ($scope.infoDemande.request.isEnchereAnonyme) {
                    $scope.enchersa = [{
                            "id": 5,
                            "reponse": "Oui"
                        },
                        {
                            "id": 6,
                            "reponse": "Non"
                        }
                    ];
                } else if (!$scope.infoDemande.request.isEnchereAnonyme) {
                    $scope.enchersa = [{
                            "id": 6,
                            "reponse": "Oui"
                        },
                        {
                            "id": 5,
                            "reponse": "Non"
                        }
                    ];
                };
                if ($scope.infoDemande.request.isEnchereMultiple) {
                    $scope.enchersm = [{
                            "id": 4,
                            "reponse": "Oui"
                        },
                        {
                            "id": 3,
                            "reponse": "Non"
                        }
                    ];
                } else if (!$scope.infoDemande.request.isEnchereMultiple) {
                    $scope.enchersm = [{
                            "id": 3,
                            "reponse": "Oui"
                        },
                        {
                            "id": 4,
                            "reponse": "Non"
                        }
                    ];
                };
                // //console.log("1 detail ",$scope.idDetail&&$scope.isOperation==null);
                // //console.log("2 validation ",!$scope.idDetail&&$scope.isOperation==null);
                // //console.log("3 update ",!$scope.isOperation && $scope.isOperation!=null);
                if ($scope.idDetail && $scope.isOperation == null) {
                    $scope.montant_cr = parseInt($scope.infoDemande.request.montant);
                    $scope.date_valeur_cr = new Date($scope.infoDemande.request.dateValeur);
                    $scope.devise_cr = $scope.infoDemande.request.devise.description;
                    if ($scope.infoDemande.request.dateEcheance != null) {
                        $scope.date_echeance_cr = new Date($scope.infoDemande.request.dateEcheance);
                        $scope.changeDate_echeance($scope.date_echeance_cr);
                    } else if ($scope.infoDemande.request.dateEcheance == null) {
                        $scope.date_echeance = null;
                    };
                    if ($scope.infoDemande.request.dateDebutDemande != null) {
                        $scope.date_debut_cr = new Date($scope.infoDemande.request.dateDebutDemande);
                        $scope.changeDate_debut($scope.date_debut_cr);
                    } else if ($scope.infoDemande.request.dateDebutDemande == null) {
                        $scope.date_debut = null;
                    };
                    if ($scope.infoDemande.request.dateFinDemande != null) {
                        $scope.date_fin_cr = new Date($scope.infoDemande.request.dateFinDemande);
                        $scope.changeDate_fin($scope.date_fin_cr);
                    } else if ($scope.infoDemande.request.dateFinDemande == null) {
                        $scope.date_fin = null;
                    };
                    $scope.taux_max_cr = parseInt($scope.infoDemande.request.tauxMax);
                };
                if (!$scope.idDetail && $scope.isOperation == null) {
                    var valider = 'valider';
                    $scope.montant_cr = parseInt($scope.infoDemande.request.montant);
                    $scope.date_valeur_cr = new Date($scope.infoDemande.request.dateValeur);
                    $scope.devise_cr = $scope.infoDemande.request.devise.description;
                    if ($scope.infoDemande.request.dateEcheance != null) {
                        $scope.date_echeance_cr = new Date($scope.infoDemande.request.dateEcheance);
                        $scope.changeDate_echeance($scope.date_echeance_cr);
                    } else if ($scope.infoDemande.request.dateEcheance == null) {
                        $scope.date_echeance = null;
                    };
                    if ($scope.infoDemande.request.dateDebutDemande != null) {
                        $scope.date_debut_cr = new Date($scope.infoDemande.request.dateDebutDemande);
                        $scope.changeDate_debut($scope.date_debut_cr);
                    } else if ($scope.infoDemande.request.dateDebutDemande == null) {
                        $scope.date_debut = null;
                    };
                    if ($scope.infoDemande.request.dateFinDemande != null) {
                        $scope.date_fin_cr = new Date($scope.infoDemande.request.dateFinDemande);
                        $scope.changeDate_fin($scope.date_fin_cr);
                    } else if ($scope.infoDemande.request.dateFinDemande == null) {
                        $scope.date_fin = null;
                    };
                    $scope.taux_max_cr = parseInt($scope.infoDemande.request.tauxMax);
                    // //console.log("$scope.infoDemandeR ",$scope.infoDemande);
                    $scope.changeMontant($scope.montant_cr);
                    $scope.changeDate_valeur($scope.date_valeur_cr);
                    $scope.changeDevise($scope.devise_cr);
                    $scope.changeTaux($scope.taux_max_cr);

                    $scope.addenToPcRsPot = function() {
                        $scope.loading = true;
                        // //console.log("validation CR");
                        var idReq = parseInt($scope.infoDemande.request.idDemande);
                        var objet = {
                            "request": {
                                "idDemande": parseInt($scope.infoDemande.request.idDemande),
                                "dateValeur": "" + $scope.date_valeur,
                                "montant": "" + $scope.montant,
                                "devise": $scope.devise,
                                "dateDebutDemande": "" + $scope.date_debut,
                                "dateFinDemande": "" + $scope.date_fin,
                                "isEnchereAnonyme": $scope.encherea_,
                                "isEnchereMultiple": $scope.encherem_,
                                "dateEcheance": "" + $scope.date_echeance,
                                "tauxMax": "" + $scope.taux_max,
                                "nombreDocument": $scope.selection.length,
                                "product": $scope.idPro,
                                "isValid": $scope.infoDemande.request.isValid
                            },

                            "status": 1
                        };

                        validationsUser(objet);
                        $rootScope.$broadcast('adminEnV', { valider: valider, idReq: idReq, objet: objet });
                    };
                };

                if (!$scope.isOperation && $scope.isOperation != null) {
                    $scope.montant_cr = parseInt($scope.infoDemande.request.montant);
                    $scope.date_valeur_cr = new Date($scope.infoDemande.request.dateValeur);
                    $scope.devise_cr = $scope.infoDemande.request.devise.description;
                    if ($scope.infoDemande.request.dateEcheance != null) {
                        $scope.date_echeance_cr = new Date($scope.infoDemande.request.dateEcheance);
                        $scope.changeDate_echeance($scope.date_echeance_cr);
                    } else if ($scope.infoDemande.request.dateEcheance == null) {
                        $scope.date_echeance = null;
                    };
                    if ($scope.infoDemande.request.dateDebutDemande != null) {
                        $scope.date_debut_cr = new Date($scope.infoDemande.request.dateDebutDemande);
                        $scope.changeDate_debut($scope.date_debut_cr);
                    } else if ($scope.infoDemande.request.dateDebutDemande == null) {
                        $scope.date_debut = null;
                    };
                    if ($scope.infoDemande.request.dateFinDemande != null) {
                        $scope.date_fin_cr = new Date($scope.infoDemande.request.dateFinDemande);
                        $scope.changeDate_fin($scope.date_fin_cr);
                    } else if ($scope.infoDemande.request.dateFinDemande == null) {
                        $scope.date_fin = null;
                    };
                    $scope.taux_max_cr = parseInt($scope.infoDemande.request.tauxMax);

                    $scope.changeMontant($scope.montant_cr);
                    $scope.changeDate_valeur($scope.date_valeur_cr);
                    $scope.changeDevise($scope.devise_cr);
                    $scope.changeTaux($scope.taux_max_cr);

                    $scope.addenToPcRsPot = function() {
                        $scope.loading = true;
                        var idReq = parseInt($scope.infoDemande.request.idDemande);
                        var objet = {
                            "request": {
                                "idDemande": parseInt($scope.infoDemande.request.idDemande),
                                "dateValeur": "" + $scope.date_valeur,
                                "montant": "" + $scope.montant,
                                "devise": $scope.devise,
                                "dateDebutDemande": "" + $scope.date_debut,
                                "dateFinDemande": "" + $scope.date_fin,
                                "isEnchereAnonyme": $scope.encherea_,
                                "isEnchereMultiple": $scope.encherem_,
                                "dateEcheance": "" + $scope.date_echeance,
                                "tauxMax": "" + $scope.taux_max,
                                "nombreDocument": $scope.selection.length,
                                "product": $scope.idPro
                            },

                            "documents": $scope.selection,
                            "idsBank": $scope.selectionbk
                        };

                        updateEnProduitDemande(idReq, idUser_, objet);
                        $rootScope.$broadcast('adminEnOp', { idReq: idReq, objet: objet });
                    };
                }
                break;
            case 'INFO-CHANGE':
                // toutesOrNo($scope.isToute);
                // toutesDocs($scope.isUpload);
                // $scope.toutes=[];
                // $scope.enchersm = [];
                // $scope.enchersa = [];
                // $scope.docus = [];
                // $scope.selectionbk=[];
                // $scope.selection=[];
                // $scope.sensop = [];
                // $scope.typechange = [];
                // $scope.typecotation = [];
                if ($scope.infoDemande.idsBank != null) {
                    if ($scope.infoDemande.idsBank.length != 0) {
                        if ($scope.infoDemande.idsBank.length == $scope.listBksByLoc.length) {
                            $scope.selectionbk = [];
                            $scope.toutes = [{
                                    "id": 1,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 2,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.choixToutes(2);
                            for (var i = 0; i < $scope.infoDemande.idsBank.length; i++) {
                                // $scope.selectionbk.push($scope.infoDemande.idsBank[i].idInstitution);
                                $scope.changeBkAttach($scope.infoDemande.idsBank[i].idInstitution);
                            };
                        } else if ($scope.infoDemande.idsBank.length < $scope.listBksByLoc.length) {
                            $scope.selectionbk = [];
                            $scope.toutes = [{
                                    "id": 2,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 1,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.choixToutes(2);
                            for (var i = 0; i < $scope.infoDemande.idsBank.length; i++) {
                                // $scope.selectionbk.push($scope.infoDemande.idsBank[i].idInstitution);
                                $scope.changeBkAttach($scope.infoDemande.idsBank[i].idInstitution);
                            };
                        }
                    } else {
                        $scope.selectionbk = [];
                        $scope.toutes = [{
                                "id": 2,
                                "reponse": "Oui"
                            },
                            {
                                "id": 1,
                                "reponse": "Non"
                            }
                        ];
                    };
                } else {
                    $scope.selectionbk = [];
                    $scope.toutes = [{
                            "id": 2,
                            "reponse": "Oui"
                        },
                        {
                            "id": 1,
                            "reponse": "Non"
                        }
                    ];
                };


                if ($scope.infoDemande.documents != null) {
                    if ($scope.infoDemande.documents.length != 0) {
                        if ($scope.infoDemande.documents.length == $scope.listDocuments.length) {
                            $scope.selection = [];
                            $scope.docus = [{
                                    "id": 8,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 7,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.ifDocUp(8);
                            for (var i = 0; i < $scope.infoDemande.documents.length; i++) {
                                // $scope.selectionb.push($scope.infoDemande.documents[i].idDocuments);
                                $scope.changeDoc_attach($scope.infoDemande.documents[i].idDocuments);
                            };
                        } else if ($scope.infoDemande.documents.length < $scope.listDocuments.length) {
                            $scope.selection = [];
                            $scope.docus = [{
                                    "id": 8,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 7,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.ifDocUp(7);
                            for (var i = 0; i < $scope.infoDemande.documents.length; i++) {
                                // $scope.selectionb.push($scope.infoDemande.documents[i].idDocuments);
                                $scope.changeDoc_attach($scope.infoDemande.documents[i].idDocuments);
                            };
                        }
                    } else {
                        $scope.selection = [];
                        $scope.docus = [{
                                "id": 7,
                                "reponse": "Oui"
                            },
                            {
                                "id": 8,
                                "reponse": "Non"
                            }
                        ];
                        // $scope.ifDocUp(8);
                    };
                } else {
                    $scope.selection = [];
                    $scope.docus = [{
                            "id": 7,
                            "reponse": "Oui"
                        },
                        {
                            "id": 8,
                            "reponse": "Non"
                        }
                    ];
                    // $scope.ifDocUp(8);
                };

                if ($scope.infoDemande.request.isEnchereAnonyme) {
                    $scope.enchersa = [{
                            "id": 5,
                            "reponse": "Oui"
                        },
                        {
                            "id": 6,
                            "reponse": "Non"
                        }
                    ];
                } else if (!$scope.infoDemande.request.isEnchereAnonyme) {
                    $scope.enchersa = [{
                            "id": 6,
                            "reponse": "Oui"
                        },
                        {
                            "id": 5,
                            "reponse": "Non"
                        }
                    ];
                };
                if ($scope.infoDemande.request.isEnchereMultiple) {
                    $scope.enchersm = [{
                            "id": 4,
                            "reponse": "Oui"
                        },
                        {
                            "id": 3,
                            "reponse": "Non"
                        }
                    ];
                } else if (!$scope.infoDemande.request.isEnchereMultiple) {
                    $scope.enchersm = [{
                            "id": 3,
                            "reponse": "Oui"
                        },
                        {
                            "id": 4,
                            "reponse": "Non"
                        }
                    ];
                };

                if ($scope.infoDemande.request.sens === 'Achat') {
                    $scope.sensop = [{
                            "id": 9,
                            "reponse": "Achat"
                        },
                        {
                            "id": 10,
                            "reponse": "Vente"
                        }
                    ];
                } else if ($scope.infoDemande.request.sens === 'Vente') {
                    $scope.sensop = [{
                            "id": 10,
                            "reponse": "Achat"
                        },
                        {
                            "id": 9,
                            "reponse": "Vente"
                        }
                    ];
                };

                if ($scope.infoDemande.request.typeChange === 'Au comptant') {
                    $scope.typechange = [{
                            "id": 11,
                            "reponse": "Au comptant"
                        },
                        {
                            "id": 12,
                            "reponse": "Forward"
                        },
                        {
                            "id": 13,
                            "reponse": "Flexiterm"
                        }
                    ];
                    // //console.log("$scope.typechange ",$scope.typechange);
                    // //console.log("$scope.infoDemande.request.typeChange ",$scope.infoDemande.request.typeChange==='Au comptant');
                } else if ($scope.infoDemande.request.typeChange === 'Forward') {
                    $scope.typechange = [{
                            "id": 12,
                            "reponse": "Au comptant"
                        },
                        {
                            "id": 11,
                            "reponse": "Forward"
                        },
                        {
                            "id": 13,
                            "reponse": "Flexiterm"
                        }
                    ];
                } else if ($scope.infoDemande.request.typeChange === 'Flexiterm') {
                    $scope.typechange = [{
                            "id": 13,
                            "reponse": "Au comptant"
                        },
                        {
                            "id": 12,
                            "reponse": "Forward"
                        },
                        {
                            "id": 11,
                            "reponse": "Flexiterm"
                        }
                    ];
                };

                if ($scope.infoDemande.request.typeCotation === 'Cours') {
                    $scope.typecotation = [{
                            "id": 14,
                            "reponse": "Cours"
                        },
                        {
                            "id": 15,
                            "reponse": "Marge"
                        }
                    ];
                } else if ($scope.infoDemande.request.typeCotation === 'Marge') {
                    $scope.typecotation = [{
                            "id": 15,
                            "reponse": "Cours"
                        },
                        {
                            "id": 14,
                            "reponse": "Marge"
                        }
                    ];
                };

                if ($scope.infoDemande.request.refCours === 'Reuters') {
                    $scope.refcours = [{
                            "id": 19,
                            "reponse": ""
                        },
                        {
                            "id": 18,
                            "reponse": "Reuters"
                        },
                        {
                            "id": 20,
                            "reponse": "fixing BCE"
                        },
                        {
                            "id": 21,
                            "reponse": "fixing BCEAO"
                        }
                    ];
                } else if ($scope.infoDemande.request.refCours === 'fixing BCE') {
                    $scope.refcours = [{
                            "id": 19,
                            "reponse": ""
                        },
                        {
                            "id": 20,
                            "reponse": "Reuters"
                        },
                        {
                            "id": 18,
                            "reponse": "fixing BCE"
                        },
                        {
                            "id": 21,
                            "reponse": "fixing BCEAO"
                        }
                    ];
                } else if ($scope.infoDemande.request.refCours === 'fixing BCEAO') {
                    $scope.refcours = [{
                            "id": 19,
                            "reponse": ""
                        },
                        {
                            "id": 20,
                            "reponse": "Reuters"
                        },
                        {
                            "id": 21,
                            "reponse": "fixing BCE"
                        },
                        {
                            "id": 18,
                            "reponse": "fixing BCEAO"
                        }
                    ];
                };

                if ($scope.idDetail && $scope.isOperation == null) {
                    $scope.montant_ch = parseInt($scope.infoDemande.request.montant);
                    $scope.date_valeur_ch = new Date($scope.infoDemande.request.dateValeur);
                    $scope.devise_etrangere_ch = $scope.infoDemande.request.devise.description;
                    if ($scope.infoDemande.request.dateDebutDemande != null) {
                        $scope.date_debut_ch = new Date($scope.infoDemande.request.dateDebutDemande);
                        $scope.changeDate_debut($scope.date_debut_ch);
                    } else if ($scope.infoDemande.request.dateDebutDemande == null) {
                        $scope.date_debut = null;
                    };
                    if ($scope.infoDemande.request.dateFinDemande != null) {
                        $scope.date_fin_ch = new Date($scope.infoDemande.request.dateFinDemande);
                        $scope.changeDate_fin($scope.date_fin_ch);
                    } else if ($scope.infoDemande.request.dateFinDemande == null) {
                        $scope.date_fin = null;
                    };
                    if ($scope.infoDemande.request.dateNegociation != null) {
                        $scope.date_negociation_ch = new Date($scope.infoDemande.request.dateNegociation);
                        $scope.changeDate_negociation($scope.date_negociation_ch);
                    } else if ($scope.infoDemande.request.dateDebutDemande == null) {
                        $scope.date_negociation = null;
                    };
                    $scope.cours_max_ch = parseInt($scope.infoDemande.request.coursMax);
                    $scope.cours_min_ch = parseInt($scope.infoDemande.request.coursMin);
                };
                if (!$scope.idDetail && $scope.isOperation == null) {
                    var valider = 'valider';
                    $scope.montant_ch = parseInt($scope.infoDemande.request.montant);
                    $scope.date_valeur_ch = new Date($scope.infoDemande.request.dateValeur);
                    $scope.devise_etrangere_ch = $scope.infoDemande.request.devise.description;
                    if ($scope.infoDemande.request.dateDebutDemande != null) {
                        $scope.date_debut_ch = new Date($scope.infoDemande.request.dateDebutDemande);
                        $scope.changeDate_debut($scope.date_debut_ch);
                    } else if ($scope.infoDemande.request.dateDebutDemande == null) {
                        $scope.date_debut = null;
                    };
                    if ($scope.infoDemande.request.dateFinDemande != null) {
                        $scope.date_fin_ch = new Date($scope.infoDemande.request.dateFinDemande);
                        $scope.changeDate_fin($scope.date_fin_ch);
                    } else if ($scope.infoDemande.request.dateFinDemande == null) {
                        $scope.date_fin = null;
                    };
                    if ($scope.infoDemande.request.dateNegociation != null) {
                        $scope.date_negociation_ch = new Date($scope.infoDemande.request.dateNegociation);
                        $scope.changeDate_negociation($scope.date_negociation_ch);
                    } else if ($scope.infoDemande.request.dateDebutDemande == null) {
                        $scope.date_negociation = null;
                    };
                    $scope.cours_max_ch = parseInt($scope.infoDemande.request.coursMax);
                    $scope.cours_min_ch = parseInt($scope.infoDemande.request.coursMin);
                    $scope.changeMontant($scope.montant_ch);
                    $scope.changeDate_valeur($scope.date_valeur_ch);
                    $scope.changeDevise($scope.devise_etrangere_ch);
                    $scope.showErrorCourMax($scope.cours_max_ch);
                    $scope.showErrorCourMin($scope.cours_min_ch);

                    $scope.addenToPcH = function() {
                        $scope.loading = true;
                        var idReq = parseInt($scope.infoDemande.request.idDemande);
                        var objet = {
                            "request": {
                                "idDemande": parseInt($scope.infoDemande.request.idDemande),
                                "dateValeur": "" + $scope.date_valeur,
                                "montant": "" + $scope.montant,
                                "devise": $scope.devise,
                                "dateDebutDemande": "" + $scope.date_debut,
                                "dateFinDemande": "" + $scope.date_fin,
                                "isEnchereAnonyme": $scope.encherea_,
                                "isEnchereMultiple": $scope.encherem_,
                                "dateNegociation": "" + $scope.date_negociation,
                                "typeCotation": "" + $scope.isTypeCotation,
                                "typeChange": "" + $scope.isTypeCh,
                                "coursMax": "" + $scope.isCourMax,
                                "coursMin": "" + $scope.isCourMin,
                                "sens": "" + $scope.isSensop,
                                "nombreDocument": $scope.selection.length,
                                "refCours": "" + $scope.isrefCourse,
                                "product": $scope.idPro,
                                "isValid": $scope.infoDemande.request.isValid
                            },

                            "status": 1
                        };

                        validationsUser(objet);
                        $rootScope.$broadcast('adminEnV', { valider: valider, idReq: idReq, objet: objet });
                    };
                };

                if (!$scope.isOperation && $scope.isOperation != null) {
                    $scope.montant_ch = parseInt($scope.infoDemande.request.montant);
                    $scope.date_valeur_ch = new Date($scope.infoDemande.request.dateValeur);
                    $scope.devise_etrangere_ch = $scope.infoDemande.request.devise.description;
                    if ($scope.infoDemande.request.dateDebutDemande != null) {
                        $scope.date_debut_ch = new Date($scope.infoDemande.request.dateDebutDemande);
                        $scope.changeDate_debut($scope.date_debut_ch);
                    } else if ($scope.infoDemande.request.dateDebutDemande == null) {
                        $scope.date_debut = null;
                    };
                    if ($scope.infoDemande.request.dateFinDemande != null) {
                        $scope.date_fin_ch = new Date($scope.infoDemande.request.dateFinDemande);
                        $scope.changeDate_fin($scope.date_fin_ch);
                    } else if ($scope.infoDemande.request.dateFinDemande == null) {
                        $scope.date_fin = null;
                    };
                    if ($scope.infoDemande.request.dateNegociation != null) {
                        $scope.date_negociation_ch = new Date($scope.infoDemande.request.dateNegociation);
                        $scope.changeDate_negociation($scope.date_negociation_ch);
                    } else if ($scope.infoDemande.request.dateDebutDemande == null) {
                        $scope.date_negociation = null;
                    };

                    $scope.cours_max_ch = parseInt($scope.infoDemande.request.coursMax);
                    $scope.cours_min_ch = parseInt($scope.infoDemande.request.coursMin);

                    $scope.changeMontant($scope.montant_ch);
                    $scope.changeDate_valeur($scope.date_valeur_ch);
                    $scope.changeDevise($scope.devise_etrangere_ch);
                    $scope.showErrorCourMax($scope.cours_max_ch);
                    $scope.showErrorCourMin($scope.cours_min_ch);

                    $scope.addenToPcH = function() {
                        $scope.loading = true;
                        var idReq = parseInt($scope.infoDemande.request.idDemande);
                        var objet = {
                            "request": {
                                "idDemande": parseInt($scope.infoDemande.request.idDemande),
                                "dateValeur": "" + $scope.date_valeur,
                                "montant": "" + $scope.montant,
                                "devise": $scope.devise,
                                "dateDebutDemande": "" + $scope.date_debut,
                                "dateFinDemande": "" + $scope.date_fin,
                                "isEnchereAnonyme": $scope.encherea_,
                                "isEnchereMultiple": $scope.encherem_,
                                "dateNegociation": "" + $scope.date_negociation,
                                "typeCotation": "" + $scope.isTypeCotation,
                                "typeChange": "" + $scope.isTypeCh,
                                "coursMax": "" + $scope.isCourMax,
                                "coursMin": "" + $scope.isCourMin,
                                "sens": "" + $scope.isSensop,
                                "nombreDocument": $scope.selection.length,
                                "refCours": "" + $scope.isrefCourse,
                                "product": $scope.idPro
                            },

                            "documents": $scope.selection,
                            "idsBank": $scope.selectionbk
                        };

                        updateEnProduitDemande(idReq, idUser_, objet);
                        $rootScope.$broadcast('adminEnOp', { idReq: idReq, objet: objet });
                    };
                }
                break;
            case 'INFO-TRANSFERT':
                // toutesOrNo($scope.isToute);
                // toutesDocs($scope.isUpload);
                // $scope.toutes=[];
                // $scope.enchersm = [];
                // $scope.enchersa = [];
                // $scope.docus = [];
                // $scope.selectionbk=[];
                // $scope.selection=[];
                // $scope.sensop = [];
                if ($scope.infoDemande.idsBank != null) {
                    if ($scope.infoDemande.idsBank.length != 0) {
                        if ($scope.infoDemande.idsBank.length == $scope.listBksByLoc.length) {
                            $scope.selectionbk = [];
                            $scope.toutes = [{
                                    "id": 1,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 2,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.choixToutes(2);
                            for (var i = 0; i < $scope.infoDemande.idsBank.length; i++) {
                                // $scope.selectionbk.push($scope.infoDemande.idsBank[i].idInstitution);
                                $scope.changeBkAttach($scope.infoDemande.idsBank[i].idInstitution);
                            };
                        } else if ($scope.infoDemande.idsBank.length < $scope.listBksByLoc.length) {
                            $scope.selectionbk = [];
                            $scope.toutes = [{
                                    "id": 2,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 1,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.choixToutes(2);
                            for (var i = 0; i < $scope.infoDemande.idsBank.length; i++) {
                                // $scope.selectionbk.push($scope.infoDemande.idsBank[i].idInstitution);
                                $scope.changeBkAttach($scope.infoDemande.idsBank[i].idInstitution);
                            };
                        }
                    } else {
                        $scope.selectionbk = [];
                        $scope.toutes = [{
                                "id": 2,
                                "reponse": "Oui"
                            },
                            {
                                "id": 1,
                                "reponse": "Non"
                            }
                        ];
                    };
                } else {
                    $scope.selectionbk = [];
                    $scope.toutes = [{
                            "id": 2,
                            "reponse": "Oui"
                        },
                        {
                            "id": 1,
                            "reponse": "Non"
                        }
                    ];
                };


                if ($scope.infoDemande.documents != null) {
                    if ($scope.infoDemande.documents.length != 0) {
                        if ($scope.infoDemande.documents.length == $scope.listDocuments.length) {
                            $scope.selection = [];
                            $scope.docus = [{
                                    "id": 8,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 7,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.ifDocUp(8);
                            for (var i = 0; i < $scope.infoDemande.documents.length; i++) {
                                // $scope.selectionb.push($scope.infoDemande.documents[i].idDocuments);
                                $scope.changeDoc_attach($scope.infoDemande.documents[i].idDocuments);
                            };
                        } else if ($scope.infoDemande.documents.length < $scope.listDocuments.length) {
                            $scope.selection = [];
                            $scope.docus = [{
                                    "id": 8,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 7,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.ifDocUp(7);
                            for (var i = 0; i < $scope.infoDemande.documents.length; i++) {
                                // $scope.selectionb.push($scope.infoDemande.documents[i].idDocuments);
                                $scope.changeDoc_attach($scope.infoDemande.documents[i].idDocuments);
                            };
                        }
                    } else {
                        $scope.selection = [];
                        $scope.docus = [{
                                "id": 7,
                                "reponse": "Oui"
                            },
                            {
                                "id": 8,
                                "reponse": "Non"
                            }
                        ];
                        // $scope.ifDocUp(8);
                    };
                } else {
                    $scope.selection = [];
                    $scope.docus = [{
                            "id": 7,
                            "reponse": "Oui"
                        },
                        {
                            "id": 8,
                            "reponse": "Non"
                        }
                    ];
                };

                if ($scope.infoDemande.request.isEnchereAnonyme) {
                    $scope.enchersa = [{
                            "id": 5,
                            "reponse": "Oui"
                        },
                        {
                            "id": 6,
                            "reponse": "Non"
                        }
                    ];
                } else if (!$scope.infoDemande.request.isEnchereAnonyme) {
                    $scope.enchersa = [{
                            "id": 6,
                            "reponse": "Oui"
                        },
                        {
                            "id": 5,
                            "reponse": "Non"
                        }
                    ];
                };
                if ($scope.infoDemande.request.isEnchereMultiple) {
                    $scope.enchersm = [{
                            "id": 4,
                            "reponse": "Oui"
                        },
                        {
                            "id": 3,
                            "reponse": "Non"
                        }
                    ];
                } else if (!$scope.infoDemande.request.isEnchereMultiple) {
                    $scope.enchersm = [{
                            "id": 3,
                            "reponse": "Oui"
                        },
                        {
                            "id": 4,
                            "reponse": "Non"
                        }
                    ];
                };

                if ($scope.infoDemande.request.sens === 'Achat') {
                    $scope.sensop = [{
                            "id": 9,
                            "reponse": "Achat"
                        },
                        {
                            "id": 10,
                            "reponse": "Vente"
                        }
                    ];
                } else if ($scope.infoDemande.request.sens === 'Vente') {
                    $scope.sensop = [{
                            "id": 10,
                            "reponse": "Achat"
                        },
                        {
                            "id": 9,
                            "reponse": "Vente"
                        }
                    ];
                };


                if ($scope.idDetail && $scope.isOperation == null) {
                    $scope.montant_tr = parseInt($scope.infoDemande.request.montant);
                    $scope.date_valeur_tr = new Date($scope.infoDemande.request.dateValeur);
                    $scope.devise_cr = $scope.infoDemande.request.devise.description;
                    if ($scope.infoDemande.request.dateDebutDemande != null) {
                        $scope.date_debut_tr = new Date($scope.infoDemande.request.dateDebutDemande);
                        $scope.changeDate_debut($scope.date_debut_tr);
                    } else if ($scope.infoDemande.request.dateDebutDemande == null) {
                        $scope.date_debut = null;
                    };
                    if ($scope.infoDemande.request.dateFinDemande != null) {
                        $scope.date_fin_tr = new Date($scope.infoDemande.request.dateFinDemande);
                        $scope.changeDate_fin($scope.date_fin_tr);
                    } else if ($scope.infoDemande.request.dateFinDemande == null) {
                        $scope.date_fin = null;
                    };
                    $scope.taux_max_tr = parseInt($scope.infoDemande.request.tauxMax);
                };
                if (!$scope.idDetail && $scope.isOperation == null) {
                    var valider = 'valider';
                    $scope.montant_tr = parseInt($scope.infoDemande.request.montant);
                    $scope.date_valeur_tr = new Date($scope.infoDemande.request.dateValeur);
                    $scope.devise_cr = $scope.infoDemande.request.devise.description;
                    if ($scope.infoDemande.request.dateDebutDemande != null) {
                        $scope.date_debut_tr = new Date($scope.infoDemande.request.dateDebutDemande);
                        $scope.changeDate_debut($scope.date_debut_tr);
                    } else if ($scope.infoDemande.request.dateDebutDemande == null) {
                        $scope.date_debut = null;
                    };
                    if ($scope.infoDemande.request.dateFinDemande != null) {
                        $scope.date_fin_tr = new Date($scope.infoDemande.request.dateFinDemande);
                        $scope.changeDate_fin($scope.date_fin_tr);
                    } else if ($scope.infoDemande.request.dateFinDemande == null) {
                        $scope.date_fin = null;
                    };
                    $scope.taux_max_tr = parseInt($scope.infoDemande.request.tauxMax);
                    $scope.changeMontant($scope.montant_tr);
                    $scope.changeDate_valeur($scope.date_valeur_tr);
                    $scope.changeDevise($scope.devise_tr);
                    $scope.changeTaux($scope.taux_max_tr);

                    $scope.addenToPtR = function() {
                        $scope.loading = true;
                        var idReq = parseInt($scope.infoDemande.request.idDemande);
                        var objet = {
                            "request": {
                                "idDemande": parseInt($scope.infoDemande.request.idDemande),
                                "montant": "" + $scope.montant,
                                "dateValeur": "" + $scope.date_valeur,
                                "devise": $scope.devise,
                                "sens": "" + $scope.isSensop,
                                "dateDebutDemande": "" + $scope.date_debut,
                                "dateFinDemande": "" + $scope.date_fin,
                                "isEnchereAnonyme": $scope.encherea_,
                                "isEnchereMultiple": $scope.encherem_,
                                "tauxMax": "" + $scope.taux_max,
                                "nombreDocument": $scope.selection.length,
                                "product": $scope.idPro,
                                "isValid": $scope.infoDemande.request.isValid
                            },

                            "status": 1
                        };

                        validationsUser(objet);
                        $rootScope.$broadcast('adminEnV', { valider: valider, idReq: idReq, objet: objet });
                    };
                };

                if (!$scope.isOperation && $scope.isOperation != null) {
                    $scope.montant_tr = parseInt($scope.infoDemande.request.montant);
                    $scope.date_valeur_tr = new Date($scope.infoDemande.request.dateValeur);
                    $scope.devise_tr = $scope.infoDemande.request.devise.description;
                    if ($scope.infoDemande.request.dateDebutDemande != null) {
                        $scope.date_debut_tr = new Date($scope.infoDemande.request.dateDebutDemande);
                        $scope.changeDate_debut($scope.date_debut_tr);
                    } else if ($scope.infoDemande.request.dateDebutDemande == null) {
                        $scope.date_debut = null;
                    };
                    if ($scope.infoDemande.request.dateFinDemande != null) {
                        $scope.date_fin_tr = new Date($scope.infoDemande.request.dateFinDemande);
                        $scope.changeDate_fin($scope.date_fin_tr);
                    } else if ($scope.infoDemande.request.dateFinDemande == null) {
                        $scope.date_fin = null;
                    };
                    $scope.taux_max_tr = parseInt($scope.infoDemande.request.tauxMax);

                    $scope.changeMontant($scope.montant_tr);
                    $scope.changeDate_valeur($scope.date_valeur_tr);
                    $scope.changeDevise($scope.devise_tr);
                    $scope.changeTaux($scope.taux_max_tr);

                    $scope.addenToPtR = function() {
                        $scope.loading = true;
                        var idReq = parseInt($scope.infoDemande.request.idDemande);
                        var objet = {
                            "request": {
                                "idDemande": parseInt($scope.infoDemande.request.idDemande),
                                "montant": "" + $scope.montant,
                                "dateValeur": "" + $scope.date_valeur,
                                "devise": $scope.devise,
                                "sens": "" + $scope.isSensop,
                                "dateDebutDemande": "" + $scope.date_debut,
                                "dateFinDemande": "" + $scope.date_fin,
                                "isEnchereAnonyme": $scope.encherea_,
                                "isEnchereMultiple": $scope.encherem_,
                                "tauxMax": "" + $scope.taux_max,
                                "nombreDocument": $scope.selection.length,
                                "product": $scope.idPro
                            },

                            "documents": $scope.selection,
                            "idsBank": $scope.selectionbk
                        };

                        updateEnProduitDemande(idReq, idUser_, objet)
                        $rootScope.$broadcast('adminEnOp', { idReq: idReq, objet: objet });
                    };
                }
                break;
            case 'INFO-DEP-TERME':
                // toutesOrNo($scope.isToute);
                // toutesDocs($scope.isUpload);
                // $scope.toutes=[];
                // $scope.enchersm = [];
                // $scope.enchersa = [];
                // $scope.docus = [];
                // $scope.selectionbk=[];
                // $scope.selection=[];
                // $scope.typeTaux = [];
                if ($scope.infoDemande.idsBank != null) {
                    if ($scope.infoDemande.idsBank.length != 0) {
                        if ($scope.infoDemande.idsBank.length == $scope.listBksByLoc.length) {
                            $scope.selectionbk = [];
                            $scope.toutes = [{
                                    "id": 1,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 2,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.choixToutes(2);
                            for (var i = 0; i < $scope.infoDemande.idsBank.length; i++) {
                                // $scope.selectionbk.push($scope.infoDemande.idsBank[i].idInstitution);
                                $scope.changeBkAttach($scope.infoDemande.idsBank[i].idInstitution);
                            };
                        } else if ($scope.infoDemande.idsBank.length < $scope.listBksByLoc.length) {
                            $scope.selectionbk = [];
                            $scope.toutes = [{
                                    "id": 2,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 1,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.choixToutes(2);
                            for (var i = 0; i < $scope.infoDemande.idsBank.length; i++) {
                                // $scope.selectionbk.push($scope.infoDemande.idsBank[i].idInstitution);
                                $scope.changeBkAttach($scope.infoDemande.idsBank[i].idInstitution);
                            };
                        }
                    } else {
                        $scope.selectionbk = [];
                        $scope.toutes = [{
                                "id": 2,
                                "reponse": "Oui"
                            },
                            {
                                "id": 1,
                                "reponse": "Non"
                            }
                        ];
                    };
                } else {
                    $scope.selectionbk = [];
                    $scope.toutes = [{
                            "id": 2,
                            "reponse": "Oui"
                        },
                        {
                            "id": 1,
                            "reponse": "Non"
                        }
                    ];
                };


                if ($scope.infoDemande.documents != null) {
                    if ($scope.infoDemande.documents.length != 0) {
                        if ($scope.infoDemande.documents.length == $scope.listDocuments.length) {
                            $scope.selection = [];
                            $scope.docus = [{
                                    "id": 8,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 7,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.ifDocUp(8);
                            for (var i = 0; i < $scope.infoDemande.documents.length; i++) {
                                // $scope.selectionb.push($scope.infoDemande.documents[i].idDocuments);
                                $scope.changeDoc_attach($scope.infoDemande.documents[i].idDocuments);
                            };
                        } else if ($scope.infoDemande.documents.length < $scope.listDocuments.length) {
                            $scope.selection = [];
                            $scope.docus = [{
                                    "id": 8,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 7,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.ifDocUp(7);
                            for (var i = 0; i < $scope.infoDemande.documents.length; i++) {
                                // $scope.selectionb.push($scope.infoDemande.documents[i].idDocuments);
                                $scope.changeDoc_attach($scope.infoDemande.documents[i].idDocuments);
                            };
                        }
                    } else {
                        $scope.selection = [];
                        $scope.docus = [{
                                "id": 7,
                                "reponse": "Oui"
                            },
                            {
                                "id": 8,
                                "reponse": "Non"
                            }
                        ];
                        // $scope.ifDocUp(8);
                    };
                } else {
                    $scope.selection = [];
                    $scope.docus = [{
                            "id": 7,
                            "reponse": "Oui"
                        },
                        {
                            "id": 8,
                            "reponse": "Non"
                        }
                    ];
                    // $scope.ifDocUp(8);
                };

                if ($scope.infoDemande.request.isEnchereAnonyme) {
                    $scope.enchersa = [{
                            "id": 5,
                            "reponse": "Oui"
                        },
                        {
                            "id": 6,
                            "reponse": "Non"
                        }
                    ];
                } else if (!$scope.infoDemande.request.isEnchereAnonyme) {
                    $scope.enchersa = [{
                            "id": 6,
                            "reponse": "Oui"
                        },
                        {
                            "id": 5,
                            "reponse": "Non"
                        }
                    ];
                };
                if ($scope.infoDemande.request.isEnchereMultiple) {
                    $scope.enchersm = [{
                            "id": 4,
                            "reponse": "Oui"
                        },
                        {
                            "id": 3,
                            "reponse": "Non"
                        }
                    ];
                } else if (!$scope.infoDemande.request.isEnchereMultiple) {
                    $scope.enchersm = [{
                            "id": 3,
                            "reponse": "Oui"
                        },
                        {
                            "id": 4,
                            "reponse": "Non"
                        }
                    ];
                };

                if ($scope.infoDemande.request.typeTaux === 'Progressif') {
                    $scope.typeTaux = [{
                            "id": 16,
                            "reponse": "Fixe"
                        },
                        {
                            "id": 17,
                            "reponse": "Progressif"
                        }
                    ];
                } else if ($scope.infoDemande.request.typeTaux === 'Fixe') {
                    $scope.typeTaux = [{
                            "id": 17,
                            "reponse": "Fixe"
                        },
                        {
                            "id": 16,
                            "reponse": "Progressif"
                        }
                    ];
                };

                if ($scope.idDetail && $scope.isOperation == null) {
                    $scope.montant_dep = parseInt($scope.infoDemande.request.montant);
                    $scope.date_valeur_dep = new Date($scope.infoDemande.request.dateValeur);
                    $scope.devise_dep = $scope.infoDemande.request.devise.description;
                    if ($scope.infoDemande.request.dateDebutDemande != null) {
                        $scope.date_debut_dep = new Date($scope.infoDemande.request.dateDebutDemande);
                        $scope.changeDate_debut($scope.date_debut_dep);
                    } else if ($scope.infoDemande.request.dateDebutDemande == null) {
                        $scope.date_debut = null;
                    };
                    if ($scope.infoDemande.request.dateFinDemande != null) {
                        $scope.date_fin_dep = new Date($scope.infoDemande.request.dateFinDemande);
                        $scope.changeDate_fin($scope.date_fin_dep);
                    } else if ($scope.infoDemande.request.dateFinDemande == null) {
                        $scope.date_fin = null;
                    };
                    if ($scope.infoDemande.request.dateMaturite != null) {
                        $scope.date_maturite_dep = new Date($scope.infoDemande.request.dateMaturite);
                        $scope.changeDate_maturite($scope.date_maturite_dep);;
                    } else if ($scope.infoDemande.request.dateMaturite == null) {
                        $scope.date_maturite = null;
                    };
                    $scope.taux_max_dep = parseInt($scope.infoDemande.request.tauxMin);
                };
                if (!$scope.idDetail && $scope.isOperation == null) {
                    var valider = 'valider';
                    $scope.montant_dep = parseInt($scope.infoDemande.request.montant);
                    $scope.date_valeur_dep = new Date($scope.infoDemande.request.dateValeur);
                    $scope.devise_dep = $scope.infoDemande.request.devise.description;
                    if ($scope.infoDemande.request.dateDebutDemande != null) {
                        $scope.date_debut_dep = new Date($scope.infoDemande.request.dateDebutDemande);
                        $scope.changeDate_debut($scope.date_debut_dep);
                    } else if ($scope.infoDemande.request.dateDebutDemande == null) {
                        $scope.date_debut = null;
                    };
                    if ($scope.infoDemande.request.dateFinDemande != null) {
                        $scope.date_fin_dep = new Date($scope.infoDemande.request.dateFinDemande);
                        $scope.changeDate_fin($scope.date_fin_dep);
                    } else if ($scope.infoDemande.request.dateFinDemande == null) {
                        $scope.date_fin = null;
                    };
                    if ($scope.infoDemande.request.dateMaturite != null) {
                        $scope.date_maturite_dep = new Date($scope.infoDemande.request.dateMaturite);
                        $scope.changeDate_maturite($scope.date_maturite_dep);;
                    } else if ($scope.infoDemande.request.dateMaturite == null) {
                        $scope.date_maturite = null;
                    };
                    $scope.taux_max_dep = parseInt($scope.infoDemande.request.tauxMin);
                    $scope.changeMontant($scope.montant_dep);
                    $scope.changeDate_valeur($scope.date_valeur_dep);
                    $scope.changeDevise($scope.devise_dep);
                    $scope.changeTaux($scope.taux_max_dep);

                    $scope.addenToPdeP = function() {
                        $scope.loading = true;
                        var idReq = parseInt($scope.infoDemande.request.idDemande);
                        var objet = {
                            "request": {
                                "idDemande": $scope.infoDemande.request.idDemande,
                                "montant": "" + $scope.montant,
                                "dateValeur": "" + $scope.date_valeur,
                                "devise": $scope.devise,
                                "dateMaturite": $scope.date_maturite,
                                "dateDebutDemande": "" + $scope.date_debut,
                                "dateFinDemande": "" + $scope.date_fin,
                                "isEnchereMultiple": $scope.encherem_,
                                "isEnchereAnonyme": $scope.encherea_,
                                "typeTaux": $scope.isTypeTaux,
                                "tauxMin": "" + $scope.taux_max,
                                "nombreDocument": $scope.selection.length,
                                "product": $scope.idPro,
                                "isValid": $scope.infoDemande.request.isValid
                            },

                            "status": 1
                        };

                        validationsUser(objet);
                        $rootScope.$broadcast('adminEnV', { valider: valider, idReq: idReq, objet: objet });
                    };
                };

                if (!$scope.isOperation && $scope.isOperation != null) {
                    $scope.montant_dep = parseInt($scope.infoDemande.request.montant);
                    $scope.date_valeur_dep = new Date($scope.infoDemande.request.dateValeur);
                    $scope.devise_dep = $scope.infoDemande.request.devise.description;
                    if ($scope.infoDemande.request.dateDebutDemande != null) {
                        $scope.date_debut_dep = new Date($scope.infoDemande.request.dateDebutDemande);
                        $scope.changeDate_debut($scope.date_debut_dep);
                    } else if ($scope.infoDemande.request.dateDebutDemande == null) {
                        $scope.date_debut = null;
                    };
                    if ($scope.infoDemande.request.dateFinDemande != null) {
                        $scope.date_fin_dep = new Date($scope.infoDemande.request.dateFinDemande);
                        $scope.changeDate_fin($scope.date_fin_dep);
                    } else if ($scope.infoDemande.request.dateFinDemande == null) {
                        $scope.date_fin = null;
                    };
                    if ($scope.infoDemande.request.dateMaturite != null) {
                        $scope.date_maturite_dep = new Date($scope.infoDemande.request.dateMaturite);
                        $scope.changeDate_maturite($scope.date_maturite_dep);;
                    } else if ($scope.infoDemande.request.dateMaturite == null) {
                        $scope.date_maturite = null;
                    };
                    $scope.taux_max_dep = parseInt($scope.infoDemande.request.tauxMin);

                    $scope.changeMontant($scope.montant_dep);
                    $scope.changeDate_valeur($scope.date_valeur_dep);
                    $scope.changeDevise($scope.devise_dep);
                    $scope.changeTaux($scope.taux_max_dep);

                    $scope.addenToPdeP = function() {
                        $scope.loading = true;
                        var idReq = parseInt($scope.infoDemande.request.idDemande);
                        var objet = {
                            "request": {
                                "idDemande": $scope.infoDemande.request.idDemande,
                                "montant": "" + $scope.montant,
                                "dateValeur": "" + $scope.date_valeur,
                                "devise": $scope.devise,
                                "dateMaturite": $scope.date_maturite,
                                "dateDebutDemande": "" + $scope.date_debut,
                                "dateFinDemande": "" + $scope.date_fin,
                                "isEnchereMultiple": $scope.encherem_,
                                "isEnchereAnonyme": $scope.encherea_,
                                "typeTaux": $scope.isTypeTaux,
                                "tauxMin": "" + $scope.taux_max,
                                "nombreDocument": $scope.selection.length,
                                "product": $scope.idPro
                            },

                            "documents": $scope.selection,
                            "idsBank": $scope.selectionbk
                        };

                        updateEnProduitDemande(idReq, idUser_, objet);
                        $rootScope.$broadcast('adminEnOp', { idReq: idReq, objet: objet });
                    };
                }
                break;
            case 'INFO-ESCOMPTE':
                if ($scope.infoDemande.idsBank != null) {
                    if ($scope.infoDemande.idsBank.length != 0) {
                        if ($scope.infoDemande.idsBank.length == $scope.listBksByLoc.length) {
                            $scope.selectionbk = [];
                            $scope.toutes = [{
                                    "id": 1,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 2,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.choixToutes(2);
                            for (var i = 0; i < $scope.infoDemande.idsBank.length; i++) {
                                // $scope.selectionbk.push($scope.infoDemande.idsBank[i].idInstitution);
                                $scope.changeBkAttach($scope.infoDemande.idsBank[i].idInstitution);
                            };
                        } else if ($scope.infoDemande.idsBank.length < $scope.listBksByLoc.length) {
                            $scope.selectionbk = [];
                            $scope.toutes = [{
                                    "id": 2,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 1,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.choixToutes(2);
                            for (var i = 0; i < $scope.infoDemande.idsBank.length; i++) {
                                // $scope.selectionbk.push($scope.infoDemande.idsBank[i].idInstitution);
                                $scope.changeBkAttach($scope.infoDemande.idsBank[i].idInstitution);
                            };
                        }
                    } else {
                        $scope.selectionbk = [];
                        $scope.toutes = [{
                                "id": 2,
                                "reponse": "Oui"
                            },
                            {
                                "id": 1,
                                "reponse": "Non"
                            }
                        ];
                    };
                } else {
                    $scope.selectionbk = [];
                    $scope.toutes = [{
                            "id": 2,
                            "reponse": "Oui"
                        },
                        {
                            "id": 1,
                            "reponse": "Non"
                        }
                    ];
                };


                if ($scope.infoDemande.documents != null) {
                    if ($scope.infoDemande.documents.length != 0) {
                        if ($scope.infoDemande.documents.length == $scope.listDocuments.length) {
                            $scope.selection = [];
                            $scope.docus = [{
                                    "id": 8,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 7,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.ifDocUp(8);
                            for (var i = 0; i < $scope.infoDemande.documents.length; i++) {
                                // $scope.selectionb.push($scope.infoDemande.documents[i].idDocuments);
                                $scope.changeDoc_attach($scope.infoDemande.documents[i].idDocuments);
                            };
                        } else if ($scope.infoDemande.documents.length < $scope.listDocuments.length) {
                            $scope.selection = [];
                            $scope.docus = [{
                                    "id": 8,
                                    "reponse": "Oui"
                                },
                                {
                                    "id": 7,
                                    "reponse": "Non"
                                }
                            ];
                            // $scope.ifDocUp(7);
                            for (var i = 0; i < $scope.infoDemande.documents.length; i++) {
                                // $scope.selectionb.push($scope.infoDemande.documents[i].idDocuments);
                                $scope.changeDoc_attach($scope.infoDemande.documents[i].idDocuments);
                            };
                        }
                    } else {
                        $scope.selection = [];
                        $scope.docus = [{
                                "id": 7,
                                "reponse": "Oui"
                            },
                            {
                                "id": 8,
                                "reponse": "Non"
                            }
                        ];
                        // $scope.ifDocUp(8);
                    };
                } else {
                    $scope.selection = [];
                    $scope.docus = [{
                            "id": 7,
                            "reponse": "Oui"
                        },
                        {
                            "id": 8,
                            "reponse": "Non"
                        }
                    ];
                    // $scope.ifDocUp(8);
                };

                if ($scope.infoDemande.request.isEnchereAnonyme) {
                    $scope.enchersa = [{
                            "id": 5,
                            "reponse": "Oui"
                        },
                        {
                            "id": 6,
                            "reponse": "Non"
                        }
                    ];
                } else if (!$scope.infoDemande.request.isEnchereAnonyme) {
                    $scope.enchersa = [{
                            "id": 6,
                            "reponse": "Oui"
                        },
                        {
                            "id": 5,
                            "reponse": "Non"
                        }
                    ];
                };
                if ($scope.infoDemande.request.isEnchereMultiple) {
                    $scope.enchersm = [{
                            "id": 4,
                            "reponse": "Oui"
                        },
                        {
                            "id": 3,
                            "reponse": "Non"
                        }
                    ];
                } else if (!$scope.infoDemande.request.isEnchereMultiple) {
                    $scope.enchersm = [{
                            "id": 3,
                            "reponse": "Oui"
                        },
                        {
                            "id": 4,
                            "reponse": "Non"
                        }
                    ];
                };

                if ($scope.idDetail && $scope.isOperation == null) {
                    $scope.montant_esc = parseInt($scope.infoDemande.request.montant);
                    $scope.date_escompte_esc = new Date($scope.infoDemande.request.dateEscompte);
                    $scope.devise_esc = $scope.infoDemande.request.devise.description;
                    if ($scope.infoDemande.request.dateMaturite != null) {
                        $scope.date_maturite_esc = new Date($scope.infoDemande.request.dateMaturite);
                        $scope.changeDate_maturite($scope.date_maturite_esc);
                    } else if ($scope.infoDemande.request.dateMaturite == null) {
                        $scope.date_maturite = null;
                    };
                    if ($scope.infoDemande.request.dateDebutDemande != null) {
                        $scope.date_debut_esc = new Date($scope.infoDemande.request.dateDebutDemande);
                        $scope.changeDate_debut($scope.date_debut_esc);
                    } else if ($scope.infoDemande.request.dateDebutDemande == null) {
                        $scope.date_debut = null;
                    };
                    if ($scope.infoDemande.request.dateFinDemande != null) {
                        $scope.date_fin_esc = new Date($scope.infoDemande.request.dateFinDemande);
                        $scope.changeDate_fin($scope.date_fin_esc);
                    } else if ($scope.infoDemande.request.dateFinDemande == null) {
                        $scope.date_fin = null;
                    };
                    $scope.taux_max_esc = parseInt($scope.infoDemande.request.tauxMax);
                    $scope.tire_esc = $scope.infoDemande.request.tire;
                    $scope.tireur_esc = $scope.infoDemande.request.tireur;
                    $scope.duree_esc = $scope.infoDemande.request.duree.split(" ")[1];
                    $scope.nb_duree_esc = parseInt($scope.infoDemande.request.duree.split(" ")[0]);
                };
                if (!$scope.idDetail && $scope.isOperation == null) {
                    // //console.log("Validation Escompte");
                    var valider = 'valider';
                    $scope.montant_esc = parseInt($scope.infoDemande.request.montant);
                    $scope.date_escompte_esc = new Date($scope.infoDemande.request.dateEscompte);
                    $scope.devise_esc = $scope.infoDemande.request.devise.description;
                    if ($scope.infoDemande.request.dateMaturite != null) {
                        $scope.date_maturite_esc = new Date($scope.infoDemande.request.dateMaturite);
                        $scope.changeDate_maturite($scope.date_maturite_esc);
                    } else if ($scope.infoDemande.request.dateMaturite == null) {
                        $scope.date_maturite = null;
                    };
                    if ($scope.infoDemande.request.dateDebutDemande != null) {
                        $scope.date_debut_esc = new Date($scope.infoDemande.request.dateDebutDemande);
                        $scope.changeDate_debut($scope.date_debut_esc);
                    } else if ($scope.infoDemande.request.dateDebutDemande == null) {
                        $scope.date_debut = null;
                    };
                    if ($scope.infoDemande.request.dateFinDemande != null) {
                        $scope.date_fin_esc = new Date($scope.infoDemande.request.dateFinDemande);
                        $scope.changeDate_fin($scope.date_fin_esc);
                    } else if ($scope.infoDemande.request.dateFinDemande == null) {
                        $scope.date_fin = null;
                    };
                    $scope.taux_max_esc = parseInt($scope.infoDemande.request.tauxMax);
                    $scope.tire_esc = $scope.infoDemande.request.tire;
                    $scope.tireur_esc = $scope.infoDemande.request.tireur;
                    $scope.duree_esc = $scope.infoDemande.request.duree.split(" ")[1];
                    $scope.nb_duree_esc = parseInt($scope.infoDemande.request.duree.split(" ")[0]);

                    $scope.changeMontant($scope.montant_esc);
                    $scope.changeDate_valeur($scope.date_escompte_esc);
                    $scope.changeDevise($scope.devise_esc);
                    $scope.changeTaux($scope.taux_max_esc);

                    $scope.changeTireEsc($scope.tire_esc);
                    $scope.changeTireurEsc($scope.tireur_esc);
                    $scope.changeDureeEsc($scope.duree_esc);
                    $scope.changeNbDuree($scope.nb_duree_esc);

                    $scope.addenToPesC = function() {
                        $scope.loading = true;
                        // //console.log("validation CR");
                        var idReq = parseInt($scope.infoDemande.request.idDemande);
                        var objet = {
                            "request": {
                                "idDemande": parseInt($scope.infoDemande.request.idDemande),
                                // "dateValeur": ""+$scope.date_valeur,
                                "dateEscompte": "" + $scope.date_valeur,
                                "montant": "" + $scope.montant,
                                "devise": $scope.devise,
                                "dateDebutDemande": "" + $scope.date_debut,
                                "dateFinDemande": "" + $scope.date_fin,
                                "isEnchereAnonyme": $scope.encherea_,
                                "isEnchereMultiple": $scope.encherem_,
                                "dateMaturite": $scope.date_maturite,
                                "tauxMax": "" + $scope.taux_max,
                                "tire": "" + $scope.tireesc,
                                "tireur": "" + $scope.tireuresc,
                                "duree": $scope.nbduree_esc + " " + $scope.dureeesc,
                                "nombreDocument": $scope.selection.length,
                                "product": $scope.idPro,
                                "isValid": $scope.infoDemande.request.isValid
                            },

                            "status": 1
                        };

                        validationsUser(objet);
                        $rootScope.$broadcast('adminEnV', { valider: valider, idReq: idReq, objet: objet });
                    };
                };

                if (!$scope.isOperation && $scope.isOperation != null) {
                    $scope.montant_esc = parseInt($scope.infoDemande.request.montant);
                    $scope.date_escompte_esc = new Date($scope.infoDemande.request.dateEscompte);
                    $scope.devise_esc = $scope.infoDemande.request.devise.description;
                    if ($scope.infoDemande.request.dateMaturite != null) {
                        $scope.date_maturite_esc = new Date($scope.infoDemande.request.dateMaturite);
                        $scope.changeDate_maturite($scope.date_maturite_esc);
                    } else if ($scope.infoDemande.request.dateMaturite == null) {
                        $scope.date_maturite = null;
                    };
                    if ($scope.infoDemande.request.dateDebutDemande != null) {
                        $scope.date_debut_esc = new Date($scope.infoDemande.request.dateDebutDemande);
                        $scope.changeDate_debut($scope.date_debut_esc);
                    } else if ($scope.infoDemande.request.dateDebutDemande == null) {
                        $scope.date_debut = null;
                    };
                    if ($scope.infoDemande.request.dateFinDemande != null) {
                        $scope.date_fin_esc = new Date($scope.infoDemande.request.dateFinDemande);
                        $scope.changeDate_fin($scope.date_fin_esc);
                    } else if ($scope.infoDemande.request.dateFinDemande == null) {
                        $scope.date_fin = null;
                    };
                    $scope.taux_max_esc = parseInt($scope.infoDemande.request.tauxMax);
                    $scope.tire_esc = $scope.infoDemande.request.tire;
                    $scope.tireur_esc = $scope.infoDemande.request.tireur;
                    $scope.duree_esc = $scope.infoDemande.request.duree.split(" ")[1];
                    $scope.nb_duree_esc = parseInt($scope.infoDemande.request.duree.split(" ")[0]);

                    $scope.changeMontant($scope.montant_esc);
                    $scope.changeDate_valeur($scope.date_escompte_esc);
                    $scope.changeDevise($scope.devise_esc);
                    $scope.changeTaux($scope.taux_max_esc);

                    $scope.changeTireEsc($scope.tire_esc);
                    $scope.changeTireurEsc($scope.tireur_esc);
                    $scope.changeDureeEsc($scope.duree_esc);
                    $scope.changeNbDuree($scope.nb_duree_esc);

                    $scope.addenToPesC = function() {
                        $scope.loading = true;
                        var idReq = parseInt($scope.infoDemande.request.idDemande);
                        var objet = {
                            "request": {
                                "idDemande": parseInt($scope.infoDemande.request.idDemande),
                                // "dateValeur": ""+$scope.date_valeur,
                                "dateEscompte": "" + $scope.date_valeur,
                                "montant": "" + $scope.montant,
                                "devise": $scope.devise,
                                "dateDebutDemande": "" + $scope.date_debut,
                                "dateFinDemande": "" + $scope.date_fin,
                                "isEnchereAnonyme": $scope.encherea_,
                                "isEnchereMultiple": $scope.encherem_,
                                "dateMaturite": $scope.date_maturite,
                                "tauxMax": "" + $scope.taux_max,
                                "tire": "" + $scope.tireesc,
                                "tireur": "" + $scope.tireuresc,
                                "duree": $scope.nbduree_esc + " " + $scope.dureeesc,
                                "nombreDocument": $scope.selection.length,
                                "product": $scope.idPro
                            },

                            "documents": $scope.selection,
                            "idsBank": $scope.selectionbk
                        };

                        updateEnProduitDemande(idReq, idUser_, objet);
                        $rootScope.$broadcast('adminEnOp', { idReq: idReq, objet: objet });
                    };
                }
                break;

        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        /*MESSAGES */
        $scope.$on('message_err_affich', function(events, args) {
            if (args.statut == 0) {
                $scope.isSuccess = false;
                $modalInstance.close();
            } else {
                $scope.loading = false;
                $scope.isSuccess = true;
                $scope.message = args.msn;
            };
        });
        /*FIN MESSAGES */
    }
]);

app.controller('popUpadminEnOffer', ['$scope', '$rootScope', '$state', '$timeout', '$filter', '$uibModalInstance', '$http', 'menu_start', 'offre_start', 'info_req_start', 'etat_offer', 'etat_validationOffer', 'deconnectApi',
    function($scope, $rootScope, $state, $timeout, $filter, $modalInstance, $http, menu_start, offre_start, info_req_start, etat_offer, etat_validationOffer, deconnectApi) {
        var idUser_ = sessionStorage.getItem('iduser');
        var statut = '';
        var message = '';
        var nb = 0;
        var nb1 = 0;
        $scope.selection = [];
        $scope.items = [];
        $scope.docss = [];
        $scope.offreVisual = offre_start;
        // console.log("offre_start ",offre_start);
        var nomDemande = '' + info_req_start.request.product.nom;
        $scope.loading = false;
        $scope.isSuccess = false;
        $scope.offreWin = etat_offer;
        $scope.validationOffer = etat_validationOffer;
        //console.log("$scope.validationOffer popUpadminEnOffer ",$scope.validationOffer);
        var configs = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jeton')
            }
        };

        if ($scope.$root && !$scope.$root.$$phase) {
            $scope.$apply();
        };

        $scope.toutes = [{
                "id": 22,
                "reponse": "Oui"
            },
            {
                "id": 23,
                "reponse": "Non"
            }
        ];

        $scope.enprcentages = [{
                "id": 24,
                "reponse": "Oui"
            },
            {
                "id": 25,
                "reponse": "Non"
            }
        ];

        $scope.changeDocus = function(a) {
            var idx = $scope.selection.indexOf(a);
            if (idx > -1) {
                $scope.selection.splice(idx, 1);
            } else {
                $scope.selection.push(parseInt(a));
            }
        };

        $scope.choixToutes = function(a) {
            nb = 0;
            for (var i = 0; i < $scope.toutes.length; i++) {
                if ($scope.toutes[i].id == parseInt(a) && $scope.toutes[i].reponse === 'Oui') {
                    nb++;
                    break;
                }
            };

            if (nb != 0) {
                $scope.isToute = true;
                if ($scope.isToute) {
                    if (offre_start.documents.length > 0) {
                        for (var i = 0; i < offre_start.documents.length; i++) {
                            $scope.changeDocus(offre_start.documents[i].idDocuments);
                        };
                    };
                };
            } else {
                $scope.selection = [];
                $scope.isToute = false;
            }
            nb = 0;
        };

        $scope.choixPourcentage = function(a) {
            nb1 = 0;
            for (var i = 0; i < $scope.enprcentages.length; i++) {
                if ($scope.enprcentages[i].id == parseInt(a) && $scope.enprcentages[i].reponse === 'Oui') {
                    nb1++;
                    break;
                }
            };

            if (nb1 != 0) {
                $scope.isToutepr = true;
            } else {
                $scope.isToutepr = false;
            }
            nb1 = 0;
        };

        // if(document.getElementsByClassName("23").length!=0){
        // document.getElementsByClassName("23")[0].click();
        // };

        $scope.tmax = offre_start.offer.demandeIdDemande.tauxMax;
        $scope.tmin = offre_start.offer.demandeIdDemande.tauxMin;
        $scope.cmax = offre_start.offer.demandeIdDemande.coursMax;
        $scope.cmin = offre_start.offer.demandeIdDemande.coursMin;
        $scope.cminmax = offre_start.offer.demandeIdDemande.sens;
        if (offre_start.offer.demandeIdDemande.tauxMax != '' && offre_start.offer.demandeIdDemande.tauxMax != 'null' && offre_start.offer.demandeIdDemande.tauxMax != undefined && offre_start.offer.demandeIdDemande.tauxMax != 'undefined') {
            $scope.taux_max_pro = offre_start.offer.demandeIdDemande.tauxMax;
        };
        if (offre_start.offer.demandeIdDemande.tauxMin != '' && offre_start.offer.demandeIdDemande.tauxMin != 'null' && offre_start.offer.demandeIdDemande.tauxMin != undefined && offre_start.offer.demandeIdDemande.tauxMin != 'undefined') {
            $scope.taux_max_pro = offre_start.offer.demandeIdDemande.tauxMin;
            console.log("$scope.taux_max_pro ", $scope.taux_max_pro);
        };
        if (offre_start.offer.demandeIdDemande.sens === 'Achat' && $scope.cmax != '' && $scope.cmax != 'null' && $scope.cmax != null) {
            $scope.taux_max_pro = offre_start.offer.demandeIdDemande.coursMax;
        };
        if (offre_start.offer.demandeIdDemande.sens === 'Vente' && $scope.cmin != '' && $scope.cmin != 'null' && $scope.cmin != null) {
            $scope.taux_max_pro = offre_start.offer.demandeIdDemande.coursMin;
        };
        $scope.entreprise_ = offre_start.offer.demandeIdDemande.userEntreprise.groupeIdGroupe.institution.nom;
        if (offre_start.offer.demandeIdDemande.dateValeur != '' && offre_start.offer.demandeIdDemande.dateValeur != 'null' && offre_start.offer.demandeIdDemande.dateValeur != undefined && offre_start.offer.demandeIdDemande.dateValeur != 'undefined') {
            $scope.date_v = $filter('date')(offre_start.offer.demandeIdDemande.dateValeur, 'dd/MM/yyyy');
        };
        if (offre_start.offer.demandeIdDemande.dateEscompte != '' && offre_start.offer.demandeIdDemande.dateEscompte != 'null' && offre_start.offer.demandeIdDemande.dateEscompte != undefined && offre_start.offer.demandeIdDemande.dateEscompte != 'undefined') {
            $scope.date_v = $filter('date')(offre_start.offer.demandeIdDemande.dateEscompte, 'dd/MM/yyyy');
        };
        $scope.prdt = offre_start.offer.demandeIdDemande.product.nom;
        $scope.montant_ = offre_start.offer.demandeIdDemande.montant;
        $scope.banque_ = offre_start.offer.userBanqueIdUserBanque.groupeIdGroupe.institution.nom;
        if (offre_start.offer.demandeIdDemande.dateMaturite != null && offre_start.offer.demandeIdDemande.dateMaturite != 'null') {
            $scope.date_mat = offre_start.offer.demandeIdDemande.dateMaturite;
        };

        if (offre_start.offer.demandeIdDemande.isEnchereAnonyme) {
            $scope.enchere_a = 'ENCHÈRE ANONYME';
        } else if (!offre_start.offer.demandeIdDemande.isEnchereAnonyme) {
            $scope.enchere_a = 'ENCHÈRE MULTITOURS';
        };
        if (offre_start.offer.taux != null && offre_start.offer.taux != 'null') {
            $scope.notre_taux = offre_start.offer.taux;
        } else if (offre_start.offer.taux != null && offre_start.offer.taux != 'null') {
            $scope.notre_taux = '';
        };
        $scope.items = offre_start.commissions;
        $scope.docss = offre_start.documents;

        $scope.$watch("taux_max_pro", function(newValue, oldValue) {

        });
        //console.log("OFFRE DOCUMENTS ",offre_start.documents);
        // if(offre_start.documents.length!=0){
        // //console.log("OFFRE DOCUMENTS ",offre_start.documents);
        // $scope.toutes = [
        // {
        // "id": 23,
        // "reponse" : "Oui"
        // }, 
        // {
        // "id": 22,
        // "reponse" : "Non"
        // }
        // ];
        // };
        // $scope.nature_=offre_start.offer.;
        // var msnOffer_selected='Vous avez sélectionné l\'offre '+'OFFRE_'+offre_start.offer.userBanqueIdUserBanque.groupeIdGroupe.institution.nom;
        $scope.offreSelected = function() {
            $scope.loading = true;
            $http({
                method: "POST",
                url: baseUrl + 'mes_operations/entreprise/request/select_offer/' + idUser_ + '/' + info_req_start.request.idDemande + '/' + offre_start.offer.idOffre,
                data: {},
                headers: configs.headers
            }).then(function(response) {
                statut = response.data.status;
                message = response.data.message;
                if (response.data.status == 0) {
                    $modalInstance.close();
                    $rootScope.$broadcast('offreclose', { menu_start: menu_start, offre_start: offre_start, info_req_start: info_req_start });
                } else {
                    $scope.loading = false;
                    $scope.isSuccess = true;
                    $rootScope.$broadcast('message_err', { statut: statut, message: message });
                };
                //console.log("Offre sélectionné avec success ",response);
                $state.reload();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        // //console.log("Sega info_req_start ",info_req_start);
        // //console.log("Sega offre_start ",offre_start);
        // var objectOfferApreValider={
        // offer:{
        // idOffre : offre_start.offer.idOffre,
        // taux : ""+offre_start.offer.taux, 
        // demandeIdDemande : offre_start.offer.demandeIdDemande.idDemande, 
        // userBanqueIdUserBanque : offre_start.offer.userBanqueIdUserBanque.idUtilisateur, 
        // hasDocument : offre_start.offer.hasDocument
        // }, 
        // documents : offre_start.documents, 
        // commissions : offre_start.commissions
        // };
        var objectOfferApreValider = {
            "offer": offre_start.offer.idOffre,
            "idUtilisateur": idUser_
        };
        $scope.pretValidOffer = function() {
            $scope.loading = true;
            $http({
                method: "POST",
                url: baseUrl + 'pre_selection_offer/add/' + idUser_,
                data: objectOfferApreValider,
                headers: configs.headers
            }).then(function(response) {
                statut = response.data.status;
                message = response.data.message;
                if (response.data.status == 0) {
                    $modalInstance.close();
                    $rootScope.$broadcast('offreclose', { menu_start: menu_start, offre_start: offre_start, info_req_start: info_req_start });
                } else {
                    $scope.loading = false;
                    $scope.isSuccess = true;
                    $rootScope.$broadcast('message_err', { statut: statut, message: message });
                };
                //console.log("Offre pré-sélectionnée avec success ",response);
                $state.reload();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        $scope.refusOffer = function() {
            $scope.loading = true;
            $http({
                method: "POST",
                url: baseUrl + 'pre_selection_offer/refuse/' + idUser_,
                data: objectOfferApreValider,
                headers: configs.headers
            }).then(function(response) {
                statut = response.data.status;
                message = response.data.message;
                if (response.data.status == 0) {
                    $modalInstance.close();
                    $rootScope.$broadcast('offreclose', { menu_start: menu_start, offre_start: offre_start, info_req_start: info_req_start });
                } else {
                    $scope.loading = false;
                    $scope.isSuccess = true;
                    $rootScope.$broadcast('message_err', { statut: statut, message: message });
                };
                //console.log("Offre refusée avec success ",response);
                $state.reload();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        /********************JURIDICTION OFFER*************************/
        /***********************GET DOCUMENT INFORMATION***************/
        $scope.isDocClicked = false;
        $scope.src = '';
        $scope.getDocument = function(doc_info) {
            $scope.isDocClicked = true;
            $scope.src = baseDocUrl+''+ doc_info.urlDocument;
        };
        $scope.backDocuments = function() {
            $scope.isDocClicked = false;
        };
        /***********************FIN GET DOCUMENT INFORMATION***************/
        var idGrpe = sessionStorage.getItem("idGrp");

        $scope.preValidSpot = false;
        $scope.preValidCh = false;
        $scope.preValidTr = false;
        $scope.preValidDap = false;
        $scope.preValidEsc = false;
        $scope.loadSelect = false;

        function juridictionsOfferSelected() {
            $scope.loadSelect = true;
            $http({
                method: 'GET',
                url: baseUrl + 'admin/juridiction_groupe/list/groupe/' + idGrpe,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.loadSelect = false;
                // //console.log(response.data.list_juridiction_groupe);
                for (var i = 0; i < response.data.list_juridiction_groupe.length; i++) {
                    switch (response.data.list_juridiction_groupe[i].juridictionId) {
                        case 5:
                            if (nomDemande.indexOf("SPOT") != -1 || nomDemande.indexOf("spot") != -1 || nomDemande.indexOf("Spot") != -1) {
                                $scope.preValidSpot = true;
                            };
                            break;
                        case 2:
                            if (nomDemande.indexOf("CHANGE") != -1 || nomDemande.indexOf("Change") != -1 || nomDemande.indexOf("change") != -1) {
                                $scope.preValidCh = true;
                            };
                            break;
                        case 4:
                            if (nomDemande.indexOf("TRANSFERT") != -1 || nomDemande.indexOf("Transfert") != -1 || nomDemande.indexOf("transfert") != -1) {
                                $scope.preValidTr = true;
                            };
                            break;
                        case 3:
                            if (nomDemande.indexOf("TERME") != -1 || nomDemande.indexOf("Terme") != -1 || nomDemande.indexOf("terme") != -1) {
                                $scope.preValidDap = true;
                            };
                            break;
                        case 1:
                            if (nomDemande.indexOf("ESCOMPTE") != -1 || nomDemande.indexOf("Escompte") != -1 || nomDemande.indexOf("escompte") != -1) {
                                $scope.preValidEsc = true;
                            };
                            break;
                    }
                };
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        juridictionsOfferSelected();
        /********************FIN JURIDICTION OFFER*************************/

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
            $rootScope.$broadcast('offreclose', { menu_start: menu_start, offre_start: offre_start, info_req_start: info_req_start });
        };

        /*MESSAGES */
        $scope.$on('message_err_affich', function(events, args) {
            if (args.statut == 0) {
                $scope.isSuccess = false;
                $modalInstance.close();
            } else {
                $scope.loading = false;
                $scope.isSuccess = true;
                $scope.message = args.msn;
            };
        });
        /*FIN MESSAGES */
    }
]);

app.controller('deletionConfirmEnCtrl', ['$scope', '$rootScope', '$uibModalInstance', 'x', function($scope, $rootScope, $modalInstance, x) {
    $scope.sms = x;

    $scope.confirmDelete = function() {
        $rootScope.$broadcast('confirmdeletionEn', { x: x });
        $modalInstance.close();
    };

    $scope.Ok = function() {
        $modalInstance.close();
        window.location.reload();
        // $rootScope.$apply(function() {
        // //console.log("Rafraîchissement success.");
        // });
    };
    $scope.okNet = function() {
        $modalInstance.close();
    };
    /*POP NOTIFICATION */
    // $scope.$on('fermPopNotif', function(events, args){
    // //console.log("Fermeture reçu ",args.x);
    // $modalInstance.close();
    // });
    /*FIN POP NOTIFICATION*/

    /*POP MESSAGE INTERNET */
    // $scope.$on('message_internet', function(events, args){
    // //console.log("Message reçu ",args.message_);
    // });
    /*FIN POP MESSAGE INTERNET*/

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);

app.controller('deletionConfirmEnGrCtrl', ['$scope', '$rootScope', '$uibModalInstance', 'x', 'listusers', 'deconnectApi',
    function($scope, $rootScope, $modalInstance, x, listusers, deconnectApi) {
        $scope.usersGroupbyId = [];
        $scope.listusers = listusers;
        $scope.isNotNull = false;

        for (var i = 0; i < $scope.listusers.length; i++) {
            if ($scope.listusers[i].groupeIdGroupe.idGroupe == x) {
                $scope.isNotNull = true;
                $scope.usersGroupbyId.push($scope.listusers[i]);
            }
        }

        $scope.confirmDelete = function() {
            $rootScope.$broadcast('confirmdeletionEn', { x: x });
            $modalInstance.close();
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);

angular.module('app').controller('eNadminCtrl', ['$scope', '$http', '$uibModal', '$log', '$rootScope', '$state', '$location', '$timeout', 'deconnectApi',
    function($scope, $http, $modal, $log, $rootScope, $state, $location, $timeout, deconnectApi) {
        var idInstitution = sessionStorage.getItem("idInstitution");
        var idAdmin = sessionStorage.getItem("iduser");
        $scope.listUsers = [];
        $scope.listGroupesUser = [];
        $scope.listProfils = [];
        $scope.listGroupById = [];
        $scope.idAdminBank = 0;
        $scope.idUser = 0;
        $scope.ationSeparator = '';
        $scope.separateurdel = '';
        var message = '';
        var statut = 0;
        $scope.userInfos = null;
        $scope.groupeInfos = null;
        $scope.isuserInsessionLine = 0;
        $scope.juridictionList = [];
        $scope.juridictionList2 = [];
        $scope.juridictionList3 = [];

        //Popup ADMINISTRATION ENTREPRISE
        function popUpconfirmation(x) {
            if (x != undefined) {
                var modalInstance = $modal.open({
                    templateUrl: 'partials/deletionConfirm.html',
                    controller: 'deletionConfirmEnCtrl',
                    resolve: {
                        x: function() {
                            return x;
                        }
                    }
                });
            };

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };

        function popUpconfDelgr(x, listusers) {
            if (x != undefined) {
                var modalInstance = $modal.open({
                    templateUrl: 'partials/admin_entreprise/mes_operations/deleteGroupeEnt.html',
                    controller: 'deletionConfirmEnGrCtrl',
                    resolve: {
                        x: function() {
                            return x;
                        },
                        listusers: function() {
                            return listusers;
                        }
                    }
                });
            };

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };

        function templatepop(template, jch, jescp, jtr, jspot, jdap, juser, jgr, jparam, listProfil, listGroupe, useredit, groupedit, isdetailed, isedited, separator) {
            var modalInstance = $modal.open({
                templateUrl: template,
                controller: 'popeNadminCtrl',
                resolve: {
                    jch: function() {
                        return jch;
                    },
                    jescp: function() {
                        return jescp;
                    },
                    jtr: function() {
                        return jtr;
                    },
                    jspot: function() {
                        return jspot;
                    },
                    jdap: function() {
                        return jdap;
                    },
                    juser: function() {
                        return juser;
                    },
                    jgr: function() {
                        return jgr;
                    },
                    jparam: function() {
                        return jparam;
                    },
                    listProfil: function() {
                        return listProfil;
                    },
                    useredit: function() {
                        return useredit;
                    },
                    groupedit: function() {
                        return groupedit;
                    },
                    isdetailed: function() {
                        return isdetailed;
                    },
                    isedited: function() {
                        return isedited;
                    },
                    separator: function() {
                        return separator;
                    },
                    listGroupe: function() {
                        return listGroupe;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        function popActions(isdetail, isedit) {
            switch ($scope.ationSeparator) {
                case 'INFO-USER':
                    templatepop('partials/admin_entreprise/mes_operations/register_op_adm_rhu.html', $scope.juriductionChange, $scope.juriductionEscom, $scope.juriductionTrans, $scope.juriductionSpot, $scope.juriductionDepot, $scope.juriductionUsers, $scope.juriductionGroup, $scope.juriductionParam, $scope.listProfils, $scope.listGroupesUser, $scope.userInfos, $scope.groupeInfos, isdetail, isedit, $scope.ationSeparator);
                    break;
                case 'UPDATE-USER':
                    templatepop('partials/admin_entreprise/mes_operations/register_op_adm_rhu.html', $scope.juriductionChange, $scope.juriductionEscom, $scope.juriductionTrans, $scope.juriductionSpot, $scope.juriductionDepot, $scope.juriductionUsers, $scope.juriductionGroup, $scope.juriductionParam, $scope.listProfils, $scope.listGroupesUser, $scope.userInfos, $scope.groupeInfos, isdetail, isedit, $scope.ationSeparator);
                    break;
                case 'ADD-GROUPE':
                    templatepop('partials/admin_entreprise/mes_operations/register_op_adm_rhg.html', $scope.juriductionChange, $scope.juriductionEscom, $scope.juriductionTrans, $scope.juriductionSpot, $scope.juriductionDepot, $scope.juriductionUsers, $scope.juriductionGroup, $scope.juriductionParam, $scope.listProfils, $scope.listGroupesUser, $scope.userInfos, $scope.groupeInfos, isdetail, isedit, $scope.ationSeparator);
                    break;
                case 'INFO-GROUPE':
                    templatepop('partials/admin_entreprise/mes_operations/register_op_adm_rhg.html', $scope.juriductionChange, $scope.juriductionEscom, $scope.juriductionTrans, $scope.juriductionSpot, $scope.juriductionDepot, $scope.juriductionUsers, $scope.juriductionGroup, $scope.juriductionParam, $scope.listProfils, $scope.listGroupesUser, $scope.userInfos, $scope.groupeInfos, isdetail, isedit, $scope.ationSeparator);
                    break;
                case 'UPDATE-GROUPE':
                    templatepop('partials/admin_entreprise/mes_operations/register_op_adm_rhg.html', $scope.juriductionChange, $scope.juriductionEscom, $scope.juriductionTrans, $scope.juriductionSpot, $scope.juriductionDepot, $scope.juriductionUsers, $scope.juriductionGroup, $scope.juriductionParam, $scope.listProfils, $scope.listGroupesUser, $scope.userInfos, $scope.groupeInfos, isdetail, isedit, $scope.ationSeparator);
                    break;
                case 'JURIDICTION':
                    templatepop('partials/admin_entreprise/mes_operations/juridictionEntreprise.html', $scope.juriductionChange, $scope.juriductionEscom, $scope.juriductionTrans, $scope.juriductionSpot, $scope.juriductionDepot, $scope.juriductionUsers, $scope.juriductionGroup, $scope.juriductionParam, $scope.listProfils, $scope.listGroupesUser, $scope.userInfos, $scope.groupeInfos, isdetail, isedit, $scope.ationSeparator);
                    break;
            };
        };
        //FIN Popup ADMINISTRATION ENTREPRISE
        /*************************JURIDICTIONS GROUPE*****************************/
        function listJuridictions() {
            $http({
                method: 'GET',
                url: baseUrl + '/admin/juridictions/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                //console.log("Liste totale des juridictions ",response.data.list_juridictions);
                for (var i = 0; i < response.data.list_juridictions.length; i++) {
                    if (response.data.list_juridictions[i].id <= 26) {
                        $scope.juridictionList.push(response.data.list_juridictions[i]);
                    };
                    if (response.data.list_juridictions[i].id > 26 &&
                        response.data.list_juridictions[i].id <= 52) {
                        $scope.juridictionList2.push(response.data.list_juridictions[i]);
                    };
                    if (response.data.list_juridictions[i].id > 52) {
                        $scope.juridictionList3.push(response.data.list_juridictions[i]);
                    };
                };
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        // listJuridictions();

        /*******New juridiction Entreprise**********/
        $scope.juriductionChange = [];
        $scope.juriductionEscom = [];
        $scope.juriductionSpot = [];
        $scope.juriductionTrans = [];
        $scope.juriductionDepot = [];
        $scope.juriductionUsers = [];
        $scope.juriductionGroup = [];
        $scope.juriductionParam = [];

        $scope.listJuridictionEntr = [];

        function listJuridictionsEntreprise() {
            $http({
                method: 'GET',
                url: baseUrl + '/admin/juridictions/list/' + idAdmin,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.listJuridictionEntr = response.data.list_juridictions;
                // //console.log("$scope.listJuridictionEntr ",$scope.listJuridictionEntr);
                $scope.juriductionChange = $scope.listJuridictionEntr.filter(function(jurdic) {
                    return jurdic.groupage == 'change';
                });
                // //console.log($scope.juriductionChange);
                $scope.juriductionEscom = $scope.listJuridictionEntr.filter(function(jurdic) {
                    return jurdic.groupage == 'escompte';
                });
                $scope.juriductionTrans = $scope.listJuridictionEntr.filter(function(jurdic) {
                    return jurdic.groupage == 'transfert';
                });
                $scope.juriductionSpot = $scope.listJuridictionEntr.filter(function(jurdic) {
                    return jurdic.groupage == 'spot';
                });
                $scope.juriductionDepot = $scope.listJuridictionEntr.filter(function(jurdic) {
                    return jurdic.groupage == 'dépôt à terme';
                });
                // $scope.juriductionUsers = $scope.listJuridictionEntr.filter(function(jurdic) {
                // return jurdic.groupage == 'utilisateur';
                // });
                $scope.juriductionGroup = $scope.listJuridictionEntr.filter(function(jurdic) {
                    return jurdic.groupage == 'groupe';
                });
                $scope.juriductionParam = $scope.listJuridictionEntr.filter(function(jurdic) {
                    return jurdic.groupage == 'chaine de validation';
                });

            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listJuridictionsEntreprise();
        /*******End New juridiction**********/

        /*************************FIN JURIDICTIONS GROUPE*****************************/
        /********************Debut des juridictions enAdmin Rh*************************/
        var idGrp = sessionStorage.getItem("idGrp");

        $scope.addGroupe = false;
        $scope.editGroupe = false;
        $scope.suppGroupe = false;
        $scope.editUtilisateur = false;

        function juridictionsUserSessionEntrepriseRh() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/juridiction_groupe/list/groupe/' + idGrp,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                // //console.log(response.data.list_juridiction_groupe);
                for (var i = 0; i < response.data.list_juridiction_groupe.length; i++) {
                    switch (response.data.list_juridiction_groupe[i].juridictionId) {
                        case 22:
                            $scope.addEscom = true;
                            break;
                        case 23:
                            $scope.editEscom = true;
                            break;
                        case 24:
                            $scope.suppEscom = true;
                            break;
                        case 25:
                            $scope.addChang = true;
                            break;
                    }

                };
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        // juridictionsUserSessionEntrepriseRh();

        $scope.$watch('addGroupe', function(l1, l2) {
            $scope.addGroupe = $scope.addGroupe;
            $scope.editGroupe = $scope.editGroupe;
            $scope.suppGroupe = $scope.suppGroupe;
            $scope.editUtilisateur = $scope.editUtilisateur;
        });
        /********************Fin des juridictions enAdmin Rh************************/
        /*LISTE DES UTILISATEURS*/
        function listUsersAdmin() {
            $scope.isDataUserReady = false;
            $http({
                method: 'GET',
                url: baseUrl + 'admin/user_entreprise/list/' + idInstitution + '/' + idAdmin,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.listUsers = response.data.entreprise_users_list;
                for (var i = 0; i < $scope.listUsers.length; i++) {
                    if ($scope.listUsers[i].idUtilisateur == sessionStorage.getItem("iduser")) {
                        $scope.isuserInsessionLine = i;
                        break;
                    };
                };
                $scope.isDataUserReady = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listUsersAdmin();
        /*FIN LISTE DES UTILISATEURS*/

        /*LISTE DES GROUPES DE L'UTILISATEUR*/
        function listGroupesUser() {
            $scope.isDataGrReady = false;
            $http({
                method: 'GET',
                url: baseUrl + 'admin/groupe/admin_entreprise/list/' + idAdmin,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.listGroupesUser = response.data.group_list;
                $scope.isDataGrReady = true;
                // //console.log("listGroupesUser ",$scope.listGroupesUser);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listGroupesUser();
        /*FIN LISTE DES GROUPES DE L'UTILISATEUR**/

        /*LISTE DES ENTREPRISES*/
        function listEntreprise() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/entreprise/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.entrepriseList = response.data.entreprise_list;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }
        listEntreprise();
        /*FIN DES ENTREPRISES*/

        //LIST DES PROFILES BANQUES
        function listProfiles() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/profile/list/' + idAdmin,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                for (var i = 0; i < response.data.profile_list.length; i++) {
                    if (response.data.profile_list[i].type === 'ADMIN_ENTREPRISE' || response.data.profile_list[i].type === 'USER_HABILITY') {
                        $scope.listProfils.push(response.data.profile_list[i]);
                    };
                };
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listProfiles();
        //FIN LISTE DES PROFILES BANQUES

        /*INFORTIONS UTILISATEUR*/
        $scope.detailUserAdminEn = function(user) {
            $scope.ationSeparator = 'INFO-USER';
            $scope.userInfos = user;
            popActions(true, null);
        };
        /*FIN INFORTIONS UTILISATEUR*/

        /*FIN UPDATE UTILISATEURS*/
        $scope.updateUserAdmin = function(user) {
            $scope.ationSeparator = 'UPDATE-USER';
            $scope.userInfos = user;
            popActions(false, false);
        };

        function updateUserAdmin(user) {
            $http({
                method: "PUT",
                url: baseUrl + 'admin/user_entreprise/update/' + idAdmin,
                data: user,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function(response) {
                statut = response.data.status;
                message = response.data.message;
                if (response.data.status == 0) {
                    $rootScope.$broadcast('message_err', { statut: statut, message: message });
                } else {
                    $rootScope.$broadcast('message_err', { statut: statut, message: message });
                };
                listUsersAdmin();
                // $state.reload();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        /*FIN UPDATE UTILISATEURS*/

        /*DELETE UTILISATEURS*/
        $scope.deleteUserAdminEn = function(user) {
            $scope.separateurdel = 'DEL-USER';
            popUpconfirmation(user.idUtilisateur);
        };

        function deleteUserAdmin(idutilisateur) {
            $http({
                method: 'DELETE',
                url: baseUrl + 'admin/user_entreprise/delete/' + idAdmin + '/' + idutilisateur,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                //console.log("Suppression avec succès ",response);
                for (var i = 0; i < $scope.listUsers.length; i++) {
                    if ($scope.listUsers[i].idUtilisateur == idutilisateur) {
                        //console.log("Suppression User EN OK ",response);
                        $scope.listUsers.splice(i, 1);
                        break;
                    };
                };
                $state.reload();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        /*FIN DELETE UTILISATEURS*/

        /*ADD GROUPE UTILISATEURS*/
        $scope.addenToadMrHg = function() {
            $scope.ationSeparator = 'ADD-GROUPE';
            popActions(false, true);
        };

        function addenToadMrHg(groupe) {
            switch ($scope.ationSeparator) {
                case 'ADD-GROUPE':
                    $http({
                        method: "POST",
                        url: baseUrl + 'admin/groupe/admin_entreprise/add/' + idAdmin,
                        data: groupe,
                        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
                    }).then(function(response) {
                        statut = response.data.status;
                        message = response.data.message;
                        if (response.data.status == 0) {
                            $rootScope.$broadcast('message_err', { statut: statut, message: message });
                        } else {
                            $rootScope.$broadcast('message_err', { statut: statut, message: message });
                        };
                        // listUsersAdmin();
                        $state.reload();
                    }).catch(function(err) {
                        if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                            deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                                $location.url('/access/login');
                                $state.go('access.login');
                            }).catch(function(response) {});
                        };
                    });
                    break;
                case 'UPDATE-GROUPE':
                    $http({
                            method: "PUT",
                            url: baseUrl + 'admin/groupe/admin_entreprise/update/' + idAdmin,
                            data: groupe,
                            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
                        })
                        .then(function(response) {
                            statut = response.data.status;
                            message = response.data.message;
                            if (response.data.status == 0) {
                                //console.log("Update groupe success ",response.data);
                                $rootScope.$broadcast('message_err', { statut: statut, message: message });
                            } else {
                                $rootScope.$broadcast('message_err', { statut: statut, message: message });
                            };
                            // listUsersAdmin();
                            $state.reload();
                        }).catch(function(err) {
                            if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                                deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                                    $location.url('/access/login');
                                    $state.go('access.login');
                                }).catch(function(response) {});
                            };
                        });
                    break;
            }
        };
        $scope.detailGrAdminEn = function(groupe) {
            $scope.ationSeparator = 'INFO-GROUPE';
            $scope.groupeInfos = groupe;
            popActions(true, null);
        };
        $scope.updateGrAdmin = function(groupe) {
            $scope.ationSeparator = 'UPDATE-GROUPE';
            $scope.groupeInfos = groupe;
            popActions(false, false);
        };
        $scope.deleteGrAdminEn = function(groupe) {
            $scope.separateurdel = 'DEL-GROUPE';
            $scope.groupeInfos = groupe;
            // popUpconfirmation(groupe.idGroupe);
            popUpconfDelgr(groupe.idGroupe, $scope.listUsers);
        };

        function deleteGrAdminEn(idgroupe) {
            $http({
                method: 'DELETE',
                url: baseUrl + 'admin/groupe/admin_entreprise/delete/' + idAdmin + '/' + idgroupe,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                for (var i = 0; i < $scope.listGroupesUser.length; i++) {
                    if ($scope.listGroupesUser[i].idGroupe == idgroupe) {
                        //console.log("Suppression Groupe EN OK ",response);
                        $scope.listGroupesUser.splice(i, 1);
                        break;
                    };
                };
                $state.reload();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        /*FIN ADD GROUPE UTILISATEURS*/

        /*JURIDICTIONS*/
        $scope.openJuridiction = function(groupe) {
            $scope.ationSeparator = 'JURIDICTION';
            $scope.groupeInfos = groupe;
            popActions(false, true);
        };

        function addJuridictions(groupe) {
            $http({
                method: "POST",
                url: baseUrl + "admin/juridiction_groupe/add/" + idAdmin,
                data: groupe,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function(response) {
                //console.log("JURIDICTION1 success ",response.data);
                statut = response.data.status;
                message = response.data.message;
                if (response.data.status == 0) {
                    //console.log("JURIDICTION success ",response.data);
                    $rootScope.$broadcast('message_err', { statut: statut, message: message });
                } else {
                    $rootScope.$broadcast('message_err', { statut: statut, message: message });
                };
                $state.reload();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function updateJuridictions(groupe) {
            $http({
                method: "PUT",
                url: baseUrl + "admin/juridiction_groupe/update/" + idAdmin,
                data: groupe,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function(response) {
                //console.log("Update JURIDICTION1 success ",response.data);
                statut = response.data.status;
                message = response.data.message;
                if (response.data.status == 0) {
                    //console.log("Update JURIDICTION success ",response.data);
                    $rootScope.$broadcast('message_err', { statut: statut, message: message });
                } else {
                    $rootScope.$broadcast('message_err', { statut: statut, message: message });
                };
                $state.reload();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        /*FIN JURIDICTIONS*/

        //OPERATIONS ADMINISTRATION ENTREPRISE
        $scope.$on('eNadminCtrl', function(events, args) {
            switch ($scope.ationSeparator) {
                case 'UPDATE-USER':
                    updateUserAdmin(args.objet);
                    break;
                case 'ADD-GROUPE':
                    addenToadMrHg(args.objet);
                    break;
                case 'UPDATE-GROUPE':
                    addenToadMrHg(args.objet);
                    break;
                case 'JURIDICTION':
                    // //console.log("Update2JURIDICTION ",args);
                    if (args.smsj != 'update') {
                        // //console.log("Update2JURIDICTION1 ",args);
                        addJuridictions(args.objet);
                    } else {
                        // //console.log("Update2JURIDICTION2 ",args);
                        updateJuridictions(args.objet);
                    };
                    break;
            }
        });
        $scope.$on('confirmdeletionEn', function(events, args) {
            // //console.log($scope.separateurdel!=''&&$scope.separateurdel!=null&&$scope.separateurdel!=undefined)
            if ($scope.separateurdel != '' && $scope.separateurdel != null && $scope.separateurdel != undefined) {
                switch ($scope.separateurdel) {
                    case 'DEL-USER':
                        deleteUserAdmin(args.x);
                        break;
                    case 'DEL-GROUPE':
                        deleteGrAdminEn(args.x);
                        break;
                }
            };
        });
        //FIN OPERATIONS ADMINISTRATION ENTREPRISE
    }
]);
app.controller('popeNadminCtrl', ['$scope', '$rootScope', '$http', '$uibModalInstance', 'jch', 'jescp', 'jtr', 'jspot', 'jdap', 'juser', 'jgr', 'jparam', 'listProfil', 'listGroupe', 'useredit', 'groupedit', 'isdetailed', 'isedited', 'separator', 'deconnectApi',
    function($scope, $rootScope, $http, $modalInstance, jch, jescp, jtr, jspot, jdap, juser, jgr, jparam, listProfil, listGroupe, useredit, groupedit, isdetailed, isedited, separator, deconnectApi) {
        var idInstitution = sessionStorage.getItem("idInstitution");
        $scope.listProfils = listProfil;
        // //console.log("$scope.listProfils ",$scope.listProfils);
        $scope.listGroupesUser = listGroupe;
        // //console.log("$scope.listGroupesUser ",$scope.listGroupesUser);
        $scope.detailUser = useredit;
        // //console.log("$scope.detailUser ",$scope.detailUser);
        $scope.detailGroupe = groupedit;
        // //console.log("$scope.detailGroupe ",$scope.detailGroupe);
        $scope.boolDetail = isdetailed;
        $scope.boolEdit = isedited;
        $scope.isSuccess = false;
        var idGroupe = 0;
        var idGroupe2 = 0;
        // $scope.juridictionList= j1;
        // $scope.juridictionList2= j2;
        // $scope.juridictionList3= j3;
        $scope.juriductionChange = jch;
        $scope.juriductionEscom = jescp;
        $scope.juriductionTrans = jtr;
        $scope.juriductionSpot = jspot;
        $scope.juriductionDepot = jdap;
        $scope.juriductionUsers = juser;
        $scope.juriductionGroup = jgr;
        $scope.juriductionParam = jparam;
        $scope.selectionb = [];
        $scope.phoneNumbr = /^\+?\d{1,15}$/;
        $scope.loading = false;
        $scope.isSelectionTrue = false;
        //VARIABLE BOOLEAN Juridiction
        // $scope.addSpot =false;
        // $scope.editSpot =false;
        // $scope.suppSpot =false;

        // $scope.addChang =false;
        // $scope.editChang =false;
        // $scope.suppChang =false;

        // $scope.addTrans =false;
        // $scope.editTrans =false;
        // $scope.suppTrans =false;

        // $scope.addDepot =false;
        // $scope.editDepot =false;
        // $scope.suppDepot =false;

        // $scope.addEscom =false;
        // $scope.editEscom =false;
        // $scope.suppEscom =false;
        //FIN VARIABLE BOOLEAN Juridiction

        /* show telephones numbers */
        $scope.showErrorNumbTm = function(data) {
            $scope.isErrorTm = false;
            if (data == 0 || data < 0)
                $scope.isErrorTm = true;
        };
        $scope.showErrorNumbTf = function(data) {
            $scope.isErrorTf = false;
            if (data == 0 || data < 0)
                $scope.isErrorTf = true;
        };
        /*FIN show telephones numbers */
        /*CHANGEMENT ENTREPRISE*/
        $scope.$on('selectindex', function(events, args) {
            if (args.index > 0) {
                idGroupe2 = $scope.listGroupesUser[args.index - 1].idGroupe;
            };
        });
        $scope.changeGroupe = function(a) {
            if (idGroupe == 0) {
                for (var i = 0; i < $scope.listGroupesUser.length; i++) {
                    if ($scope.listGroupesUser[i].idGroupe == $scope.detailUser.groupeIdGroupe.idGroupe) {
                        idGroupe = $scope.listGroupesUser[i].idGroupe;
                        break;
                    };
                }
            } else {
                idGroupe = idGroupe2;
                idGroupe2 = 0;
            };
        };
        // $scope.changeProfil = function(a){

        // };
        /*FIN CHANGEMENT ENTREPRISE*/

        /*SELECTION DE JURIDICTION*/
        $scope.changeJuridiction = function(a) {
            // //console.log("Juridiction.id ",a);
            $scope.isSelectionTrue = true;
            var idx = $scope.selectionb.indexOf(a);
            if (idx > -1) {
                $scope.selectionb.splice(idx, 1);
            } else {
                $scope.selectionb.push(parseInt(a));
            }
            // //console.log("La longueur est ",$scope.selectionb.length);
        };
        /*FIN SELECTION DE JURIDICTION*/

        /*FUNCTION JURIDICTION BY GROUPE*/
        function juridictionByGroupe() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/juridiction_groupe/list/groupe/' + $scope.detailGroupe.idGroupe,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                // //console.log("juridictionByGroupe ",response.data.list_juridiction_groupe);
                $scope.selectionb = [];
                for (var i = 0; i < response.data.list_juridiction_groupe.length; i++) {
                    $scope.changeJuridiction(response.data.list_juridiction_groupe[i].juridictionId);
                    // switch(response.data.list_juridiction_groupe[i].juridictionId){
                    // case 49 :
                    // $scope.addSpot =true;
                    // break;
                    // case 50 :
                    // $scope.editSpot =true;
                    // break;
                    // case 51 :
                    // $scope.suppSpot =true;
                    // break;
                    // case 40 :
                    // $scope.addChang =true;
                    // break;
                    // case 41 :
                    // $scope.editChang =true;
                    // break;
                    // case 42 :
                    // $scope.suppChang =true;
                    // break;
                    // case 46 :
                    // $scope.addTrans =true;
                    // break;
                    // case 47 :
                    // $scope.editTrans =true;
                    // break;
                    // case 48 :
                    // $scope.suppTrans =true;
                    // break;
                    // case 43 :
                    // $scope.addDepot =true;
                    // break;
                    // case 44 :
                    // $scope.editDepot =true;
                    // break;
                    // case 45 :
                    // $scope.suppDepot =true;
                    // break;
                    // case 37 :
                    // $scope.addEscom =true;
                    // break;
                    // case 38 :
                    // $scope.editEscom =true;
                    // break;
                    // case 39 :
                    // $scope.suppEscom =true;
                    // break;
                    // }

                };
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        if ($scope.detailGroupe != null && $scope.detailGroupe != undefined) {
            juridictionByGroupe();
        };
        /*FIN FUNCTION JURIDICTION BY GROUPE*/
        // //console.log("separator ",separator);
        $scope.$watch("selectionb", function(newValue, oldValue) {
            // //console.log("$scope.selectionbnewValue ",newValue);
            $scope.selectionb = $scope.selectionb;
            if (newValue.length != 0) {
                $scope.addJuridictions = function() {
                    $scope.loading = true;
                    var smsj = 'update';
                    var objet = {
                        "idGroupes": parseInt($scope.detailGroupe.idGroupe),
                        "idJuridiction": $scope.selectionb
                    };

                    $scope.selectionb = [];
                    $rootScope.$broadcast('eNadminCtrl', { smsj: smsj, objet: objet });
                };
            };
            if ($scope.$root && !$scope.$root.$$phase) {
                $scope.$apply();
            };
        });
        switch (separator) {
            case 'INFO-USER':
                $scope.prenom = $scope.detailUser.prenom;
                $scope.nom = $scope.detailUser.nom;
                $scope.telmobile = parseInt($scope.detailUser.telephone);
                if ($scope.detailUser.telephoneFixe == null || $scope.detailUser.telephoneFixe == undefined) {
                    $scope.telfixe = '';
                } else {
                    $scope.telfixe = parseInt($scope.detailUser.telephoneFixe);
                };
                $scope.email = $scope.detailUser.email;
                $scope.login_ = $scope.detailUser.login;
                // $scope.profil_u=$scope.detailUser.profilIdProfil.type;
                $scope.groupe = $scope.detailUser.groupeIdGroupe.nom;

                break;
            case 'UPDATE-USER':
                $scope.prenom = $scope.detailUser.prenom;
                $scope.nom = $scope.detailUser.nom;
                $scope.telmobile = parseInt($scope.detailUser.telephone);
                if ($scope.detailUser.telephoneFixe == null || $scope.detailUser.telephoneFixe == undefined) {
                    $scope.telfixe = '';
                } else {
                    $scope.telfixe = parseInt($scope.detailUser.telephoneFixe);
                };
                $scope.email = $scope.detailUser.email;
                $scope.login_ = $scope.detailUser.login;
                // $scope.profil_u=$scope.detailUser.profilIdProfil.type;
                $scope.groupe = $scope.detailUser.groupeIdGroupe.nom;

                $scope.changeGroupe($scope.groupe);

                $scope.updateUserAdmin = function(prenom, nom, telmobile, telfixe, email, login_, groupe) {
                    $scope.loading = true;
                    var objet = null;
                    if (telfixe === undefined || telfixe === NaN || telfixe == null || telfixe === '') {
                        telfixe = null;
                    };
                    if (telfixe == null) {
                        objet = {
                            "idUtilisateur": $scope.detailUser.idUtilisateur,
                            "prenom": "" + prenom,
                            "nom": "" + nom,
                            "telephone": "+" + telmobile,
                            "telephoneFixe": telfixe,
                            "email": "" + email,
                            "login": "" + login_,
                            "groupeIdGroupe": idGroupe

                        };
                    } else {
                        objet = {
                            "idUtilisateur": $scope.detailUser.idUtilisateur,
                            "prenom": "" + prenom,
                            "nom": "" + nom,
                            "telephone": "+" + telmobile,
                            "telephoneFixe": "+" + telfixe,
                            "email": "" + email,
                            "login": "" + login_,
                            "groupeIdGroupe": idGroupe

                        };
                    };
                    $rootScope.$broadcast('eNadminCtrl', { objet: objet });
                };
                break;
            case 'ADD-GROUPE':
                $scope.addGrAdminEn = function(code, libelle) {
                    $scope.loading = true;
                    var objet = {
                        "nom": "" + code,
                        "description": "" + libelle,
                        "institution": parseInt(idInstitution)

                    };

                    $rootScope.$broadcast('eNadminCtrl', { objet: objet });
                };

                break;
            case 'INFO-GROUPE':
                $scope.code = $scope.detailGroupe.nom;
                $scope.libelle = $scope.detailGroupe.description;
                break;
            case 'UPDATE-GROUPE':
                $scope.code = $scope.detailGroupe.nom;
                $scope.libelle = $scope.detailGroupe.description;

                $scope.addGrAdminEn = function(code, libelle) {
                    $scope.loading = true;
                    var objet = {
                        "nom": "" + code,
                        "description": "" + libelle,
                        "idGroupe": parseInt($scope.detailGroupe.idGroupe),
                        "institution": parseInt(idInstitution)

                    };

                    $rootScope.$broadcast('eNadminCtrl', { objet: objet });
                };

                break;
            case 'JURIDICTION':
                // //console.log("$scope.detailGroupe.idGroupe ",$scope.detailGroupe.idGroupe);
                // //console.log("$scope.selectionb ",$scope.selectionb);
                // //console.log("$scope.selectionb ",$scope.selectionb.length);
                $scope.addJuridictions = function() {
                    $scope.loading = true;
                    var objet = {
                        "idGroupes": parseInt($scope.detailGroupe.idGroupe),
                        "idJuridiction": $scope.selectionb
                    };

                    $scope.selectionb = [];
                    $rootScope.$broadcast('eNadminCtrl', { objet: objet });
                };
                // if($scope.selectionb.length==0){
                // $scope.addJuridictions=function(){
                // $scope.loading=true;
                // var objet={
                // "idGroupes":parseInt($scope.detailGroupe.idGroupe),
                // "idJuridiction":$scope.selectionb
                // };

                // $scope.selectionb=[];
                // $rootScope.$broadcast('eNadminCtrl', {objet : objet});
                // };
                // }else{
                // //console.log("Update1");
                // $scope.addJuridictions=function(){
                // $scope.loading=true;
                // var smsj='update';
                // var objet={
                // "idGroupes":parseInt($scope.detailGroupe.idGroupe),
                // "idJuridiction":$scope.selectionb
                // };

                // $scope.selectionb=[];
                // $rootScope.$broadcast('eNadminCtrl', {smsj : smsj,objet : objet});
                // };
                // };

                break;
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        /*MESSAGES */
        $scope.$on('message_err_affich', function(events, args) {
            if (args.statut == 0) {
                $scope.isSuccess = false;
                $modalInstance.close();
            } else {
                $scope.loading = false;
                $scope.isSuccess = true;
                $scope.message = args.msn;
            };
        });
        /*FIN MESSAGES */
    }
]);
/*******************************************************************************************************************
 ********************************************************************************************************************
 *******************************FIN ENTREPRISE ADMINISTRATION**************************************************************
 ********************************************************************************************************************/

/*************************ADMIN ENTREPRISE CONTROLLER**********************************/
angular.module('app').controller('EnAdminController', ['$scope', '$http', '$uibModal', '$log', '$rootScope', '$state', '$location', '$timeout', 'deconnectApi',
    function($scope, $http, $modal, $log, $rootScope, $state, $location, $timeout, deconnectApi) {

        /*************************LIST DES VALIDATION**********************************/

        $scope.validationLevelList = [];
        $scope.validationLevel = { sens: '', nombreValidation: '', productsIdProduits: -1 };
        var idADmin = sessionStorage.getItem("iduser");

        function listValidationLevel() {
            $scope.isReadyDataBkvalidationLevelList = false;
            $http({
                method: 'GET',
                url: baseUrl + 'validation_level/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.validationLevelList = response.data.list_validation_level;
                ////console.log($scope.validationLevelList);
                $scope.isReadyDataBkvalidationLevelList = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }
        $scope.submitValidationLevel = function() {
            // $scope.validationLevel.sens="demande";
            $scope.validationLevel.productsIdProduits = $scope.produit;
            $scope.validationLevel.nombreValidation = $scope.nb_validation;
            $http({
                method: "POST",
                url: baseUrl + 'validation_level/add/' + idADmin,
                data: $scope.validationLevel,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function(response) {
                $scope.validationLevelList.push(response.data.validationLevel);
                $state.reload();
                // listValidationLevel();
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };


        // listValidationLevel();

        function listProduits() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/product/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.etreasuryProduit = response.data.list_products;
                //$log.info($scope.etreasuryProduit);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        listProduits();
    }
]);
/************************* FIN ADMIN ENTREPRISE CONTROLLER**********************************/


/*************************ADMIN BANK CONTROLLER**********************************/

angular.module('app').controller('BkAdminController', ['$scope', '$http', '$interval', '$uibModal', '$log', '$rootScope', '$state', '$location', '$timeout', 'deconnectApi',
    function($scope, $http, $interval, $modal, $log, $rootScope, $state, $location, $timeout, deconnectApi) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitut = sessionStorage.getItem("idInstitution");

        //			/**********************USER & GROUP BANK********************************/
        //
        //			$scope.bankUsers=[];
        //
        //			function listUsersBank(){
        //				$scope.isDataReadyBkbankUsers=false;
        //				$http({
        //					method : 'GET',
        //					url :baseUrl+'/admin/user_bank/list/'+idInstitut+'/'+idADmin
        //				}).then(function successCallback(response) {
        //					$scope.bankUsers = response.data.bank_users_list;
        //					////console.log($scope.bankUsers);
        //					$scope.isDataReadyBkbankUsers=true;
        //				}, function errorCallback(response) {
        //					//console.log(response.statusText);
        //				});
        //			};
        //			listUsersBank();
        //
        //			$scope.bankGrps=[];
        //
        //			function listGrpeBank(){
        //				$scope.isReadyDataBkbankGrps=false;
        //				$http({
        //					method : 'GET',
        //					url :baseUrl+'/admin/groupe/admin_banque/list/'+idADmin
        //				}).then(function successCallback(response) {
        //					$scope.bankGrps = response.data.group_list;
        //					////console.log($scope.bankGrps);
        //					$scope.isReadyDataBkbankGrps=true;
        //				}, function errorCallback(response) {
        //					//console.log(response.statusText);
        //				});
        //			};
        //			listGrpeBank();
        //
        //			$scope.editUserBank = function (users) {
        //				//$scope.idLocality = locality.idLocalite;
        //				var modalInstance = $modal.open({
        //					templateUrl: 'partials/admin_banque/updateUserBank.html',
        //					controller: 'popupBkUserController',
        //					resolve: {
        //						selectedRow : function () {
        //							return users;
        //						}
        //					}
        //				});
        //
        //			};
        //
        //			$scope.suppUserBank = function (users) {
        //				var modalInstance = $modal.open({
        //					templateUrl: 'partials/admin_banque/deleteUserBank.html',
        //					controller: 'popupBkUserController',
        //					resolve: {
        //						selectedRow : function () {
        //							return users;
        //						}
        //					}
        //				});
        //
        //			};
        //
        //			/**********************FIN USER BANK****************************/
        //
        //			/*************************GROUP BANK****************************/
        //			$scope.addbKGroupe = function () {
        //				$scope.idGrpe=-1;
        //				var modalInstance = $modal.open({
        //					templateUrl: 'partials/admin_banque/register_op_adm_rhg.html',
        //					controller: 'popupBkUserController',
        //					resolve: {
        //						selectedRow: function () {
        //							return $scope.items;
        //						}
        //					}
        //				});
        //
        //				modalInstance.result.then(function (selectedItem) {
        //					$scope.selected = selectedItem;
        //				}, function () {
        //					$log.info('Modal dismissed at: ' + new Date());
        //				});
        //			};
        //
        //			$scope.editGroupeBank = function (groups) {
        //				$scope.idGrpe = groups.idGroupe;
        //				var modalInstance = $modal.open({
        //					templateUrl: 'partials/admin_banque/register_op_adm_rhg.html',
        //					controller: 'popupBkUserController',
        //					resolve: {
        //						selectedRow : function () {
        //							return groups;
        //						}
        //					}
        //				});
        //
        //			};
        //			$scope.suppGroupBank = function (groups) {
        //				var modalInstance = $modal.open({
        //					templateUrl: 'partials/admin_banque/deleteGroupeBank.html',
        //					controller: 'popupBkUserController',
        //					resolve: {
        //						selectedRow : function () {
        //							return groups;
        //						}
        //					}
        //				});
        //
        //			};
        //
        //			$scope.openJuridiction = function (groups) {
        //				var modalInstance = $modal.open({
        //					templateUrl: 'partials/admin_banque/juridiction.html',
        //					controller: 'popupBkUserController',
        //					resolve: {
        //						selectedRow: function () {
        //							return groups;
        //						}
        //					}
        //				});
        //
        //				modalInstance.result.then(function (selectedItem) {
        //					$scope.selected = selectedItem;
        //				}, function () {
        //					$log.info('Modal dismissed at: ' + new Date());
        //				});
        //			};
        //			/*************************FIN GROUP BANK************************/
    }
]);
/************************* FIN ADMIN BANK CONTROLLER**********************************/

/*REVERSE */
angular.module('app').filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});
/*FIN REVERSE*/
// INTERNET CHECK SERVICE
// angular.module('app').service('Internet', function($http){
// this.IsOk = function () {
// return $http({ method: 'HEAD', url: '/' + window.location.hostname + "/?rand=" + Math.floor((1 + Math.random()) * 0x10000) })
// .then(function(response) {
// var status = response.status;
// return status >= 200 && status < 300 || status === 304;
// });
// }
// });
app.filter('trusted', ['$sce', function($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);