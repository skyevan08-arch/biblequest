document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('story-app');
  const params = new URLSearchParams(location.search);
  const requested = params.get('id');
  const story = BIBLEQUEST_STORIES.find(s => s.id === requested) || BIBLEQUEST_STORIES[0];
  document.title = `${story.title} | BibleQuest`;

  app.innerHTML = `
    <section class="story-detail-hero accent-${story.accent}">
      <div class="story-hero-inner">
        <a class="back-link" href="stories.html">← Back to stories</a>
        <div class="story-hero-grid">
          <div class="story-hero-copy">
            <div class="story-hero-meta"><span>${story.categoryLabel}</span><span>${story.passage}</span><span>${story.theme}</span></div>
            <h1>${story.title}</h1>
            <p>${story.tagline}</p>
            <a class="button story-start-button" href="#lesson">Begin lesson</a>
          </div>
          <div class="story-hero-art">${BIBLEQUEST_ART.card(story.id)}</div>
        </div>
      </div>
    </section>

    <section class="story-progress-wrap" id="lesson">
      <div class="story-progress-nav">
        <button class="progress-tab active-tab" data-section="intro"><span>1</span>Introduction</button>
        <button class="progress-tab" data-section="story"><span>2</span>Story</button>
        <button class="progress-tab" data-section="game"><span>3</span>Game</button>
        <button class="progress-tab" data-section="quiz"><span>4</span>Knowledge</button>
        <button class="progress-tab" data-section="meaning"><span>5</span>Meaning</button>
        <button class="progress-tab" data-section="reflection"><span>6</span>Reflection</button>
      </div>
    </section>

    <section class="lesson-section active-lesson" data-lesson="intro">
      <div class="lesson-content intro-lesson">
        <div class="intro-copy">
          <span class="lesson-number">01 / Introduction</span>
          <h2>Before the story begins</h2>
          <p class="lesson-lede">A little context makes the story easier to understand before you step into it.</p>
          <div class="intro-cards">
            <article><span>Context</span><p>${story.intro.context}</p></article>
            <article><span>Big idea</span><p>${story.intro.bigIdea}</p></article>
          </div>
          <button class="button primary next-lesson" data-next="story">Enter the story →</button>
        </div>
        <div class="intro-art accent-${story.accent}">${BIBLEQUEST_ART.card(story.id)}</div>
      </div>
    </section>

    <section class="lesson-section" data-lesson="story">
      <div class="lesson-content story-lesson-content">
        <div class="story-section-heading">
          <div><span class="lesson-number">02 / Story</span><h2>${story.passage}</h2></div>
          <p>The scenes below are a short paraphrase for learning. Use the Scripture link later to read the biblical passage itself.</p>
        </div>
        <div class="scene-viewer">
          <div class="scene-stage accent-${story.accent}" id="scene-stage">
            <div class="scene-art-wrap" id="scene-art"></div>
            <div class="scene-badge"><span id="scene-number">1</span><small>SCENE</small></div>
          </div>
          <div class="scene-copy" id="scene-copy">
            <span id="scene-counter"></span>
            <h3 id="scene-title"></h3>
            <p id="scene-text"></p>
            <div class="scene-progress-dots" id="scene-dots"></div>
            <div class="scene-controls">
              <button class="icon-button" id="scene-prev" aria-label="Previous scene">←</button>
              <button class="button primary" id="scene-next">Next scene →</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="lesson-section" data-lesson="game">
      <div class="lesson-content game-lesson-content">
        <span class="lesson-number">03 / Mini Game</span>
        <h2>Play the story.</h2>
        <p class="lesson-lede">Each BibleQuest story uses a different kind of activity so the interaction matches the moment instead of feeling like the same activity every time.</p>
        <div class="unique-game-shell" id="unique-game"></div>
        <div class="lesson-next-row"><button class="button primary next-lesson" data-next="quiz">Continue to the knowledge check →</button></div>
      </div>
    </section>

    <section class="lesson-section" data-lesson="quiz">
      <div class="lesson-content narrow">
        <span class="lesson-number">04 / Knowledge Check</span>
        <h2>What did you notice?</h2>
        <p class="lesson-lede">Choose an answer for each question. When you check your answers, BibleQuest will show the correct answer and explain why.</p>
        <form id="quiz-form" class="quiz-form">
          ${story.quiz.map((q, qi) => `
            <fieldset class="quiz-question" data-question="${qi}">
              <legend><span>${qi+1}</span>${q.q}</legend>
              <div class="quiz-options">
              ${q.options.map((option, oi) => `
                <label data-option="${oi}">
                  <input type="radio" name="q${qi}" value="${oi}">
                  <span class="option-marker"></span>
                  <span>${option}</span>
                </label>`).join('')}
              </div>
              <div class="question-feedback" aria-live="polite"></div>
            </fieldset>`).join('')}
          <button type="submit" class="button primary">Check answers</button>
        </form>
        <div class="quiz-result" id="quiz-result" aria-live="polite"></div>
        <div class="lesson-next-row"><button class="button primary next-lesson" data-next="meaning">Explore the meaning →</button></div>
      </div>
    </section>

    <section class="lesson-section" data-lesson="meaning">
      <div class="lesson-content meaning-layout">
        <div class="meaning-main">
          <span class="lesson-number">05 / Meaning</span>
          <h2>${story.meaning.heading}</h2>
          ${story.meaning.paragraphs.map(p=>`<p>${p}</p>`).join('')}
          <div class="takeaway-box"><span>Remember this</span><strong>${story.meaning.takeaway}</strong></div>
        </div>
        <aside class="catholic-connection">
          <div class="connection-icon">✦</div>
          <span class="mini-label">CATHOLIC CONNECTION</span>
          <h3>Read the story with the Church.</h3>
          <p>${story.meaning.catholic}</p>
          <a href="${story.sources.scripture}" target="_blank" rel="noopener">Read ${story.passage} at USCCB ↗</a>
          <a href="${story.sources.catechism}" target="_blank" rel="noopener">Open Catholic reference ↗</a>
        </aside>
        <div class="lesson-next-row meaning-next"><button class="button primary next-lesson" data-next="reflection">Finish with reflection →</button></div>
      </div>
    </section>

    <section class="lesson-section" data-lesson="reflection">
      <div class="lesson-content narrow">
        <span class="lesson-number">06 / Reflection</span>
        <h2>Bring the story with you.</h2>
        <div class="reflection-card">
          <span>Think about this</span>
          <p>${story.reflection}</p>
          <textarea rows="5" placeholder="Write a private thought here if you want. Nothing is sent or saved online."></textarea>
          <small>This box stays local to the page. BibleQuest does not upload the text.</small>
        </div>
        <button class="button primary complete-story-button" id="complete-story">${isStoryComplete(story.id)?'Story completed ✓':'Mark story complete'}</button>
        <div class="completion-card ${isStoryComplete(story.id)?'show-completion':''}" id="completion-card">
          <span class="completion-check">✓</span>
          <div><h3>Story complete</h3><p>Your completion is saved in this browser. You can review this lesson anytime or choose another story.</p><a class="text-link" href="stories.html">Choose another story →</a></div>
        </div>
      </div>
    </section>
  `;

  setupFlow();
  setupScenes(story);
  BIBLEQUEST_GAMES.render(document.getElementById('unique-game'), story);
  setupQuiz(story);
  setupCompletion(story);
});

function setupFlow(){
  const tabs=[...document.querySelectorAll('.progress-tab')];
  const sections=[...document.querySelectorAll('.lesson-section')];
  function show(name, smooth=true){
    const current=document.querySelector('.lesson-section.active-lesson');
    const next=document.querySelector(`.lesson-section[data-lesson="${name}"]`);
    if(!next || next===current)return;
    if(current){current.classList.add('lesson-leaving');setTimeout(()=>{current.classList.remove('active-lesson','lesson-leaving');next.classList.add('active-lesson','lesson-entering');requestAnimationFrame(()=>next.classList.remove('lesson-entering'));},180);}else next.classList.add('active-lesson');
    tabs.forEach(t=>t.classList.toggle('active-tab',t.dataset.section===name));
    setTimeout(()=>document.getElementById('lesson').scrollIntoView({behavior:smooth?'smooth':'auto',block:'start'}),190);
  }
  tabs.forEach(t=>t.addEventListener('click',()=>show(t.dataset.section)));
  document.querySelectorAll('.next-lesson').forEach(b=>b.addEventListener('click',()=>show(b.dataset.next)));
  window.BibleQuestShowLesson=show;
}

function setupScenes(story){
  let i=0;
  const art=document.getElementById('scene-art');
  const stage=document.getElementById('scene-stage');
  const copy=document.getElementById('scene-copy');
  const number=document.getElementById('scene-number');
  const counter=document.getElementById('scene-counter');
  const title=document.getElementById('scene-title');
  const text=document.getElementById('scene-text');
  const prev=document.getElementById('scene-prev');
  const next=document.getElementById('scene-next');
  const dots=document.getElementById('scene-dots');
  dots.innerHTML=story.scenes.map((_,idx)=>`<button aria-label="Go to scene ${idx+1}" data-dot="${idx}"></button>`).join('');

  function render(direction=1){
    stage.classList.remove('scene-shift-left','scene-shift-right');
    copy.classList.remove('scene-copy-shift');
    void stage.offsetWidth;
    stage.classList.add(direction>0?'scene-shift-left':'scene-shift-right');
    copy.classList.add('scene-copy-shift');
    art.innerHTML=BIBLEQUEST_ART.scene(story.id,i);
    number.textContent=i+1;
    counter.textContent=`Scene ${i+1} of ${story.scenes.length}`;
    title.textContent=story.scenes[i].title;
    text.textContent=story.scenes[i].text;
    prev.disabled=i===0;
    next.textContent=i===story.scenes.length-1?'Continue to Mini Game →':'Next scene →';
    dots.querySelectorAll('button').forEach((d,idx)=>d.classList.toggle('active-dot',idx===i));
  }
  prev.addEventListener('click',()=>{if(i>0){i--;render(-1)}});
  next.addEventListener('click',()=>{
    if(i<story.scenes.length-1){i++;render(1)}
    else window.BibleQuestShowLesson('game');
  });
  dots.querySelectorAll('button').forEach(d=>d.addEventListener('click',()=>{const n=Number(d.dataset.dot);const direction=n>=i?1:-1;i=n;render(direction)}));
  render();
}

function setupQuiz(story){
  const form=document.getElementById('quiz-form');
  const result=document.getElementById('quiz-result');
  form.addEventListener('submit',e=>{
    e.preventDefault();
    let score=0,answered=0;
    story.quiz.forEach((q,qi)=>{
      const field=form.querySelector(`[data-question="${qi}"]`);
      const selected=field.querySelector(`input[name="q${qi}"]:checked`);
      const labels=[...field.querySelectorAll('label')];
      labels.forEach(label=>label.classList.remove('correct-answer','wrong-answer','correct-reveal'));
      const feedback=field.querySelector('.question-feedback');
      if(!selected){feedback.textContent='Choose an answer before checking.';feedback.className='question-feedback visible-feedback neutral-feedback';return;}
      answered++;
      const chosen=Number(selected.value);
      if(chosen===q.answer){score++;labels[chosen].classList.add('correct-answer');feedback.textContent=`Correct — ${q.explanation}`;feedback.className='question-feedback visible-feedback good-feedback';}
      else{labels[chosen].classList.add('wrong-answer');labels[q.answer].classList.add('correct-reveal');feedback.textContent=`Not quite. ${q.explanation}`;feedback.className='question-feedback visible-feedback bad-feedback';}
    });
    result.classList.add('show-result');
    result.textContent=answered<story.quiz.length?`You answered ${answered} of ${story.quiz.length}. Complete the unanswered question${story.quiz.length-answered===1?'':'s'} above.`:`${score} / ${story.quiz.length} correct — ${score===story.quiz.length?'Nice work. You caught the key ideas.':'Use the explanations above to review what you missed.'}`;
  });
}

function setupCompletion(story){
  const button=document.getElementById('complete-story');
  const card=document.getElementById('completion-card');
  button.addEventListener('click',()=>{markStoryComplete(story.id);button.textContent='Story completed ✓';card.classList.add('show-completion');updateGlobalProgress();});
}
