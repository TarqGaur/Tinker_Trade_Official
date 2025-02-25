       // Initialize Quantum Grid
       function initQuantumGrid() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('webgl-container').appendChild(renderer.domElement);

        // Create quantum particles
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        for(let i = 0; i < 10000; i++) {
            vertices.push(
                Math.random() * 1000 - 500,
                Math.random() * 1000 - 500,
                Math.random() * 1000 - 500
            );
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.5,
            color: 0x00ff46,
            transparent: true,
            opacity: 0.1
        });
        
        const points = new THREE.Points(geometry, material);
        scene.add(points);

        camera.position.z = 500;

        function animate() {
            requestAnimationFrame(animate);
            points.rotation.x += 0.0001;
            points.rotation.y += 0.0001;
            renderer.render(scene, camera);
        }
        animate();
    }

    // Initialize Terminal Stream
    function initTerminalStream() {
        const container = document.createElement('div');
        container.className = 'terminal-stream';
        document.body.appendChild(container);

        setInterval(() => {
            const line = document.createElement('div');
            line.textContent = generateHexStream();
            line.style.position = 'fixed';
            line.style.left = `${Math.random() * 100}%`;
            line.style.top = `${Math.random() * 100}%`;
            line.style.color = `rgba(0,255,70,${Math.random() * 0.3})`;
            line.style.fontSize = `${Math.random() * 2 + 1}px`;
            container.appendChild(line);
            
            anime({
                targets: line,
                opacity: [1, 0],
                duration: 3000,
                easing: 'linear',
                complete: () => line.remove()
            });
        }, 100);
    }

    function generateHexStream() {
        return Array(50).fill(0).map(() => 
            Math.random().toString(16).substr(2, 1)
        ).join('');
    }

    // Initialize Systems
    initQuantumGrid();
    initTerminalStream();

    // Mobile Menu Handler
    let lastTap = 0;
    document.querySelector('.glitch-logo').addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            const now = new Date().getTime();
            if (now - lastTap < 300) {
                document.querySelector('.navigation-area').classList.toggle('show');
            }
            lastTap = now;
        }
    });