const loadCards = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => displayCard(json.data));
};
const displayCard = (cards) =>{
    const mainParent = document.getElementById("main-parent");
    mainParent.innerHTML = "" ;

    for(let card of cards){

        let borderColor = card.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]" ;

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

        cardDiv.className = `card-item shadow-md p-5 border-t-4 ${borderColor} rounded-md`;

        cardDiv.innerHTML = `
        <div class="card-toper space-y-2">
                                <div class="card-stat flex justify-between">
                                    <div class="card-stat-icon p-2 rounded-full bg-[#CBFADB]">
                                        <p class="text-[#00A96E]"><i class="fa-regular fa-circle"></i> ${card.status}</p>
                                    </div>
                                    <div class="card-stat-condition px-[30px] py-1 rounded-full border ${priorityColor}>
                                        <p>${card.priority}</p>
                                    </div>
                                </div>
                                <div class="card-content space-y-2 mb-[20px]">
                                    <h4 class="text-lg font-bold">${card.title}</h4>
                                    <p class="text-[#64748b]">${card.description}</p>
                                    <div class="labels flex gap-2">
                                        <div class=" text-[#EF4444] px-3  py-1 rounded-full bg-[#FECACA] border-1 border-[#EF4444] border-solid">
                                            <p>${card.labels[0]}</p>
                                        </div>
                                        <div class="assistance">
                                            <p class=" px-3  py-1 rounded-full bg-[#FDE68A] border-1 border-[#D97706] border-solid text-[#D97706]">${card.labels[1]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="border-[#f2f2f2]">
                            <div class="card-bottom mt-[15px] text-[#64748b]">
                                <p>${card.author}</p> 
                                <p>${card.createdAt}</p>
                            </div>
        `
        

        mainParent.appendChild(cardDiv);
    }
};
loadCards();