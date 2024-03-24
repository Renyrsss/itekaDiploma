document.addEventListener('DOMContentLoaded',()=>{
    document.addEventListener('mousemove', e =>{
    Object.assign(document.body, {
        style:`
            --move-x:${(e.clientX - window.innerWidth / 2) * -0.02}px;
            --move-y:${(e.clientY - window.innerHeight /2) * -0.02 }px;
            --move-yS:${(e.clientY - window.innerHeight /2) * -0.01 }px;
            --move-xS:${(e.clientX - window.innerWidth / 2) * -0.01}px;
            --move-xSS:${(e.clientX - window.innerWidth / 2) * -0.005}px;
            --move-xSS:${(e.clientX - window.innerWidth / 2) * -0.005}px;
        `
    })
})
});

let shopsItems = document.querySelector('.shops__items');



axios('http://localhost:1337/api/products?populate=*')
    .then(res =>{
        console.log(res.data['data']);
        let datas = res.data['data'];

        res.data['data'].forEach(item=>{
            
            shopsItems.innerHTML += `
            
                        <div class="shops__item">
                            <div class="shops__itemImg">
                                <img src="http://localhost:1337${item.attributes.productImg['data'][0].attributes.url}" alt="">
                            </div>
                            <div class="shops__itemText">
                                ${item.attributes.productDes}
                            </div>
                            <div class="shops__itemPrice">
                                ${item.attributes.productPrice}
                            </div>
                            <div class="shops__itemBody">
                                ${item.attributes.productBody}
                            </div>
                        </div>
            `
        })
        
    })
    .then(()=>{
        let itemGood = document.querySelectorAll('.shops__item');

        console.log(itemGood);

        itemGood.forEach(item=>{
            item.addEventListener('click',(e)=>{
                let itemData 
                if(e.target.parentNode.className == 'shops__items'){
                    itemData = e.target
                }
                else if(e.target.parentNode.className == 'shops__itemImg'){
                    itemData = e.target.parentNode.parentNode
                }
                else{
                    itemData = e.target.parentNode
                }
                console.log(itemData.children[0].children[0].currentSrc);

                let modal = document.querySelector('.modal__container');
                
                modal.innerHTML = `
                <div class="modal">
                    <div class="modal__item">
                        <div class="modal__close">X</div>
                        <div class="modal__img">
                            <img src="${itemData.children[0].children[0].currentSrc}" alt="">
                        </div>
                        <div class="modal__title">
                            <p>${itemData.children[1].textContent}</p>
                        </div>
                        <div class="modal__des">
                            <p>${itemData.children[3].textContent}</p>
                        </div>
                        <div class="modal__price">
                            <a class="price__a" href="tel:555-555-5555"><p>Сделать заказ <br />  цена :${itemData.children[2].textContent}</p></a>
                        </div>
                    </div>
                </div>
                
                `
                let closeModal = document.querySelector('.modal__close');

                closeModal.addEventListener('click',()=>{
                    modal.innerHTML=``
                })
            })
        })
    })




