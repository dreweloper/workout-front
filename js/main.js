document.addEventListener('DOMContentLoaded', () => {

    // VARIABLES

    const fragment = document.createDocumentFragment();

    const sectionPills = document.querySelector('#workout-pills');
    const mainNotebook = document.querySelector('.notebook-main');


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


    const renderIndex = async () => {

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

    }; //!FUNC-RENDERINDEX


    const renderNotebook = async (id) => {

        const response = await fetchAPI();

        const data = response.filter(item => item.id == id);


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
            item.url_iframe_notebook ? iframe.src = item.url_iframe_notebook: iframe.classList.add('hidden');

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

            const { anchorPrev, anchorNext } = buttonsPagination(id, response);

            // BUTTONS PAGINATION END

            const anchorSlack = document.createElement('A');
            anchorSlack.href = item.url_slack;
            anchorSlack.innerText = 'Tengo una duda';

            const anchorPDF = document.createElement('A');
            if(item.url_pdf){
                anchorPDF.href = item.url_pdf;
                anchorPDF.innerText = 'Descargar PDF';
            } else {
                anchorPDF.classList.add('hidden');
            };

            const anchorChallenge = document.createElement('A');
            if(item.url_challenge){
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


    const buttonsPagination = (id, response) => {

        const nextPage = parseInt(id) + 1;

        const prevPage = parseInt(id) - 1;

        const index = response.findIndex(item => item.id == id);

        const anchorPrev = document.createElement('A');
        if(index > 0){
            anchorPrev.href = `/notebook.html?${prevPage}`;
            anchorPrev.innerText = 'Volver al anterior';
        } else {
            anchorPrev.classList.add('hidden');
        };

        const anchorNext = document.createElement('A');
        if(index < response.length - 1){
            anchorNext.href = `/notebook.html?${nextPage}`;
            anchorNext.innerText = 'Ir al siguiente';
        } else {
            anchorNext.classList.add('hidden');
        };

        return { anchorPrev, anchorNext };

    }; //!FUNC-BUTTONSPAGINATION


    const init = () => {

        if (location.href.includes('notebook')){

            const id = location.search.substring(1);
            
            return renderNotebook(id);

        } else {

            renderIndex();

        };

    }; //!FUNC-INIT


    init();


}); //!LOAD