var fortuneCookies = [
"Conquer your fears or they will conquer you.", "Rivers need springs.",
"Do not fear what you don't know.",
"You will have a pleasant surprise.",
"Whenever possible, keep it simple.",
];
//exports is used as a globalvariable -- to be visible outside of the module

exports.getFortune = function() {
	var idx = Math.floor(Math.random() * fortuneCookies.length); 
	return fortuneCookies[idx];
};