// getting elemennts
let rapportContainer = document.querySelector(".rapport");
// getting quests and data from local storage
let allQuests = JSON.parse(localStorage.getItem("allQuests"));
// show the data from local storage to rapport page
allQuests.quests.forEach((q,i)=>{
    // if the answer is not correct
     if (allQuests.selected[i] == -1){  // the is no answer(count down over)
        rapportContainer.innerHTML += `
         <div class="quest-box">
            <h2 class="rapport-quest">${q}</h2>
           <h3>Votre Reponse: <span class="correct" style="color:red;">No reponse</span></h3>
           <h3>Correct Reponse: <span class="false" style="color:green;">${allQuests.answers[i][allQuests.correct[i]]}</span></h3>  
           </div>
    `
    } else if (allQuests.answers[i][allQuests.selected[i]] != allQuests.answers[i][allQuests.correct[i]]){
        rapportContainer.innerHTML += `
         <div class="quest-box">
            <h2 class="rapport-quest">${q}</h2>
           <h3>Votre Reponse: <span class="correct" style="color:red;">${allQuests.answers[i][allQuests.selected[i]]}</span></h3>
           <h3>Correct Reponse: <span class="false" style="color:green;">${allQuests.answers[i][allQuests.correct[i]]}</span></h3>  
           </div>
    `
    } else  { //if the answer is correct
        rapportContainer.innerHTML += `
        <div class="quest-box">
           <h2 class="rapport-quest">${q}</h2>
          <h3>Votre Reponse: <span class="correct" style="color:green;">${allQuests.answers[i][allQuests.selected[i]]}</span></h3>
          <h3>Correct Reponse: <span class="false" style="color:green;">${allQuests.answers[i][allQuests.correct[i]]}</span></h3>  
          </div>
   `
    }
    
})
// download rapport
var element = document.getElementById("body");
console.log(html2pdf(element))