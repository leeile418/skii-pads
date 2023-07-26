console.log("Spawning...!")

async function observerAndSkip() {
    // Select the element you want to observe
    let targetElement = document.querySelector('#movie_player');
    while (true) {
        if (targetElement) {
            break;
        } else {
            await new Promise(x => setTimeout(x, 200));
            targetElement = document.querySelector('#movie_player');
        }
    }
    
    if (targetElement) {
        console.log("targetElement exists", targetElement)
        // Create a new MutationObserver instance
        let observer = new MutationObserver((mutationsList, observer) => {
    
            mutationsList.forEach((mutation) => {
                // Check if the class you're interested in has been added or removed
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    let elementHasClass = targetElement.classList.contains('ad-showing');
                    
                    if (elementHasClass) {
                        // The specific class has been added to the element
                        console.log('Adful.');

                        // Search for skeep buttons
                        skeep_buttons = document.querySelectorAll("[id^='skip-button']")

                        // only skeeps if it skeep is available
                        if (skeep_buttons.length > 0) {
                            skeep_buttons.forEach((skeep_button) => {
                                skeep_button.click();
                              })
                        } else {
                            // if skeep is unavailable
                            // document.querySelectorAll("video").forEach(vid => vid.playbackRate = 22.5)
                            let video = document.querySelector("video");
                            video.currentTime = video.duration;
                        }

                    } else {
                        // The specific class has been removed from the element
                        console.log('Adless.');
                    }
                }
            });
        });
        
        // Start observing the target element for changes
        observer.observe(targetElement, { attributes: true });
    } else {
        console.log('targetElement does not exist');
    }  
}


if (document.readyState !== 'loading') {
    console.log('[document.readyState !== loading] observing...');
    try {
        observerAndSkip();
    }
    catch(err) {
        console.log(err);
    }
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('[document.readyState === loading]. observing...');
        try {
            observerAndSkip();
        }
        catch(err) {
            console.log(err);
        }
    })
}
