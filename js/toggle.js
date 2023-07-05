document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('click', ({ target }) => {

        const maximize = document.querySelector('.toggle-maximize');
        const minimize = document.querySelector('.toggle-minimize');
        const card = document.querySelector('#notebook-card');

        if(target.matches('.toggle-maximize') || target.matches('.toggle-minimize')){
            maximize.classList.toggle('hidden');
            minimize.classList.toggle('hidden');
            card.classList.toggle('hidden');
        };

    });

}); //!LOAD