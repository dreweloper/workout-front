document.addEventListener('DOMContentLoaded', () => {
    
    // VARIABLES

    const fragment = document.createDocumentFragment();
    
    const sectionPills = document.querySelector('#workout-pills');



    // FUNCTIONS

    const fetchAPI = async () => {

        const url = 'https://workout-back-dkij.onrender.com/api/v1';

        try {

            const request = await fetch(url);

            const response = await request.json();

            if (response.ok) {

                const { pills } = response;

                return pills;

            } else {

                throw response;

            };

        } catch (error) {

            console.log(error);

        };

    }; //!FUNC-FETCHAPI


    const renderPills = async () => {

        const data = await fetchAPI();

        data.forEach(item => {

            const article = document.createElement('ARTICLE');
            article.classList.add('closed-pill');

            const header = document.createElement('HEADER');

            const title = document.createElement('H3');
            title.innerText = item.title;

            const subtitle = document.createElement('P');
            subtitle.innerText = item.subtitle;

            const anchor = document.createElement('A');
            anchor.href = '../pages/notebook.html';
            anchor.innerHTML = `<span class="material-symbols-rounded"> arrow_right_alt </span>`;

            header.append(title, subtitle);

            article.append(header, anchor);

            fragment.append(article);

        });

        sectionPills.append(fragment);

    }; //!FUNC-RENDERPILLS


    const init = () => {

        renderPills();

    }; //!FUNC-INIT

    init();

}); //!LOAD