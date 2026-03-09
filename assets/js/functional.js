let totalCount = document.getElementById("issues");
let openList = [];
let closedList =[];
let currentStatus = 'allBtn';
const allCards = document.getElementById("main-parent");

const allCardSection = document.getElementById('main-parent');
const filteredSection =document.getElementById("filtered-parent");

const manageSpinner = (status) => {
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("filtered-parent").classList.add("hidden");
    }
    else{
        document.getElementById("filtered-parent").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

function cardCount(){

    if(currentStatus === 'allBtn'){
        totalCount.innerText = allCardSection.children.length;
    }
    else{
        totalCount.innerText = filteredCards.children.length;
    }
}

const allToggleBtn = document.getElementById('allBtn');
const openToggleBtn = document.getElementById('openBtn');
const closedToggleBtn = document.getElementById('closedBtn');

const filteredCards = document.getElementById('filtered-parent');

const loadCards = () => {
    manageSpinner(true);

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => displayCard(json.data));
};
const displayCard = (cards) =>{
    manageSpinner(true);
    const mainParent = document.getElementById("main-parent");
    mainParent.innerHTML = "" ;

    for(let card of cards){

        if(card.status === "open"){
            openList.push(card);
        }
        else{
            closedList.push(card);
        }

        let borderColor = card.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]" ;
        let statusIcon = card.status === "open" ? `<i class="fa-regular fa-circle-check"></i>` : `<i class="fa-solid fa-circle-check"></i>`;
        let statusColor = card.status === "open" ? "text-[#00A96E]" : "text-[#A855F7]" ;

        let priorityColor = "";
        if(card.priority === "high"){
            priorityColor = "bg-red-200 text-red-500 border-red-500";
        }
        else if(card.priority === "medium"){
            priorityColor = "bg-yellow-200 text-yellow-600 border-yellow-600";
        }
        else{
            priorityColor = "bg-gray-200 text-gray-400 border-gray-400";
        }

        const cardDiv = document.createElement("div");

        cardDiv.className = `card-item shadow-md p-5 border-t-4 ${borderColor} rounded-md h-full`;

        cardDiv.innerHTML = `
                                <div class="card-toper space-y-2">
                                    <div class="card-stat flex justify-between h-full">
                                    <div class="card-start ${statusColor} flex items-center gap-1">
                                    <p>${statusIcon}</p>
                                    <p>${card.status}</p>
                                    </div>
                                    
                                    <p class="card-stat-condition px-3 py-1 rounded-full border ${priorityColor}">${card.priority}</p>
                                    </div>
                                </div>

                                <div class="card-content space-y-2 mb-[20px] mt-3">
                                    <h4 class="text-lg font-bold">${card.title}</h4>
                                    <p class="text-[#64748b]">${card.description}</p>
                                    <div class="labels flex gap-2 flex-wrap">
                                        ${card.labels.map(label => `
                                            <p class="px-3 py-1 rounded-full bg-[#FDE68A] border border-[#D97706] text-[#D97706]">
                                                ${label}
                                            </p>
                                        `).join("")}
                                    </div>
                                </div>

                                <hr class="border-[#f2f2f2]">

                                <div class="card-bottom mt-[15px] text-[#64748b] flex flex-wrap">
                                    <p>${card.author}</p>
                                    <p>${card.createdAt}</p>
                                </div>
        `
        

        mainParent.appendChild(cardDiv);
    }
    cardCount()
};
loadCards();

function toggleStyle(id){
    manageSpinner(true);
    allToggleBtn.classList.remove('bg-primary', 'text-white');
    openToggleBtn.classList.remove('bg-primary', 'text-white');
    closedToggleBtn.classList.remove('bg-primary', 'text-white');

    allToggleBtn.classList.add('bg-white', 'text-[#64748B]');
    openToggleBtn.classList.add('bg-white', 'text-[#64748B]');
    closedToggleBtn.classList.add('bg-white', 'text-[#64748B]');

    const selected = document.getElementById(id);
    currentStatus = id;

    selected.classList.remove('bg-white', 'text-[#64748B]');
    selected.classList.add('bg-primary', 'text-white');

    if(id == 'openBtn'){
        allCardSection.classList.add('hidden');
        filteredCards.classList.remove('hidden');
        addOpen()
    }
    else if(id == 'closedBtn'){
        allCardSection.classList.add('hidden');
        filteredCards.classList.remove('hidden');
        addClose()
    }
    else if(id == 'allBtn'){
        allCardSection.classList.remove('hidden');
        filteredCards.classList.add('hidden');
    }
    
}


function addOpen(){
    filteredCards.innerHTML = ""

    for(let item of openList){
        let borderColor = item.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]" ;
        let statusIcon = item.status === "open" ? `<i class="fa-regular fa-circle-check"></i>` : `<i class="fa-solid fa-circle-check"></i>`;
        let statusColor = item.status === "open" ? "text-[#00A96E]" : "text-[#A855F7]" ;

        let priorityColor = "";
        if(item.priority === "high"){
            priorityColor = "bg-red-200 text-red-500 border-red-500";
        }
        else if(item.priority === "medium"){
            priorityColor = "bg-yellow-200 text-yellow-600 border-yellow-600";
        }
        else{
            priorityColor = "bg-gray-200 text-gray-400 border-gray-400";
        }

        let div = document.createElement('div');

        div.className = `card-item shadow-md p-5 border-t-4 ${borderColor} rounded-md h-full`;
        div.innerHTML = `
                                <div class="card-toper space-y-2">
                                    <div class="card-stat flex justify-between h-full">
                                    <div class="card-start ${statusColor} flex items-center gap-1">
                                    <p>${statusIcon}</p>
                                    <p>${item.status}</p>
                                    </div>
                                    
                                    <p class="card-stat-condition px-3 py-1 rounded-full border ${priorityColor}">${item.priority}</p>
                                    </div>
                                </div>

                                <div class="card-content space-y-2 mb-[20px] mt-3">
                                    <h4 class="text-lg font-bold">${item.title}</h4>
                                    <p class="text-[#64748b]">${item.description}</p>
                                    <div class="labels flex gap-2 flex-wrap">
                                        ${item.labels.map(label => `
                                            <p class="px-3 py-1 rounded-full bg-[#FDE68A] border border-[#D97706] text-[#D97706]">
                                                ${label}
                                            </p>
                                        `).join("")}
                                    </div>
                                </div>

                                <hr class="border-[#f2f2f2]">

                                <div class="card-bottom mt-[15px] text-[#64748b] flex flex-wrap">
                                    <p>${item.author}</p>
                                    <p>${item.createdAt}</p>
                                </div>
        `
        filteredCards.appendChild(div);
    }
    cardCount()
    manageSpinner(false);
}
function addClose(){
    filteredCards.innerHTML = ""

    for(let item of closedList){

        let borderColor = item.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]" ;
        let statusIcon = item.status === "open" ? `<i class="fa-regular fa-circle-check"></i>` : `<i class="fa-solid fa-circle-check"></i>`;
        let statusColor = item.status === "open" ? "text-[#00A96E]" : "text-[#A855F7]" ;

        let priorityColor = "";
        if(item.priority === "high"){
            priorityColor = "bg-red-200 text-red-500 border-red-500";
        }
        else if(item.priority === "medium"){
            priorityColor = "bg-yellow-200 text-yellow-600 border-yellow-600";
        }
        else{
            priorityColor = "bg-gray-200 text-gray-400 border-gray-400";
        }

        let div = document.createElement('div');

        div.className = `card-item shadow-md p-5 border-t-4 ${borderColor} rounded-md h-full`;
        div.innerHTML = `
                                <div class="card-toper space-y-2">
                                    <div class="card-stat flex justify-between h-full">
                                    <div class="card-start ${statusColor} flex items-center gap-1">
                                    <p>${statusIcon}</p>
                                    <p>${item.status}</p>
                                    </div>
                                    
                                    <p class="card-stat-condition px-3 py-1 rounded-full border ${priorityColor}">${item.priority}</p>
                                    </div>
                                </div>

                                <div class="card-content space-y-2 mb-[20px] mt-3">
                                    <h4 class="text-lg font-bold">${item.title}</h4>
                                    <p class="text-[#64748b]">${item.description}</p>
                                    <div class="labels flex gap-2 flex-wrap">
                                        ${item.labels.map(label => `
                                            <p class="px-3 py-1 rounded-full bg-[#FDE68A] border border-[#D97706] text-[#D97706]">
                                                ${label}
                                            </p>
                                        `).join("")}
                                    </div>
                                </div>

                                <hr class="border-[#f2f2f2]">

                                <div class="card-bottom mt-[15px] text-[#64748b] flex flex-wrap">
                                    <p>${item.author}</p>
                                    <p>${item.createdAt}</p>
                                </div>
        `
        filteredCards.appendChild(div);
    }
    cardCount()
    manageSpinner(false);
}

