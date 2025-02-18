document.addEventListener('DOMContentLoaded',function(){
    const addBtn = document.getElementById('add_btn');
    const input = document.getElementById('input');

    if(addBtn){   
        addBtn.addEventListener('click',addTask);
    } else {
        console.error('Button with ID "add_btn" not found.');
    }
    if(input){
        input.addEventListener('keypress', function(e) {
            if(e.key === 'Enter') {
                addTask();
            }
        });
    }


    function addTask(){
            const input = document.getElementById('input');
            const taskList = document.querySelector('.list_box ul');

            if(input.value.trim() !== ""){
                const li = document.createElement('li');
                li.textContent = input.value;
                taskList.appendChild(li);
                input.value = '';
            } 
    }


});