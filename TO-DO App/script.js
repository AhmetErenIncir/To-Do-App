document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const addTaskBtn = document.getElementById('add-task-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // Görevleri localStorage'a kaydetme fonksiyonu
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(liElement => {
            const span = liElement.querySelector('span');
            if (span) {
                tasks.push({
                    text: span.textContent,
                    done: span.classList.contains('done')
                });
            }
        });
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const userTasksKey = `tasks_${currentUser}`;
            localStorage.setItem(userTasksKey, JSON.stringify(tasks));
        } else {
            console.warn('Cannot save tasks: No current user found in localStorage.');
            // Giriş yapılmamışsa veya currentUser yoksa login'e yönlendirme burada da düşünülebilir
            // window.location.href = 'login.html';
        }
    }

    // Tek bir görev elementi oluşturan ve olay yöneticilerini ekleyen fonksiyon
    function createTaskElement(task) { // task objesi {text: string, done: boolean}
        if (!task || !task.text) return;

        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.done) {
            span.classList.add('done');
        }
        li.appendChild(span);

        span.addEventListener('click', () => {
            span.classList.toggle('done');
            saveTasks();
        });

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // Sayfa içeriği yüklendiğinde (DOMContentLoaded sonrası) ve script çalıştığında localStorage'dan görevleri yükle
    // Bu kısım window.load yerine doğrudan çalışacak çünkü DOMContentLoaded zaten DOM hazır demek.
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return; // Eğer yönlendirme yapılıyorsa, scriptin kalanının çalışmasına gerek yok.
    }

    const userTasksKey = `tasks_${currentUser}`;
    const savedTasks = JSON.parse(localStorage.getItem(userTasksKey) || '[]');
    taskList.innerHTML = '';
    savedTasks.forEach(taskObject => {
        if (taskObject && typeof taskObject.text === 'string') {
            createTaskElement(taskObject);
        }
    });

    // Yeni görev ekleme butonu olay yöneticisi
    if (addTaskBtn) { // Elementin varlığını kontrol et
        addTaskBtn.addEventListener('click', () => {
            const taskText = newTaskInput.value.trim();
            if (taskText !== '') {
                createTaskElement({ text: taskText, done: false });
                saveTasks();
                newTaskInput.value = '';
            }
        });
    } else {
        console.error("addTaskBtn not found");
    }

    // Enter tuşu ile görev ekleme
    if (newTaskInput) { // Elementin varlığını kontrol et
        newTaskInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (addTaskBtn) { // addTaskBtn'nin de var olduğundan emin ol
                    addTaskBtn.click();
                }
            }
        });
    } else {
        console.error("newTaskInput not found");
    }
    

    // Logout butonu olay yöneticisi
    if (logoutBtn) { // Elementin varlığını kontrol et
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            // Kullanıcıya özel görevler zaten logout'ta silinmiyordu (bir önceki isteğe göre).
            // Eğer tüm görevlerin silinmesi isteniyorsa, aşağıdaki satır eklenebilir:
            // const userTasksKey = `tasks_${localStorage.getItem('currentUser_before_remove')}`; // Bu mantık hatalı olurdu.
            // Logout öncesi currentUser alınmalı. Ama zaten sadece currentUser'ı silmek yeterli.
            window.location.href = 'login.html';
        });
    } else {
        console.error("logoutBtn not found");
    }
});