// Загружаем данные из JSON
fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        // Логирование данных для проверки
        console.log('Данные из JSON:', data);

        // Находим контейнер для меню
        const menuContainer = document.getElementById('menu');

        // Проверяем, что данные загрузились
        if (data && data.menu) {
            // Перебираем все секции меню
            data.menu.forEach((section) => {
                // Создаем блок для секции меню
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'menu-section';

                // Название секции
                const sectionTitle = document.createElement('h2');
                sectionTitle.textContent = section.section;
                sectionDiv.appendChild(sectionTitle);

                // Список для блюд в секции
                const itemsUl = document.createElement('ul');

                // Перебираем все элементы в секции
                section.items.forEach((item) => {
                    // Для каждого блюда создаем список
                    const itemLi = document.createElement('li');
                    itemLi.innerHTML = `
                        <strong>${item.title}</strong> (${item.weight}) - ${item.price}<br>
                        <p>${item.description}</p>
                    `;
                    itemsUl.appendChild(itemLi);
                });

                sectionDiv.appendChild(itemsUl);
                menuContainer.appendChild(sectionDiv);
            });
        } else {
            console.error("Данные меню не найдены.");
        }
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));

// Генерация PDF при нажатии кнопки
document.getElementById('downloadPDF').addEventListener('click', function () {
    const menu = document.getElementById('menu');

    // Опции для html2pdf
    const options = {
        margin: 10,
        filename: 'menu.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Генерация PDF
    html2pdf().from(menu).set(options).save();
});
