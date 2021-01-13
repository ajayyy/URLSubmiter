const textBox = document.getElementById("urls");
const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", (event) => {
    const urls = textBox.value.split("\n");

    fetch("/api/submitURLs", {
        method: "POST",
        body: JSON.stringify({
            urls
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch((err) => {
        alert("Submission failed: \n\n" + err);
    });

    textBox.innerText = "";
});