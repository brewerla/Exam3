/* 
Name: Landen Brewer
Date: 5/11/2022
Class: Website Development II
*/

//Create a new person vue component
Vue.component('person', {
    //props take a person object
    props: ['personobj'],
    
    /* 
    The template includes a v-if statement to reveal the details or hide the details based on the state of
    the revealDetails boolean variable; 

    It also includes a button that, when clicked, will run the getDetails method. 
    */
    template: `
        <div>
            <p>{{person.name}}</p>
            <div v-if="revealDetails">
                <p>{{details.biography}}</p>
                <img class="profile-img" :src="'https://image.tmdb.org/t/p/original' + details.profile_path">
            </div>
            <button @click="getDetails">{{showOrHide}} Details</button>
        </div>
    `,

    //The data method that holds the data for the component
    data() {
        return {
            //The person object
            person: this.personobj,

            //Reveal details boolean to show or hide the extra information
            revealDetails: false,

            //The details specfic to this person
            details: null, 

            //An extra show or hide details variable that gives better looking button text
            showOrHide: "Show"
        }
    },
    //The methods for the component
    methods: {

        //The get details method gets the details specific to the person object
        getDetails() {
            //If details is null, that means that the information for this person needs to be fetched (or axiosed in this case)
            if(!this.details) {
                //Make a call to the tmdb api getting a specific person
                axios.get("https://api.themoviedb.org/3/person/" + this.person.id + "?api_key=ce96ecaa99d9e4a73097699664325729&language=en-US&page=1")
                .then(results => {

                    //With those results write that data to the details variable
                    this.details = results.data; 

                    //Change the reveal details to true and change the button text to 'hide'. 
                    this.revealDetails = true;
                    this.showOrHide = "Hide";
                });
            } 
            /* 
            If the details object is NOT null, that means that the information has already been received
            and all we have to do is change the reveal details variable 
            and the showOrHide variable 
            */
            else {
                this.revealDetails = !this.revealDetails; 
                this.showOrHide = (this.revealDetails) ? "Hide" : "Show";
            }
        }
    }   
});

//############ End of components

//Create a new Vue instance that will hold the components
let app = new Vue({

    //What element that we are targeting
    el: "#app",

    //The data that is held in the Vue app
    data: {
        //A title for fun
        title: "Popular People",

        //The required people array
        //This array holds objects that were recieved from the axios call in the mounted method
        people: []
    }, 
    //There were no methods required here for this program to run :)

    //The mounted method that runs when the app has been loaded. 
    mounted() {
        //Get popular people by making an api call to the tmdb api
        axios.get("https://api.themoviedb.org/3/person/popular?api_key=ce96ecaa99d9e4a73097699664325729&language=en-US&page=1")
        .then(response => {
            //When that is recieved, dig down into the response and get that array of objects that we are looking for. 
            this.people = response.data.results;
        })
    }
});