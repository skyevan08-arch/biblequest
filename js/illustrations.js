(function () {
  const skin = '#d5a078';
  const skinDark = '#b87954';
  const hair = '#49372e';
  const ink = '#173229';
  const cream = '#fff7e7';

  function person(x, y, robe='#4d826d', scale=1, opts={}) {
    const flip = opts.flip ? ` transform="translate(${x*2} 0) scale(-1 1)"` : '';
    const arm = opts.arm || 'down';
    const armPath = arm === 'up'
      ? `<path d="M ${x+20*scale} ${y+48*scale} Q ${x+45*scale} ${y+20*scale} ${x+58*scale} ${y+8*scale}" stroke="${skin}" stroke-width="${8*scale}" stroke-linecap="round" fill="none"/>`
      : `<path d="M ${x+18*scale} ${y+50*scale} Q ${x+36*scale} ${y+62*scale} ${x+44*scale} ${y+82*scale}" stroke="${skin}" stroke-width="${8*scale}" stroke-linecap="round" fill="none"/>`;
    return `<g class="art-character"${flip}>
      <ellipse cx="${x+28*scale}" cy="${y+22*scale}" rx="${18*scale}" ry="${19*scale}" fill="${skin}"/>
      <path d="M ${x+10*scale} ${y+20*scale} Q ${x+28*scale} ${y-2*scale} ${x+47*scale} ${y+18*scale} Q ${x+42*scale} ${y+2*scale} ${x+20*scale} ${y+5*scale}Z" fill="${hair}"/>
      <circle cx="${x+22*scale}" cy="${y+23*scale}" r="${1.6*scale}" fill="${ink}"/>
      <circle cx="${x+34*scale}" cy="${y+23*scale}" r="${1.6*scale}" fill="${ink}"/>
      <path d="M ${x+22*scale} ${y+31*scale} Q ${x+28*scale} ${y+35*scale} ${x+35*scale} ${y+30*scale}" stroke="${skinDark}" stroke-width="${1.5*scale}" fill="none" stroke-linecap="round"/>
      <path d="M ${x+9*scale} ${y+47*scale} Q ${x+28*scale} ${y+37*scale} ${x+48*scale} ${y+47*scale} L ${x+55*scale} ${y+105*scale} L ${x+2*scale} ${y+105*scale}Z" fill="${robe}"/>
      ${armPath}
      <path d="M ${x+16*scale} ${y+104*scale} L ${x+12*scale} ${y+128*scale}" stroke="${ink}" stroke-width="${7*scale}" stroke-linecap="round"/>
      <path d="M ${x+40*scale} ${y+104*scale} L ${x+44*scale} ${y+128*scale}" stroke="${ink}" stroke-width="${7*scale}" stroke-linecap="round"/>
    </g>`;
  }

  function giant(x, y, scale=1) {
    return `<g class="art-character giant-art">
      <ellipse cx="${x+34*scale}" cy="${y+28*scale}" rx="${24*scale}" ry="${25*scale}" fill="${skinDark}"/>
      <path d="M ${x+5*scale} ${y+55*scale} Q ${x+34*scale} ${y+38*scale} ${x+63*scale} ${y+55*scale} L ${x+69*scale} ${y+145*scale} L ${x-2*scale} ${y+145*scale}Z" fill="#7c5448"/>
      <rect x="${x+5*scale}" y="${y+64*scale}" width="${58*scale}" height="${20*scale}" rx="${5*scale}" fill="#c99c55"/>
      <path d="M ${x+63*scale} ${y+55*scale} L ${x+98*scale} ${y+122*scale}" stroke="#6a4a38" stroke-width="${7*scale}"/>
      <path d="M ${x+98*scale} ${y+35*scale} L ${x+98*scale} ${y+145*scale}" stroke="#6a4a38" stroke-width="${5*scale}"/>
      <path d="M ${x+91*scale} ${y+39*scale} L ${x+98*scale} ${y+20*scale} L ${x+105*scale} ${y+39*scale}Z" fill="#bfc4c3"/>
    </g>`;
  }

  function sheep(x,y,scale=1){
    return `<g class="art-bob">
      <ellipse cx="${x+28*scale}" cy="${y+18*scale}" rx="${28*scale}" ry="${18*scale}" fill="#fffdf5" stroke="#d8d1c1"/>
      <circle cx="${x+54*scale}" cy="${y+17*scale}" r="${11*scale}" fill="#5f554b"/>
      <path d="M ${x+12*scale} ${y+32*scale} v ${18*scale} M ${x+38*scale} ${y+32*scale} v ${18*scale}" stroke="#5f554b" stroke-width="${4*scale}"/>
    </g>`;
  }

  function tree(x,y,scale=1){
    return `<g><rect x="${x}" y="${y+45*scale}" width="${14*scale}" height="${55*scale}" rx="${5*scale}" fill="#8a6543"/><circle cx="${x+7*scale}" cy="${y+34*scale}" r="${34*scale}" fill="#60875c"/><circle cx="${x-12*scale}" cy="${y+45*scale}" r="${22*scale}" fill="#739667"/></g>`;
  }

  function cloud(x,y,scale=1){return `<g class="art-cloud"><ellipse cx="${x}" cy="${y}" rx="${42*scale}" ry="${18*scale}" fill="rgba(255,255,255,.78)"/><circle cx="${x-24*scale}" cy="${y-8*scale}" r="${17*scale}" fill="rgba(255,255,255,.78)"/><circle cx="${x+14*scale}" cy="${y-10*scale}" r="${22*scale}" fill="rgba(255,255,255,.78)"/></g>`}

  function star(x,y,r=7){return `<g class="art-twinkle"><path d="M ${x} ${y-r} L ${x+r*.32} ${y-r*.3} L ${x+r} ${y} L ${x+r*.32} ${y+r*.3} L ${x} ${y+r} L ${x-r*.32} ${y+r*.3} L ${x-r} ${y} L ${x-r*.32} ${y-r*.3}Z" fill="#f8db73"/></g>`}

  function baseScene(bgTop='#b9e1e8', bgBottom='#d6bb80', content='') {
    return `<svg class="story-svg" viewBox="0 0 800 500" role="img" aria-hidden="true">
      <rect width="800" height="500" fill="${bgTop}"/>
      <rect y="190" width="800" height="310" fill="#eef6f0" opacity=".18"/>
      <path d="M0 345 Q170 275 330 340 T800 330 V500 H0Z" fill="${bgBottom}"/>
      ${cloud(140,80,.9)}${cloud(625,115,.65)}
      ${content}
    </svg>`;
  }

  function cardScene(id) {
    switch(id){
      case 'david-goliath': return baseScene('#9fd7e8','#d2ad70', `${giant(570,195,1.15)}${person(170,286,'#4c8065',.82,{arm:'up'})}<path d="M222 355 Q350 290 555 350" stroke="#ead5a7" stroke-width="22" fill="none"/><circle cx="230" cy="335" r="8" fill="#6f6558"/>`);
      case 'noahs-ark': return `<svg class="story-svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#a9d9e8"/><path d="M0 345 Q200 330 400 350 T800 340 V500 H0Z" fill="#619eae"/><path d="M150 335 L250 170 L585 170 L680 335Z" fill="#b9824a"/><rect x="260" y="215" width="310" height="120" rx="8" fill="#c9975b"/><path d="M270 205 Q415 95 560 205" fill="#8e603e"/>${sheep(308,270,.7)}${sheep(405,270,.7)}${cloud(120,90,.9)}${cloud(650,70,.7)}<path d="M570 95 Q610 55 650 95 Q690 135 730 95" stroke="#f4d76c" stroke-width="7" fill="none"/></svg>`;
      case 'good-samaritan': return baseScene('#bce4dc','#c9b07a', `${person(225,270,'#7b9a64',.8,{arm:'up'})}${person(420,330,'#b06d55',.72)}${tree(620,270,1)}<path d="M80 430 Q340 335 730 430" stroke="#e9d2a5" stroke-width="34" fill="none"/>`);
      case 'moses-red-sea': return `<svg class="story-svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#b6dfeb"/><path d="M0 300 Q120 230 245 310 L245 500 H0Z" fill="#3d99ad"/><path d="M800 300 Q680 230 555 310 L555 500 H800Z" fill="#3d99ad"/><path d="M245 500 L350 315 L450 315 L555 500Z" fill="#d8b478"/>${person(365,280,'#8e7057',.9,{arm:'up'})}<path class="art-wave" d="M0 320 Q60 290 120 320 T240 320" stroke="#d5f3f4" stroke-width="10" fill="none"/><path class="art-wave" d="M560 320 Q620 290 680 320 T800 320" stroke="#d5f3f4" stroke-width="10" fill="none"/></svg>`;
      case 'nativity': return `<svg class="story-svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#182c4a"/>${star(170,80,8)}${star(620,100,7)}${star(510,65,5)}${star(365,72,18)}<path d="M0 355 Q240 300 410 355 T800 345 V500 H0Z" fill="#a78355"/><path d="M270 330 L390 215 L520 330Z" fill="#c49862"/><rect x="305" y="330" width="180" height="105" fill="#a8784e"/><rect x="376" y="350" width="48" height="85" fill="#473c35"/>${person(285,335,'#4776a2',.6)}${person(450,338,'#a87655',.6)}<ellipse cx="400" cy="420" rx="65" ry="18" fill="#e7c87b"/></svg>`;
      case 'jesus-calms-storm': return `<svg class="story-svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#758ba0"/><path class="art-wave" d="M0 335 Q75 280 150 335 T300 335 T450 335 T600 335 T800 335 V500 H0Z" fill="#4e8ca7"/><path d="M250 350 Q400 410 550 350 L515 425 L290 425Z" fill="#8b623f"/><path d="M400 220 L400 365" stroke="#594536" stroke-width="7"/><path d="M405 225 L500 290 L405 290Z" fill="#e8ddbe" opacity=".9"/>${person(340,330,'#e3c47d',.55,{arm:'up'})}${person(460,335,'#6a8a83',.52)}${cloud(150,95,1.1)}${cloud(620,90,.9)}</svg>`;
      case 'prodigal-son': return baseScene('#f1c7bb','#d7b47d', `<path d="M525 335 L595 245 L690 335Z" fill="#c99868"/><rect x="555" y="335" width="105" height="70" fill="#a97952"/>${person(230,300,'#9d7658',.72,{arm:'up'})}${person(325,315,'#6a8d72',.68,{arm:'up'})}<path d="M265 330 Q292 305 320 330" stroke="#d5a078" stroke-width="10" fill="none" stroke-linecap="round"/>`);
      case 'feeding-five-thousand': return baseScene('#b9e3df','#91b977', `${person(345,282,'#d7b86f',.75,{arm:'up'})}${person(470,322,'#6f8666',.55)}${person(535,327,'#8b6958',.52)}<ellipse cx="350" cy="390" rx="115" ry="28" fill="#d8ba7f"/><ellipse cx="330" cy="372" rx="18" ry="9" fill="#e8c987"/><ellipse cx="372" cy="374" rx="20" ry="10" fill="#e8c987"/><path d="M410 380 q18 -12 36 0 q-18 12 -36 0" fill="#6b98a0"/>`);
      default: return baseScene(undefined,undefined,'');
    }
  }

  function scene(id, index){
    const key = `${id}-${index}`;
    switch(key){
      // David
      case 'david-goliath-0': return baseScene('#aedce9','#d2af72', `${giant(590,180,1.08)}${person(155,315,'#6c856d',.6)}${person(235,320,'#7d6752',.58)}<path d="M365 395 Q450 340 555 390" stroke="#f0d7a9" stroke-width="26" fill="none"/>`);
      case 'david-goliath-1': return baseScene('#aedce9','#d2af72', `${person(150,285,'#4f7f63',.78)}${sheep(60,355,.55)}${sheep(115,380,.5)}<path d="M530 330 L610 235 L690 330Z" fill="#d8bd86"/><rect x="560" y="330" width="100" height="70" fill="#c69b62"/>${person(585,315,'#8b6551',.55)}`);
      case 'david-goliath-2': return baseScene('#b7e0e6','#d0ad74', `${person(250,290,'#4f7f63',.78,{arm:'up'})}${person(455,270,'#7a5d57',.92)}<path d="M520 290 l70 -40 l25 88 l-60 25z" fill="#b6bbb8" opacity=".9"/>`);
      case 'david-goliath-3': return baseScene('#b2dfe5','#d0aa6c', `${person(205,300,'#4f7f63',.82,{arm:'up'})}${giant(570,180,1.12)}<circle class="art-fly" cx="330" cy="285" r="8" fill="#666054"/><path d="M245 335 Q275 295 315 305" stroke="#6b4f3c" stroke-width="5" fill="none"/>`);
      // Noah
      case 'noahs-ark-0': return baseScene('#9cc7cd','#a99772', `${person(180,305,'#786a58',.74)}${person(330,320,'#875c51',.65)}${person(480,315,'#5d7968',.65)}<path d="M585 360 l40 -70 l40 70z" fill="#9c7652"/>`);
      case 'noahs-ark-1': return baseScene('#b8e0dc','#c5a773', `${person(180,300,'#6d7d5f',.72,{arm:'up'})}<path d="M370 360 L440 190 L685 190 L740 360Z" fill="#b9834b"/><rect x="455" y="235" width="210" height="125" fill="#cc9858"/><path class="art-hammer" d="M238 300 l55 -35" stroke="#6c4c35" stroke-width="7"/>`);
      case 'noahs-ark-2': return `<svg class="story-svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#87b9ca"/><path class="art-wave" d="M0 300 Q90 250 180 300 T360 300 T540 300 T800 300 V500 H0Z" fill="#4f98ad"/><path d="M190 340 L270 205 L585 205 L665 340Z" fill="#b7834e"/><rect x="295" y="245" width="235" height="95" fill="#c7965b"/>${sheep(340,282,.45)}${sheep(430,282,.45)}${cloud(110,85,1)}${cloud(640,95,.9)}</svg>`;
      case 'noahs-ark-3': return baseScene('#b8e8ea','#78a976', `${person(310,305,'#6d7d5f',.75,{arm:'up'})}<path class="art-rainbow" d="M430 260 Q560 80 700 260" stroke="#e25b5b" stroke-width="16" fill="none"/><path d="M430 260 Q560 105 700 260" stroke="#e9b954" stroke-width="12" fill="none"/><path d="M430 260 Q560 130 700 260" stroke="#70a76c" stroke-width="10" fill="none"/>${sheep(150,360,.52)}`);
      // Samaritan
      case 'good-samaritan-0': return baseScene('#bde2d8','#cbb17f', `${person(240,295,'#ddc079',.8,{arm:'up'})}${person(430,295,'#7f6d58',.8)}<path d="M165 405 Q350 340 640 410" stroke="#ead6ae" stroke-width="28" fill="none"/>`);
      case 'good-samaritan-1': return baseScene('#c3e2d8','#c6aa74', `${person(400,352,'#9a6d5c',.55)}<path d="M80 425 Q320 335 735 410" stroke="#ead6ae" stroke-width="32" fill="none"/>${person(180,300,'#716a55',.62)}${person(645,300,'#65795a',.62)}${tree(690,270,.8)}`);
      case 'good-samaritan-2': return baseScene('#c4e5dd','#c7ae79', `${person(300,305,'#7a9964',.75,{arm:'up'})}${person(420,350,'#9a6d5c',.55)}<rect x="360" y="285" width="34" height="25" rx="6" fill="#eee1bd"/><path d="M377 278 v39 M357 298 h40" stroke="#9b6558" stroke-width="4"/>`);
      case 'good-samaritan-3': return baseScene('#c5e3d8','#c8ad77', `<path d="M430 330 L500 240 L600 330Z" fill="#c99961"/><rect x="465" y="330" width="100" height="75" fill="#a97850"/>${person(250,305,'#7a9964',.72)}${person(335,335,'#9a6d5c',.58)}${person(520,320,'#8b745c',.58)}`);
      // Moses
      case 'moses-red-sea-0': return `<svg class="story-svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#b9dfeb"/><path d="M0 365 Q200 300 400 365 T800 350 V500 H0Z" fill="#c9ad78"/><path d="M0 385 Q100 330 200 385" stroke="#4f99ad" stroke-width="80" fill="none"/>${person(390,300,'#8e7057',.75)}${person(520,320,'#6d7c63',.62)}<path d="M645 328 l55 -45 l30 45z" fill="#a2714c"/></svg>`;
      case 'moses-red-sea-1': return baseScene('#b7dee9','#c8aa75', `${person(330,275,'#8e7057',.86,{arm:'up'})}${person(500,330,'#6b775c',.58)}${person(575,330,'#7e6357',.58)}<path d="M364 250 L408 180" stroke="#6b4b34" stroke-width="6"/>`);
      case 'moses-red-sea-2': return `<svg class="story-svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#b3dce7"/><path class="art-wave" d="M0 290 Q115 210 230 290 L230 500 H0Z" fill="#3d98ad"/><path class="art-wave" d="M800 290 Q685 210 570 290 L570 500 H800Z" fill="#3d98ad"/><path d="M230 500 L330 315 L470 315 L570 500Z" fill="#d9b57b"/>${person(360,310,'#8e7057',.68,{arm:'up'})}${person(430,335,'#6b775c',.52)}</svg>`;
      case 'moses-red-sea-3': return baseScene('#c1e4e9','#c4aa76', `${person(220,305,'#8e7057',.75,{arm:'up'})}${person(340,325,'#6b775c',.55,{arm:'up'})}${person(415,325,'#8e6557',.55,{arm:'up'})}<path d="M560 380 Q650 325 760 385" stroke="#4d99ad" stroke-width="75" fill="none"/>`);
      // Nativity
      case 'nativity-0': return `<svg class="story-svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#28405d"/>${star(180,95,7)}${star(590,70,6)}${star(690,120,5)}<path d="M0 365 Q220 305 420 365 T800 350 V500 H0Z" fill="#b18c5f"/>${person(270,305,'#46759f',.66)}${person(355,315,'#9c7259',.68)}<path d="M520 350 L600 255 L680 350Z" fill="#bf945f"/></svg>`;
      case 'nativity-1': return `<svg class="story-svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#233a56"/>${star(570,65,8)}<path d="M0 380 Q280 330 800 365 V500 H0Z" fill="#ab865a"/><path d="M245 355 L375 215 L520 355Z" fill="#c29762"/><rect x="285" y="355" width="195" height="95" fill="#a8784e"/>${person(250,348,'#4776a2',.52)}${person(455,350,'#9c7259',.52)}<ellipse cx="375" cy="425" rx="55" ry="15" fill="#ead07e"/><circle cx="375" cy="408" r="10" fill="#d8a47c"/></svg>`;
      case 'nativity-2': return `<svg class="story-svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#1e3452"/>${star(120,75,5)}${star(660,90,6)}${star(390,70,18)}<path d="M0 370 Q250 315 800 360 V500 H0Z" fill="#af895a"/>${person(170,325,'#6c7f65',.58)}${person(245,330,'#7f6758',.56)}${sheep(115,390,.42)}${sheep(295,392,.42)}<g class="art-float"><ellipse cx="430" cy="160" rx="45" ry="28" fill="#f4deb1"/><path d="M395 170 l-45 18 l35 -48z M465 170 l45 18 l-35 -48z" fill="#f0e7cf"/></g></svg>`;
      case 'nativity-3': return `<svg class="story-svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#263b56"/>${star(640,78,6)}<path d="M0 375 Q260 325 800 365 V500 H0Z" fill="#ae8859"/><path d="M210 350 L345 215 L510 350Z" fill="#c29762"/><rect x="255" y="350" width="210" height="100" fill="#a77850"/>${person(180,350,'#6c7f65',.48)}${person(235,350,'#7f6758',.48)}${person(300,347,'#4776a2',.50)}${person(435,350,'#9c7259',.50)}<ellipse cx="370" cy="425" rx="55" ry="15" fill="#ead07e"/></svg>`;
      // Storm
      case 'jesus-calms-storm-0': return `<svg class="story-svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#98c6d5"/>${cloud(145,80,.8)}<path d="M0 365 Q90 325 180 365 T360 365 T540 365 T800 365 V500 H0Z" fill="#4e91aa"/><path d="M245 350 Q400 410 555 350 L520 425 L285 425Z" fill="#8c6340"/>${person(330,330,'#d5b36d',.48)}${person(420,335,'#6d817c',.48)}</svg>`;
      case 'jesus-calms-storm-1': return `<svg class="story-svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#65788b"/>${cloud(120,85,1.15)}${cloud(630,90,1)}<path class="art-wave" d="M0 340 Q80 265 160 340 T320 340 T480 340 T640 340 T800 340 V500 H0Z" fill="#3e819c"/><path d="M245 355 Q400 420 555 355 L520 430 L285 430Z" fill="#805b3d" transform="rotate(-4 400 390)"/>${person(330,335,'#d5b36d',.45)}${person(430,338,'#6d817c',.45,{arm:'up'})}</svg>`;
      case 'jesus-calms-storm-2': return `<svg class="story-svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#73889a"/><path class="art-wave" d="M0 350 Q90 285 180 350 T360 350 T540 350 T800 350 V500 H0Z" fill="#468aa4"/><path d="M245 355 Q400 415 555 355 L520 430 L285 430Z" fill="#885f3e"/>${person(365,315,'#d5b36d',.58,{arm:'up'})}<path class="art-wind" d="M470 240 Q560 220 630 245" stroke="#eef5f1" stroke-width="8" fill="none" stroke-linecap="round"/><path class="art-wind" d="M500 275 Q590 260 670 282" stroke="#eef5f1" stroke-width="6" fill="none" stroke-linecap="round"/></svg>`;
      case 'jesus-calms-storm-3': return `<svg class="story-svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#b7dde5"/>${cloud(135,85,.7)}<path d="M0 375 Q110 350 220 375 T440 375 T660 375 T800 375 V500 H0Z" fill="#5a9aaf"/><path d="M245 355 Q400 410 555 355 L520 425 L285 425Z" fill="#8c6340"/>${person(365,325,'#d5b36d',.52)}${person(455,332,'#6d817c',.48)}<circle class="art-sunpulse" cx="650" cy="90" r="38" fill="#f1d279"/></svg>`;
      // Prodigal Son
      case 'prodigal-son-0': return baseScene('#f2c9bc','#d6b27b', `<path d="M500 345 L575 245 L675 345Z" fill="#ca9b6b"/><rect x="535" y="345" width="105" height="70" fill="#a97851"/>${person(255,302,'#6a8d72',.68,{arm:'up'})}${person(380,305,'#9d7658',.65)}<path class="art-fly" d="M420 350 Q500 320 565 340" stroke="#ead4aa" stroke-width="22" fill="none"/>`);
      case 'prodigal-son-1': return baseScene('#d8d1b2','#aa936d', `${person(315,323,'#87705b',.62)}<ellipse cx="555" cy="380" rx="80" ry="28" fill="#8d7359"/><g class="art-bob"><ellipse cx="520" cy="355" rx="35" ry="22" fill="#c98f82"/><circle cx="552" cy="351" r="15" fill="#b9776c"/><circle cx="559" cy="348" r="3" fill="#3e3834"/></g><path d="M90 420 Q330 345 735 420" stroke="#d9c393" stroke-width="30" fill="none"/>`);
      case 'prodigal-son-2': return baseScene('#c5e2d8','#a9bd7b', `<path d="M520 340 L595 245 L690 340Z" fill="#ca9a67"/><rect x="552" y="340" width="110" height="76" fill="#aa7c50"/>${person(235,310,'#87705b',.62)}${person(405,285,'#6a8d72',.78,{arm:'up'})}<path d="M270 360 Q340 315 405 345" stroke="#e8d4aa" stroke-width="24" fill="none"/>`);
      case 'prodigal-son-3': return baseScene('#d9e6c5','#c3aa75', `<path d="M505 340 L580 245 L690 340Z" fill="#c99562"/><rect x="540" y="340" width="115" height="78" fill="#aa794e"/>${person(250,300,'#6a8d72',.72,{arm:'up'})}${person(350,305,'#87705b',.62,{arm:'up'})}${person(615,305,'#6a7485',.62)}<g class="art-float"><circle cx="472" cy="285" r="13" fill="#f0ca69"/><circle cx="495" cy="278" r="9" fill="#f0ca69"/></g>`);
      // Feeding the Five Thousand
      case 'feeding-five-thousand-0': return baseScene('#bce4df','#92b978', `${person(345,285,'#d7b86f',.72,{arm:'up'})}${person(500,325,'#6d8265',.5)}${person(555,328,'#8a6a58',.48)}${person(610,330,'#6f7587',.48)}<circle cx="690" cy="335" r="18" fill="#c99a73"/>`);
      case 'feeding-five-thousand-1': return baseScene('#c3e8df','#95bb79', `${person(270,300,'#6f8666',.65,{arm:'up'})}${person(405,335,'#8a6a58',.48)}<ellipse cx="470" cy="365" rx="62" ry="22" fill="#d2b27a"/><ellipse cx="445" cy="355" rx="19" ry="9" fill="#e6c680"/><ellipse cx="486" cy="354" rx="20" ry="9" fill="#e6c680"/><path d="M430 378 q18 -12 36 0 q-18 12 -36 0" fill="#6d99a1"/><path d="M478 380 q18 -12 36 0 q-18 12 -36 0" fill="#6d99a1"/>`);
      case 'feeding-five-thousand-2': return baseScene('#bee6df','#8eb675', `${person(340,270,'#d7b86f',.78,{arm:'up'})}<ellipse cx="410" cy="390" rx="105" ry="28" fill="#d6b77d"/><ellipse class="art-float" cx="355" cy="348" rx="21" ry="10" fill="#e9cb86"/><ellipse class="art-float" cx="405" cy="345" rx="21" ry="10" fill="#e9cb86"/><path class="art-float" d="M450 350 q22 -14 44 0 q-22 14 -44 0" fill="#6d9ca5"/>${person(560,325,'#6f8666',.5)}`);
      case 'feeding-five-thousand-3': return baseScene('#c8eadf','#91b776', `${person(230,305,'#d7b86f',.62,{arm:'up'})}${person(365,330,'#6f8666',.5)}${person(440,332,'#8a6a58',.48)}<g class="art-bob"><rect x="535" y="338" width="65" height="48" rx="8" fill="#b98755"/><rect x="615" y="330" width="65" height="55" rx="8" fill="#b98755"/><rect x="575" y="275" width="65" height="55" rx="8" fill="#b98755"/></g><ellipse cx="567" cy="340" rx="12" ry="6" fill="#e5c57f"/>`);
      default: return cardScene(id);
    }
  }

  window.BIBLEQUEST_ART = { card: cardScene, scene };
})();
