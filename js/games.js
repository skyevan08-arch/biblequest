(function(){
  function activateKeyboard(handler){
    const listener = (e) => {
      const gameSection = document.querySelector('[data-lesson="game"]');
      if (!gameSection || !gameSection.classList.contains('active-lesson')) return;
      const key = e.key.toLowerCase();
      if (['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d',' '].includes(key)) {
        e.preventDefault();
        handler(key);
      }
    };
    document.addEventListener('keydown', listener);
  }

  function david(container){
    container.innerHTML = `
      <div class="game-title-row"><div><span class="mini-label">DAVID'S JOURNEY</span><h3>Gather five stones and reach the camp</h3></div><div class="game-score" id="david-score">0 / 5 stones</div></div>
      <p class="game-help">Move with <strong>Arrow Keys</strong> or <strong>WASD</strong>. Walk over the stones, then reach the glowing camp. On a phone or tablet, use the controls below.</p>
      <div class="adventure-board david-board" id="david-board">
        <div class="moving-cloud cloud-one"></div><div class="moving-cloud cloud-two"></div>
        <div class="david-path"></div>
        <div class="camp-goal" id="david-goal"><span>⛺</span><small>Camp</small></div>
        <div class="game-tree t1"></div><div class="game-tree t2"></div><div class="game-tree t3"></div>
        <div class="boulder b1"></div><div class="boulder b2"></div><div class="boulder b3"></div>
        ${[0,1,2,3,4].map(i=>`<button class="collectible-stone stone-${i}" data-stone="${i}" aria-label="Stone ${i+1}">●</button>`).join('')}
        <div class="david-player" id="david-player"><span class="head"></span><span class="body"></span></div>
      </div>
      <div class="game-message" id="david-message">Find the five smooth stones before heading to the camp.</div>
      <div class="dpad">
        <span></span><button data-dir="up">↑</button><span></span>
        <button data-dir="left">←</button><button data-dir="down">↓</button><button data-dir="right">→</button>
      </div>`;

    const player = container.querySelector('#david-player');
    const goal = container.querySelector('#david-goal');
    const score = container.querySelector('#david-score');
    const message = container.querySelector('#david-message');
    const stones = [...container.querySelectorAll('.collectible-stone')];
    const obstacles = [
      [31,30,8,9],[55,59,8,9],[72,35,9,8],
      [22,62,7,12],[64,72,7,12],[82,56,7,12]
    ];
    let x=7,y=78;
    const found = new Set();

    const stonePositions=[[20,25],[39,72],[50,28],[68,55],[79,22]];
    stones.forEach((s,i)=>{s.style.left=stonePositions[i][0]+'%';s.style.top=stonePositions[i][1]+'%';});

    function near(a,b,dist=6){return Math.hypot(a[0]-b[0],a[1]-b[1])<dist}
    function blocked(nx,ny){return obstacles.some(([ox,oy,w,h])=>Math.abs(nx-ox)<w/2 && Math.abs(ny-oy)<h/2)}
    function render(){
      player.style.left=x+'%';player.style.top=y+'%';
      stonePositions.forEach((pos,i)=>{
        if(!found.has(i) && near([x,y],pos,6)){
          found.add(i); stones[i].classList.add('collected');
          score.textContent=`${found.size} / 5 stones`;
          message.textContent=found.size===5?'All five stones collected. Head to the camp!':`Stone ${found.size} collected. Keep exploring.`;
        }
      });
      if(near([x,y],[91,13],8)){
        if(found.size===5){
          message.textContent='Journey complete! David is ready to continue toward the valley.';
          message.classList.add('success-message');
          goal.classList.add('goal-complete');
        } else {
          message.textContent=`You reached the camp, but ${5-found.size} stone${5-found.size===1?'':'s'} remain.`;
        }
      }
    }
    function move(dir){
      let nx=x,ny=y,step=3.6;
      if(dir==='up')ny-=step;if(dir==='down')ny+=step;if(dir==='left')nx-=step;if(dir==='right')nx+=step;
      nx=Math.max(3,Math.min(95,nx));ny=Math.max(4,Math.min(91,ny));
      if(!blocked(nx,ny)){x=nx;y=ny;render();}
    }
    function key(k){
      const map={arrowup:'up',w:'up',arrowdown:'down',s:'down',arrowleft:'left',a:'left',arrowright:'right',d:'right'};
      if(map[k])move(map[k]);
    }
    activateKeyboard(key);
    container.querySelectorAll('[data-dir]').forEach(b=>b.addEventListener('click',()=>move(b.dataset.dir)));
    stones.forEach((s,i)=>s.addEventListener('click',()=>{
      message.textContent=`Stone ${i+1} is over there — walk David close enough to collect it.`;
      s.classList.add('ping');setTimeout(()=>s.classList.remove('ping'),600);
    }));
    render();
  }

  function noah(container){
    const animals=[['Lion','🦁'],['Dove','🕊️'],['Sheep','🐑'],['Lion','🦁'],['Dove','🕊️'],['Sheep','🐑']]
      .map((a,i)=>({name:a[0],icon:a[1],id:i}))
      .sort(()=>0.5-Math.random());
    container.innerHTML=`
      <div class="game-title-row"><div><span class="mini-label">NOAH'S ARK</span><h3>Find the animal pairs</h3></div><div class="game-score" id="match-score">0 / 3 pairs</div></div>
      <p class="game-help">Click two cards. Match each animal with its pair so they can enter the ark together.</p>
      <div class="memory-scene"><div class="rain-layer"></div><div class="mini-ark">ARK</div><div class="memory-grid">${animals.map((a,i)=>`<button class="memory-card" data-name="${a.name}" data-index="${i}"><span class="card-back">?</span><span class="card-front">${a.icon}<small>${a.name}</small></span></button>`).join('')}</div></div>
      <div class="game-message" id="match-message">Find your first matching pair.</div>`;
    let open=[],matched=0,busy=false;
    const cards=[...container.querySelectorAll('.memory-card')];
    const msg=container.querySelector('#match-message');
    const score=container.querySelector('#match-score');
    cards.forEach(card=>card.addEventListener('click',()=>{
      if(busy||card.classList.contains('matched')||card.classList.contains('flipped'))return;
      card.classList.add('flipped');open.push(card);
      if(open.length===2){
        busy=true;
        const same=open[0].dataset.name===open[1].dataset.name;
        setTimeout(()=>{
          if(same){open.forEach(c=>c.classList.add('matched'));matched++;score.textContent=`${matched} / 3 pairs`;msg.textContent=`${open[0].dataset.name} pair found!`;if(matched===3){msg.textContent='All the pairs are ready for the ark!';msg.classList.add('success-message');}}
          else {open.forEach(c=>c.classList.remove('flipped'));msg.textContent='Not a pair — remember where each animal is.';}
          open=[];busy=false;
        },650);
      }
    }));
  }

  function samaritan(container){
    const items=[
      ['Bandage','🩹',true],['Water','💧',true],['Oil','🫗',true],['Coins','🪙',true],['Crown','👑',false],['Sword','🗡️',false],['Drum','🥁',false]
    ];
    container.innerHTML=`
      <div class="game-title-row"><div><span class="mini-label">MERCY IN ACTION</span><h3>Pack the care bag</h3></div><div class="game-score" id="care-score">0 / 4 helpful items</div></div>
      <p class="game-help">Choose items that could help the wounded traveler. Click an item to place it in the bag.</p>
      <div class="care-game"><div class="care-road"><div class="traveler-figure"><span>🙂</span><small>Traveler</small></div><div class="care-bag" id="care-bag"><span>CARE BAG</span><div id="bag-items"></div></div></div><div class="care-items">${items.map(([n,icon,good],i)=>`<button class="care-item" data-good="${good}" data-name="${n}" data-icon="${icon}"><span>${icon}</span><small>${n}</small></button>`).join('')}</div></div>
      <div class="game-message" id="care-message">What would be useful for immediate care and a safe place to recover?</div>`;
    const chosen=new Set();const msg=container.querySelector('#care-message');const score=container.querySelector('#care-score');const bag=container.querySelector('#bag-items');
    container.querySelectorAll('.care-item').forEach(item=>item.addEventListener('click',()=>{
      const name=item.dataset.name;
      if(chosen.has(name))return;
      if(item.dataset.good==='true'){
        chosen.add(name);item.classList.add('chosen');bag.insertAdjacentHTML('beforeend',`<span class="bag-chip">${item.dataset.icon}</span>`);score.textContent=`${chosen.size} / 4 helpful items`;msg.textContent=`${name} added. Mercy becomes practical.`;
        if(chosen.size===4){msg.textContent='Care bag complete! You chose practical ways to help the traveler.';msg.classList.add('success-message');}
      }else{
        item.classList.add('wrong-pick');msg.textContent=`${name} is not what the traveler needs right now. Try another item.`;setTimeout(()=>item.classList.remove('wrong-pick'),500);
      }
    }));
  }

  function moses(container){
    const safe=[1,2,0,1,2,1];let row=0,lane=1;
    container.innerHTML=`
      <div class="game-title-row"><div><span class="mini-label">CROSS THE SEA</span><h3>Find the safe path forward</h3></div><div class="game-score" id="sea-score">Step 0 / ${safe.length}</div></div>
      <p class="game-help">Use <strong>← →</strong> to choose a lane and <strong>↑</strong> to move forward. You can also click a tile in the next row.</p>
      <div class="sea-game"><div class="sea-wall left-sea"></div><div class="sea-wall right-sea"></div><div class="sea-path" id="sea-path">${safe.map((_,r)=>`<div class="sea-row" data-row="${r}">${[0,1,2].map(l=>`<button class="sea-tile" data-row="${r}" data-lane="${l}"></button>`).join('')}</div>`).join('')}<div class="sea-player" id="sea-player">●</div></div></div>
      <div class="game-message" id="sea-message">Choose a lane and move forward. Watch for the path that glows.</div>
      <div class="sea-controls"><button data-sea="left">←</button><button data-sea="forward">↑ Forward</button><button data-sea="right">→</button></div>`;
    const player=container.querySelector('#sea-player'),msg=container.querySelector('#sea-message'),score=container.querySelector('#sea-score');
    function paint(){
      container.querySelectorAll('.sea-row').forEach((r,ri)=>r.classList.toggle('active-row',ri===row));
      if(row<safe.length){const tile=container.querySelector(`.sea-tile[data-row="${row}"][data-lane="${safe[row]}"]`);tile.classList.add('hint-tile');setTimeout(()=>tile.classList.remove('hint-tile'),700);}
      player.style.left=`${16.6+lane*33.3}%`;player.style.bottom=`${5+row*14.5}%`;
    }
    function moveLane(delta){lane=Math.max(0,Math.min(2,lane+delta));paint();}
    function forward(){
      if(row>=safe.length)return;
      if(lane===safe[row]){row++;score.textContent=`Step ${row} / ${safe.length}`;msg.textContent=row===safe.length?'You reached the far shore!':'Good path — keep going.';if(row===safe.length)msg.classList.add('success-message');paint();}
      else{msg.textContent='That lane closes with water. Shift left or right and try again.';container.querySelector('.sea-path').classList.add('shake');setTimeout(()=>container.querySelector('.sea-path').classList.remove('shake'),400);}
    }
    container.querySelectorAll('[data-sea]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.sea==='left')moveLane(-1);else if(b.dataset.sea==='right')moveLane(1);else forward();}));
    container.querySelectorAll('.sea-tile').forEach(t=>t.addEventListener('click',()=>{if(Number(t.dataset.row)!==row)return;lane=Number(t.dataset.lane);paint();forward();}));
    activateKeyboard(k=>{if(['arrowleft','a'].includes(k))moveLane(-1);if(['arrowright','d'].includes(k))moveLane(1);if(['arrowup','w',' '].includes(k))forward();});
    paint();
  }

  function nativity(container){
    const pts=[[12,65],[24,32],[38,52],[50,20],[63,44],[75,28],[88,58]];let next=0;
    container.innerHTML=`
      <div class="game-title-row"><div><span class="mini-label">FOLLOW THE STAR</span><h3>Light the path to Bethlehem</h3></div><div class="game-score" id="star-score">0 / 7 stars</div></div>
      <p class="game-help">Click the stars in order from 1 to 7. Each one lights the next part of the journey.</p>
      <div class="star-game" id="star-game"><div class="night-hills"></div><div class="bethlehem-silhouette"><span>★</span><small>Bethlehem</small></div><svg class="star-lines" viewBox="0 0 100 100" preserveAspectRatio="none" id="star-lines"></svg>${pts.map((p,i)=>`<button class="path-star" data-star="${i}" style="left:${p[0]}%;top:${p[1]}%"><span>${i+1}</span></button>`).join('')}</div>
      <div class="game-message" id="star-message">Start with star 1.</div>`;
    const stars=[...container.querySelectorAll('.path-star')],lines=container.querySelector('#star-lines'),score=container.querySelector('#star-score'),msg=container.querySelector('#star-message');
    stars.forEach((s,i)=>s.addEventListener('click',()=>{
      if(i!==next){s.classList.add('wrong-star');msg.textContent=`Look for star ${next+1}.`;setTimeout(()=>s.classList.remove('wrong-star'),400);return;}
      s.classList.add('lit-star');
      if(i>0){const [x1,y1]=pts[i-1],[x2,y2]=pts[i];lines.insertAdjacentHTML('beforeend',`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="drawn-star-line"/>`);}
      next++;score.textContent=`${next} / 7 stars`;msg.textContent=next===7?'The path is complete — Bethlehem is ahead!':`Great. Now find star ${next+1}.`;if(next===7){msg.classList.add('success-message');container.querySelector('.bethlehem-silhouette').classList.add('bethlehem-glow');}
    }));
  }

  function storm(container){
    container.innerHTML=`
      <div class="game-title-row"><div><span class="mini-label">THE STORM</span><h3>Keep the boat steady</h3></div><div class="game-score"><span id="storm-time">12</span>s</div></div>
      <p class="game-help">Press <strong>Start</strong>, then use <strong>← →</strong> or A/D to keep the boat inside the glowing safe zone while the waves push it around.</p>
      <div class="storm-game" id="storm-game"><div class="storm-cloud c1"></div><div class="storm-cloud c2"></div><div class="rain-streaks"></div><div class="safe-zone"></div><div class="boat" id="storm-boat"><span>⛵</span></div><div class="wave wave-a"></div><div class="wave wave-b"></div><div class="wave wave-c"></div></div>
      <div class="storm-meter"><span>Steadiness</span><div><i id="storm-meter-fill"></i></div></div>
      <div class="storm-actions"><button class="button primary" id="storm-start">Start crossing</button><button class="storm-arrow" data-storm="left">←</button><button class="storm-arrow" data-storm="right">→</button></div>
      <div class="game-message" id="storm-message">The storm has not started yet.</div>`;
    let x=50,running=false,time=12,health=100,timer=null,driftTimer=null;
    const boat=container.querySelector('#storm-boat'),timeEl=container.querySelector('#storm-time'),fill=container.querySelector('#storm-meter-fill'),msg=container.querySelector('#storm-message'),start=container.querySelector('#storm-start'),game=container.querySelector('#storm-game');
    function render(){boat.style.left=x+'%';fill.style.width=health+'%';}
    function move(delta){if(!running)return;x=Math.max(8,Math.min(92,x+delta));render();}
    function stop(success){running=false;clearInterval(timer);clearInterval(driftTimer);start.disabled=false;start.textContent='Try again';game.classList.remove('storm-running');msg.textContent=success?'You held the course through the storm. The sea becomes calm.':'The boat was pushed too far off course. Try again and make smaller corrections.';msg.className='game-message'+(success?' success-message':'');if(success)game.classList.add('storm-calm');}
    function begin(){
      clearInterval(timer);clearInterval(driftTimer);x=50;health=100;time=12;running=true;timeEl.textContent=time;start.disabled=true;game.classList.remove('storm-calm');game.classList.add('storm-running');msg.textContent='Stay near the center — the waves are pushing!';render();
      timer=setInterval(()=>{time--;timeEl.textContent=time;if(time<=0)stop(health>25);},1000);
      driftTimer=setInterval(()=>{if(!running)return;const push=(Math.random()-.5)*12;x=Math.max(5,Math.min(95,x+push));const distance=Math.abs(x-50);health=Math.max(0,health-(distance>22?10:distance>14?5:1));render();if(health<=0)stop(false);},480);
    }
    start.addEventListener('click',begin);container.querySelectorAll('[data-storm]').forEach(b=>b.addEventListener('click',()=>move(b.dataset.storm==='left'?-7:7)));
    activateKeyboard(k=>{if(['arrowleft','a'].includes(k))move(-6);if(['arrowright','d'].includes(k))move(6);});render();
  }


  function prodigal(container){
    const steps=[
      {title:'Far from home',prompt:'The son realizes the life he chose has left him empty. What moves the journey forward?',choices:[['Blame everyone else',false],['Tell the truth about what happened',true],['Pretend nothing is wrong',false]],success:'Honesty opens the road home.'},
      {title:'Turn around',prompt:'He remembers his father\'s house. What is the next step?',choices:[['Return and admit his wrong',true],['Wait until he can make himself look perfect',false],['Stay away because mercy is impossible',false]],success:'Conversion includes an actual turn back.'},
      {title:'On the road',prompt:'The father sees him while he is still far away. What happens?',choices:[['The father runs to welcome him',true],['The father hides from him',false],['The father sends him away without speaking',false]],success:'The father\'s mercy meets him on the road.'},
      {title:'The celebration',prompt:'The older brother is angry. What does the father invite him to do?',choices:[['Share the joy that his brother is home',true],['Pretend his brother does not exist',false],['Leave the family forever',false]],success:'Mercy invites the whole family into restored joy.'}
    ];
    let step=0;
    container.innerHTML=`
      <div class="game-title-row"><div><span class="mini-label">THE ROAD HOME</span><h3>Make the journey back</h3></div><div class="game-score" id="home-score">Step 1 / 4</div></div>
      <p class="game-help">Choose the response that moves the story toward honest conversion and the father’s mercy. Each good choice moves the traveler closer to home.</p>
      <div class="return-game"><div class="return-sky"><div class="return-sun"></div></div><div class="return-road"><div class="return-house">HOME</div><div class="return-traveler" id="return-traveler"><span>●</span></div>${[0,1,2,3].map((_,i)=>`<span class="road-marker m${i+1}"></span>`).join('')}</div></div>
      <div class="choice-panel"><span class="mini-label" id="return-title"></span><h4 id="return-prompt"></h4><div class="return-choices" id="return-choices"></div></div>
      <div class="game-message" id="return-message">Choose the first step.</div>`;
    const title=container.querySelector('#return-title'),prompt=container.querySelector('#return-prompt'),choices=container.querySelector('#return-choices'),msg=container.querySelector('#return-message'),score=container.querySelector('#home-score'),traveler=container.querySelector('#return-traveler');
    const positions=[8,30,52,74,91];
    function draw(){
      if(step>=steps.length){title.textContent='WELCOME HOME';prompt.textContent='The journey is complete.';choices.innerHTML='';score.textContent='Home';msg.textContent='You made it home. The father’s mercy is the center of the story.';msg.classList.add('success-message');container.querySelector('.return-house').classList.add('home-glow');return;}
      const current=steps[step];title.textContent=current.title;prompt.textContent=current.prompt;score.textContent=`Step ${step+1} / 4`;choices.innerHTML=current.choices.map(([label,good],i)=>`<button class="return-choice" data-good="${good}" data-i="${i}">${label}</button>`).join('');
      choices.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
        if(b.dataset.good==='true'){
          b.classList.add('right-choice');msg.textContent=current.success;step++;traveler.style.left=positions[step]+'%';setTimeout(draw,650);
        }else{
          b.classList.add('wrong-choice');msg.textContent='That choice moves away from the point Jesus is making. Try another response.';setTimeout(()=>b.classList.remove('wrong-choice'),450);
        }
      }));
    }
    traveler.style.left=positions[0]+'%';draw();
  }

  function loaves(container){
    const groups=Array.from({length:12},(_,i)=>i);
    let fed=0,active=-1,timer=null,running=false;
    container.innerHTML=`
      <div class="game-title-row"><div><span class="mini-label">SHARE THE LOAVES</span><h3>Serve the crowd and gather twelve baskets</h3></div><div class="game-score"><span id="loaves-score">0</span> / 12 groups</div></div>
      <p class="game-help">Press <strong>Start</strong>. A group will light up — click or tap it before the glow moves. Keep serving until all twelve groups have received food.</p>
      <div class="loaves-game" id="loaves-game"><div class="grass-hill"></div><div class="bread-table"><span>🍞</span><span>🐟</span></div><div class="crowd-grid">${groups.map(i=>`<button class="crowd-group" data-group="${i}" aria-label="Crowd group ${i+1}"><span>${i%3===0?'👨‍👩‍👧':i%3===1?'👥':'🧑‍🤝‍🧑'}</span><small>Group ${i+1}</small></button>`).join('')}</div><div class="basket-stack" id="basket-stack"></div></div>
      <div class="loaves-actions"><button class="button primary" id="loaves-start">Start serving</button></div>
      <div class="game-message" id="loaves-message">The crowd is ready.</div>`;
    const buttons=[...container.querySelectorAll('.crowd-group')],score=container.querySelector('#loaves-score'),msg=container.querySelector('#loaves-message'),start=container.querySelector('#loaves-start'),baskets=container.querySelector('#basket-stack');
    function clearActive(){buttons.forEach(b=>b.classList.remove('active-crowd'));active=-1;}
    function chooseNext(){
      if(fed>=12){finish();return;}
      clearActive();const available=buttons.filter(b=>!b.classList.contains('fed-group'));active=Number(available[Math.floor(Math.random()*available.length)].dataset.group);buttons[active].classList.add('active-crowd');
      clearTimeout(timer);timer=setTimeout(()=>{if(!running)return;msg.textContent='That group is still waiting — catch the next glow.';chooseNext();},1200);
    }
    function finish(){running=false;clearTimeout(timer);clearActive();start.disabled=false;start.textContent='Play again';msg.textContent='Everyone has eaten. Twelve baskets of fragments remain!';msg.classList.add('success-message');container.querySelector('#loaves-game').classList.add('meal-complete');}
    buttons.forEach(button=>button.addEventListener('click',()=>{
      if(!running)return;
      const i=Number(button.dataset.group);
      if(i!==active){button.classList.add('early-click');msg.textContent='Watch for the glowing group.';setTimeout(()=>button.classList.remove('early-click'),350);return;}
      clearTimeout(timer);button.classList.remove('active-crowd');button.classList.add('fed-group');fed++;score.textContent=fed;baskets.insertAdjacentHTML('beforeend','<span class="mini-basket">🧺</span>');msg.textContent=`Group ${i+1} served. Keep sharing!`;setTimeout(chooseNext,260);
    }));
    function begin(){fed=0;running=true;score.textContent='0';buttons.forEach(b=>b.classList.remove('fed-group','active-crowd'));baskets.innerHTML='';msg.className='game-message';msg.textContent='Watch for the first glowing group.';start.disabled=true;container.querySelector('#loaves-game').classList.remove('meal-complete');chooseNext();}
    start.addEventListener('click',begin);
  }

  function renderGame(container, story){
    const map={david,noah,samaritan,moses,nativity,storm,prodigal,loaves};
    (map[story.gameType]||david)(container,story);
  }

  window.BIBLEQUEST_GAMES={render:renderGame};
})();
