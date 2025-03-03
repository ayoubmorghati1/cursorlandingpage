// Initialize animations when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Animate the title with a staggered effect
    anime.timeline({
        easing: 'easeOutExpo',
    })
    .add({
        targets: '.new-badge',
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 800
    })
    .add({
        targets: '.title-animation span',
        translateY: [100, 0],
        opacity: [0, 1],
        duration: 1200,
        delay: anime.stagger(100),
    }, '-=400')
    .add({
        targets: '.subtitle',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
    }, '-=800');

    // Animate the prompt container
    anime({
        targets: '.prompt-container',
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 500
    });

    // Staggered animation for feature buttons
    anime({
        targets: '.feature-btn',
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 600,
        delay: anime.stagger(100),
        easing: 'easeOutElastic(1, .5)'
    });

    // Floating shapes animation
    anime({
        targets: '.circle',
        translateX: [-30, 30],
        translateY: [-20, 20],
        rotate: [0, 360],
        duration: 8000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
    });

    anime({
        targets: '.square',
        translateX: [20, -20],
        translateY: [-30, 30],
        rotate: [45, 405],
        duration: 9000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
    });

    anime({
        targets: '.triangle',
        translateX: [-10, 10],
        translateY: [-40, 40],
        rotate: [-20, 20],
        duration: 10000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
    });

    // Hover animation for feature buttons
    const featureButtons = document.querySelectorAll('.feature-btn');
    featureButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutElastic(1, .5)'
            });
        });

        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                scale: 1,
                duration: 300,
                easing: 'easeOutElastic(1, .5)'
            });
        });
    });

    // Animate social proof section
    anime({
        targets: '.social-proof > *',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(100),
        easing: 'easeOutExpo'
    });

    // Text typing animation
    const textWrapper = document.querySelector('.prompt-prefix');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: true})
        .add({
            targets: '.prompt-prefix .letter',
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 100,
            delay: (el, i) => 30 * i
        }).add({
            targets: '.prompt-prefix',
            opacity: 1,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                anime({
                    targets: document.scrollingElement,
                    scrollTop: target.offsetTop,
                    duration: 500,
                    easing: 'easeInOutQuad'
                });
            }
        });
    });

    // Showcase animations
    const prompts = [
        "Change to vertical...",
        "Make it horizontal...",
        "Switch to compact view...",
        "Now expand it..."
    ];

    const componentStates = [
        "vertical",
        "horizontal",
        "compact",
        "expanded"
    ];

    const promptPrefix = document.querySelector('.prompt-prefix');
    const promptBox = document.querySelector('.prompt-box');
    const demoComponent = document.querySelector('.demo-component');
    const componentCard = document.querySelector('.component-card');

    let currentPromptIndex = 0;

    // Function to animate typing effect
    function typeText(text) {
        return new Promise(resolve => {
            let letters = text.split('');
            promptPrefix.textContent = ""; // Clear existing text
            
            const typing = setInterval(() => {
                if (letters.length > 0) {
                    promptPrefix.textContent += letters.shift();
                } else {
                    clearInterval(typing);
                    setTimeout(resolve, 1000);
                }
            }, 100);
        });
    }

    // Function to animate component transformation
    function transformComponent(state) {
        // Remove all states first
        componentStates.forEach(s => demoComponent.classList.remove(s));
        
        // Add new state
        demoComponent.classList.add(state);

        // Add floating animation to card
        componentCard.classList.add('floating');

        // Animate the component with anime.js
        anime({
            targets: '.demo-component',
            scale: [0.95, 1],
            opacity: [0.5, 1],
            duration: 1000,
            easing: 'easeOutElastic(1, .5)'
        });

        // Animate the lines inside
        anime({
            targets: '.demo-line',
            width: ['0%', '100%'],
            duration: 800,
            delay: anime.stagger(100),
            easing: 'easeOutExpo'
        });
    }

    // Function to run the showcase animation cycle
    async function runShowcaseAnimation() {
        while (true) {
            // Add typing effect
            promptBox.classList.add('typing');

            // Type the prompt
            await typeText(prompts[currentPromptIndex]);

            // Transform the component
            transformComponent(componentStates[currentPromptIndex]);

            // Wait for animation
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Remove typing effect
            promptBox.classList.remove('typing');

            // Clear the text with a fade effect
            anime({
                targets: '.prompt-prefix',
                opacity: [1, 0],
                duration: 500,
                easing: 'easeOutExpo',
                complete: () => {
                    promptPrefix.textContent = "Ask Agentimate to create a design that...";
                    anime({
                        targets: '.prompt-prefix',
                        opacity: [0, 1],
                        duration: 500,
                        easing: 'easeInExpo'
                    });
                }
            });

            // Remove floating animation from card
            componentCard.classList.remove('floating');

            // Wait before next cycle
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Update index
            currentPromptIndex = (currentPromptIndex + 1) % prompts.length;
        }
    }

    // Start the showcase animation after a delay
    setTimeout(runShowcaseAnimation, 2000);

    // Add hover effect to component card
    componentCard.addEventListener('mouseenter', () => {
        anime({
            targets: '.component-card',
            scale: 1.02,
            duration: 300,
            easing: 'easeOutElastic(1, .5)'
        });
    });

    componentCard.addEventListener('mouseleave', () => {
        anime({
            targets: '.component-card',
            scale: 1,
            duration: 300,
            easing: 'easeOutElastic(1, .5)'
        });
    });
}); 