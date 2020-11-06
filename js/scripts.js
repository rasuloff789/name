//array ochib olamiz qaysiki ishlar ro'yhati uchun
var workListArray = [];
//htmldan elementlarni topib olamiz
var elToDoForm = document.querySelector(".todoForm")
var elToDoInput = elToDoForm.querySelector(".todoInput")
var elDangerCheckbox = elToDoForm.querySelector(".dangerCheckbox");
var workList = document.querySelector('.workList');

//formani tinglaymiz
elToDoForm.addEventListener('submit' , function(evt){
  //formani yuborilishini to'xtatamiz
  evt.preventDefault();
  //natijani htmllini boshida bo'shatib olamiz
  workList.innerHTML = "" ;
  // inputdan valusini olamiz
  var toDoInputValue = elToDoInput.value.trim();
  //inputga hechnarsa yozilmaganda nima chiqishi
  if (toDoInputValue === ""){
    alert(`o'zi bu narsani dasturchidan boshqasi tekshirmaydi : ) )`)
  }
  
  //checked qilib yuborilgan element arrayning boshiga qo'shib qo'yiladi
  if (elDangerCheckbox.checked){
    workListArray.unshift(toDoInputValue);
  }else{
    //aks holda esa oxiriga
    workListArray.push(toDoInputValue);
  }
  for (work of workListArray){
    // har bir elementni tanlab olib ularni ekranga chiqaramiz
    var newWork = document.createElement('li');
    newWork.textContent = work ; 
    workList.appendChild(newWork);
  }
  // oxirida inputni valuesini bo'shatib fozusni inputga qaratamiz va yana checkboxni checked holatini o'chirib qo'yamiz
  elToDoInput.value = "";
  elToDoInput.focus();
  elDangerCheckbox.checked = false ;
})