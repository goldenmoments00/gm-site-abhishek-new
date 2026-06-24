const fs = require('fs');
let c = fs.readFileSync('public/pictlens.html', 'utf8');

const scriptToInject = `
    <script>
      window.addEventListener('DOMContentLoaded', (event) => {
        setTimeout(() => {
          document.querySelectorAll('.heading-block').forEach((el, index) => {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
            el.style.transitionDelay = (index * 0.04) + 's';
            el.style.opacity = '1';
            el.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
          });
        }, 100); // Trigger shortly after DOM load
      });
    </script>
`;

if (!c.includes("document.querySelectorAll('.heading-block')")) {
  c = c.replace('</body>', scriptToInject + '\n  </body>');
  fs.writeFileSync('public/pictlens.html', c, 'utf8');
  console.log('Injected custom animation script!');
} else {
  console.log('Script already injected!');
}
