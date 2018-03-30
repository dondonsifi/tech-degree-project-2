const $pageHeader = document.querySelector(".page-header");

const $searchDiv = document.createElement("div");
$searchDiv.className = "student-search";
$pageHeader.append($searchDiv);

const $input = document.createElement("input");
$input.placeholder="search for students...";
$searchDiv.append($input);

const $searchButton = document.createElement("button");
$searchButton.textContent = "Search";
$searchDiv.append($searchButton);


const $page = document.querySelector(".page");
const $pagelinkDiv = document.createElement("div");
$pagelinkDiv.className = "pagination";
const $pagelinkUl = document.createElement("ul");
$page.append($pagelinkDiv);
$pagelinkDiv.append($pagelinkUl);

let clickPage = 1;
appendPageLink(5);

function appendPageLink(pageN){

  for (let i=1; i<=pageN; i++){
    let $li = document.createElement("li");
    let $a = document.createElement("a");
    $a.textContent = i;
    $a.href="#"
    if (clickPage == i){
    $a.className = "active";
    }
    $pagelinkUl.append($li);
    $li.append($a);

}};
