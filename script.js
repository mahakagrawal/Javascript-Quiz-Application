var QuestionList=null;
var answerKeyObject = new Object();
var answerKey = [];
var score = 0;
QuestionList=[
    {
        ID: 1,
        Title:"What is full form of CSS?",
        Option: ["Cascading Stylesheet","Javascript","Cascading Stylingsheet","AJAX"],
        Answer: "Cascading Stylesheet",
        Score: 10
    },
    {
        ID: 2,
        Title:"A complete graph can have -",
        Option: ["n2 spanning trees","n3 spanning trees","n4 spanning trees","n5 spanning trees"],
        Answer: "n2 spanning trees",
        Score: 10
    },
    {
        ID: 3,
        Title:"What is full form of AJAX",
        Option: ["Asynchronous Javascript","Javascript","Asynchronous Javascript and XML","None of these"],
        Answer: "Asynchronous Javascript and XML",
        Score: 10
    },
    {
        ID: 4,
        Title:"What is full form of HTML",
        Option: ["Hypertext Language","Hypertext Markup Language","HT Language","Markup Language"],
        Answer: "Hypertext Markup Language",
        Score: 10
    },
    {
        ID: 5,
        Title:"What is full form of PHP",
        Option: ["Hypertext Processor","Pre Text Processor","Pre Hypertext Preprocessor","Hypertext Preprocessor"],
        Answer: "Hypertext Preprocessor",
        Score: 10
    },
    {
        ID: 6,
        Title:"What '=>' means in javascript?",
        Option: ["Arrow Function","Equals to","Equal Function","None of these"],
        Answer: "Arrow Function",
        Score: 10
    },
    {
        ID: 7,
        Title:"How to include javascript in HTML?",
        Option: ["script","link","href","html"],
        Answer: "script",
        Score: 10
    },
    {
        ID: 8,
        Title:"How to include css in HTML?",
        Option: ["style","script","both 1 and 2","none of these"],
        Answer: "style",
        Score: 10
    },
    {
        ID: 9,
        Title:"How to include line break in HTML?",
        Option: ["br","label","hr","break"],
        Answer: "br",
        Score: 10
    },
    {
        ID: 10,
        Title:"How to declare variable in javascript?",
        Option: ["variable","var","int","$"],
        Answer: "var",
        Score: 10
    },
];

// function to show current question
function fetchQuestion(objQuestionList){
            var divForm = document.getElementById('form');

            var divQuestion = document.createElement("div");
	        divQuestion.setAttribute("id", objQuestionList.ID);
            divQuestion.style="padding:20px";
	
	        var title = document.createElement("h3");
	        title.innerHTML = objQuestionList.Title;
            title.style="padding-bottom:20px";
            divQuestion.appendChild(title);

            for(var j=0; j<objQuestionList.Option.length; j++){
                var btnRadioone = document.createElement("input");
	            btnRadioone.setAttribute("type","radio");
                btnRadioone.setAttribute("id","answer");
                btnRadioone.setAttribute("class","option");
                btnRadioone.setAttribute("name","option");
                btnRadioone.setAttribute("value",objQuestionList.Option[j]);
                btnRadioone.style="margin-right:15px";
	            divQuestion.appendChild(btnRadioone);

                var optionlbl = document.createElement("label");
                optionlbl.innerHTML= objQuestionList.Option[j];
                optionlbl.setAttribute("id",'label');
	            divQuestion.appendChild(optionlbl);

                var breakLine = document.createElement("br");
                divQuestion.appendChild(breakLine);

                var breakLine = document.createElement("br");
                divQuestion.appendChild(breakLine);
            }
            if(index==QuestionList.length-1){
                var btnSubmit = document.createElement("button");
                btnSubmit.setAttribute("type","button");
                btnSubmit.innerHTML="Submit";
                btnSubmit.style="padding:2px;padding-left:15px;padding-right:15px";
                divQuestion.appendChild(btnSubmit);
                document.getElementById("form").appendChild(divQuestion);

                btnSubmit.addEventListener("click",function(event){
                    if(checkanswer()){
		                var targetParent = event.target.parentNode;
		                var div= document.getElementById(parseInt(targetParent.id));
                        div.parentNode.removeChild(div);
                        submitQuestion();
                    }
                    else{
                        alert("please select an option");
                    }
                });
            }
            else{
                var btnNext = document.createElement("button");
                btnNext.setAttribute("type","button");
                btnNext.innerHTML="Next";
                btnNext.style="padding:2px;padding-left:15px;padding-right:15px";
                divQuestion.appendChild(btnNext);
                document.getElementById("form").appendChild(divQuestion);

                btnNext.addEventListener("click",function(event){
                    if(checkanswer()){
		                var targetParent = event.target.parentNode;
		                var div= document.getElementById(parseInt(targetParent.id));
                        div.parentNode.removeChild(div);
                        nextQuestion();
                    }
                    else{
                        alert("please select an option");
                    }
                });
            }
            var radios = document.querySelectorAll("input[type=radio]");
            // loop to add event listeners in all radio buttons
            for (var i = 0; i < radios.length; i++) {
                radios[i].addEventListener("click",function(event){
                     var x = document.getElementsByName('option');
                     var lblindex;
                     // loop to disable all radio buttons
                     for (var j = 0; j < x.length; j++) {
                         x[j].disabled = true;
                         if(x[j].value == event.target.value){
                             lblindex = j;
                         }
                     }  
                     checkAccuracy(event.target,lblindex);    
                });
            }
}

// submit quiz and show scores
function submitQuestion(){
    var header = document.getElementById('header');
    header.innerHTML = "Score = "+ score;

    var divForm = document.getElementById('form');
    var divQuestion = document.createElement("div");
	divQuestion.setAttribute("id", "scorecard");
    divQuestion.style="padding:20px";
	
	var getAnswerKey = document.createElement("button");
    getAnswerKey.setAttribute("type","button");
	getAnswerKey.innerHTML = "Get Answer Key";
    getAnswerKey.style="padding:2px;padding-right:15px; padding-left:15px;";
    divQuestion.appendChild(getAnswerKey);

    var restartQuiz = document.createElement("button");
	restartQuiz.innerHTML = "Restart Quiz";
    restartQuiz.style="padding:2px;padding-right:15px; padding-left:15px;";
    divQuestion.appendChild(restartQuiz);

    divForm.appendChild(divQuestion);
    getAnswerKey.addEventListener("click",function(event){
        var targetParent = event.target.parentNode;
		var div= document.getElementById(targetParent.id);
        div.parentNode.removeChild(div);
        showAnswerKey();
    });
    restartQuiz.addEventListener("click",function(event){
        var targetParent = event.target.parentNode;
		var div= document.getElementById(targetParent.id);
        div.parentNode.removeChild(div);
        restart();
    });
}
// function to restart the quiz
function restart(){
    var header = document.getElementById('header');
    header.innerHTML="Quiz";
    index = 0;
    answerKey=[];
    fetchQuestion(QuestionList[index]);
}
// function to show answer key
function showAnswerKey(){
    var divForm = document.getElementById('form');
    var divAnswer = document.createElement("div");
	divAnswer.setAttribute("id", "scorecard");
    divAnswer.style="padding:20px";

    for(var i=0 ; i<answerKey.length; i++)
    {
        var sno = document.createElement("label");
	    sno.innerHTML = answerKey[i].id + "-  ";
        divAnswer.appendChild(sno);

        var question = document.createElement("label");
	    question.innerHTML = answerKey[i].question + "->  ";
        divAnswer.appendChild(question);

        var answer = document.createElement("label");
	    answer.innerHTML = answerKey[i].answer;
        if(answerKey[i].status == "Correct"){
            answer.style="color:green";
        }
        else{
            answer.style="color:red";
        }
        divAnswer.appendChild(answer);

        var breakLine = document.createElement("br");
        divAnswer.appendChild(breakLine);
    }

    var restartQuiz = document.createElement("button");
	restartQuiz.innerHTML = "Restart Quiz";
    restartQuiz.style="padding:2px;padding-right:15px; padding-left:15px;";
    divAnswer.appendChild(restartQuiz);

    restartQuiz.addEventListener("click",function(event){
        var targetParent = event.target.parentNode;
		var div= document.getElementById(targetParent.id);
        div.parentNode.removeChild(div);
        restart();
    });

    divForm.appendChild(divAnswer);
}

// to show the answer result for each question 
function showAnswerResult(data){
    var divQuestion = document.getElementById(QuestionList[index].ID);
    if(data == "Correct")
    {
        var breakLine = document.createElement("br");
        divQuestion.appendChild(breakLine);

        var breakLine = document.createElement("br");
        divQuestion.appendChild(breakLine);

        var answerResult = document.createElement("button");
	    answerResult.innerHTML = "Correct Answer";
        answerResult.style="padding:3px; border:1px solid green; color:green; background: white;;margin-top:20px;padding-left:20px;padding-right:20px";
        divQuestion.appendChild(answerResult);
    }
    else{
        var breakLine = document.createElement("br");
        divQuestion.appendChild(breakLine);

        var breakLine = document.createElement("br");
        divQuestion.appendChild(breakLine);

        var answerResult = document.createElement("button");
	    answerResult.innerHTML = "Incorrect Answer";
        answerResult.style="padding:3px; border:1px solid red; color:red;background: white;margin-top:20px;padding-left:20px;padding-right:20px";
        divQuestion.appendChild(answerResult);
    }
}

// store the selected answer in array of objects
function addToAnswerKey(selectedanswer,status)
{
        var answerKeyObject= new Object();
        answerKeyObject.id=index+1;
        answerKeyObject.question=QuestionList[index].Title;
        answerKeyObject.answer=selectedanswer;
        answerKeyObject.status= status;
        answerKey.push(answerKeyObject);
}

// to check whether selected answer is correct or not
function checkAccuracy(selected,lblindex){
    selectedanswer = selected.value;
    lbl = document.querySelectorAll('label');
    if(selectedanswer == QuestionList[index].Answer){
        lbl[lblindex].style="color:green";
        showAnswerResult("Correct");
        addToAnswerKey(selectedanswer,"Correct");
        score = score + QuestionList[index].Score;
    }
    else{
        lbl[lblindex].style="color:red";
        showAnswerResult("Incorrect");
        addToAnswerKey(selectedanswer,"Incorrect");
    }
}
// to check whether option is selected or not
function checkanswer(){
    if(document.querySelector('input[name="option"]:checked')) {
        return true;
    }
    else{
        return false;
    }
}
// go to next question
function nextQuestion(){
    index=index+1;
    fetchQuestion(QuestionList[index]);
}
var index=0;
fetchQuestion(QuestionList[index]);