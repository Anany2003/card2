document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const envelope = document.getElementById('envelope');
    const envelopeFlap = document.getElementById('envelopeFlap');
    const cardWrapper = document.getElementById('cardWrapper');
    
    const openCardHint = document.getElementById('openCardHint');
    const closeCardHint = document.getElementById('closeCardHint');
    const nextCardHint = document.getElementById('nextCardHint');

    let currentState = 0;

    // State 0 -> 1: Open Flap
    envelopeFlap.addEventListener('click', (e) => {
        if (currentState === 0) {
            e.stopPropagation();
            envelope.classList.add('state-1');
            currentState = 1;
        }
    });

    // State 1 -> 2: Pull Out Card
    cardWrapper.addEventListener('click', (e) => {
        if (currentState === 1) {
            e.stopPropagation();
            container.classList.add('state-pulling-out');
            currentState = 1.5;
            
            setTimeout(() => {
                container.classList.remove('state-pulling-out');
                container.classList.add('state-2');
                currentState = 2;
            }, 800); // Wait for the slide-out animation to almost finish
        }
    });

    // We can also click the envelope when flap is open to pull out card
    envelope.addEventListener('click', (e) => {
        if (currentState === 1) {
            container.classList.add('state-pulling-out');
            currentState = 1.5;
            
            setTimeout(() => {
                container.classList.remove('state-pulling-out');
                container.classList.add('state-2');
                currentState = 2;
            }, 800);
        }
    });

    // State 2 -> 3: Open Card to Inner Pages
    openCardHint.addEventListener('click', (e) => {
        if (currentState === 2) {
            e.stopPropagation();
            container.classList.remove('state-2');
            container.classList.add('state-3');
            currentState = 3;
        }
    });

    // State 3 -> 4: Close Card to Back Page
    nextCardHint.addEventListener('click', (e) => {
        if (currentState === 3) {
            e.stopPropagation();
            container.classList.remove('state-3');
            container.classList.add('state-4');
            currentState = 4;
        }
    });

    // State 3 -> 2: Close Card Back to Front Page
    closeCardHint.addEventListener('click', (e) => {
        if (currentState === 3) {
            e.stopPropagation();
            container.classList.remove('state-3');
            container.classList.add('state-2');
            currentState = 2;
        }
    });

    // State 4 -> 3: Go back from Back Cover to Inner Pages
    const backToSpreadHint = document.getElementById('backToSpreadHint');
    if (backToSpreadHint) {
        backToSpreadHint.addEventListener('click', (e) => {
            if (currentState === 4) {
                e.stopPropagation();
                container.classList.remove('state-4');
                container.classList.add('state-3');
                currentState = 3;
            }
        });
    }
});
