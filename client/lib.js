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
	names[27] = "Bruce";
	names[28] = "Nicolas";
	names[29] = "Nat";
	names[30] = "Torra";
	names[31] = "Pringles";
	names[32] = "Haggard";
	names[33] = "Douglas";
	names[34] = "Edna";
	names[35] = "Glenn";
	names[36] = "Iona";
	names[37] = "Kenny";
	names[38] = "Lindsay";
	names[39] = "Bill";
	names[40] = "Max";
	names[41] = "Balaghi";
	names[42] = "Aluna";
	names[43] = "Nacho";
	names[44] = "Marta";
	names[45] = "Dario";
	names[46] = "Gisela";
	names[47] = "Laia";

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
	surname1[31] = " Moriko";
	surname1[32] = " Natsumi";
	surname1[33] = " Noriko";
	surname1[34] = " Ken'ichi";
	surname1[35] = " Katsuo";
	surname1[36] = " Albrektson";
	surname1[37] = " Christoffersen";
	surname1[38] = " Guldbrandsen";
	surname1[39] = " Ostberg";
	surname1[40] = " Smith";
	surname1[41] = " Taylor";
	surname1[42] = " Williams";
	surname1[43] = " Ryan";
	surname1[44] = " Harris";
	surname1[45] = " Sattler";
	surname1[46] = " Minikiwi";


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
	surname2[26] = " Arenas";
	surname2[27] = " Kingston";
	surname2[28] = " Chinatsu";
	surname2[29] = " Daisuke";
	surname2[30] = " Haruka";
	surname2[31] = " Hideyoshi";
	surname2[32] = " Hotaru";
	surname2[33] = " Ichiro";
	surname2[34] = " Kaito";
	surname2[35] = " Kazuki";
	surname2[36] = " Kouki"; 
	surname2[37] = " Miyako";
	surname2[38] = " Aveskamp";
	surname2[39] = " Ackerman";
	surname2[40] = " Ling";
	surname2[41] = " March";
	surname2[42] = " Picazo";
	surname2[43] = " Casals";

	return names[Math.floor(Math.random()*48)] + surname1[Math.floor(Math.random()*47)] + surname2[Math.floor(Math.random()*44)];
}

module.exports = getRandomUsername;