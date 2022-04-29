let resultEl = document.querySelector('.container');
let btnEl = document.querySelector('.button');
let inputEl = document.querySelector('.number');

function getPictures() {
    //получаю данные из input и сразу преобразую их в тип данных number
    let value = +inputEl.value;
    //добавляю параметры к URL: set(name, value) – задать/заменить параметр
    let url = new URL('https://picsum.photos/v2/list');
    url.searchParams.set('limit', value);
    //если введенное значение будет меньше или равно 20, то отправляем запрос
    if (value <= 20){
        fetch(url)
            //получение ответа
            .then((response) => {
                //получаю статус запроса
                console.log(response.status)
             //декодирование ответа, пришедшего в формате JSON
                return response.json();
            })
            .then((result) => {
                //создаю и применяю функцию callback к каждому элементу
                result.forEach(item => console.log(item.author)); //для проверки
                for (let key in result){
                    let picture = document.createElement('div');
                    picture.className = 'container__element';
                    picture.innerHTML =
                        `
                        <p class="picture-text">${result[key].author}</p>
                        <img src="${result[key].download_url}" alt="" class="picture-image"></img>                                       
                         `;
                    resultEl.appendChild(picture);
                }
            })
            .catch((error) => {
                console.log(error.status);
            })
    }

    let picturesList = [...document.querySelectorAll('.picture-text')];
    console.log(picturesList.length);
    if (picturesList.length >=6){
        resultEl.innerHTML = '';
    }

    //чтобы все новые элементы DOM прогрузились, используя setTimeout, иначе длина массива с picture-image будет равно 0
    setTimeout(
        function () {
            //присваивание нового класса для фото

            document.querySelectorAll('.container__element').forEach(
              function (element){
            element.addEventListener(
                    'click',
                    function () {
                        document.querySelectorAll('.picture-image').forEach(
                            element => element.classList.remove('open-image')
                        );
                        document.querySelectorAll('.container__element').forEach(
                            element => element.classList.remove('open-element')
                        );
                        element.classList.add('open-element');
                        element.querySelector('.picture-image').classList.add('open-image');
                    }
                );
                }
            )
        }, 2000
    )
}

btnEl.addEventListener(
    'click',
    getPictures
)

//навешиваю обработчик, чтобы удалять класс и закрывать открытое фото
document.body.addEventListener(
    'click',
    function (event) {
        //если элемент, по которому был совершен клик, не имеет класс picture-image, то закрыть фото и удалить класс у контейнера
        if (!event.target.classList.contains('picture-image'))
        {document.querySelectorAll('.picture-image').forEach(
                element => element.classList.remove('open-image')
            );
           document.querySelectorAll('.container__element').forEach(
            element => element.classList.remove('open-element')
         );}
    }
)

//создание динамического текста - 1
let textEl = document.getElementById('dynamic-text').innerHTML;
function animateText(id, text, i) {
    //получаю подстроку строки между двумя индексами
    document.getElementById(id).innerHTML = text.substring(0, i);
    i++;
    setTimeout("animateText('" + id + "','" + text + "'," + i + ")", 100);
}

animateText("dynamic-text", textEl, 1);


//создание динамического текста - 2
// let i = 0;
// let textEl = document.getElementById('dynamic-text').innerHTML;
// let speed = 100;
//
// function animateText() {
//     if (i < textEl.length){
//         document.getElementById('dynamic-text').innerHTML += textEl.charAt(i);
//         console.log(textEl[i]);
//         i++;
//         setTimeout(animateText, speed);
//         if (i > textEl.length - 1)
//         {document.getElementById('dynamic-text').textContent = '';
//             i=0;
//         }
//     }
// }
//
// animateText();
