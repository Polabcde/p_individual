class GameScene2 extends Phaser.Scene {
    constructor (){
        super('GameScene2');
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
		this.resta_error=1;
		this.start_game=false;
		this.arraycards = null;
		this.nivell_completat = false;
		this.nivell = null;
		this.options_data = {
			cards:2, dificulty:"hard"
		};
		this.json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
		this.options_data = JSON.parse(this.json);
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
		var json2 = localStorage.getItem("niv") || '1';
		this.nivell = JSON.parse(json2);
		let cartesdisponibles = ['cb', 'co', 'sb', 'so', 'tb', 'to'];
		this.arraycards = [];
		for (var i = 0; i < this.options_data.cards; i++){
			this.arraycards.push(cartesdisponibles[i]);
			this.arraycards.push(cartesdisponibles[i]);
		}
		this.arraycards.sort(function(){return Math.random() - 0.5});
		this.cameras.main.setBackgroundColor(0xBFFCFF);
		var x = 250;
		var images = null;
		for (let i = 0; i < this.options_data.cards*2; i++){
			this.add.image(x, 300, this.arraycards[i]);
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
		this.dificulty = this.options_data.dificulty;
		var time = 1000 - this.nivell*10;
		if (time < 0) {time = 0;}
		setTimeout(() => {
			for (let i = 0; i < this.options_data.cards*2; i++){
				this.cards.create(x, 300, 'back');
				x = x + 100;
			}
	
		i = 0;
		this.cards.children.iterate((card)=>{
			card.card_id = this.arraycards[i];
			i++;
			card.setInteractive();
			card.on('pointerup', () => {
				card.disableBody(true,true);
				if (this.firstClick){
					if (this.firstClick.card_id !== card.card_id){
						this.score -= this.nivell+20;
						this.firstClick.enableBody(false, 0, 0, true, true);
						card.enableBody(false, 0, 0, true, true);
						if (this.score <= 0){
							alert("Game Over");
							loadpage("../");
						}
					}
					else{
						this.correct++;
						if (this.correct >= this.options_data.cards){
							alert("You Win with " + this.score + " points of health.");
							/*loadpage("../");*/
							//this.scene.restart();
							card.destroy();	
							this.nivell_completat = true;						
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
	
	update (){	
		if (this.nivell_completat){
			this.nivell_completat = false;
			this.nivell +=1;
			var time = 1000 - this.nivell*10;
			if (time < 0) {time = 0;}
			this.arraycards.sort(function(){return Math.random() - 0.5});
			var x = 250;
			for (let i = 0; i < this.options_data.cards*2; i++){
				this.add.image(x, 300, this.arraycards[i]);
				x = x + 100;
			}
			x = 250;
			setTimeout(() => {
				for (let i = 0; i < this.options_data.cards*2; i++){
					this.cards.create(x, 300, 'back');
					x = x + 100;
				}		
				i = 0;
			}, time);
		}
	}
	
}

