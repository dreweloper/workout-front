document.addEventListener('DOMContentLoaded', () => {

    // VARIABLES

    const maximize = document.querySelector('.toggle-maximize');
    const minimize = document.querySelector('.toggle-minimize');
    const card = document.querySelector('#notebook-card')


    // EVENTS

    document.addEventListener('click', ({ target }) => {

        if(target.matches('.toggle-maximize') || target.matches('.toggle-minimize')){
            maximize.classList.toggle('hidden');
            minimize.classList.toggle('hidden');
            card.classList.toggle('hidden');
        };

    });

}); //!LOAD