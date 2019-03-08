

    angular.module('testApp', [])
      .controller('TestController', function($http,$timeout) {
        var test = this;
		
		//test vars
		test.quiz =[];
		test.qindex = 1;
		test.wrongs = [];
		test.remainings = [];
		//test.points = 0;
		test.elements = 0;
		test.ok = "null";
		
		//quiz params
		test.random = null;
		test.repeat = null;
		test.confirmation = null;
		
		//angular.module('app', ['ngMessages']);
     
        test.loadData = function() {
			//alert("go");
			//grab json
			$http.get('data2.json').success(function(data) {
				test.quiz = data;
				test.elements = data.length - 1;
				test.qindex = 1;
				test.points = 0;
				
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
		
		test.endOfQuiz = function(){
			test.question = "To koniec quizu. Uzyskałaś/eś " + test.points + " punktów.";
			test.answers = [];
			
		}
		
		test.clearMsg = function() {
			test.msg = "";
		}
		
		test.chosenAnswer = function(a) {
			//console.log("answer: "+a);
			// count points
			
			//confirmation?
			if(this.confirmation === "yes"){
				//display confirmation - how in Angularjs?.
				if(a.pt > 0){
					test.msg = "Dobra odpowiedź!";
				}else{
					test.msg = "Błędna odpowiedź.";
				}
			}
			$timeout(function(){test.clearMsg();},2000);
			
			test.points += a.pt;
			if(test.qindex === test.elements){
				//end
				test.endOfQuiz();
			}else{
				test.dispQuestion(++test.qindex);
			}
			//repetition?

			
			//
			////go next depending on random
			//if(this.random === "yes"){
			//	//repetition?
			//	
			//}
		}
     
         });

