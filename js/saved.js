
// get all scores from local storage and print them in saved.html
let savedScores = JSON.parse(localStorage.getItem("allScores")) || [];
let savedContainer = document.querySelector(".saved");
if (savedScores.scores != undefined || savedScores.scores != null) {
    savedScores.scores.forEach((_,i)=>{
        savedContainer.insertAdjacentHTML("afterbegin",`
       <h2 class="saved-box">
       <span class="saved-level">Niveau ${savedScores.level[i]} :</span> <span class="saved-score">"${savedScores.scores[i]}/10"</span>
       </h2> 
        ` );
    })
} else{
    savedContainer.innerHTML = "<h3>Vous faites aucun quiz!</h3>"
}
// delete button to delete all scores from local storage
document.querySelector(".delete").addEventListener("click",()=>{
    localStorage.clear();
})