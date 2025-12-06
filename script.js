const input = document.querySelector('#quote-input');
const list = document.querySelector('#quotes-list');
const addBtn = document.querySelector('#add-quote-btn');
const clearAll = document.querySelector('#clear-all-btn');
const emptyState = document.querySelector('#empty-state')
const quoteCnt = document.querySelector('#quote-count');
let cnt = 0;

const months =
[
  'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

function renderQuotes() {
    list.innerHTML = "";
    cnt = 0;

    quotes.forEach((q, i) => {
        cnt++;
        list.innerHTML += 
        `
        <li class="quote-item">
            <div class="quote-text">${i + 1}: ${q.text}</div>
            <div class="quote-date">${q.date}</div>
            <button class="delete-btn" data-index="${i}">✕</button>
        </li>
        `
    });
    quoteCnt.innerText = `${cnt} quotes`
    adjustEmptyState(cnt);
}

//handling empty state
function adjustEmptyState(cnt) {
    emptyState.style.display = (cnt == 0) ? 'flex' : 'none'
}

addBtn.addEventListener('click', ()=>{
    const text = input.value;
    if(!text) return;

    let d = new Date();
    const din = d.getDate();
    const monthIndx = d.getMonth();
    const year = d.getFullYear();

    const date = `${din} / ${months[monthIndx]} / ${year}`
    

    quotes.push({text, date});
    saveQuotes();
    renderQuotes();

    input.value = "";
})

//add quotes when pressed enter

input.addEventListener('keydown', (e)=>{
    if(e.key == 'Enter') addBtn.click();
})

//delete quotes

list.addEventListener('click', e=>{
    if(e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        quotes.splice(index, 1);
        saveQuotes();
        renderQuotes();
    }
})

//clear all btn
clearAll.addEventListener('click', e=>{
    quotes.splice(0, quotes.length);
    saveQuotes();
    renderQuotes();
})

renderQuotes();