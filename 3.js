const questions=[
    {
        question:"which is the largest animal in the world ?",
        answers:[
            {text:"shark",correct:false},
            {text:"elephant",correct:true},
            {text:"crocodile",correct:false},
            {text:"lion",correct:false}
        ]
    },
    {
        question:"which is the largest river in the world ?",
        answers:[
            {text:"ganga",correct:false},
            {text:"misipi",correct:true},
            {text:"haldi",correct:false},
            {text:"keleghai",correct:false}
        ]
    },
    {
        question:"what is the capital of india ?",
        answers:[
            {text:"kolkata",correct:false},
            {text:"delhi",correct:true},
            {text:"haryana",correct:false},
            {text:"chandigarh",correct:false}
        ]
    }
]
// int the above row we are just created an array of objects by which we parse the ans
const questionElement=document.querySelector(".question")

const ansButton=document.querySelector(".ans-buttons")
const nextButton=document.querySelector(".next")
// selecting the elements
let currentQuestionIndex=0;
let score=0;
function startQuize(){
    currentQuestionIndex=0;
    score=0;                              //the main function in which the app is running
nextButton.innerHTML="next"
showQuestion()
}
function showQuestion(){
    resetState()   // this is for removing the previous childs or buttons
    let currentQuestion=questions[currentQuestionIndex]
    let questionNo=currentQuestionIndex+1;  //added 1 for 1 based indexing
    questionElement.innerHTML=questionNo+". "+currentQuestion.question
    
    //for each objects question part we show the question along with the serial no.

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        ansButton.appendChild(button);
        //above this we created child for every ans of objects created 
        //and after that added into the class list
      
        if(answer.correct){
            button.dataset.correct=answer.correct   //adding true and false in a dataset
            //how many time loop goes the datasets value is  added to this na using this we can evaluate
        }

   button.addEventListener("click",selectAnswer)
    })
}

function resetState(){
    nextButton.style.display="none"

    while(ansButton.firstChild){
        ansButton.removeChild(ansButton.firstChild)
    }
}

function selectAnswer(e){
    const selectBtn=e.target;
    const isCorrect=selectBtn.dataset.correct==="true";
    if(isCorrect){
        selectBtn.classList.add("correct") 
        score++   //the main sequence=button->e.target->selectbtn->class name changing->correct=green,incorrect=red
    }
    else{
        selectBtn.classList.add("incorrect")
    }
    // nextButton.style.display="flex"
    Array.from(ansButton.children).forEach(button=>{
        if(button.dataset.correct==='true'){
            button.classList.add("correct")
        }
        button.disabled=true;
    })
    nextButton.style.display="block"
}
function handleNext(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion()
    }else{
        showScore()
    }
}
function showScore(){
    resetState();
    questionElement.innerHTML=`you score is ${score} out of 3`
    nextButton.innerHTML="play again"
    nextButton.style.display="block"
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNext()
    }else{
        startQuize()
    }
})
startQuize();