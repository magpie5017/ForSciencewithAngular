// Logo Modal randomizer

document.getElementById("logoimg").onclick = function(){
	var buttonText = [
		'CRACK THE WHIP',
    	'GET TO WORK',
		'IT\'S 5 O\'CLOCK NOWHERE',
		'ONWARD, MINIONS',
		'THE UNIVERSE WON\'T SOLVE ITSELF',
		'I WILL BE A KIND MASTER',
		'ALL WORK AND NO PLAY',
		'LIKE A BOSS'
	];
	var randNum = Math.floor(Math.random() * buttonText.length);
	
	document.getElementById('modalclosebtn').innerHTML = '<button type="button" class="btn btn-default" data-dismiss="modal">' + buttonText[randNum] + '</button>';
};