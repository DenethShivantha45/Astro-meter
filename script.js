document.addEventListener('DOMContentLoaded', () => {
    const planetNavigation = document.getElementById('planet-navigation');
    const introSection = document.getElementById('intro-section');
    const currentDatetimeSpan = document.getElementById('current-datetime');

    // --- Planet Names (for Navigation) ---
    // Since details are in HTML, we just need the IDs/names for nav generation
    const planetNames = [
        { key: "mercury", name: "Mercury" },
        { key: "venus", name: "Venus" },
        { key: "earth", name: "Earth" },
        { key: "mars", name: "Mars" },
        { key: "jupiter", name: "Jupiter" },
        { key: "saturn", name: "Saturn" },
        { key: "uranus", name: "Uranus" },
        { key: "neptune", name: "Neptune" },
        { key: "proxima_b", name: "Proxima Centauri b" },
        { key: "trappist_1e", name: "TRAPPIST-1e" },
        { key: "kepler_186f", name: "Kepler-186f" },
        { key: "hd_209458b", name: "HD 209458 b" },
        { key: "wasp_12b", name: "WASP-12b" },
        { key: "gj_504b", name: "Gliese 504 b" },
        { key: "hr_8799e", name: "HR 8799 e" },
        { key: "corot_7b", name: "CoRoT-7b" },
        { key: "k2_18b", name: "K2-18b" },
        { key: "tess_164b", name: "TOI-164b" },
        { key: "51_pegasi_b", name: "51 Pegasi b" },
        { key: "gliese_581g", name: "Gliese 581 g" },
        { key: "hd_189733b", name: "HD 189733 b" },
        { key: "g_94c", name: "G 9-40 c" },
        { key: "lp_890_9b", name: "LP 890-9 b" },
        { key: "l_98_59b", name: "L 98-59 b" },
        { key: "toi_700d", name: "TOI 700 d" },
        { key: "kelt_9b", name: "KELT-9b" },
        { key: "vhs_1256b", name: "VHS 1256 b" },
        { key: "wasp_39b", name: "WASP-39b" }
        // Note: I've included all 20+ from your previous list,
        // even if the prompt said 20, to ensure completeness with the HTML.
    ];


    // Function to update the current date and time
    function updateCurrentDateTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        const formattedDateTime = now.toLocaleString('en-US', options);
        currentDatetimeSpan.textContent = formattedDateTime;

        // Also update the 'Data updated as of' span in any visible planet section
        const activeDynamicTimeSpan = document.querySelector('.planet-section.active .dynamic-update-time');
        if (activeDynamicTimeSpan) {
            activeDynamicTimeSpan.textContent = formattedDateTime;
        }
    }

    // Call once immediately and then every second
    updateCurrentDateTime();
    setInterval(updateCurrentDateTime, 1000);


    // Function to generate navigation items dynamically from the planetNames array
    function generateNavigation() {
        planetNavigation.innerHTML = ''; // Clear existing navigation
        planetNames.forEach(planet => {
            const navItem = document.createElement('div');
            navItem.classList.add('planet-nav-item');
            navItem.dataset.planet = planet.key; // Store the planet's ID (e.g., 'mercury')
            navItem.textContent = planet.name;
            planetNavigation.appendChild(navItem);
        });
    }

    // Function to show the selected planet's details and hide others
    function showPlanetDetails(planetId) {
        // Hide all current planet sections (including intro)
        document.querySelectorAll('.planet-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show the selected planet's section
        const targetSection = document.getElementById(planetId);
        if (targetSection) {
            // Trigger reflow/repaint to ensure CSS transition works
            void targetSection.offsetWidth;
            targetSection.classList.add('active');

            // Update the "Data updated as of" time for the newly active section
            const dynamicUpdateTimeSpan = targetSection.querySelector('.dynamic-update-time');
            if (dynamicUpdateTimeSpan) {
                dynamicUpdateTimeSpan.textContent = currentDatetimeSpan.textContent;
            }
        } else {
            console.error(`Section with ID '${planetId}' not found in HTML.`);
            // Optionally, return to intro if planet not found
            introSection.classList.add('active');
        }

        // Update active class on nav items
        document.querySelectorAll('.planet-nav-item').forEach(item => item.classList.remove('active-nav'));
        const activeNavItem = document.querySelector(`.planet-nav-item[data-planet="${planetId}"]`);
        if (activeNavItem) {
             activeNavItem.classList.add('active-nav');
        }
    }

    // Event Listener for Navigation (using event delegation)
    planetNavigation.addEventListener('click', (event) => {
        const target = event.target;
        // Check if the clicked element is a planet navigation item
        if (target.classList.contains('planet-nav-item')) {
            const planetId = target.dataset.planet; // Get the ID from data-planet attribute
            showPlanetDetails(planetId);
        }
    });

    // Add an event listener to the "Astro Meter" logo/title to return to the intro section
    const logoElement = document.querySelector('.logo');
    if (logoElement) {
        logoElement.addEventListener('click', () => {
            // Hide any currently active planet section
            const currentActiveSection = document.querySelector('.planet-section.active');
            if (currentActiveSection) {
                currentActiveSection.classList.remove('active');
            }
            // Show the intro section
            introSection.classList.add('active');
            // Remove active class from all nav items
            document.querySelectorAll('.planet-nav-item').forEach(item => item.classList.remove('active-nav'));
        });
    }

    // Initial setup: Generate navigation and ensure intro section is shown on load
    generateNavigation();
    introSection.classList.add('active'); // Explicitly make sure intro is active initially
});