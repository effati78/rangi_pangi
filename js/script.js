/* .:: EFFATI78 ::. */

const URL = "http://ircolor.ir/api?hex=";
var HEXCOLOR = "";
var darker = document.querySelector(".main-darker .colors-boxes");
var brighter = document.querySelector(".main-brighter .colors-boxes");

function setHEXCOLOR(val) {
  HEXCOLOR = val.value;
}

function handleClickButton() {
  document.getElementById("submitBtn").addEventListener("click", function () {
    setHEXCOLOR(document.getElementById("hexcolor"));
    api(URL, HEXCOLOR);
  });
}

function renderHTML(res) {
  darker.innerHTML = "";
  res["darker"].map((x) => {
    darker.innerHTML += `<div class="colors-boxes-singleBox">
                            <div class="colors-boxes-singleBox-color" style="background-color: #${x};"></div>
                            <p class="colors-boxes-singleBox-text">
                            #<span>${x}</span>
                            </p>
                        </div>`;
  });

  brighter.innerHTML = "";
  res["brighter"].map((x) => {
    brighter.innerHTML += `<div class="colors-boxes-singleBox">
                            <div class="colors-boxes-singleBox-color" style="background-color: #${x};"></div>
                            <p class="colors-boxes-singleBox-text">
                            #<span>${x}</span>
                            </p>
                        </div>`;
  });

  document.querySelector(".h").innerHTML = res["hsl"]["H"];
  document.querySelector(".s").innerHTML = res["hsl"]["S"];
  document.querySelector(".l").innerHTML = res["hsl"]["L"];

  document.querySelector(".r").innerHTML = res["rgb"]["R"];
  document.querySelector(".g").innerHTML = res["rgb"]["G"];
  document.querySelector(".b").innerHTML = res["rgb"]["B"];

  document.querySelector(".status").innerHTML =
    res["color_status"] == "light" ? "روشن" : "تیره";
  document.querySelector(".text").innerHTML =
    res["text_color"] == "black" ? "مشکی" : "سفید";
}

function api(URL, HEXCOLOR) {
  const apiLink = URL + HEXCOLOR;

  if (window.XMLHttpRequest) {
    var ajax = new XMLHttpRequest();
  } else {
    var ajax = new ActiveXObject("Microsoft.XMLHTTP");
  }

  ajax.open("GET", apiLink, true);
  ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  ajax.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = JSON.parse(this.responseText);
      renderHTML(res);
    } else if (this.readyState != 4 && this.status != 200) {
      let errorLog = {
        status: this.status,
        readyState: this.readyState,
      };

      console.error(
        "هی رفیق، من یک خطا پیدا کردم، جدول زیر رو یه نگاه بنداز :("
      );
      console.table(errorLog);
    }
  };

  ajax.send();
}

handleClickButton();
