import React from 'react';

function About () {
    return (
        /* //<div> 
        using React.Fragment instead of div since we don't
        really need an element here. React Fragment is like an
        empty/placeholder element that is used to maintain the JSX 
        syntax; it doesn't actually show up in the DoM
        */
        <React.Fragment>
            <h1>About</h1>
            <p>This is the TodoList app v1.0.0. It is part of
                a practice project.
            </p>
        </React.Fragment>

        //</div>
    )
}

export default About;