const textBox = document.getElementById("urls");
const submitterTextBox = document.getElementById("submitter");
const descriptionTextBox = document.getElementById("description");
const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", (event) => {
    const urls = textBox.value.split("\n");
    const submitter = submitterTextBox.value;
    const description = descriptionTextBox.value;

    fetch("/api/submitURLs", {
        method: "POST",
        body: JSON.stringify({
            urls,
            submitter,
            description
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch((err) => {
        alert("Submission failed: \n\n" + err);
    });

    textBox.value = "";
    descriptionTextBox.value = "";
});