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
        //const index = 0;
        chrome.storage.sync.get(['tasks','startTask'], function(result) {
            const tasks = result.tasks || [];
            const startTask = result.startTask || [];
            taskList.innerHTML = ''; 

            tasks.forEach((task,index) => {
                const li = document.createElement('li');
                
                const taskSpan = document.createElement('span');
                taskSpan.textContent = task;
                li.appendChild(taskSpan);

                const div = document.createElement('div');
                div.className ='tasks_btns';
                div.setAttribute('data-index', index);

                //삭제 버튼
                const removeBtn = document.createElement('button');
                removeBtn.className='remove_btn';
                
                const removeImg = document.createElement('img');
                removeImg.src='icons/icon-delete.png';
                removeImg.alt='삭제';
                removeImg.style.width='16px';
                removeImg.style.height='16px';

                // 중요 버튼 
                const importBtn = document.createElement('button');
                importBtn.className='import_btn';

                const importImg = document.createElement('img');
                importImg.src=startTask.includes(index) ? 'icons/icon-star-yellow.png':'icons/icon-star.png';
                importImg.alt='중요';
                importImg.style.width='14px';
                importImg.style.height='14px';
                
                importBtn.appendChild(importImg);
                removeBtn.appendChild(removeImg);

                // 삭제 버튼 동작
                removeBtn.addEventListener('click',function(){
                    const taskIndex = parseInt(div.getAttribute('data-index'));
                    removeTask(taskIndex);
                });

                // 중요 버튼 동작
                importImg.addEventListener('click',function(){
                    const taskIndex = parseInt( div.getAttribute('data-index'));
                     changeImg(taskIndex);
                });

                div.appendChild(importBtn);
                div.appendChild(removeBtn);
                li.appendChild(div);   
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


    // 삭제
    function removeTask(taskIndex){
           chrome.storage.sync.get(['tasks','startTask'], function(result){
              const tasks = result.tasks || [];
              const startTask = result.startTask || [];
              tasks.splice(taskIndex,1);
              
        
        const updatedStartTask = startTask
        .filter(index => index !== taskIndex)  
        .map(index => index > taskIndex ? index - 1 : index);  
    
    chrome.storage.sync.set({
        tasks: tasks,
        startTask: updatedStartTask
    }, function() {
        loadTasks(); 
           });
        });
     }

     // 중요 버튼 이미지 변환
     function changeImg(taskIndex){
         // 이미지 변환
         const imgDiv = document.querySelector(`[data-index="${taskIndex}"]`);
         const imgConvert= imgDiv.querySelector('.import_btn img');
        
         if(imgConvert.src.includes('icon-star.png')){
             imgConvert.src ='icons/icon-star-yellow.png';
         }else{
            imgConvert.src ='icons/icon-star.png';
         }

         // 이미지 저장소
        chrome.storage.sync.get(['startTask'],function(result){
            const startTask = result.startTask || [];
            const index = startTask.indexOf(taskIndex);

            if(index === -1){
                startTask.push(taskIndex);
            } else{
                startTask.splice(index,1);
            }

            chrome.storage.sync.set({startTask:startTask}),function(){
                loadTasks();
            }
    });
    }

});