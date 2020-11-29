var elForm = document.querySelector(".todo-form");
var elInput = elForm.querySelector(".todo-input");
var elDangerCheckbox = elForm.querySelector(".danger-checkbox");
var elWorkTemplate = document.querySelector("#work-template").content;

var elWorksList = document.querySelector(".work-list");

var worksArray = JSON.parse(localStorage.getItem("storage")) || [];

var showBtns = function(){
  if(worksArray.length > 0){
    document.querySelector(".buttons").classList.add("d-md-flex");
    document.querySelector(".buttons").classList.remove("d-none");
  }else{
    document.querySelector(".buttons").classList.remove("d-md-flex");
    document.querySelector(".buttons").classList.add("d-none");
  }
};

if (worksArray.length <= 0){
  var ID = 1 ;
}else if(worksArray.length === 1){
  var ID = worksArray[0].id ;
}else {
  var ID = worksArray[worksArray.length - 1].id;
};

var updateStorage = ()=>{
  var worksToString = JSON.stringify(worksArray);
  localStorage.setItem("storage" , worksToString );
};

var createWork =  function (work) {
  var elWorkTemplateClone = elWorkTemplate.cloneNode(true) ; 
  elWorkTemplateClone.querySelector(".js-checkbox").dataset.id = work.id;
  elWorkTemplateClone.querySelector(".js-result-text").textContent = work.name;
  elWorkTemplateClone.querySelector(".js-result-text").dataset.id = work.id;
  elWorkTemplateClone.querySelector(".js-delete-btn").dataset.id = work.id;
  return elWorkTemplateClone ;
};

var renderWorks = function (array) {
  
  elWorksList.innerHTML = "";
  
  var elWorkWrapperFragment = document.createDocumentFragment();
  
  array.forEach(function (work) {
    elWorkWrapperFragment.appendChild(createWork(work));
  });
  
  elWorksList.appendChild(elWorkWrapperFragment);
};

var renderLeftItems = ()=>{
  var leftWorks =  worksArray.filter(( work)=>{
    return !(work.complated) ;
  });
  document.querySelector(".left-works").textContent = leftWorks.length ;
};

var renderComplatedWorks = ()=>{
  var complatedWorks =  worksArray.filter(( work)=>{
    return work.complated;
  });
  document.querySelector(".delete-complated-items-number").textContent = complatedWorks.length ;
};

var showDltCompletedWrksBtn = ()=>{
  var complatedWorks =  worksArray.filter(( work)=>{
    return work.complated;
  });
  if (complatedWorks.length > 0){
    document.querySelector(".detele-complated-items-btn").classList.add("d-block");
    document.querySelector(".detele-complated-items-btn").classList.remove("d-none");
  }else{
    document.querySelector(".detele-complated-items-btn").classList.remove("d-block");
    document.querySelector(".detele-complated-items-btn").classList.add("d-none");
  }
};

var renderEndingWorks = function (array) {
  var workItems = document.querySelectorAll(".js-work");
  array.forEach((work , i)=>{
    if (work.complated) {
      workItems[i].querySelector(".work-item-span").classList.add('text-dotted');
      workItems[i].querySelector(".work-item-checkbox").checked = true;
    } else {
      workItems[i].querySelector(".work-item-span").classList.remove('text-dotted');
      workItems[i].querySelector(".work-item-checkbox").checked = false;
    };
  });
};

elForm.addEventListener("submit" ,(evt)=>{
  evt.preventDefault();
  var elInputValue = elInput.value.trim();
  if (elInputValue === ""){
    alert("brat iltimos biror nima yozing :))");
    return;
  }
  var infoWork = {
    name : elInputValue,
    id : ID++ ,
    isUrgent : false ,
    complated : false
  };
  
  if (elDangerCheckbox.checked){
    infoWork.isUrgent = true ;
  }
  worksArray.push(infoWork);
  
  worksArray.sort((b , a)=>{
    if (a.isUrgent) {
      return 1;
    };
    if (b.isUrgent) {
      return -1;
    };
    return 0;
  });
  
  renderWorks(worksArray);
  renderEndingWorks(worksArray);
  showDltCompletedWrksBtn();
  renderLeftItems();
  showBtns();
  updateStorage();
  
  elDangerCheckbox.checked = false ;
  elInput.value = "";
});


elWorksList.addEventListener("click" , (evt)=>{
  if (evt.target.matches(".js-delete-btn")){
    var indexBtn = evt.target.dataset.id ;
    var indexWork = worksArray.findIndex((work) =>{
      return indexBtn === work.id.toString();
    });
    worksArray.splice(indexWork ,1);
    renderWorks(worksArray);
  }else if (evt.target.matches(".js-checkbox")){
    var indexCheckbox = evt.target.dataset.id ;
    var indexWork = worksArray.findIndex((work) =>{
      return indexCheckbox === work.id.toString();
    });
    if(evt.target.checked){
      worksArray[indexWork].complated = true;
    }else{
      worksArray[indexWork].complated = false;
    };
  };
  showBtns();
  renderComplatedWorks();
  renderLeftItems();
  showDltCompletedWrksBtn();
  renderEndingWorks(worksArray);
  updateStorage();
});



document.querySelector(".buttons").addEventListener("click" , (evt)=>{
  if(evt.target.matches(".show-all-btn")){
    renderWorks(worksArray);
    renderEndingWorks(worksArray);
  }
  if(evt.target.matches(".show-complated-btn")){
    var complatedArray = worksArray.filter((work)=>{
      return work.complated ;
    });
    renderWorks(complatedArray);
    renderEndingWorks(complatedArray);
  }
  if(evt.target.matches(".show-active-btn")){
    var complatedArray = worksArray.filter((work)=>{
      return !(work.complated) ;
    });
    renderWorks(complatedArray);
    renderEndingWorks(complatedArray);
  }
  if (evt.target.matches(".detele-complated-items-btn")){
    worksArray =  worksArray.filter((work)=>{
      return !(work.complated);
    });
    showDltCompletedWrksBtn();
    showBtns();
    renderWorks(worksArray);
    renderEndingWorks(worksArray);
    updateStorage();
  };
  if (evt.target.matches(".delete-all-btn")){
    worksArray = [];
    renderWorks(worksArray);
    showBtns();
    updateStorage();
  }
});

renderLeftItems();
showDltCompletedWrksBtn();
renderComplatedWorks();
showBtns();
renderWorks(worksArray);
renderEndingWorks(worksArray);