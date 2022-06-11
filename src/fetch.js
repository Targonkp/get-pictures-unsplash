let resultEl = document.querySelector('.container');
let btnEl = document.querySelector('.button');
let inputEl = document.querySelector('.number');
let pageNumberEl = document.querySelector('.page-number');
let pageNumber = 1; //устанавливаю первоначальный номер страницы
let perPage = 12; //устанавливаю количество фото на одной страницы


function getPictures() {
    let first = perPage * pageNumber - 11; //вычисляю первое значение количества фото
    let last = perPage * pageNumber; //вычисляю второе значение количества фото
    pageNumberEl.innerHTML = `${pageNumber} (${first} - ${last})`;
    let url = 'https://api.unsplash.com/search/photos/?query='+inputEl.value+'&page='+pageNumber+'&per_page='+perPage+'&client_id=DEYJ7-Lcch0aPruni3jePzKa7LX9iROXSPd2eSjm33o';
        fetch(url)
            //получение ответа
            .then((response) => {
                //получаю статус запроса
                if (response.status === 200){
                    //декодирование ответа, пришедшего в формате JSON
                    return response.json();
                }
                //если статус не равен ok, то вывожу текущий статус
                else
                {
                  console.log(response.status)
                }
            })
            .then((data) => {
                console.log(data);
                //создаю и применяю функцию callback к каждому элементу
                for (let key in data.results){
                    let picture = document.createElement('div');
                    picture.className = 'container__element';
                    picture.innerHTML =
                        `
                        <p class="picture-text">${data.results[key].alt_description}</p>
                        <img src="${data.results[key].urls.raw}&w=400&fit=max" alt="" class="picture-image"></img>
                         `;
                    picture.addEventListener(
                        'click',
                        function () {
                            window.open(data.results[key].links.download, '_blank');
                        }
                    )
                    resultEl.appendChild(picture);
                }
            })
            .catch((error) => {
                console.log(error.status);
            })

     //при каждом запросе получаю список картинок и если их длина больше 12, то очищаю контейнер
    let picturesList = [...document.querySelectorAll('.picture-text')];
    if (picturesList.length >=12){
        resultEl.innerHTML = '';
    }
}

//навешиваю на input событие change, чтобы обнулять количество страниц при каждом изменении запроса
inputEl.addEventListener(
    'change',
    () => {
        pageNumber = 1;
    }
)

//вызываю функцию получения фото
btnEl.addEventListener(
    'click',
    getPictures
)

//создание динамического текста
let textEl = document.getElementById('dynamic-text').innerHTML;
function animateText(id, text, i) {
    //получаю подстроку строки между двумя индексами
    document.getElementById(id).innerHTML = text.substring(0, i);
    i++;
    setTimeout("animateText('" + id + "','" + text + "'," + i + ")", 100);
}

animateText("dynamic-text", textEl, 1)

//следующая страница с фото
let nextEl = document.querySelector('.next');
nextEl.addEventListener(
    'click',
    function () {
        pageNumber++;
        getPictures();
    }
)

//предыдущая страница с фото
let previousEl = document.querySelector('.previous');
previousEl.addEventListener(
    'click',
    function () {
        pageNumber--;
        if (pageNumber <= 0){
            pageNumber = 1;
        }
        getPictures();
    }
)



