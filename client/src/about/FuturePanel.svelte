<script>
    import viewport from "../useViewportAction";
    import getSchool from "./getSchool";
    let active = false

    
</script>

<main 
use:viewport 
on:enterViewport={() => {active = true}}
class:active= {active}>

    <div id="acc1"></div>

    <h1>Future Plans</h1>
    
    <p>I currently want to pursue a Doctorate in computer science. Specifically, I want to study <a href="https://en.wikipedia.org/wiki/Theoretical_computer_science">theoretical computing</a> and <a href="https://en.wikipedia.org/wiki/Algorithmic_information_theory">algorithmic information theory</a>. I don't want to just use computers; I want to study the limit of what is computationally possible.</p>

    <p>After I earn my degree, I've been thinking about becoming a professor. I've always enjoyed teaching others. Also, being a professor will let me conduct my own research free from financial incentives. However, this plan is subject to change—many things can happen in 6 years!</p>

    <p>I am currently in the process of applying colleges (odds are you're probably an admission officer). Because of that, my future is uncertain. 
        
        {#if getSchool()}
        <b>However, I hope to get into my dream school...</b>
        {:else}
        Still, I remain excited to encounter what's next.
        {/if}



    </p>
   

   
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