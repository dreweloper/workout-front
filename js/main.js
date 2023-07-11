document.addEventListener('DOMContentLoaded', () => {

    // VARIABLES

    const fragment = document.createDocumentFragment();

    const mainNotebook = document.querySelector('#notebook-main');
    const mainWorkout = document.querySelector('#workout-main');
    const mainForm = document.querySelector('#form-main');



    // EVENTS

    document.addEventListener('submit', (ev) => {

        ev.preventDefault();

        location.replace('/index.html');

    });



    // FUNCTIONS

    const fetchAPI = async () => {

        const url = 'https://workout-back-dkij.onrender.com/api/v1';

        try {

            const request = await fetch(url);

            const response = await request.json();

            if (response.ok) {

                const { data } = response;

                return data;

            } else {

                throw response;

            };

        } catch (error) {

            console.log(error);

        };

    }; //!FUNC-FETCHAPI


    const renderIndex = async () => {

        const [response] = await fetchAPI();


        // HEADER

        const header = document.createElement('HEADER');
        header.classList.add('workout-main-header');

        const title = document.createElement('H1');
        title.innerText = response.title;

        const subtitle = document.createElement('P');
        subtitle.innerText = response.subtitle;

        header.append(title, subtitle);


        // SECTION

        const section = document.createElement('SECTION');
        section.id = 'workout-pills';


        // SECTION > HEADER (MENU)

        const { menu } = response; // Destructuración de la propiedad 'menu' del objeto 'response'.

        const headerMenu = document.createElement('HEADER');

        const divMenu = document.createElement('DIV');
        divMenu.classList.add('workout-pills-header-container');

        const titleMenu = document.createElement('H2');
        titleMenu.innerHTML = `${menu.title} <span class="material-symbols-rounded">arrow_downward_alt</span>`;

        divMenu.append(titleMenu);

        const subtitleMenu = document.createElement('P');
        menu.subtitle ? subtitleMenu.innerText = menu.subtitle : subtitleMenu.classList.add('hidden');

        headerMenu.append(divMenu, subtitleMenu);


        // SECTION > ARTICLES (PILLS)

        const { pills } = response; // Destructuración de la propiedad 'pills' del objeto 'response'.

        pills.forEach(item => {

            const articlePill = document.createElement('ARTICLE');
            articlePill.id = item.id;
            articlePill.classList.add('closed-pill');

            const headerPill = document.createElement('HEADER');

            const titlePill = document.createElement('H3');
            titlePill.innerText = item.title;

            const subtitlePill = document.createElement('P');
            subtitlePill.innerText = item.subtitle;

            headerPill.append(titlePill, subtitlePill);

            const anchorPill = document.createElement('A');
            anchorPill.dataset['id'] = item.id;
            anchorPill.href = `/notebook.html?${item.id}`;
            anchorPill.innerHTML = `<span class="material-symbols-rounded"> arrow_right_alt </span>`;

            articlePill.append(headerPill, anchorPill);

            // FRAGMENT

            fragment.append(articlePill);

        });

        section.append(headerMenu, fragment);

        mainWorkout.append(header, section);

    }; //!FUNC-RENDERINDEX


    const renderNotebook = async (id) => {

        const [{ pills }] = await fetchAPI();

        const data = pills.filter(item => item.id == id);


        data.forEach(item => {

            // MAIN - HEADER

            const header = document.createElement('HEADER');
            header.classList.add('notebook-header');

            const divHeader = document.createElement('DIV');
            divHeader.classList.add('notebook-header-title');

            const anchorHeader = document.createElement('A');
            anchorHeader.href = '/index.html';
            anchorHeader.innerHTML = `<span class="material-symbols-rounded">arrow_left_alt</span>`;

            const titleHeader = document.createElement('H1');
            titleHeader.innerText = item.title;

            divHeader.append(anchorHeader, titleHeader);

            const subtitleHeader = document.createElement('P');
            subtitleHeader.innerText = item.subtitle;

            header.append(divHeader, subtitleHeader);

            // MAIN - SECTION

            const section = document.createElement('SECTION');
            section.classList.add('notebook-container');

            // JUPYTER NOTEBOOK

            const divNotebook = document.createElement('DIV');
            divNotebook.classList.add('jupyter-notebook');

            const iframe = document.createElement('IFRAME');
            // item.url_iframe_notebook ? iframe.src = item.url_iframe_notebook : iframe.classList.add('hidden');
            // item.url_iframe_notebook ? iframe.src = 'http://13.37.232.55/hub' : iframe.classList.add('hidden'); //! URL ESTÁTICA TEMPORAL
            item.url_iframe_notebook ? iframe.src = 'https://productoonline.thebridge.tech' : iframe.classList.add('hidden'); //! URL ESTÁTICA TEMPORAL

            // Si no hay iframe de Jupyter Notebook, el vídeo se renderiza en su lugar y no en la card ('article').
            const divVideoNotebook = document.createElement('DIV');
            // item.url_iframe_notebook ? divVideoNotebook.classList.add('hidden') : divVideoNotebook.innerHTML = item.url_iframe_vimeo; //! URL ESTÁTICA TEMPORAL
            item.url_iframe_notebook ? divVideoNotebook.classList.add('hidden') : divVideoNotebook.innerHTML = '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/842517466?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Intro_Ejemplos_Aprendizaje_refuerzo_clip_1_c.mp4"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>';

            const buttonMaximize = document.createElement('BUTTON');
            buttonMaximize.classList.add('toggle-maximize');
            buttonMaximize.innerHTML = `Expandir <span class="material-symbols-rounded toggle-maximize">open_in_new</span>`;

            const buttonMinimize = document.createElement('BUTTON');
            buttonMinimize.classList.add('toggle-minimize', 'hidden');
            buttonMinimize.innerHTML = `Minimizar <span class="material-symbols-rounded toggle-minimize">minimize</span>`;

            divNotebook.append(iframe, divVideoNotebook, buttonMaximize, buttonMinimize);

            // ARTICLE - CARD

            const article = document.createElement('ARTICLE');
            article.id = 'notebook-card';

            const titleCard = document.createElement('H3');
            titleCard.innerText = item.title;

            // Si hay iframe de Vimeo e iframe de Jupyter Notebook, entonces se renderiza en la card.
            const divVideoCard = document.createElement('DIV');
            // item.url_iframe_vimeo && item.url_iframe_notebook ? divVideoCard.innerHTML = item.url_iframe_vimeo : divVideoCard.classList.add('hidden'); //! URL ESTÁTICA TEMPORAL
            item.url_iframe_vimeo && item.url_iframe_notebook ? divVideoCard.innerHTML = '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/842518072?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Intro_Elementos_Proceso_Aprendizaje_por_Refuerzo_clip_2_c.mp4"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>' : divVideoCard.classList.add('hidden');

            // BUTTONS PAGINATION START

            const { anchorPrev, anchorNext } = buttonsPagination(id, pills);

            // BUTTONS PAGINATION END

            const anchorSlack = document.createElement('A');
            anchorSlack.href = item.url_slack;
            anchorSlack.innerText = 'Tengo una duda';

            const anchorPDF = document.createElement('A');
            if (item.url_pdf) {
                anchorPDF.href = item.url_pdf;
                anchorPDF.innerText = 'Descargar PDF';
            } else {
                anchorPDF.classList.add('hidden');
            };

            const anchorChallenge = document.createElement('A');
            if (item.url_challenge) {
                anchorChallenge.href = item.url_challenge;
                anchorChallenge.innerText = 'Abrir Challenge';
            } else {
                anchorChallenge.classList.add('hidden');
            };

            article.append(titleCard, divVideoCard, anchorPrev, anchorNext, anchorSlack, anchorPDF, anchorChallenge);

            section.append(divNotebook, article);

            // FRAGMENT

            fragment.append(header, section);

        });

        mainNotebook.append(fragment);

    }; //!FUNC-RENDERNOTEBOOK


    const renderForm = async () => {

        

    }; //!FUNC-RENDERFORM


    const buttonsPagination = (id, pills) => {

        const nextPage = parseInt(id) + 1;

        const prevPage = parseInt(id) - 1;

        const index = pills.findIndex(item => item.id == id);

        const anchorPrev = document.createElement('A');
        if (index > 0) {
            anchorPrev.href = `/notebook.html?${prevPage}`;
            anchorPrev.innerText = 'Volver al anterior';
        } else {
            anchorPrev.classList.add('hidden');
        };

        const anchorNext = document.createElement('A');
        if (index < pills.length - 1) {
            anchorNext.href = `/notebook.html?${nextPage}`;
            anchorNext.innerText = 'Ir al siguiente';
        } else {
            anchorNext.classList.add('hidden');
        };

        return { anchorPrev, anchorNext };

    }; //!FUNC-BUTTONSPAGINATION


    const init = () => {

        if (location.href.includes('notebook')) {

            const id = location.search.replace('?', '');

            renderNotebook(id);

        } else if (location.href.includes('form')) {

            renderForm()

        } else {

            renderIndex();

        };

    }; //!FUNC-INIT


    init();


}); //!LOAD