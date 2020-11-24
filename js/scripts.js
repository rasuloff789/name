//array ochib olamiz qaysiki ishlar ro'yhati uchun
var workListArray = [];
//htmldan elementlarni topib olamiz
var elToDoForm = document.querySelector(".todoForm")
var elToDoInput = elToDoForm.querySelector(".todoInput")
var elDangerCheckbox = elToDoForm.querySelector(".dangerCheckbox");
var workList = document.querySelector('.workList');
var workTemplate = document.querySelector("#work-template").content;
//formani tinglaymiz

var createWorkElement = function(i){
  var elNewWork = workTemplate.cloneNode(true) ;
  var resultText = elNewWork.querySelector(".js-result-text");
  resultText.textContent = i.work ;
  return elNewWork;
};

var renderWorks = function (works) {
  
  workList.innerHTML = "" ;
  
  var elWorkWrapperFragment = document.createDocumentFragment();
  
  works.forEach(function (work) {
    elWorkWrapperFragment.appendChild(createWorkElement(work));
  });
  
  workList.appendChild(elWorkWrapperFragment);
};

elToDoForm.addEventListener('submit' , function(evt){
  //formani yuborilishini to'xtatamiz
  evt.preventDefault();
  //natijani htmllini boshida bo'shatib olamiz
  // inputdan valusini olamiz
  var toDoInputValue = elToDoInput.value.trim();
  //inputga hechnarsa yozilmaganda nima chiqishi
  if (toDoInputValue === ""){
    alert(`o'zi bu narsani dasturchidan boshqasi tekshirmaydi : ) )`)
  }
  
  var addedObject = {
    work : toDoInputValue,
    isUrgent : true ,
    completed : false 
  };
  
  //checked qilib yuborilgan element arrayning boshiga qo'shib qo'yiladi
  if (elDangerCheckbox.checked){
    workListArray.push(addedObject);
  }else{
    //aks holda esa oxiriga
    addedObject.isUrgent = false ;
    workListArray.push(addedObject);
  }
  
  workListArray.sort(function(b , a){
    if(a.isUrgent){
      return 1;
    };
    if(b.isUrgent){
      return -1;
    };
    return 0;
  });
  renderWorks(workListArray);
  var allMessages = document.querySelectorAll(".js-result-text");
  var  completeWork = document.querySelectorAll(".js-checkbox");
  var endWork = function(){
    workListArray.forEach(function(work , i){
      if(work.completed){
        allMessages[i].classList.add('text-dotted');
        completeWork[i].checked = true ;
      }else{
        allMessages[i].classList.remove('text-dotted');
        completeWork[i].checked = false ;
      };
    });
  };
  
  endWork();
  
  completeWork.forEach(function(btn , i ){
    btn.addEventListener('change' , function(){
      if(btn.checked){
        workListArray[i].completed = true ; 
      }else{
        workListArray[i].completed = false ; 
      }
      endWork();
    });
  });
  
  
  var deleteWorkBtns = document.querySelector(".js-delete-btn");
  var elWork = document.querySelectorAll(".js-work");
  
  
  // workList.addEventListener('click' , (evt , i) =>{
  //   if (evt.target.matches(".js-delete-btn")){
  //     // console.log("message");
  //     workListArray.splice(i , 1);
  //     renderWorks(workListArray);
  //   }
  // });
  
  deleteWorkBtns.forEach(function(btn , i ){
    btn.addEventListener('click' , function(){
      elWork[i].remove();
      workListArray.splice(i , 1);
    });
  });
  
  
  
  // oxirida inputni valuesini bo'shatib fozusni inputga qaratamiz va yana checkboxni checked holatini o'chirib qo'yamiz
  elToDoInput.value = "";
  elToDoInput.focus();
  elDangerCheckbox.checked = false ;
})



