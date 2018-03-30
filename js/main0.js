
const $studentList = document.querySelectorAll(".student-item");
const $studentPage = document.querySelector(".page");
const $pagination = document.querySelector(".pagination");
const $ul=$pagination.firstElementChild;
const $pageHeader = document.querySelector(".page-header");
let matched = []; //initial search result
let clickPage = 1; //initial default  page
let studentsPerPage = 10;//initial numbers of students show in one page
let initialPage = 1;
let numberOfPage = Math.ceil($studentList.length/studentsPerPage);// caluate numbers of pages when load the page first time.

console.log(numberOfPage); //test
console.log($studentList.length);//test

 //first time page loaded to show first 10 students and Pagelink
hideStudents();
showStudents (initialPage,studentsPerPage);
appendPageLink(numberOfPage);

//addEventListener to click and show students of studentsPerPage
  $pagination.addEventListener("click", (event)=> {
    clickPage = event.target.textContent;// record which page# is click
    removePageLink(numberOfPage);
    hideStudents(); //hide all students
    if(matched.length == 0){ //show all the students otherwise show seach result
     showStudents (clickPage,studentsPerPage); //show students
   }else{
     matchedStudents(clickPage,studentsPerPage);//show  search result
   }
    appendPageLink(numberOfPage); //re-arrange the pagelink.
})

//search function and create elements
const $searchDiv = document.createElement("div");
  $searchDiv.className = "student-search";
const $searchInput = document.createElement("input");
  $searchInput.type = "text";
  $searchInput.id = "search";
  $searchInput.placeholder = "search for students.....";
const $searchButton = document.createElement("button");
  $searchButton.textContent  = "Search";
$pageHeader.append($searchDiv);
$searchDiv.append($searchInput);
$searchDiv.append($searchButton);

//search event
$searchButton.addEventListener("click",()=>{
  searchInput = $searchInput.value.toLowerCase();
  matched = []; //zero matched array

//input valiation input requit greater than 3 charaters
if (searchInput =="" ){ // show alert when input is empty
  alert("input is empty string")
}else{
  $studentList.forEach((student)=>{ //find all the matched students and store it in matched array
    let $studentName = student.querySelector(".student-details h3").textContent;
    let $studentEmail = student.querySelector(".student-details .email").textContent;
    if ($studentName.toLowerCase().includes(searchInput) || $studentEmail.toLowerCase().includes(searchInput)){
    matched.push(student); //store matched students,
    console.log(matched.length);//test
    }
  });
// show search search in HTML with pagelink
  if (matched.length>studentsPerPage) {
    removePageLink(numberOfPage) //remove previous pagelink
    numberOfPage = Math.ceil(matched.length/studentsPerPage);
    hideStudents();
    clickPage = 1;
    matchedStudents(clickPage,studentsPerPage);
    appendPageLink(numberOfPage);
    $pagination.style.display = "";
  }else if(matched.length > 0){ //show search result in HML without pagelink
    $pagination.style.display = "none";
    hideStudents();
    matched.forEach(student=>{
      student.style.display = "";
    });

  }else { //alert when no student matched
    alert("no student found");
    console.log("no student found");
  }
}
});


// hide all students
function hideStudents(){
  for (let i=0; i<$studentList.length; i++){
    $studentList[i].style.display = "none";
}};
//show students function

function matchedStudents (pageNumber,maxStudentsToDisplay){
  let beginStudentList = (pageNumber-1)*maxStudentsToDisplay;
  let endStudentList = Math.min( ((pageNumber-1)*maxStudentsToDisplay) + maxStudentsToDisplay , matched.length);
  for (let i = beginStudentList; i<endStudentList; i++){
    matched[i].style.display = "";
  }
}
function showStudents (pageNumber,maxStudentsToDisplay){
  let beginStudentList = (pageNumber-1)*maxStudentsToDisplay;
  let endStudentList = Math.min( ((pageNumber-1)*maxStudentsToDisplay) + maxStudentsToDisplay , $studentList.length);
  for (let i = beginStudentList; i<endStudentList; i++){
    $studentList[i].style.display = "";
  }
}
//append pagelink function
//pass (pageN (total pages) to appendPageLink function
function appendPageLink(pageN){
  for (let i=1; i<=pageN; i++){

    let $li = document.createElement("li");
    let $a = document.createElement("a");
    $a.textContent = i;
    $a.href="#"
    if (clickPage == i){
    $a.className = "active";
    }
    $ul.append($li);
    $li.append($a);

}};

function removePageLink(pageN){
  for (let i=0; i<pageN; i++){  //remove previous page link.
     let $li = document.querySelector( ".pagination li")
     $ul.removeChild($li);
   }
}
