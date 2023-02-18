const currency = document.querySelector("#currencies");
const btn = document.querySelector("#convert-btn");
const result = document.querySelector("#result");
const loader = document.querySelector("#loading");

function displayLoading() {
    loader.classList.add("display");
}

function hideLoading() {
    loader.classList.remove("display");
}

function convert() {
    const url = `http://api.nbp.pl/api/exchangerates/rates/a/${currency.value}/`;

    const value = parseFloat(document.querySelector("#multiply-value").value);

    if (isNaN(value)) {
        return alert("Wprowadź poprawną kwotę");
    } else {
        displayLoading();
        fetch(url)
            .then((response) => response.json())

            .then((data) => {
                hideLoading();
                const multiplier = parseFloat(data.rates[0].mid);
                const converted = parseFloat((value * multiplier).toFixed(2));
                result.innerText = converted;
            })

            .catch((err) => console.error(err));
    }
}

btn.addEventListener("click", convert);
