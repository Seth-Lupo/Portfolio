

<script>
    // @ts-nocheck
    
    import * as PIXI from 'pixi.js'
    import Victor from 'victor'
    import { onMount } from 'svelte'
    import App from '../App.svelte';
    
    let wrapper
    
    onMount( () => {
        let app = new PIXI.Application({ 
            resizeTo: wrapper,
            antialiasing: false,
            transparent: true

        });
        
        
        
        
        
        wrapper.appendChild(app.view)
        
        const container = new PIXI.Container(); 
        app.stage.addChild(container);
        
        container.interactive = true
        
        let colors = [0x1c1026, 0xc6bbb9, 0x4c1e3c, 0x21242b, 0x7a748c]
        
        let textures = []
        
        let template1 = new PIXI.Graphics();
        template1.beginFill(0x4c1e3c);
        template1.drawCircle(0, 0, 3)
        let texture1 = app.renderer.generateTexture(template1);
        textures.push(texture1)
        
        let template2 = new PIXI.Graphics();
        template2.beginFill(0x1c1026);
        template2.drawCircle(0, 0, 3)
        let texture2 = app.renderer.generateTexture(template2);
        textures.push(texture2)
        
        
        let particles = new Array(15000).fill(null).map(() => {
            
            let particle = new PIXI.Sprite(textures[Math.floor(Math.random() * textures.length)]);
            particle.anchor.set(0.5)
            let data = {
                pos: Victor(
                app.renderer.width * Math.random(),
                app.renderer.height * Math.random()
                ),
                vel: Victor(
                2*(Math.random()-0.5),
                2*(Math.random()-0.5)
                )
            }
            let size = Math.random() * 10 + 5
            particle.width = size
            particle.height = size
            particle["data"] = data
            container.addChild(particle)
            return particle
        }) 
        
        let elapsed = 0.0;
        
        app.ticker.maxFPS = 
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
                    let factor = 0.1/interaction.lengthSq()
                    interaction.multiply(Victor(factor, factor))
                    particle.data.vel.add(interaction)
                    particle.data.vel.add(Victor(-100*interaction.y, 100*interaction.x))
                }
                
                let center = Victor(
                app.renderer.width/2,
                app.renderer.height/2
                )
                let relPos = particle.data.pos.clone().subtract(center)
                // let acc = Victor(
                //     0,
                //     0
                // ).add(Victor(
                //     0.1*relPos.x,
                //     0.1*relPos.y
                // ))
                // .multiply(Victor(0.001, 0.001))
                
                // particle.data.vel.add(acc)
                particle.data.vel.multiply(Victor(0.99, 0.99))
                particle.data.pos.add(particle.data.vel)
                
                if (particle.data.pos.x < 0) {
                    particle.data.pos.x = app.renderer.width
                } else if (particle.data.pos.x > app.renderer.width) {
                    particle.data.pos.x = 0
                }
                
                if (particle.data.pos.y < 0) {
                    particle.data.pos.y = app.renderer.height
                } else if (particle.data.pos.y > app.renderer.height) {
                    particle.data.pos.y = 0
                }
                
                
                
                
                
                particle.x = particle.data.pos.x
                particle.y = particle.data.pos.y
                
                
            })
            
        });
        
        function resize() {
            if (window.innerWidth / window.innerHeight >= ratio) {
                var w = window.innerHeight * ratio;
                var h = window.innerHeight;
            } else {
                var w = window.innerWidth;
                var h = window.innerWidth / ratio;
            }
            renderer.view.style.width = w + 'px';
            renderer.view.style.height = h + 'px';
        }
        window.onresize = resize;
        
    });
    
    
</script>

<div id="wrapper" bind:this={wrapper}>
    <h1>SETH LUPO</h1>
</div>

<style>



    #wrapper {
        width: 100vw;
        height: 61vh;
        overflow-x: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h1 {
        font-family: 'Martian Mono', monospace;
        font-size: 12rem;
        z-index: 10;
        color: white; 
        
    }



</style>

