document.addEventListener('DOMContentLoaded', function() {
    const firebaseConfig = {
        apiKey: "AIzaSyC65KZ1lAmMta3zFggqynZoWUuVCNA5r4k",
        authDomain: "my-personal-website-afcf3.firebaseapp.com",
        projectId: "my-personal-website-afcf3",
        storageBucket: "my-personal-website-afcf3.firebasestorage.app",
        messagingSenderId: "473893588847",
        appId: "1:473893588847:web:defec07a11ce49e157229a",
        measurementId: "G-G0VW44V5FT",
        databaseURL: "https://my-personal-website-afcf3-default-rtdb.firebaseio.com"
    };
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    const auth = firebase.auth();
    const loginModal = document.getElementById('login-modal');
    const changePasswordModal = document.getElementById('change-password-modal');
    const loginPromptContainer = document.getElementById('login-prompt-container');
    const loginButton = document.getElementById('login-button');
    const closeModalButton = document.querySelector('#login-modal .close-button');
    const changePasswordButton = document.getElementById('change-password-button');
    const newPasswordInput = document.getElementById('new-password-input');
    const confirmPasswordInput = document.getElementById('confirm-password-input');
    const saveNewPasswordButton = document.getElementById('save-new-password-button');
    const closeChangePasswordButton = document.querySelector('#change-password-modal .close-button');
    auth.onAuthStateChanged(user => {
        if (user) {
            loginPromptContainer.innerHTML = `Logged in as <strong>${user.email}</strong>. (<span class="logout-link">Logout</span> or <span class="change-password-link">Change Password</span>)`;
            loginPromptContainer.querySelector('.logout-link').addEventListener('click', () => {
                auth.signOut();
            });
            loginPromptContainer.querySelector('.change-password-link').addEventListener('click', () => {
                changePasswordModal.style.display = 'block';
            });
        } else {
            loginPromptContainer.innerHTML = `(<span class="login-link">Log in</span> required to edit.)`;
            loginPromptContainer.querySelector('.login-link').addEventListener('click', () => {
                loginModal.style.display = 'block';
            });
        }
    });
    loginButton.addEventListener('click', () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                loginModal.style.display = 'none'; // Close modal on successful login
            })
            .catch(error => {
                console.error("Login Error:", error);
                alert("Login failed. Please check your credentials.");
            });
    });
    closeModalButton.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });
    closeChangePasswordButton.addEventListener('click', () => {
        changePasswordModal.style.display = 'none';
    });
    window.addEventListener('mousedown', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === changePasswordModal) {
            changePasswordModal.style.display = 'none';
        }
    });
    saveNewPasswordButton.addEventListener('click', () => {
        const user = auth.currentUser;
        if (!user) {
            alert("You must be logged in to change your password.");
            return;
        }
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match. Please try again.");
            return;
        }
        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }
        user.updatePassword(newPassword).then(() => {
            alert("Password successfully updated! Please log in again with your new password.");
            changePasswordModal.style.display = 'none';
            auth.signOut();
        }).catch((error) => {
            console.error("Password change error:", error);
            alert("Password change failed. Please log in again and try immediately.");
        });
    });
    document.getElementById('login-email').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('login-button').click();
        }
    });
    document.getElementById('login-password').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('login-button').click();
        }
    });
    document.getElementById('new-password-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('save-new-password-button').click();
        }
    });
    document.getElementById('confirm-password-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('save-new-password-button').click();
        }
    });
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
        // Find all modals
        document.querySelectorAll(".modal").forEach(modal => {
            if (modal.style.display === "block") {
            modal.style.display = "none";
            }
        });
        }
    });
    document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const loginModal = document.getElementById("login-modal");
        const changeModal = document.getElementById("change-password-modal");
        if (loginModal.style.display === "block") {
        let btn = document.getElementById("login-button");
        setLoadingState(btn, "Logging in...");
        } 
        else if (changeModal.style.display === "block") {
        let btn = document.getElementById("save-new-password-button");
        setLoadingState(btn, "Saving...");
        }
    }
    });
    function setLoadingState(button, text) {
    button.textContent = text;
    button.classList.add("loading");
    button.disabled = true;
    setTimeout(() => {
        button.textContent = text.replace("...", " Done!");
        button.classList.remove("loading");
        button.disabled = false;
    }, 2000);
    }
    const pageSections = document.querySelectorAll('main > section.page');
    const navLinks = document.querySelectorAll('nav a[data-target]');
    const header = document.querySelector('header');
    function showPage(targetId) {
        if (targetId === 'home') {
            header.style.display = 'block';
        } else {
            header.style.display = 'none';
        }
        pageSections.forEach(section => section.classList.remove('active'));
        if (targetId === 'home') {
            document.getElementById('about').classList.add('active');
            document.getElementById('news').classList.add('active');
        } else {
            const targetPage = document.getElementById(targetId);
            if (targetPage) targetPage.classList.add('active');
        }
        localStorage.setItem('activePage', targetId);
    }
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(link.dataset.target);
        });
    });
    const savedPage = localStorage.getItem('activePage');
    showPage(savedPage || 'home');
    const correctPasscode = 'xmuchow123';
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('protected-link')) {
            e.preventDefault();
            const enteredPasscode = prompt('Please enter the passcode to access this file:');
            if (enteredPasscode === correctPasscode) {
                window.open(e.target.dataset.link, '_blank');
            } else if (enteredPasscode !== null) {
                alert("Incorrect passcode.");
            }
        }
    });
    const calendarGrid = document.getElementById('calendar-grid');
    const nameEditorPanel = document.getElementById('name-editor-panel');
    const nameListEditor = document.getElementById('name-list-editor');
    const tooltip = document.getElementById('tooltip');
    let currentDate = new Date();
    let reservations = {};
    renderCalendar();
    const reservationsRef = database.ref('reservations');
    reservationsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        reservations = data || {};
        renderCalendar(); // Re-render the calendar with the new data
    }, (error) => {
        console.error("Firebase read failed: " + error.name + " - " + error.message);
        alert("Could not load schedule data. Check console for errors.");
    });
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        document.getElementById('month-year').textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
        calendarGrid.innerHTML = '';
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarGrid.appendChild(document.createElement('div'));
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');
            const dateString = `${year}-${month + 1}-${day}`;
            dayCell.dataset.date = dateString;
            const dayNumber = document.createElement('div');
            dayNumber.classList.add('day-number');
            dayNumber.textContent = day;
            dayCell.appendChild(dayNumber);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const fifteenDaysFromNow = new Date();
            fifteenDaysFromNow.setDate(today.getDate() + 15);
            fifteenDaysFromNow.setHours(0, 0, 0, 0);
            const cellDate = new Date(year, month, day);
            if (cellDate >= today && cellDate < fifteenDaysFromNow) {
                const timeSlotsDiv = document.createElement('div');
                timeSlotsDiv.classList.add('time-slots');
                const timeOptions = ['13:00-15:00', '15:00-17:00'];
                timeOptions.forEach(time => {
                    const slotButton = document.createElement('button');
                    slotButton.classList.add('time-slot');
                    slotButton.dataset.time = time;
                    slotButton.textContent = time;
                    const namesString = reservations[dateString]?.[time] || '';
                    const reservedCount = namesString.split('\n').filter(name => name.trim() !== '').length;
                    if (reservedCount > 0) {
                        slotButton.classList.add('reserved');
                    }
                    timeSlotsDiv.appendChild(slotButton);
                });
                dayCell.appendChild(timeSlotsDiv);
            } else if (cellDate < today) {
                dayCell.classList.add('past-day');
            } else {
                dayCell.classList.add('unbookable-day');
            }
            calendarGrid.appendChild(dayCell);
        }
    }
    calendarGrid.addEventListener('click', function(e) {
        const dayCell = e.target.closest('.calendar-day');
        if (!dayCell || dayCell.classList.contains('past-day') || dayCell.classList.contains('unbookable-day')) return;

        if (e.target.classList.contains('time-slot')) {
            const dateString = dayCell.dataset.date;
            const time = e.target.dataset.time;

            nameEditorPanel.dataset.date = dateString;
            nameEditorPanel.dataset.time = time;

            document.getElementById('editor-title').textContent = `Edit list for ${dateString} at ${time}`;
            nameListEditor.value = reservations[dateString]?.[time] || '';

            nameEditorPanel.style.display = 'flex';
        }
    });
    document.getElementById('save-name-list').addEventListener('click', function() {
        const dateString = nameEditorPanel.dataset.date;
        const time = nameEditorPanel.dataset.time;
        if (dateString && time) {
            const slotRef = database.ref(`reservations/${dateString}/${time}`);
            slotRef.set(nameListEditor.value)
                .then(() => {
                    console.log("Data saved successfully!");
                    nameEditorPanel.style.display = 'none';
                })
                .catch((error) => {
                    console.error("Error saving data: ", error);
                    alert("Could not save data. You must be logged in with an authorized account.");
                });
        }
    });
    calendarGrid.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('time-slot')) {
            const dateString = e.target.closest('.calendar-day').dataset.date;
            const time = e.target.dataset.time;
            const namesString = reservations[dateString]?.[time] || '';
            const reservedCount = namesString.split('\n').filter(name => name.trim() !== '').length;
            if (reservedCount > 0) {
                tooltip.textContent = `${reservedCount} ${reservedCount === 1 ? 'person has' : 'people have'} booked.`;
                tooltip.style.display = 'block';
            }
        }
    });
    calendarGrid.addEventListener('mousemove', function(e) {
        if (tooltip.style.display === 'block') {
            tooltip.style.left = `${e.pageX + 15}px`;
            tooltip.style.top = `${e.pageY + 15}px`;
        }
    });
    calendarGrid.addEventListener('mouseout', function(e) {
        if (e.target.classList.contains('time-slot')) {
            tooltip.style.display = 'none';
        }
    });
    document.getElementById('close-editor').addEventListener('click', () => nameEditorPanel.style.display = 'none');
    document.getElementById('prev-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    document.getElementById('next-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
});
