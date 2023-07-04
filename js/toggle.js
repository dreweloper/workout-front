document.addEventListener('DOMContentLoaded', () => {

    // VARIABLES

    const expand = document.querySelector('.toggle-expand');
    const minimize = document.querySelector('.toggle-minimize');
    const card = document.querySelector('#notebook-card')


    // EVENTS

    document.addEventListener('click', ({ target }) => {

        if(target.matches('.toggle-expand') || target.matches('.toggle-minimize')){
            expand.classList.toggle('hidden');
            minimize.classList.toggle('hidden');
            card.classList.toggle('hidden');
        };

    });

}); //!LOAD