
$('#namn').keyup(() => { //Namn-input valideras varje gång ett tecken matas in i namnrutan
    valideringNamn();
});

function valideringNamn(){ //Validering för namn-input
    if(document.getElementById('namn').value ===''){
        $('#namnMeddelande').html("Fyll i namn");
        namnValid = false;
        
    }
    else if(document.getElementById('namn').value.length < 3){ //Om namnet är mindre än 3 tecken blir inputboxen röd och namnValid sätts till false
        $('#namnMeddelande').html("!Minst 3 tecken");
        $("#namn").css("outline", "none");
        $("#namn:focus").css("border", "0.2em solid red");
        $("#namn:focus").css("border-radius", "0.3em");
        namnValid = false;
    }
    else{ //Är namnet längre än 3 tecken blir inputboxen grön och namnValid sätts till true
        $('#namnMeddelande').html("✓");
        $("#namn").css("outline", "none");
        $("#namn:focus").css("border", "0.2em solid green");
        $("#namn:focus").css("border-radius", "0.3em");
        namnValid = true;
    }
}

$('#number').keyup(() => { //Telefonnummer-input valideras varje gång ett tecken matas in i rutan för telefonnummer
    valideringNummer();
});
function valideringNummer(){ //Validering för telefonnummer-input
    if(document.getElementById('number').value.length == 0){
        $('#mobilMeddelande').html("!");
        nummerValid = false;
    }
    else if(!document.getElementById('number').value.match(/^[0-9\-\+]{10}$/)){ //Om telefonnummret innehåller något annat än siffror och inte är 10 tecken långt blir inputboxen röd och nummerValid sätts till false.
        $('#mobilMeddelande').html("!Ogiltigt nummer");
        $("#number").css("outline", "none");
        $("#number:focus").css("border", "0.2em solid red");
        $("#number:focus").css("border-radius", "0.3em");
        nummerValid = false;
    }
    else{
        $('#mobilMeddelande').html("✓"); //Om nummret är godkänt blir boxen grön och nummerValid får värdet true
        $("#number").css("outline", "none");
        $("#number:focus").css("border", "0.2em solid green");
        $("#number:focus").css("border-radius", "0.3em");
        nummerValid = true;
    }
}

$('#email').keyup(() => { //Email-input valideras varje gång ett tecken matas in i rutan för email
    valideringEmail();
});

function valideringEmail() //Validering för email-input
{
    
    if(!document.getElementById('email').value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){ //Kontrollerar med regEx att den angivna emailadressen är korrekt formaterad (innehåller ett @ samt slutar på ".xx")
        $('#emailMeddelande').html("!Ogiltigt email");
        $("#email").css("outline", "none");
        $("#email:focus").css("border", "0.2em solid red");
        $("#email:focus").css("border-radius", "0.3em");
        emailValid = false;
    }
    else{ //Är email-addressen godkänd blir inputboxen grön och emailValid sätts till true.
        $("#emailMeddelande").html("✓");
        $("#email").css("outline", "none");
        $("#email:focus").css("border", "0.2em solid green");
        $("#email:focus").css("border-radius", "0.3em");
        emailValid = true;
    }
}


$('#meddelande').keyup(() => { //Meddelande-input valideras varje gång ett tecken matas in i rutan för meddelande
    valideringMeddelande();
});

function valideringMeddelande(){ //Validering för meddelande-input
    if(document.getElementById('meddelande').value ===""){
        $('#textMeddelande').html("!Fyll i beskrivning!");
        meddelandeValid = false;
    }
    else if(document.getElementById('meddelande').value.length < 20){ //Om meddelandet är kortare än 20 tecken sätts meddelandeValid till false och inputboxen blir röd
        $('#textMeddelande').html("!Minst 20 tecken");
        meddelandeValid = false;
        $("#meddelande").css("outline", "none");
        $("#meddelande:focus").css("border", "0.2em solid red");
        $("#meddelande:focus").css("border-radius", "0.3em");
    }
    else{ //Är meddelandet godkänt blir inputboxen grön och meddelandeValid sätts till true
        $('#textMeddelande').html("✓");
        $("#meddelande").css("outline", "none");
        $("#meddelande:focus").css("border", "0.2em solid green");
        $("#meddelande:focus").css("border-radius", "0.3em");
        meddelandeValid = true;
    }
}

var namnValid = false;
var nummerValid = false;
var emailValid = false;
var meddelandeValid = false;


function valideringForm(){ //En validering som körs när man trycker på submit-knappen i formuläret
    
    valideringNamn();
    valideringNummer();
    valideringEmail();
    valideringMeddelande();

    if(namnValid === true && nummerValid === true && emailValid === true && meddelandeValid === true){ //Om alla valideringsmetoder har körts och alla booleaner har fått värdet true så clearas Local Storage och  alla nya kontaktuppgifter sparas i Local Storage
        window.localStorage.clear();
        const person = {
            namn: document.getElementById('namn').value,
            telefonnummer: document.getElementById('number').value,
            email: document.getElementById('email').value,
        }
        window.localStorage.setItem('user', JSON.stringify(person)); //Kontaktuppgifterna sparas som ett JSON-object
    }
    else{
        window.alert("Kontrollera att alla fält är ifyllda korrekt!");
    }
}

if (window.location.href.includes("kontakt.html")) { //Om användaren befinner sig på kontaktsidan körs scriptet
    var sparadJson = JSON.parse(window.localStorage.getItem('user')); //Laddar in den lokalsparade persondatan och gör denna till ett javascriptobjekt
    const values = Object.values(sparadJson); //Konverterar objektet till en array

    var index;
    for (index = 0; index < values.length; index++) { //Loopar genom de tre värderna i arrayen och sätter input-fältens värden till de sparade värdena.
        if(index === 0){
            document.getElementById('namn').value = values[0];
            document.getElementById('namn').focus();
            valideringNamn();
            
        }
        if(index === 1){
            document.getElementById('number').value = values[1];
            document.getElementById('number').focus();
            valideringNummer();
        }
        if(index === 2){
            document.getElementById('email').value = values[2];
            document.getElementById('email').focus();
            valideringEmail();
        }
    }
}

var i = 0;
function bildspel() { //Ett bildspel som rullar genom tre olika bildkällor med hjälp av en loopande indexvariabel
    i++;
    var bilder = ["images/dator.jpg", "images/dator2.jpg", "images/dator3.jpg"];
    $("#bildspel").animate({
        
    })
    if (i>2)
    {
        i = 0;
    }
    document.getElementById("bildspel").src = bilder[i];
}

$(document).ready(function(){
    $("#bildspel").hover(function(){ //Funktionen ändrar synlighet på både play/pausknappen och hela bildspelet när muspekaren förs över bildspelet
        $("#pauseIkon").css("opacity", "0.5");
        $("#bildspel").css("opacity", "0.5");
        }, function(){
        $("#pauseIkon").css("opacity", "0");
        $("#bildspel").css("opacity", "1");
    });
    $("#pauseIkon").hover(function(){ //Koden upprepas för när muspekaren är över själva knappen
        $("#pauseIkon").css("opacity", "0.5"); 
        $("#bildspel").css("opacity", "0.5");
        }, function(){
        $("#pauseIkon").css("opacity", "0");
        $("#bildspel").css("opacity", "1");
    });
});

if (window.location.href.includes("startsida.html")) { //Ser till så att bildspelet bara rullar när användaren är inne på rätt sida
    var interval = setInterval(bildspel, 1500);
    var pausad = false;
}
function pause(){ //Byter mellan att starta/pausa bildspelet när man klickar på det. Denna funktion byter även ut vilken ikon som visas
    if (pausad == true){
        interval = setInterval(bildspel, 1500);
        pausad = false;
        document.getElementById("pauseIkon").src = "images/icons/pauseikon.png";
    }
    else{
        clearInterval(interval);
        pausad = true;
        document.getElementById("pauseIkon").src = "images/icons/playikon.png";
    }
}

function openMeny(){ //Visar och gömmer dropdown-menyn när man klickar i menyknappen. Likt föregående funktion byter även denna ikon
    var lista = document.getElementById("dropdown");
    if (lista.style.display === "block"){
        lista.style.display = "none";
        document.getElementById("meny").src = "images/icons/hamburger.png";
    }
    else {
        lista.style.display = "block";
        document.getElementById("meny").src = "images/icons/exit.png";
    }
}

var htmlKunskap = document.getElementById("htmlbar").innerHTML; //Hämtar värdet som ska användas för kunskapsstaplarnas storlek från de individuella personsidorna
var cssKunskap = document.getElementById("cssbar").innerHTML;
var jsKunskap = document.getElementById("jsbar").innerHTML;
var jqueryKunskap = document.getElementById("jquerybar").innerHTML;

$(document).ready(function(){ //Animerar staplarna så att de över 3 sekunder växer till sin rätta storlek
    $("#htmlbar").animate({
        width: htmlKunskap
    },  {
        duration: 3000})
});
$(document).ready(function(){
    $("#cssbar").animate({
        width: cssKunskap
    },  {
        duration: 3000})
});
$(document).ready(function(){
    $("#jsbar").animate({
        width: jsKunskap
    },  {
        duration: 3000})
});
$(document).ready(function(){
    $("#jquerybar").animate({
        width: jqueryKunskap
    },  {
        duration: 3000})
});



