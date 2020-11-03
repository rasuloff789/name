var workListArray = [];
var elToDoForm = document.querySelector(".todoForm")
var elToDoInput = elToDoForm.querySelector(".todoInput")
var elDangerCheckbox = elToDoForm.querySelector(".dangerCheckbox");
var workList = document.querySelector('.workList');


elToDoForm.addEventListener('submit' , function(evt){
  evt.preventDefault();
  workList.innerHTML = "" ;
  var toDoInputValue = elToDoInput.value;
  if (toDoInputValue === ""){
    alert(`o'zi bu narsani dasturchidan boshqasi tekshirmaydi : ) )`)
  }
  if (elDangerCheckbox.checked){
    workListArray.unshift(toDoInputValue);
  }else{
    workListArray.push(toDoInputValue);
  }
  for (work of workListArray){
    var newWork = document.createElement('li');
    newWork.textContent = work ; 
    workList.appendChild(newWork);
  }
  elToDoInput.value = "";
  elToDoInput.focus();
  elDangerCheckbox.checked = false ;
})