document.addEventListener('DOMContentLoaded', () => {


    // FUNCTIONS

    const fetchAPI = async () => {

        const url = 'https://workout-back-dkij.onrender.com/api/v1';

        try {
            
            const request = await fetch(url);

            const response = await request.json();

            if(response.ok){

                const { pills } = response;

                return pills;

            } else {

                throw response;

            };

        } catch (error) {
            
            console.log(error);

        };

    }; //!FUNC-FETCHAPI


    const init = () => {

        fetchAPI();

    }; //!FUNC-INIT

    init();

}); //!LOAD