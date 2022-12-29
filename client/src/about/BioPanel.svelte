<script>
    import viewport from "../useViewportAction";
    let active = false

</script>

<main 
use:viewport 
on:enterViewport={() => {active = true}}
class:active= {active}>

    <div id="acc1"></div>

    <h1>Let me introduce myself,</h1>
    <h2>I'm Seth!</h2>
    <p>You probably knew that from the title.</p>
    <p>I'm a Senior at Innovation Academy Charter School in Tyngsboro, Massachusetts. As my high school career comes to a close, I would like to present a few of the projects I've built so far. By doing so, I hope to show off my skills.</p>
    <p><b>If there is one thing you need to know about me...</b></p>

   
</main>

<style>
    main {
        width: calc(100% - 20vh);
        margin: 10vh;

        display: flex;
        position: relative;
        flex-flow: column;
        border-left: 0.5rem solid;
        border-right: 0.5rem solid;
        border-color: #a300ff; 

        opacity: 0;
        

        /* background-color: grey; */
    }


    

   


    h1, h2, p {
        margin-left: 10vh;
        margin-right: 10vh;
    }

    h1 {
        font-size: 2.5rem;
        color: grey;
        font-family: 'Martian Mono', monospace;
    }

    h2 {
        font-size: 5rem;
        font-family: 'Martian Mono', monospace;
    }

    p {
        font-family: "Lato", sans-serif;
        font-weight: 300;
        font-size: 1.25rem;
        margin-top: 1.25rem;
    }

    main :last-child {
        margin-bottom: 1.25rem;
    }

    b {
        font-weight: 900;
    }

</style>