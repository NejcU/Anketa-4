const audioFiles = [
    "audio/Nrm1-M2_puck_PLOW_RNORMAL_SNORMAL.wav",
    "audio/Nrm1-M2_puck_PNORMAL_RNARROW_SNORMAL.wav",
    "audio/Nrm1-M2_puck_PNORMAL_RNORMAL_SSLOW.wav",

    "audio/Nrm1-F2_sarah_PLOW_RNORMAL_SNORMAL.wav",
    "audio/Nrm1-F2_sarah_PNORMAL_RNARROW_SNORMAL.wav",
    "audio/Nrm1-F2_sarah_PNORMAL_RNORMAL_SSLOW.wav",

    "audio/Nrm2-M2_puck_PLOW_RNORMAL_SNORMAL.wav",
    "audio/Nrm2-M2_puck_PNORMAL_RNARROW_SNORMAL.wav",
    "audio/Nrm2-M2_puck_PNORMAL_RNORMAL_SSLOW.wav",

    "audio/Nrm2-F2_sarah_PLOW_RNORMAL_SNORMAL.wav",
    "audio/Nrm2-F2_sarah_PNORMAL_RNARROW_SNORMAL.wav",
    "audio/Nrm2-F2_sarah_PNORMAL_RNORMAL_SSLOW.wav",

    "audio/Krz1-M2_puck_PLOW_RNORMAL_SNORMAL.wav",
    "audio/Krz1-M2_puck_PNORMAL_RNARROW_SNORMAL.wav",
    "audio/Krz1-M2_puck_PNORMAL_RNORMAL_SSLOW.wav",

    "audio/Krz1-F2_sarah_PLOW_RNORMAL_SNORMAL.wav",
    "audio/Krz1-F2_sarah_PNORMAL_RNARROW_SNORMAL.wav",
    "audio/Krz1-F2_sarah_PNORMAL_RNORMAL_SSLOW.wav",

    "audio/Krz2-M2_puck_PLOW_RNORMAL_SNORMAL.wav",
    "audio/Krz2-M2_puck_PNORMAL_RNARROW_SNORMAL.wav",
    "audio/Krz2-M2_puck_PNORMAL_RNORMAL_SSLOW.wav",

    "audio/Krz2-F2_sarah_PLOW_RNORMAL_SNORMAL.wav",
    "audio/Krz2-F2_sarah_PNORMAL_RNARROW_SNORMAL.wav",
    "audio/Krz2-F2_sarah_PNORMAL_RNORMAL_SSLOW.wav"
];

let currentAudio = 0;

let answers = JSON.parse(
    localStorage.getItem("audioAnswers")
) || [];

const audioPlayer = document.getElementById("audioPlayer");
const audioTitle = document.getElementById("audioTitle");

const currentNumber =
    document.getElementById("currentNumber");

const totalNumber =
    document.getElementById("totalNumber");

const backButton =
    document.getElementById("backButton");

const nextButton =
    document.getElementById("nextButton");


// Število posnetkov
totalNumber.textContent = audioFiles.length;


// Prikaži trenutni posnetek
function showAudio() {

    audioTitle.textContent =
        "Posnetek " + (currentAudio + 1);

    currentNumber.textContent =
        currentAudio + 1;

    audioPlayer.src =
        audioFiles[currentAudio];

    audioPlayer.load();

    loadPreviousAnswer();
}


// Naloži prejšnji odgovor
function loadPreviousAnswer() {

    const answer = answers[currentAudio];

    document
        .querySelectorAll('input[name="quality"]')
        .forEach(input => {
            input.checked =
                answer && input.value == answer.quality;
        });

    document
        .querySelectorAll('input[name="clarity"]')
        .forEach(input => {
            input.checked =
                answer && input.value == answer.clarity;
        });
}


// Shrani trenutni odgovor
function saveAnswer() {

    const quality =
        document.querySelector(
            'input[name="quality"]:checked'
        );

    if (!quality) {

        alert(
            "Prosimo, odgovorite na vprašanje."
        );

        return false;
    }

    answers[currentAudio] = {

        quality: Number(quality.value),

    };

    localStorage.setItem(
        "audioAnswers",
        JSON.stringify(answers)
    );

    return true;
}


// Gumb Naprej
nextButton.addEventListener("click", function () {

    if (!saveAnswer()) {
        return;
    }

    if (currentAudio < audioFiles.length - 1) {

        currentAudio++;

        showAudio();

    } else {

        submitSurvey();

    }
});

// Gumb Nazaj
backButton.addEventListener("click", function () {

    saveAnswer();

    if (currentAudio > 0) {

        currentAudio--;

        showAudio();

    } else {

        window.location.href =
            "index.html";
    }
});


// Prikaži začetni posnetek
showAudio();

function submitSurvey() {

    console.log("Začenjam oddajo ankete.");
    console.log("Answers:", answers);

    const form =
        document.getElementById("surveyForm");

    // Nastavimo, kam se obrazec pošlje
    form.method = "POST";
    form.action = "https://script.google.com/macros/s/AKfycbx0tuOLMXTwat2qnhWbYPLhZY2OiI67B1P_nFMvRkgCTJfhpJyAgMv2rwu2pDXCNQ2iCg/exec";
    form.target = "submitFrame";

    // Ustvarimo skriti input
    let dataInput =
        document.getElementById("surveyData");

    if (!dataInput) {

        dataInput =
            document.createElement("input");

        dataInput.type = "hidden";
        dataInput.name = "data";
        dataInput.id = "surveyData";

        form.appendChild(dataInput);
    }

    // V input shranimo vse odgovore
    dataInput.value = JSON.stringify({
        group: "Sk4-M2Ž2",
        answers: answers
    });

    console.log(
        "Podatki za pošiljanje:",
        dataInput.value
    );

    // Pošlji obrazec
    form.submit();

    console.log("Obrazec poslan.");

    setTimeout(function () {

        window.location.href =
            "konec.html";

    }, 1500);
}