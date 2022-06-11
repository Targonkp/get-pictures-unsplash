let resultEl=document.querySelector('.container');let btnEl=document.querySelector('.button');let inputEl=document.querySelector('.number');let pageNumberEl=document.querySelector('.page-number');let pageNumber=1;let perPage=12;function getPictures(){let first=perPage*pageNumber-11;let last=perPage*pageNumber;pageNumberEl.innerHTML=`${pageNumber} (${first} - ${last})`;let url='https://api.unsplash.com/search/photos/?query='+inputEl.value+'&page='+pageNumber+'&per_page='+perPage+'&client_id=DEYJ7-Lcch0aPruni3jePzKa7LX9iROXSPd2eSjm33o';fetch(url).then((response)=>{if(response.status===200){return response.json()}else{console.log(response.status)}}).then((data)=>{console.log(data);for(let key in data.results){let description=(data.results[key].alt_description==null)?'Without title':data.results[key].alt_description;let picture=document.createElement('div');picture.className='container__element';picture.innerHTML=`
                        <p class="picture-text">${description}</p>
                        <p class="created-year">Created year: ${parseFloat(data.results[key].created_at)}</p>
                        <img src="${data.results[key].urls.raw}&w=400&fit=max" alt="" class="picture-image"></img>
                         `;picture.addEventListener('click',function(){window.open(data.results[key].links.download,'_blank')})
    resultEl.appendChild(picture)}}).catch((error)=>{console.log(error.status)})
    let picturesList=[...document.querySelectorAll('.picture-text')];if(picturesList.length>=12){resultEl.innerHTML=''}}
inputEl.addEventListener('change',()=>{pageNumber=1})
btnEl.addEventListener('click',getPictures)
let textEl=document.getElementById('dynamic-text').innerHTML;function animateText(id,text,i){document.getElementById(id).innerHTML=text.substring(0,i);i++;setTimeout("animateText('"+id+"','"+text+"',"+i+")",100)}
animateText("dynamic-text",textEl,1)
let nextEl=document.querySelector('.next');nextEl.addEventListener('click',function(){pageNumber++;getPictures()})
let previousEl=document.querySelector('.previous');previousEl.addEventListener('click',function(){pageNumber--;if(pageNumber<=0){pageNumber=1}
    getPictures()})