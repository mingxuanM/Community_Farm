angular.module('app.controllers', [])// This JavaScript file contains all controllers for each template

.controller('volunteersCtrl', ['$scope', '$stateParams', // The following is the constructor function for home page's controller.
function ($scope, $stateParams) {

}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for side menu's controller.
function ($scope, $stateParams) {


}])

.controller('administraterLoginCtrl', ['$scope', '$stateParams', // The following is the constructor function for administrator Login's controller.
function ($scope, $stateParams) {
    $scope.admin = {}; // This variable group holds the password submitted from the form.
    $scope.log=false; // This variable tells the page whether the administrator is signed in or not.
    $scope.error=false; // This variable tells the page whether the password is wrong or not.

    // This function take the password from the page input to compare to the stored password and decide whether to log in.
    $scope.login = function(){
        if ($scope.admin.password=="1234567"){
            $scope.log= true;
            $scope.error=false;
        } else {
            $scope.error=true;
        }
    }

    // This function logs the administrator out.
    $scope.logout = function(){
        $scope.log= false;
        $scope.error=false;
        $scope.admin.password=null;
    }

}])

.controller('signInCtrl', ['$scope', '$stateParams', 'Database',// The following is the constructor function for volunteers sign in page's controller.
function ($scope, $stateParams, Database) {

    $scope.signedin = false; // This variable holds the situation whether the volunteer has signed in.
    $scope.user = {}; // This variable group holds the first name of volunteer from the page input.
    $scope.lastNames = Database.findLastName($scope.user); //This variable takes the first name into findLastName function in Database factory and return found matching last names.

    // This function takes the first name into findLastName function in Database factory return found matching last names.
    $scope.findLastName = function() {
        $scope.lastNames =  Database.findLastName($scope.user);
    }

    // This function takes the first & last names into signin function in Database factory.
    $scope.signin = function() {
        Database.signin($scope.user);

        $scope.signedin = true;

    }


}])

.controller('signOutCtrl', ['$scope', '$stateParams', 'Database', // The following is the constructor function for volunteers sign out  page's controller.
function ($scope, $stateParams, Database) {

    $scope.signedin = false; // This variable holds the situation whether the volunteer has signed out, because it is using the same functions, the names remains as sign in.
    $scope.user = {}; // This variable group holds the first name of volunteer from the page input.
    $scope.lastNames = Database.findLastName($scope.user); //This variable takes the first name into findLastName function in Database factory and return found matching last names.

    // This function takes the first name into findLastName function in Database factory return found matching last names.
    $scope.findLastName = function() {
        $scope.lastNames =  Database.findLastName($scope.user);
    }

    // This function takes the first & last names into signout function in Database factory.
    $scope.signout = function() {
        Database.signout($scope.user);
        $scope.signedin = true;
    }

}])

.controller('registerCtrl', ['$scope', '$stateParams', 'Database', // The following is the constructor function for registration page's controller.
function ($scope, $stateParams, Database) {

    $scope.registered = false; // This variable holds the situation whether the volunteer has registered.
    $scope.question = 0; // This variable holds the position where the volunteer is in the questionnaire.
    $scope.regUser = {}; // This variable group holds the information submitted from the first registration form.
    $scope.id = "id"; // This variable holds the id of current volunteer.
    $scope.regform2 = {}; // This variable group holds the information submitted from the second registration form.
    $scope.regform3 = {}; // This variable group holds the information submitted from the third registration form.

    // This function navegates the screen to next form.
    $scope.next = function(){
        $scope.question = $scope.question+1;
    }

    // This function navegates the screen back to home screen.
    $scope.back = function(){
        window.history.back();
    }

    // This function navegates the screen back to last form. (just for test and demo)
//    $scope.last = function(){
//        $scope.question = $scope.question-1;
//    }

    // This function change the situation of current volunteer to registered.
    $scope.submit = function(){
        $scope.registered = true;
    }

    // This function initiate the situation of the page to unregistered.
    $scope.init_registered = function(){
        $scope.registered = false;
    }

    // This function takes the information submitted from the first registration form to function register1 in Database factory and return generated id for later usage.
    $scope.register1 = function() {
        $scope.id = Database.register1($scope.regUser);
        $scope.regform2.id = $scope.id;
        $scope.regform3.id = $scope.id;
    }

    // This function takes the information submitted from the second registration form to function register2 in Database factory.
    $scope.register2 = function() {
        Database.register2($scope.regform2);
    }

    // This function takes the information submitted from the third registration form to function register3 in Database factory.
    $scope.register3 = function() {
        Database.register3($scope.regform3);
    }

}])

.controller('visitorCtrl', ['$scope', '$stateParams', 'Database', // The following is the constructor function for visitor registration page's controller.
function ($scope, $stateParams, Database) {
    $scope.visitor = {}; // This variable group holds the information submitted from the visitor registration form.
    $scope.position = 0; // This variable holds the position where the visitor is on the page.

    // This function takes the information submitted from the visitor registration form to function visitreg in Database factory.
    $scope.visitreg = function(){
        Database.visitreg($scope.visitor);
    }

    // This function navegates the screen forward.
    $scope.next = function(){
        $scope.position = $scope.position+1;
    }

}])

.controller('volunteersListCtrl', ['$scope', '$stateParams', 'Database', // The following is the constructor function for volunteers list page's controller.
function ($scope, $stateParams, Database) {
    $scope.volunteers = Database.volunteersTable(); // This variable group holds all registered volunteers' information.

    // This function was intended to export the volunteers list, but was not working properly, so this function was removed.
//    $scope.export = function () {
//        alasql('SELECT * INTO XLSX("volunteerTable.xlsx",{headers:true}) \
//            FROM HTML("#volunteerTable",{headers:true})');
//        }

}])

.controller('visitorsListCtrl', ['$scope', '$stateParams', 'Database', // The following is the constructor function for visitors list page's controller.
function ($scope, $stateParams, Database) {
    $scope.visitors = Database.visitorsTable(); // This variable group holds all registered visitors' information.
}])

.controller('signingRecordsCtrl', ['$scope', '$stateParams', 'Database', // The following is the constructor function for visitation records page's controller.
function ($scope, $stateParams, Database) {
    $scope.records = Database.recordsTable(); // This variable group holds all visitation records.
}])

// This factory holds the database connection all the time, all database executions are in this factory.
.factory('Database', ['$cordovaSQLite', // the $cordovaSQLite plugin is used here for database executions.
	function($cordovaSQLite) {

    // This variable sets up the database connection.
		var db = $cordovaSQLite.openDB( {
        "name" : "suttonFarm.db",
        "location" : "default"
  	});

    // All functions are within this return bracket.
  	return {
        // This function submits the information from second registration form into volunteers table in database.
        register2: function(regform2) {
            console.log("Submitting regform2 " + regform2.q1 + " for id:" + regform2.id);
            var query = "UPDATE volunteers SET q1 = ?, q2a = ?, q2b = ?, q2c = ?, q2d = ?, q2e = ?, q2f = ?, q2g = ?, q3a = ?, q3b = ?, q3c = ?, q3d = ?, q3e = ?, q3f = ?, q3g = ?, q4a = ?, q4b = ?, q5 = ?, q6a = ?, q6b = ?, q7a = ?, q7b = ?, q8 = ?, q9a = ?, q9b = ?, q10a = ?, q10b = ?, q10c = ?, q11a = ?, q11b = ?, q11c = ?, q12a = ?, q12b = ?, q12c = ?, q12d = ?, q13a = ?, q13b = ? WHERE id = ?;";
            $cordovaSQLite.execute(db, query, [regform2.q1, regform2.q2a, regform2.q2b, regform2.q2c, regform2.q2d, regform2.q2e, regform2.q2f, regform2.q2g, regform2.q3a, regform2.q3b, regform2.q3c, regform2.q3d, regform2.q3e, regform2.q3f, regform2.q3g, regform2.q4a, regform2.q4b, regform2.q5, regform2.q6a, regform2.q6b, regform2.q7a, regform2.q7b, regform2.q8, regform2.q9a, regform2.q9b, regform2.q10a, regform2.q10b, regform2.q10c, regform2.q11a, regform2.q11b, regform2.q11c, regform2.q12a, regform2.q12b, regform2.q12c, regform2.q12d, regform2.q13a, regform2.q13b, regform2.id]);
            console.log("Submitted regform2.");
        },

        // This function submits the information from third registration form into volunteers table in database.
        register3: function(regform3) {
            console.log("Submitting regform3 " + regform3.q1 + " for id:" + regform3.id);
            var query = "INSERT INTO inclusivity (id, q1, q2a, q2b, q3a, q3b, q4a, q4b, q5, q6, q7a, q7b, q8a, q8b, q9a, q9b, q10) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

            // var query = "UPDATE volunteers SET q1 = ?, q2a = ?, q2b = ?, q3a = ?, q3b = ?, q4a = ?, q4b = ?, q5 = ?, q6 = ?, q7a = ?, q7b = ?, q8a = ?, q8b = ?, q9a = ?, q9b = ?, q10 = ? WHERE id = ?;";
            $cordovaSQLite.execute(db, query, [regform3.id, regform3.q1, regform3.q2a, regform3.q2b, regform3.q3a, regform3.q3b, regform3.q4a, regform3.q4b, regform3.q5, regform3.q6, regform3.q7a, regform3.q7b, regform3.q8a, regform3.q8b, regform3.q9a, regform3.q9b, regform3.q10]);
            console.log("Submitted regform3 " + regform3.q2a);
        },

        // This function generates a unique id for current visitor and submits the information from visitor registration form into visitors table in database.
        visitreg: function(visitor){
            var d = new Date();

            var year = d.getFullYear();
            var mon = d.getMonth()+1;
            var day = d.getDate();
            var hr = d.getHours()+1;
            var min = d.getMinutes()+1;
            var sec = d.getSeconds()+1;

            if (hr < 10) {
                hr = "0" + hr;
            }
            if (min < 10) {
                min = "0" + min;
            }
            if (sec < 10) {
                sec = "0" + sec;
            }

            console.log("visitor id generated");

            var id = "visitor" + year + mon + day + hr + min + sec;

            var query = "INSERT INTO visitors (visitorID, firstname, lastname, email, dateOfBirth, phoneNo) VALUES (?,?,?,?,?,?)"
            $cordovaSQLite.execute(db, query, [id, visitor.firstname, visitor.lastname, visitor.email, visitor.dateOfBirth, visitor.phone])

            console.log("visitor registered");
        },

        // This function sign in the current volunteer with the sign in time, and generates a time at today's midnight as the sign out time in case the volunteer forgets to sign out when he leaves the farm.
        signin: function(user) {
            console.log("Retrieving id for "+user.firstname+" "+user.lastname);
            var query = "SELECT id FROM volunteers WHERE firstname = ? AND lastname = ?"
            $cordovaSQLite.execute(db, query, [user.firstname, user.lastname]).then(function(res) {
                if(res.rows.length > 0) {
                    var query2 = "INSERT INTO sign (id, firstname, lastname, signIn, signOut) VALUES (?,?,?,?,?)";

                    console.log("Signing in");

                    var d = new Date();
                    var year = d.getFullYear();
                    var mon = d.getMonth()+1;
                    var day = d.getDate();
                    var hr = d.getHours()+1;
                    var min = d.getMinutes()+1;
                    var sec = d.getSeconds()+1;

                    if (hr < 10) {
                        hr = "0" + hr;
                    }
                    if (min < 10) {
                        min = "0" + min;
                    }
                    if (sec < 10) {
                        sec = "0" + sec;
                    }

                    var signintime = year +"-"+ mon +"-"+ day +" "+ hr +":"+ min +":"+sec;
                    var signouttime = year +"-"+ mon +"-"+ day +" 17:30:00";


                    $cordovaSQLite.execute(db, query2, [res.rows.item(0).id, user.firstname, user.lastname, signintime, signouttime]);

                } else {
                    console.log("No such volunteer");
                }
            })
        },

        // This function sign out the current volunteer and update the sign out time.
        signout: function(user) {
            console.log("Retrieving id for "+user.firstname+" "+user.lastname);
            var query = "SELECT id FROM volunteers WHERE firstname = ? AND lastname = ?"
            $cordovaSQLite.execute(db, query, [user.firstname, user.lastname]).then(function(res) {
                if(res.rows.length > 0) {
                    var query2 = "UPDATE sign SET signOut = ? WHERE signIn=(SELECT MAX(signIn) FROM sign WHERE id = ?);;";

                    console.log("Signing out");

                    var d = new Date();
                    var year = d.getFullYear();
                    var mon = d.getMonth()+1;
                    var day = d.getDate();
                    var hr = d.getHours()+1;
                    var min = d.getMinutes()+1;
                    var sec = d.getSeconds()+1;

                    if (hr < 10) {
                        hr = "0" + hr;
                    }
                    if (min < 10) {
                        min = "0" + min;
                    }
                    if (sec < 10) {
                        sec = "0" + sec;
                    }

                    var signouttime = year +"-"+ mon +"-"+ day +" "+ hr +":"+ min +":"+sec

                    $cordovaSQLite.execute(db, query2, [signouttime, res.rows.item(0).id])

                } else {
                    console.log("No such volunteer");
                }
            })
        },

        // This function generates a unique id for current volunteer and submits the information from first registration form into volunteers table in database.
        register1: function(regUser) {

            var d = new Date();
            var year = d.getFullYear();
            var mon = d.getMonth()+1;
            var day = d.getDate();
            var hr = d.getHours()+1;
            var min = d.getMinutes()+1;
            var sec = d.getSeconds()+1;

            if (hr < 10) {
                hr = "0" + hr;
            }
            if (min < 10) {
                min = "0" + min;
            }
            if (sec < 10) {
                sec = "0" + sec;
            }

            console.log("id generated");

            var id = "id" + year + mon + day + hr + min + sec;

            var query = "INSERT INTO volunteers (id, firstname, lastname, address, phoneNo, email, over16) VALUES (?,?,?,?,?,?,?)"
            $cordovaSQLite.execute(db, query, [id, regUser.firstname, regUser.lastname, regUser.address, regUser.phone, regUser.email, regUser.over16])

            console.log("registered");

            return id;
        },

        // This function takes input first name to find matched volunteers and returns all found last names.
        findLastName: function(user) {
            var lastNames = [];
            console.log("Looking for lastnames for " + user.firstname);
            var query = "SELECT lastname FROM volunteers WHERE firstname = ?";
            $cordovaSQLite.execute(db, query, [user.firstname]).then(function(res) {

                if(res.rows.length > 0) {
                    console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).id);
                    for (var i=0; i<res.rows.length; i++) {

                        lastNames.push({
                            lastname: res.rows.item(i).lastname,
                        });

                    }
                } else {
                    console.log("No results found " + user.firstname);
                }

            })
            return lastNames;
        },

        // This function stores all registered volunteers' information into a variable group and return it.
        volunteersTable: function() {
            var volunteers = [];
            console.log("Generating volunteers list");
            var query = "SELECT * FROM volunteers";
            $cordovaSQLite.execute(db, query).then(function(res) {

                if(res.rows.length > 0) {
                    for (var i=0; i<res.rows.length; i++) {
                        volunteers.push({
                            firstname: res.rows.item(i).firstname,
                            lastname: res.rows.item(i).lastname,
                            address: res.rows.item(i).address,
                            phoneNo: res.rows.item(i).phoneNo,
                            email: res.rows.item(i).email,
                            over16: res.rows.item(i).over16,
                            q1: res.rows.item(i).q1,
                            q2a: res.rows.item(i).q2a,
                            q2b: res.rows.item(i).q2b,
                            q2c: res.rows.item(i).q2c,
                            q2d: res.rows.item(i).q2d,
                            q2e: res.rows.item(i).q2e,
                            q2f: res.rows.item(i).q2f,
                            q2g: res.rows.item(i).q2g,
                            q3a: res.rows.item(i).q3a,
                            q3b: res.rows.item(i).q3b,
                            q3c: res.rows.item(i).q3c,
                            q3d: res.rows.item(i).q3d,
                            q3e: res.rows.item(i).q3e,
                            q3f: res.rows.item(i).q3f,
                            q3g: res.rows.item(i).q3g,
                            q4a: res.rows.item(i).q4a,
                            q4b: res.rows.item(i).q4b,
                            q5: res.rows.item(i).q5,
                            q6a: res.rows.item(i).q6a,
                            q6b: res.rows.item(i).q6b,
                            q7a: res.rows.item(i).q7a,
                            q7b: res.rows.item(i).q7b,
                            q8: res.rows.item(i).q8,
                            q9a: res.rows.item(i).q9a,
                            q9b: res.rows.item(i).q9b,
                            q10a: res.rows.item(i).q10a,
                            q10b: res.rows.item(i).q10b,
                            q10c: res.rows.item(i).q10c,
                            q11a: res.rows.item(i).q11a,
                            q11b: res.rows.item(i).q11b,
                            q11c: res.rows.item(i).q11c,
                            q12a: res.rows.item(i).q12a,
                            q12b: res.rows.item(i).q12b,
                            q12c: res.rows.item(i).q12c,
                            q12d: res.rows.item(i).q12d,
                            q13a: res.rows.item(i).q13a,
                            q13b: res.rows.item(i).q13b,
                        });
                    }
                } else {
                    console.log("No results found ");
                }
            })
            return volunteers;
        },

        // This function stores all registered visitors' information into a variable group and return it.
        visitorsTable: function() {
            var visitors = [];
            console.log("Generating visitors list");
            var query = "SELECT * FROM visitors";
            $cordovaSQLite.execute(db, query).then(function(res) {
                if(res.rows.length > 0) {
                     for (var i=0; i<res.rows.length; i++) {

                         visitors.push({
                             id: res.rows.item(i).visitorID,
                             firstname: res.rows.item(i).firstname,
                             lastname: res.rows.item(i).lastname,
                             dateOfBirth: res.rows.item(i).dateOfBirth,
                             email: res.rows.item(i).email,
                             phoneNo: res.rows.item(i).phoneNo,
                         });
                     }
                } else {
                    console.log("No results found ");
                }
            })
            return visitors;
        },

        // This function stores all visitation records into a variable group and return it.
        recordsTable: function() {
            var records = [];
            console.log("Generating records list");
            var query = "SELECT * FROM sign";
            $cordovaSQLite.execute(db, query).then(function(res) {
                if(res.rows.length > 0) {
                     for (var i=0; i<res.rows.length; i++) {
                         records.push({
                             firstname: res.rows.item(i).firstname,
                             lastname: res.rows.item(i).lastname,
                             signIn: res.rows.item(i).signIn,
                             signOut: res.rows.item(i).signOut,
                         });
                     }
                } else {
                    console.log("No results found ");
                }
            })
            return records;
        },
    };
  }
])
