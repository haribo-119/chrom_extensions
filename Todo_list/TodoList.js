document.addEventListener('DOMContentLoaded',function(){
    const addBtn = document.getElementById('add_btn');

    if(addBtn){
        addBtn.addEventListener('click',function(){
            const input = document.getElementById('input');
            const taskList = document.querySelector('.list_box ul');

            if(input.value.trim() !== ""){
                const li = document.createElement('li');
                li.textContent = input.value;
                taskList.appendChild(li);
                input.value = '';


                const mainBox = document.querySelector('.main_box');
                const height = 130 + (taskList.children.length * 20);
                mainBox.style.height =`${height}px`; 

            } 

        });
    } else {
        console.error('Button with ID "add_btn" not found.');
    }

});