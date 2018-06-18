var domande;
var quesito=0;
var nquesiti = undefined;
var risposte = [];
var modesame = false;

$(function() {
	
});

function start(es) {
	$("#btnnext").show();
	$("#btnprev").show();
	$("#btnsoluz").show();
	$("#modst").hide();
	$("#modes").hide();
	if (es)
	{
		$("#btnprev").attr('disabled',true);
		$("#btnsoluz").attr('disabled',true);
		modesame=true;
	}
	caricaDomanda();
} 

function selezionaRisposta() {risposte[quesito]=$("input[type='radio'][name='selezDom']:checked").val();}  


function caricaDomanda()
{
	$("#testo").html(domande[quesito].testo);
	
	var alph = "A";
	var radiohtml = "";
	for (var i in domande[quesito].opzioni)
	{
		radiohtml+="<input type=\"radio\" onclick=\"selezionaRisposta()\" name=\"selezDom\" value=\""+alph+"\"\>"+alph+": "+domande[quesito].opzioni[i]+"</br>";
		alph = String.fromCharCode(alph.charCodeAt() + 1) // A++
	}
	$("#radio").html(radiohtml);
	$("#prog").html("Quesito "+(quesito+1)+"/"+(domande.length));
	var cod = domande[quesito].codice;
	cod = cod.replace(/\n/g, "<br />");
	$("#codice").html(cod);
	
	$("#soluz").html("");
}
function nextDomanda()
{
	if (quesito+1>=domande.length)
	{
		quesito=0;
		if (modesame)
		{
			risultati();
			return;
		}
	}
	else { quesito++;}
	caricaDomanda();
}
function prevDomanda()
{
	if ((quesito-1)<0)
	{
		quesito=domande.length-1;
	}
	else { quesito--;}
	caricaDomanda();
}
function risultati ()
{
	var spiegaz ="";
	var corrette = 0;
	for	(var i=0;i<domande.length;i++)
	{
		if (risposte[i]==domande[i].risposta)
		{
			corrette++;
		}
		else
		{
			var testorisp;
			if (risposte[i]==undefined)
			{
				testorisp="Nessuna";
			}
			else
			{
				testorisp = domande[i].opzioni[(risposte[i].charCodeAt()) -"A".charCodeAt()];
			}
		spiegaz+="Quesito "+(i+1)+"/"+(domande.length)+ "</br>"+domande[i].testo+"</br></br> La tua risposta è stata:"+risposte[i]+" , \""+testorisp+" \"</br> La risposta corretta era: "+domande[i].risposta+ " , \""+domande[i].opzioni[(domande[i].risposta.charCodeAt() -"A".charCodeAt())]+"\"</br> Spiegazione:"+domande[i].spiegazione+"</br></br>	";
		
		}
	}
	var out = "Corrette: "+corrette+"/"+(domande.length)+"</br></br>"+spiegaz;
	$("#soluz").html(out);
	$("#quesito").html("");
	$("#codice").html("");
	$("#btnnext").attr('disabled',true);
}

function dammiSoluz()
{
	$("#soluz").html("La tua risposta è:"+risposte[quesito]+
	"</br> La risposta corretta è: "+domande[quesito].risposta+
	"</br> Spiegazione:"+domande[quesito].spiegazione
	);
}
