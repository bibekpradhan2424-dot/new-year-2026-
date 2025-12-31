// HEART ANIMATION
const heartBtn = document.getElementById('heartBtn');
const heartsDiv = document.getElementById('hearts');

if (heartBtn) {
    heartBtn.addEventListener('click', () => {
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 90 + '%';
        heart.style.top = '90%';
        heart.style.fontSize = '2em';
        heartsDiv.appendChild(heart);

        let top = 90;
        const floatUp = setInterval(() => {
            if (top <= 0) {
                heartsDiv.removeChild(heart);
                clearInterval(floatUp);
            }
            top -= 1;
            heart.style.top = top + '%';
        }, 30);
    });
}

// COUNTDOWN TIMER
const countdown = document.getElementById('countdown');
if (countdown) {
    const newYear = new Date(new Date().getFullYear() + 1, 0, 1).getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = newYear - now;

        document.getElementById('days').textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById('hours').textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('minutes').textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('seconds').textContent = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            clearInterval(timer);
            countdown.innerHTML = "🎉 Happy New Year! 🎉";
        }
    }, 1000);
}

// MESSAGE SENDING
const sendMessageBtn = document.getElementById('sendMessageBtn');
if (sendMessageBtn) {
    sendMessageBtn.addEventListener('click', () => {
        const message = document.getElementById('messageInput').value;
        if (message.trim() !== '') {
            document.getElementById('displayMessage').textContent = "💌 " + message;
            document.getElementById('messageInput').value = '';
        }
    });
}

// FIREWORKS ANIMATION
const canvas = document.getElementById('fireworksCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];
    const particles = [];

    class Firework {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.targetY = Math.random() * canvas.height / 2;
            this.speed = 5 + Math.random() * 3;
            this.exploded = false;
        }
        update() {
            if (this.y > this.targetY) {
                this.y -= this.speed;
            } else {
                this.explode();
            }
        }
        explode() {
            this.exploded = true;
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(this.x, this.y));
            }
        }
        draw() {
            if (!this.exploded) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = "white";
                ctx.fill();
            }
        }
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.speedX = (Math.random() - 0.5) * 6;
            this.speedY = (Math.random() - 0.5) * 6;
            this.alpha = 1;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= 0.02;
        }
        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function animate() {
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.05) {
            fireworks.push(new Firework(Math.random() * canvas.width, canvas.height));
        }

        fireworks.forEach((f, i) => {
            f.update();
            f.draw();
            if (f.exploded) fireworks.splice(i, 1);
        });

        particles.forEach((p, i) => {
            p.update();
            p.draw();
            if (p.alpha <= 0) particles.splice(i, 1);
        });

        requestAnimationFrame(animate);
    }
    animate();
}

// CONFETTI
const confettiCount = 100;
const confettiElements = [];

for (let i = 0; i < confettiCount; i++) {
    const conf = document.createElement('div');
    conf.classList.add('confetti');
    conf.style.left = Math.random() * window.innerWidth + 'px';
    conf.style.animationDuration = 2 + Math.random() * 3 + 's';
    document.body.appendChild(conf);
    confettiElements.push(conf);
}
