const STORAGE_KEY='biblequest-completed-stories';

function getCompletedStories(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||[]}catch{return[]}}
function setCompletedStories(ids){localStorage.setItem(STORAGE_KEY,JSON.stringify(ids))}
function isStoryComplete(id){return getCompletedStories().includes(id)}
function markStoryComplete(id){const ids=getCompletedStories();if(!ids.includes(id)){ids.push(id);setCompletedStories(ids)}}

function storyCard(story){
  const complete=isStoryComplete(story.id);
  return `<article class="story-card" data-category="${story.category}">
    <a class="story-card-visual accent-${story.accent}" href="story.html?id=${story.id}" aria-label="Open ${story.title}">
      <div class="card-art-wrap">${BIBLEQUEST_ART.card(story.id)}</div>
      <span class="story-passage">${story.passage}</span>
    </a>
    <div class="story-card-body">
      <div class="story-card-meta"><span>${story.categoryLabel}</span><span class="${complete?'complete-pill':'theme-pill'}">${complete?'Completed ✓':story.theme}</span></div>
      <h3><a href="story.html?id=${story.id}">${story.title}</a></h3>
      <p>${story.short}</p>
      <a class="story-card-link" href="story.html?id=${story.id}">${complete?'Review story':'Start story'} →</a>
    </div>
  </article>`;
}

function updateGlobalProgress(){
  const completed=getCompletedStories();const total=typeof BIBLEQUEST_STORIES!=='undefined'?BIBLEQUEST_STORIES.length:8;
  const homeCount=document.getElementById('home-progress-count');const homeBar=document.getElementById('home-progress-bar');const libraryCount=document.getElementById('library-progress-count');
  if(homeCount)homeCount.textContent=`${completed.length} / ${total}`;
  if(homeBar)homeBar.style.width=`${(completed.length/total)*100}%`;
  if(libraryCount)libraryCount.textContent=`${completed.length} of ${total} complete`;
}

document.addEventListener('DOMContentLoaded',()=>{
  const homeGrid=document.getElementById('home-story-grid');
  if(homeGrid&&typeof BIBLEQUEST_STORIES!=='undefined')homeGrid.innerHTML=BIBLEQUEST_STORIES.map(storyCard).join('');
  updateGlobalProgress();

  const menuButton=document.querySelector('.mobile-menu-button');const nav=document.querySelector('.main-nav');
  if(menuButton&&nav)menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('nav-open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'✕':'☰'});

  const current=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.main-nav a').forEach(link=>{const href=link.getAttribute('href').split('?')[0];if(href===current)link.classList.add('active-nav')});
});
