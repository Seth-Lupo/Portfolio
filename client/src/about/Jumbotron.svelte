<script>
// @ts-nocheck

    import * as PIXI from 'pixi.js'
    import Victor from 'victor'
    import { onMount } from 'svelte'
  import App from '../App.svelte';

    let app = new PIXI.Application({ 
        width: window.innerWidth, 
        height: window.innerHeight/1.61
    });
    app.renderer.backgroundColor = 0xFFFFFF;

    let wrapper
    onMount(() => {wrapper.appendChild(app.view)});
    
    const container = new PIXI.ParticleContainer(40000); 
    app.stage.addChild(container);

    container.interactive = true


    let template = new PIXI.Graphics();
    template.beginFill(0x000000);
    template.drawCircle(0, 0, 100)
    var texture = app.renderer.generateTexture(template);

    let particles = new Array(40000).fill(null).map(() => {
        let particle = new PIXI.Sprite(texture);
        let data = {
            pos: Victor(
                app.renderer.width * Math.random(),
                app.renderer.height * Math.random()
            ),
            vel: Victor(
                Math.random()-0.5,
                Math.random()-0.5
            )
        }
        particle.width = 5
        particle.height = 5
        particle["data"] = data
        container.addChild(particle)
        return particle
    }) 
    
    let elapsed = 0.0;
    
    app.ticker.add((delta) => {
        elapsed += delta;
        
        let mousePos = Victor(
            app.renderer.plugins.interaction.mouse.global.x,
            app.renderer.plugins.interaction.mouse.global.y
        )
        let inX = mousePos.x > 0 && mousePos.x < app.renderer.width
        let inY = mousePos.y > 0 && mousePos.y < app.renderer.height
       
        
        particles.map((particle) => {     
                   
            if (inX && inY) {
                let interaction = particle.data.pos.clone()
                .subtract(mousePos)
                let factor = 10/interaction.lengthSq()
                interaction.multiply(Victor(factor, factor))
                particle.data.vel.add(interaction)
            }

            let center = Victor(
                app.renderer.width/2,
                app.renderer.height/2
            )
            let relPos = particle.data.pos.clone().subtract(center)
            let acc = Victor(
                0,
                0
            ).add(Victor(
                0.1*relPos.x,
                0.1*relPos.y
            ))
            .add(Victor(
                600*Math.sin(elapsed/100)*Math.sin((relPos.x)/100),
                0,
            ))
            .multiply(Victor(0.001, 0.001))
            
            particle.data.vel = acc
            
            particle.data.vel.add(acc)



            // particle.data.vel.multiply(Victor(0.85, 0.85))
            particle.data.pos.add(particle.data.vel)
            
            
            particle.x = particle.data.pos.x
            particle.y = particle.data.pos.y

          
        })

    });


</script>

<div bind:this={wrapper}>

</div>

