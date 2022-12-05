<script>
    
    import P5 from 'p5-svelte';


    

	const sketch = (p) => {

        p.disableFriendlyErrors = true;

        var particles = []

        class Particle {
    
            constructor(posX, posY, velX, velY) {
                this.pos = p.createVector(posX, posY)
                this.vel = p.createVector(velX, velY)
                this.size = 0
            }

            draw() {
                
                // p.strokeWeight(1+this.vel.mag())
                // p.stroke(1+this.vel.mag()*10, 0, 0)
                p.vertex(this.pos.x, this.pos.y)
                
            }

            advance() {
                
                let repulsion = p.createVector(
                    this.pos.x - p.mouseX + p.width/2, 
                    this.pos.y - p.mouseY + p.height/2,
                )
                repulsion.setMag(Math.min(1/repulsion.magSq(), 0.01))
                repulsion.mult(2000)

                let inXBounds = 0 < p.mouseX && p.mouseX < p.width
                let inYBounds = 0 < p.mouseY && p.mouseY < p.height

                if (inXBounds && inYBounds)
                    this.vel.add(repulsion)

                
                // let vectorField = p.createVector(
                //     Math.pow(-this.pos.y, 3) - 1000*this.pos.x,
                //     Math.pow(this.pos.x, 3) - 1000*this.pos.y
                // ) 

                // for (let particle of particles) {
                //     if (this.pos.d)
                // }


                // vectorField.mult(0.00000001)
                // this.vel.add(vectorField)



                this.vel.mult(0.8)



                this.pos.add(this.vel)
            }

        }

        
        
        p.settings = () => {
             
            

        }

        p.setup = () => {
            
            p.pixelDensity(1);
            p.frameRate(30)            
			p.createCanvas(window.screen.width, window.screen.height/1.61, p.WEBGL);
            
            for (let i = 0; i < 2000; i++) {
                particles.push(new Particle(
                    (Math.random()-0.5) * p.width/2,
                    (Math.random()-0.5) * p.height/2,
                    50*(Math.random()-0.5),
                    50*(Math.random()-0.5)
                ))
            }
                

		};

		p.draw = () => {
            
            p.background(255, 255, 255)
            
            p.translate(p.width/2, p.height/2)

            for (let particle of particles) {
                particle.advance()
            }
            for (let particle of particles) {
                p.beginShape(p.POINTS)
                particle.draw()
                p.endShape()
            }

        }

        

    

        
      
	};

</script>

<main>
    <P5 {sketch}></P5>
</main>


<style>

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        /* background-color: aliceblue; */
        padding: 0;
        border: 0;
    }

</style>