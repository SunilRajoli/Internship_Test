document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.querySelector('.switch input');

    const switchTheme = (event) => {
        if (event.target.checked) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    };

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'light') {
            toggleSwitch.checked = true;
        }
    }

    toggleSwitch.addEventListener('change', switchTheme);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/tickers');
            const data = await response.json();
            console.log('Fetched data:', data);
            updateTable(data);
            updateInfo(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const updateTable = (data) => {
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = '';

        data.forEach((item, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>₹${item.last.toLocaleString()}</td>
                <td>₹${item.buy.toLocaleString()} / ₹${item.sell.toLocaleString()}</td>
                <td>${item.volume.toLocaleString()}</td>
                <td>${item.base_unit}</td>
            `;

            tableBody.appendChild(row);
        });
    };

    const updateInfo = (data) => {
        if (data.length > 0) {
            const priceValue = document.querySelector('.price-value h1');
            const change5Mins = document.querySelector('.info .item:nth-child(1) .label');
            const change1Hour = document.querySelector('.info .item:nth-child(2) .label');
            const change1Day = document.querySelector('.info .item:nth-child(4) .label');
            const change7Days = document.querySelector('.info .item:nth-child(5) .label');
        }
    };

    const startTimer = (duration, display) => {
        let timer = duration, minutes, seconds;
        setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            seconds = seconds < 10 ? `0${seconds}` : seconds;

            display.textContent = `${seconds}`;

            if (--timer < 0) {
                timer = duration;
                fetchData();
            }
        }, 1000);
    };

    fetchData();

    const oneMinute = 60;
    const timerDisplay = document.querySelector('.timer span');
    startTimer(oneMinute, timerDisplay);

    setInterval(fetchData, 60000);
});
