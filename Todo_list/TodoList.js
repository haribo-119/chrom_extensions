document.addEventListener('DOMContentLoaded',function(){
    const addBtn = document.getElementById('add_btn');
    const input = document.getElementById('input');
    const taskList = document.querySelector('.list_box ul'); 

    loadTasks();

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

    //불러오기
    function loadTasks() {
        chrome.storage.sync.get(['tasks'], function(result) {
            const tasks = result.tasks || [];
            taskList.innerHTML = ''; 
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task;
                
                
                taskList.appendChild(li);
            });
        });
    }


 
    //추가
    function addTask() {
        const input = document.getElementById('input');
        const taskText = input.value.trim();

        if(taskText !== ""){
            chrome.storage.sync.get(['tasks'], function(result) {
                const tasks = result.tasks || [];
                tasks.push(taskText);
                
                
                chrome.storage.sync.set({tasks: tasks}, function() {
                    loadTasks(); 
                    input.value = ''; 
                });
            });
        }
    }


});