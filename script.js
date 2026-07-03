:root {
--bg: #ffffff;
--soft: #f7f8f8;
--text: #1f2326;
--muted: #8d969b;
--line: #edf0f1;
--button: #202326;
--button-text: #ffffff;
}

* {
box-sizing: border-box;
}

html {
scroll-behavior: smooth;
}

body {
margin: 0;
background: var(--bg);
color: var(--text);
font-family: Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
letter-spacing: -0.02em;
}

img {
display: block;
width: 100%;
height: auto;
}

.site-header {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 72px;
z-index: 10;
display: flex;
align-items: center;
padding: 0 42px;
background: rgba(255, 255, 255, 0.76);
backdrop-filter: blur(22px);
border-bottom: 1px solid rgba(237, 240, 241, 0.7);
}

.brand {
color: var(--text);
text-decoration: none;
font-size: 15px;
font-weight: 600;
letter-spacing: 0.04em;
}

.section {
min-height: 100vh;
padding: 120px 42px 80px;
display: grid;
align-items: center;
gap: 56px;
}

.hero {
grid-template-columns: 0.9fr 1.1fr;
}

.split {
grid-template-columns: 1fr 0.85fr;
border-top: 1px solid var(--line);
}

.reverse {
grid-template-columns: 0.85fr 1fr;
}

.copy {
max-width: 560px;
}

.eyebrow {
margin: 0 0 18px;
color: var(--muted);
font-size: 13px;
font-weight: 500;
letter-spacing: 0.08em;
text-transform: uppercase;
}
h1 {
margin: 0;
font-size: clamp(76px, 12vw, 172px);
line-height: 0.88;
font-weight: 600;
letter-spacing: -0.08em;
}

h2 {
margin: 0 0 18px;
font-size: clamp(42px, 6vw, 88px);
line-height: 0.96;
font-weight: 560;
letter-spacing: -0.07em;
}

.tagline,
.subline,
.copy p:not(.eyebrow):not(.coming):not(.form-note) {
color: #555f64;
font-size: clamp(22px, 2.3vw, 34px);
line-height: 1.12;
margin: 20px 0 0;
}

.coming {
margin: 30px 0 0;
color: var(--muted);
font-size: 16px;
}

.visual {
background: var(--soft);
border-radius: 36px;
overflow: hidden;
}

.hero-visual {
background: #fbfbfb;
}

.waitlist-form {
margin-top: 34px;
display: flex;
gap: 10px;
max-width: 440px;
}

.waitlist-form input {
width: 100%;
height: 52px;
border: 1px solid var(--line);
border-radius: 999px;
padding: 0 20px;
font-size: 15px;
outline: none;
background: #fff;
}

.waitlist-form input:focus {
border-color: #cfd6d9;
}

.waitlist-form button {
height: 52px;
border: 0;
border-radius: 999px;
padding: 0 24px;
background: var(--button);
color: var(--button-text);
font-size: 15px;
white-space: nowrap;
cursor: pointer;
transition: opacity 0.2s ease, transform 0.2s ease;
}

.waitlist-form button:hover {
opacity: 0.88;
transform: translateY(-1px);
}

.form-note {
margin-top: 12px;
color: var(--muted);
font-size: 13px;
}

.center {
margin: 0 auto;
text-align: center;
}

.moments {
display: block;
min-height: auto;
}

.wide {
margin-top: 46px;
}

.moment-grid {
margin-top: 26px;
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 12px;
}

.moment-grid div {
border: 1px solid var(--line);
border-radius: 999px;
padding: 16px 18px;
text-align: center;
color: #687277;
background: #fff;
font-size: 15px;
}

footer {
padding: 40px 42px;
border-top: 1px solid var(--line);
color: var(--muted);
font-size: 13px;
}

@media (max-width: 860px) {
.site-header {
padding: 0 22px;
}

.section,
.hero,
.split,
.reverse {
grid-template-columns: 1fr;
min-height: auto;
padding: 110px 22px 64px;
}

.reverse .copy {
order: 1;
}

.reverse .visual {
order: 2;
}

.waitlist-form {
flex-direction: column;
}

.moment-grid {
grid-template-columns: 1fr;
}

.visual {
border-radius: 26px;
}

footer {
padding: 34px 22px;
}
}
