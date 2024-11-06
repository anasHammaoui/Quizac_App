// quiz questions
let questAns = {
    quests: [
        "Complétez la phrase :Je ___ à la maison",
         "Quel est l'article correct pour 'chat' ?",
         "Comment dit-on 'Good morning' en français ?",
         'Choisissez le bon pronom : "Marie et ___ partons demain."',
         'Complétez la phrase : "Il est huit heures ___."',
         "Traduisez 'I like apples':",
         "Complétez : Si j'avais de l'argent, je ___ en voyage.",
         "Quel mot est correct ? C'est un ___ important pour le projet.",
         "Complétez la phrase : Il pleut ___ nous restons à l'intérieur.",
         "Quel est le synonyme de 'rapide' ?"
    ],
    answers: [
        ["a) va", "b) vais","c) vont"],
        ["a) La","b) Les","c) Le"],
        ["a) Bonsoir","b) Bonjour","c) Bonne nuit"],
        ["a) moi","b) je","c) nous"],
        ["a) et demie","b) du soir","c) de soir"],
        ["a) J’aime des pommes","b) J’aime les pommes","c) Je mange des pommes"],
        ["a) vais","b) irai","c) irais"],
        ["a) sujet","b) sujette","c) sujété"],
        ["a) et","b) donc","c) mais"],
        ["a) lent","b) vite ","c) tard"]
],
    correct: [1,2,1,0,0,1,2,0,1,1]
};
// start quiz
document.addEventListener("DOMContentLoaded",()=>{
    let htmlQuest = document.querySelector(".quest-quest");
    let htmlAnswers = document.querySelectorAll(".reponse");
    let  clicked = false;
    // async fun to check if answer is clicked
    async function chosenAns(ans){
         ans.addEventListener("click",()=>{
            clicked = true;
        })
    }
    // show questions
    questAns.quests.forEach((quest,num)=>{
        htmlQuest.textContent = quest;
        htmlAnswers.forEach((ansHtml,ansIndex)=>{
            ansHtml.textContent = questAns.answers[num][ansIndex];
            console.log(quest,questAns.answers[num][ansIndex] )
        })
            if (clicked != true){
                htmlAnswers.forEach(ans=>{
                     chosenAns(ans);
                    console.log("clicked");
                    console.log(clicked)
                })
            }
        clicked = false;
    })
})