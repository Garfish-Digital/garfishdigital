   document.addEventListener('DOMContentLoaded', () => {
            const widgetContainer = document.querySelector('.glass-widget-container');

            if (!widgetContainer) {
                console.warn('Glass widget container not found.');
                return;
            }

            // Read tilt and parallax strength from data attributes
            const tiltStrength = parseFloat(widgetContainer.dataset.tiltStrength || 0.1); // Default 0.1
            const parallaxStrength = parseFloat(widgetContainer.dataset.parallaxStrength || 20); // Default 20px

            let animationFrameId = null;

            function applyTransform(e) {
                const rect = widgetContainer.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const mouseX = e.clientX;
                const mouseY = e.clientY;

                // Calculate position relative to the center of the widget (-1 to 1)
                const rotX = (mouseY - centerY) / rect.height; // -0.5 to 0.5
                const rotY = (mouseX - centerX) / rect.width;  // -0.5 to 0.5

                // Calculate tilt angles (multiplied by strength)
                const tiltY = -rotY * (tiltStrength * 100); // Rotate around Y-axis based on horizontal mouse position
                const tiltX = rotX * (tiltStrength * 100);  // Rotate around X-axis based on vertical mouse position

                // Calculate parallax translation (multiplied by strength)
                const parallaxX = -rotY * parallaxStrength; // Move horizontally based on vertical mouse position
                const parallaxY = -rotX * parallaxStrength; // Move vertically based on horizontal mouse position

                // Apply transforms to the container
                widgetContainer.style.transform = `
            perspective(var(--scene-perspective))
            rotateX(${tiltX}deg)
            rotateY(${tiltY}deg)
            translateX(${parallaxX}px)
            translateY(${parallaxY}px)
        `;
            }

            function resetTransform() {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
                widgetContainer.style.transform = `
            perspective(var(--scene-perspective))
            rotateX(0deg)
            rotateY(0deg)
            translateX(0px)
            translateY(0px)
        `;
            }

            // Event Listeners
            widgetContainer.addEventListener('mousemove', (e) => {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
                animationFrameId = requestAnimationFrame(() => applyTransform(e));
            });

            widgetContainer.addEventListener('mouseleave', () => {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
                animationFrameId = requestAnimationFrame(resetTransform);
            });
        });