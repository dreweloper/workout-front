document.addEventListener('DOMContentLoaded', () => {

    // VARIABLES

    const fragment = document.createDocumentFragment();

    const sectionPills = document.querySelector('#workout-pills');

    const mainNotebook = document.querySelectorAll('.notebook-main');


    // EVENTS

    document.addEventListener('click', ({ target }) => {

        

    });



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

            const articleClosed = document.createElement('ARTICLE');
            articleClosed.id = item.id;
            articleClosed.classList.add('closed-pill');

            const header = document.createElement('HEADER');

            const title = document.createElement('H3');
            title.innerText = item.title;

            const subtitle = document.createElement('P');
            subtitle.innerText = item.subtitle;

            const anchor = document.createElement('A');
            anchor.dataset['id'] = item.id;
            anchor.href = `/notebook.html?${item.id}`;
            anchor.innerHTML = `<span class="material-symbols-rounded"> arrow_right_alt </span>`;

            header.append(title, subtitle);

            articleClosed.append(header, anchor);

            fragment.append(articleClosed);

        });

        sectionPills.append(fragment);

    }; //!FUNC-RENDERPILLS


    const renderNotebook = async (id) => {

        const response = await fetchAPI();

        const data = response.filter(item => item.id == id);

        data.forEach(item => {

            const header = document.createElement('HEADER');
            header.classList.add('notebook-header');

            const divHeader = document.createElement('DIV');
            divHeader.classList.add('notebook-header-title');

            const anchorHeader = document.createElement('A');
            

        })

    }; //!FUNC-RENDERNOTEBOOK


    const init = () => {

        if (location.href.includes('notebook')){

            const id = location.search.substring(1);
            
            return renderNotebook(id);

        } else {

            renderPills();

        };

    }; //!FUNC-INIT


    init();


}); //!LOAD