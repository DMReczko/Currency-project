const currency = document.querySelector("#currencies");
const btn = document.querySelector("#convert-btn");
const result = document.querySelector("#result");
const loader = document.querySelector("#loading");
const userValue = document.querySelector("#multiply-value");

function convert() {
    const url = `https://api.nbp.pl/api/exchangerates/rates/a/${currency.value}/`;
    const value = parseFloat(userValue.value);

    if (isNaN(value)) {
        return alert("Wprowadź poprawną kwotę");
    } else {
        loader.classList.toggle("display", true);
        fetch(url)
            .then((response) => response.json())

            .then((data) => {
                loader.classList.toggle("display", false);
                const multiplier = parseFloat(data.rates[0].mid);
                const converted = parseFloat((value * multiplier).toFixed(2));
                result.innerText = converted;
            })
            .catch((err) => console.error(err));
    }
}

btn.addEventListener("click", convert);
