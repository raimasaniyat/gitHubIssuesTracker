const loadCards = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => displayCard(json.data));
};
const displayCard = (cards) =>{
    const mainParent = document.getElementById("main-parent");
    mainParent.innerHTML = "" ;

    for(let card of cards){

        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
        <div class="card-item w-[250px] shadow-md p-5 border-t-4 border-[#00A96E] border-solid rounded-md">
                        <div class="card-wrap ">
                            <div class="card-toper space-y-2">
                                <div class="card-stat flex justify-between">
                                    <div class="card-stat-icon p-2 rounded-full bg-[#CBFADB]">
                                        <p class="text-[#00A96E]"><i class="fa-regular fa-circle"></i></p>
                                    </div>
                                    <div class="card-stat-condition px-[30px] py-1 rounded-full bg-[#FECACA] text-[#EF4444] border-1 border-[#EF4444] border-solid">
                                        <p>High</p>
                                    </div>
                                </div>
                                <div class="card-content space-y-2 mb-[20px]">
                                    <h4 class="text-lg font-bold">Fix navigation menu on mobile devices</h4>
                                    <p class="text-[#64748b]">The navigation menu doesn't collapse properly on mobile devices...</p>
                                    <div class="labels flex gap-2">
                                        <div class="bugs text-[#EF4444] px-3  py-1 rounded-full bg-[#FECACA] border-1 border-[#EF4444] border-solid">
                                            <p>Bug</p>
                                        </div>
                                        <div class="assistance">
                                            <p class=" px-3  py-1 rounded-full bg-[#FDE68A] border-1 border-[#D97706] border-solid text-[#D97706]">help wanted</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="border-[#f2f2f2]">
                            <div class="card-bottom mt-[15px] text-[#64748b]">
                                <p>#1by john_doe</p> 
                                <p>1/15/2024</p>
                            </div>
                        </div>
                    </div>
        `
        mainParent.appendChild(cardDiv);
    }
};
loadCards();