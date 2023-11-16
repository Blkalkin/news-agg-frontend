document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.createElement('div');
    const headline = document.createElement('h1');
    headline.textContent = 'Welcome to the News Aggregator!';

    appContainer.appendChild(headline);
    document.body.appendChild(appContainer);
});

document.addEventListener('DOMContentLoaded', () => {
    const divider = document.getElementById('divider');
    const topicsPane = document.getElementById('topics-pane');
    const app = document.getElementById('app');
    let isDragging = false;

    // Function to update the width of the topics pane
    const updateWidth = (e) => {
        const newWidth = e.clientX;
        const appWidth = app.offsetWidth;
        if (newWidth > 100 && newWidth < appWidth - 100) { // Adjust the limits as needed
            topicsPane.style.width = `${newWidth}px`;
        }
    };

    divider.addEventListener('mousedown', function(e) {
        e.preventDefault();
        isDragging = true;
        console.log('Mousedown on divider'); // Debug log
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            updateWidth(e);
        }
    });

    document.addEventListener('mouseup', function(e) {
        if (isDragging) {
            isDragging = false;
            console.log('Mouseup - stopped dragging'); // Debug log
        }
    });
});

// index.js

function fetchLatestArticles() {
    fetch('http://127.0.0.1:8000/latest_articles/')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Call the render function for each topic
            Object.keys(data).forEach(topic => {
                renderArticles(data[topic]);
            });
        })
        .catch(error => {
            console.error('Could not get articles:', error);
        });
}

// Call this function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchLatestArticles();
});

// index.js
function renderArticles(articles) {
    const topicsPane = document.getElementById('topics-pane');

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');

        const titleElement = document.createElement('h3');
        titleElement.textContent = article.title;

        const contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container', 'collapsed');

        const bodyElement = document.createElement('p');
        bodyElement.textContent = article.body;
        bodyElement.classList.add('article-body');

        const dateLabel = document.createElement('div');
        dateLabel.textContent = `Published on: ${article.publish_date}`;
        dateLabel.classList.add('date-label');

        const linkElement = document.createElement('a');
        linkElement.href = article.url;
        linkElement.textContent = 'Go to Site';
        linkElement.target = '_blank'; // Opens in a new tab
        linkElement.classList.add('site-link');

        // Append additional content to the container
        contentContainer.appendChild(bodyElement);
        contentContainer.appendChild(dateLabel);
        contentContainer.appendChild(linkElement);

        // Toggle the display of additional content when the title is clicked
        titleElement.addEventListener('click', () => {
            contentContainer.classList.toggle('expanded');
            contentContainer.classList.toggle('collapsed');
        });

        // Append elements to the article element
        articleElement.appendChild(titleElement);
        articleElement.appendChild(contentContainer);
        topicsPane.appendChild(articleElement);
    });
}


const topicsPane = document.getElementById('topics-pane');

topicsPane.addEventListener('scroll', () => {
    if (topicsPane.scrollTop + topicsPane.clientHeight >= topicsPane.scrollHeight) {
        // We're at the bottom of the topics pane
    }
});