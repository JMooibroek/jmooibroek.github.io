const expiration = 1000 * 60 * 60 * 24 * 3;
const elements = ['explorer', 'player', 'audio', 'playBtn', 'pauseBtn', 'stopBtn', 'progressBar', 'volumeBar', 'duration', 'volume', 'files', 'objectCount', 'fileSize', 'fileSize2', 'app', 'appText', 'appContent', 'docIcon', 'npIcon', 'appTitle']
    .reduce((acc, id) => ({ ...acc, [id]: document.getElementById(id) }), {});

const projects = [
    {
        name: 'Double Click On Me',
        file: 'start.html',
        icon: 'wp',
        size: '0.1',
        date: '02/02/2025',
        lines: '2'
    },
    {
        name: 'This Website',
        file: 'this-website.html',
        icon: 'doc',
        size: '3.4',
        date: '03/02/2025',
        lines: '28'
    },
    {
        name: 'Post Larva Menu Soundtrack',
        file: 'post-larva-menu.mp3',
        icon: 'aud',
        size: '663.5',
        date: '06/05/2021'
    },
    {
        name: 'Steel and Air',
        file: 'steel and air.mp3',
        icon: 'aud',
        size: '743.6',
        date: '16/11/2020'
    },
    {
        name: 'Stories',
        file: 'stories.mp3',
        icon: 'aud',
        size: '1066.2',
        date: '22/04/2024'
    },
    {
        name: 'Cyber Rider',
        file: 'cyber rider.mp3',
        icon: 'aud',
        size: '504.6',
        date: '19/04/2021'
    },
    {
        name: 'My Library',
        file: 'library.html',
        icon: 'wp',
        size: '1.49',
        date: '05/02/2025',
        lines: '32'
    },
    {
        name: 'My Homelab',
        file: 'homelab.html',
        icon: 'doc',
        size: '2.01',
        date: '06/02/2025',
        lines: '0'
    }
];

function loadProjects() {

    files.innerHTML = ''; // Clear any existing files

    projects.forEach(project => {
        const fileDiv = document.createElement('div');
        fileDiv.classList.add('file');
        fileDiv.ondblclick = () => openProject(project.name);
        fileDiv.onclick = () => selectFile(fileDiv, project.size);

        fileDiv.innerHTML = `
            <img src="assets/${project.icon}.webp" alt="File Icon">
            <div>
                <div class="title">${project.name}</div>
                <div class="date">${project.date}</div>
            </div>
        `;
        files.appendChild(fileDiv);
    });
}

let selectedFile = null;

function setDefault() {
    objectCount.innerText = `${projects.length} object(s)`;
    fileSize.innerText = projects.reduce((total, project) => total + parseFloat(project.size), 0) + 'KB';
}

document.getElementById('files').addEventListener('click', function (e) {
    e = window.event || e;
    if (this === e.target) {
        if (selectedFile != null) {
            selectedFile.classList.remove('selected');
            selectedFile = null;
        }
        setDefault();
    }
})

function selectFile(fileDiv, size) {
    if (selectedFile) {
        selectedFile.classList.remove('selected');
    }
    selectedFile = fileDiv;
    selectedFile.classList.add('selected');

    objectCount.innerText = '1 object(s) selected';
    fileSize.innerText = size + 'KB';
}

function openProject(projectName) {
    const project = projects.find(project => project.name === projectName);
    const request = project.icon === 'aud' ? 'music/' + project.file : 'projects/' + project.file;
    caches.match(request).then(cachedResponse => cachedResponse || fetch(request)).then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        const clonedResponse = response.clone();
        caches.open('project-cache').then(cache => cache.put(request, clonedResponse));
        return project.icon === 'aud' ? response.blob().then(data => ({ data: URL.createObjectURL(data) })) : response.text().then(data => ({ data }));
    }).then(({ data }) => {
        if (project.icon === 'aud') {
            audio.src = data;
            player.style.display = 'block';
            handleZIndex(player);
            audio.addEventListener('canplay', function() {
                audio.play();
                playerTime();
            }, { once: true });
        } else {
            appText.innerHTML = data;
            if (project.icon === 'wp') {
                npIcon.style.display = 'block';
                docIcon.style.display = 'none';
                appTitle.innerText = projectName + ' - Notepad';
            } else {
                docIcon.style.display = 'block';
                npIcon.style.display = 'none';
                appTitle.innerText = projectName + ' - WordPad';
            }
            app.style.display = 'block';
            handleZIndex(app);
        }
    }).catch(error => {
        if (project.icon === 'aud') {
            appText.innerHTML = 'Error loading music: ' + error.message;
        } else {
            appText.innerHTML = 'Error loading project: ' + error.message;
        }
        app.style.display = 'block';
        handleZIndex(app);
    });
    fileSize2.innerText = project.size + 'KB';
}


function closeApp() {
    app.style.display = 'none';
}

function closePlayer() {
    audio.pause();
    audio.currentTime = 0;
    player.style.display = 'none';
}

function playerTime() {
    if (isNaN(audio.duration)) {
        duration.innerText = '0:00 / 0:00';
    } else {
        duration.innerText = Math.floor(audio.currentTime / 60) + ':' + ('0' + Math.floor(audio.currentTime % 60)).slice(-2) + ' / ' + Math.floor(audio.duration / 60) + ':' + ('0' + Math.floor(audio.duration % 60)).slice(-2);
    }
}

playBtn.addEventListener('click', () => {
    if (audio.currentTime === audio.duration) audio.currentTime = 0;
    audio.play();
});

pauseBtn.addEventListener('click', () => {
    audio.pause();
});

stopBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
});

function updateProgressBar() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    playerTime();
}

progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value / 100;
    volume.innerText = (audio.volume * 100).toFixed(0) + '%';
});

function handleZIndex(element) {
    --app.style.zIndex;
    --player.style.zIndex;
    --explorer.style.zIndex;
    element.style.zIndex = 3;
}

app.addEventListener('click', () => handleZIndex(app));
player.addEventListener('click', () => handleZIndex(player));
explorer.addEventListener('click', () => handleZIndex(explorer));


audio.addEventListener('timeupdate', updateProgressBar);
volume.innerText = (audio.volume * 100).toFixed(0) + '%';
setDefault();
loadProjects();