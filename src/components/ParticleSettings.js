import React, {Component} from "react";
import Particles from "react-tsparticles";

class ParticleSettings extends Component{
render() {
    return(
        <div>
            <Particles
            height='1000vh'
            width='100vw'
            id = 'tsparticles'
            options={{
                background: {
                    color:{
                        value: '#DAA520'
                    },
                },
                fpslimit:60,
                interactivity:{
                    detect_on: 'canvas',
                    events: {
                        onClick:{
                            enable: 'true',
                            mode: 'push'
                        },
                        onHover:{
                            enable: 'true',
                            mode:'repulse'
                        },
                        resize: 'true'
                    },
                    modes:{
                        bubble: {
                            distance: 400,
                            duration: 2, 
                            size: 40
                        },
                        push:{
                            quantity: 1,
                        },
                        repulse:{
                            distance: 200,
                            duration: 0.5
                        },
                    },
                    },

                    particles:{
                        color:{
                            value: '5F021F'
                        },
                        links:{
                            color: '#ffffff',
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1
                        },
                        collisions: {
                            enable: false
                        },
                        move:{
                            direction: 'none',
                            enable: true,
                            outMode: 'bounce',
                            random: false,
                            speed: 1.5,
                            straight: false,
                            attract:{
                                enable: false
                            }
                        },
                        number: {
                            density: {
                                enable: true,
                                value_area: 800
                            },
                            value: 80,
                        },
                            opacity: {
                                value: 0.5
                            },
                            shape:{
                                type: 'circle'
                            },
                            size:{
                                random: true,
                                value: 5
                            }
                        
                    }
                }
            }
            />
        </div>
    )
}
} 

export default ParticleSettings;