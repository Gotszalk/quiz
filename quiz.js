

    angular.module('testApp', [])
      .controller('TestController', function($http) {
        var test = this;
		
		//test vars
		test.quiz =[];
		test.qindex = 1;
		test.wrongs = [];
		test.remainings = [];
		test.points = 0;
		test.elements = 0;
		
		//quiz params
		test.random = null;
		test.repeat = null;
		test.confirmation = null;
		
     
        test.loadData = function() {
			//alert("go");
			//grab json
			$http.get('data2.json').success(function(data) {
				test.quiz = data;
				test.elements = data.length - 1;
				test.qindex = 1;
				
				test.loadParams();
				
				console.log("data.length: "+data.length);
				console.log("qindex: ", test.qindex);
				console.log(test.quiz[this.qindex]);
				test.dispQuestion(test.qindex);
			});
			
        };
		
		test.loadParams = function(){
			test.random = this.quiz[0].random; //yes/no
			test.repeat = this.quiz[0].repeat; //no/all/each/wrong?
			test.confirmation = this.quiz[0].confirmation; //yes/no
			test.type = this.quiz[0].type; //multiple-choice/single-choice
		}
     
        test.dispQuestion = function(i) {
			console.log("index: "+i);
			test.question = test.quiz[i].question.text;
			test.answers = test.quiz[i].answers;
        };
		
		test.chosenAnswer = function(a) {
			console.log("answer: "+a);
			// count points
			test.points += a.pt;
			if(test.qindex === test.elements){
				//end
				alert("to koniec! masz "+ test.points + " punktów");
			}else{
				test.dispQuestion(++test.qindex);
			}
			//repetition?
			
			//confirmation?
			//if(this.confirmation === "yes"){
			//	//display confirmation - how in Angularjs?.
			//}
			//
			////go next depending on random
			//if(this.random === "yes"){
			//	//repetition?
			//	
			//}
		}
     
         });

