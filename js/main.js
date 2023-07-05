document.addEventListener('DOMContentLoaded', () => {

    // VARIABLES

    const fragment = document.createDocumentFragment();

    const sectionPills = document.querySelector('#workout-pills');
    const mainNotebook = document.querySelector('.notebook-main');
    const mainWorkout = document.querySelector('#workout-main');



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

        console.log(response);




        // PILLS

        const { pills } = response;


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

        sectionPills.append(fragment);

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
            divNotebook.classList.add('jupiter-notebook');

            const iframe = document.createElement('IFRAME');
            item.url_iframe_notebook ? iframe.src = item.url_iframe_notebook : iframe.classList.add('hidden');

            const buttonMaximize = document.createElement('BUTTON');
            buttonMaximize.classList.add('toggle-maximize');
            buttonMaximize.innerHTML = `Expandir <span class="material-symbols-rounded toggle-maximize">open_in_new</span>`;

            const buttonMinimize = document.createElement('BUTTON');
            buttonMinimize.classList.add('toggle-minimize', 'hidden');
            buttonMinimize.innerHTML = `Minimizar <span class="material-symbols-rounded toggle-minimize">minimize</span>`;

            divNotebook.append(iframe, buttonMaximize, buttonMinimize);

            // ARTICLE - CARD

            const article = document.createElement('ARTICLE');
            article.id = 'notebook-card';

            const titleCard = document.createElement('H3');
            titleCard.innerText = item.title;

            const divVideo = document.createElement('DIV');
            item.url_iframe_vimeo ? divVideo.innerHTML = item.url_iframe_vimeo : divVideo.classList.add('hidden');

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

            article.append(titleCard, divVideo, anchorPrev, anchorNext, anchorSlack, anchorPDF, anchorChallenge);

            section.append(divNotebook, article);

            // FRAGMENT

            fragment.append(header, section);

        });

        mainNotebook.append(fragment);

    }; //!FUNC-RENDERNOTEBOOK


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

            const id = location.search.substring(1);

            return renderNotebook(id);

        } else {

            renderIndex();

        };

    }; //!FUNC-INIT


    init();


}); //!LOAD