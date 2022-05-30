let resultEl=document.querySelector('.container');let btnEl=document.querySelector('.button');let inputEl=document.querySelector('.number');function getPictures(){let url='https://api.unsplash.com/search/photos/?query='+inputEl.value+'&per_page=9&client_id=DEYJ7-Lcch0aPruni3jePzKa7LX9iROXSPd2eSjm33o';fetch(url).then((response)=>{if(response.status===200){console.log(response.status)
    return response.json()}else{console.log(response.status)}}).then((data)=>{console.log(data);for(let key in data.results){let picture=document.createElement('div');picture.className='container__element';picture.innerHTML=`
                        <p class="picture-text">${data.results[key].alt_description}</p>
                        <img src="${data.results[key].urls.raw}" alt="" class="picture-image"></img>
                         `;picture.addEventListener('click',function(){window.open(data.results[key].links.download,'_blank')})
    resultEl.appendChild(picture)}}).catch((error)=>{console.log(error.status)})
    let picturesList=[...document.querySelectorAll('.picture-text')];if(picturesList.length>=9){resultEl.innerHTML=''}}
btnEl.addEventListener('click',getPictures)
let textEl=document.getElementById('dynamic-text').innerHTML;function animateText(id,text,i){document.getElementById(id).innerHTML=text.substring(0,i);i++;setTimeout("animateText('"+id+"','"+text+"',"+i+")",100)}
animateText("dynamic-text",textEl,1)