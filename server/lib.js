function getRandomUsername () {
	var s = Math.floor(Math.random()*4);
	var names = new Array();

	names[0] = "David";
	names[1] = "Daniel";
	names[2] = "Bradford";
	names[3] = "Eric";
	names[4] = "John";
	names[5] = "Peter";
	names[6] = "Arnau";
	names[7] = "Alessio";
	names[8] = "Sergi";
	names[9] = "Angela";
	names[10] = "Laura";
	names[11] = "Bud";
	names[12] = "Prins";
	names[13] = "Judith";
	names[14] = "Walter";
	names[15] = "Heisenberg";
	names[16] = "Sasha";
	names[17] = "Kelly";
	names[18] = "Tory";
	names[19] = "Jenna";
	names[20] = "Asa";
	names[21] = "Kayden";
	names[22] = "Killian";
	names[23] = "Sida";
	names[24] = "Flor";
	names[25] = "Skyler";
	names[26] = "Claudia";
	names[27] = "Lapiz";
	names[28] = "Nicolas";
	names[29] = "Nat";
	names[30] = "Torra";

	var surname1 = new Array();
	surname1[0] = " Russel";
	surname1[1] = " Herbert";
	surname1[2] = " J.";
	surname1[3] = " John";
	surname1[4] = " Torramilans";
	surname1[5] = " Barton";
	surname1[6] = " Addison";
	surname1[7] = " Akerman";
	surname1[8] = " Dalton";
	surname1[9] = " Faulkner";
	surname1[10] = " Gladwyn";
	surname1[11] = " Hawk";
	surname1[12] = " Johnson";
	surname1[13] = " Cock";
	surname1[14] = " Hartwell";
	surname1[15] = " White";
	surname1[16] = " Malkova";
	surname1[17] = " Black";
	surname1[18] = " Haze";
	surname1[19] = " Akira";
	surname1[20] = " Torramilans";
	surname1[21] = " Torramilans";
	surname1[22] = " Kross";
	surname1[23] = " Nieuwenhuis";
	surname1[24] = " Khaeshah";
	surname1[25] = " Tarditti";
	surname1[26] = " Mejingjard";
	surname1[27] = " Junior";
	surname1[28] = " Delgado";
	surname1[29] = " Guerrero";
	surname1[30] = " Milans";

	var surname2 = new Array();
	surname2[0] = " Walker";
	surname2[1] = " Getz";
	surname2[2] = " Foreman";
	surname2[3] = " Guffey";
	surname2[4] = " White";
	surname2[5] = " Hartwell";
	surname2[6] = " Keighley";
	surname2[7] = " Kingston";
	surname2[8] = " Farras";
	surname2[9] = " Mildburn";
	surname2[10] = " Nigri";
	surname2[11] = " Grey";
	surname2[12] = " Pinki";
	surname2[13] = " Linares";
	surname2[14] = " Divine";
	surname2[15] = " Leone";
	surname2[16] = " Onion";
	surname2[17] = " Nivela";
	surname2[18] = " Siffredi";
	surname2[19] = " Arnau";
	surname2[20] = " Obscurs";
	surname2[21] = " Rose";
	surname2[22] = " Lazaro";
	surname2[23] = " Pinkman";
	surname2[24] = " Torramilans";
	surname2[25] = " Torramilans"; 

	return names[Math.floor(Math.random()*31)] + surname1[Math.floor(Math.random()*31)] + surname2[Math.floor(Math.random()*26)];
}

module.exports = getRandomUsername;