class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
		this.resta_error=1;
		this.start_game=false;
    }

    preload (){	
		this.load.image('back', '../resources/back.png');
		this.load.image('cb', '../resources/cb.png');
		this.load.image('co', '../resources/co.png');
		this.load.image('sb', '../resources/sb.png');
		this.load.image('so', '../resources/so.png');
		this.load.image('tb', '../resources/tb.png');
		this.load.image('to', '../resources/to.png');
	}
	
    create (){	
		var options_data = {
			cards:2, dificulty:"hard"
		};
		var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
		options_data = JSON.parse(json);
		let cartesdisponibles = ['cb', 'co', 'sb', 'so', 'tb', 'to'];
		let arraycards = [];
		for (var i = 0; i < options_data.cards; i++){
			arraycards.push(cartesdisponibles[i]);
			arraycards.push(cartesdisponibles[i]);
		}
		arraycards.sort(function(){return Math.random() - 0.5});
		this.cameras.main.setBackgroundColor(0xBFFCFF);
		var x = 250;
		for (let i = 0; i < options_data.cards*2; i++){
			this.add.image(x, 300, arraycards[i]);
			x = x + 100;
		}
		/*this.add.image(250, 300, arraycards[0]);
		this.add.image(350, 300, arraycards[1]);
		this.add.image(450, 300, arraycards[2]);
		this.add.image(550, 300, arraycards[3]);*/
		
		this.cards = this.physics.add.staticGroup();

		/*this.cards.create(250, 300, 'back');
		this.cards.create(350, 300, 'back');
		this.cards.create(450, 300, 'back');
		this.cards.create(550, 300, 'back');*/

		x = 250;
		this.dificulty = options_data.dificulty;
		var time = 1000;
		switch (this.dificulty) {
			case 'normal':
			  	time = 2000;
			 	this.resta_error= 1.5;
			  break;
			case 'hard':
				time = 1000;
				this.resta_error= 2;
			  break;
			default:
				time = 3000;
				this.resta_error= 1;
		}
		setTimeout(() => {
			for (let i = 0; i < options_data.cards*2; i++){
				this.cards.create(x, 300, 'back');
				x = x + 100;
			}
	
		i = 0;
		this.cards.children.iterate((card)=>{
			card.card_id = arraycards[i];
			i++;
			card.setInteractive();
			card.on('pointerup', () => {
				card.disableBody(true,true);
				if (this.firstClick){
					if (this.firstClick.card_id !== card.card_id){
						this.score -= 20*this.resta_error;
						this.firstClick.enableBody(false, 0, 0, true, true);
						card.enableBody(false, 0, 0, true, true);
						if (this.score <= 0){
							alert("Game Over");
							loadpage("../");
						}
					}
					else{
						this.correct++;
						if (this.correct >= options_data.cards){
							alert("You Win with " + this.score + " points.");
							loadpage("../");
						}
					}
					this.firstClick = null;
				}
				else{
					this.firstClick = card;
				}
			}, card);
		});
		}, time);
	}
	
	update (){	}
	
}

