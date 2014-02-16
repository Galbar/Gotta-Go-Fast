function Game (size) {
	this.size=size;
	this.players=[];
	this.commands=[];
	this.is_active=false;
	for (var i = 0; i < size; i++) {
		this.commands[i] = "S";
	};
	this.client_status={
		obs:[],
		players:[]
	};
	this.client_status_retrieved=[];
	for (var i = 0; i < size; i++) {
		this.client_status_retrieved[i] = false;
	};
	this.turns=0;
}

module.exports = Game;