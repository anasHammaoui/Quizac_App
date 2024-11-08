// getting elemennts
let rapportContainer = document.querySelector(".rapport");
// getting quests and data from local storage
let allQuests = JSON.parse(localStorage.getItem("allQuests"));
// show the data from local storage to rapport page
allQuests.quests.forEach((q,i)=>{
    rapportContainer.innerHTML += `
         <div class="quest-box">
            <h2 class="rapport-quest">${q}</h2>
           <h3>Votre Reponse: <span class="correct">${allQuests.answers[i][allQuests.selected[i]]}</span></h3>
           <h3>Correct Reponse: <span class="false">${allQuests.answers[i][allQuests.correct[i]]}</span></h3>  
           </div>
    `
})
// download rapport
var element = document.getElementById("body");
console.log(html2pdf(element))